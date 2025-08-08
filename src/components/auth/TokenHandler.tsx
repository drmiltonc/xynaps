'use client';

import { useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';

export default function TokenHandler() {
  const { showSuccess } = useNotifications();

  useEffect(() => {
    // Check if there's a token in the URL fragment
    const hash = window.location.hash;
    
    if (hash && hash.includes('access_token')) {
      // Clear the URL fragment
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Show success message
      showSuccess('Authentication Successful', 'You have been successfully authenticated.');
      
      // Redirect immediately
      window.location.href = '/dashboard';
    }
  }, [showSuccess]);

  return null;
}
