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

  // Accueil plein écran
  'landing.pill': 'Élève ingénieur · IMT Atlantique',
  'landing.subtitle': 'Cybersécurité & DevSecOps',
  'landing.lead':
    "Je sécurise la chaîne de livraison logicielle, du code à l'infrastructure, avec un intérêt fort pour la sécurité applicative et offensive.",
  'landing.cta.about': 'À propos de moi',
  'landing.cta.projects': 'Mes projets',
  'landing.cta.contact': 'Contactez-moi',
  'landing.scroll': 'Découvrir mon profil',

  // Menu (sidebar) et titres des sections
  'nav.label': 'Navigation principale',
  'nav.home': 'Accueil',
  'nav.about': 'À propos',
  'nav.skills': 'Compétences',
  'nav.experience': 'Expériences',
  'nav.education': 'Formations',
  'nav.certifications': 'Certifications',
  'nav.contact': 'Contact',
  'nav.projects': 'Mes projets',
  'nav.projects.sub': 'Études de cas',
  'menu.open': 'Ouvrir le menu',
  'profile.role': 'Cybersécurité · DevSecOps',
  'social.label': 'Liens',
  'social.resume': 'CV (PDF)',
  'section.wip': 'Section en construction.',

  // Page Projets
  'projects.title': 'Projets',
  'projects.back': "Retour à l'accueil",

  // Outils
  'lang.label': 'Changer de langue',
  'theme.label': 'Thème sombre',
} as const;

const en: Record<keyof typeof fr, string> = {
  'site.title': 'Mansa David Gocaley — Cybersecurity & DevSecOps',
  'site.description':
    'Portfolio of Mansa David Gocaley, cybersecurity engineering student at IMT Atlantique: DevSecOps, application and offensive security.',

  'landing.pill': 'Engineering student · IMT Atlantique',
  'landing.subtitle': 'Cybersecurity & DevSecOps',
  'landing.lead':
    'I secure the software delivery chain, from code to infrastructure, with a strong interest in application and offensive security.',
  'landing.cta.about': 'About me',
  'landing.cta.projects': 'My projects',
  'landing.cta.contact': 'Contact me',
  'landing.scroll': 'Discover my profile',

  'nav.label': 'Main navigation',
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.skills': 'Skills',
  'nav.experience': 'Experience',
  'nav.education': 'Education',
  'nav.certifications': 'Certifications',
  'nav.contact': 'Contact',
  'nav.projects': 'My projects',
  'nav.projects.sub': 'Case studies',
  'menu.open': 'Open menu',
  'profile.role': 'Cybersecurity · DevSecOps',
  'social.label': 'Links',
  'social.resume': 'Resume (PDF)',
  'section.wip': 'Section under construction.',

  'projects.title': 'Projects',
  'projects.back': 'Back to home',

  'lang.label': 'Switch language',
  'theme.label': 'Dark theme',
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

/**
 * Construit une URL dans la bonne langue.
 *   localizePath('fr', 'projets/') → '/fr/projets/'
 */
export function localizePath(lang: Lang, path = ''): string {
  return `/${lang}/${path.replace(/^\//, '')}`;
}

/**
 * Même page, autre langue : '/fr/projets/' → '/en/projets/'.
 * Sert au bouton FR / EN.
 */
export function switchLangPath(pathname: string, to: Lang): string {
  const rest = pathname.replace(/^\/(fr|en)(\/|$)/, '');
  return localizePath(to, rest);
}
