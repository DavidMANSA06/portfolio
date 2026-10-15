/**
 * robots.txt : les règles pour les robots des moteurs de recherche.
 * Généré au build pour que l'adresse du sitemap suive le domaine (site dans astro.config.mjs).
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('/sitemap.xml', site)}`];
  return new Response(body.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
