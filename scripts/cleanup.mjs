import fs from 'node:fs';
import path from 'node:path';
import { args } from './_lib.mjs';
const { dist } = args();
const f = path.join(dist, 'facts-report.json');
if (fs.existsSync(f)) fs.rmSync(f);
console.log('cleanup: facts-report.json removed from', dist);
