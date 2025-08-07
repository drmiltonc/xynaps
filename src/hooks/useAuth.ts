'use client';

import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { useNotifications } from './useNotifications';

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  specialty?: string;
  role: 'admin' | 'user' | 'subscriber';
  subscription_status: string;
  permissions: any;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session?.user) {
        await fetchUserProfile(session.user);
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setUser(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error('Error signing in with Google:', error);
        showError('Authentication Error', 'Failed to sign in with Google. Please try again.');
        throw error;
      }
      
      showSuccess('Redirecting...', 'Redirecting to Google for authentication.');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      showError('Authentication Error', 'Failed to sign in with Google. Please try again.');
      throw error;
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
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
        console.error('Error signing in with Microsoft:', error);
        showError('Authentication Error', 'Failed to sign in with Microsoft. Please try again.');
        throw error;
      }
      
      showSuccess('Redirecting...', 'Redirecting to Microsoft for authentication.');
    } catch (error) {
      console.error('Error signing in with Microsoft:', error);
      showError('Authentication Error', 'Failed to sign in with Microsoft. Please try again.');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        showError('Sign Out Error', 'Failed to sign out. Please try again.');
        throw error;
      }
      
      showSuccess('Signed Out', 'You have been successfully signed out.');
    } catch (error) {
      console.error('Error signing out:', error);
      showError('Sign Out Error', 'Failed to sign out. Please try again.');
      throw error;
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.permissions?.[permission] === true;
  };

  const hasRole = (role: string): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  return {
    user,
    session,
    loading,
    signInWithGoogle,
    signInWithMicrosoft,
    signOut,
    hasPermission,
    hasRole
  };
}
