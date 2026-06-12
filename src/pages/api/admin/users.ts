/**
 * Admin API: Users list with pagination and filters
 * GET /api/admin/users?page=1&search=&tier=&status=
 */
import type { APIRoute } from 'astro';
import { getSupabaseServer } from '../../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const search = url.searchParams.get('search') || '';
  const tier = url.searchParams.get('tier') || '';
  const status = url.searchParams.get('status') || '';
  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  try {
    const supabase = getSupabaseServer();

    // Build base query
    let query = supabase
      .from('users')
      .select(`
        id,
        phone_number,
        display_name,
        created_at,
        user_credits (balance),
        user_subscriptions!inner (tier_id, status)
      `, { count: 'exact' });

    // Apply search filter
    if (search) {
      query = query.or(`display_name.ilike.%${search}%,phone_number.ilike.%${search}%`);
    }

    // Apply tier filter
    if (tier) {
      query = query.eq('user_subscriptions.tier_id', tier);
    }

    // Apply status filter
    if (status) {
      query = query.eq('user_subscriptions.status', status);
    }

    // Get total count and paginated results
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.error('Error fetching users:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Transform data
    const users = (data || []).map((user) => ({
      id: user.id,
      phone_number: user.phone_number,
      display_name: user.display_name,
      created_at: user.created_at,
      credits_balance: user.user_credits?.[0]?.balance || 0,
      subscription_tier: user.user_subscriptions?.[0]?.tier_id || null,
      subscription_status: user.user_subscriptions?.[0]?.status || null,
    }));

    const totalPages = Math.ceil((count || 0) / pageSize);

    return new Response(JSON.stringify({
      users,
      page,
      pageSize,
      total: count || 0,
      totalPages,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Admin users API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
