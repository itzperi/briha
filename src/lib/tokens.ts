/**
 * Token substitution for content written by the strategy docs.
 * A sentence/answer containing ANY unresolved token is dropped, so unconfirmed facts can never render.
 */
import { facts } from '../data/brand-facts';
import { miniTiffinPrice, rupees } from '../data/menu';
import { ok, hoursText, parkingSentence, deliveryPlatforms, reservationMethod, fullAddress, dietLabel } from './facts';
import { SITE_URL, SITE_URL_CONFIGURED } from './site';

const map: Record<string, () => string | null> = {
  HOURS_TEXT: hoursText,
  PHONE: () => (ok(facts.phone) ? facts.phone : null),
  WHATSAPP: () => (ok(facts.whatsapp) ? facts.whatsapp : null),
  PRICE_FOR_TWO: () => (ok(facts.costForTwo) ? facts.costForTwo : null),
  PRICE_BAND: () => (ok(facts.priceRange) ? facts.priceRange : null),
  MINI_TIFFIN_PRICE: () => (miniTiffinPrice() !== null ? rupees(miniTiffinPrice()) : null),
  PARKING_STATEMENT: parkingSentence,
  DOSA_COUNT: () => (ok(facts.dosaCount) ? facts.dosaCount : null),
  RESERVATION_METHOD: reservationMethod,
  DELIVERY_PLATFORMS: deliveryPlatforms,
  PAYMENTS: () => (ok(facts.payments) ? facts.payments : null),
  OFFER: () => null, // offers are never published unless the owner wires one in
  GBP_URL: () => (ok(facts.socials.gbp) ? facts.socials.gbp : null),
  SWIGGY_URL: () => (ok(facts.delivery.swiggy) ? facts.delivery.swiggy : null),
  ZOMATO_URL: () => (ok(facts.delivery.zomato) ? facts.delivery.zomato : null),
  WEBSITE_URL: () => (SITE_URL_CONFIGURED ? SITE_URL : null),
  ADDRESS: fullAddress,
  PURE_VEG: () => (facts.dietClaim === 'pure-veg' ? 'pure vegetarian' : null),
  DIET: dietLabel,
  JAIN_OPTION: () => (facts.dietaryOptions.jain === true ? 'Jain options are available' : null),
  VEGAN_OPTION: () => (facts.dietaryOptions.vegan === true ? 'Vegan options are available' : null),
  GLUTEN_FREE_OPTION: () => (facts.dietaryOptions.glutenFree === true ? 'Gluten-free options are available' : null),
};

export const TOKEN_RE = /\{([A-Z_]+)\}/g;

/** Returns the resolved text, or null if any token is unknown or unconfirmed. */
export function resolveTokens(text: string): string | null {
  let failed = false;
  const out = text.replace(TOKEN_RE, (_m, name: string) => {
    const fn = map[name];
    const v = fn ? fn() : null;
    if (v === null || v === undefined || v === '') {
      failed = true;
      return '';
    }
    return v;
  });
  return failed ? null : out;
}

export const hasTokens = (text: string) => /\{[A-Z_]+\}/.test(text);
