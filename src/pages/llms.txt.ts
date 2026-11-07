import type { APIRoute } from 'astro';
import { facts } from '../data/brand-facts';
import { answerSummary, ok } from '../lib/facts';
import { SITE_URL } from '../lib/site';
import { sectionLive, sections, confirmedItems } from '../data/menu';
import { menuPages } from '../data/pages-meta';

export const GET: APIRoute = () => {
  const L: string[] = [];
  L.push(`# ${facts.name}`, '', `> ${answerSummary()}`, '');
  L.push('## Key pages');
  L.push(`- [Home](${SITE_URL}/): overview and quick facts`);
  if (confirmedItems().length) L.push(`- [Menu](${SITE_URL}/menu/): dishes${confirmedItems().some((m) => m.price !== null || m.priceText) ? ' and prices' : ''}`);
  for (const s of sections) if (s.path && sectionLive(s.id)) L.push(`- [${s.title}](${SITE_URL}${s.path})`);
  for (const m of menuPages) if (m.kind === 'period' && confirmedItems().some((i) => i.periods.includes(m.key as any))) L.push(`- [${m.h1}](${SITE_URL}/menu/${m.page}/)`);
  L.push(`- [Location and directions](${SITE_URL}/location/anna-nagar/)`);
  if (facts.reservations === 'yes') L.push(`- [Book a table](${SITE_URL}/book-a-table/)`);
  L.push(`- [Order](${SITE_URL}/order/)`, `- [FAQ](${SITE_URL}/faq/)`, `- [Contact](${SITE_URL}/contact/)`, '');
  if (ok(facts.phone) || ok(facts.socials.instagram)) {
    L.push('## Contact');
    if (ok(facts.phone)) L.push(`- Phone: ${facts.phone}`);
    if (ok(facts.socials.instagram)) L.push(`- Instagram: ${facts.socials.instagram}`);
    L.push('');
  }
  L.push('## Not to be confused with');
  L.push('- Brihadeeswarar Temple, Thanjavur, and baby-name pages for "Brihadeesh". This is a restaurant in Anna Nagar, Chennai.', '');
  return new Response(L.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
