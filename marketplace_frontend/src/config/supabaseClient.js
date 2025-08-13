import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars are missing. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY.');
}

// PUBLIC_INTERFACE
export const supabase = createClient(SUPABASE_URL || '', SUPABASE_KEY || '', {
  auth: {
    flowType: 'pkce',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

/**
 * PUBLIC_INTERFACE
 * getSupabase
 * Returns the initialized Supabase client instance.
 * Useful for imperative imports in modules/services.
 */
export function getSupabase() {
  /** Returns the initialized Supabase client instance. */
  return supabase;
}
