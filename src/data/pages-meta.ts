import type { SectionId, Period } from './menu';

export interface PageMeta {
  kind: 'section' | 'period';
  key: SectionId | Period;
  page: string; // slug under /menu/
  seoTitle: string; // <= 60 chars
  metaDesc: string; // <= 160 chars
  h1: string;
  intro: string; // general-knowledge, token-free
  guide?: string;
}

const base = 'W Block Main Road, 3rd Avenue, Anna Nagar, Chennai';

export const menuPages: PageMeta[] = [
  { kind: 'section', key: 'tiffin', page: 'tiffin', seoTitle: 'South Indian Tiffin in Anna Nagar | Brihadhee', metaDesc: `Idly, mini idly and other South Indian tiffin at Brihadhee, ${base}. See the menu and prices.`, h1: 'South Indian tiffin in Anna Nagar', intro: 'Tiffin means the lighter South Indian meals eaten at breakfast or in the evening, such as idly and dosa.' },
  { kind: 'section', key: 'mini-tiffin', page: 'mini-tiffin', seoTitle: 'Mini Tiffin in Anna Nagar | Brihadhee, Chennai', metaDesc: `Mini tiffin at Brihadhee, ${base}: a small-portion plate to taste several South Indian tiffin items in one order.`, h1: 'Mini tiffin in Anna Nagar', intro: 'A mini tiffin is a small-portion plate that lets you taste several tiffin items in a single order.', guide: 'what-is-mini-tiffin' },
  { kind: 'section', key: 'nellai-meals', page: 'nellai-meals', seoTitle: 'Nellai Meals in Anna Nagar, Chennai | Brihadhee', metaDesc: `Tirunelveli-style (Nellai) vegetarian meals at Brihadhee, ${base}. See what is on the plate and how to order.`, h1: 'Nellai meals in Anna Nagar, Chennai', intro: 'Nellai is the everyday name for Tirunelveli. Nellai-style meals follow the home-cooking style of that part of southern Tamil Nadu.', guide: 'nellai-meals-explained' },
  { kind: 'section', key: 'parotta-kothu', page: 'parotta-kothu', seoTitle: 'Parotta, Idiyappam and Kothu in Anna Nagar | Brihadhee', metaDesc: 'Parotta, idiyappam and kothu dishes at Brihadhee in Anna Nagar, Chennai. See what is on the menu today and how to order.', h1: 'Parotta, idiyappam and kothu in Anna Nagar', intro: 'Layered parotta, string hoppers (idiyappam) and chopped, spiced kothu preparations are popular Tamil dinner and tiffin dishes.', guide: 'paanai-parotta' },
  { kind: 'section', key: 'filter-coffee', page: 'filter-coffee', seoTitle: 'Filter Coffee in Anna Nagar | Brihadhee', metaDesc: `South Indian filter coffee at Brihadhee, ${base}. Pair it with tiffin, dosa or a full meal.`, h1: 'Filter coffee in Anna Nagar', intro: 'South Indian filter coffee is brewed by dripping hot water through ground coffee in a metal filter, then mixed with hot milk and sugar.' },
  { kind: 'period', key: 'breakfast', page: 'breakfast', seoTitle: 'South Indian Breakfast in Anna Nagar | Brihadhee', metaDesc: 'South Indian breakfast at Brihadhee, Anna Nagar: tiffin, dosa and filter coffee. See what is served at breakfast time and how to order.', h1: 'South Indian breakfast in Anna Nagar', intro: 'A typical South Indian breakfast is built around idli, dosa, vada, pongal and filter coffee.' },
  { kind: 'period', key: 'lunch', page: 'lunch-meals', seoTitle: 'Veg Meals in Anna Nagar | Brihadhee Lunch Menu', metaDesc: `Vegetarian lunch and meals at Brihadhee, ${base}. See what is served at lunch time and how to order.`, h1: 'Veg lunch and meals in Anna Nagar', intro: 'A South Indian meal is usually served with rice, sambar, rasam, curries, curd and a sweet.' },
  { kind: 'period', key: 'dinner', page: 'dinner', seoTitle: 'Dinner in Anna Nagar | Brihadhee Veg Menu', metaDesc: 'Dinner at Brihadhee, Anna Nagar: dosa, parotta, idiyappam and more. See what is served in the evening and how to order.', h1: 'Veg dinner in Anna Nagar', intro: 'Dinner in Tamil Nadu often means dosa, idli, parotta, idiyappam or a light meal.' },
];
