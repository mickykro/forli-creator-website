/**
 * Admin API: Get single user details
 * GET /api/admin/user/:id
 */
import type { APIRoute } from 'astro';
import { getSupabaseServer } from '../../../../lib/supabase';

export const GET: APIRoute = async ({ params }) => {
  const userId = params.id;

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabase = getSupabaseServer();

    // Get user profile
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get credit balance
    const { data: credits } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Get active subscription
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select(`
        *,
        subscription_tiers (name, display_name, monthly_credits)
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    // Get recent transactions
    const { data: transactions } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    // Get recent purchases
    const { data: purchases } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get usage summary (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: usage } = await supabase
      .from('usage_logs')
      .select('action_type, credits_used')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString());

    // Aggregate usage by type
    const usageSummary = (usage || []).reduce((acc, log) => {
      acc[log.action_type] = (acc[log.action_type] || 0) + log.credits_used;
      return acc;
    }, {} as Record<string, number>);

    return new Response(JSON.stringify({
      user,
      credits: credits || { balance: 0, lifetime_earned: 0, lifetime_spent: 0 },
      subscription: subscription || null,
      transactions: transactions || [],
      purchases: purchases || [],
      usageSummary,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Admin user detail API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
