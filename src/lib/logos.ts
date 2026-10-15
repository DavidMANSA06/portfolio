/**
 * Logos de marque (paquet simple-icons, auto-hébergé : aucun appel à un CDN).
 * Le nom d'un logo est son « slug » sur https://simpleicons.org (ex. "python", "gnubash").
 * Les logos sont lus au build et écrits en SVG dans la page : zéro image, zéro JavaScript.
 */
import * as icons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const bySlug = new Map<string, SimpleIcon>(
  Object.values(icons)
    .filter((icon): icon is SimpleIcon => typeof icon === 'object' && 'slug' in icon)
    .map((icon) => [icon.slug, icon]),
);

/** true si le logo existe (utilisé par le schéma de contenu pour refuser une faute de frappe). */
export function hasLogo(slug: string): boolean {
  return bySlug.has(slug);
}

export function getLogo(slug: string): SimpleIcon | undefined {
  return bySlug.get(slug);
}

/**
 * true si la couleur de marque est trop sombre pour un fond noir (OWASP, Symfony, Java…).
 * En thème sombre, ces logos prennent alors la couleur du texte (voir SkillLogo.astro).
 */
export function isDarkColor(hex: string): boolean {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b! < 0.05;
}
