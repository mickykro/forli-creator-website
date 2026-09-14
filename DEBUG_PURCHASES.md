# Purchase Creation Debugging Guide

## Purchase Flow

### Free Purchases (100% Promo Code)
1. User applies promo code with 100% discount
2. `create-link.ts` immediately:
   - Creates purchase record in `purchases` table
   - Grants credits
   - Redirects to success page
3. **No webhook needed**

### Paid Purchases (Cardcom Payment)
1. User completes OTP verification
2. `create-link.ts` creates Cardcom payment link
3. User redirected to Cardcom payment page
4. User completes payment
5. **Cardcom sends webhook to n8n** with payment confirmation
6. **n8n workflow must:**
   - Parse Cardcom response
   - Extract `ReturnValue` JSON containing:
     ```json
     {
       "userId": "uuid",
       "productType": "credit_pack",
       "productId": "taste",
       "billingCycle": null,
       "phone": "972542045280",
       "promoCode": "LAUNCH50",
       "originalPrice": 20,
       "discountAmount": 10
     }
     ```
   - Create purchase record in Supabase
   - Grant credits to user

## Required Purchase Record Fields

```sql
INSERT INTO public.purchases (
  user_id,              -- From ReturnValue.userId
  purchase_type,        -- 'credit_pack' or 'subscription'
  credit_pack_id,       -- From ReturnValue.productId (if credit_pack)
  amount_ils,           -- From Cardcom.Amount (or originalPrice - discountAmount)
  status,               -- 'completed'
  fulfilled_at,         -- NOW()
  credits_granted,      -- Pack credits * 100 (e.g., 20 credits = 2000)
  payment_gateway,      -- 'cardcom'
  cardcom_low_profile_id,   -- From Cardcom.LowProfileId
  cardcom_transaction_id,   -- From Cardcom.InternalDealNumber
  cardcom_response      -- Full Cardcom JSON response
) VALUES (...);
```

## Debugging Steps

### 1. Check if migrations ran
```bash
cd forli-creator-website
supabase migration up
```

Required migrations:
- `20240101000004_payment_tracking.sql` - Creates purchases table
- `20240101000011_replace_meshulam_with_cardcom.sql` - Adds Cardcom fields
- `20240101000013_allow_zero_amount_promo.sql` - Allows zero amount

### 2. Check purchases table
```sql
-- In Supabase SQL Editor
SELECT
  id,
  user_id,
  purchase_type,
  amount_ils,
  status,
  payment_gateway,
  cardcom_transaction_id,
  created_at
FROM public.purchases
ORDER BY created_at DESC
LIMIT 10;
```

### 3. Check n8n webhook logs
1. Go to n8n: https://n8n.srv1173890.hstgr.cloud
2. Find workflow: "Cardcom Credits"
3. Check executions for errors
4. Verify webhook URL matches: `/webhook/cardcom-credits`

### 4. Check Cardcom webhook configuration
The webhook URL should be:
```
https://n8n.srv1173890.hstgr.cloud/webhook/cardcom-credits
```

### 5. Manual test - Create purchase record
```sql
-- Test free purchase creation
INSERT INTO public.purchases (
  user_id,
  purchase_type,
  credit_pack_id,
  amount_ils,
  status,
  fulfilled_at,
  credits_granted,
  payment_gateway,
  cardcom_response
) VALUES (
  'your-user-id-here',
  'credit_pack',
  'taste',
  0,
  'completed',
  NOW(),
  2000,  -- 20 credits * 100
  'promo',
  '{"promo_code": "FREE100", "free_purchase": true}'::jsonb
);
```

## Common Issues

### Issue: "No purchase found in table"
**Causes:**
1. n8n webhook not firing
2. n8n workflow has errors
3. Cardcom webhook URL misconfigured
4. Migrations not run

**Fix:**
1. Check n8n execution logs
2. Verify webhook URL in Cardcom dashboard
3. Run migrations
4. Test webhook manually with Cardcom's test tool

### Issue: "Cannot insert zero amount"
**Cause:** Migration 013 not run

**Fix:**
```bash
supabase migration up
```

### Issue: "Column 'product_type' does not exist"
**Cause:** Using wrong column names (should be `purchase_type`, not `product_type`)

**Fix:** Already fixed in create-link.ts

## n8n Workflow Example

The n8n workflow should:

```javascript
// 1. Parse webhook
const cardcomData = $input.all()[0].json;
const returnValue = JSON.parse(cardcomData.ReturnValue);

// 2. Get credit pack info
const creditPacks = {
  'taste': { credits: 20, price: 20 },
  'starter': { credits: 50, price: 45 },
  // ... etc
};

const pack = creditPacks[returnValue.productId];

// 3. Insert purchase
await supabase.from('purchases').insert({
  user_id: returnValue.userId,
  purchase_type: 'credit_pack',
  credit_pack_id: returnValue.productId,
  amount_ils: cardcomData.Amount || (returnValue.originalPrice - returnValue.discountAmount),
  status: 'completed',
  fulfilled_at: new Date().toISOString(),
  credits_granted: pack.credits * 100,
  payment_gateway: 'cardcom',
  cardcom_low_profile_id: cardcomData.LowProfileId,
  cardcom_transaction_id: cardcomData.InternalDealNumber,
  cardcom_response: cardcomData
});

// 4. Grant credits (triggers add_credits function)
// This happens automatically via the complete_purchase function
// OR manually call add_credits RPC
```

## Next Steps

1. Run all migrations
2. Check n8n workflow configuration
3. Test with a real payment
4. Check n8n execution logs
5. Query purchases table to verify record created
