/**
 * Admin API: Analytics and KPIs
 * GET /api/admin/analytics?period=30d
 */
import type { APIRoute } from 'astro';
import { getSupabaseServer } from '../../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const period = url.searchParams.get('period') || '30d';

  // Calculate date range
  const now = new Date();
  let startDate = new Date();

  switch (period) {
    case '7d':
      startDate.setDate(now.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(now.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(now.getDate() - 90);
      break;
    case '365d':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      startDate.setDate(now.getDate() - 30);
  }

  try {
    const supabase = getSupabaseServer();

    // Get active subscriptions count and MRR
    const { data: activeSubscriptions, error: subError } = await supabase
      .from('user_subscriptions')
      .select(`
        tier_id,
        subscription_tiers (price_ils)
      `)
      .eq('status', 'active');

    if (subError) {
      console.error('Error fetching subscriptions:', subError);
    }

    const mrr = (activeSubscriptions || []).reduce((sum, sub) => {
      return sum + ((sub.subscription_tiers as any)?.price_ils || 0);
    }, 0);

    const activeSubscribers = (activeSubscriptions || []).length;

    // Get trial users (users with credits but no active subscription)
    const { count: trialUsers } = await supabase
      .from('user_credits')
      .select('user_id', { count: 'exact', head: true })
      .gt('balance', 0);

    // Get this month's revenue
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const { data: monthPurchases } = await supabase
      .from('purchases')
      .select('amount_ils')
      .eq('status', 'completed')
      .gte('created_at', monthStart.toISOString());

    const monthRevenue = (monthPurchases || []).reduce((sum, p) => sum + p.amount_ils, 0);

    // Get recent payments
    const { data: recentPayments } = await supabase
      .from('purchases')
      .select(`
        id,
        user_id,
        purchase_type,
        amount_ils,
        status,
        created_at,
        users (display_name)
      `)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(10);

    // Get top users by credit usage
    const { data: topUsersData } = await supabase
      .from('usage_logs')
      .select('user_id, credits_used')
      .gte('created_at', startDate.toISOString());

    // Aggregate by user
    const userUsage = (topUsersData || []).reduce((acc, log) => {
      acc[log.user_id] = (acc[log.user_id] || 0) + log.credits_used;
      return acc;
    }, {} as Record<string, number>);

    // Sort and get top 10
    const sortedUsers = Object.entries(userUsage)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    // Get user details for top users
    const topUserIds = sortedUsers.map(([id]) => id);
    const { data: topUserDetails } = await supabase
      .from('users')
      .select('id, display_name')
      .in('id', topUserIds);

    const userNameMap = (topUserDetails || []).reduce((acc, u) => {
      acc[u.id] = u.display_name;
      return acc;
    }, {} as Record<string, string>);

    const topUsers = sortedUsers.map(([userId, credits]) => ({
      user_id: userId,
      display_name: userNameMap[userId] || 'Unknown',
      credits_used: credits,
      action_count: (topUsersData || []).filter((l) => l.user_id === userId).length,
    }));

    // Subscription distribution
    const tierCounts = (activeSubscriptions || []).reduce((acc, sub) => {
      acc[sub.tier_id] = (acc[sub.tier_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return new Response(JSON.stringify({
      mrr,
      activeSubscribers,
      trialUsers: (trialUsers || 0) - activeSubscribers,
      monthRevenue,
      recentPayments: (recentPayments || []).map((p) => ({
        ...p,
        user_name: (p.users as any)?.display_name,
      })),
      topUsers,
      tierDistribution: tierCounts,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Admin analytics API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
