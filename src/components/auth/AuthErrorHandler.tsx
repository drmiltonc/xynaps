'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotifications';

export default function AuthErrorHandler() {
  const searchParams = useSearchParams();
  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    const authError = searchParams.get('auth_error');
    const authErrorDescription = searchParams.get('auth_error_description');
    const authSuccess = searchParams.get('auth_success');

    if (authSuccess === 'true') {
      showSuccess('Welcome to Xynaps!', 'You have been successfully authenticated.');
    }

    if (authError) {
      let errorMessage = 'Authentication failed';
      
      switch (authError) {
        case 'access_denied':
          errorMessage = 'Access was denied. Please try again.';
          break;
        case 'session_exchange_failed':
          errorMessage = 'Failed to complete authentication. Please try again.';
          break;
        case 'callback_error':
          errorMessage = 'Authentication callback failed. Please try again.';
          break;
        default:
          errorMessage = authErrorDescription || 'Authentication failed. Please try again.';
      }

      showError('Authentication Error', errorMessage);
    }
  }, [searchParams, showSuccess, showError]);

  return null; // This component doesn't render anything
}
