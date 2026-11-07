import { getCollection } from 'astro:content';

/** True when at least one Tamil page file exists (avoids Astro's empty-collection warning). */
export const hasTamilPages = (): boolean => Object.keys(import.meta.glob('/src/content/ta/*.{md,mdx}')).length > 0;

/** Map of English path -> Tamil path for published Tamil twins. */
export async function tamilTwins(): Promise<Record<string, string>> {
  if (!hasTamilPages()) return {};
  const entries = await getCollection('ta', (e) => !e.data.draft);
  const map: Record<string, string> = {};
  for (const e of entries) map[e.data.enPath] = `/ta/${e.id.replace(/\.(md|mdx)$/, '')}/`;
  return map;
}
