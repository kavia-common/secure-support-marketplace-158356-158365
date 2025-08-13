import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { getURL } from '../utils/getURL';

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Provides authentication state and actions to the application.
   * Handles Supabase session, consent flag, and simple role state.
   */
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isListener, setIsListener] = useState(false);
  const [consentSigned, setConsentSigned] = useState(localStorage.getItem('consentSigned') === 'true');

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, _session) => {
      setSession(_session);
      setUser(_session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setIsListener(false);
      return;
    }
    // Placeholder role detection. Replace with fetch to backend or Supabase RLS.
    const role = localStorage.getItem(`role:${user.id}`) || 'user';
    setIsListener(role === 'listener');
  }, [user]);

  const value = useMemo(() => ({
    session,
    user,
    loading,
    isListener,
    consentSigned,
    // PUBLIC_INTERFACE
    async signInWithEmail(email, password) {
      /** Sign in with email/password using Supabase. */
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setSession(data.session);
      setUser(data.user);
      return data;
    },
    // PUBLIC_INTERFACE
    async signUpWithEmail(email, password) {
      /**
       * Sign up with email/password using Supabase.
       * The email redirect is set to SITE_URL via env on deployment.
       */
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${getURL()}auth/callback`,
        },
      });
      if (error) throw error;
      return data;
    },
    // PUBLIC_INTERFACE
    async signOut() {
      /** Sign out the current user. */
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
    },
    // PUBLIC_INTERFACE
    markConsentSigned() {
      /** Mark that the user has signed consent. */
      localStorage.setItem('consentSigned', 'true');
      setConsentSigned(true);
    },
    // PUBLIC_INTERFACE
    setListenerRole(flag) {
      /** Temporary function to set listener role flag for demo purposes. */
      if (user) localStorage.setItem(`role:${user.id}`, flag ? 'listener' : 'user');
      setIsListener(Boolean(flag));
    }
  }), [session, user, loading, isListener, consentSigned]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access the auth context state and actions. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
