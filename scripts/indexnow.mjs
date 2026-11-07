// Pings IndexNow (Bing, Yandex and partners) with URLs whose content changed since the last run. No key = skip.
// Usage after deploy: INDEXNOW_KEY=... PUBLIC_SITE_URL=https://yourdomain npm run indexnow
// The key file must be reachable at <site>/<key>.txt: this script writes it into dist/ first (deploy again once if new).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { args, htmlFiles, loadPage } from './_lib.mjs';

const key = process.env.INDEXNOW_KEY;
const site = (process.env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
if (!key) { console.log('indexnow: INDEXNOW_KEY not set, skipping'); process.exit(0); }
if (!site) { console.log('indexnow: PUBLIC_SITE_URL not set, skipping'); process.exit(0); }
const { dist } = args();
const manifestPath = '.indexnow-manifest.json';
const old = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
fs.writeFileSync(path.join(dist, `${key}.txt`), key);

const next = {};
const changed = [];
for (const f of htmlFiles(dist)) {
  const p = loadPage(dist, f);
  if (p.noindex) continue;
  const hash = crypto.createHash('sha1').update(p.html).digest('hex');
  next[p.path] = hash;
  if (old[p.path] !== hash) changed.push(site + p.path);
}
if (!changed.length) { console.log('indexnow: nothing changed'); process.exit(0); }
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList: changed.slice(0, 10000) }),
});
console.log(`indexnow: submitted ${changed.length} URL(s), HTTP ${res.status}`);
if (res.status < 300) fs.writeFileSync(manifestPath, JSON.stringify(next, null, 2));
