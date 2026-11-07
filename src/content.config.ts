import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    primaryKeyword: z.string(),
    author: z.string().nullable().default(null), // named author required before a guide can be published
    datePublished: z.coerce.date(),
    updated: z.coerce.date(),
    draft: z.boolean().default(true),
    relatedMenu: z.array(z.string()).default([]), // menu paths, e.g. /menu/dosa/
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

// Tamil pages: ship only when the owner supplies human-written Tamil.
const ta = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ta' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(170),
    enPath: z.string(), // path of the English twin, e.g. /menu/dosa/
    updated: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides, ta };
