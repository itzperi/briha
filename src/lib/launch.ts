import { facts } from '../data/brand-facts';
import { ok } from './facts';
import { pricedCount, confirmedItems } from '../data/menu';
import { SITE_URL_CONFIGURED, SITE_URL, DRAFT_MODE, IS_FIXTURE } from './site';

/** Launch-critical facts. The production build fails while any of these are unconfirmed. */
export function launchChecks() {
  return {
    phone: ok(facts.phone),
    hours: ok(facts.hours),
    parking: ok(facts.parking),
    priceInfo: ok(facts.priceRange) || ok(facts.costForTwo),
    reservations: ok(facts.reservations),
    googleBusinessProfileLink: ok(facts.socials.gbp),
    dietClaim: ok(facts.dietClaim),
    siteUrl: SITE_URL_CONFIGURED,
    menuConfirmed: pricedCount() >= 5,
  };
}

export function factsReport() {
  return {
    checks: launchChecks(),
    claims: {
      dietClaim: facts.dietClaim,
      parking: ok(facts.parking),
      hours: ok(facts.hours),
      costForTwo: ok(facts.costForTwo),
      dosaCount: ok(facts.dosaCount),
      phone: ok(facts.phone) ? facts.phone : null,
    },
    expected: { street: facts.streetAddress, postalCode: facts.postalCode, name: facts.name, phone: ok(facts.phone) ? facts.phone : null },
    menu: { confirmed: confirmedItems().length, priced: pricedCount() },
    siteUrl: SITE_URL,
    externalLinks: [
      facts.socials.instagram, facts.socials.facebook, facts.socials.gbp,
      facts.listings.eazydiner, facts.listings.zomato, facts.listings.swiggy, facts.listings.district, facts.listings.justdial,
      facts.delivery.swiggy, facts.delivery.zomato, facts.delivery.direct,
    ].filter((u): u is string => ok(u)),
    draftMode: DRAFT_MODE,
    fixture: IS_FIXTURE,
  };
}
