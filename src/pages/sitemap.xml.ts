/**
 * sitemap.xml : la liste des pages à indexer, pour les moteurs de recherche.
 * Chaque page est déclarée avec ses versions FR et EN (hreflang).
 * Fait maison (quelques lignes) plutôt qu'une dépendance de plus : moins de chaîne d'approvisionnement.
 * Ajouter une page : ajoute son chemin (sans la langue) dans "pages".
 */
import type { APIRoute } from 'astro';
import { languages, localizePath, type Lang } from '../i18n/ui';

const pages = ['', 'projets/'];
const langs = Object.keys(languages) as Lang[];

export const GET: APIRoute = ({ site }) => {
  const url = (lang: Lang, path: string) => new URL(localizePath(lang, path), site).href;

  const entries = pages.flatMap((path) =>
    langs.map((lang) => {
      const alternates = langs
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, path)}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${url(lang, path)}</loc>\n${alternates}\n  </url>`;
    }),
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
  ].join('\n');

  return new Response(xml + '\n', {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
