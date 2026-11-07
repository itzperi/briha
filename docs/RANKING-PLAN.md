# Brihadhee: Detailed Plan to Rank in SEO, AEO and GEO

Prepared 7 Nov 2026. Builds on `BRIHADHEE-SEO-AEO-GEO-PLAN.md` (the master plan) and the 21 files in `docs/`. This version adds three things the master plan did not have: a live look at the search results, what your real Google reviews reveal, and a week-by-week 90-day sprint.

**How this was made, and what it could not use**
- Used: your site code and build (audited), your printed menu, 3 live web searches, and the 13 Google reviews you pasted.
- Not available: the keyword-volume skill needs a `SERPAPI_KEY` (not set), geo-grid tracking needs DataForSEO, and backlink data needs Moz or Bing keys. So there are **no search-volume numbers in this plan**. Priorities come from intent and competition, and Month 1 measures real volumes in Search Console.
- The web-search tool is US-based, so the Indian results below are indicative. Re-check them from Chennai on a phone in incognito before acting.

---

## 1. Where you stand today

| Area | Status |
|---|---|
| Website | Built and pushed, **not live yet**. Real build blocked only by the Google review link. |
| Brand search "Brihadhee restaurant Anna Nagar" | The top result is the EazyDiner listing, not your site. That listing is **wrong**: it says veg and non-veg, no parking, cost for two ₹200. |
| "Pure veg restaurant in Anna Nagar" | Owned by aggregators (EazyDiner, Swiggy Dineout, Slurrp, ThreeBestRated, HappyCow, Yappe, spinach.guide) and Saravana Bhavan and Sree Akshayam. A new site will not win this term directly in the first months. |
| "Best dosa in Anna Nagar" | **A thin results page.** It showed Karthick Tiffin Center, Mylai Karpagambal Mess, Srirangam Cafe and Dosa Da, mostly from old blogs and delivery-app pages. This is your best early win. |
| Reviews | Strong food scores. The recurring complaints are parking, noise and air-conditioning (see section 4). |
| Phone on Google | Still shows the old number 073587 14113. Must match +91 94442 24999. |

---

## 2. Fix these facts first (they affect every AI answer)

| # | Problem | Why it matters | Action |
|---|---|---|---|
| 1 | **Cost for two "₹200 to ₹250"** is on the home page and `llms.txt`. Your own printed prices (dosa ₹100 to ₹175, meals ₹150 to ₹240, starters ₹230 to ₹290) and the reviews (guests logged ₹200 to ₹400 and ₹400 to ₹600 per person) point to roughly ₹400 to ₹800 for two. | AI answers and snippets repeat this number. A wrong low price causes bad reviews. | Confirm the real figure with the owner and change `facts.priceBand`. |
| 2 | EazyDiner says "veg and non-veg" and "no parking". | Aggregator data feeds AI answers. | Ask EazyDiner to correct diet, parking and cost. Same for Swiggy, Zomato, Justdial. |
| 3 | Phone number differs between Google and the site. | Local ranking signal (NAP). | Change Google Business Profile to +91 94442 24999. |
| 4 | Parking. Reviews disagree: "plenty, free street parking" vs "hard to find on weekend afternoons". | A wrong "plenty of parking" claim would be called out. | Use honest wording: "Free street parking on the service road; on weekends it can take a few minutes to find a spot." Needs owner approval. |
| 5 | Name spelling: guests write **Brihadee** and **Brihadhee**. | People search both. | Keep Brihadee, Brihadi, Bruhadhee and Brahadhee in `facts.alternateNames` and the footer "also searched as" line. |
| 6 | **Tamil breakfast ₹130** and the **mini tiffin ₹80 contents** appear only in reviews. A guest lists the mini tiffin as idly, pongal, vada, masala dosa, two chutneys, sambar, pineapple kesari and a small filter coffee. Another lists the Tamil breakfast as soup, sundal, ragi dosa, aval upma, ulundhu kali, banana, chutneys and sambar. Neither is on the printed menu. | These are unique, searchable items, but they must be current. | Owner confirms prices and contents, then I add `/menu/mini-tiffin/` details and a Tamil breakfast section. |
| 7 | Items guests praise that are not on the printed menu: lemon sevai, pesarattu dosa, poori, ulundhu kanji, inji thogayal (in lunch), and takeaway thokku and podi. | Possible daily specials or a retail line. | Owner says which are regular. If thokku and podi are sold to take home, that is a new page and a product listing. |
| 8 | Seating "around 20" is one guest's estimate. | Group-dining page needs a real number. | Owner gives actual seats and the largest group you can take. |

---

## 3. Targets (honest ranges)

| Horizon | Target |
|---|---|
| Day 30 | Site live and indexed. Google profile and all listings corrected. Brand search shows your site and your profile in the top 3. |
| Day 90 | Top 3 in the map pack for dish and brand searches. Top 10 for "best dosa in Anna Nagar" and "build your own dosa Chennai". 25+ new Google reviews per month. |
| Month 6 | Top 5 in the map pack for "veg restaurant Anna Nagar" within about 1 km. Named in AI answers for "veg restaurant Anna Nagar" in at least a quarter of tracked prompts. |
| Month 12 | Page 1 for the dish and local clusters below. 60 relevant referring domains (the master plan's 90 is a stretch). Cited by AI engines in 40% or more of tracked prompts. |

Page 1 for "restaurants in Anna Nagar" is not a goal. Aggregators own it.

---

## 4. What your reviews tell us

**Language guests actually use (use these words on the site and in the profile)**
- Homely, "like mom's house", soulful, authentic, traditional recipes, Tamil, comforting, light on the stomach.
- Dish names guests repeat: Summer in Tenkasi, Salem mango milk or milkshake, Madras Bhel Parotta, Sodhi idly and sodhi idiyappam, Pottalam parotta, Karaikudi paneer poppers, tomato kothu idiyappam and idly, Madurai malli dosa, Kaapi affogato, butter biscuit smoothie, filter coffee, ulundhu kali or kanji, pesarattu dosa with tomato thokku.
- The build-your-own dosa concept (batter, podi, masala, garnish) is mentioned by four separate reviewers.
- Several guests found the place through Instagram reels, and some say they distrust influencers. Disclose any paid collaboration and keep promotion honest.

**Recurring negatives and how to handle each**

| Theme | Mentions | Response |
|---|---|---|
| Parking hard on weekends | 3 | Say it plainly on the location page. Add landmarks and nearby parking tips. Offer a "visit at 3 PM on weekdays" tip. |
| Noise and atmosphere 3/5 | 3 | Do not claim "quiet". Say "lively". Check the AC and fix it if it is weak. |
| Paneer hard to taste in poppers | 1 | Pass to the kitchen. |
| Lunch served in plates and cups | 1 | Operational feedback, not SEO. |
| Early service confusion (a year ago) | 1 | Resolved by later reviews. |

**Rules for using reviews**
- Do not copy guests' review text onto the site without their permission. It is their writing.
- Do not mark up Google reviews as your own rating schema. Google disallows self-serving review markup for local businesses.
- Use themes (paraphrased) and link to your Google reviews. For quotes, ask guests in writing and keep the permission.
- Never offer discounts or gifts in return for reviews. Never filter who gets asked.

---

## 5. Keyword strategy

No volumes yet. Tiers are ordered by how likely a new site is to win and how valuable the visit is.

**Tier A: win first (brand and unique dishes). These have no strong competitor.**
`brihadhee`, `brihadee`, `brihadhee anna nagar`, `brihadhee menu`, `brihadhee timings`, `summer in tenkasi`, `salem mango milk chennai`, `madras bhel parotta`, `meltdown in madras`, `kaapi affogato chennai`, `butter biscuit smoothie chennai`, `build your own dosa chennai`, `midnight sky dosa` (charcoal dosa), `pink sea dosa`.

**Tier B: dish plus place (thin competition, high intent).**
`best dosa in anna nagar`, `dosa varieties anna nagar`, `ghee roast dosa anna nagar`, `sodhi idly chennai`, `sodhi idiyappam chennai`, `nellai meals chennai`, `nellai meals anna nagar`, `pottalam parotta chennai`, `paanai parotta chennai`, `kothu idiyappam chennai`, `tomato kothu idly chennai`, `mini tiffin anna nagar`, `tamil breakfast anna nagar`, `ulundhu kali chennai`, `pesarattu dosa anna nagar`, `thokku podi buy chennai`, `breakfast in anna nagar`, `filter coffee anna nagar`.

**Tier C: local commercial (aggregator-dominated; reach through the map pack, not the web results).**
`pure veg restaurant in anna nagar`, `veg restaurant anna nagar`, `south indian restaurant anna nagar`, `tiffin centre anna nagar`, `family restaurant anna nagar veg`, `veg restaurant with parking anna nagar` (only if you can say yes honestly), `group dining anna nagar`.

**Tier D: informational (feeds AI answers).**
`what is sodhi`, `what is paanai parotta`, `types of dosa`, `what is ulundhu kali`, `what is kothu idiyappam`, `what is mini tiffin`, `tamil vegetarian breakfast`.

**Tier E: Tamil and Tanglish.** `அண்ணா நகர் தோசை`, `அண்ணா நகர் சைவ உணவகம்`, `நெல்லை மீல்ஸ் சென்னை`, "anna nagar la nalla veg hotel". Needs a native editor.

**Month 1 task:** connect Search Console and read real queries. After 4 weeks, re-rank tiers by impressions and click-through.

---

## 6. Workstream A: the website (SEO)

**Already built:** home, menu hub and 6 menu pages, dosa page with build-your-own, location, order, book a table, FAQ, group dining, contact, gallery, guides index, compare and seasonal templates, schema, `llms.txt`, `robots.txt`, `menu.json`, split sitemaps with images, click tracking.

**To add (in this order)**

| Priority | Page | Why | Needs |
|---|---|---|---|
| 1 | `/menu/signature-drinks/` | Unique names (Summer in Tenkasi, Salem mango milkshake, Meltdown in Madras, The Filter Kaapi Shake) are the most-mentioned items in reviews and have no competition. | Photos of each drink, and what each contains from the owner. |
| 2 | `/menu/dosa/build-your-own/` | "Build your own dosa Chennai" is a distinct search. Four reviewers raise it. Today it is a section of the dosa page. | Photos of the batters (the colours make strong images). |
| 3 | `/menu/starters/` | Madras Bhel Parotta, Karaikudi paneer poppers, Kongu and Kanthari nei varuval. | Photos. |
| 4 | `/menu/tamil-breakfast/` | Unique item, healthy angle, strong AI-answer fit. | Owner confirms price and contents. |
| 5 | Dish pages: Madras Bhel Parotta, Sodhi idly, Pottalam parotta, Summer in Tenkasi | Each answers "what is X" and links to the menu. | Photo and 2 sentences from the kitchen about each. |
| 6 | `/shop/` or a section on `/menu/` for thokku and podi | Only if you sell them. | Owner confirms products and prices. |
| 7 | `/locations-served/{area}/` | Only if you have real distances and routes for each area. | Owner or staff walk-through. Otherwise skip: these would be doorway pages. |
| 8 | `/menu/lunch-meals/` and `/menu/nellai-meals/` | Both exist. Make sure the copy differs. | Photo of your own meals plate. |

**On every page (checklist, already enforced by the build)**
- Unique title (60 characters or less), meta description (160 or less), one H1, canonical, breadcrumbs.
- First 100 words state who, where, diet, price or hours.
- Menu items as crawlable text with ₹ prices.
- Each guide links to 2 or more menu pages and the location page. Each menu page links back to its guide.
- Add "Last updated" dates and keep them true.

**Technical items still open**
- Add `preflight` check for Core Web Vitals on a mid-range Android on 4G after the first deploy (LCP under 2.5 s, INP under 200 ms, CLS under 0.1).
- Self-host the Tamil font subset before the `/ta/` pages go live.
- Set the real domain (`PUBLIC_SITE_URL`) and the 301 from `www` to the bare domain in hosting.
- Ping IndexNow after each deploy (script is ready).

---

## 7. Workstream B: Local SEO and Maps (the highest-leverage channel)

**Google Business Profile (do this week; see `docs/00-GBP-UPDATE-DO-THIS-NOW.md`)**
1. Phone to +91 94442 24999. Website to the live domain with `?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
2. Categories: primary "South Indian restaurant" or "Vegetarian restaurant", whichever the geo-grid favours in Month 1. Add secondary categories only if true.
3. Attributes: "Vegetarian only" (true per the menu), dine-in, takeaway, delivery if you do it. Only tick parking, group-friendly, kid-friendly and wheelchair access if accurate. The reviews suggest wheelchair access is limited, so do not claim it.
4. Add the full menu with prices (from the PDF), 8 or more products (mini tiffin, Nellai meals, build-your-own dosa, drinks), and 40 or more photos: dishes, exterior, interior, the board with the batter options, the drinks in steel tumblers.
5. Reserve link (already supplied), order links, messaging on.
6. Q&A: seed 15 real questions with your own answers (parking, reservations, veg, build-your-own, mini tiffin, timings).
7. Weekly Posts: a new drink, a seasonal item, a festival timing.
8. Description (750 characters): lead with pure vegetarian South Indian, Anna Nagar, three signature items. No keyword stuffing.

**Reviews (the fastest ranking lever)**
- Goal: 20 to 25 new reviews per month.
- Put a QR code on the bill and the table. Staff can say: "If you enjoyed it, a Google review helps a lot." Ask what they ordered ("which dish was your favourite?") so reviews mention dishes naturally.
- Reply to every review within 48 hours. Templates for the recurring themes:
  - Parking: thank them, apologise, and give the weekday-afternoon tip.
  - AC or noise: thank them, say you are looking into it, and only promise what you will do.
- Never buy, gate or incentivise reviews.

**Citations (identical name, address and phone everywhere)**
Swiggy and Swiggy Dineout, Zomato, EazyDiner, District, Justdial, Sulekha, Magicpin, Yappe, spinach.guide, HappyCow (pure veg), Bing Places, Apple Business Connect, TripAdvisor, Facebook, Instagram. Track each in the sheet in `docs/41-reviews-and-local-areas.md`.

**Tracking**
- Geo-grid: 7 by 7 grid, 0.5 km spacing, 8 head terms, baseline in Week 2, repeat monthly (needs a DataForSEO or similar key; or do it by hand from a phone with location set).
- Competitor radius: Saravana Bhavan, Sree Akshayam, Karthick Tiffin Center, Mylai Karpagambal Mess, Srirangam Cafe, Dosa Da, Sangeetha and Nithya Amirtham (a reviewer lists these as the usual choices). Record rating, review count, monthly new reviews, categories and photo count. Beat each on review velocity and photo freshness first.

---

## 8. Workstream C: AEO (answer engines, snippets, voice)

**Answer blocks (40 to 60 words, first thing under the heading)**
- What is Brihadhee? Pure vegetarian South Indian restaurant on 3rd Avenue, W Block, Anna Nagar; open 6:30 AM to 11 PM daily; phone.
- What is build-your-own dosa? Four steps with named options and prices.
- What is in the mini tiffin? (after owner confirms.)
- What is Summer in Tenkasi? (owner gives the ingredients; a guest describes it as a cold coconut-milk drink, but confirm.)
- Is reservation required? A guest notes "not required". Confirm and say so.
- Is there parking? Honest street-parking wording from section 2.

**FAQ additions drawn from review questions**
Is Brihadhee fully vegetarian? Is there a quiet time to visit? Do you have a Tamil breakfast? Can I buy the podi and thokku? What is Sodhi? How many people can you seat? Is the restaurant good for groups? What dishes are most popular?

**Formats**
- Definition paragraphs, step lists (how build-your-own works), price tables, and a comparison table of the five batters (what each is made from, price).
- Voice phrasing: a full sentence a phone assistant can read aloud, with hours and phone in plain text on the first screen.
- FAQ schema on `/faq/` and the page-level FAQs (already built). Use only answers you have confirmed.

---

## 9. Workstream D: GEO (being cited by ChatGPT, Gemini, Perplexity, Copilot)

AI engines trust pages that other sources repeat. For a new restaurant the leverage is clean facts, quotable passages and third-party mentions.

1. **One canonical description** (2 sentences) used word for word on the site, Google profile, Swiggy, Zomato, EazyDiner, Instagram and Facebook.
2. **Citable passages:** each key page opens with a self-contained 2 to 3 sentence block (who, what, where, price, hours, diet). Add original data: menu counts, batter list, price tables, dated "last updated".
3. **Third-party mentions (these matter more than your own site):** the searches show which sites AI engines already draw from for Anna Nagar and Chennai veg food: Slurrp, DT Next, Curly Tales, ThreeBestRated, HappyCow, Yappe, spinach.guide, EazyDiner, Swiggy Dineout, LBB, Housing.com guides. Pitch each with the same name and area.
4. **Crawler access:** `robots.txt` already allows GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Google-Extended, Googlebot and Bingbot. Do not block them in Cloudflare bot rules. All content is server-rendered HTML.
5. **llms.txt** is live. It is a cheap extra, not a ranking lever. Fix the cost line first (section 2).
6. **Prompt tracking:** run these monthly in ChatGPT with search on, Perplexity, Gemini and Copilot. Log whether Brihadhee is named, its position, the cited links and any wrong fact. Fix wrong facts at the source.
   - Recommend a pure vegetarian South Indian restaurant in Anna Nagar for a family lunch.
   - Where can I try Nellai meals or sodhi in Chennai?
   - Is there a build-your-own dosa place in Chennai?
   - Best dosa in Anna Nagar.
   - Veg restaurant in Anna Nagar with good filter coffee.
   - What is Summer in Tenkasi?
   - Where to eat Madras bhel parotta in Chennai?
   - Is Brihadhee in Anna Nagar vegetarian?
   - (The full 40-prompt list is in `docs/12-ai-prompts-tamil-local.md`.)

---

## 10. Workstream E: Agentic readiness

Already built: `menu.json`, plain `<a>` and `<form>` actions, no login, `tel:` links, Google reserve link, order links. Remaining:
- Add a WhatsApp number and `wa.me` link if you take WhatsApp orders (most agent-friendly channel in India).
- Keep opening hours in schema the same day they change, including festival hours.
- Confirm the Google reserve and Swiggy and Zomato order buttons are live on the profile.

---

## 11. Workstream F: Competitor and comparison pages

- Pages are built but empty (`competitors.json` has no entries). Fill only with facts from public sources with a date: diet, signature items, price band, hours, rating with source and date.
- Targets: Saravana Bhavan Anna Nagar, A2B, Sree Akshayam, and one "best pure veg restaurants in Anna Nagar" list that includes you honestly.
- Your honest differences, taken from reviews and the menu (state only what you can support): build-your-own dosa with named batters, Tirunelveli (Nellai) dishes such as sodhi, thokku and podi range, signature drinks, homely Tamil style. A reviewer positions you as the next stop for people who usually go to the big chains.
- Never disparage. Show "Last verified" dates. Update quarterly.

---

## 12. Workstream G: Backlinks and PR

Quality over volume. Target 60 relevant referring domains in 12 months. Do not buy links.

| Tier | Source | Pitch hook (real) | 12-month target |
|---|---|---|---|
| 1 | DT Next, The Hindu MetroPlus, TOI Chennai, Hindu Tamil | Build-your-own dosa with named batters (Golden Hour, Midnight Sky, Pink Sea, Monsoon Forest, Terracotta Canyon); Nellai sodhi; Summer in Tenkasi | 6 |
| 1 | Slurrp, LBB, Curly Tales, ThreeBestRated, HappyCow, Wanderlog | Inclusion in "best veg", "best dosa", "best tiffin" lists | 15 |
| 2 | Chennai food bloggers and YouTubers | Tasting invite. Ask for a link in the description. Require paid posts to be labelled. | 12 |
| 2 | Anna Nagar associations, temples, schools, offices | Breakfast tie-ups, member offers | 10 |
| 3 | Directories | Citations | 25 (not counted as authority links) |
| 3 | Festival tie-ups (Margazhi, Karthigai, Ayyappa mala) | Seasonal menu or timing press note | 6 |
| 4 | Suppliers (rice, ghee, coffee, thokku spices) | "Where we source" | 4 |

Because guests say they distrust influencers, favour micro-creators who order and pay as normal guests, and make disclosure part of every invitation.

---

## 13. 90-day sprint

**Week 0 to 1: unblock**
- Owner: send the Google review link; confirm cost for two, parking wording, mini tiffin and Tamil breakfast details, thokku and podi sales, seat count.
- Me: add the link, run the real build, deploy (Vercel or Cloudflare), set the domain.
- Owner: fix the phone number on Google. Verify Search Console and Bing Webmaster. Submit `sitemap-index.xml`.

**Week 2: listings and baseline**
- Correct EazyDiner, Swiggy, Zomato, Justdial. Upload 40 photos to the profile. Seed Q&A. Baseline geo-grid and the 40 AI prompts.

**Week 3 to 4: pages**
- Ship signature drinks, build-your-own and starters pages with real photos. Add the Tamil breakfast page once confirmed. Name a real author on the guides and publish them.

**Week 5 to 8: reviews and mentions**
- QR codes live, reply routine running (target 20 to 25 reviews per month). Pitch 10 listicle sites and 5 creators. Start weekly Google Posts.

**Week 9 to 12: measure and adjust**
- Re-run geo-grid and AI prompts. In Search Console, re-rank keyword tiers by real impressions. Fix pages with impressions but low clicks (rewrite titles). Add dish pages for the top 5 queries.

**Months 4 to 12 (summary):** Tamil pages after native review; area pages if real; compare pages with dated data; seasonal pages two weeks before each festival; monthly geo-grid and AI prompt check; quarterly competitor refresh; steady PR.

---

## 14. Measurement

| Metric | Tool | Cadence |
|---|---|---|
| Impressions, clicks, queries, indexed pages | Search Console, Bing Webmaster | Weekly |
| Calls, directions, website clicks, reviews | Google Business Profile | Weekly |
| Call, directions, order, book clicks | GA4 (events are built in) | Weekly |
| Map-pack rank by location | Geo-grid | Monthly |
| AI mentions and wrong facts | 40-prompt sheet | Monthly |
| New referring domains | Search Console links, Bing, Moz | Monthly |
| Review count, rating, replies in 48 h | Google Business Profile | Weekly |

---

## 15. Risks

- **Wrong facts spreading** (cost, diet, parking): fix at the source and keep one fact sheet.
- **Name collision** with Brihadeeswarar Temple and baby-name pages: always write "Brihadhee restaurant, Anna Nagar".
- **Review policy breaches** (incentives, gating, copying text): the fastest way to lose the profile.
- **Thin or doorway pages:** skip any area or dish page without real, unique content.
- **Influencer backlash:** disclose paid posts.
- **Over-promising capacity or parking:** guests already remark on it.

---

## 16. Decisions needed from the owner (in order)

1. Google review link (blocks launch).
2. Real cost for two.
3. Parking wording.
4. Mini tiffin ₹80 contents and the Tamil breakfast ₹130 details: current and regular?
5. Which of lemon sevai, pesarattu dosa, poori, ulundhu kanji and inji thogayal are regular items?
6. Do you sell thokku and podi to take home?
7. Seating count and largest group.
8. Contents of Summer in Tenkasi and each signature drink.
9. A named author (the owner or head cook) for the guides.
10. Photos: drinks, build-your-own batters, entrance, interior, and which dishes are in photos 2, 4, 12 and 20.
11. WhatsApp number, if used.
12. Permission, in writing, from any guest whose review you want to quote.
