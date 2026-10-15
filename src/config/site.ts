/**
 * Informations générales du site, en un seul endroit.
 * Un lien vide ('') n'est pas affiché : remplis-le quand tu as l'adresse.
 */
export const site = {
  name: 'Mansa David Gocaley',
  initials: 'MG',
  links: {
    github: 'https://github.com/DavidMANSA06',
    linkedin: '', // ex. 'https://www.linkedin.com/in/ton-profil/'
    resume: '', // ex. '/cv-mansa-david-gocaley.pdf' (fichier à placer dans public/)
  },
} as const;

/**
 * Les sections de la page d'accueil, dans l'ordre du menu.
 * id = ancre dans l'URL (#a-propos) ; key = clé de traduction du titre ; icon = icône du menu.
 */
export const sections = [
  { id: 'accueil', key: 'nav.home', icon: 'home' },
  { id: 'a-propos', key: 'nav.about', icon: 'user' },
  { id: 'competences', key: 'nav.skills', icon: 'code' },
  { id: 'experiences', key: 'nav.experience', icon: 'briefcase' },
  { id: 'formations', key: 'nav.education', icon: 'graduation' },
  { id: 'certifications', key: 'nav.certifications', icon: 'award' },
  { id: 'contact', key: 'nav.contact', icon: 'mail' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

/** Numéro affiché d'une section (« 03 ») : sa place dans le menu, Accueil non compté. */
export function sectionNumber(id: SectionId): number {
  return sections.findIndex((s) => s.id === id);
}
