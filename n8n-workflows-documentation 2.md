# Forly Payment System - n8n Workflows Documentation

**Generated:** 2026-05-26  
**Total Workflows:** 16  
**Total Nodes:** 122

---

## Table of Contents

1. [Security & Validation Workflows](#security--validation-workflows)
2. [Payment Processing Workflows](#payment-processing-workflows)
3. [Billing Management Workflows](#billing-management-workflows)
4. [Credit Management Workflows](#credit-management-workflows)
5. [User Acquisition Workflows](#user-acquisition-workflows)
6. [Workflow Integration Map](#workflow-integration-map)
7. [Quick Reference](#quick-reference)

---

## Security & Validation Workflows

### 1. Webhook Verify - HMAC Signature
**ID:** `WYPEptlWf8JBMWLr`  
**Purpose:** HMAC signature validation for Meshulam payment webhooks with replay attack prevention  
**Node Count:** 5  
**Type:** Sub-workflow (called by other workflows)

| Node | Type | Description |
|------|------|-------------|
| Receive Webhook Data | Execute Workflow Trigger | Accepts signature, rawBody, and timestamp inputs from calling workflows |
| Verify HMAC Signature | Code | Calculates SHA256 HMAC using MESHULAM_WEBHOOK_SECRET, validates timestamp within 5-minute window to prevent replay attacks |
| Is Signature Valid | If | Routes flow based on whether signature verification passed |
| Return Valid | Set | Returns verified=true with success message |
| Return Invalid | Set | Returns verified=false with error details |

**Inputs:**
- `signature` (string) - HMAC signature from webhook header
- `rawBody` (string) - Raw webhook body
- `timestamp` (number) - Webhook timestamp

**Outputs:**
- `verified` (boolean) - Whether signature is valid
- `message` (string) - Success or error message

---

### 2. Security Prescreen - Prompt Injection Defense
**ID:** `dhW5z4atV74HsKSS`  
**Purpose:** Prompt injection defense with pattern detection and suspicious character filtering  
**Node Count:** 5  
**Type:** Sub-workflow

| Node | Type | Description |
|------|------|-------------|
| Receive Input | Execute Workflow Trigger | Accepts user input text and userId for security screening |
| Check Prompt Injection | Code | Scans input against 18+ injection patterns (jailbreak, DAN mode, system overrides), detects control characters, excessive length, and repeated patterns |
| Is Input Safe | If | Routes based on whether input passed all security checks |
| Return Safe | Set | Returns allowed=true with security clearance message |
| Return Blocked | Set | Returns allowed=false with threat details (severity, threat types) |

**Injection Patterns Detected:**
- Jailbreak attempts ("ignore previous instructions", "DAN mode")
- System overrides ("system:", "admin:", "developer mode")
- Control characters and excessive length
- Repeated patterns (potential spam)

**Outputs:**
- `allowed` (boolean) - Whether input is safe
- `threatTypes` (array) - List of detected threats if blocked

---

### 3. Rate Limit Check - Sliding Window
**ID:** `40rmPgTVltIbobF8`  
**Purpose:** Sliding window rate limiting using Supabase RPC function  
**Node Count:** 6  
**Type:** Sub-workflow

| Node | Type | Description |
|------|------|-------------|
| Receive Rate Limit Request | Execute Workflow Trigger | Accepts userId, action type, limit count, and window duration in seconds |
| Sliding Window Rate Limit | Code | Generates rate limit key (userId:action), calculates sliding window timestamps |
| Check Rate Limit in Supabase | HTTP Request | Calls Supabase check_rate_limit RPC to verify against stored request counts |
| Is Request Allowed | If | Routes based on whether request is within rate limits |
| Return Allowed | Set | Returns allowed=true with remaining quota and reset timestamp |
| Return Rate Limited | Set | Returns allowed=false with rate limit exceeded message |

**Default Limits:**
- Trial users: 5 requests/10min, 30/day
- Paid users: 30 requests/10min, 500/day

---

## Payment Processing Workflows

### 4. Payment Webhook - Meshulam Receiver
**ID:** `gabv4R0mzxyHO9lp`  
**Purpose:** Meshulam webhook receiver with signature verification and payment type routing  
**Node Count:** 12  
**Trigger:** Webhook at `/webhook/meshulam-payment` (POST)

| Node | Type | Description |
|------|------|-------------|
| Meshulam Payment Webhook | Webhook | Receives POST requests from Meshulam with raw body for signature verification |
| Verify Webhook Signature | Execute Workflow | Calls Webhook Verify workflow to validate HMAC signature |
| Is Webhook Verified | If | Routes to processing or 401 rejection based on signature validity |
| Get Webhook Data | Set | Extracts transaction_id, status, amount, payment_type, plan_id, user_id from webhook body |
| Is Payment Successful | If | Routes based on whether payment status equals "success" |
| Route by Payment Type | Switch | Routes to subscription handler, credit pack handler, or unknown type logger |
| Call Subscription Handler | HTTP Request | Forwards subscription payments to subscription-purchase webhook handler |
| Call Credit Pack Handler | HTTP Request | Forwards credit pack payments to credit-pack-purchase webhook handler |
| Log Unknown Payment Type | HTTP Request | Logs unrecognized payment types to payment_logs table for investigation |
| Log Failed Payment | HTTP Request | Records failed payment attempts in payment_logs with error details |
| Respond 200 OK | Respond to Webhook | Returns success acknowledgment to Meshulam |
| Respond 401 Unauthorized | Respond to Webhook | Returns 401 with signature validation error |

**Webhook URL:** `https://call4li.com/api/webhooks/meshulam`

**Expected Meshulam Events:**
- `transaction.success` - Payment completed
- `transaction.failed` - Payment failed
- `subscription.renewed` - Recurring payment

---

### 5. Payment Create Link - Subscriptions
**ID:** `VRuucfB6JxxkGKYK`  
**Purpose:** Generate Meshulam payment links for subscription purchases  
**Node Count:** 7  
**Type:** Sub-workflow

| Node | Type | Description |
|------|------|-------------|
| Receive Payment Link Request | Execute Workflow Trigger | Accepts userId, planId, email, phone, and fullName |
| Get Plan Details | HTTP Request | Queries subscription_plans table to get price and plan info |
| Prepare Meshulam Request | Set | Assembles payment parameters including custom fields for userId, planId, and "subscription" type |
| Create Meshulam Payment Link | HTTP Request | Calls Meshulam createPaymentProcess API with saveCardToken=1 for recurring billing |
| Was Link Created | If | Routes based on Meshulam API response status |
| Return Payment URL | Set | Returns success=true with paymentUrl, processId, and amount |
| Return Error | Set | Returns success=false with Meshulam error message |

**Inputs:**
- `userId` (UUID)
- `planId` (string) - starter/growth/pro
- `email` (string)
- `phone` (string)
- `fullName` (string)

**Outputs:**
- `success` (boolean)
- `paymentUrl` (string) - Meshulam payment page URL
- `processId` (string) - Meshulam process ID

---

### 6. Credits Create Link - Credit Packs
**ID:** `e9K7zIkHxrq4Y0Ti`  
**Purpose:** Generate Meshulam payment links for credit pack purchases  
**Node Count:** 7  
**Type:** Sub-workflow

| Node | Type | Description |
|------|------|-------------|
| Receive Credit Pack Request | Execute Workflow Trigger | Accepts userId, packId, email, phone, and fullName |
| Get Pack Details | HTTP Request | Queries credit_packs table to get price, credits, and bonus credits |
| Prepare Meshulam Request | Set | Assembles payment parameters with credits and bonus credits in custom fields |
| Create Meshulam Payment Link | HTTP Request | Calls Meshulam createPaymentProcess API for one-time credit pack purchase |
| Was Link Created | If | Routes based on Meshulam API response status |
| Return Payment URL | Set | Returns success=true with paymentUrl, processId, credits amount |
| Return Error | Set | Returns success=false with error message |

**Available Packs:**
- `pack_1000` - 1,000 credits, 19 NIS
- `pack_5000` - 5,000 + 500 bonus, 85 NIS
- `pack_15000` - 15,000 + 3,000 bonus, 228 NIS

---

### 7. Subscription Purchase Handler
**ID:** `27ufvzNlmwbJYs4A`  
**Purpose:** Handle successful subscription payments and apply monthly credits  
**Node Count:** 8  
**Trigger:** Webhook at `/webhook/subscription-purchase` (POST)

| Node | Type | Description |
|------|------|-------------|
| Subscription Purchase Webhook | Webhook | Receives payment confirmation from Payment Webhook router |
| Apply Subscription Credits | HTTP Request | Calls Supabase apply_monthly_subscription_credits RPC to create subscription and add credits |
| Was Subscription Applied | If | Routes based on whether subscription was successfully created |
| Log Subscription Success | HTTP Request | Inserts payment_logs record with subscription_id and credits_added |
| Send WhatsApp Confirmation | HTTP Request | Triggers WhatsApp notification with subscription_confirmed template |
| Respond Success | Respond to Webhook | Returns 200 with subscriptionId and creditsAdded |
| Log Subscription Failure | HTTP Request | Logs failed subscription attempt to payment_logs |
| Respond Failure | Respond to Webhook | Returns 500 with error details |

**WhatsApp Template:** `subscription_confirmed`

---

### 8. Credit Pack Purchase Handler
**ID:** `uGNvcYIZHLzRt45Q`  
**Purpose:** Handle successful credit pack payments and add credits to user account  
**Node Count:** 8  
**Trigger:** Webhook at `/webhook/credit-pack-purchase` (POST)

| Node | Type | Description |
|------|------|-------------|
| Credit Pack Purchase Webhook | Webhook | Receives payment confirmation from Payment Webhook router |
| Add Credits | HTTP Request | Calls Supabase add_credits RPC with combined credits + bonus, 365-day expiration |
| Were Credits Added | If | Routes based on whether credits were successfully added |
| Log Purchase Success | HTTP Request | Inserts payment_logs record with pack_id, credits_added, new_balance |
| Send WhatsApp Confirmation | HTTP Request | Triggers WhatsApp notification with credits_purchased template |
| Respond Success | Respond to Webhook | Returns 200 with creditsAdded and newBalance |
| Log Purchase Failure | HTTP Request | Logs failed credit addition to payment_logs |
| Respond Failure | Respond to Webhook | Returns 500 with error details |

**Credit Expiration:** 365 days from purchase

---

## Billing Management Workflows

### 9. Subscription Renew - Monthly Charge
**ID:** `MzKG9Y2tEmkEmS1R`  
**Purpose:** Daily scheduled workflow to charge and renew active subscriptions via Meshulam  
**Node Count:** 9  
**Trigger:** Schedule - Daily at 6:00 AM

| Node | Type | Description |
|------|------|-------------|
| Daily Renewal Check | Schedule Trigger | Runs daily at 6:00 AM to process subscription renewals |
| Get Due Subscriptions | HTTP Request | Queries user_subscriptions for active subscriptions with next_billing_date <= today, joins with users and subscription_plans |
| Has Subscriptions Due | If | Routes based on whether any subscriptions need renewal |
| Charge via Meshulam | HTTP Request | Calls Meshulam chargeToken API using stored customer token for recurring payment |
| Was Charge Successful | If | Routes based on Meshulam payment response (status=1) |
| Apply Monthly Credits | HTTP Request | Calls apply_monthly_subscription_credits RPC to add credits and extend billing date |
| Log Renewal Success | HTTP Request | Inserts payment_logs record for successful renewal |
| Queue for Retry | HTTP Request | Inserts failed charge into subscription_retry_queue with 24-hour retry delay |
| No Subscriptions Due | Set | Returns message when no renewals are due |

**Schedule:** Daily at 6:00 AM  
**Retry Logic:** Failed charges queued for retry workflow

---

### 10. Subscription Renew Retry - Failed Payments
**ID:** `X5CasYefIXGBa1yN`  
**Purpose:** Retry failed subscription payments with max 3 attempts before cancellation  
**Node Count:** 12  
**Trigger:** Schedule - Every 6 hours

| Node | Type | Description |
|------|------|-------------|
| Retry Check Schedule | Schedule Trigger | Runs every 6 hours to process payment retry queue |
| Get Retry Queue | HTTP Request | Queries subscription_retry_queue for entries due for retry (retry_count < 3) |
| Has Retries Pending | If | Routes based on whether any retries are pending |
| Retry Charge | HTTP Request | Attempts Meshulam chargeToken payment using stored customer token |
| Was Retry Successful | If | Routes based on payment success (status=1) |
| Apply Credits | HTTP Request | Applies monthly credits after successful retry payment |
| Remove from Queue | HTTP Request | Deletes entry from retry queue after successful payment |
| Update Retry Count | HTTP Request | Increments retry_count and schedules next retry in 24 hours |
| Max Retries Reached | If | Checks if retry_count has reached 3 |
| Cancel Subscription | HTTP Request | Updates subscription status to cancelled with reason "payment_failed_max_retries" |
| Retry Scheduled | Set | Returns confirmation that retry is scheduled |
| No Retries Pending | Set | Returns message when no retries are pending |

**Retry Schedule:**
- Attempt 1: 24 hours after failure
- Attempt 2: 48 hours after failure
- Attempt 3: 72 hours after failure
- After 3 failures: Auto-cancel subscription

---

### 11. Cancel Subscription
**ID:** `RdyDbJTfG9eP5FSP`  
**Purpose:** Cancel subscription immediately or at end of billing period  
**Node Count:** 9  
**Type:** Sub-workflow

| Node | Type | Description |
|------|------|-------------|
| Receive Cancellation Request | Execute Workflow Trigger | Accepts userId, subscriptionId, reason, and immediateCancel flag |
| Get Subscription | HTTP Request | Queries user_subscriptions to verify subscription exists and belongs to user |
| Is Subscription Valid | If | Routes based on whether subscription is active |
| Is Immediate Cancel | If | Routes based on immediateCancel flag |
| Cancel Immediately | HTTP Request | Updates subscription status to "cancelled" with cancelled_at timestamp |
| Schedule Cancellation | HTTP Request | Updates subscription to "pending_cancellation" with cancel_at_period_end=true |
| Log Cancellation | HTTP Request | Inserts subscription_events record with cancellation details |
| Return Success | Set | Returns success=true with cancellation status message |
| Return Error | Set | Returns success=false when subscription not found or already cancelled |

**Cancellation Types:**
- Immediate: Subscription ends now, no refund
- End of period: Subscription remains active until next billing date

---

## Credit Management Workflows

### 12. Credit Check - Quota Enforcement
**ID:** `f4btcV93DZGReBfl`  
**Purpose:** Quota enforcement with FIFO credit deduction via Supabase deduct_credits function  
**Node Count:** 5  
**Type:** Sub-workflow (called before every generation)

| Node | Type | Description |
|------|------|-------------|
| Receive Credit Check Request | Execute Workflow Trigger | Accepts userId, creditsNeeded amount, and action description |
| Deduct Credits (FIFO) | HTTP Request | Calls Supabase deduct_credits RPC with First-In-First-Out expiration logic |
| Was Deduction Successful | If | Routes based on whether credit deduction succeeded |
| Return Success | Set | Returns allowed=true with credits deducted, remaining balance, and transaction ID |
| Return Insufficient Credits | Set | Returns allowed=false with current balance and credits needed |

**FIFO Logic:** Uses subscription credits first (expire monthly), then oldest purchased packs

**Inputs:**
- `userId` (UUID)
- `creditsNeeded` (integer, 100x scale)
- `action` (string) - image/video/carousel/etc.

**Outputs:**
- `allowed` (boolean)
- `balanceAfter` (integer)
- `transactionId` (UUID)

---

### 13. Credit Refund - Auto Refund
**ID:** `FlbmRIiBw6MDbi46`  
**Purpose:** Auto-refund credits on generation failure via Supabase add_credits function  
**Node Count:** 6  
**Type:** Sub-workflow (called on generation errors)

| Node | Type | Description |
|------|------|-------------|
| Receive Refund Request | Execute Workflow Trigger | Accepts userId, original transactionId, credits to refund, and reason |
| Add Credits (Refund) | HTTP Request | Calls Supabase add_credits RPC with source="refund" and links to original transaction |
| Was Refund Successful | If | Routes based on whether credit addition succeeded |
| Log Refund Success | HTTP Request | Inserts record into credit_logs table with refund metadata |
| Return Success | Set | Returns success=true with credits refunded and new balance |
| Return Failure | Set | Returns success=false with error message |

**Idempotency:** Each transaction ID can only be refunded once

**Common Reasons:**
- API timeout
- Content policy violation
- Generation error

---

### 14. Credit Warn Low - 20% Threshold Alert
**ID:** `OjKT3nEDiIJJEOIh`  
**Purpose:** Hourly check for users below 20% credits with WhatsApp alert and 24h notification cooldown  
**Node Count:** 9  
**Trigger:** Schedule - Hourly at :30

| Node | Type | Description |
|------|------|-------------|
| Hourly Low Credit Check | Schedule Trigger | Runs hourly at 30 minutes past the hour |
| Get Low Credit Users | HTTP Request | Calls Supabase get_low_credit_users RPC with 20% threshold |
| Has Users to Notify | If | Routes based on whether any users are below threshold |
| Check Recent Notification | HTTP Request | Queries notification_logs to check if user was notified in last 24 hours |
| Should Send Notification | If | Routes based on whether 24-hour cooldown has passed |
| Send Low Credit Alert | HTTP Request | Triggers WhatsApp low_credit_warning template with current credits and percentage |
| Log Notification | HTTP Request | Inserts notification_logs record to track 24-hour cooldown |
| Skip - Already Notified | Set | Returns skipped=true when user was recently notified |
| No Users to Notify | Set | Returns message when no users are below threshold |

**Threshold:** 20% of subscription credits remaining  
**Notification Cooldown:** 24 hours  
**WhatsApp Template:** `low_credit_warning`

---

## User Acquisition Workflows

### 15. Trial Signup - 500 Free Credits
**ID:** `hV0ltVCU8n0oqb0U`  
**Purpose:** Grant 500 free trial credits on first contact with WhatsApp welcome message  
**Node Count:** 8  
**Type:** Sub-workflow (called on first WhatsApp message)

| Node | Type | Description |
|------|------|-------------|
| Receive Trial Signup | Execute Workflow Trigger | Accepts userId, phone number, and signup source |
| Check Existing Trial | HTTP Request | Queries credit_ledger for existing trial_signup entries for this user |
| Trial Already Claimed | If | Routes based on whether user already claimed trial |
| Return Already Claimed | Set | Returns success=false with "already claimed" message |
| Add Trial Credits | HTTP Request | Calls add_credits RPC with 500 credits, 30-day expiration |
| Log Trial Signup | HTTP Request | Inserts user_events record with trial_signup event type |
| Send Welcome Message | HTTP Request | Triggers WhatsApp welcome_trial template notification |
| Return Success | Set | Returns success=true with 500 credits granted |

**Trial Credits:** 500 (at 100x scale = 50,000)  
**Expiration:** 30 days  
**Anti-abuse:** One trial per phone number

---

### 16. Referral Grant - 1000 Credits Both Parties
**ID:** `1oA9JzNcT6LdMegS`  
**Purpose:** Grant 1000 credits to both referrer and referred user on successful referral  
**Node Count:** 9  
**Type:** Sub-workflow (triggered on first generation by referred user)

| Node | Type | Description |
|------|------|-------------|
| Receive Referral | Execute Workflow Trigger | Accepts referrerId, referredUserId, and referralCode |
| Check Existing Referral | HTTP Request | Queries referrals table to check if user was already referred |
| Already Referred | If | Routes based on whether referral already exists |
| Return Already Referred | Set | Returns success=false with duplicate referral message |
| Create Referral Record | HTTP Request | Inserts referral record with status=completed and credits_granted=1000 |
| Add Referrer Credits | HTTP Request | Calls add_credits RPC to grant 1000 credits to referrer with 365-day expiration |
| Add Referred Credits | HTTP Request | Calls add_credits RPC to grant 1000 credits to referred user with 365-day expiration |
| Notify Referrer | HTTP Request | Triggers WhatsApp referral_success template to notify referrer |
| Return Success | Set | Returns success=true with credits granted to both parties |

**Referral Bonus:** 1000 credits each (100,000 at 100x scale)  
**Expiration:** 365 days  
**Trigger:** When referred user creates their first content

---

## Workflow Integration Map

```
┌─────────────────────────────────────────────────────────────┐
│                     WhatsApp User Action                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │ Security Prescreen (#2)│
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Rate Limit Check (#3) │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   Credit Check (#4)    │
              └────────────┬───────────┘
                           │
                     [Generation]
                           │
           ┌───────────────┴───────────────┐
           │ Success                       │ Failure
           ▼                               ▼
    [Deliver Content]           ┌──────────────────────┐
                                │ Credit Refund (#5)   │
                                └──────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Meshulam Payment Flow                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │ Payment Webhook (#6)   │
              │ + Webhook Verify (#1)  │
              └────────────┬───────────┘
                           │
              ┌────────────┴────────────┐
              │ Subscription            │ Credit Pack
              ▼                         ▼
   ┌────────────────────┐    ┌────────────────────┐
   │ Subscription       │    │ Credit Pack        │
   │ Purchase (#9)      │    │ Purchase (#10)     │
   └────────────────────┘    └────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   Scheduled Background Jobs                  │
└──────────────────────────────────────────────────────────────┘

Daily 6:00 AM:
  └─► Subscription Renew (#11)
       └─► [If Fails] → Retry Queue (#12)

Every 6 hours:
  └─► Subscription Renew Retry (#12)
       └─► [3 failures] → Cancel Subscription (#13)

Hourly:
  └─► Credit Warn Low (#14)
```

---

## Quick Reference

### Workflow Categories

| Category | Workflows | Description |
|----------|-----------|-------------|
| **Security** | #1, #2, #3 | Webhook verification, injection defense, rate limiting |
| **Payment** | #6, #7, #8, #9, #10 | Meshulam integration, link generation, purchase handling |
| **Billing** | #11, #12, #13 | Renewals, retries, cancellations |
| **Credits** | #4, #5, #14 | Quota enforcement, refunds, low credit alerts |
| **Growth** | #15, #16 | Trial signup, referral program |

### Supabase RPC Functions Used

| Function | Purpose | Called By |
|----------|---------|-----------|
| `deduct_credits` | FIFO credit deduction | Credit Check (#4) |
| `add_credits` | Credit addition/refund | Credit Refund (#5), Trial (#15), Referral (#16) |
| `apply_monthly_subscription_credits` | Grant monthly credits | Subscription Purchase (#9), Renew (#11) |
| `check_rate_limit` | Sliding window limiter | Rate Limit Check (#3) |
| `get_low_credit_users` | Find users <20% | Credit Warn Low (#14) |

### Meshulam API Endpoints Used

| Endpoint | Purpose | Called By |
|----------|---------|-----------|
| `createPaymentProcess` | Generate payment links | Payment Create Link (#7), Credits Create Link (#8) |
| `chargeToken` | Recurring charges | Subscription Renew (#11), Retry (#12) |
| Webhook | Payment notifications | Payment Webhook (#6) |

### WhatsApp Templates

| Template | Purpose | Sent By |
|----------|---------|---------|
| `subscription_confirmed` | New subscription | Subscription Purchase (#9) |
| `credits_purchased` | Credit pack bought | Credit Pack Purchase (#10) |
| `low_credit_warning` | <20% credits remaining | Credit Warn Low (#14) |
| `welcome_trial` | 500 free credits | Trial Signup (#15) |
| `referral_success` | Referral bonus | Referral Grant (#16) |

### Environment Variables Required

```bash
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Meshulam
MESHULAM_PAGE_CODE=xxxxx
MESHULAM_API_KEY=xxxx-xxxx-xxxx
MESHULAM_WEBHOOK_SECRET=your-secret

# Green API
GREEN_API_INSTANCE_ID=your-id
GREEN_API_TOKEN=your-token

# URLs
APP_URL=https://call4li.com
N8N_WEBHOOK_URL=https://n8n.srv1173890.hstgr.cloud/webhook
```

---

## Activation Order

When setting up these workflows, activate in this order:

**Phase 1: Security Foundation**
1. ✅ Webhook Verify (#1)
2. ✅ Security Prescreen (#2)
3. ✅ Rate Limit Check (#3)
4. ✅ Credit Check (#4)
5. ✅ Credit Refund (#5)

**Phase 2: Core Payment**
6. ✅ Payment Webhook (#6)
7. ✅ Payment Create Link (#7)
8. ✅ Credits Create Link (#8)
9. ✅ Subscription Purchase (#9)
10. ✅ Credit Pack Purchase (#10)

**Phase 3: Billing & Growth**
11. ✅ Subscription Renew (#11)
12. ✅ Subscription Renew Retry (#12)
13. ✅ Cancel Subscription (#13)
14. ✅ Trial Signup (#15)
15. ✅ Referral Grant (#16)
16. ✅ Credit Warn Low (#14)

---

## Troubleshooting

### Common Issues

**Webhook signature fails:**
- Check `MESHULAM_WEBHOOK_SECRET` matches Meshulam dashboard
- Verify timestamp is within 5-minute window

**Credit deduction fails:**
- Check user has sufficient balance (query `user_credits`)
- Verify `deduct_credits` RPC function exists in Supabase

**Subscription renewal fails:**
- Check Meshulam customer token is valid
- Verify retry queue is processing (runs every 6h)

**WhatsApp messages not sending:**
- Verify Green API credentials are correct
- Check template names match Green API dashboard
- Ensure phone numbers are in E.164 format (972XXXXXXXXX@c.us)

---

**Document Version:** 1.0  
**Last Updated:** 2026-05-26  
**Maintained By:** Forly Development Team
