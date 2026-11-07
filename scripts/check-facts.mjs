// Fact gate. Fails the production build while launch-critical facts are unconfirmed, or if any unconfirmed
// value / unsupported claim would be rendered on a public page, in schema, llms.txt, menu.json or the sitemap.
import fs from 'node:fs';
import path from 'node:path';
import { args, walk, readReport, fail } from './_lib.mjs';

const { dist, fixture, keep } = args();
const failures = [];
let report;
try { report = readReport(dist); } catch { console.error(`check-facts: ${dist}/facts-report.json missing (did astro build run?)`); process.exit(1); }

if (report.draftMode && !fixture) failures.push('Build was made in draft mode (PUBLIC_DRAFT_MODE=1). Draft builds must never be deployed.');
if (report.fixture && !fixture) failures.push('Build used the FIXTURE facts. Never deploy it.');

// 1) Launch-critical facts
const labels = {
  phone: 'Phone number', hours: 'Opening hours (per day)', parking: 'Parking (yes/no/street-only)', priceInfo: 'Price band or cost for two',
  reservations: 'Table booking (yes/no)', googleBusinessProfileLink: 'Google Business Profile / review link', dietClaim: 'Diet claim (pure-veg confirmed)',
  siteUrl: 'PUBLIC_SITE_URL (real domain)', menuConfirmed: 'Menu: at least 5 confirmed items with prices',
};
for (const [k, v] of Object.entries(report.checks)) if (!v) failures.push(`Unconfirmed launch fact: ${labels[k] ?? k}`);

// 2) Scan generated output
const files = walk(dist).filter((f) => /\.(html|txt|json|xml)$/.test(f) && !f.endsWith('facts-report.json'));
const stripNonLd = (html) =>
  html.replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<script(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/gi, ' ');
const claims = [
  { re: /parking/i, ok: report.claims.parking, why: 'mentions parking but parking is unconfirmed' },
  { re: /\b500\b/, ok: report.claims.dosaCount, why: 'mentions 500 but the dosa count is unconfirmed' },
  { re: /6:30/, ok: report.claims.hours, why: 'mentions 6:30 but hours are unconfirmed' },
  { re: /for two/i, ok: report.claims.costForTwo, why: 'mentions cost for two but it is unconfirmed' },
  { re: /pure veg/i, ok: report.claims.dietClaim === 'pure-veg', why: 'says pure veg but dietClaim is not confirmed pure-veg' },
  { re: /₹\s?\d/, ok: report.menu.priced > 0 || report.claims.costForTwo, why: 'shows a rupee price but none is confirmed' },
];
let placeholders = 0;
for (const f of files) {
  const rel = path.relative(dist, f).split(path.sep).join('/');
  const raw = fs.readFileSync(f, 'utf8');
  const text = f.endsWith('.html') ? stripNonLd(raw) : raw;
  if (/\bTODO\b/.test(text)) failures.push(`${rel}: contains "TODO"`);
  if (f.endsWith('.html')) {
    if (/>\s*(null|undefined)\s*</.test(raw) || /"(?:telephone|priceRange)":\s*(?:null|"undefined")/.test(raw)) failures.push(`${rel}: renders null/undefined`);
    if (/data-placeholder/.test(raw)) placeholders++;
  }
  if (rel === 'robots.txt' || rel === 'sitemap-index.xml') continue;
  // allow claim phrases inside the "Not to be confused" / privacy boilerplate? none use these phrases.
  for (const c of claims) if (!c.ok && c.re.test(text)) failures.push(`${rel}: ${c.why}`);
}
if (placeholders > 0 && !fixture) failures.push(`${placeholders} page(s) still show photo placeholders: add real photos to src/assets/photos/`);

if (failures.length) {
  console.error(`\ncheck-facts FAILED (${failures.length}):`);
  fail([...new Set(failures)]);
  if (!keep && !fixture) {
    fs.rmSync(dist, { recursive: true, force: true });
    console.error(`\n"${dist}" was deleted so a failing build cannot be deployed. Fix the facts in src/data/brand-facts.ts and src/data/menu.ts, then rebuild.`);
    console.error('To preview unfinished work, run: npm run build:draft (noindex + robots-blocked).');
  }
  process.exit(1);
}
console.log('check-facts: OK');
