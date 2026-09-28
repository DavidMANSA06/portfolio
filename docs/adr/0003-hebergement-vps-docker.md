# ADR 0003 : hébergement sur un VPS, en conteneur Docker

- **Statut** : accepté (mise en œuvre à l'étape 8)
- **Date** : 2026-09-26

## Contexte

Le projet a un objectif d'apprentissage DevSecOps de bout en bout : conteneurisation, déploiement, durcissement, monitoring. Un hébergement statique gratuit (Cloudflare Pages, GitHub Pages) serait plus simple, mais masquerait toute la partie « Ops ».

## Décision

Le site sera servi par un **conteneur Docker** sur un **VPS** :

- **image multi-étapes** : une étape de build (Node + pnpm), puis une image finale **Nginx non-root**, avec seulement les fichiers statiques ;
- **conteneur durci** : système de fichiers en lecture seule, _capabilities_ retirées, _healthcheck_ ;
- **en-têtes de sécurité** servis par Nginx : CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy ;
- **reverse proxy** avec TLS automatique (Let's Encrypt) devant le conteneur ;
- **serveur durci** : SSH par clé uniquement, pare-feu, mises à jour automatiques, fail2ban ;
- **image scannée** (Trivy) et signée en CI avant tout déploiement.

## Conséquences

- ✅ Couvre tout le cycle DevSecOps, du code au serveur et à la supervision.
- ⚠️ Coût d'environ 4 à 6 € par mois, et un serveur à maintenir : c'est une responsabilité, mais aussi l'objectif pédagogique.
- ↩️ **Plan B** : le même `dist/` peut être publié sur un hébergement statique en quelques minutes, sans rien changer au code.
