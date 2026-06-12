/**
 * POST /api/auth/verify-otp
 * Verify OTP, find/create user, establish session
 */
import type { APIRoute } from 'astro';
import { getSupabaseServer } from '../../../lib/supabase';

interface VerifyOTPRequest {
  phone: string;
  otp: string;
}

const MAX_ATTEMPTS = 3;

// Normalize phone number (same as send-otp)
function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }
  let normalized = cleaned;
  if (normalized.startsWith('0')) {
    normalized = '972' + normalized.substring(1);
  } else if (!normalized.startsWith('972')) {
    normalized = '972' + normalized;
  }
  return normalized;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body: VerifyOTPRequest = await request.json();
    let { phone, otp } = body;

    // Normalize phone number for consistency
    phone = normalizePhone(phone);

    // Validate input
    if (!phone || !otp) {
      return new Response(JSON.stringify({ error: 'Missing phone or OTP' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!/^\d{6}$/.test(otp)) {
      return new Response(JSON.stringify({ error: 'OTP must be 6 digits' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabase = getSupabaseServer();

    console.log('Verifying OTP:', { phone, otp, timestamp: new Date().toISOString() });

    // Find valid OTP token
    const { data: tokens, error: fetchError } = await supabase
      .from('otp_tokens')
      .select('*')
      .eq('phone_number', phone)
      .eq('otp_code', otp)
      .is('used_at', null)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1);

    console.log('OTP query result:', { found: tokens?.length || 0, error: fetchError });

    if (fetchError || !tokens || tokens.length === 0) {
      // Debug: check if OTP exists at all
      const { data: allOtps } = await supabase
        .from('otp_tokens')
        .select('phone_number, otp_code, expires_at, used_at')
        .eq('phone_number', phone)
        .order('created_at', { ascending: false })
        .limit(3);

      console.log('Recent OTPs for this phone:', allOtps);

      return new Response(JSON.stringify({ error: 'Invalid or expired OTP' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = tokens[0];

    // Check attempts
    if (token.attempts >= MAX_ATTEMPTS) {
      return new Response(JSON.stringify({ error: 'Too many attempts. Request a new OTP.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Increment attempts
    const { error: updateError } = await supabase
      .from('otp_tokens')
      .update({ attempts: token.attempts + 1 })
      .eq('id', token.id);

    if (updateError) {
      console.error('Failed to update attempts:', updateError);
    }

    // Mark OTP as used
    const { error: markUsedError } = await supabase
      .from('otp_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', token.id);

    if (markUsedError) {
      console.error('Failed to mark OTP as used:', markUsedError);
      return new Response(JSON.stringify({ error: 'Failed to verify OTP' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Find or create user
    const { data: existingUsers } = await supabase
      .from('users')
      .select('id, phone_number, whatsapp_number, display_name')
      .eq('whatsapp_number', phone)
      .limit(1);

    let userId: string;

    if (existingUsers && existingUsers.length > 0) {
      // User exists
      userId = existingUsers[0].id;
    } else {
      // Create new user in auth.users first, then trigger will create users table entry
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        phone,
        phone_confirm: true,
        user_metadata: {
          whatsapp_number: phone,
          display_name: `User ${phone.slice(-4)}`,
        },
      });

      if (authError || !authData.user) {
        console.error('Failed to create auth user:', authError);
        return new Response(JSON.stringify({ error: 'Failed to create user' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      userId = authData.user.id;

      // Update users table with whatsapp_number
      await supabase
        .from('users')
        .update({ whatsapp_number: phone, phone_number: phone })
        .eq('id', userId);
    }

    // Create session - store session info in cookie
    const sessionData = {
      userId,
      phone,
      productType: token.product_type,
      productId: token.product_id,
      billingCycle: token.billing_cycle,
      createdAt: Date.now(),
    };

    // Set session cookie (15 minutes)
    cookies.set('forly_payment_session', JSON.stringify(sessionData), {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
    });

    return new Response(JSON.stringify({
      success: true,
      userId,
      productType: token.product_type,
      productId: token.product_id,
      billingCycle: token.billing_cycle,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
