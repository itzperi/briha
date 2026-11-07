/**
 * Menu data, taken from the restaurant's own table menu card (PDF supplied by the owner, 7 Nov 2026).
 * Prices are in rupees, EXCLUDING 5% GST; parcel charges are extra (see `menuNotes`).
 * Items are excluded from all public output unless `confirmedOnCurrentMenu` is true.
 * Never invent prices or dishes: update this file from the printed menu when it changes.
 */
import { IS_FIXTURE } from '../lib/site';

export type SectionId =
  | 'dosa' | 'tiffin' | 'mini-tiffin' | 'nellai-meals' | 'combos' | 'parotta-kothu' | 'starters'
  | 'rice' | 'breads' | 'gravies' | 'filter-coffee' | 'beverages' | 'signature-drinks';
export type Period = 'breakfast' | 'lunch' | 'dinner';

export interface MenuItem {
  id: string;
  section: SectionId;
  nameEn: string;
  nameTa?: string; // only real, owner-supplied Tamil
  description: string; // may be empty: we only describe what is on the card or is a plain definition
  price: number | null;
  priceText?: string; // when the price is approximate or a range
  priceApprox?: boolean;
  isVeg: boolean;
  tags: string[];
  hasPage: boolean;
  slug?: string;
  imageAlt?: string;
  periods: Period[];
  confirmedOnCurrentMenu: boolean;
  longDescription?: string;
}

export interface SectionDef {
  id: SectionId;
  title: string;
  path: string | null; // null = shown on the menu hub only
  intro: string;
  guide?: string;
}

export const menuNotes = [
  'Prices are in rupees and exclude 5% GST. Parcel charges are extra.',
  'Preparation may take up to 10 minutes.',
];

export const sections: SectionDef[] = [
  { id: 'starters', title: 'Starters', path: null, intro: 'Small plates to start or share.' },
  { id: 'nellai-meals', title: 'Lunch and Nellai meals', path: '/menu/nellai-meals/', guide: 'nellai-meals-explained', intro: 'Nellai is the everyday name for Tirunelveli. Nellai-style meals follow the home-cooking style of that part of southern Tamil Nadu.' },
  { id: 'combos', title: 'Dine-in combos (lunch only)', path: null, intro: 'Combos available only at lunch.' },
  { id: 'dosa', title: 'Dosa variety', path: '/menu/dosa/', guide: 'types-of-dosa', intro: 'Dosa is a thin, crisp or soft crepe made from fermented rice and urad dal batter, served with chutney and sambar.' },
  { id: 'mini-tiffin', title: 'Mini tiffin', path: '/menu/mini-tiffin/', guide: 'what-is-mini-tiffin', intro: 'A mini tiffin is a small-portion plate that lets you taste several tiffin items in a single order.' },
  { id: 'tiffin', title: 'Idly and mini idly', path: '/menu/tiffin/', intro: 'Idly is a soft steamed cake of fermented rice and urad dal, served with sambar and chutney.' },
  { id: 'parotta-kothu', title: 'Idiyappam, parotta and chapathi', path: '/menu/parotta-kothu/', guide: 'paanai-parotta', intro: 'String hoppers (idiyappam), layered parotta and chapathi, and chopped, spiced kothu preparations are popular Tamil dinner and tiffin dishes.' },
  { id: 'rice', title: 'Rice', path: null, intro: 'Fried rice dishes.' },
  { id: 'breads', title: 'Indian breads', path: null, intro: 'Naan, roti and phulka.' },
  { id: 'gravies', title: 'Indian gravies', path: null, intro: 'Gravies to have with breads, parotta or rice.' },
  { id: 'filter-coffee', title: 'Filter coffee', path: '/menu/filter-coffee/', intro: 'South Indian filter coffee is brewed by dripping hot water through ground coffee in a metal filter, then mixed with hot milk and sugar.' },
  { id: 'beverages', title: 'Beverages', path: null, intro: 'Hot and cold drinks.' },
  { id: 'signature-drinks', title: 'Brihadhee signatures (drinks)', path: null, intro: 'Shakes, smoothies and coffee drinks.' },
];

const it = (
  id: string, section: SectionId, nameEn: string, price: number, extra: Partial<MenuItem> = {},
): MenuItem => ({
  id, section, nameEn, description: '', price, isVeg: true, tags: [], hasPage: false,
  periods: [], confirmedOnCurrentMenu: true, ...extra,
});
const lunch: Partial<MenuItem> = { periods: ['lunch'] };

const raw: MenuItem[] = [
  // Starters
  it('veg-65-gobi', 'starters', 'Madras style veg 65 (gobi)', 230),
  it('veg-65-paneer', 'starters', 'Madras style veg 65 (paneer)', 260),
  it('manchurian-gobi', 'starters', 'Indo Chinese dry manchurian (gobi)', 270),
  it('manchurian-paneer', 'starters', 'Indo Chinese dry manchurian (paneer)', 290),
  it('karaikudi-paneer-poppers', 'starters', 'Karaikudi paneer poppers', 280),
  it('madras-bhel-parotta', 'starters', 'Madras bhel parotta', 245),
  it('poricha-salna-idly', 'starters', 'Poricha salna idly', 255),
  it('gun-powder-idly', 'starters', 'Gun powder idly', 245),
  it('kanthari-nei-varuval-paneer', 'starters', 'Kanthari nei varuval (paneer)', 290),
  it('kanthari-nei-varuval-kalaan', 'starters', 'Kanthari nei varuval (kalaan)', 280, { description: 'Kalaan is the Tamil word for mushroom.' }),
  it('kongu-nei-varuval-paneer', 'starters', 'Kongu nei varuval (paneer)', 290),
  it('kongu-nei-varuval-kalaan', 'starters', 'Kongu nei varuval (kalaan)', 280, { description: 'Kalaan is the Tamil word for mushroom.' }),

  // Lunch
  it('limited-tn-meals', 'nellai-meals', 'Limited TN meals', 150, lunch),
  it('executive-tn-meals', 'nellai-meals', 'Executive TN meals (unlimited)', 205, lunch),
  it('nellai-spl-sodhi-meals', 'nellai-meals', 'Nellai special sodhi meals', 240, lunch),
  it('karuppatti-ulundhu-kali', 'nellai-meals', 'Karuppatti ulundhu kali', 100, { ...lunch, description: 'A traditional Tamil preparation of urad dal cooked with palm jaggery (karuppatti).' }),

  // Dine-in combos (lunch only)
  it('combo-fried-rice-gobi', 'combos', 'Veg fried rice + gobi manchurian combo', 199, lunch),
  it('combo-naan-pbm', 'combos', 'Naan (1 pc) + paneer butter masala combo', 199, lunch),
  it('combo-phulka-dal-tadka', 'combos', 'Phulka (3 pc) + dal tadka combo', 129, lunch),
  it('combo-phulka-pbm', 'combos', 'Phulka (3 pc) + paneer butter masala combo', 179, lunch),
  it('combo-kothu-parotta-lemon-idiyappam', 'combos', 'Kothu parotta + lemon kothu idiyappam combo', 179, lunch),

  // Dosa variety
  it('kal-dosa', 'dosa', 'Kal dosa (2 pcs)', 100, { hasPage: false }),
  it('plain-dosa', 'dosa', 'Plain dosa', 105),
  it('ghee-roast-dosa', 'dosa', 'Ghee roast', 155, { hasPage: true, slug: 'ghee-roast-dosa' }),
  it('ghee-podi-dosa', 'dosa', 'Ghee podi dosa', 165, { hasPage: true, slug: 'ghee-podi-dosa' }),
  it('rava-dosa', 'dosa', 'Rava dosa', 130),
  it('ghee-masala-dosa', 'dosa', 'Ghee masala dosa', 175, { hasPage: true, slug: 'ghee-masala-dosa' }),
  it('madurai-malli-dosa', 'dosa', 'Madurai malli dosa', 165),
  it('onion-podi-uthappam', 'dosa', 'Onion podi uthappam', 175),

  // Mini tiffin: price given by the owner in chat (7 Nov 2026). It is not on the printed table menu: confirm.
  it('mini-tiffin', 'mini-tiffin', 'Mini tiffin', 80),

  // Idly and mini idly
  it('idly-2', 'tiffin', 'Idly (2 pcs)', 50),
  it('tossed-podi-idly', 'tiffin', 'Tossed podi idly (garlic, curry leaves or peanut)', 175),
  it('idly-upma', 'tiffin', 'Idly upma', 135),
  it('ghee-sambar-idly', 'tiffin', 'Ghee sambar idly (2 pcs)', 105),
  it('ghee-mini-sambar-idly', 'tiffin', 'Ghee mini sambar idly (14 pcs)', 115),
  it('tomato-kothu-idly', 'tiffin', 'Tomato kothu idly', 170),
  it('tawa-thokku-podi-idly', 'tiffin', 'Tawa thokku podi idly', 155),
  it('sodhi-idly', 'tiffin', 'Sodhi idly', 180, { description: 'Idly served with sodhi, a mild coconut-milk gravy from Tirunelveli cooking.' }),

  // Idiyappam, parotta and chapathi
  it('idiyappam-coconut-milk', 'parotta-kothu', 'Idiyappam with coconut milk', 90),
  it('lemon-kothu-idiyappam', 'parotta-kothu', 'Lemon kothu idiyappam', 160),
  it('kothu-idiyappam', 'parotta-kothu', 'Kothu idiyappam (paneer or mushroom)', 220),
  it('tomato-kothu-idiyappam', 'parotta-kothu', 'Tomato kothu idiyappam', 170),
  it('idiyappam-sodhi', 'parotta-kothu', 'Idiyappam sodhi', 180),
  it('chapathi-salna', 'parotta-kothu', 'Chapathi salna (2 pcs)', 105),
  it('parotta-salna', 'parotta-kothu', 'Parotta salna (2 pcs)', 120),
  it('spl-kothu-parotta', 'parotta-kothu', 'Special kothu parotta', 195),
  it('pannai-parotta', 'parotta-kothu', 'Pannai parotta (also spelled paanai parotta)', 270),
  it('madurai-salna-parotta', 'parotta-kothu', 'Madurai salna parotta', 210),
  it('chilli-parotta', 'parotta-kothu', 'Chilli parotta', 230),
  it('spl-kothu-chapathi', 'parotta-kothu', 'Special kothu chapathi', 195),
  it('spl-pottalam-parotta', 'parotta-kothu', 'Special pottalam parotta', 230),

  // Rice
  it('paneer-fried-rice', 'rice', 'Paneer fried rice', 245),
  it('mushroom-fried-rice', 'rice', 'Mushroom fried rice', 245),
  it('paneer-schezwan-fried-rice', 'rice', 'Paneer Schezwan fried rice', 275),
  it('mushroom-schezwan-fried-rice', 'rice', 'Mushroom Schezwan fried rice', 275),

  // Indian breads
  it('naan-plain', 'breads', 'Naan (plain)', 70),
  it('naan-butter', 'breads', 'Naan (butter)', 90),
  it('naan-garlic', 'breads', 'Naan (garlic)', 100),
  it('roti-plain', 'breads', 'Roti (plain)', 60),
  it('roti-butter', 'breads', 'Roti (butter)', 80),
  it('roti-garlic', 'breads', 'Roti (garlic)', 90),
  it('phulka-plain', 'breads', 'Phulka (plain)', 45),
  it('phulka-ghee', 'breads', 'Phulka (ghee)', 55),

  // Indian gravies
  it('aloo-gobi-masala', 'gravies', 'Aloo gobi masala', 295),
  it('nilgiris-dum-aloo', 'gravies', 'Nilgiris dum aloo', 295),
  it('paneer-butter-masala', 'gravies', 'Paneer butter masala', 315),
  it('kaalan-chukka-gravy', 'gravies', 'Kaalan chukka gravy', 315),
  it('chettinadu-paneer-gravy', 'gravies', 'Chettinadu paneer gravy', 315),

  // Beverages
  it('filter-coffee', 'filter-coffee', 'Filter coffee', 45),
  it('tea', 'beverages', 'Tea', 45),
  it('lemon-tea', 'beverages', 'Lemon tea', 35),
  it('plain-milk', 'beverages', 'Plain milk', 40),
  it('black-coffee', 'beverages', 'Black coffee', 35),

  // Brihadhee signatures (drinks)
  it('butter-biscuit-smoothie', 'signature-drinks', 'Butter biscuit smoothie', 215),
  it('summer-in-tenkasi', 'signature-drinks', 'Summer in Tenkasi', 195),
  it('salem-mango-milkshake', 'signature-drinks', 'Salem mango milkshake', 195),
  it('meltdown-in-madras', 'signature-drinks', 'Meltdown in Madras', 135),
  it('filter-kaapi-shake', 'signature-drinks', 'The filter kaapi shake', 165),
  it('kaapi-affogato', 'signature-drinks', 'Kaapi affogato', 105),
  it('salted-caramel-iced-latte', 'signature-drinks', 'Salted caramel iced latte', 145),
  it('salted-caramel-filter-macchiato', 'signature-drinks', 'Salted caramel filter macchiato', 95),
];

// Fixture mode (tests only): add sample long descriptions so dish pages are exercised.
export const menu: MenuItem[] = IS_FIXTURE
  ? raw.map((m) => ({ ...m, longDescription: m.hasPage ? `Sample text for tests only. ${m.nameEn}. `.repeat(12).trim() : undefined }))
  : raw;

export const confirmedItems = (): MenuItem[] => menu.filter((m) => m.confirmedOnCurrentMenu);
export const itemsIn = (section: SectionId): MenuItem[] => confirmedItems().filter((m) => m.section === section);
export const itemsInPeriod = (p: Period): MenuItem[] => confirmedItems().filter((m) => m.periods.includes(p));
export const pricedCount = (): number => confirmedItems().filter((m) => m.price !== null || Boolean(m.priceText)).length;
export const priceLabel = (m: MenuItem): string => (m.priceText ? m.priceText : m.price !== null ? `₹${m.price}` : '');
export const sectionLive = (id: SectionId): boolean => itemsIn(id).length > 0;
export const pathLive = (path: string): boolean => {
  const s = sections.find((x) => x.path === path);
  return s ? sectionLive(s.id) : true;
};
export const dishPages = (): MenuItem[] => confirmedItems().filter((m) => m.hasPage && m.slug && m.longDescription);
export const miniTiffinPrice = (): number | null => menu.find((m) => m.id === 'mini-tiffin' && m.confirmedOnCurrentMenu)?.price ?? null;
export const rupees = (n: number | null): string => (n === null ? '' : `₹${n}`);
