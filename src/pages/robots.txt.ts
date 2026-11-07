import type { APIRoute } from 'astro';
import { SITE_URL, DRAFT_MODE, IS_FIXTURE } from '../lib/site';

const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'Google-Extended', 'Googlebot', 'Bingbot'];

export const GET: APIRoute = () => {
  if (DRAFT_MODE || IS_FIXTURE) {
    return new Response('# Draft/test build: do not index\nUser-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const lines = ['User-agent: *', 'Allow: /', 'Disallow: /thank-you/', ''];
  for (const bot of AI_BOTS) lines.push(`User-agent: ${bot}`, 'Allow: /', '');
  lines.push(`Sitemap: ${SITE_URL}/sitemap-index.xml`, '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
