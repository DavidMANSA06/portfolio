# ADR 0002 : pnpm et sécurité de la chaîne d'approvisionnement

- **Statut** : accepté
- **Date** : 2026-09-26

## Contexte

Un projet JavaScript dépend de dizaines, voire de centaines de paquets tiers. Les attaques de la _supply chain_ (paquet piraté, typosquatting, script malveillant exécuté à l'installation) sont aujourd'hui l'un des risques majeurs de l'écosystème npm.

## Décision

On utilise **pnpm** (version figée par `packageManager` dans `package.json`), avec ces réglages dans `pnpm-workspace.yaml` :

| Réglage                    | Effet                                                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `minimumReleaseAge: 4320`  | Une version n'est installée que si elle est publiée depuis **au moins 3 jours**. Un paquet piraté est en général retiré avant.                    |
| `allowBuilds`              | Les scripts d'installation des dépendances sont **bloqués par défaut**. On autorise ou refuse chaque paquet explicitement (ex. `esbuild: false`). |
| `pnpm-lock.yaml` versionné | Les versions exactes, avec leurs empreintes (_integrity_), sont figées. Tout le monde, CI comprise, installe exactement la même chose.            |

Autres règles :

- **Aucune police ni aucun script chargé depuis un CDN tiers** : les polices viennent de `@fontsource-variable/*`, les logos viendront du paquet `simple-icons`, intégrés au build.
- Les dépendances de développement (`devDependencies`) sont séparées de celles du site.

## Conséquences

- ✅ Surface d'attaque réduite et installations reproductibles.
- ✅ Prépare l'étape 6 : audit des dépendances (SCA) et mises à jour automatiques contrôlées.
- ⚠️ Une correction de sécurité urgente publiée il y a moins de 3 jours devra être installée volontairement (`minimumReleaseAgeExclude`).
