import { g as getSupabaseServer } from './supabase_D10l6weB.mjs';

const GET = async ({ request }) => {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const search = url.searchParams.get("search") || "";
  const type = url.searchParams.get("type") || "";
  const status = url.searchParams.get("status") || "";
  const dateFrom = url.searchParams.get("from") || "";
  const dateTo = url.searchParams.get("to") || "";
  const pageSize = 20;
  const offset = (page - 1) * pageSize;
  try {
    const supabase = getSupabaseServer();
    let query = supabase.from("purchases").select(`
        *,
        users (display_name, phone_number),
        credit_packs (display_name),
        user_subscriptions (
          subscription_tiers (display_name)
        )
      `, { count: "exact" });
    if (type) {
      query = query.eq("purchase_type", type);
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (dateFrom) {
      query = query.gte("created_at", `${dateFrom}T00:00:00Z`);
    }
    if (dateTo) {
      query = query.lte("created_at", `${dateTo}T23:59:59Z`);
    }
    const { data, error, count } = await query.order("created_at", { ascending: false }).range(offset, offset + pageSize - 1);
    if (error) {
      console.error("Error fetching purchases:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch purchases" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    let purchases = (data || []).map((p) => ({
      id: p.id,
      user_id: p.user_id,
      user_name: p.users?.display_name || null,
      user_phone: p.users?.phone_number || null,
      purchase_type: p.purchase_type,
      pack_name: p.credit_packs?.display_name || null,
      tier_name: p.user_subscriptions?.subscription_tiers?.display_name || null,
      amount_ils: p.amount_ils,
      status: p.status,
      payment_gateway: p.payment_gateway || "cardcom",
      transaction_id: p.cardcom_transaction_id || p.meshulam_transaction_id || null,
      created_at: p.created_at
    }));
    if (search) {
      const searchLower = search.toLowerCase();
      purchases = purchases.filter(
        (p) => p.user_name?.toLowerCase().includes(searchLower) || p.meshulam_transaction_id?.includes(search)
      );
    }
    const totalPages = Math.ceil((count || 0) / pageSize);
    return new Response(JSON.stringify({
      purchases,
      page,
      pageSize,
      total: count || 0,
      totalPages
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Admin purchases API error:", error);
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
