import base from './faq.json';
import bank from './faq-bank.json';
import approved from './faq-approved.json';
import { resolveTokens } from '../lib/tokens';

export interface Faq { id: string; group: string; q: string; a: string; pages: string[] }
interface RawFaq { id: string; group?: string; q: string; a: string; pages: string[]; onlyIfTrue?: boolean }

/**
 * Sources
 * - faq.json: reviewed entries, always eligible.
 * - faq-bank.json: the 100-question bank from the strategy docs. NOT published until the owner reviews each answer
 *   and adds its id to faq-approved.json (many answers describe menu items and services in more detail than we have confirmed).
 * Every entry is also dropped if any {TOKEN} in it is unresolved.
 */
const eligible = (): RawFaq[] => {
  const ok = new Set(approved as string[]);
  const baseIds = new Set((base as RawFaq[]).map((f) => f.id));
  return [...(base as RawFaq[]), ...(bank as RawFaq[]).filter((f) => ok.has(f.id) && !baseIds.has(f.id))];
};

export function resolvedFaqs(): Faq[] {
  const out: Faq[] = [];
  for (const f of eligible()) {
    const q = resolveTokens(f.q);
    const a = resolveTokens(f.a);
    if (q === null || a === null) continue;
    out.push({ id: f.id, group: f.group ?? 'General', q, a, pages: f.pages });
  }
  return out;
}

export const faqsFor = (path: string, limit?: number): Faq[] => {
  const list = resolvedFaqs().filter((f) => f.pages.includes(path));
  return limit ? list.slice(0, limit) : list;
};
