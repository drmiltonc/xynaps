'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useNotifications } from '@/hooks/useNotifications';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN' && session?.user) {
          // Fetch user profile
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (error && error.code !== 'PGRST116') {
              console.error('🔴 useAuth - Error fetching profile:', error);
            }
          } catch (error) {
            console.error('🔴 useAuth - Error in profile fetch:', error);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        console.error('🔴 useAuth - Error signing in with Google:', error);
        showError('Authentication Error', 'Failed to sign in with Google. Please try again.');
        throw error;
      }
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('🔴 useAuth - No OAuth URL generated');
        showError('Authentication Error', 'No OAuth URL was generated. Please try again.');
      }
      
      showSuccess('Redirecting...', 'Redirecting to Google for authentication.');
    } catch (error) {
      console.error('🔴 useAuth - Error signing in with Google:', error);
      showError('Authentication Error', 'Failed to sign in with Google. Please try again.');
      throw error;
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        console.error('🔴 useAuth - Error signing in with Microsoft:', error);
        showError('Authentication Error', 'Failed to sign in with Microsoft. Please try again.');
        throw error;
      }
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('🔴 useAuth - No OAuth URL generated');
        showError('Authentication Error', 'No OAuth URL was generated. Please try again.');
      }
      
      showSuccess('Redirecting...', 'Redirecting to Microsoft for authentication.');
    } catch (error) {
      console.error('🔴 useAuth - Error signing in with Microsoft:', error);
      showError('Authentication Error', 'Failed to sign in with Microsoft. Please try again.');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('🔴 useAuth - Error signing out:', error);
        showError('Sign Out Error', 'Failed to sign out. Please try again.');
      } else {
        showSuccess('Signed Out', 'You have been successfully signed out.');
      }
    } catch (error) {
      console.error('🔴 useAuth - Error signing out:', error);
      showError('Sign Out Error', 'Failed to sign out. Please try again.');
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signInWithMicrosoft,
    signOut,
  };
}
