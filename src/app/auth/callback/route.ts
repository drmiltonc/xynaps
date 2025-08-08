import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  const state = searchParams.get('state');
  
  // Check for token in URL fragment (implicit flow)
  const url = new URL(request.url);
  const hash = url.hash;
  
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/dashboard';
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/dashboard';
  }

  // If we have a hash with tokens, this is implicit flow
  if (hash && hash.includes('access_token')) {
    // Redirect to home page where TokenHandler can process the tokens
    const redirectUrl = new URL(origin);
    return NextResponse.redirect(redirectUrl);
  }

  if (error) {
    console.error('🔴 OAuth Error:', { error, errorDescription });
    const redirectUrl = new URL(origin);
    redirectUrl.searchParams.set('auth_error', error);
    if (errorDescription) {
      redirectUrl.searchParams.set('auth_error_description', errorDescription);
    }
    return NextResponse.redirect(redirectUrl);
  }

  if (code) {
    try {
      const supabase = await createClient();
      
      // Exchange the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('🔴 Error exchanging code for session:', exchangeError);
        const redirectUrl = new URL(origin);
        redirectUrl.searchParams.set('auth_error', 'session_exchange_failed');
        redirectUrl.searchParams.set('auth_error_description', exchangeError.message);
        return NextResponse.redirect(redirectUrl);
      }

      // Get user data after successful exchange
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('🔴 Error getting user:', userError);
      }
      
      if (user) {
        // Create or update user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name,
            role: 'user',
            subscription_status: 'free',
            created_at: new Date().toISOString()
          }, {
            onConflict: 'id'
          });

        if (profileError) {
          console.error('🔴 Error creating/updating profile:', profileError);
        }
      }

      // Success - redirect to dashboard or next parameter
      const isLocalEnv = process.env.NODE_ENV === 'development';
      
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        const redirectUrl = `${origin}${next}`;
        return NextResponse.redirect(redirectUrl);
      } else {
        const forwardedHost = request.headers.get('x-forwarded-host');
        if (forwardedHost) {
          const redirectUrl = `https://${forwardedHost}${next}`;
          return NextResponse.redirect(redirectUrl);
        } else {
          const redirectUrl = `${origin}${next}`;
          return NextResponse.redirect(redirectUrl);
        }
      }
    } catch (error) {
      console.error('🔴 Error in OAuth callback:', error);
      const redirectUrl = new URL(origin);
      redirectUrl.searchParams.set('auth_error', 'callback_error');
      redirectUrl.searchParams.set('auth_error_description', error instanceof Error ? error.message : 'Unknown error');
      return NextResponse.redirect(redirectUrl);
    }
  }

  // No code or error - redirect to home page instead of error page
  const redirectUrl = new URL(origin);
  return NextResponse.redirect(redirectUrl);
}
