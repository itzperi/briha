// Internal links must resolve. External links from facts are checked with HEAD requests (warn only).
import fs from 'node:fs';
import path from 'node:path';
import { args, htmlFiles, loadPage, readReport, fail } from './_lib.mjs';

const { dist, fixture } = args();
const errors = [];
const pages = htmlFiles(dist).map((f) => loadPage(dist, f));

const exists = (p) => {
  const clean = decodeURIComponent(p.split('#')[0].split('?')[0]);
  const target = path.join(dist, clean);
  if (clean.endsWith('/')) return fs.existsSync(path.join(target, 'index.html'));
  return fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html'));
};
for (const p of pages) {
  for (const h of new Set(p.links)) {
    if (!h || h.startsWith('#') || h.startsWith('//') || /^(https?:|mailto:|tel:)/.test(h)) continue;
    if (h.startsWith('/') && !exists(h)) errors.push(`${p.path}: broken internal link ${h}`);
  }
}
if (errors.length) { console.error(`\ncheck-links FAILED (${errors.length}):`); fail([...new Set(errors)]); process.exit(1); }
console.log(`check-links: internal links OK (${pages.length} pages)`);

if (!fixture) {
  const report = readReport(dist);
  for (const url of report.externalLinks ?? []) {
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 8000);
      const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctl.signal, headers: { 'User-Agent': 'site-link-check/1.0' } });
      clearTimeout(t);
      if (res.status >= 400) console.warn(`  ! external link returned ${res.status}: ${url} (some sites block HEAD requests)`);
    } catch (e) { console.warn(`  ! external link not reachable: ${url} (${e.name})`); }
  }
}
