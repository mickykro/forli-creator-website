# Call4li Portal — UI Design Plan

Design system for the buyer-facing property catalog at call4li.com. Any future
design work — by people or by Claude — starts from this document.
Implementation: `src/styles/portal.css`, `src/layouts/Portal.astro`,
`src/components/portal/`, client logic in `src/pages/index.astro`.

## 1. Visual walkthrough (top to bottom)

A slim near-black espresso bar pinned to the top: FORLY in a Hebrew serif with
wide letterspacing, the slogan in small cream text beside it, and a thin
gold-outlined pill button for agents on the far side (→ nadlan.call4li.com).
Below it, a short dark band — one serif headline ("מוצאים בית. רואים אותו
קודם." with the second phrase in champagne gold) and three golden numbers with
tiny uppercase labels; behind it, a barely-visible grid of thin gold lines like
window mullions. A warm-white filter card overlaps the band's bottom edge like
a countertop over a dark kitchen island — three dropdowns, a gold "עוד סינון +"
pill, a single pink "חיפוש" button; under it a scrollable row of small white
category pills. Then the catalog on soft cream: rows of white property cards
with photos on top (each with a dark "סיור וידאו ▶" chip, an eye-count, and a
gold "חדש" badge), a serif price, thin gray details, parchment tags, and a
footer line with the agency's initial in a small gold circle plus a subtle
"הצגת טלפון" button. Hover lifts a card and warms its border to gold; a newly
created listing slides in at the top with a short golden glow and a small
toast. Further down: white area tiles (city + live count), a quiet three-item
buyer-benefit strip, a full espresso band for agents (faded serif agency
names, big serif headline with the key phrase in gold, one pink pill), and a
near-black footer. Overall feel: a quiet luxury catalog — dark coffee frames,
cream paper, gold accents, one pink action per screen.

## 2. Brand direction

Boutique curated collection, not a classifieds board. **Proof, not promise**:
real listings, real videos, real counters — numbers are never invented.

Slogan (nav): **כל נכס עם סרטון סיור · רק נכסים שבשוק עכשיו**
Headline (hero): **מוצאים בית. רואים אותו קודם.**

## 3. Color tokens

| Token | Hex | Use |
|---|---|---|
| `--espresso` | `#16110d` | Dark bands: nav, hero, agent band (fixed — the brand frame) |
| `--espresso-2` | `#211913` | Dark surfaces |
| `--champagne` | `#c9a464` | Accent: badges, highlights, eyebrows |
| `--champagne-soft` | `#e6cf9f` | Accent text on dark |
| `--ground` | `#f4ecdf` | Light page ground (cream) |
| `--surface` | `#fffdf6` | Cards, filter bar |
| `--text` | `#221a12` | Ink on light |
| `--muted` | `#6b5d4d` | Secondary text on light |
| `--gold` | `#a07a35` | Champagne darkened for AA contrast on light |
| `--chip` | `#f3ead9` | Tag/chip fill on light |
| `--pink` / `--pink-deep` | `#db6b97` / `#b94c79` | Conversion ONLY: חיפוש, revealed phone, agent-join CTA |

Never use pink for decoration; on light surfaces use `--gold`, not raw
champagne (contrast).

## 4. Typography

- **Display** — Frank Ruhl Libre 700 (Hebrew serif): logo, h1/h2, prices.
- **Body/UI** — Heebo 400/600/700.
- **Utility** — ui-monospace, letterspaced uppercase: eyebrows, stat labels.
- Google Fonts (`Frank+Ruhl+Libre:wght@700`, `Heebo:wght@400;600;700`).
- All prices/counters: `font-variant-numeric: tabular-nums`.

## 5. Layout

RTL Hebrew-only. Container 1180px. Order (first viewport MUST show a full
card row): nav → thin hero (~90px) → filter card overlapping the seam (−40px)
→ category chips → "חדשים השבוע" featured row (listings ≤7 days, up to 3) →
grid + sort → area tiles → value strip → agent band → footer.
Grid: 3 columns → 2 (≤960px) → **2 on mobile** (tightened type).
No scroll-driven animation anywhere.

## 6. Card anatomy

Media 16:10 (poster; play chip "סיור וידאו"; view counter; "חדש" badge) →
serif price + ₪K/מ״ר → meta (חד׳ · מ״ר · קומה) → address + neighborhood →
derived tags (title keywords גן/פנטהאוז/מרפסת/ים/דופלקס/בלעדיות/משופצת +
חניה from data) → foot: agency chip (logo or initial) + freshness + phone
button. Mobile hides: ppm, views, freshness, 3rd+ tag.
Server cards (`PropertyCard.astro`) and the client `<template id="card-tpl">`
in `index.astro` MUST stay in sync.

## 7. States

- **Loading**: 6 shimmering cream skeleton cards in the grid.
- **Error**: centered panel — "הקטלוג לא זמין כרגע" + retry (ghost gold).
- **Empty filter result**: message + reset link.
- **Realtime insert** (`listing_added`): card prepends with fade/slide,
  1.5s champagne border glow, toast "נכס חדש עלה עכשיו" (aria-live polite).
- **Realtime update** (`listing_updated`): card rebuilt in place, brief glow,
  no toast. **Remove** (`listing_removed`): card removed, counters update.
- **Phone reveal**: ghost gold button → click → replaced by a `tel:` link in
  pink-deep showing the number; fires the `phone_reveal` analytics beacon.

## 8. Interaction, motion, accessibility

Micro-motion only (0.2–0.25s): card lift + champagne border, button lifts,
chip color shifts. `prefers-reduced-motion` collapses all transitions and
animations. Focus-visible: 2px champagne outline. All filter fields labeled;
buttons are real buttons; card media links carry descriptive `aria-label`s.

## 9. Voice

Buyer: short, concrete Hebrew ("רק נכסים שבשוק עכשיו"). Agent: proof-driven
("הקונים כבר כאן"). Loader/error over fake data, always.

## 10. Data contract

`GET {PORTAL_API_BASE}/api/portal/listings` → `{listings, count, agencies,
cities}`; realtime `GET /api/portal/stream` (SSE: listing_added /
listing_updated / listing_removed); analytics `POST /api/property-event`
`{page_id, event: 'phone_reveal'}` (business id derived server-side).
Backend: forly-backend `server/routes/portal.js` + `server/portal-stream.js`.
Types + SSR helpers: `src/lib/portal.ts`.
