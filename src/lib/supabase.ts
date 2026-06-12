/**
 * Supabase client configuration
 * Browser client uses anon key; server client uses service role key
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  console.warn('Missing PUBLIC_SUPABASE_URL environment variable');
}

// Browser client - safe for client-side usage with RLS
let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient {
  if (!browserClient && SUPABASE_URL && SUPABASE_ANON_KEY) {
    browserClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  if (!browserClient) {
    throw new Error('Supabase browser client not configured');
  }
  return browserClient;
}

// Server client - bypasses RLS, only use in API routes
export function getSupabaseServer(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase server configuration');
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Server client from request cookies - for authenticated routes
export function getSupabaseFromCookies(cookies: string | undefined): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase configuration');
  }

  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: cookies ? { cookie: cookies } : {},
    },
  });

  return client;
}

// Type exports for database schema
export type { SupabaseClient };
