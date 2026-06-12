/**
 * Admin API: Export credit transactions to CSV
 * GET /api/admin/credits/export?format=csv&search=&type=&source=&from=&to=
 */
import type { APIRoute } from 'astro';
import { getSupabaseServer } from '../../../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';
  const type = url.searchParams.get('type') || '';
  const source = url.searchParams.get('source') || '';
  const dateFrom = url.searchParams.get('from') || '';
  const dateTo = url.searchParams.get('to') || '';

  try {
    const supabase = getSupabaseServer();

    // Build query
    let query = supabase
      .from('credit_transactions')
      .select(`
        id,
        user_id,
        amount,
        transaction_type,
        source_type,
        action_type,
        balance_before,
        balance_after,
        description,
        created_at,
        users (display_name, phone_number)
      `)
      .order('created_at', { ascending: false })
      .limit(10000); // Max 10k rows for export

    // Apply filters
    if (type) {
      query = query.eq('transaction_type', type);
    }

    if (source) {
      query = query.eq('source_type', source);
    }

    if (dateFrom) {
      query = query.gte('created_at', `${dateFrom}T00:00:00Z`);
    }

    if (dateTo) {
      query = query.lte('created_at', `${dateTo}T23:59:59Z`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching transactions for export:', error);
      return new Response(JSON.stringify({ error: 'Failed to export transactions' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Transform and filter
    let transactions = (data || []).map((tx) => ({
      id: tx.id,
      user_name: (tx.users as any)?.display_name || '',
      user_phone: (tx.users as any)?.phone_number || '',
      amount: tx.amount / 100, // Convert to display value
      transaction_type: tx.transaction_type,
      source_type: tx.source_type,
      action_type: tx.action_type || '',
      balance_before: tx.balance_before / 100,
      balance_after: tx.balance_after / 100,
      description: tx.description || '',
      created_at: tx.created_at,
    }));

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      transactions = transactions.filter(
        (tx) =>
          tx.user_name.toLowerCase().includes(searchLower) ||
          tx.id.includes(search)
      );
    }

    // Generate CSV
    const headers = [
      'Transaction ID',
      'User Name',
      'User Phone',
      'Amount',
      'Type',
      'Source',
      'Action',
      'Balance Before',
      'Balance After',
      'Description',
      'Date',
    ];

    const rows = transactions.map((tx) => [
      tx.id,
      tx.user_name,
      tx.user_phone,
      tx.amount,
      tx.transaction_type,
      tx.source_type,
      tx.action_type,
      tx.balance_before,
      tx.balance_after,
      `"${(tx.description || '').replace(/"/g, '""')}"`,
      tx.created_at,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="credit-transactions-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Admin credits export API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
