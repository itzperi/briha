// Builds favicon (ico + png), apple-touch icon, logo mark and the 1200x630 social image from src/assets/brand/logo.jpg
import sharp from 'sharp';
import fs from 'node:fs';

const logo = 'src/assets/brand/logo.jpg';
if (!fs.existsSync(logo)) { console.log('make-brand: no logo, skipping'); process.exit(0); }
fs.mkdirSync('public/og', { recursive: true });
fs.mkdirSync('public/brand', { recursive: true });

// Square crop around the lion emblem (centre about x=1017, y=572 in the 2000x1414 logo)
const crop = { left: 667, top: 222, width: 700, height: 700 };
const mark = (size) => sharp(logo).extract(crop).resize(size, size).png();

const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => mark(s).toBuffer()));
// ICO container with PNG payloads (supported by all current browsers)
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
fs.writeFileSync('public/favicon.ico', Buffer.concat([header, ...entries, ...pngs]));
await mark(32).toFile('public/favicon-32.png');
await mark(180).toFile('public/apple-touch-icon.png');
await mark(192).toFile('public/icon-192.png');
await mark(512).toFile('public/icon-512.png');
await mark(256).toFile('public/brand/logo-mark.png');
// Social share image: the full logo, cropped to 1200x630
await sharp(logo).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 86 }).toFile('public/og/default.jpg');
console.log('make-brand: favicon.ico, PNG icons, logo mark and og/default.jpg written');
