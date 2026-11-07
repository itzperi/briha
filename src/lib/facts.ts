import { facts, type Day, type HoursRule } from '../data/brand-facts';
import { SITE_URL } from './site';

/** True only when a value is a real, confirmed fact. */
export const ok = (v: unknown): boolean => {
  if (v === null || v === undefined) return false;
  if (typeof v === 'string') return v.trim() !== '' && v.trim().toUpperCase() !== 'TODO';
  if (Array.isArray(v)) return v.length > 0;
  return true;
};

const DAYS: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const fullAddress = (): string =>
  [facts.doorNumber, facts.streetAddress, facts.locality, `${facts.city} ${facts.postalCode}`].filter(ok).join(', ');

export const to12h = (hhmm: string): string => {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
};

function dayRange(days: Day[]): string {
  const idx = days.map((d) => DAYS.indexOf(d)).sort((a, b) => a - b);
  if (idx.length === 7) return 'every day';
  const contiguous = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
  if (contiguous && idx.length > 2) return `${DAYS[idx[0]]} to ${DAYS[idx[idx.length - 1]]}`;
  return idx.map((i) => DAYS[i]).join(', ');
}

/** "every day from 7:00 AM to 10:30 PM"  (reads as: Brihadhee is open <this>). Null when hours are unconfirmed. */
export function hoursText(): string | null {
  const h = facts.hours;
  if (!h || h.length === 0) return null;
  return h.map((r) => `${dayRange(r.days)} from ${to12h(r.opens)} to ${to12h(r.closes)}`).join(', and ');
}

export const hoursRules = (): HoursRule[] => facts.hours ?? [];

const digits = (s: string) => s.replace(/[^\d+]/g, '');
export const telHref = (): string | null => (ok(facts.phone) ? `tel:${digits(facts.phone!)}` : null);
export const waHref = (text?: string): string | null =>
  ok(facts.whatsapp)
    ? `https://wa.me/${digits(facts.whatsapp!).replace('+', '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : null;

export const directionsUrl = (): string => {
  if (facts.geo.lat !== null && facts.geo.lng !== null)
    return `https://www.google.com/maps/dir/?api=1&destination=${facts.geo.lat},${facts.geo.lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${facts.name}, ${fullAddress()}`)}`;
};
export const mapEmbedUrl = (): string =>
  `https://www.google.com/maps?q=${encodeURIComponent(`${facts.name}, ${fullAddress()}`)}&output=embed`;

export const parkingSentence = (): string | null =>
  facts.parking === 'yes'
    ? 'Parking is available'
    : facts.parking === 'street-only'
      ? 'Street parking is available nearby'
      : facts.parking === 'no'
        ? 'There is no dedicated parking'
        : null;

export const dietLabel = (): string | null =>
  facts.dietClaim === 'pure-veg' ? 'pure vegetarian' : facts.dietClaim === 'veg-and-non-veg' ? 'vegetarian and non-vegetarian' : null;

export const deliveryPlatforms = (): string | null => {
  const p: string[] = [];
  if (ok(facts.delivery.swiggy)) p.push('Swiggy');
  if (ok(facts.delivery.zomato)) p.push('Zomato');
  return p.length ? p.join(' and ') : null;
};

/** Names of third-party booking pages that have a confirmed link. */
export const bookingPlatforms = (): { name: string; url: string }[] => {
  const out: { name: string; url: string }[] = [];
  if (ok(facts.bookingLinks.google)) out.push({ name: 'Google Maps', url: facts.bookingLinks.google! });
  if (ok(facts.bookingLinks.eazydiner)) out.push({ name: 'EazyDiner', url: facts.bookingLinks.eazydiner! });
  if (ok(facts.bookingLinks.swiggyDineout)) out.push({ name: 'Swiggy Dineout', url: facts.bookingLinks.swiggyDineout! });
  return out;
};

export const reservationMethod = (): string | null => {
  if (facts.reservations !== 'yes') return null;
  const parts: string[] = [];
  const p = bookingPlatforms().map((b) => b.name);
  if (p.length) parts.push(`through ${p.join(' or ')}`);
  if (facts.bookingForm) parts.push('with the booking form on this website');
  if (facts.walkIn) parts.push(parts.length ? 'or by walking in' : 'by walking in');
  return parts.length ? parts.join(', ') : null;
};

export const sameAs = (): string[] =>
  [
    facts.socials.instagram,
    facts.socials.facebook,
    facts.socials.gbp && facts.socials.gbp.includes('/review') ? null : facts.socials.gbp,
    facts.listings.eazydiner,
    facts.listings.zomato,
    facts.listings.swiggy,
    facts.listings.district,
    facts.listings.justdial,
  ].filter((x): x is string => ok(x));

export const hasTamil = false; // flipped by lib/tamil.ts when /ta/ pages exist

/** Self-contained, quotable summary built only from confirmed facts. */
export function answerSummary(): string {
  const diet = dietLabel();
  const parts: string[] = [];
  parts.push(
    `${facts.name} restaurant, ${facts.locality}, is a ${diet ? diet + ' ' : ''}South Indian restaurant at ${fullAddress()}.`,
  );
  const hrs = hoursText();
  if (hrs) parts.push(`It is open ${hrs}.`);
  if (ok(facts.costForTwo)) parts.push(`The average cost for two is ${facts.costForTwo}.`);
  const ps = parkingSentence();
  if (ps) parts.push(`${ps}.`);
  return parts.join(' ');
}

export const siteAbs = (p: string) => SITE_URL + p;
