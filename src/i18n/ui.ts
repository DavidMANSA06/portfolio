/**
 * Traductions de l'interface (textes courts : menu, boutons, titres).
 * Les textes longs (projets, expériences…) vivront dans src/content/.
 *
 * Ajouter un texte : ajoute la même clé dans "fr" ET dans "en".
 * TypeScript signale une erreur si une clé manque dans une langue.
 */
export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

const fr = {
  'site.title': 'Mansa David Gocaley — Cybersécurité & DevSecOps',
  'site.description':
    "Portfolio de Mansa David Gocaley, élève ingénieur en cybersécurité à l'IMT Atlantique : DevSecOps, sécurité applicative et offensive.",
  'hero.pill': 'Élève ingénieur · IMT Atlantique',
  'hero.subtitle': 'Cybersécurité & DevSecOps',
  'hero.status': 'Site en construction : étape 4, structure du projet.',
  'lang.switch': 'English version',
} as const;

const en: Record<keyof typeof fr, string> = {
  'site.title': 'Mansa David Gocaley — Cybersecurity & DevSecOps',
  'site.description':
    'Portfolio of Mansa David Gocaley, cybersecurity engineering student at IMT Atlantique: DevSecOps, application and offensive security.',
  'hero.pill': 'Engineering student · IMT Atlantique',
  'hero.subtitle': 'Cybersecurity & DevSecOps',
  'hero.status': 'Under construction: step 4, project structure.',
  'lang.switch': 'Version française',
};

export const ui = { fr, en } as const;
export type UiKey = keyof typeof fr;

/** Renvoie une fonction t('clé') pour la langue demandée. */
export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key];
}

/** Vérifie qu'une chaîne est une langue du site (utile pour les paramètres d'URL). */
export function isLang(value: string | undefined): value is Lang {
  return value !== undefined && value in languages;
}
