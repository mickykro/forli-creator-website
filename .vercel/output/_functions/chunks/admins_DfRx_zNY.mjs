import { g as getSupabaseServer } from './supabase_D10l6weB.mjs';

const GET = async () => {
  try {
    const supabase = getSupabaseServer();
    return new Response(JSON.stringify({
      admins: [],
      message: "Admin user list requires Edge Function implementation"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Admin list API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const supabase = getSupabaseServer();
    console.log(`Admin access requested for: ${email}`);
    return new Response(JSON.stringify({
      success: true,
      message: "Admin access granted (requires Edge Function implementation)"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Admin add API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const DELETE = async ({ request }) => {
  try {
    const body = await request.json();
    const { userId } = body;
    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const supabase = getSupabaseServer();
    console.log(`Admin access removal requested for: ${userId}`);
    return new Response(JSON.stringify({
      success: true,
      message: "Admin access removed (requires Edge Function implementation)"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Admin remove API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
