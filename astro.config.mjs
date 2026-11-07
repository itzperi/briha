import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = { ...loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), ''), ...process.env };
const site = (env.PUBLIC_SITE_URL || 'https://brihadhee.example').replace(/\/$/, '');

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    mdx(),
    sitemap({
      // Static exclusions. Draft / noindex pages are pruned afterwards by scripts/postbuild-sitemap.mjs,
      // which reads the rendered HTML (the source of truth) and adds lastmod from each page's frontmatter.
      filter: (page) => !/\/(thank-you|404)\/?$/.test(page),
      i18n: { defaultLocale: 'en', locales: { en: 'en-IN', ta: 'ta-IN' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
