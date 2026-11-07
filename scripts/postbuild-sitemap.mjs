// Prunes the generated sitemap so it lists only indexable pages, and adds <lastmod> from each page's `updated` meta.
// hreflang alternates written by @astrojs/sitemap (i18n) are preserved.
import fs from 'node:fs';
import path from 'node:path';
import { args, htmlFiles, loadPage } from './_lib.mjs';

const { dist } = args();
const pages = new Map(htmlFiles(dist).map((f) => { const p = loadPage(dist, f); return [p.path, p]; }));
const smPath = path.join(dist, 'sitemap-0.xml');
const idxPath = path.join(dist, 'sitemap-index.xml');

if (!fs.existsSync(smPath)) {
  console.log('postbuild-sitemap: no sitemap-0.xml generated (no pages?)');
  process.exit(0);
}
const xml = fs.readFileSync(smPath, 'utf8');
const head = xml.slice(0, xml.indexOf('<url>'));
const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
let kept = 0, dropped = 0;
const out = [];
for (const b of blocks) {
  const loc = b.match(/<loc>(.*?)<\/loc>/)[1];
  const p = new URL(loc).pathname;
  const page = pages.get(p);
  if (!page || page.noindex) { dropped++; continue; }
  const lastmod = page.updated ? `<lastmod>${page.updated}</lastmod>` : '';
  out.push(b.replace(/<\/loc>/, `</loc>${lastmod}`));
  kept++;
}
fs.writeFileSync(smPath, `${head}${out.join('')}</urlset>`);
console.log(`postbuild-sitemap: ${kept} URLs kept, ${dropped} draft/noindex URLs removed`);
if (kept === 0 && fs.existsSync(idxPath)) console.log('  (sitemap is empty: every page is still a draft)');
