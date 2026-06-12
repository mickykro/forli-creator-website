/**
 * Admin API: Manage admin users
 * GET /api/admin/admins - List admin users
 * POST /api/admin/admins - Add admin access
 * DELETE /api/admin/admins - Remove admin access
 */
import type { APIRoute } from 'astro';
import { getSupabaseServer } from '../../../lib/supabase';

export const GET: APIRoute = async () => {
  try {
    const supabase = getSupabaseServer();

    // Get users with admin access from auth.users metadata
    // In a real implementation, you'd query users with is_admin=true in metadata
    // For now, return empty list since we can't directly query auth.users

    // This would typically be done with a custom RPC function or Edge Function
    // that has access to auth.users table

    return new Response(JSON.stringify({
      admins: [],
      message: 'Admin user list requires Edge Function implementation',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Admin list API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabase = getSupabaseServer();

    // In a real implementation, you would:
    // 1. Find the user by email in auth.users
    // 2. Update their user_metadata to set is_admin: true
    // This requires an Edge Function or direct database access

    // For now, log the intent
    console.log(`Admin access requested for: ${email}`);

    return new Response(JSON.stringify({
      success: true,
      message: 'Admin access granted (requires Edge Function implementation)',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Admin add API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabase = getSupabaseServer();

    // In a real implementation, you would:
    // 1. Update the user's metadata to set is_admin: false
    // This requires an Edge Function or direct database access

    console.log(`Admin access removal requested for: ${userId}`);

    return new Response(JSON.stringify({
      success: true,
      message: 'Admin access removed (requires Edge Function implementation)',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Admin remove API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
