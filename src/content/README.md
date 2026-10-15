# Contenu

Les contenus du site, un fichier YAML par entrée, bilingues (`fr` et `en` obligatoires).
Le schéma de chaque collection est dans `src/content.config.ts` : `pnpm build` (et la CI)
échoue avec un message clair si un champ manque ou est mal écrit.

| Dossier           | Section                           | Exemple                            |
| ----------------- | --------------------------------- | ---------------------------------- |
| `experiences/`    | Expériences                       | `2026-orange-innovation.yaml`      |
| `formations/`     | Formations                        | `2026-imt-atlantique.yaml`         |
| `certifications/` | Certifications                    | `exemple.yaml` (modèle, brouillon) |
| `competences/`    | Compétences                       | `01-devsecops.yaml` (un groupe)    |
| `plateformes/`    | Plateformes (sous Certifications) | `1-tryhackme.yaml` (brouillon)     |
| `a-propos/`       | À propos (Markdown)               | `fr.md`, `en.md`                   |
| `projets/`        | Page Projets                      | `01-portfolio.yaml`                |

## Ajouter une entrée

1. Copie un fichier existant du même dossier et renomme-le (`AAAA-nom.yaml`).
2. Modifie les champs. Les dates s'écrivent entre guillemets : `'2026-04'` ou `'2026'`.
3. `pnpm dev` : la page se met à jour. Une erreur de schéma s'affiche dans le terminal.

## Formations : plusieurs diplômes dans la même école

Un fichier = un diplôme. Pour la Licence et le Master de l'ESATIC : deux fichiers
(`2021-esatic-licence.yaml`, `2024-esatic-master.yaml`) avec **exactement** le même `school`
et le même `location`. Le site les regroupe dans une seule carte ESATIC.

## Formations : la fenêtre « Détails »

Au clic sur un diplôme, une fenêtre s'ouvre avec ces champs (tous facultatifs) :

- `details` : texte libre (`fr: |` puis le texte en dessous ; une ligne vide = nouveau paragraphe) ;
- `highlights` : liste de points forts (projets, mention…) ;
- `courses` : matières clés (étiquettes) ;
- `website` : lien `https://` vers l'école ou la formation.

Modèle commenté dans `2026-imt-atlantique.yaml`.

## Compétences

Un fichier = un groupe (titre, icône, liste de compétences). Le numéro du nom de fichier
(`01-`, `02-`…) fixe l'ordre d'affichage. Pour chaque compétence :

- `name` : le nom (texte simple, ou `fr:` / `en:` s'il se traduit) ;
- `level` : le nombre d'étoiles, de 0 à 5 ;
- `logo` : le nom du logo sur [simpleicons.org](https://simpleicons.org) (ex. `gnubash`).
  Les logos viennent du paquet `simple-icons`, installé dans le projet : aucun appel à un CDN.
  Un nom inconnu fait échouer le build ;
- `abbr` : les initiales affichées s'il n'y a pas de logo (4 caractères max).

Les logos noirs (OWASP, Symfony, Java…) passent automatiquement en blanc en thème sombre.

## À propos

Le texte est en Markdown, un fichier par langue : `a-propos/fr.md` et `a-propos/en.md`.
`**mot**` met un mot en valeur, `[texte](/fr/projets/)` crée un lien, une ligne vide sépare
deux paragraphes. N'y mets pas de HTML brut : le Markdown suffit.

La photo est `src/assets/photo.jpg`. Pour la changer, retire d'abord ses métadonnées EXIF
(elles peuvent contenir la position GPS de la prise de vue) : Astro la convertit ensuite en WebP.

## Projets

Un fichier = une étude de cas ; le numéro du nom de fichier (`01-`, `02-`…) fixe l'ordre.
Champs principaux : `title`, `summary`, `organization`, `start` / `end`, `status`
(`termine` ou `en-cours`), `categories` (`devsecops`, `reseau`, `offensive`, `iot` : elles
alimentent les filtres), `context`, `done`, `result` (facultatif), `tags`, `links`.

Visuel : sans image, un grand numéro et `visualLabel` s'affichent. Pour une image, place-la dans
`src/assets/projets/` (sans métadonnées EXIF), puis ajoute dans le YAML
`image: ../../assets/projets/mon-projet.png` et `imageAlt` (obligatoire). Modèle commenté dans
`01-portfolio.yaml`.

## Règles

- `draft: true` : l'entrée est vérifiée mais n'apparaît pas sur le site.
- Pas de `end` : l'expérience ou la formation est « en cours ».
- Les entrées sont triées automatiquement de la plus récente à la plus ancienne.
- Liens (`verifyUrl`) : `https://` uniquement.
- Une certification `obtenue` doit avoir un `verifyUrl` (preuve vérifiable).
- Un champ inconnu (faute de frappe, ligne de commentaire sans `#`) est refusé par le schéma.
- YAML : mets un texte entre guillemets s'il contient `:` ou commence par un caractère spécial.
