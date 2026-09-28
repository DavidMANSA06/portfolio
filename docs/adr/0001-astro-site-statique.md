# ADR 0001 : Astro + TypeScript, en site statique

- **Statut** : accepté
- **Date** : 2026-09-26

## Contexte

Le portfolio présente un profil, des compétences, un parcours et des projets, en français et en anglais. Il n'a besoin ni de comptes utilisateurs, ni de base de données, ni de traitement côté serveur.

La maquette (dossier `design/maquette/`) a montré deux limites d'un site écrit à la main :

- la sidebar est copiée dans chaque page ;
- les traductions sont dupliquées dans le HTML et basculées en JavaScript.

## Décision

On utilise **Astro** (mode `static`) avec **TypeScript strict** :

- **composants** : la sidebar et les cartes sont écrites une seule fois ;
- **i18n natif** : routes `/fr/…` et `/en/…`, meilleures pour le référencement que la bascule en JavaScript ;
- **collections de contenu** : projets, expériences et formations en Markdown, validés par un schéma ;
- **zéro JavaScript envoyé par défaut** : on n'ajoute que le strict nécessaire (thème, menu mobile) ;
- **CSS conservé** : les design tokens de la maquette (`src/styles/tokens.css`), sans framework CSS.

## Alternatives écartées

- **HTML/CSS/JS + Vite** : simple, mais la duplication de la sidebar et des traductions reste manuelle.
- **Next.js** : beaucoup plus de dépendances, donc plus de surface d'attaque et de mises à jour, pour des fonctionnalités serveur dont on n'a pas besoin.

## Conséquences

- ✅ **Sécurité** : le site final n'est que du HTML/CSS statique, sans serveur applicatif ni base de données à attaquer.
- ✅ **Prêt pour une CSP stricte** : aucun script ni style en ligne généré (`inlineStylesheets: 'never'`).
- ✅ **Performances** élevées, et un hébergement très simple (un serveur de fichiers).
- ⚠️ Il faut apprendre la syntaxe `.astro`, qui reste proche du HTML.
- ⚠️ `@astrojs/check` ne supporte pas encore TypeScript 7 : on reste sur **TypeScript 6** pour l'instant.
