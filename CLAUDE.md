# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Forly (Call4li) marketing site — an Astro 6 static site, Hebrew-first with English toggle. The product itself (a WhatsApp-native AI content studio) lives in a different repo; this one is just the landing site + legal pages.

Node 22.17.1 (see `.nvmrc`). Astro strict TypeScript (`tsconfig.json` extends `astro/tsconfigs/strict`).

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Astro dev server on `0.0.0.0:4321` |
| `npm run build` | Static build to `./dist/` |
| `npm run preview` | Preview the built site locally |
| `npm run extract:frames` | Re-extract Hero scroll-scrub frames from `/public/video/*.mp4` (needs `ffmpeg` on PATH) — see "Hero frame pipeline" below |

There is no test runner and no linter configured.

## Architecture

### Single source of truth for brand constants
`src/brand.ts` exports `SITE_URL`, `BUSINESS` (legal name, brand name HE/EN, email, phone, WhatsApp E.164) and the prebuilt `WHATSAPP_URL` / `WHATSAPP_HELLO_URL` / `WHATSAPP_QUESTION_URL`. Update contact info, the canonical URL, or CTA destinations here — never inline them in components.

### Bilingual rendering (he/en)
Strings are emitted in both languages and the inactive one is hidden by CSS. Three pieces coordinate:

1. **`src/components/T.astro`** — `<T he="…" en="…" />` renders `<span class="l-he">…</span><span class="l-en">…</span>`.
2. **`src/styles/global.css`** (search for `html[lang=`) — hides `.l-en` when `html[lang="he"]` and vice versa.
3. **`src/layouts/Base.astro`** — when called with `bilingual={true}` (the home page), injects an inline `<script is:inline>` that reads `localStorage.getItem('forly-lang')` and sets `<html lang dir>` + swaps `<title>` and `<meta description>` from in-script `TITLES` / `DESCS` maps.

`Base.astro` is the default layout. `Legal.astro` is a Hebrew-only layout for `privacy`, `terms`, `accessibility`, `faq` — these pages do NOT set `bilingual` and never run the language-toggle script. When adding new bilingual UI strings, the title/description maps in `Base.astro` must be kept in sync.

### Hero frame-scrub pipeline
`src/components/Hero.astro` is the marquee component: a pinned canvas with **GSAP ScrollTrigger** scrubbing through WebP frames as the user scrolls, plus **Lenis** smooth scroll driven by GSAP's RAF ticker. The animation timeline also fades a WhatsApp input bubble in over frames 21–41 and a mid-scroll tagline over frames 48–78, and triggers a programmatic `lenis.scrollTo({ lock: true })` mid-animation.

Frames are produced by `scripts/extract-frames.mjs`:
- Reads the first video found in `public/video/*.{mp4,mov,m4v,webm}`.
- Runs ffmpeg → emits `public/frames/frame-NNNN.webp` + `public/frames/manifest.json` (count, ext, pad, prefix, fps, quality, source).
- Hero.astro fetches `/frames/manifest.json` at runtime to know how many frames to preload.

Important consequence of this split: **`public/video/*` is gitignored (heavy source files) but `public/frames/*` is committed**, so static deploys (Vercel) work without ffmpeg. If you change the source video, you must re-run `npm run extract:frames` and commit the new frames + manifest.

### SEO / meta
`Base.astro` auto-emits canonical, Open Graph (`og:locale=he_IL` + `og:locale:alternate=en_US`), Twitter cards, geo meta (`IL-TA`, Tel Aviv coords), and an `Organization` JSON-LD schema built from `brand.ts`. Pages can pass an extra `schema` prop that gets merged after the Organization schema (see `pages/index.astro` for a `WebSite` schema example).

### Components
Section components live in `src/components/` and are composed by `src/pages/index.astro` (`Nav`, `Hero`, `CarouselPreview`, `Features`, `CTA`). Each is a self-contained `.astro` file with its scoped styles + scripts; there is no shared component framework (no React/Vue/Svelte).
