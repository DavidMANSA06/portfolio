# Contenu

Les contenus du site, un fichier YAML par entrée, bilingues (`fr` et `en` obligatoires).
Le schéma de chaque collection est dans `src/content.config.ts` : `pnpm build` (et la CI)
échoue avec un message clair si un champ manque ou est mal écrit.

| Dossier           | Section        | Exemple                            |
| ----------------- | -------------- | ---------------------------------- |
| `experiences/`    | Expériences    | `2026-orange-innovation.yaml`      |
| `formations/`     | Formations     | `2026-imt-atlantique.yaml`         |
| `certifications/` | Certifications | `exemple.yaml` (modèle, brouillon) |

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

## Règles

- `draft: true` : l'entrée est vérifiée mais n'apparaît pas sur le site.
- Pas de `end` : l'expérience ou la formation est « en cours ».
- Les entrées sont triées automatiquement de la plus récente à la plus ancienne.
- Liens (`verifyUrl`) : `https://` uniquement.
- Une certification `obtenue` doit avoir un `verifyUrl` (preuve vérifiable).
- Un champ inconnu (faute de frappe, ligne de commentaire sans `#`) est refusé par le schéma.
- YAML : mets un texte entre guillemets s'il contient `:` ou commence par un caractère spécial.
