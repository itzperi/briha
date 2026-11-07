# Owner to-do: what is still missing

`npm run build` currently fails on exactly one thing: the **Google review link** (Business Profile dashboard, "Get more reviews") for `facts.socials.gbp` in `src/data/brand-facts.ts`.

## Confirmed and already in the site

Name, address with door numbers, landmarks; pure vegetarian; phone +91 94442 24999; hours 6:30 AM to 11:00 PM every day; street parking only; cost for two about ₹200 to ₹250; booking through Google Maps (reserve link), EazyDiner, or walk-in; domain brihadhee.com; the full table menu with prices (from your PDF; prices exclude 5% GST, parcel charges extra); build-your-own dosa with chef's suggestions; logo, favicon and 15 gallery photos.

## Questions for you

1. **Phone number: confirmed as +91 94442 24999.** The Google listing you pasted shows 073587 14113, so update Google Business Profile (and Swiggy, Zomato, EazyDiner) to the same number. Mismatched numbers hurt local search.
2. **Mini tiffin ₹80.** It is not on the printed table menu. Is it a separate or morning-only item? If not, remove it (`src/data/menu.ts`, id `mini-tiffin`) or add what it contains.
3. **Photo 19** (full meal on a banana-leaf plate) is used for "Nellai meals" and "lunch and meals". Is that your Nellai meals plate? If not, tell me which photo is.
4. **Photos 2, 4, 12 and 20** are not used. Tell me what each dish is (photo 4 looks like a fried red dish, 20 a creamy dish) and I will add them with correct names. Photos for mini tiffin, idly/tiffin and the restaurant entrance are still missing; those spots stay empty rather than show a wrong picture.
5. **"500+ dosas".** The menu has 5 batters, 6 toppings, 4 stuffings and 5 garnishes, so at least 5 x 6 x 4 x 5 = 600 combinations if a guest picks one of each. If you want the site to say "500+ dosa combinations", say so and I will add it with that explanation (`facts.dosaCount`).
6. **Google listing details you pasted.** It says "Vegan options" and "Has changing table(s)" and price per person ₹200 to ₹400. These are not used on the site. Tell me if they are true and you want them added.

## Still needed or useful

| Item | Where |
|---|---|
| Google review link (blocks the launch build) | `facts.socials.gbp` |
| FSSAI veg proof and licence number | `facts.fssai` |
| Correct EazyDiner (it says veg and non-veg) and the Swiggy Dineout price | the platforms |
| Swiggy and Zomato restaurant links, Swiggy Dineout link | `facts.delivery`, `facts.bookingLinks` |
| WhatsApp number (if you take WhatsApp orders) | `facts.whatsapp` |
| Which dishes are served at breakfast and dinner (`periods`) | `src/data/menu.ts` |
| Payment methods, email, entrance map coordinates | `facts` |
| Story of the restaurant in your own words | `src/pages/about.astro` |
| Tamil copy checked by a native speaker | `src/content/ta/` |
| Real guest reviews with permission | `src/data/reviews.json` |
| Named authors for guides | guide front matter |
| Review the FAQ bank and approve answers | `src/data/faq-approved.json` |
