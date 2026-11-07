// SEO gate: titles/descriptions, one H1, canonicals, JSON-LD validity and fact-matching, orphans, internal-link rules,
// hreflang reciprocity, sitemap hygiene.
import fs from 'node:fs';
import path from 'node:path';
import { args, htmlFiles, loadPage, readReport, fail } from './_lib.mjs';

const { dist } = args();
const report = readReport(dist);
const pages = htmlFiles(dist).map((f) => loadPage(dist, f));
const byPath = new Map(pages.map((p) => [p.path, p]));
const errors = [];
const warn = [];
const E = (p, m) => errors.push(`${p}: ${m}`);

// titles unique
const titles = new Map();
for (const p of pages) {
  if (p.path === '/404/') continue;
  if (titles.has(p.title)) E(p.path, `duplicate title with ${titles.get(p.title)}: "${p.title}"`);
  titles.set(p.title, p.path);
}

const site = report.siteUrl.replace(/\/$/, '');
const inbound = new Map();
for (const p of pages) {
  for (const h of p.links) {
    if (!h || !h.startsWith('/') || h.startsWith('//')) continue;
    const t = h.split('#')[0].split('?')[0];
    if (t === p.path) continue;
    inbound.set(t, (inbound.get(t) ?? 0) + 1);
  }
}

for (const p of pages) {
  if (p.path === '/404/') continue;
  if (!p.title || p.title.length > 60) E(p.path, `title missing or > 60 chars (${p.title.length})`);
  if (!p.description || p.description.length > 160) E(p.path, `description missing or > 160 chars (${p.description.length})`);
  if (p.h1s.length !== 1) E(p.path, `expected exactly 1 <h1>, found ${p.h1s.length}`);
  if (!p.lang) E(p.path, 'missing <html lang>');
  if (!p.canonical) E(p.path, 'missing canonical');
  else if (p.canonical !== `${site}${p.path}`) E(p.path, `canonical mismatch: ${p.canonical}`);
  if (!p.root.querySelector('meta[property="og:title"]')) E(p.path, 'missing Open Graph tags');

  // JSON-LD
  let hasBreadcrumb = false;
  for (const raw of p.jsonld) {
    let j;
    try { j = JSON.parse(raw); } catch { E(p.path, 'invalid JSON-LD'); continue; }
    const t = j['@type'];
    if (t === 'BreadcrumbList') hasBreadcrumb = true;
    if (/TODO|undefined/.test(raw)) E(p.path, 'JSON-LD contains TODO/undefined');
    if (t === 'Restaurant') {
      for (const k of ['name', 'address']) if (!j[k]) E(p.path, `Restaurant schema missing ${k}`);
      if (j.name !== 'Brihadhee') E(p.path, 'Restaurant name does not match facts');
      if (j.address && !String(j.address.streetAddress).includes(report.expected.street)) E(p.path, 'Restaurant street does not match facts');
      if (j.address && j.address.postalCode !== report.expected.postalCode) E(p.path, 'Restaurant postal code does not match facts');
      if (report.expected.phone && j.telephone && j.telephone !== report.expected.phone) E(p.path, 'Restaurant phone does not match facts');
      if (j.suitableForDiet && report.claims.dietClaim !== 'pure-veg') E(p.path, 'suitableForDiet set without confirmed pure-veg');
      if (!j.image) warn.push(`${p.path}: Restaurant schema has no image (add a real storefront photo)`);
    }
    if (t === 'FAQPage') {
      const bodyText = p.root.text;
      for (const q of j.mainEntity ?? []) if (!bodyText.includes(q.name)) E(p.path, `FAQPage question not visible on page: ${q.name}`);
    }
    if (t === 'Menu') for (const s of j.hasMenuSection ?? []) for (const m of s.hasMenuItem ?? []) if (m.offers && !(Number(m.offers.price) > 0)) E(p.path, 'MenuItem with invalid price');
    if (t === 'Article' && !j.author?.name) E(p.path, 'Article without named author');
    if (j.aggregateRating || j.review) E(p.path, 'Review/AggregateRating markup is not allowed (own-site reviews do not qualify)');
  }
  if (p.path !== '/' && !p.path.startsWith('/thank-you') && !hasBreadcrumb) E(p.path, 'missing BreadcrumbList');

  // indexable pages
  if (!p.noindex) {
    if (p.path !== '/' && !inbound.get(p.path)) E(p.path, 'orphan page: no internal links point to it');
    if (p.path.startsWith('/guides/') && p.path !== '/guides/') {
      const menuLinks = new Set(p.links.filter((h) => h && h.startsWith('/menu/')));
      if (menuLinks.size < 2) E(p.path, 'guide must link to at least 2 menu pages');
      if (!p.links.includes('/location/anna-nagar/')) E(p.path, 'guide must link to /location/anna-nagar/');
    }
    if (p.path.startsWith('/menu/') && p.path !== '/menu/') {
      if (!p.links.some((h) => h === '/order/' || h === '/book-a-table/')) E(p.path, 'menu page must link to /order/ or /book-a-table/');
      const guideFor = { '/menu/dosa/': 'types-of-dosa', '/menu/mini-tiffin/': 'what-is-mini-tiffin', '/menu/nellai-meals/': 'nellai-meals-explained', '/menu/parotta-kothu/': 'paanai-parotta' }[p.path];
      const g = guideFor && byPath.get(`/guides/${guideFor}/`);
      if (g && !g.noindex && !p.links.includes(`/guides/${guideFor}/`)) E(p.path, `menu page must link to its guide /guides/${guideFor}/`);
    }
  }

  // hreflang reciprocity
  for (const a of p.alternates) {
    if (a.hreflang === 'x-default') continue;
    const target = byPath.get(new URL(a.href).pathname);
    if (!target) { E(p.path, `hreflang target missing: ${a.href}`); continue; }
    if (!target.alternates.some((b) => new URL(b.href).pathname === p.path)) E(p.path, `hreflang not reciprocal with ${target.path}`);
  }
}

// sitemap hygiene
const smPath = path.join(dist, 'sitemap-0.xml');
if (fs.existsSync(smPath)) {
  const sm = fs.readFileSync(smPath, 'utf8');
  for (const loc of sm.match(/<loc>(.*?)<\/loc>/g) ?? []) {
    const u = new URL(loc.replace(/<\/?loc>/g, '')).pathname;
    const pg = byPath.get(u);
    if (!pg) E('sitemap', `lists a URL with no built page: ${u}`);
    else if (pg.noindex) E('sitemap', `lists a noindex/draft page: ${u}`);
    if (/thank-you|\/404\//.test(u)) E('sitemap', `must exclude ${u}`);
    if (!/<lastmod>/.test(sm)) { E('sitemap', 'no lastmod values'); break; }
  }
}
for (const need of ['robots.txt', 'llms.txt', 'menu.json', 'sitemap-index.xml']) if (!fs.existsSync(path.join(dist, need))) E('build', `missing ${need}`);

for (const w of warn) console.warn('  ! ' + w);
if (errors.length) { console.error(`\ncheck-seo FAILED (${errors.length}):`); fail(errors); process.exit(1); }
console.log(`check-seo: OK (${pages.length} pages, ${pages.filter((p) => !p.noindex).length} indexable)`);
