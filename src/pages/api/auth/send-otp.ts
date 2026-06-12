/**
 * POST /api/auth/send-otp
 * Generate OTP and send via WhatsApp (Green API)
 */
import type { APIRoute } from 'astro';
import { getSupabaseServer } from '../../../lib/supabase';

const GREEN_API_INSTANCE = import.meta.env.GREENAPI_INSTANCE;
const GREEN_API_TOKEN = import.meta.env.GREENAPI_TOKEN;
const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://call4li.com';

// Debug: Check if env vars are loaded (remove after testing)
console.log('GREEN_API_INSTANCE:', GREEN_API_INSTANCE ? 'SET' : 'NOT SET');
console.log('GREEN_API_TOKEN:', GREEN_API_TOKEN ? 'SET' : 'NOT SET');

interface SendOTPRequest {
  phone: string;
  productType: 'credit_pack' | 'subscription';
  productId: string;
  billingCycle?: 'monthly' | 'annual';
}

// Validate Israeli mobile number (972 + 9 digits)
function validatePhone(phone: string): string | null {
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // Remove + prefix if exists
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }

  // Normalize to 972XXXXXXXXX format
  // Accept formats: +972542045280, 972542045280, 0542045280, 542045280
  let normalized = cleaned;
  if (normalized.startsWith('0')) {
    normalized = '972' + normalized.substring(1);
  } else if (!normalized.startsWith('972')) {
    normalized = '972' + normalized;
  }

  // Must be exactly 12 digits and start with 9725
  if (/^9725\d{8}$/.test(normalized)) {
    return normalized;
  }
  return null;
}

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send WhatsApp message via Green API
async function sendWhatsAppOTP(phone: string, otp: string, magicLink: string): Promise<void> {
  if (!GREEN_API_INSTANCE || !GREEN_API_TOKEN) {
    throw new Error('Green API credentials not configured');
  }

  const chatId = `${phone}@c.us`;
  const message = `קוד הכניסה שלך לפורלי: *${otp}*\n\nאו לחץ כאן להתחברות מהירה:\n${magicLink}\n\nהקוד תקף ל-10 דקות.`;

  const url = `https://api.green-api.com/waInstance${GREEN_API_INSTANCE}/sendMessage/${GREEN_API_TOKEN}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Green API error: ${error}`);
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: SendOTPRequest = await request.json();
    const { phone, productType, productId, billingCycle } = body;

    // Validate input
    if (!phone || !productType || !productId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate phone format
    const normalizedPhone = validatePhone(phone);
    if (!normalizedPhone) {
      return new Response(JSON.stringify({ error: 'Invalid Israeli phone number' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check rate limit
    const supabase = getSupabaseServer();
    const { data: canSend, error: rateLimitError } = await supabase.rpc('check_otp_rate_limit', {
      p_phone: normalizedPhone,
    });

    // If function doesn't exist yet (migration not run), allow send
    if (rateLimitError) {
      console.warn('Rate limit check failed (migration not run?):', rateLimitError);
    } else if (canSend === false) {
      // TODO: Remove this bypass after testing
      console.warn('Rate limit exceeded, but bypassing for development');
      // Uncomment for production:
      // return new Response(JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }), {
      //   status: 429,
      //   headers: { 'Content-Type': 'application/json' },
      // });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP
    const { error: insertError } = await supabase.from('otp_tokens').insert({
      phone_number: normalizedPhone,
      otp_code: otp,
      product_type: productType,
      product_id: productId,
      billing_cycle: billingCycle || null,
      expires_at: expiresAt.toISOString(),
    });

    if (insertError) {
      console.error('Failed to store OTP:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to create OTP' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build magic link
    const magicLink = `${SITE_URL}/auth/magic?otp=${otp}&phone=${encodeURIComponent(normalizedPhone)}&product=${productType}_${productId}${billingCycle ? `_${billingCycle}` : ''}`;

    // Send via WhatsApp
    try {
      await sendWhatsAppOTP(normalizedPhone, otp, magicLink);
    } catch (error) {
      console.error('Failed to send WhatsApp:', error);
      return new Response(JSON.stringify({ error: 'Failed to send OTP via WhatsApp' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return success (never reveal actual OTP)
    return new Response(JSON.stringify({
      success: true,
      phone: normalizedPhone, // Return normalized phone for verify-otp
      expiresAt: expiresAt.toISOString(),
      maskedPhone: `***${normalizedPhone.slice(-4)}`,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
