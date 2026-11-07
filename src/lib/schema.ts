/** JSON-LD builders. Only confirmed facts are emitted; everything else is pruned. */
import { facts } from '../data/brand-facts';
import { confirmedItems, sections, itemsIn, type SectionId } from '../data/menu';
import type { Faq } from '../data/faq';
import { ok, sameAs, fullAddress, hoursRules, bookingPlatforms } from './facts';
import { absUrl, SITE_URL, SITE_URL_CONFIGURED } from './site';
import reviews from '../data/reviews.json';

type J = Record<string, unknown>;

export function prune<T>(v: T): T {
  if (Array.isArray(v)) return v.map(prune).filter((x) => x !== undefined) as unknown as T;
  if (v && typeof v === 'object') {
    const o: J = {};
    for (const [k, val] of Object.entries(v as J)) {
      const p = prune(val);
      const empty =
        p === null || p === undefined || p === '' || p === 'TODO' ||
        (Array.isArray(p) && p.length === 0) ||
        (typeof p === 'object' && !Array.isArray(p) && Object.keys(p as J).length === 0);
      if (!empty) o[k] = p;
    }
    return o as T;
  }
  return v;
}

const VEG = 'https://schema.org/VegetarianDiet';

export function organizationSchema(): J {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absUrl('/#organization'),
    name: facts.name,
    alternateName: facts.alternateNames,
    url: SITE_URL_CONFIGURED ? SITE_URL + '/' : undefined,
    sameAs: sameAs(),
  });
}

export function websiteSchema(): J {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absUrl('/#website'),
    name: facts.name,
    url: SITE_URL_CONFIGURED ? SITE_URL + '/' : undefined,
    inLanguage: 'en-IN',
  });
}

function openingHours() {
  return hoursRules().map((r) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: r.days,
    opens: r.opens,
    closes: r.closes,
  }));
}

export function restaurantSchema(): J {
  const cuisines = ['South Indian', 'Tamil'];
  if (facts.dietClaim === 'pure-veg') cuisines.push('Vegetarian');
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': absUrl('/#restaurant'),
    name: facts.name,
    alternateName: facts.alternateNames,
    url: SITE_URL_CONFIGURED ? SITE_URL + '/' : undefined,
    telephone: ok(facts.phone) ? facts.phone : undefined,
    priceRange: ok(facts.priceRange) ? facts.priceRange : undefined,
    servesCuisine: cuisines,
    suitableForDiet: facts.dietClaim === 'pure-veg' ? VEG : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [facts.doorNumber, facts.streetAddress].filter(ok).join(', '),
      addressLocality: facts.city,
      addressRegion: facts.region,
      postalCode: facts.postalCode,
      addressCountry: facts.country,
    },
    areaServed: facts.locality,
    geo:
      facts.geo.lat !== null && facts.geo.lng !== null
        ? { '@type': 'GeoCoordinates', latitude: facts.geo.lat, longitude: facts.geo.lng }
        : undefined,
    openingHoursSpecification: openingHours(),
    hasMenu: confirmedItems().length ? absUrl('/menu/') : undefined,
    acceptsReservations: facts.reservations === 'yes' ? (bookingPlatforms()[0]?.url ?? absUrl('/book-a-table/')) : facts.reservations === 'no' ? false : undefined,
    sameAs: sameAs(),
    description: `${facts.name} is a ${facts.dietClaim === 'pure-veg' ? 'pure vegetarian ' : ''}South Indian restaurant in ${facts.locality}, ${facts.city} (${fullAddress()}).`,
  });
}

export function breadcrumbSchema(items: { name: string; href: string }[]): J {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absUrl(it.href) })),
  };
}

export function faqSchema(faqs: Faq[]): J | null {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function menuSchema(sectionIds?: SectionId[]): J | null {
  const secs = (sectionIds ? sections.filter((s) => sectionIds.includes(s.id)) : sections)
    .map((s) => ({ s, items: itemsIn(s.id) }))
    .filter((x) => x.items.length);
  if (!secs.length) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${facts.name} menu`,
    inLanguage: 'en-IN',
    hasMenuSection: secs.map(({ s, items }) => ({
      '@type': 'MenuSection',
      name: s.title,
      hasMenuItem: items.map((m) => ({
        '@type': 'MenuItem',
        name: m.nameEn,
        description: m.description,
        suitableForDiet: m.isVeg ? VEG : undefined,
        // Only exact prices go into schema; "approximately" prices stay on the visible page only.
        offers: m.price !== null && !m.priceApprox ? { '@type': 'Offer', price: String(m.price), priceCurrency: 'INR' } : undefined,
      })),
    })),
  });
}

export function articleSchema(a: { title: string; description: string; path: string; author: string | null; published: Date; updated: Date }): J | null {
  if (!a.author) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    author: { '@type': 'Person', name: a.author },
    publisher: { '@type': 'Organization', name: facts.name },
    datePublished: a.published.toISOString().slice(0, 10),
    dateModified: a.updated.toISOString().slice(0, 10),
    mainEntityOfPage: absUrl(a.path),
  });
}

export function videoSchema(v: { name: string; description: string; thumbnailUrl: string; uploadDate: string; contentUrl?: string; embedUrl?: string }): J {
  return prune({ '@context': 'https://schema.org', '@type': 'VideoObject', ...v });
}

interface Review { author: string; rating: number; text: string; date: string; permission: boolean; source: string }
/** AggregateRating + Review only with >= 5 permissioned first-party reviews; rating computed from the file. */
export function reviewSchema(): { aggregate: J; reviews: J[] } | null {
  const usable = (reviews as Review[]).filter((r) => r.permission === true);
  if (usable.length < 5) return null;
  const avg = usable.reduce((s, r) => s + r.rating, 0) / usable.length;
  return {
    aggregate: { '@type': 'AggregateRating', ratingValue: avg.toFixed(1), reviewCount: usable.length, bestRating: 5, worstRating: 1 },
    reviews: usable.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
      datePublished: r.date,
    })),
  };
}
