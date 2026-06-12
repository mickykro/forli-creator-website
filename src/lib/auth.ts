/**
 * Authentication helpers for Forly admin dashboard
 * Handles Supabase Auth session management and admin role checking
 */
import type { AstroGlobal } from 'astro';
import { getSupabaseBrowser } from './supabase';

export interface Session {
  user: {
    id: string;
    email: string;
    role?: string;
    user_metadata?: {
      display_name?: string;
      is_admin?: boolean;
    };
  };
  access_token: string;
  expires_at?: number;
}

/**
 * Get current session from Supabase Auth
 */
export async function getSession(): Promise<Session | null> {
  try {
    const supabase = getSupabaseBrowser();
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      return null;
    }

    return {
      user: {
        id: session.user.id,
        email: session.user.email || '',
        role: session.user.role,
        user_metadata: session.user.user_metadata as Session['user']['user_metadata'],
      },
      access_token: session.access_token,
      expires_at: session.expires_at,
    };
  } catch {
    return null;
  }
}

/**
 * Check if user has admin privileges
 * Checks JWT claims for admin role or user_metadata.is_admin flag
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;

  // Check role claim in JWT
  if (session.user.role === 'admin' || session.user.role === 'service_role') {
    return true;
  }

  // Check user_metadata for is_admin flag
  if (session.user.user_metadata?.is_admin === true) {
    return true;
  }

  return false;
}

/**
 * Require admin access - redirects to login if not authenticated/admin
 */
export async function requireAdmin(astro: AstroGlobal): Promise<Session> {
  const session = await getSession();

  if (!session) {
    return astro.redirect('/admin/login') as never;
  }

  const hasAdminAccess = await isAdmin();
  if (!hasAdminAccess) {
    return astro.redirect('/admin/login?error=unauthorized') as never;
  }

  return session;
}

/**
 * Sign out current user
 */
export async function logout(): Promise<void> {
  const supabase = getSupabaseBrowser();
  await supabase.auth.signOut();
}

/**
 * Parse JWT to get claims (client-side helper)
 */
export function parseJwtClaims(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Get admin user display info
 */
export async function getAdminInfo(): Promise<{ name: string; email: string } | null> {
  const session = await getSession();
  if (!session) return null;

  return {
    name: session.user.user_metadata?.display_name || session.user.email.split('@')[0],
    email: session.user.email,
  };
}
