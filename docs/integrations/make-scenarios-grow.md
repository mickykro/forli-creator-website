# Make.com Scenarios for Grow (Meshulam) Payment Integration

This document is a self-contained build guide for the Make.com scenarios that bridge **Grow (Meshulam)** payments and our **n8n** business-logic workflows. Follow it top-to-bottom in the Make UI to produce a working integration.

---

## 1. Overview

**Why Make is in the middle.** Direct REST access to the Grow API costs 500 NIS/month + VAT. The native Grow app in Make is free. So Make owns every call to Grow; n8n calls Make instead.

**Responsibility split.**

| Layer | Owns |
|---|---|
| **n8n** | Business logic: customer lookup in Supabase, credits/subscriptions state, WhatsApp messaging, idempotency, audit logging |
| **Make** | All Grow API I/O: create payment links, receive Grow webhooks, call Grow's `ApproveTransaction`, forward parsed events to n8n |
| **Grow** | Hosted payment page, charge execution, recurring billing, invoice (חשבונית) generation |

**Flows.**

```
CREDIT PACK
═══════════
  n8n (WhatsApp router)
    → HTTPS POST → Make Scenario 1 (grow-create-credit-link)
                     → Grow: Create Payment Link
    ← payment_url
  n8n → WhatsApp message with URL

  Customer pays on grow.link
    → Grow webhook (notifyUrl) → Make Scenario 2 (grow-credits-payment-received)
                                   → Grow: Approve Transaction
                                   → HTTPS POST → n8n /webhook/grow-credits-paid
                                                    → grant credits, send WhatsApp

SUBSCRIPTION (recurring)
════════════════════════
  Bot sends static Grow page URL via WhatsApp (URLs are configured once
    in Grow dashboard, stored as constants in n8n)

  Customer subscribes on grow.link
    → Grow webhook → Make Scenario 3 (grow-subscription-payment-received)
                       → Grow: Approve Transaction
                       → HTTPS POST → n8n /webhook/grow-subscription-paid
                                        → create/update subscription, reset credits,
                                          send WhatsApp
```

**Build order — STRICT.** Each scenario depends on the URLs from the one(s) before:

1. **Scenario 2** `grow-credits-payment-received` — its webhook URL becomes the `notifyUrl` set by Scenario 1
2. **Scenario 3** `grow-subscription-payment-received` — its webhook URL is set as `notifyUrl` on every static recurring page in the Grow dashboard
3. **Static recurring pages in Grow dashboard** — done in the Grow UI, not in Make (instructions in §7)
4. **Scenario 1** `grow-create-credit-link` — depends on Scenario 2's webhook URL
5. **Scenario 4** `grow-invoice-received` *(optional)* — only if you want the חשבונית URL forwarded inline rather than fetched from Grow's dashboard

---

## 2. Prerequisites

Before starting, confirm:

- [ ] Make.com account with an active team/organization
- [ ] **Grow app connected in Make** with valid business credentials (already done per user)
- [ ] Grow business account with permission to create payment links and recurring pages
- [ ] n8n instance reachable on a public HTTPS URL (Make must be able to POST to it)
- [ ] n8n already runs the existing Forly stack: Supabase, WhatsApp router, customer model, credits ledger, subscriptions table. The four n8n webhooks referenced below (§6) must either exist or be created in parallel by the n8n developer.
- [ ] A **shared secret** generated for Make ↔ n8n auth (any random 32+ char string). Store in:
  - Make: a "Data Store" record or a connection-level variable named `N8N_SHARED_SECRET`
  - n8n: an environment variable / credential named the same. n8n webhooks reject any request missing the matching `X-Forly-Secret` header.

---

## 3. Conventions (apply to every scenario)

### Naming
- Scenario names exactly as written in §1 (used in logs and error reports).
- Inside each scenario, rename every module to its function — e.g., `Grow: Approve Transaction`, `HTTP: Notify n8n`. Default names like `Grow - 1` make debugging painful.

### Make Data Store (one-time setup)
Create a Data Store called **`forly-config`** with these keys (string values):
| Key | Value | Used by |
|---|---|---|
| `N8N_BASE_URL` | e.g. `https://n8n.forly.com` | All scenarios calling n8n |
| `N8N_SHARED_SECRET` | the random secret from §2 | All scenarios calling n8n |
| `GROW_SUCCESS_PAGE_URL` | optional, e.g. `https://forly.com/payment-success` | Scenario 1 |

Read these via the Data Store "Get a record" module at the start of each scenario, or reference them as variables if Make's UI exposes them as such. Hardcoding URLs in modules is forbidden.

### Authentication header to n8n
Every HTTP module that calls n8n MUST include:
```
X-Forly-Secret: {{forlyConfig.N8N_SHARED_SECRET}}
Content-Type: application/json
```

### Error handling
On every Grow module and every HTTP module:
- Right-click → **Add error handler** → use the **"Resume"** directive for non-critical failures (e.g., n8n down) and **"Commit"** with logging for ApproveTransaction failures. Rationale: Grow will resend the webhook up to 5 times if ApproveTransaction is not called, and n8n's `payments.grow_transaction_id UNIQUE` constraint makes replays safe.
- Add a final HTTP module in every error path that POSTs to `{{N8N_BASE_URL}}/webhook/make-error` with the scenario name, module name, error message, and Grow payload. n8n will route this to admin alerts.

### Idempotency
Do **not** add a dedup step in Make. n8n is the idempotency owner via the unique constraint on `payments.grow_transaction_id`. Make's job is only to ensure ApproveTransaction is called and n8n is notified.

### Logging
Leave Make's default execution history at 7 days. For Scenarios 2 and 3 (production webhooks), enable **"Allow storing of incomplete executions"** so failed payments can be retried from the Make UI.

---

## 4. Scenario 2: `grow-credits-payment-received` — **BUILD FIRST**

**Purpose.** Receives the Grow `notifyUrl` webhook fired when a credit-pack payment succeeds. Calls Grow's `ApproveTransaction` to acknowledge it, then notifies n8n.

### Modules (in order)

#### 4.1 Trigger — Webhooks → Custom webhook
- Click **Add** → name it `grow-credits-notify` → **Save**.
- Click **Copy address to clipboard** — this is the URL you will reference as `notifyUrl` in Scenario 1. **Save it now** (you'll paste it into the Data Store as `MAKE_CREDITS_NOTIFY_URL` for reference).
- Leave "JSON pass-through" **OFF** so Make parses the body.
- Click **Re-determine data structure** later, after Grow sends the first real webhook (see §8).

#### 4.2 Data Store: Get a record (`forly-config`)
- Data Store: `forly-config`
- Key: (read whatever your Data Store key for the singleton config record is — adapt to your conventions)

#### 4.3 Grow → Approve Transaction
This is the most critical module. Map every input field directly from the trigger payload.

| Module input | Map from trigger field |
|---|---|
| Connection | the connected Grow account |
| Page Code | `{{1.pageCode}}` |
| Transaction ID | `{{1.transactionId}}` |
| Transaction Token | `{{1.transactionToken}}` |
| Transaction Type ID | `{{1.transactionTypeId}}` |
| Payment Type | `{{1.paymentType}}` |
| Sum | `{{1.sum}}` |
| First Payment Sum | `{{1.firstPaymentSum}}` |
| Periodical Payment Sum | `{{1.periodicalPaymentSum}}` |
| Payments Num | `{{1.paymentsNum}}` |
| All Payments Num | `{{1.allPaymentsNum}}` |
| Payment Date | `{{1.paymentDate}}` |
| Asmachta | `{{1.asmachta}}` |
| Description | `{{1.description}}` |
| Full Name | `{{1.fullName}}` |
| Payer Phone | `{{1.payerPhone}}` |
| Payer Email | `{{1.payerEmail}}` |
| Card Suffix | `{{1.cardSuffix}}` |
| Card Type | `{{1.cardType}}` |
| Card Type Code | `{{1.cardTypeCode}}` |
| Card Brand | `{{1.cardBrand}}` |
| Card Brand Code | `{{1.cardBrandCode}}` |
| Card Exp | `{{1.cardExp}}` |
| Process ID | `{{1.processId}}` |
| Process Token | `{{1.processToken}}` |
| Payment Link Process ID | `{{1.paymentLinkProcessId}}` |
| Payment Link Process Token | `{{1.paymentLinkProcessToken}}` |

If the Grow app in Make exposes "Approve Transaction" with fewer named fields and a generic "additional fields" map: pass every key/value from the trigger payload as-is.

**If the Grow app does not have an Approve Transaction module:** fall back to an **HTTP → Make a request** module with:
- Method: `POST`
- URL: `https://sandboxapi.grow.link/api/light/server/1.0/approveTransaction` (swap to prod URL after testing)
- Headers: `x-api-key: <Grow API key from Data Store>`, `Content-Type: application/x-www-form-urlencoded`
- Body type: `application/x-www-form-urlencoded`
- Fields: every field from the trigger payload as form-data key/value pairs (Grow's API uses form-encoded, not JSON, for these endpoints)

#### 4.4 HTTP → Make a request — notify n8n
- URL: `{{forlyConfig.N8N_BASE_URL}}/webhook/grow-credits-paid`
- Method: `POST`
- Headers:
  - `X-Forly-Secret`: `{{forlyConfig.N8N_SHARED_SECRET}}`
  - `Content-Type`: `application/json`
- Body type: `Raw` → `application/json (application/json)`
- Body:
```json
{
  "event": "credits_paid",
  "customer_id":          "{{1.cField1}}",
  "pack_type":            "{{1.cField2}}",
  "workflow_run_id":      "{{1.cField3}}",
  "grow_transaction_id":  "{{1.transactionId}}",
  "grow_transaction_token":"{{1.transactionToken}}",
  "transaction_type_id":  "{{1.transactionTypeId}}",
  "payment_type":         "{{1.paymentType}}",
  "sum":                  "{{1.sum}}",
  "payment_date":         "{{1.paymentDate}}",
  "asmachta":             "{{1.asmachta}}",
  "payer_phone":          "{{1.payerPhone}}",
  "payer_name":           "{{1.fullName}}",
  "payer_email":          "{{1.payerEmail}}",
  "card_suffix":          "{{1.cardSuffix}}",
  "card_brand":           "{{1.cardBrand}}",
  "payment_link_process_id":   "{{1.paymentLinkProcessId}}",
  "payment_link_process_token":"{{1.paymentLinkProcessToken}}",
  "payments_num":         "{{1.paymentsNum}}",
  "all_payments_num":     "{{1.allPaymentsNum}}"
}
```
- Parse response: **Yes**
- Timeout: 30 seconds

#### 4.5 Webhook response (optional but recommended)
Add a final **Webhooks → Webhook response** module that returns `200 OK` with body `{"status":"ok"}` to Grow. This shortens the request lifecycle and reduces Grow's retry pressure when ApproveTransaction is slow.

### Scenario settings
- Sequential processing: **ON** (avoid race conditions on the same customer)
- Auto-commit: **ON**
- Allow storing of incomplete executions: **ON**

### Activate the scenario.

---

## 5. Scenario 3: `grow-subscription-payment-received`

**Purpose.** Receives the Grow `notifyUrl` webhook fired on each subscription charge (both first charge and renewals). Same shape as Scenario 2, but the destination n8n webhook is different and the payload is missing `cField1–3` (static dashboard pages can't set them).

### Modules

Identical structure to Scenario 2, with these differences:

#### 5.1 Trigger
- New custom webhook named `grow-subscription-notify`. Copy its URL — you'll paste it as `notifyUrl` on every static recurring page in the Grow dashboard (§7).

#### 5.3 Grow → Approve Transaction
Same field mapping as 4.3. No change.

#### 5.4 HTTP → notify n8n
- URL: `{{forlyConfig.N8N_BASE_URL}}/webhook/grow-subscription-paid`
- Body:
```json
{
  "event": "subscription_paid",
  "grow_transaction_id":  "{{1.transactionId}}",
  "grow_transaction_token":"{{1.transactionToken}}",
  "transaction_type_id":  "{{1.transactionTypeId}}",
  "payment_type":         "{{1.paymentType}}",
  "sum":                  "{{1.sum}}",
  "payment_date":         "{{1.paymentDate}}",
  "asmachta":             "{{1.asmachta}}",
  "payer_phone":          "{{1.payerPhone}}",
  "payer_name":           "{{1.fullName}}",
  "payer_email":          "{{1.payerEmail}}",
  "card_suffix":          "{{1.cardSuffix}}",
  "card_brand":           "{{1.cardBrand}}",
  "page_code":            "{{1.pageCode}}",
  "payment_link_process_id":   "{{1.paymentLinkProcessId}}",
  "payment_link_process_token":"{{1.paymentLinkProcessToken}}",
  "payments_num":         "{{1.paymentsNum}}",
  "all_payments_num":     "{{1.allPaymentsNum}}"
}
```

n8n uses `page_code` (or `payment_link_process_id` — whichever proves stable in testing) to determine which tier was purchased, and matches `payer_phone` to a customer.

### Activate.

---

## 6. Scenario 1: `grow-create-credit-link` — build AFTER Scenario 2 exists

**Purpose.** Called by n8n when a WhatsApp user picks a credit pack. Creates a one-time Grow payment link and returns its URL to n8n.

### Modules

#### 6.1 Trigger — Webhooks → Custom webhook
- Name: `grow-create-credit-link-trigger`
- Copy the URL — n8n's `grow-credits-create-link` workflow POSTs to it.
- Expected request body from n8n:
```json
{
  "customer_id": "uuid",
  "workflow_run_id": "uuid",
  "pack_type": "taste|mini|plus",
  "pack_name": "חבילת קרדיטים טעימה",
  "price_nis": 25,
  "customer_name": "ישראל ישראלי",
  "customer_phone": "972501234567"
}
```

#### 6.2 Data Store: Get a record (`forly-config`)
Same as 4.2.

Also retrieve the value of **`MAKE_CREDITS_NOTIFY_URL`** stored in Data Store — this is Scenario 2's webhook URL captured in §4.1.

#### 6.3 Grow → Create Payment Link
Map these fields explicitly:

| Module input | Value |
|---|---|
| Connection | Grow account |
| Payment Link Type | `1` (closed, one-time) |
| Is Active | `1` |
| Title | `{{1.pack_name}}` |
| Description | `{{1.pack_name}}` |
| **Products** (collection, single item) | |
|   Name | `{{1.pack_name}}` |
|   Price | `{{1.price_nis}}` |
|   Quantity | `1` |
|   VAT Type | `1` (regular VAT) |
| **Payment Types** (collection, single item) | |
|   Type | `payments` |
|   Payments Payment Num | `1` |
| **Page Field Settings** | |
|   Full Name → Value | `{{1.customer_name}}` |
|   Full Name → Required | `1` |
|   Phone → Value | `{{1.customer_phone}}` |
|   Phone → Required | `1` |
| **Transaction Types** (multi-select / array) | enable: Credit Card (0), bit (1), Apple Pay (2), Google Pay (3). Leave Bank Transfer and PayBox off unless requested. |
| **Custom Fields** | |
|   cField1 | `{{1.customer_id}}` |
|   cField2 | `{{1.pack_type}}` |
|   cField3 | `{{1.workflow_run_id}}` |
| Notify URL | `{{forlyConfig.MAKE_CREDITS_NOTIFY_URL}}` |
| Success URL | `{{forlyConfig.GROW_SUCCESS_PAGE_URL}}` (optional; safe to leave blank for WhatsApp-only flow) |
| Sending Mode | **leave blank / disabled** — we send the URL via WhatsApp; do not let Grow SMS or email the customer |
| Max Payments Num | `1` |

**Critical:** `cField1`, `cField2`, `cField3` carry our identity binding. If the Grow Make module renames these (some apps expose them as "Custom Field 1" or similar), use the right input but map the same values.

#### 6.4 Webhook response — return URL to n8n
- Status: `200`
- Body type: JSON
- Body:
```json
{
  "payment_url": "{{3.url}}",
  "payment_link_process_id": "{{3.paymentLinkProcessId}}",
  "payment_link_process_token": "{{3.paymentLinkProcessToken}}"
}
```
(Adjust `{{3.url}}` to whatever the Grow module names its output URL — common names: `url`, `paymentUrl`, `link`.)

### Scenario settings
- Sequential processing: **ON**
- Allow storing of incomplete executions: **ON**

### Activate.

---

## 7. Static recurring subscription pages (Grow dashboard, not Make)

Create these four pages **in the Grow dashboard**, not in Make.

Navigate: Grow dashboard → Payment Links → **לינק לחיוב מחזורי**.

| Page name | Charge config | Amount (NIS) | Other |
|---|---|---|---|
| `forly-starter-promo` | חיוב חודשי, "בדיוק" 3 חודשים | 49 | First-time promo |
| `forly-starter-monthly` | חיוב חודשי, פתוח (ללא תאריך סיום) | 69 | Standard starter |
| `forly-growth-monthly` | חיוב חודשי, פתוח | 120 | |
| `forly-pro-monthly` | חיוב חודשי, פתוח | 260 | |

For **each** page:
1. Enable payment methods: Credit Card, bit, Apple Pay, Google Pay
2. Set **Notify URL** = Scenario 3's webhook URL (the one captured in §5.1)
3. Set custom thank-you text in Hebrew matching Forly brand voice
4. After save: **copy the page URL and the `paymentLinkProcessId`** — both go into the n8n constants file (`brand.ts`) as `subscriptionUrls` and `processIdToTier` respectively. Provide these values to the n8n developer.

---

## 8. Scenario 4 (optional): `grow-invoice-received`

Only needed if the Forly product flow wants the חשבונית PDF URL delivered to WhatsApp the moment Grow generates it (rather than fetched from the Grow dashboard).

### Modules
1. **Webhooks → Custom webhook** named `grow-invoice-notify`. Capture URL.
2. **HTTP → Make a request** to `{{forlyConfig.N8N_BASE_URL}}/webhook/grow-invoice`:
```json
{
  "event": "invoice_ready",
  "payment_link_process_id": "{{1.paymentLinkProcessId}}",
  "invoice_url":             "{{1.invoiceUrl}}"
}
```
3. To activate: set the captured URL as `invoiceNotifyUrl` on the link in Scenario 1 (add it to the Create Payment Link module's parameters).

---

## 9. n8n endpoints expected by Make

For each n8n webhook below, the n8n team owns the implementation. Make only POSTs to them. Sketched here so the contract is clear.

| Path | Caller | Purpose |
|---|---|---|
| `POST /webhook/grow-credits-paid` | Scenario 2 | Idempotency check on `grow_transaction_id`; insert `payments` + `credit_packs`; WhatsApp confirmation |
| `POST /webhook/grow-subscription-paid` | Scenario 3 | Tier lookup by `page_code`/`payment_link_process_id`; phone match to customer; idempotency; insert/update `subscriptions`; reset monthly credit allocation; WhatsApp confirmation |
| `POST /webhook/grow-invoice` | Scenario 4 (optional) | Update `payments.invoice_url`; WhatsApp message with the PDF link |
| `POST /webhook/make-error` | All scenarios' error handlers | Forward Make execution errors to admin alerts |

All four require the `X-Forly-Secret` header (§2). Reject without it.

---

## 10. End-to-end test plan

Run these in order. **All must pass before going live.**

### Credit pack flow
1. **Happy path** — From WhatsApp, request the `taste` pack. Confirm:
   - n8n receives the URL from Scenario 1 inside ~5 seconds
   - WhatsApp message arrives with the URL
   - Pay on the Grow page (sandbox CC or real bit/Apple/Google Pay if you accept real charge)
   - Scenario 2 executes; ApproveTransaction returns success in its history
   - n8n inserts `payments` + `credit_packs` rows
   - WhatsApp confirmation arrives with new credit balance

2. **Replay safety** — In Make Scenario 2's history, click "Re-run" on the same execution. Confirm:
   - Make re-runs ApproveTransaction (Grow tolerates this, idempotent)
   - n8n receives the second POST, hits the `grow_transaction_id UNIQUE` constraint, returns 200, does NOT grant credits again. Verify by checking `credit_packs` row count is still 1.

3. **ApproveTransaction failure path** — Temporarily put a bad value in the Grow connection (e.g., wrong API key). Trigger a payment. Confirm:
   - Scenario 2 logs the failure
   - Error handler POSTs to `/webhook/make-error`
   - Admin alert fires
   - Grow retries the webhook (it will arrive 1–5 more times over the next minutes)
   - Restore the API key; the next retry succeeds; n8n stays idempotent

### Subscription flow
4. **First charge** — Pay the `forly-growth-monthly` page. Confirm Scenario 3 fires with `paymentsNum=1`; n8n creates a `subscriptions` row with `tier=growth`, `period_end = now + 1 month`; monthly credit allocation granted.

5. **Renewal** — Either wait for the natural cycle or manually trigger the next charge from the Grow dashboard. Webhook fires with `paymentsNum=2`. n8n updates the existing subscription row's `period_end`, resets credits.

6. **Unmatched phone** — Pay the `forly-starter-monthly` page but enter a phone number NOT in `customers`. n8n inserts `payments_unmatched` row, admin alert fires. ApproveTransaction still executes in Make.

### Payment methods
7. **bit** — Pay with bit on any page. `transaction_type_id = 6` reaches n8n; no crash; row inserts cleanly.
8. **Apple Pay** — `transaction_type_id = 13`. Same check.

### Auth
9. **Shared secret rejection** — From Make, manually edit Scenario 2's HTTP module to send a wrong `X-Forly-Secret`. Trigger a payment. n8n must reject with 401; the rest of the scenario still completes (ApproveTransaction still runs). Restore the secret.

---

## 11. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Scenario 1 returns no payment URL | Grow module mis-mapped a required field | Check Make execution log — the Grow module will show the API error. Most common: `products` collection empty or `pageCode` not set on the connection |
| Grow webhooks not arriving at Scenario 2 | `notifyUrl` mismatch | In Scenario 1, verify `Notify URL` is exactly Scenario 2's webhook URL. In Grow's "Recent Transactions" log, find a paid transaction and inspect its `notifyUrl` value |
| n8n receives the webhook but rejects it | Bad/missing `X-Forly-Secret` | Re-check Data Store value matches n8n env var |
| Customer paid; n8n got two `credit_packs` rows | Idempotency constraint missing | Confirm `payments.grow_transaction_id` has UNIQUE constraint. This is owned by the n8n team |
| Static page charges every 30 days instead of monthly | Page configured as "exact N days" instead of "monthly" | Re-create the page in Grow dashboard with "חיוב חודשי" |
| `cField1–3` arrive empty on Scenario 2 trigger | Make Grow module passes them under different keys | Inspect a real trigger payload in Make's history; rename `{{1.cField1}}` mappings to whatever Make actually outputs (e.g., `{{1.customField1}}`) |
| ApproveTransaction returns "Invalid signature" or similar | Grow API key drifted, or some echoed field type-coerced (e.g., number became string) | Check Make's Grow connection. If the issue is type coercion, set the field as `{{parseNumber(1.sum)}}` etc. in the Approve Transaction mapping |

---

## 12. Open items to confirm with Grow support

The agent building these scenarios should ask Grow support (or test in sandbox) to confirm:

1. **Sandbox URL availability** — confirm `sandboxapi.grow.link` is usable from Make for testing, and whether the Make app can be pointed at sandbox via a connection setting.
2. **Custom field key names** — confirm whether Grow webhook payloads return custom fields as `cField1`, `customField1`, or under a nested `customFields` object. Adjust mappings in §4.4 and §5.4 once known.
3. **`paymentLinkProcessId` stability for recurring** — confirm this ID is the same on every monthly charge for the same recurring page (drives the `processIdToTier` lookup in n8n).
4. **Recurring cancel API** — is there a Grow Make module or API endpoint to cancel a customer's הוראת קבע, or must they cancel via Grow's customer portal? (Determines `/cancel` WhatsApp flow.)
5. **Webhook signature** — does Grow sign webhooks (HMAC header)? If so, validate in Scenario 2/3 before any other step. If not, rely on IP allowlist documented at Grow's `/reference/ip-adress` page.

---

## 13. Handoff checklist

When all scenarios are built and tested, hand the n8n developer these values:

- [ ] Scenario 1 webhook URL (n8n's `grow-credits-create-link` will POST to this)
- [ ] Scenario 2 webhook URL (already set as `notifyUrl` by Scenario 1 — informational only)
- [ ] Scenario 3 webhook URL (already set on the 4 static pages — informational only)
- [ ] Scenario 4 webhook URL, if built
- [ ] The 4 static page URLs from Grow dashboard
- [ ] The 4 corresponding `paymentLinkProcessId` values, mapped to tiers
- [ ] Confirmation that the shared secret is configured on both sides

After handoff, the n8n developer wires `grow-credits-create-link` to call Scenario 1's URL, and the WhatsApp router sends the static URLs from the constants file.
