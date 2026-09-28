/* =======================================================================
   script.js — le comportement COMMUN à toutes les pages
   (tu n'as normalement pas besoin d'y toucher)
   ======================================================================= */

const root = document.documentElement;
const save = (key, value) => { try { localStorage.setItem(key, value); } catch (e) {} };
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- 1. Thème clair / sombre : le nouveau thème s'ouvre en cercle depuis le bouton --- */
document.querySelectorAll('.theme-toggle').forEach(btn => btn.addEventListener('click', e => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  const apply = () => { root.setAttribute('data-theme', next); save('theme', next); };

  if (!document.startViewTransition || reduceMotion) return apply();   // navigateur ancien → bascule simple

  const rect = btn.getBoundingClientRect();
  const x = e.clientX || rect.left + rect.width / 2;
  const y = e.clientY || rect.top + rect.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.startViewTransition(apply).ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 550, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' }
    );
  });
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
  moveIndicator();   // la largeur des textes change : on recale la pastille du menu
}));

/* --- 3. Menu mobile --- */
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-toggle');
if (sidebar && menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  sidebar.querySelectorAll('.nav a, .nav-cta').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')));
}

/* --- 4. Accueil plein écran : la sidebar n'apparaît qu'une fois l'accueil quitté --- */
const landing = document.querySelector('.landing');
if (landing) {
  new IntersectionObserver(([entry]) => {
    document.body.classList.toggle('on-landing', entry.intersectionRatio > 0.35);
  }, { threshold: [0, 0.35, 1] }).observe(landing);
}

/* --- 5. Barre de progression de lecture --- */
const progress = document.querySelector('.progress');
if (progress) {
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

/* --- 6. Compétences : tuile (logo ou initiales) + nom + étoiles --- */
document.querySelectorAll('.skill').forEach(li => {
  const level = Math.max(0, Math.min(5, parseInt(li.dataset.level, 10) || 0));

  const tile = document.createElement('span');
  tile.className = 'skill-logo';
  if (li.dataset.icon) tile.dataset.icon = li.dataset.icon;
  if (li.hasAttribute('data-invert')) tile.setAttribute('data-invert', '');
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

/* --- 7. Logos en couleur (data-invert : logo noir passé en blanc en thème sombre) --- */
document.querySelectorAll('.skill-logo[data-icon]').forEach(tile => {
  const img = document.createElement('img');
  img.src = 'https://cdn.simpleicons.org/' + encodeURIComponent(tile.dataset.icon);
  img.alt = ''; img.loading = 'lazy';
  img.onerror = () => { tile.replaceChildren(tile.dataset.abbr || '?'); };  // logo introuvable → initiales
  tile.append(img);
});

/* --- 8. Menu : pastille qui glisse sous la section visible --- */
const nav = document.querySelector('.nav');
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
let indicator = null;
if (nav) {
  indicator = document.createElement('span');
  indicator.className = 'nav-indicator';
  nav.prepend(indicator);
  nav.classList.add('has-indicator');
}
function moveIndicator() {
  if (!indicator) return;
  const active = nav.querySelector('a.active');
  if (!active) { indicator.style.opacity = 0; return; }
  indicator.style.opacity = 1;
  indicator.style.height = active.offsetHeight + 'px';
  indicator.style.transform = `translateY(${active.offsetTop}px)`;
}
if (navLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      moveIndicator();
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id], .landing[id]').forEach(s => observer.observe(s));
}
addEventListener('resize', moveIndicator);

/* --- 9. Copier l'email en un clic --- */
document.querySelectorAll('.copy-btn').forEach(btn => btn.addEventListener('click', async () => {
  const text = btn.dataset.copy;
  try { await navigator.clipboard.writeText(text); }
  catch (e) {                                   // secours si le presse-papiers est bloqué
    const t = document.createElement('textarea'); t.value = text; document.body.append(t);
    t.select(); document.execCommand('copy'); t.remove();
  }
  btn.classList.add('copied');
  clearTimeout(btn._timer);
  btn._timer = setTimeout(() => btn.classList.remove('copied'), 1800);
}));

/* --- 10. Page Projets : filtres par catégorie (avec petite animation) --- */
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
    let i = 0;
    cases.forEach(c => {
      const show = cat === 'all' || c.dataset.cat.split(' ').includes(cat);
      c.hidden = !show;
      if (show && !reduceMotion) {
        c.classList.add('visible');
        c.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
                  { duration: 450, delay: i++ * 70, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
      }
    });
  });
});

/* --- 11. Apparition des blocs .reveal (et de la frise) au défilement --- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .timeline').forEach((el, i) => {
  if (el.classList.contains('reveal')) el.style.transitionDelay = (i % 3) * 80 + 'ms';
  revealObserver.observe(el);
});
