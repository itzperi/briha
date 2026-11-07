import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

export function args() {
  const a = process.argv.slice(2);
  const get = (n, d) => { const i = a.indexOf(n); return i >= 0 && a[i + 1] && !a[i + 1].startsWith('--') ? a[i + 1] : d; };
  return { dist: get('--dist', 'dist'), fixture: a.includes('--fixture'), keep: a.includes('--keep') };
}

export function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

export const htmlFiles = (dist) => walk(dist).filter((f) => f.endsWith('.html'));

export function urlPath(dist, file) {
  let rel = path.relative(dist, file).split(path.sep).join('/');
  if (rel === '404.html') return '/404/';
  rel = rel.replace(/index\.html$/, '');
  return '/' + rel;
}

export function loadPage(dist, file) {
  const html = fs.readFileSync(file, 'utf8');
  const root = parse(html, { blockTextElements: { script: true, style: true } });
  const meta = (n) => root.querySelector(`meta[name="${n}"]`)?.getAttribute('content') ?? null;
  const robots = meta('robots') ?? '';
  return {
    file, html, root, path: urlPath(dist, file),
    title: root.querySelector('title')?.text ?? '',
    description: meta('description') ?? '',
    canonical: root.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
    noindex: /noindex/i.test(robots),
    updated: meta('updated'),
    lang: root.querySelector('html')?.getAttribute('lang') ?? null,
    h1s: root.querySelectorAll('h1'),
    jsonld: root.querySelectorAll('script[type="application/ld+json"]').map((s) => s.text),
    links: root.querySelectorAll('a[href]').map((a) => a.getAttribute('href')),
    alternates: root.querySelectorAll('link[rel="alternate"][hreflang]').map((l) => ({ hreflang: l.getAttribute('hreflang'), href: l.getAttribute('href') })),
  };
}

export const readReport = (dist) => JSON.parse(fs.readFileSync(path.join(dist, 'facts-report.json'), 'utf8'));
export const fail = (msgs) => { for (const m of msgs) console.error('  ✗ ' + m); };
