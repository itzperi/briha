import type { APIRoute } from 'astro';
import { factsReport } from '../lib/launch';

// Read by scripts/check-facts.mjs, then deleted from dist by scripts/cleanup.mjs. Never deployed.
export const GET: APIRoute = () => new Response(JSON.stringify(factsReport(), null, 2), { headers: { 'Content-Type': 'application/json' } });
