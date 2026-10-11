# Guide 02 : CI minimale avec GitHub Actions

Objectif : **chaque PR est vérifiée automatiquement** avant de pouvoir être mergée sur `main`.
C'est le « shift left » : les contrôles existent avant le code, pas après.

## 1. Ce qui a été ajouté

| Fichier                    | Rôle                                                            |
| -------------------------- | --------------------------------------------------------------- |
| `.github/workflows/ci.yml` | Le pipeline : 2 jobs, `build` et `gitleaks`, lancés à chaque PR |
| `.github/dependabot.yml`   | PR automatiques de mise à jour (dépendances pnpm + actions)     |

### Job `build` (qualité)

1. `pnpm install --frozen-lockfile` : installe **exactement** le lockfile. Si `package.json` et
   `pnpm-lock.yaml` ne correspondent plus, la CI échoue au lieu de « réparer » en silence.
2. `pnpm format:check` : Prettier vérifie le formatage (sans rien modifier).
3. `pnpm build` : `astro check` (erreurs TypeScript) puis `astro build`.

### Job `gitleaks` (secrets)

Analyse **tout l'historique Git** (`fetch-depth: 0`) : un secret supprimé dans un commit récent
reste lisible dans les anciens. Le binaire est téléchargé puis son **empreinte SHA-256 est
vérifiée** : si le fichier a été modifié, la CI s'arrête.

## 2. Les choix de sécurité du workflow (et pourquoi)

- **`permissions: contents: read`** : le jeton `GITHUB_TOKEN` fourni au pipeline ne peut que lire.
  Une étape compromise ne pourrait ni pousser du code ni modifier le dépôt (moindre privilège).
- **Actions épinglées par SHA** (`actions/checkout@3d3c42e…  # v7.0.1`) : un tag comme `v7` peut
  être déplacé vers du code malveillant si l'auteur de l'action est piraté ; un SHA de commit est
  immuable. Le commentaire garde la version lisible, Dependabot met à jour les deux.
- **`persist-credentials: false`** : le jeton n'est pas laissé dans `.git/config` après le checkout.
- **`timeout-minutes`** : un job bloqué ne tourne pas pendant 6 h (durée max par défaut).
- **`ASTRO_TELEMETRY_DISABLED=1`** : pas de télémétrie envoyée depuis la CI.
- **Déclencheur `pull_request`** (et jamais `pull_request_target`, qui donne accès aux secrets
  à du code venu d'une PR externe).
- **Dependabot `cooldown: 3 jours`** : même règle que `minimumReleaseAge` dans pnpm.

## 3. Mise en place (à faire par toi)

```bash
cd ~/David.G/portfolio
git switch main
git pull                          # récupère la PR déjà mergée
git switch -c ci/pipeline-minimal
pnpm format:check                 # vérifier en local avant de pousser (même commande que la CI)
git add .github docs/guides/02-ci-github-actions.md
git commit -m "ci: ajoute le pipeline minimal (build, format, gitleaks) et Dependabot"
git push -u origin ci/pipeline-minimal
```

Puis sur GitHub : ouvrir la PR et regarder l'onglet **Checks** : `build` et `gitleaks` doivent
passer au vert. Tant qu'ils tournent, tu peux cliquer dessus pour voir les logs étape par étape.

## 4. Rendre la CI obligatoire

Une fois les deux jobs passés **au moins une fois** (GitHub ne propose que des checks qu'il a
déjà vus) : Settings → Rules → Rulesets → `protect-main` → cocher
**Require status checks to pass** → **Add checks** → `build` et `gitleaks`.
Cocher aussi **Require branches to be up to date before merging**.

Désormais, le bouton Merge reste grisé tant qu'un contrôle est rouge.

## 5. Reproduire en local

| En CI                            | Sur ton Mac                                |
| -------------------------------- | ------------------------------------------ |
| `pnpm install --frozen-lockfile` | idem                                       |
| `pnpm format:check`              | idem (`pnpm format` pour corriger)         |
| `pnpm build`                     | idem                                       |
| `gitleaks git --redact .`        | `brew install gitleaks` puis même commande |

## 6. Si un check échoue

- **format:check** : lancer `pnpm format`, commiter, pousser : la CI se relance seule.
- **frozen-lockfile** : tu as modifié `package.json` sans `pnpm install` : lance-le et commite le
  lockfile.
- **gitleaks** : un secret est détecté. **Le révoquer d'abord** (le changer chez le fournisseur),
  puis le retirer de l'historique. Supprimer la ligne ne suffit pas : il reste dans Git.
