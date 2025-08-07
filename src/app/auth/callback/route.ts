import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  console.log('OAuth Callback - URL:', requestUrl.toString());
  console.log('OAuth Callback - Code:', code);
  console.log('OAuth Callback - Error:', error);

  if (error) {
    // Handle OAuth error
    const errorMessage = errorDescription || 'Authentication failed';
    console.error('OAuth Error:', { error, errorDescription });
    const redirectUrl = new URL(requestUrl.origin);
    redirectUrl.searchParams.set('auth_error', error);
    redirectUrl.searchParams.set('auth_error_description', errorMessage);
    return NextResponse.redirect(redirectUrl);
  }

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies });
      
      console.log('Exchanging code for session...');
      
      // Exchange the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      console.log('Exchange result:', { data, error: exchangeError });
      
      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError);
        const redirectUrl = new URL(requestUrl.origin);
        redirectUrl.searchParams.set('auth_error', 'session_exchange_failed');
        redirectUrl.searchParams.set('auth_error_description', exchangeError.message || 'Failed to complete authentication');
        return NextResponse.redirect(redirectUrl);
      }

      // Success - redirect to dashboard
      const redirectUrl = new URL(`${requestUrl.origin}/dashboard`);
      redirectUrl.searchParams.set('auth_success', 'true');
      console.log('Redirecting to dashboard:', redirectUrl.toString());
      return NextResponse.redirect(redirectUrl);
    } catch (error) {
      console.error('Error in OAuth callback:', error);
      const redirectUrl = new URL(requestUrl.origin);
      redirectUrl.searchParams.set('auth_error', 'callback_error');
      redirectUrl.searchParams.set('auth_error_description', 'Authentication callback failed');
      return NextResponse.redirect(redirectUrl);
    }
  }

  // No code or error - redirect to home
  console.log('No code or error found, redirecting to home');
  return NextResponse.redirect(requestUrl.origin);
}
