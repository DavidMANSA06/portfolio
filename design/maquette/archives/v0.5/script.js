/* =======================================================================
   script.js — le comportement COMMUN à toutes les pages
   (tu n'as normalement pas besoin d'y toucher)
   ======================================================================= */

const root = document.documentElement;
const save = (key, value) => { try { localStorage.setItem(key, value); } catch (e) {} };

/* --- 1. Thème clair / sombre (mémorisé) --- */
document.querySelectorAll('.theme-toggle').forEach(btn => btn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  save('theme', next);
}));

/* --- 2. Langue FR / EN (mémorisée) --- */
function applyLang(lang) {
  root.setAttribute('data-lang', lang);
  root.lang = lang;
  const title = root.getAttribute('data-title-' + lang);
  if (title) document.title = title;
}
applyLang(root.getAttribute('data-lang') || 'fr');
document.querySelectorAll('.lang-toggle').forEach(btn => btn.addEventListener('click', () => {
  const next = root.getAttribute('data-lang') === 'fr' ? 'en' : 'fr';
  applyLang(next);
  save('lang', next);
}));

/* --- 3. Menu mobile --- */
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-toggle');
if (sidebar && menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  sidebar.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')));
}

/* --- 4. Accueil plein écran : la sidebar n'apparaît qu'une fois l'accueil quitté --- */
const landing = document.querySelector('.landing');
if (landing) {
  new IntersectionObserver(([entry]) => {
    document.body.classList.toggle('on-landing', entry.intersectionRatio > 0.35);
  }, { threshold: [0, 0.35, 1] }).observe(landing);
}

/* --- 5. Compétences : tuile (logo ou initiales) + nom + étoiles --- */
document.querySelectorAll('.skill').forEach(li => {
  const level = Math.max(0, Math.min(5, parseInt(li.dataset.level, 10) || 0));

  const tile = document.createElement('span');
  tile.className = 'skill-logo';
  if (li.dataset.icon) tile.dataset.icon = li.dataset.icon;
  tile.dataset.abbr = li.dataset.abbr || '';
  if (!li.dataset.icon) tile.textContent = li.dataset.abbr || '';

  const label = document.createElement('span');
  label.className = 'skill-name';
  label.append(...li.childNodes);          // garde le texte FR/EN tel quel

  const stars = document.createElement('span');
  stars.className = 'stars';
  stars.setAttribute('aria-label', level + ' / 5');
  const full = document.createElement('b');
  full.textContent = '★'.repeat(level);
  stars.append(full, '★'.repeat(5 - level));

  li.replaceChildren(tile, label, stars);
});

/* --- 6. Logos : couleur (thème clair) + gris clair (thème sombre) --- */
document.querySelectorAll('.skill-logo[data-icon]').forEach(tile => {
  const slug = encodeURIComponent(tile.dataset.icon);
  [['logo-light', ''], ['logo-dark', '/EDEDED']].forEach(([cls, color]) => {
    const img = document.createElement('img');
    img.src = 'https://cdn.simpleicons.org/' + slug + color;
    img.className = cls; img.alt = ''; img.loading = 'lazy';
    img.onerror = () => { tile.replaceChildren(tile.dataset.abbr || '?'); };  // logo introuvable → initiales
    tile.append(img);
  });
});

/* --- 7. Menu : surligne la section visible (liens internes "#...") --- */
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
if (navLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));
}

/* --- 8. Page Projets : filtres par catégorie --- */
const filters = document.querySelectorAll('.filter');
const cases = document.querySelectorAll('.case');
filters.forEach(btn => {
  const cat = btn.dataset.filter;
  const n = cat === 'all' ? cases.length : [...cases].filter(c => c.dataset.cat.split(' ').includes(cat)).length;
  const count = document.createElement('span');
  count.className = 'count';
  count.textContent = n;
  btn.append(count);

  btn.addEventListener('click', () => {
    filters.forEach(b => b.setAttribute('aria-pressed', b === btn));
    cases.forEach(c => { c.hidden = cat !== 'all' && !c.dataset.cat.split(' ').includes(cat); });
  });
});

/* --- 9. Apparition des blocs .reveal au défilement --- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 80 + 'ms';
  revealObserver.observe(el);
});
