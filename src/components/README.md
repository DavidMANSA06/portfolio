# Composants

Les morceaux d'interface réutilisables. Chaque composant a ses styles dans son propre fichier.

| Composant                  | Rôle                                                                       |
| -------------------------- | -------------------------------------------------------------------------- |
| `Landing.astro`            | Accueil plein écran (titre, accroche, boutons)                             |
| `Sidebar.astro`            | Barre latérale : profil, menu des sections, Projets, liens                 |
| `Section.astro`            | Cadre d'une section (numéro, sur-titre, titre, contenu)                    |
| `ExperienceTimeline.astro` | Frise des expériences (lit `src/content/experiences/`)                     |
| `EducationGrid.astro`      | Cartes de formation (lit `src/content/formations/`)                        |
| `CertificationGrid.astro`  | Cartes de certification (lit `src/content/certifications/`)                |
| `SkillGrid.astro`          | Groupes de compétences : logos et étoiles (lit `src/content/competences/`) |
| `PlatformList.astro`       | Plateformes d'entraînement (lit `src/content/plateformes/`)                |
| `SkillLogo.astro`          | Tuile d'un logo `simple-icons` (SVG au build) ou d'initiales               |
| `ReadingProgress.astro`    | Barre de progression de lecture (CSS seul)                                 |
| `Button.astro`             | Lien en forme de bouton (`primary` ou `ghost`)                             |
| `Icon.astro`               | Icônes SVG au trait (ajouter un tracé dans `paths`)                        |
| `ThemeToggle.astro`        | Bouton clair / sombre (mémorisé, animation en cercle)                      |
| `LangSwitch.astro`         | Bouton FR / EN : lien vers la même page dans l'autre langue                |
