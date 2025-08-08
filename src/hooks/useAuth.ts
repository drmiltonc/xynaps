'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useNotifications } from '@/hooks/useNotifications';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    console.log('🔵 useAuth - Getting initial session...');
    
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
        console.log('🔵 useAuth - Auth state change:', event, 'Session:', !!session, 'User:', session?.user?.email);
        
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN' && session?.user) {
          console.log('🟡 useAuth - User in auth change, fetching profile...');
          
          // Fetch user profile
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (error && error.code !== 'PGRST116') {
              console.error('🔴 useAuth - Error fetching profile:', error);
            } else if (profile) {
              console.log('✅ useAuth - Profile loaded:', profile.full_name);
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
      console.log('🔵 useAuth - Starting Google OAuth flow...');
      console.log('🔵 useAuth - Redirect URL:', `${window.location.origin}/auth/callback`);
      console.log('🔵 useAuth - Current URL:', window.location.href);
      console.log('🔵 useAuth - Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      
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
        console.error('🔴 useAuth - Error details:', {
          message: error.message,
          status: error.status,
          name: error.name
        });
        showError('Authentication Error', 'Failed to sign in with Google. Please try again.');
        throw error;
      }
      
      console.log('✅ useAuth - Google OAuth initiated successfully:', data);
      console.log('✅ useAuth - OAuth URL generated:', data.url);
      
      if (data.url) {
        console.log('✅ useAuth - Redirecting to OAuth URL...');
        console.log('✅ useAuth - OAuth URL:', data.url);
        // Use window.location.href for OAuth redirect
        window.location.href = data.url;
      } else {
        console.error('🔴 useAuth - No OAuth URL generated');
        showError('Authentication Error', 'No OAuth URL was generated. Please try again.');
      }
      
      showSuccess('Redirecting...', 'Redirecting to Google for authentication.');
    } catch (error) {
      console.error('🔴 useAuth - Error signing in with Google:', error);
      console.error('🔴 useAuth - Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      showError('Authentication Error', 'Failed to sign in with Google. Please try again.');
      throw error;
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      console.log('🔵 useAuth - Starting Microsoft OAuth flow...');
      console.log('🔵 useAuth - Redirect URL:', `${window.location.origin}/auth/callback`);
      console.log('🔵 useAuth - Current URL:', window.location.href);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'openid profile email User.Read',
          queryParams: {
            prompt: 'select_account'
          }
        }
      });

      if (error) {
        console.error('🔴 useAuth - Error signing in with Microsoft:', error);
        showError('Authentication Error', 'Failed to sign in with Microsoft. Please try again.');
        throw error;
      }
      
      console.log('✅ useAuth - Microsoft OAuth initiated successfully:', data);
      console.log('✅ useAuth - OAuth URL generated:', data.url);
      
      if (data.url) {
        console.log('✅ useAuth - Redirecting to OAuth URL...');
        console.log('✅ useAuth - OAuth URL:', data.url);
        // Use window.location.href for OAuth redirect
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
        console.log('✅ useAuth - User signed out successfully');
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
