// @ts-check
import { defineConfig } from 'astro/config';

// Configuration d'Astro : https://docs.astro.build/fr/reference/configuration-reference/
export default defineConfig({
  // Adresse finale du site (étape 8, déploiement) : sert aux liens absolus et au sitemap.
  site: 'https://example.com',

  // Site bilingue : /fr/… et /en/….
  // La racine "/" redirige vers /fr/ grâce à src/pages/index.astro
  // (en production, le serveur Nginx fera une vraie redirection 301).
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  // Le CSS reste dans des fichiers séparés (pas de <style> injecté dans la page) :
  // cela permet une Content Security Policy stricte (voir BaseLayout.astro).
  build: {
    inlineStylesheets: 'never',
  },

  // Même règle pour le JavaScript : Astro intègre les petits scripts directement dans la page.
  // Avec 0, chaque script devient un fichier .js séparé, autorisé par la CSP "script-src 'self'".
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },

  // Pas de télémétrie ni de barre d'outils de développement injectée dans les pages.
  devToolbar: {
    enabled: false,
  },
});
