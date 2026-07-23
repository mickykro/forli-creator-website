/* portal.ts — data layer for the buyer-facing property catalog.
   SSR-first fetch from the Forly backend portal API. No sample data: when the
   API is unreachable the page renders skeletons and the client retries
   (see the portal client script in pages/index.astro). */

export interface PortalAgent {
  name: string;
  brand_name: string;
  logo_url: string | null;
  phone: string;
}

export interface PortalListing {
  page_id: string;
  page_url: string;
  created_at: string | null;
  title: string;
  address: string;
  street: string;
  neighborhood: string;
  city: string;
  price: number;
  rooms: number;
  size_sqm: number;
  floor: number | null;
  parking: number;
  agent: PortalAgent;
  poster_url: string | null;
  video_url: string | null;
  photo_count: number;
  view_count: number;
}

export interface PortalData {
  ok: boolean;
  listings: PortalListing[];
  agencies: string[];
  cities: string[];
}

// process.env first so the deployed Node server can override without a
// rebuild; import.meta.env covers dev; then the production default.
export const PORTAL_API_BASE = (
  (typeof process !== 'undefined' && process.env?.PORTAL_API_BASE) ||
  import.meta.env.PORTAL_API_BASE ||
  'https://agent.call4li.com'
).replace(/\/+$/, '');

const FETCH_TIMEOUT_MS = 4000;
const NEW_WITHIN_DAYS = 7;

export async function getPortalData(): Promise<PortalData> {
  try {
    const res = await fetch(`${PORTAL_API_BASE}/api/portal/listings`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`portal API ${res.status}`);
    const body = (await res.json()) as { listings?: PortalListing[] };
    const listings = (body.listings || []).filter((l) => l && l.page_id);
    return {
      ok: true,
      listings,
      agencies: uniqueSorted(listings.map((l) => l.agent?.brand_name)),
      cities: uniqueSorted(listings.map((l) => l.city)),
    };
  } catch {
    return { ok: false, listings: [], agencies: [], cities: [] };
  }
}

function uniqueSorted(values: (string | undefined)[]): string[] {
  return [...new Set(values.filter((v): v is string => Boolean(v)))].sort((a, b) =>
    a.localeCompare(b, 'he'),
  );
}

/* ── presentation helpers (server-side rendering) ──
   The portal client script in index.astro carries small JS twins of these for
   cards it builds in the browser (realtime inserts + retry loads). */

export function formatPrice(price: number): string {
  return price > 0 ? `₪${price.toLocaleString('en-US')}` : 'מחיר בתיאום';
}

export function pricePerSqm(l: PortalListing): string | null {
  if (!l.price || !l.size_sqm) return null;
  return `₪${(l.price / l.size_sqm / 1000).toFixed(1)}K למ״ר`;
}

export function formatViews(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

export function isNew(l: PortalListing): boolean {
  if (!l.created_at) return false;
  return Date.now() - new Date(l.created_at).getTime() < NEW_WITHIN_DAYS * 86400000;
}

export function freshLabel(l: PortalListing): string {
  if (!l.created_at) return '';
  const days = Math.floor((Date.now() - new Date(l.created_at).getTime()) / 86400000);
  if (days <= 0) return 'עלה היום';
  if (days === 1) return 'עלה אתמול';
  if (days === 2) return 'עלה לפני יומיים';
  if (days < 7) return `עלה לפני ${days} ימים`;
  if (days < 14) return 'שבוע בשוק';
  if (days < 30) return `${Math.floor(days / 7)} שבועות בשוק`;
  const months = Math.floor(days / 30);
  return months === 1 ? 'חודש בשוק' : `${months} חודשים בשוק`;
}

export function metaLine(l: PortalListing): string {
  const parts: string[] = [];
  if (l.rooms) parts.push(`${l.rooms} חד׳`);
  if (l.size_sqm) parts.push(`${l.size_sqm} מ״ר`);
  if (l.floor !== null && l.floor > 0) parts.push(`קומה ${l.floor}`);
  return parts.join(' · ');
}

/* Marketplace tags derived from real listing data + title keywords —
   powers the quick-browse category chips. */
const KEYWORD_TAGS: [RegExp, string][] = [
  [/פנטהאוז/, 'פנטהאוז'],
  [/דירת גן|גינה/, 'גן'],
  [/מרפסת/, 'מרפסת'],
  [/נוף לים|ליד הים|קו ראשון/, 'ים'],
  [/דופלקס/, 'דופלקס'],
  [/בלעדיות/, 'בלעדיות'],
  [/משופצ/, 'משופצת'],
];

export function deriveTags(l: PortalListing): string[] {
  const text = `${l.title} ${l.neighborhood}`;
  const tags = KEYWORD_TAGS.filter(([re]) => re.test(text)).map(([, tag]) => tag);
  if (l.parking > 0) tags.push('חניה');
  return [...new Set(tags)];
}

export interface AreaSummary {
  city: string;
  count: number;
}

export function areaSummaries(listings: PortalListing[]): AreaSummary[] {
  const byCity = new Map<string, number>();
  for (const l of listings) {
    if (!l.city) continue;
    byCity.set(l.city, (byCity.get(l.city) || 0) + 1);
  }
  return [...byCity.entries()]
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}
