import { g as getSupabaseServer } from './supabase_D10l6weB.mjs';

const GET = async ({ request }) => {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const search = url.searchParams.get("search") || "";
  const tier = url.searchParams.get("tier") || "";
  const status = url.searchParams.get("status") || "";
  const pageSize = 20;
  const offset = (page - 1) * pageSize;
  try {
    const supabase = getSupabaseServer();
    let query = supabase.from("user_subscriptions").select(`
        *,
        users (display_name, phone_number),
        subscription_tiers (name, display_name)
      `, { count: "exact" });
    if (tier) {
      query = query.eq("tier_id", tier);
    }
    if (status) {
      query = query.eq("status", status);
    }
    const { data, error, count } = await query.order("created_at", { ascending: false }).range(offset, offset + pageSize - 1);
    if (error) {
      console.error("Error fetching subscriptions:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch subscriptions" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    let subscriptions = (data || []).map((sub) => ({
      id: sub.id,
      user_id: sub.user_id,
      user_name: sub.users?.display_name || null,
      user_phone: sub.users?.phone_number || null,
      tier_id: sub.tier_id,
      tier_name: sub.subscription_tiers?.display_name || sub.tier_id,
      status: sub.status,
      start_date: sub.start_date,
      next_billing_date: sub.next_billing_date,
      expires_at: sub.expires_at,
      cancelled_at: sub.cancelled_at,
      created_at: sub.created_at
    }));
    if (search) {
      const searchLower = search.toLowerCase();
      subscriptions = subscriptions.filter(
        (sub) => sub.user_name?.toLowerCase().includes(searchLower) || sub.user_phone?.includes(search)
      );
    }
    const totalPages = Math.ceil((count || 0) / pageSize);
    return new Response(JSON.stringify({
      subscriptions,
      page,
      pageSize,
      total: count || 0,
      totalPages
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Admin subscriptions API error:", error);
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
