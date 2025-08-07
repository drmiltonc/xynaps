'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotifications';

export default function TokenHandler() {
  const router = useRouter();
  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    // Check if there's a token in the URL fragment
    const hash = window.location.hash;
    
    if (hash && hash.includes('access_token')) {
      console.log('Token found in URL fragment:', hash);
      
      try {
        // Parse the hash to extract tokens
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const expiresAt = params.get('expires_at');
        
        if (accessToken) {
          console.log('Processing access token from URL');
          
          // Store tokens in localStorage (temporary solution)
          localStorage.setItem('xynaps_access_token', accessToken);
          if (refreshToken) {
            localStorage.setItem('xynaps_refresh_token', refreshToken);
          }
          if (expiresAt) {
            localStorage.setItem('xynaps_expires_at', expiresAt);
          }
          
          // Clear the URL fragment
          window.history.replaceState({}, document.title, window.location.pathname);
          
          // Redirect to dashboard
          showSuccess('Authentication Successful', 'You have been successfully authenticated.');
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error processing token from URL:', error);
        showError('Authentication Error', 'Failed to process authentication token.');
        router.push('/');
      }
    }
  }, [router, showSuccess, showError]);

  return null; // This component doesn't render anything
}
