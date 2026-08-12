// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import { readdirSync, existsSync } from 'node:fs';

/**
 * Le blog est en noindex tant qu'il n'a aucun article : une page de liste vide
 * indexée est un mauvais signal de qualité. Tant qu'il l'est, on le tient aussi
 * hors du sitemap — annoncer à Google une URL qu'on lui interdit d'indexer est
 * contradictoire et remonte en avertissement dans la Search Console.
 */
const blogVide =
  !existsSync('./src/content/blog') ||
  readdirSync('./src/content/blog').filter((f) => f.endsWith('.md')).length === 0;

/** Pages exclues du sitemap : outils internes et pages sans valeur de recherche. */
const horsSitemap = ['/design-system', '/merci', ...(blogVide ? ['/blog'] : [])];

// Note : pas de plugin remark/rehype ici. Astro 7 utilise Sätteri comme
// processeur Markdown par défaut ; brancher un plugin unified imposerait
// d'installer @astrojs/markdown-remark et de repasser sur l'ancien pipeline,
// plus lent. Les rares besoins de mise en forme sont couverts en CSS
// (voir « .texte-long » dans src/styles/global.css).

// Site 100 % statique : le SEO est vital, pas de SSR, pas d'adapter Netlify.
// `site` alimente les URLs canoniques et les balises og: du layout Base.astro.
export default defineConfig({
  site: 'https://www.alpitec.fr',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  image: {
    // Formats servis par le composant <Image> d'Astro.
    responsiveStyles: true,
  },
  integrations: [
    sitemap({
      filter: (page) => !horsSitemap.some((exclu) => new URL(page).pathname.startsWith(exclu)),
      i18n: undefined,
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
