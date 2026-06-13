import { g as getSupabaseServer } from './supabase_D10l6weB.mjs';

const GET = async ({ request }) => {
  const url = new URL(request.url);
  const period = url.searchParams.get("period") || "7d";
  const now = /* @__PURE__ */ new Date();
  let startDate = /* @__PURE__ */ new Date();
  let daysCount = 7;
  switch (period) {
    case "7d":
      startDate.setDate(now.getDate() - 7);
      daysCount = 7;
      break;
    case "30d":
      startDate.setDate(now.getDate() - 30);
      daysCount = 30;
      break;
    case "90d":
      startDate.setDate(now.getDate() - 90);
      daysCount = 90;
      break;
    default:
      startDate.setDate(now.getDate() - 7);
      daysCount = 7;
  }
  try {
    const supabase = getSupabaseServer();
    const { data: usageLogs, error } = await supabase.from("usage_logs").select("user_id, action_type, credits_used, created_at").gte("created_at", startDate.toISOString()).eq("status", "success");
    if (error) {
      console.error("Error fetching usage logs:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch usage data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const summary = {
      images: 0,
      videos: 0,
      carousels: 0,
      consultations: 0,
      totalCredits: 0
    };
    const byType = {};
    const byDate = {};
    const byUser = {};
    (usageLogs || []).forEach((log) => {
      const credits = log.credits_used || 0;
      summary.totalCredits += credits;
      byType[log.action_type] = (byType[log.action_type] || 0) + 1;
      if (log.action_type === "standard_image") {
        summary.images++;
      } else if (log.action_type === "standard_video" || log.action_type === "premium_video") {
        summary.videos++;
      } else if (log.action_type === "carousel") {
        summary.carousels++;
      } else if (log.action_type === "text_consultation") {
        summary.consultations++;
      }
      const dateKey = log.created_at.split("T")[0];
      byDate[dateKey] = (byDate[dateKey] || 0) + credits;
      if (!byUser[log.user_id]) {
        byUser[log.user_id] = { total: 0, images: 0, videos: 0, carousels: 0, lastActive: log.created_at };
      }
      byUser[log.user_id].total += credits;
      if (log.action_type === "standard_image") byUser[log.user_id].images++;
      else if (log.action_type === "standard_video" || log.action_type === "premium_video") byUser[log.user_id].videos++;
      else if (log.action_type === "carousel") byUser[log.user_id].carousels++;
      if (log.created_at > byUser[log.user_id].lastActive) {
        byUser[log.user_id].lastActive = log.created_at;
      }
    });
    const timeSeries = [];
    for (let i = daysCount - 1; i >= 0; i--) {
      const date = /* @__PURE__ */ new Date();
      date.setDate(now.getDate() - i);
      const dateKey = date.toISOString().split("T")[0];
      timeSeries.push({
        date: dateKey,
        total: byDate[dateKey] || 0
      });
    }
    const sortedUsers = Object.entries(byUser).sort(([, a], [, b]) => b.total - a.total).slice(0, 10);
    const topUserIds = sortedUsers.map(([id]) => id);
    const { data: userDetails } = await supabase.from("users").select("id, display_name").in("id", topUserIds);
    const userNameMap = (userDetails || []).reduce((acc, u) => {
      acc[u.id] = u.display_name;
      return acc;
    }, {});
    const topUsers = sortedUsers.map(([userId, data]) => ({
      user_id: userId,
      display_name: userNameMap[userId] || "Unknown",
      total_credits: data.total,
      images: data.images,
      videos: data.videos,
      carousels: data.carousels,
      last_active: data.lastActive
    }));
    return new Response(JSON.stringify({
      summary,
      byType,
      timeSeries,
      topUsers
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Admin usage API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
