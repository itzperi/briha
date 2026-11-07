/**
 * SINGLE SOURCE OF TRUTH for every fact about the restaurant.
 *
 * Rules
 * - `null` (or the string "TODO") means "not confirmed". Components must omit any sentence that needs it.
 * - Never guess. Listings disagree today on hours, cost for two, veg tag and parking.
 * - `npm run check:facts` fails the production build while launch-critical facts are unconfirmed.
 */
import { sample } from '../../tests/fixtures/brand-facts.sample';

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export interface HoursRule { days: Day[]; opens: string; closes: string } // 24h "HH:MM"
export type Text = string | null;

export interface Facts {
  name: string;
  alternateNames: string[];
  legalName: Text;
  doorNumber: Text;
  streetAddress: string;
  locality: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  landmarks: string[];
  geo: { lat: number | null; lng: number | null };
  phone: Text;
  whatsapp: Text;
  email: Text;
  hours: HoursRule[] | null;
  dietClaim: 'pure-veg' | 'veg-and-non-veg' | null;
  parking: 'yes' | 'no' | 'street-only' | null;
  costForTwo: Text; // e.g. "₹300"
  priceRange: Text; // e.g. "₹₹"
  dosaCount: Text; // e.g. "120+"  (count the real menu first)
  payments: Text;
  reservations: 'yes' | 'no' | null;
  /** How guests book: third-party booking pages (names as shown to guests), plus walk-in. Site form only if bookingForm is true. */
  bookingLinks: { google: Text; eazydiner: Text; swiggyDineout: Text };
  bookingForm: boolean; // true only if the website booking form should be offered (needs a form endpoint key in .env)
  walkIn: boolean;
  groupDiningConfirmed: boolean; // group sizes / advance-order process confirmed by the owner
  delivery: { swiggy: Text; zomato: Text; direct: Text };
  socials: { instagram: Text; facebook: Text; gbp: Text }; // gbp = the Google "write a review" / profile link
  listings: { eazydiner: Text; zomato: Text; swiggy: Text; district: Text; justdial: Text };
  fssai: Text;
  signature: string[]; // owner-stated positioning only
  serviceAreas: string[]; // only areas genuinely served; each needs unique written content
  dietaryOptions: { jain: boolean | null; vegan: boolean | null; glutenFree: boolean | null };
}

const real: Facts = {
  name: 'Brihadhee',
  alternateNames: ['Brihadhee Restaurant', 'Brihadhee Anna Nagar', 'Brihadhi', 'Brihadee', 'Bruhadhee', 'Brahadhee'],
  legalName: null,
  // Given by the owner in chat, 7 Nov 2026
  doorNumber: 'New No. W-41 (Old No. W-124)',
  streetAddress: 'W Block Main Road, 3rd Avenue',
  locality: 'Anna Nagar',
  city: 'Chennai',
  region: 'Tamil Nadu',
  postalCode: '600040',
  country: 'IN',
  landmarks: ['Anna Nagar Tower', 'Anna Nagar Tower Park', 'Anna Nagar Roundtana', 'Anna Nagar East metro', 'VR Chennai'],
  geo: { lat: null, lng: null },
  // Confirmed by the owner in chat on 7 Nov 2026
  phone: '+91 94442 24999',
  whatsapp: null, // not decided
  email: null,
  hours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '06:30', closes: '23:00' }],
  dietClaim: 'pure-veg', // owner confirmed in chat (7 Nov 2026): pure vegetarian only. The EazyDiner listing says veg + non-veg: have it corrected. FSSAI veg proof still to be provided.
  parking: 'street-only', // roadside parking, no dedicated parking facility
  costForTwo: 'about ₹200 to ₹250', // owner's approximate figure
  priceRange: '₹',
  dosaCount: null, // owner earlier claimed 500+; not confirmed. Publish only after counting the real menu
  payments: null,
  reservations: 'yes',
  // Google "Reserve a table" link supplied by the owner (tracking parameters removed). EazyDiner is the public listing page.
  bookingLinks: {
    google: 'https://www.google.com/maps/reserve/v/dine/c/6jPKt-pRPoA?source=pa&hl=en-IN',
    eazydiner: 'https://www.eazydiner.com/chennai/brihadhee-anna-nagar-east-chennai-703877',
    swiggyDineout: null,
  },
  bookingForm: false, // guests book through the platforms or walk in; no booking form on this site
  walkIn: true,
  groupDiningConfirmed: false,
  delivery: { swiggy: null, zomato: null, direct: null },
  socials: { instagram: 'https://www.instagram.com/brihadhee', facebook: null, gbp: null },
  listings: {
    eazydiner: 'https://www.eazydiner.com/chennai/brihadhee-anna-nagar-east-chennai-703877',
    zomato: null,
    swiggy: null,
    district: null,
    justdial: null,
  },
  fssai: null,
  signature: [
    'Dosa varieties, including customised dosa',
    'Mini tiffin',
    'Nellai (Tirunelveli-style) meals',
    'Tamil home-style cooking',
    'Filter coffee',
  ],
  serviceAreas: [],
  dietaryOptions: { jain: null, vegan: null, glutenFree: null },
};

export const facts: Facts = process.env.FACTS_FIXTURE === '1' ? sample : real;
