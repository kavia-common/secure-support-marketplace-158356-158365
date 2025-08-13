# Supabase Integration

This frontend uses Supabase for authentication and will use Supabase Postgres for privacy-first data with RLS.

Environment variables (required):
- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_KEY

Optional but recommended:
- REACT_APP_SITE_URL (defaults to window.location.origin in the browser)

Do not commit secrets.

Initialization:
- src/config/supabaseClient.js creates and exports a singleton Supabase client with PKCE auth enabled.
- AuthProvider (src/context/AuthContext.jsx) manages the session, exposes auth methods (signInWithEmail, signUpWithEmail, signOut) and tracks `consentSigned`.

Dynamic Email/OAuth Redirects:
- Sign-up and other auth flows now use a dynamic URL utility (src/utils/getURL.js).
- Sign-up sets `emailRedirectTo: ${getURL()}auth/callback` so after confirmation, the user lands on /auth/callback.
- /auth/callback is handled by src/pages/auth/AuthCallback.jsx which finalizes sessions using `exchangeCodeForSession` and falls back to `getSessionFromUrl` for legacy hash-based links.
- Errors redirect to /auth/error with contextual messaging via src/utils/auth.js.

App Integration:
- App routes now include:
  - /auth/callback (AuthCallback)
  - /auth/error (AuthError)

Supabase Dashboard configuration:
1) Authentication > URL Configuration
   - Site URL: your production domain, e.g., https://yourapp.com
   - Redirect URLs (add each):
     * http://localhost:3000/**
     * https://yourapp.com/**
     * Any preview environments as needed
2) Authentication > Email Templates (optional)
   - Customize confirm/reset templates; ensure links point to /auth/callback and /auth/reset-password respectively if you implement reset.
3) Environment variables
   - REACT_APP_SUPABASE_URL
   - REACT_APP_SUPABASE_KEY
   - REACT_APP_SITE_URL (optional)
   - Never hardcode URLs; always use getURL().

Database schema and RLS (required for production):
Due to privacy requirements, the following minimal tables and policies are recommended:

Tables:
- public.profiles
  - id uuid primary key references auth.users(id) on delete cascade
  - display_name text
  - is_listener boolean not null default false
  - role text not null default 'user'
  - identity_verified boolean not null default false
  - consent_signed_at timestamptz
  - created_at timestamptz not null default now()
- public.bookings
  - id uuid primary key default gen_random_uuid()
  - user_id uuid not null references auth.users(id) on delete cascade
  - listener_id uuid not null references auth.users(id) on delete cascade
  - format text not null check (format in ('audio','video','text','in-person'))
  - slot timestamptz not null
  - note text
  - status text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed'))
  - created_at timestamptz not null default now()
- public.messages
  - id uuid primary key default gen_random_uuid()
  - conversation_id uuid not null
  - sender_id uuid not null references auth.users(id) on delete cascade
  - recipient_id uuid not null references auth.users(id) on delete cascade
  - body text not null
  - sent_at timestamptz not null default now()

RLS:
- ENABLE RLS on all three tables.
- profiles:
  - select: self (id = auth.uid())
  - additional public read of non-sensitive fields (display_name, is_listener) can be handled by view or policy depending on your needs.
  - insert/update: only self (auth.uid() = id)
- bookings:
  - select: owners (auth.uid() in (user_id, listener_id))
  - insert: only creator (auth.uid() = user_id)
  - update: owners (auth.uid() in (user_id, listener_id))
- messages:
  - select: participants (auth.uid() in (sender_id, recipient_id))
  - insert: only sender (auth.uid() = sender_id)

SQL (run in Supabase SQL editor):
Note: Our automated tool-based SQL execution failed because the RPC function public.run_sql was not available in your project. Please run the SQL below manually.

-- Tables
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  is_listener boolean not null default false,
  role text not null default 'user',
  identity_verified boolean not null default false,
  consent_signed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  listener_id uuid not null references auth.users(id) on delete cascade,
  format text not null check (format in ('audio','video','text','in-person')),
  slot timestamptz not null,
  note text,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed')),
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null,
  sender_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  sent_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.messages enable row level security;

-- Profiles policies
create policy if not exists "profiles_self_read" on public.profiles for select using (auth.uid() = id);
-- If you want limited public read (e.g., only display_name, is_listener), prefer a view with explicit grants
-- or adjust to: using (true) with a column filter at the API layer.
create policy if not exists "profiles_self_upsert" on public.profiles for insert with check (auth.uid() = id);
create policy if not exists "profiles_self_update" on public.profiles for update using (auth.uid() = id);

-- Bookings policies
create policy if not exists "bookings_owner_read" on public.bookings for select using (auth.uid() = user_id or auth.uid() = listener_id);
create policy if not exists "bookings_user_create" on public.bookings for insert with check (auth.uid() = user_id);
create policy if not exists "bookings_owner_update" on public.bookings for update using (auth.uid() = user_id or auth.uid() = listener_id);

-- Messages policies
create policy if not exists "messages_owner_read" on public.messages for select using (auth.uid() = sender_id or auth.uid() = recipient_id);
create policy if not exists "messages_owner_insert" on public.messages for insert with check (auth.uid() = sender_id);

Post-setup:
- Create a row in public.profiles for each new user on signup via a Supabase Edge Function or database trigger.
- Migrate consentSigned and listener role data from localStorage to profiles table.
- Replace local placeholders in pages/services with real Supabase queries guarded by RLS.

Troubleshooting:
- If you receive PGRST202 related to public.run_sql, create the RPC or run SQL via the Supabase SQL editor. The UI Editor is recommended for security-sensitive migrations.
- Ensure auth URLs (Site URL and Redirect URLs) are configured, otherwise OAuth/email flows may fail with redirect errors.

Security notes:
- Never hardcode keys in source. Use environment variables only.
- Keep both localhost and production URLs in the Auth Redirect URL allowlist.
- Use RLS to enforce access control at the database layer for all user data.

