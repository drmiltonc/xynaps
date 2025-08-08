'use client';

import { useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';

export default function TokenHandler() {
  const { showSuccess } = useNotifications();

  useEffect(() => {
    console.log('🔵 TokenHandler - Component mounted');
    
    // Check if there's a token in the URL fragment
    const hash = window.location.hash;
    console.log('🔵 TokenHandler - URL hash:', hash ? hash.substring(0, 100) + '...' : 'null');
    
    if (hash && hash.includes('access_token')) {
      console.log('🔵 TokenHandler - Token found, redirecting to dashboard');
      
      // Clear the URL fragment
      window.history.replaceState({}, document.title, window.location.pathname);
      console.log('🔵 TokenHandler - URL fragment cleared');
      
      // Show success message
      showSuccess('Authentication Successful', 'You have been successfully authenticated.');
      console.log('🔵 TokenHandler - Success message shown');
      
      // Redirect immediately
      console.log('🔵 TokenHandler - Redirecting to dashboard...');
      window.location.href = '/dashboard';
    } else {
      console.log('🔵 TokenHandler - No token found in URL fragment');
    }
  }, [showSuccess]);

  return null;
}
