/** Seasonal campaign pages. Empty by default: add an entry only when real content and a real offer exist. */
export interface SeasonalPage { slug: string; title: string; description: string; h1: string; body: string[] }
export const seasonal: SeasonalPage[] = [];
