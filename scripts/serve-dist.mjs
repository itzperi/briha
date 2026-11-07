// Tiny static server for a built folder: node scripts/serve-dist.mjs dist-draft 4321
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve(process.argv[2] ?? 'dist');
const port = Number(process.argv[3] ?? 4321);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = path.join(dir, p);
  if (!f.startsWith(dir)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { const nf = path.join(dir, '404.html'); res.writeHead(404, { 'Content-Type': types['.html'] }); res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'Not found'); return; }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] ?? 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log(`serving ${dir} on http://localhost:${port}`));
