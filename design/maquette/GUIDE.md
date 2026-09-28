# Guide : modifier la maquette (v0.6)

## Organisation du dossier

```
maquette/
├── index.html     → accueil plein écran + profil (À propos, Compétences, Expériences, Formations, Certifications, Contact)
├── projets.html   → page Projets (études de cas + filtres)
├── styles.css     → TOUT le style, commun aux deux pages
├── script.js      → TOUT le comportement (thème, langue, menu, filtres, animations)
├── GUIDE.md       → ce guide
└── archives/      → anciennes versions (v0.1 à v0.5)
```

Pourquoi plusieurs fichiers maintenant ? Il y a deux pages. Si le style était copié dans chacune, il faudrait faire chaque modification deux fois. Avec un `styles.css` commun, tu changes une couleur une seule fois et les deux pages suivent. C'est le principe **DRY** (*Don't Repeat Yourself*), et c'est aussi un premier pas vers la structure du vrai projet.

Pour voir la maquette : double-clique sur `index.html`. Après chaque modification, enregistre puis recharge la page (Cmd+R, ou Cmd+Shift+R si l'ancienne version reste affichée).
Éditeur conseillé : **VS Code** avec l'extension *Live Server*.

## Couleurs et thèmes → `styles.css`, tout en haut

Les deux thèmes sont **le miroir l'un de l'autre**, sans aucun dégradé :

| | Clair | Sombre |
|---|---|---|
| Fond | blanc cassé `#FAFAFA` | noir `#000000` |
| Texte et accent | noir `#0A0A0A` | blanc cassé `#EDEDED` / blanc |
| Blocs inversés (Contact, flèche Projets) | noirs | clairs |
| Logos | couleurs des marques | couleurs des marques (logos noirs inversés) |

- `:root` contient le thème clair, `:root[data-theme="dark"]` le thème sombre. Ils ont exactement les mêmes variables.
- Les blocs « inversés » utilisent `--inverse-bg`, `--inverse-text`, `--inverse-muted` et `--inverse-border`.
- Pour un accent de couleur, change `--color-accent` dans les deux blocs (ex. `#2451B7` en clair, `#6E9BFF` en sombre).
- Sidebar en verre : `--glass-bg` règle l'opacité, `--glass-blur` le flou, `--sidebar-gap` la marge autour.

## Français / anglais

Chaque texte existe dans les deux langues, côte à côte :

```html
<span lang="fr">Contactez-moi</span><span lang="en">Contact me</span>
```

- Le bouton **FR / EN** bascule la langue. Le choix est mémorisé dans le navigateur. À la première visite, le site suit la langue du navigateur.
- Pour un paragraphe entier : `<p lang="fr">…</p>` puis `<p lang="en">…</p>`.
- Un texte identique dans les deux langues (ex. « Certifications », « Docker ») s'écrit une seule fois, sans `lang`.
- Le titre de l'onglet se règle en haut de chaque page : `data-title-fr` et `data-title-en`.

## Accueil plein écran

- L'accueil occupe tout l'écran, sans sidebar. La sidebar apparaît dès qu'on descend vers « À propos ».
- Les trois boutons : **À propos de moi** (descend au profil), **Mes projets** (ouvre `projets.html`), **Contactez-moi** (descend au contact).

## Compétences

```html
<li class="skill" data-icon="python" data-abbr="PY" data-level="4">Python</li>
```

- `data-level` : le nombre d'étoiles, de 0 à 5.
- `data-icon` : le nom du logo sur simpleicons.org.
- `data-abbr` : les initiales affichées si le logo n'existe pas ou ne charge pas.
- Les logos sont affichés dans la couleur de leur marque. Si un logo est noir (OWASP, Symfony, Java…), ajoute `data-invert` : il passera en blanc en thème sombre.
- Les étoiles sont en jaune doré : couleur réglable avec `--color-star` (dans les deux thèmes).

## Expériences et formations

- **Expérience** : un `<li class="tl-item reveal">` dans la frise de la section `#experiences`.
- **Formation** : un `<article class="edu-card reveal">` dans la section `#formations`. Remplace les `[Matière clé]` par tes cours importants.

## Accès aux projets

Les projets ne sont plus dans le menu des sections, puisqu'ils ont leur propre page. Trois accès restent possibles :
1. le bouton **Mes projets** de l'accueil ;
2. la carte **Mes projets** sous le menu de la sidebar (en noir quand tu es sur la page Projets) ;
3. le **bandeau « Ce que j'ai construit »**, juste avant Contact, en fin de profil.

## Projets → `projets.html`

Un projet = un bloc `<article class="case reveal" data-cat="…">` complet : copie-le pour en ajouter un.

- `data-cat` : une ou plusieurs catégories séparées par un espace (`devsecops`, `reseau`, `offensive`, `iot`). Les filtres et leurs compteurs se mettent à jour tout seuls.
- Nouvelle catégorie : ajoute un bouton `<button class="filter" data-filter="cloud" aria-pressed="false">Cloud</button>`.
- **Visuel** : place une image dans un dossier `images/`, puis remplace le contenu de `<div class="case-visual">` par `<img src="images/mon-projet.png" alt="Description">`.
- Les projets s'affichent en zigzag automatiquement (visuel à gauche, puis à droite…).

## Animations (volontairement discrètes)

| Animation | Où la régler |
|---|---|
| Entrée en cascade de l'accueil | `styles.css` → `.intro > *` et `@keyframes rise` |
| Pastille du menu qui glisse vers la section visible | `.nav-indicator` |
| Barre de progression de lecture (2 px en haut) | `.progress` |
| Bascule de thème en cercle depuis le bouton | `script.js`, partie 1 (navigateurs récents ; ailleurs, bascule simple) |
| Frise des expériences qui se dessine | `.timeline::before` |
| Flèches qui avancent au survol, soulignement qui se retire | `.arrow`, `.about-prose a` |
| Bouton « Copier » l'email → « Copié ✓ » | `.copy-btn` |
| Projets qui réapparaissent en cascade quand on filtre | `script.js`, partie 10 |

Toutes les animations se coupent automatiquement si l'ordinateur du visiteur demande de réduire les animations (réglage d'accessibilité). Pour couper seulement les apparitions au défilement, mets `--reveal-duration: 0s`.

## Photo, liens, textes à compléter

- **Photo** : dans les deux pages, remplace `<div class="avatar">Photo</div>` par `<img class="avatar" src="photo.jpg" alt="Mansa David Gocaley">`.
- Cherche `[` avec Cmd+F pour trouver ce qu'il reste à remplir : certifications, matières clés, résultats des projets, projet 04, pseudos sur les plateformes.
- Remplace les `href="#"` (GitHub, LinkedIn, CV) par tes vraies URL.
- La sidebar est copiée dans les deux pages. Si tu modifies un lien du menu, fais-le dans `index.html` **et** dans `projets.html`. Dans le vrai projet, elle deviendra un composant unique.
