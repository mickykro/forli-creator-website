import { g as getSupabaseServer } from './supabase_D10l6weB.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { subscriptionId, action, data } = body;
    if (!subscriptionId) {
      return new Response(JSON.stringify({ error: "Subscription ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!action || !["cancel", "extend", "change_tier", "reactivate"].includes(action)) {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const supabase = getSupabaseServer();
    const { data: subscription, error: fetchError } = await supabase.from("user_subscriptions").select("*").eq("id", subscriptionId).single();
    if (fetchError || !subscription) {
      return new Response(JSON.stringify({ error: "Subscription not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    let updateData = {};
    let message = "";
    switch (action) {
      case "cancel":
        updateData = {
          status: "cancelled",
          cancelled_at: (/* @__PURE__ */ new Date()).toISOString(),
          cancellation_reason: data?.reason || "Admin cancelled"
        };
        message = "Subscription cancelled";
        break;
      case "extend":
        const currentBillingDate = subscription.next_billing_date ? new Date(subscription.next_billing_date) : /* @__PURE__ */ new Date();
        currentBillingDate.setDate(currentBillingDate.getDate() + 30);
        updateData = {
          next_billing_date: currentBillingDate.toISOString(),
          expires_at: currentBillingDate.toISOString()
        };
        message = "Subscription extended by 30 days";
        break;
      case "change_tier":
        if (!data?.newTier) {
          return new Response(JSON.stringify({ error: "New tier required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }
        const { data: tier, error: tierError } = await supabase.from("subscription_tiers").select("id").eq("id", data.newTier).single();
        if (tierError || !tier) {
          return new Response(JSON.stringify({ error: "Invalid tier" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }
        updateData = {
          tier_id: data.newTier
        };
        message = `Subscription tier changed to ${data.newTier}`;
        break;
      case "reactivate":
        if (subscription.status !== "cancelled") {
          return new Response(JSON.stringify({ error: "Can only reactivate cancelled subscriptions" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }
        const nextBillingDate = /* @__PURE__ */ new Date();
        nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
        updateData = {
          status: "active",
          cancelled_at: null,
          cancellation_reason: null,
          next_billing_date: nextBillingDate.toISOString()
        };
        message = "Subscription reactivated";
        break;
    }
    const { error: updateError } = await supabase.from("user_subscriptions").update(updateData).eq("id", subscriptionId);
    if (updateError) {
      console.error("Error updating subscription:", updateError);
      return new Response(JSON.stringify({ error: "Failed to update subscription" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log(`Admin ${action} subscription ${subscriptionId}:`, updateData);
    return new Response(JSON.stringify({
      success: true,
      message
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Admin subscription update API error:", error);
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
