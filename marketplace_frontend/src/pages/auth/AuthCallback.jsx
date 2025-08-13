import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabaseClient';
import { handleAuthError } from '../../utils/auth';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handle = async () => {
      try {
        // Prefer PKCE/OAuth with query-string exchange
        const qs = typeof window !== 'undefined' ? window.location.search : '';
        if (qs && qs.includes('code=')) {
          const { data, error } = await supabase.auth.exchangeCodeForSession({ queryString: qs });
          if (error) throw error;
          if (data?.session) {
            navigate('/dashboard', { replace: true });
            return;
          }
        }

        // Fallback for hash-based flows (legacy magic link)
        if (typeof supabase.auth.getSessionFromUrl === 'function') {
          const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
          if (error) throw error;
          if (data?.session) {
            navigate('/dashboard', { replace: true });
            return;
          }
        }

        // If we get here, no session was found
        setMessage('No session found. You can close this window.');
        navigate('/login', { replace: true });
      } catch (err) {
        handleAuthError(err, navigate);
      }
    };

    handle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Auth Callback</h2>
      <p className="helper">{message}</p>
    </div>
  );
}
