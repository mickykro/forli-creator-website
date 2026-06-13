import { g as getSupabaseServer } from './supabase_D10l6weB.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { userId, amount, reason } = body;
    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: "Amount must be positive" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!reason || reason.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Reason required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const supabase = getSupabaseServer();
    const { data, error } = await supabase.rpc("add_credits", {
      p_user_id: userId,
      p_amount: amount,
      p_source_type: "admin_adjustment",
      p_source_id: null,
      p_description: reason.trim()
    });
    if (error) {
      console.error("Error granting credits:", error);
      return new Response(JSON.stringify({ error: error.message || "Failed to grant credits" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log(`Admin granted ${amount} credits to user ${userId}: ${reason}`);
    return new Response(JSON.stringify({
      success: true,
      transactionId: data,
      message: `Successfully granted ${amount / 100} credits`
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Admin grant credits API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
