# Search Console and Bing setup (after the real domain is live)

1. **Verify the domain in Google Search Console.** Go to search.google.com/search-console, choose "Domain", enter your domain, and add the DNS TXT record at your registrar. Wait for "Ownership verified".
2. **Submit the sitemap.** In Search Console, open Sitemaps and submit `sitemap-index.xml`. The build only lists live, indexable pages (drafts and noindex pages are removed).
3. **Request indexing for the first 10 URLs** (URL inspection, then "Request indexing"): `/`, `/menu/`, `/menu/dosa/`, `/menu/mini-tiffin/`, `/menu/nellai-meals/`, `/location/anna-nagar/`, `/order/`, `/book-a-table/`, `/faq/`, `/about/`. Skip any that are not in your sitemap yet (they are drafts).
4. **Add the site to Bing Webmaster Tools** (bing.com/webmasters). Import from Search Console if offered, then submit the same sitemap.
5. **IndexNow (optional).** Set `INDEXNOW_KEY` and `PUBLIC_SITE_URL`, run `npm run build`, deploy, then run `npm run indexnow`. With no key, the script does nothing.
6. **Google Analytics 4.** Create a GA4 property, copy the measurement ID (G-XXXX) into `PUBLIC_GA4_ID`, and rebuild. Mark these events as key events: `call_click`, `directions_click`, `order_click`, `book_submit`, `whatsapp_click`.
7. **Google Business Profile.** Add the UTM-tagged website, order, menu and booking links from `docs/00-GBP-UPDATE-DO-THIS-NOW.md`.
8. **Check weekly for four weeks:** Search Console Pages report (any "Excluded" pages that should be indexed), Performance (queries containing "brihadhee", "Anna Nagar", "dosa"), and Core Web Vitals once there is field data.
