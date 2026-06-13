import { g as getSupabaseServer } from './supabase_D10l6weB.mjs';

const GET = async ({ params }) => {
  const userId = params.id;
  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const supabase = getSupabaseServer();
    const { data: user, error: userError } = await supabase.from("users").select("*").eq("id", userId).single();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data: credits } = await supabase.from("user_credits").select("*").eq("user_id", userId).single();
    const { data: subscription } = await supabase.from("user_subscriptions").select(`
        *,
        subscription_tiers (name, display_name, monthly_credits)
      `).eq("user_id", userId).eq("status", "active").single();
    const { data: transactions } = await supabase.from("credit_transactions").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
    const { data: purchases } = await supabase.from("purchases").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(10);
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const { data: usage } = await supabase.from("usage_logs").select("action_type, credits_used").eq("user_id", userId).gte("created_at", thirtyDaysAgo.toISOString());
    const usageSummary = (usage || []).reduce((acc, log) => {
      acc[log.action_type] = (acc[log.action_type] || 0) + log.credits_used;
      return acc;
    }, {});
    return new Response(JSON.stringify({
      user,
      credits: credits || { balance: 0, lifetime_earned: 0, lifetime_spent: 0 },
      subscription: subscription || null,
      transactions: transactions || [],
      purchases: purchases || [],
      usageSummary
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Admin user detail API error:", error);
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
