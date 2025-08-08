'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function OAuthLogin() {
  console.log('🔵 OAuthLogin - Component rendered');
  
  const { signInWithGoogle, signInWithMicrosoft } = useAuth();
  
  console.log('🔵 OAuthLogin - useAuth hook result:', { 
    signInWithGoogle: !!signInWithGoogle, 
    signInWithMicrosoft: !!signInWithMicrosoft 
  });

  const handleGoogleLogin = async () => {
    try {
      console.log('🔵 OAuthLogin - Google button clicked!');
      console.log('🔵 OAuthLogin - Starting Google OAuth...');
      await signInWithGoogle();
    } catch (error) {
      console.error('🔴 OAuthLogin - Error signing in with Google:', error);
      console.error('🔴 OAuthLogin - Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      // TODO: Show error notification
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      console.log('🔵 OAuthLogin - Microsoft button clicked!');
      console.log('🔵 OAuthLogin - Starting Microsoft OAuth...');
      await signInWithMicrosoft();
    } catch (error) {
      console.error('🔴 OAuthLogin - Error signing in with Microsoft:', error);
      console.error('🔴 OAuthLogin - Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      // TODO: Show error notification
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full flex items-center justify-center gap-3"
        size="lg"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </Button>

      <Button
        onClick={handleMicrosoftLogin}
        variant="outline"
        className="w-full flex items-center justify-center gap-3"
        size="lg"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#f25022" d="M1 1h10v10H1z"/>
          <path fill="#7fba00" d="M13 1h10v10H13z"/>
          <path fill="#00a4ef" d="M1 13h10v10H1z"/>
          <path fill="#ffb900" d="M13 13h10v10H13z"/>
        </svg>
        Continue with Microsoft
      </Button>
    </div>
  );
}
