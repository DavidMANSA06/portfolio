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

  // Sections : titres et phrases d'introduction
  'about.title': 'À propos',
  'about.photo': 'Photo de Mansa David Gocaley',
  'band.eyebrow': 'Projets',
  'band.title': "Ce que j'ai construit.",
  'band.lead': 'Études de cas : DevSecOps, réseaux, sécurité offensive et IoT.',
  'contact.title': 'Contactez-moi.',
  'contact.lead':
    "Une question, un projet ou simplement l'envie d'échanger sur la cybersécurité ? Écrivez-moi.",
  'contact.copy': 'Copier',
  'contact.copied': 'Copié ✓',
  'contact.copyLabel': "Copier l'adresse email",
  'skills.title': 'Ma boîte à outils.',
  'skills.lead': 'Les technologies et outils que je pratique, avec mon niveau estimé pour chacun.',
  'skills.level': 'Niveau',
  'platforms.title': "Plateformes d'entraînement",
  'experience.title': 'Expériences professionnelles.',
  'experience.lead': "Du développement logiciel à l'automatisation d'infrastructures réseau.",
  'education.title': 'Formations.',
  'education.lead': "D'Abidjan à Rennes : un double cursus en sécurité informatique.",
  'education.more': 'Voir le détail',
  'education.close': 'Fermer',
  'education.highlights': 'Points forts',
  'education.courses': 'Matières clés',
  'education.website': 'Site de la formation',
  'certifications.title': 'Certifications.',
  'certifications.lead':
    'Les certifications obtenues et en préparation, avec un lien pour les vérifier.',
  'certifications.empty': 'Mes premières certifications arrivent bientôt.',
  'cert.status.obtenue': 'Obtenue',
  'cert.status.en-preparation': 'En préparation',
  'cert.planned': 'Prévue :',
  'cert.verify': 'Vérifier',
  'type.stage': 'Stage',
  'type.alternance': 'Alternance',
  'type.cdd': 'CDD',
  'type.cdi': 'CDI',
  'type.freelance': 'Freelance',
  'type.benevolat': 'Bénévolat',
  'link.newTab': '(nouvel onglet)',

  // Page Projets
  'projects.title': 'Projets',
  'projects.back': "Retour à l'accueil",
  'projects.lead':
    "Chaque projet est présenté comme une petite étude de cas : le contexte, ce que j'ai fait, et le résultat.",
  'projects.filters': 'Filtrer les projets',
  'projects.all': 'Tous',
  'projects.cat.devsecops': 'DevSecOps',
  'projects.cat.reseau': 'Réseaux',
  'projects.cat.offensive': 'Sécurité offensive',
  'projects.cat.iot': 'IoT',
  'projects.context': 'Contexte',
  'projects.done': "Ce que j'ai fait",
  'projects.result': 'Résultat',
  'projects.status.termine': 'Terminé',
  'projects.status.en-cours': 'En cours',
  'projects.tags': 'Technologies',
  'projects.empty': 'Mes premiers projets arrivent bientôt.',

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

  'about.title': 'About me',
  'about.photo': 'Photo of Mansa David Gocaley',
  'band.eyebrow': 'Projects',
  'band.title': "What I've built.",
  'band.lead': 'Case studies: DevSecOps, networking, offensive security and IoT.',
  'contact.title': 'Get in touch.',
  'contact.lead': 'A question, a project, or just want to talk cybersecurity? Drop me a line.',
  'contact.copy': 'Copy',
  'contact.copied': 'Copied ✓',
  'contact.copyLabel': 'Copy email address',
  'skills.title': 'My toolbox.',
  'skills.lead': 'The technologies and tools I use, with my estimated level for each.',
  'skills.level': 'Level',
  'platforms.title': 'Training platforms',
  'experience.title': 'Work experience.',
  'experience.lead': 'From software development to network infrastructure automation.',
  'education.title': 'Education.',
  'education.lead': 'From Abidjan to Rennes: a dual background in computer security.',
  'education.more': 'See details',
  'education.close': 'Close',
  'education.highlights': 'Highlights',
  'education.courses': 'Key courses',
  'education.website': 'Programme website',
  'certifications.title': 'Certifications.',
  'certifications.lead': 'Certifications earned and in progress, with a link to verify them.',
  'certifications.empty': 'My first certifications are coming soon.',
  'cert.status.obtenue': 'Earned',
  'cert.status.en-preparation': 'In progress',
  'cert.planned': 'Planned:',
  'cert.verify': 'Verify',
  'type.stage': 'Internship',
  'type.alternance': 'Work-study',
  'type.cdd': 'Fixed-term',
  'type.cdi': 'Permanent',
  'type.freelance': 'Freelance',
  'type.benevolat': 'Volunteer',
  'link.newTab': '(new tab)',

  'projects.title': 'Projects',
  'projects.back': 'Back to home',
  'projects.lead':
    'Each project is presented as a short case study: the context, what I did, and the outcome.',
  'projects.filters': 'Filter projects',
  'projects.all': 'All',
  'projects.cat.devsecops': 'DevSecOps',
  'projects.cat.reseau': 'Networking',
  'projects.cat.offensive': 'Offensive security',
  'projects.cat.iot': 'IoT',
  'projects.context': 'Context',
  'projects.done': 'What I did',
  'projects.result': 'Outcome',
  'projects.status.termine': 'Completed',
  'projects.status.en-cours': 'In progress',
  'projects.tags': 'Technologies',
  'projects.empty': 'My first projects are coming soon.',

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
