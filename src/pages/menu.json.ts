import type { APIRoute } from 'astro';
import { confirmedItems, sections } from '../data/menu';
import { facts } from '../data/brand-facts';
import { SITE_URL, BUILD_DATE } from '../lib/site';

export const GET: APIRoute = () => {
  const items = confirmedItems().map((m) => {
    const sec = sections.find((s) => s.id === m.section)!;
    return {
      name: m.nameEn,
      ...(m.price !== null ? { price: m.priceApprox ? m.priceText : m.price, currency: 'INR', priceIsApproximate: Boolean(m.priceApprox) } : {}),
      veg: m.isVeg,
      section: sec.title,
      url: `${SITE_URL}${sec.path ?? '/menu/'}`,
    };
  });
  return new Response(JSON.stringify({ restaurant: facts.name, locality: facts.locality, city: facts.city, lastUpdated: BUILD_DATE, items }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
