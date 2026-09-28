# Guide 01 : Git en local (identité, clé SSH, commits signés)

Objectif : que chaque commit du dépôt soit **attribué** (identité) et **prouvé** (signature).
Sans signature, n'importe qui peut écrire `git config user.name "David"` et se faire passer pour toi.

Contexte : le même Mac sert pour **GitHub** (ce portfolio) et **GitLab** (autres projets).
Chaque plateforme a donc sa propre identité et sa propre clé, choisies automatiquement selon le dossier.

## 1. Clé SSH dédiée à GitHub (ed25519 + passphrase)

Une clé par plateforme : si l'une fuit, on la révoque sans toucher à l'autre.
Ne jamais relancer `ssh-keygen` sur un nom de fichier existant : la clé serait écrasée.

```bash
ls -la ~/.ssh      # voir les clés existantes (id_ed25519 = GitLab)
ssh-keygen -t ed25519 -C "macbook-david-github" -f ~/.ssh/id_ed25519_github
```

- La passphrase (optionnelle) chiffre la clé privée sur le disque : volée seule, elle est inutilisable.
  Choix actuel : **sans passphrase** (`-N ""`). Pour en ajouter une plus tard : `ssh-keygen -p -f ~/.ssh/id_ed25519_github`.
- `id_ed25519_github` = clé **privée** (ne quitte jamais le Mac). `.pub` = clé **publique** (se partage).

Ajouter dans `~/.ssh/config` (sans toucher au bloc GitLab) :

```
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519_github
  IdentitiesOnly yes
```

```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519_github
```

## 2. Configuration Git : commun en global, identité par plateforme

Emails « noreply » (masquent l'email réel dans l'historique public) :
- GitHub : https://github.com/settings/emails → `ID+pseudo@users.noreply.github.com`
  (cocher « Keep my email addresses private » et « Block command line pushes that expose my email »).
- GitLab : Préférences → Profil → « Use a private commit email » → `ID-pseudo@users.noreply.gitlab.com`.

`~/.gitconfig` (global : ce qui est commun à tout) :

```ini
[user]
    name = Mansa David Gocaley
    useConfigOnly = true      # refuse de commiter si aucun email n'est défini pour ce dépôt
[init]
    defaultBranch = main
[gpg]
    format = ssh
[gpg "ssh"]
    allowedSignersFile = ~/.ssh/allowed_signers
[commit]
    gpgsign = true
[tag]
    gpgsign = true

[includeIf "gitdir:~/David.G/portfolio/"]
    path = ~/.gitconfig-github
[includeIf "gitdir:~/CHEMIN/VERS/PROJETS-GITLAB/"]
    path = ~/.gitconfig-gitlab
```

`~/.gitconfig-github` :

```ini
[user]
    email = ID+pseudo@users.noreply.github.com
    signingkey = ~/.ssh/id_ed25519_github.pub
```

`~/.gitconfig-gitlab` :

```ini
[user]
    email = ID-pseudo@users.noreply.gitlab.com
    signingkey = ~/.ssh/id_ed25519.pub
```

`~/.ssh/allowed_signers` (une ligne par identité, pour vérifier les signatures en local) :

```
ID+pseudo@users.noreply.github.com ssh-ed25519 AAAA...(contenu de id_ed25519_github.pub)
ID-pseudo@users.noreply.gitlab.com ssh-ed25519 AAAA...(contenu de id_ed25519.pub)
```

Autres projets GitHub (deux options, cumulables) :

```ini
# Option A : un includeIf par dossier (ou un dossier parent qui regroupe tous les projets GitHub)
[includeIf "gitdir:~/David.G/autre-projet/"]
    path = ~/.gitconfig-github

# Option B : selon l'adresse du dépôt distant (Git >= 2.36), tout dépôt relié à GitHub
[includeIf "hasconfig:remote.*.url:git@github.com:*/**"]
    path = ~/.gitconfig-github
[includeIf "hasconfig:remote.*.url:git@gitlab.com:*/**"]
    path = ~/.gitconfig-gitlab
```

L'option B ne s'active qu'une fois le `git remote add` fait : avant, `useConfigOnly` bloque le commit (erreur sans danger).

Points d'attention :
- `gitdir:` doit se terminer par `/` et ne s'applique qu'**à l'intérieur d'un dépôt** (après `git init`).
- `useConfigOnly = true` : dans un dossier non couvert, Git refuse de commiter au lieu d'utiliser une
  mauvaise identité. Une erreur visible vaut mieux qu'une fuite silencieuse.

## 3. Vérifier puis faire le premier commit

```bash
cd ~/David.G/portfolio
pnpm astro telemetry disable
git init
git config --show-origin user.email        # doit venir de ~/.gitconfig-github
git config --show-origin user.signingkey   # doit être id_ed25519_github.pub
git status                                  # relire : pas de node_modules, .env, .DS_Store, Claude outputs
git add .
git status
git commit -m "chore: initialise le projet Astro (maquette, docs, ADR)"
git log --show-signature -1                 # doit afficher : Good "git" signature
```

Convention des messages : **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`, `refactor:`, `test:`).

## Dépannage

- `fatal: no email was given and auto-detection is disabled` : le dossier n'est couvert par aucun
  `includeIf` (vérifier le chemin et le `/` final).
- `incorrect passphrase` : refaire `ssh-add --apple-use-keychain ~/.ssh/id_ed25519_github`.
- `No signature` : vérifier `git config commit.gpgsign` (doit valoir `true`).
- Commit fait avec la mauvaise identité (avant de pousser) : corriger la config puis
  `git commit --amend --reset-author --no-edit`.
