# Brihadhee: Plan to Turn Rankings into Customers

Prepared 7 Nov 2026. This is the customer-side companion to `RANKING-PLAN.md` (how to rank) and `BRIHADHEE-SEO-AEO-GEO-PLAN.md` (the master plan). Ranking only matters if it fills tables and orders. This plan covers the part those two do not: how many customers to expect, which channels bring them, how to convert them, and how to stop capacity from capping growth.

**Where the SEO-plan deliverables already live (so nothing is duplicated)**

| Deliverable | Where it is |
|---|---|
| Strategy | `BRIHADHEE-SEO-AEO-GEO-PLAN.md`, `docs/RANKING-PLAN.md` |
| Competitor analysis | `docs/20-competitor-battle-plan.md`, `docs/20-competitor-tracker.csv` |
| Content calendar | `docs/30-content-calendar-A.md`, `docs/31-content-calendar-B.md` |
| Roadmap and KPIs | `docs/61-roadmap-kpi-templates.md`, section 13 of `docs/RANKING-PLAN.md` |
| Site structure and keyword map | `docs/60-keyword-map-and-ia.md`, `docs/60-keyword-map.csv` |

**What I could not run:** the keyword-volume skill needs a `SERPAPI_KEY`; agentic and GEO checks were done as framework reviews of the built site, since the site is not live to crawl. Every customer number below is an assumption you replace with your own data in Month 2.

---

## 1. The biggest lever right now is not SEO

Three things come before any ranking work. Until they are done, extra visibility sends people to wrong information.

1. **Deploy the site** (Vercel steps are in the previous message). Nothing ranks until it is live.
2. **Fix the facts guests and AI engines see.** Cost for two (the site says ₹200 to ₹250; your own prices and guests' logged spend say about ₹400 to ₹800), parking wording, hours on Zomato, "veg and non-veg" on EazyDiner, the old phone number on Google.
3. **Fix what reviews complain about.** Weekend parking, noise and weak air-conditioning appear in 3 of 13 pasted reviews each. Reviews are the single biggest conversion factor on Google Maps, so a 3 out of 5 atmosphere score costs real customers.

---

## 2. Customer math (an assumption model: replace the inputs)

Formula: **organic visits x action rate x show-up rate x people per party x average bill = monthly customers and revenue from the website.**

| Input | Conservative | Base | Stretch | How to replace with real data |
|---|---|---|---|---|
| Organic website visits per month (month 12) | 2,500 | 4,500 | 10,000 | Search Console and GA4 |
| Action rate (call, directions, order or book clicks per visit) | 8% | 10% | 12% | GA4 events already built in |
| Share of actions that become a visit or an order | 30% | 40% | 50% | Ask at billing: "how did you find us?" |
| Parties per month from the website | 60 | 180 | 600 | calculated |
| Average bill per party (incl. GST, for 2 people) | ₹500 | ₹600 | ₹700 | Your billing data |
| Monthly revenue from website visitors | about ₹30,000 | about ₹1.1 lakh | about ₹4.2 lakh | calculated |

These are illustrative. Two points matter more than the exact numbers:
- **Google Maps and your Business Profile usually bring more customers than the website**, because "veg restaurant near me" is answered in the map pack. Track profile calls and direction requests separately. A reasonable target to test: 600 direction requests plus calls per month by month 3, 1,500 by month 6. Set your real baseline in Week 1 from Business Profile insights.
- **One review-driven customer is worth more than one search click.** Guests in your reviews say they came from Instagram reels, then checked Google reviews before deciding.

---

## 3. Capacity is the hidden ceiling

A guest estimates about 20 seats. If that is right, filling the weekend lunch rush further earns nothing and lowers satisfaction (guests already note noise and parking trouble at busy times). So the plan steers extra demand away from peaks.

| Move | What it does |
|---|---|
| Confirm real seat count and your busiest hours | Without these, targets are guesses |
| Promote **off-peak** visits: weekday 3 PM to 6 PM and 8 AM to 10 AM, and early breakfast | Add a "quietest times" line to the location page and Google Posts |
| Grow **takeaway, delivery and group or party orders** | These do not need seats |
| Sell **thokku, podi and tiffin boxes** for takeaway (guests say they bought thokku and podi to take home) | New revenue without tables. Needs owner confirmation that you sell them |
| Offer **advance booking for groups of 6 or more** | Reservations are "not required" per guests, but groups benefit |

---

## 4. Customer channels, in order of expected payoff

| # | Channel | Why for Brihadhee | First actions |
|---|---|---|---|
| 1 | **Google Maps and Business Profile** | "Veg restaurant near me", dish and brand searches. Reviews convert. | Fix phone and categories, 40 photos, full menu with prices, Q&A, weekly Posts, 20 to 25 reviews a month, reply within 48 hours |
| 2 | **Instagram** | Your own research shows reels drive discovery. Guests also say they distrust paid influencers. | Post 3 reels a week: the batter colours (Midnight Sky, Pink Sea), Summer in Tenkasi being made, Madras Bhel Parotta, the owner serving. Link the profile to the site and the review page. |
| 3 | **Swiggy, Zomato and EazyDiner** | Delivery and discovery. Aggregators also feed AI answers. | Correct diet, parking, hours and cost. Add the full menu and good photos. Respond to reviews there too. |
| 4 | **Website** | Converts the Maps and AI visitors. | Deploy, then watch the call, directions, order and book events weekly |
| 5 | **WhatsApp** | The easiest channel for repeat orders in India. Also the most agent-friendly. | Add a business number and catalogue with the menu, a `wa.me` link on the site, a broadcast list for festival specials (with opt-in) |
| 6 | **Local partnerships** | Anna Nagar is dense with offices, schools, residents' associations and park walkers. | Pitch breakfast tie-ups to Anna Nagar Tower Park walking groups and residents' associations. Offer office tiffin boxes and a group-lunch menu. |
| 7 | **Press and food lists** | Slurrp, DT Next, Curly Tales, LBB, ThreeBestRated and HappyCow appear in your search results. They feed both Google and AI answers. | Pitch the build-your-own dosa, Nellai sodhi and Summer in Tenkasi. See section 12 of `RANKING-PLAN.md`. |
| 8 | **Festival and seasonal offers** | Pure-veg demand spikes in Margazhi, Karthigai, Ayyappa mala and Navaratri. | Plan a seasonal special and a Google Post two weeks before each. |
| 9 | **Repeat customers** | Cheapest source of revenue. | Stamp card or WhatsApp loyalty (for example a free filter coffee after a set number of visits, if you choose to). Ask for a review at the table. |

---

## 5. Convert the visitors you get

**On the website (already built, check after deploy)**
- Call, Directions, Order and Book are above the fold and in a sticky bar on every mobile page.
- Hours, address and phone are plain text in the first screen.
- Menu is real text with prices, so Google and AI can quote it.

**To improve**
- Put one "popular dishes" strip on the home page using the dishes guests name most: Madras Bhel Parotta, Sodhi Idly, Summer in Tenkasi, Salem mango milkshake, Pottalam Parotta. Use your own photos only.
- Add a "best time to visit" line (quiet hours) and honest parking guidance so guests arrive prepared.
- Make the booking form work: add the Web3Forms key before launch. A form that cannot submit loses customers.
- Link the Google review page from the thank-you screen and the bill QR code.

**On Google Business Profile**
- Add products (mini tiffin, Nellai meals, build-your-own dosa, drinks) with prices. Pin a Post about the signature drinks.
- Reply to every review. Template for parking and noise complaints: thank them, apologise, and give the quiet-hours tip.

---

## 6. Offers to test (your call: these are ideas, not requirements)

Test one at a time for 4 weeks and compare against the previous 4 weeks. Keep every offer honest and tied to real prices.

- A weekday 3 PM to 6 PM combo (for example a dosa and filter coffee) to fill the quiet hours.
- A "build your own dosa" first-timer suggestion card at the table showing three Chef's Suggestions.
- A birthday or group-of-6 dessert, such as a Kaapi Affogato.
- An office breakfast box for teams.
Do not offer discounts or gifts in exchange for reviews.

---

## 7. How to measure customers, not just clicks

| What | How | Cadence |
|---|---|---|
| Calls and direction requests | Business Profile insights | Weekly |
| Website actions | GA4 events (`call_click`, `directions_click`, `order_click`, `book_click`) | Weekly |
| Where customers came from | Ask at billing: "How did you hear about us?" Tally Google, Instagram, friend, Swiggy, walked by | Daily tally, weekly total |
| Reservations from the site | Booking form submissions | Weekly |
| Delivery orders | Swiggy and Zomato dashboards | Weekly |
| Reviews and rating | Business Profile | Weekly |
| Revenue per source (approximate) | Tally x average bill | Monthly |

One simple weekly scorecard sheet with these lines is enough. Compare each Monday.

---

## 8. 90-day customer sprint

**Week 0 to 1**
- Deploy on Vercel. Fix the cost, parking, hours and phone facts on the site and every platform. Add the booking key and GA4 ID. Connect Search Console.
- Owner: confirm seats and busiest hours, mini tiffin and Tamil breakfast details, and whether thokku and podi are sold.

**Week 2 to 3**
- Upload 40 or more photos and the full menu to Google, Swiggy and Zomato. Seed Business Profile Q&A. Print the review QR code for tables and bills.
- Start the billing question "how did you hear about us?".
- Open a WhatsApp Business number with the menu catalogue.

**Week 4 to 6**
- Launch the signature drinks page, the build-your-own page and starters page (needs your photos). Begin 3 reels a week.
- Run the first off-peak offer for 4 weeks.
- Pitch 10 food sites and 5 local creators (with disclosure rules). Contact 5 local organisations about tie-ups.

**Week 7 to 12**
- Review the scorecard. Keep the offers that filled quiet hours. Add dish pages for the top queries from Search Console.
- Plan the Margazhi or the next seasonal special two weeks ahead.
- Re-check the cost, parking and hours facts on every platform.

---

## 9. Risks

- **Capacity:** more demand at peaks with about 20 seats lowers reviews. Steer to off-peak, takeaway and delivery.
- **Wrong facts spreading:** one wrong cost or diet claim can flip a visit into a bad review.
- **Influencer distrust:** guests say they ignore paid reviews. Use honest, disclosed collaborations only.
- **Review policy breaches:** never incentivise, gate or buy reviews.
- **Over-relying on one channel:** Google Maps is strongest, but diversify to WhatsApp and local tie-ups.

---

## 10. Decisions needed from the owner

1. Deploy now on Vercel (Environment variables and steps given earlier).
2. Real cost for two and average bill per party.
3. Number of seats, busiest hours, and the largest group you can take.
4. Do you sell thokku, podi or tiffin boxes for takeaway?
5. Confirm mini tiffin ₹80 and Tamil breakfast ₹130 details.
6. A WhatsApp business number.
7. Which offer to test first.
8. Who answers reviews (needs a named person and a 48-hour rule).
