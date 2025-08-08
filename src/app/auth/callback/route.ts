import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  console.log('🔵 OAuth Callback - Request received');
  console.log('🔵 Request URL:', request.url);
  console.log('🔵 Request headers:', Object.fromEntries(request.headers.entries()));
  
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  const state = searchParams.get('state');
  
  // Check for token in URL fragment (implicit flow)
  const url = new URL(request.url);
  const hash = url.hash;
  console.log('🔵 OAuth Callback - URL hash:', hash ? hash.substring(0, 100) + '...' : 'null');
  
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/dashboard';
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/dashboard';
  }

  console.log('🔵 OAuth Callback - Parameters:');
  console.log('  - Code:', !!code, code ? `${code.substring(0, 10)}...` : 'null');
  console.log('  - Error:', !!error, error);
  console.log('  - Error Description:', errorDescription);
  console.log('  - State:', state);
  console.log('  - Next:', next);
  console.log('  - Origin:', origin);
  console.log('  - Hash:', !!hash);

  // If we have a hash with tokens, this is implicit flow
  if (hash && hash.includes('access_token')) {
    console.log('⚠️ OAuth Callback - Detected implicit flow with tokens in hash');
    console.log('⚠️ OAuth Callback - This should not happen with PKCE flow');
    console.log('⚠️ OAuth Callback - Redirecting to home for client-side processing');
    
    // Redirect to home page where TokenHandler can process the tokens
    const redirectUrl = new URL(origin);
    console.log('⚠️ OAuth Callback - Redirecting to:', redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  }

  if (error) {
    console.error('🔴 OAuth Error:', { error, errorDescription });
    const redirectUrl = new URL(origin);
    redirectUrl.searchParams.set('auth_error', error);
    if (errorDescription) {
      redirectUrl.searchParams.set('auth_error_description', errorDescription);
    }
    console.log('🔴 Redirecting to error page:', redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  }

  if (code) {
    try {
      console.log('🟡 Creating Supabase client...');
      const supabase = await createClient();
      console.log('🟡 Supabase client created successfully');
      
      console.log('🟡 Exchanging code for session...');
      console.log('🟡 Code to exchange:', code.substring(0, 20) + '...');
      
      // Exchange the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('🔴 Error exchanging code for session:', exchangeError);
        console.error('🔴 Error details:', {
          message: exchangeError.message,
          status: exchangeError.status,
          name: exchangeError.name
        });
        const redirectUrl = new URL(origin);
        redirectUrl.searchParams.set('auth_error', 'session_exchange_failed');
        redirectUrl.searchParams.set('auth_error_description', exchangeError.message);
        console.log('🔴 Redirecting to error page:', redirectUrl.toString());
        return NextResponse.redirect(redirectUrl);
      }

      console.log('✅ Session exchange successful');
      console.log('✅ Session data:', {
        user: data.user?.email,
        session: !!data.session,
        access_token: !!data.session?.access_token,
        refresh_token: !!data.session?.refresh_token
      });

      // Get user data after successful exchange
      console.log('🟡 Getting user data...');
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('🔴 Error getting user:', userError);
      }
      
      if (user) {
        console.log('✅ User authenticated:', user.email);
        console.log('✅ User metadata:', user.user_metadata);
        
        // Create or update user profile
        console.log('🟡 Creating/updating user profile...');
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
        } else {
          console.log('✅ Profile created/updated successfully');
        }
      } else {
        console.log('⚠️ No user data found after session exchange');
      }

      // Success - redirect to dashboard or next parameter
      console.log('✅ Redirecting to:', next);
      const isLocalEnv = process.env.NODE_ENV === 'development';
      console.log('✅ Environment:', isLocalEnv ? 'development' : 'production');
      
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        const redirectUrl = `${origin}${next}`;
        console.log('✅ Redirecting to (dev):', redirectUrl);
        return NextResponse.redirect(redirectUrl);
      } else {
        const forwardedHost = request.headers.get('x-forwarded-host');
        console.log('✅ Forwarded host:', forwardedHost);
        if (forwardedHost) {
          const redirectUrl = `https://${forwardedHost}${next}`;
          console.log('✅ Redirecting to (prod with forwarded host):', redirectUrl);
          return NextResponse.redirect(redirectUrl);
        } else {
          const redirectUrl = `${origin}${next}`;
          console.log('✅ Redirecting to (prod):', redirectUrl);
          return NextResponse.redirect(redirectUrl);
        }
      }
    } catch (error) {
      console.error('🔴 Error in OAuth callback:', error);
      console.error('🔴 Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      const redirectUrl = new URL(origin);
      redirectUrl.searchParams.set('auth_error', 'callback_error');
      redirectUrl.searchParams.set('auth_error_description', error instanceof Error ? error.message : 'Unknown error');
      console.log('🔴 Redirecting to error page:', redirectUrl.toString());
      return NextResponse.redirect(redirectUrl);
    }
  }

  // No code or error - redirect to home page instead of error page
  console.log('⚠️ No code or error found, redirecting to home page');
  console.log('⚠️ Search params:', Object.fromEntries(searchParams.entries()));
  const redirectUrl = new URL(origin);
  console.log('⚠️ Redirecting to home page:', redirectUrl.toString());
  return NextResponse.redirect(redirectUrl);
}
