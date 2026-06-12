/**
 * Admin API: Credit transactions list with pagination and filters
 * GET /api/admin/credits?page=1&search=&type=&source=&from=&to=
 */
import type { APIRoute } from 'astro';
import { getSupabaseServer } from '../../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const search = url.searchParams.get('search') || '';
  const type = url.searchParams.get('type') || '';
  const source = url.searchParams.get('source') || '';
  const dateFrom = url.searchParams.get('from') || '';
  const dateTo = url.searchParams.get('to') || '';
  const pageSize = 50;
  const offset = (page - 1) * pageSize;

  try {
    const supabase = getSupabaseServer();

    // Build query
    let query = supabase
      .from('credit_transactions')
      .select(`
        *,
        users (display_name)
      `, { count: 'exact' });

    // Apply type filter
    if (type) {
      query = query.eq('transaction_type', type);
    }

    // Apply source filter
    if (source) {
      query = query.eq('source_type', source);
    }

    // Apply date filters
    if (dateFrom) {
      query = query.gte('created_at', `${dateFrom}T00:00:00Z`);
    }

    if (dateTo) {
      query = query.lte('created_at', `${dateTo}T23:59:59Z`);
    }

    // Get results
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.error('Error fetching transactions:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch transactions' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Transform and filter
    let transactions = (data || []).map((tx) => ({
      id: tx.id,
      user_id: tx.user_id,
      user_name: (tx.users as any)?.display_name || null,
      amount: tx.amount,
      transaction_type: tx.transaction_type,
      source_type: tx.source_type,
      action_type: tx.action_type,
      balance_before: tx.balance_before,
      balance_after: tx.balance_after,
      description: tx.description,
      created_at: tx.created_at,
    }));

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      transactions = transactions.filter(
        (tx) =>
          tx.user_name?.toLowerCase().includes(searchLower) ||
          tx.id.includes(search)
      );
    }

    const totalPages = Math.ceil((count || 0) / pageSize);

    return new Response(JSON.stringify({
      transactions,
      page,
      pageSize,
      total: count || 0,
      totalPages,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Admin credits API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
