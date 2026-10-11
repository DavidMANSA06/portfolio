/*
 * theme-init.js — applique le thème AVANT l'affichage (évite un « flash » blanc en mode sombre).
 *
 * Pourquoi un fichier séparé et pas un <script> écrit dans la page ?
 * Notre Content Security Policy (CSP) n'autorise que les scripts venant du site lui-même
 * (script-src 'self'). Un script en ligne serait bloqué, sauf à ajouter son empreinte (hash)
 * dans la CSP et à la recalculer à chaque modification. Un fichier externe évite ce piège.
 *
 * Chargé en mode bloquant dans <head> (ni async ni defer) : il s'exécute avant le rendu.
 */
(function () {
  var root = document.documentElement;
  var stored = null;
  try {
    stored = localStorage.getItem('theme');
  } catch (e) {
    /* stockage bloqué (navigation privée stricte…) : on suit le système */
  }
  // On ne fait jamais confiance à une valeur stockée : seules 'light' et 'dark' sont acceptées.
  var theme =
    stored === 'light' || stored === 'dark'
      ? stored
      : matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  root.setAttribute('data-theme', theme);
  root.classList.add('js'); // signale que JavaScript fonctionne (affiche le bouton de thème)
})();
