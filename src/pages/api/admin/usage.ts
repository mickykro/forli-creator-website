/**
 * Admin API: Usage analytics
 * GET /api/admin/usage?period=7d
 */
import type { APIRoute } from 'astro';
import { getSupabaseServer } from '../../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const period = url.searchParams.get('period') || '7d';

  // Calculate date range
  const now = new Date();
  let startDate = new Date();
  let daysCount = 7;

  switch (period) {
    case '7d':
      startDate.setDate(now.getDate() - 7);
      daysCount = 7;
      break;
    case '30d':
      startDate.setDate(now.getDate() - 30);
      daysCount = 30;
      break;
    case '90d':
      startDate.setDate(now.getDate() - 90);
      daysCount = 90;
      break;
    default:
      startDate.setDate(now.getDate() - 7);
      daysCount = 7;
  }

  try {
    const supabase = getSupabaseServer();

    // Get all usage logs for the period
    const { data: usageLogs, error } = await supabase
      .from('usage_logs')
      .select('user_id, action_type, credits_used, created_at')
      .gte('created_at', startDate.toISOString())
      .eq('status', 'success');

    if (error) {
      console.error('Error fetching usage logs:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch usage data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Calculate summary
    const summary = {
      images: 0,
      videos: 0,
      carousels: 0,
      consultations: 0,
      totalCredits: 0,
    };

    const byType: Record<string, number> = {};
    const byDate: Record<string, number> = {};
    const byUser: Record<string, { total: number; images: number; videos: number; carousels: number; lastActive: string }> = {};

    (usageLogs || []).forEach((log) => {
      const credits = log.credits_used || 0;
      summary.totalCredits += credits;

      // By type
      byType[log.action_type] = (byType[log.action_type] || 0) + 1;

      // Summary counts
      if (log.action_type === 'standard_image') {
        summary.images++;
      } else if (log.action_type === 'standard_video' || log.action_type === 'premium_video') {
        summary.videos++;
      } else if (log.action_type === 'carousel') {
        summary.carousels++;
      } else if (log.action_type === 'text_consultation') {
        summary.consultations++;
      }

      // By date
      const dateKey = log.created_at.split('T')[0];
      byDate[dateKey] = (byDate[dateKey] || 0) + credits;

      // By user
      if (!byUser[log.user_id]) {
        byUser[log.user_id] = { total: 0, images: 0, videos: 0, carousels: 0, lastActive: log.created_at };
      }
      byUser[log.user_id].total += credits;
      if (log.action_type === 'standard_image') byUser[log.user_id].images++;
      else if (log.action_type === 'standard_video' || log.action_type === 'premium_video') byUser[log.user_id].videos++;
      else if (log.action_type === 'carousel') byUser[log.user_id].carousels++;

      if (log.created_at > byUser[log.user_id].lastActive) {
        byUser[log.user_id].lastActive = log.created_at;
      }
    });

    // Build time series (fill in missing dates)
    const timeSeries: Array<{ date: string; total: number }> = [];
    for (let i = daysCount - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      timeSeries.push({
        date: dateKey,
        total: byDate[dateKey] || 0,
      });
    }

    // Get top users
    const sortedUsers = Object.entries(byUser)
      .sort(([, a], [, b]) => b.total - a.total)
      .slice(0, 10);

    // Get user details
    const topUserIds = sortedUsers.map(([id]) => id);
    const { data: userDetails } = await supabase
      .from('users')
      .select('id, display_name')
      .in('id', topUserIds);

    const userNameMap = (userDetails || []).reduce((acc, u) => {
      acc[u.id] = u.display_name;
      return acc;
    }, {} as Record<string, string>);

    const topUsers = sortedUsers.map(([userId, data]) => ({
      user_id: userId,
      display_name: userNameMap[userId] || 'Unknown',
      total_credits: data.total,
      images: data.images,
      videos: data.videos,
      carousels: data.carousels,
      last_active: data.lastActive,
    }));

    return new Response(JSON.stringify({
      summary,
      byType,
      timeSeries,
      topUsers,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Admin usage API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
