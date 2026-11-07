# Brihadhee website

Astro 5 static site (TypeScript strict, Tailwind v4, MDX). Built to rank locally, be quotable by AI answer engines, and turn visits into calls, directions, orders and bookings.

**Golden rule:** no unconfirmed fact is ever published. Facts live in `src/data/brand-facts.ts`; menu items in `src/data/menu.ts`. A fact that is `null` is simply left out of every page, schema block, `llms.txt` and `menu.json`. `npm run build` refuses to finish until launch-critical facts are confirmed.

## Run it

```bash
npm install
npm run dev            # local development (unconfirmed facts show a yellow "TODO: confirm" chip)
npm run build:draft    # preview build into dist-draft: noindex everywhere, robots blocks all, gates bypassed
npm run build:fixture  # test build with FAKE sample facts (tests/fixtures): proves every gate can pass
npm run build          # production build + gates. Fails while facts are unconfirmed (and deletes dist)
npm run preview
```

On a nearly full C: drive, keep the project and `node_modules` on another drive (this one lives on D:). Set `npm_config_cache` to a folder on that drive.

## Environment variables (`.env`, see `.env.example`)

`PUBLIC_SITE_URL` (required to launch), `PUBLIC_GA4_ID` (analytics off if empty), `PUBLIC_BOOKING_ENDPOINT` and `PUBLIC_BOOKING_ACCESS_KEY` (Web3Forms-compatible booking form), `INDEXNOW_KEY` (optional). Never commit `.env`.

## Fill in the facts

Open `src/data/brand-facts.ts` and replace `null` with confirmed values (hours as `HH:MM` per day, `parking`, `costForTwo`, `phone`, and so on). The list of everything needed is in `docs/owner-todo.md`.

## Menu and dish pages

In `src/data/menu.ts` set `confirmedOnCurrentMenu: true` and the real `price` for each dish on today's menu. A section page (for example `/menu/mini-tiffin/`) goes live (indexable, in the sitemap) once it has at least one confirmed item. Set `periods: ['breakfast']` etc. to feed `/menu/breakfast/`, `/menu/lunch-meals/` and `/menu/dinner/`. To add an individual dosa page, set `hasPage: true`, a `slug`, and write a 300+ word `longDescription` from the kitchen's own notes.

## Photos

Put real photos in `src/assets/photos/` named as the pages expect (see `docs/owner-todo.md`). Until then labelled placeholders render, and the production build fails if any remain.

## Guides

Add `.mdx` files to `src/content/guides/` with front matter (see `src/content.config.ts`): `title` (max 60 chars), `description` (max 160), `primaryKeyword`, `author` (named person), `datePublished`, `updated`, `relatedMenu` (menu paths), `faq`. `draft: true` pages are built `noindex` and left out of the sitemap. Each guide automatically shows a "Where to try it in Anna Nagar" box linking to the live menu pages and the location page.

## FAQ

`src/data/faq.json` holds reviewed entries. `src/data/faq-bank.json` holds the 100-question bank from the strategy work. A bank entry is published only after you add its id to `src/data/faq-approved.json`. Answers use `{TOKENS}` (for example `{HOURS_TEXT}`); an answer is dropped automatically if any token is unconfirmed.

## Tamil pages

Only human-written Tamil. Add `src/content/ta/<name>.mdx` with `title`, `description`, `enPath` (the English twin, such as `/menu/dosa/`) and `updated`. The language switch and `hreflang` pairs appear automatically for pages that exist in both languages.

## Comparison and seasonal pages

Templates exist but are unrouted. Add dated, sourced entries to `src/data/competitors.json` (shape in `src/pages/compare/[slug].astro`) or `src/data/seasonal.ts` to publish them.

## What the build checks

- `check:facts`: launch facts confirmed; no `TODO`, `null` or `undefined` in output; claim phrases ("pure veg", "parking", "500", "6:30", "for two", rupee prices) appear only when the matching fact is confirmed; no photo placeholders left.
- `check:seo`: unique titles and descriptions within length, one H1, canonical URLs, JSON-LD valid and matching facts, no review or rating markup, no orphan pages, guide and menu link rules, reciprocal hreflang, sitemap contains only indexable pages.
- `check:links`: internal links resolve; external links from the facts are checked (warnings only).

## Publish, then tell the search engines

Deploy the `dist` folder to Cloudflare Pages or Netlify (`public/_headers` carries the security headers). Then follow `docs/search-console-setup.md`. UTM links for the Google Business Profile are in `docs/00-GBP-UPDATE-DO-THIS-NOW.md`.

## Notes

- Sitemap: `@astrojs/sitemap` generates it, then `scripts/postbuild-sitemap.mjs` removes draft/noindex pages and adds `lastmod` from each page's `updated` date.
- `robots.txt`, `llms.txt` and `menu.json` are generated from data. `llms.txt` is an optional convenience file; Google Search does not use it.
- Schema: Restaurant, Menu, FAQPage (visible Q&A only), Article, BreadcrumbList, WebSite, Organization. No Review or AggregateRating markup, because Google does not give review stars for reviews a business hosts on its own site.
- The privacy and terms pages are plain starting text. Have a lawyer review them.
