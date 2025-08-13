# Supabase Integration

This frontend uses Supabase for authentication.

Environment variables (required):
- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_KEY

These should be provided via your deployment environment. Do not commit secrets.

Initialization:
- src/config/supabaseClient.js creates and exports a singleton Supabase client.
- AuthProvider (src/context/AuthContext.jsx) manages the session, exposes auth methods (signInWithEmail, signUpWithEmail, signOut) and tracks `consentSigned`.

Email Redirect:
- Sign-up uses `emailRedirectTo: window.location.origin` so after email confirmation, the user returns to the current site URL.

Future database and RLS rules:
- Listener role and consent metadata are currently mocked with localStorage. Migrate these to Supabase tables and user metadata and enforce access with RLS for production.

Usage:
- Wrap the app in <AuthProvider> (already done in src/index.js).
- Use `useAuth()` to access `user`, `session`, `signInWithEmail`, `signUpWithEmail`, `signOut`, and `consentSigned`.

Security note:
- Never hardcode keys in source. Use environment variables only.
