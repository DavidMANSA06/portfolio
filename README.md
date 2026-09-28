# Portfolio · Mansa David Gocaley

Portfolio personnel (cybersécurité et DevSecOps), construit comme un **projet d'apprentissage DevSecOps de bout en bout** : du code au serveur, avec la sécurité intégrée à chaque étape.

- **Stack** : [Astro](https://astro.build) (site statique) · TypeScript · CSS natif
- **Langues** : français (`/fr/`) et anglais (`/en/`)
- **Architecture** : [docs/architecture.md](docs/architecture.md) · décisions : [docs/adr/](docs/adr/)

## Prérequis

| Outil   | Version  | Vérifier         |
| ------- | -------- | ---------------- |
| Node.js | 24 (LTS) | `node --version` |
| pnpm    | 12       | `pnpm --version` |
| Git     | récent   | `git --version`  |

## Démarrer

```bash
pnpm install                    # installe les dépendances (versions figées par pnpm-lock.yaml)
pnpm astro telemetry disable    # une seule fois : pas d'envoi de statistiques à Astro
pnpm dev                        # site local sur http://localhost:4321
```

## Scripts

| Commande            | Effet                                                  |
| ------------------- | ------------------------------------------------------ |
| `pnpm dev`          | Serveur de développement avec rechargement automatique |
| `pnpm check`        | Vérifie les types et les fichiers `.astro`             |
| `pnpm build`        | Vérifie, puis génère le site final dans `dist/`        |
| `pnpm preview`      | Sert `dist/` en local, comme en production             |
| `pnpm format`       | Met en forme tout le code (Prettier)                   |
| `pnpm format:check` | Vérifie la mise en forme sans rien modifier            |

## Feuille de route

- [x] 1-2. Maquette conçue et validée (`design/maquette/`)
- [x] 3. Architecture et stack définies (`docs/adr/`)
- [x] 4. Structure du projet
- [ ] 5. Développement des fonctionnalités (composants, contenu, i18n)
- [ ] 6. Pratiques DevSecOps (Git/GitHub, qualité, secrets, dépendances, CSP)
- [ ] 7. CI/CD (tests, SAST, SCA, DAST, conteneur)
- [ ] 8. Déploiement sur VPS
- [ ] 9. Monitoring et amélioration continue

## Sécurité

Voir [SECURITY.md](SECURITY.md) pour signaler une vulnérabilité.
