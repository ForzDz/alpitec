# ALPITEC — Contexte projet

Site vitrine pour ALPITEC, entreprise de travaux d'accès difficile sur cordes
(cordistes), Vitry-sur-Seine. Refonte d'un site Joomla de 2018 (alpitec.fr).

## Objectif
1. Générer des demandes de devis depuis les recherches Google locales
2. Rassurer les grands comptes qui vérifient le sérieux avant de signer

## Stack
Astro + Tailwind, déployé sur Netlify. HTML statique — le SEO est vital.
PAS de SPA, PAS de React côté client sauf nécessité absolue.

## Sources
_sources/docs/     10 fichiers .docx (1 accueil + 9 services) = les textes
_sources/logo/     logo-symbole, logo-complet
_sources/photos/   triées par prestation
_sources/videos/   vidéo de chantier

## Règles de code
- Le contenu vit dans src/content/, JAMAIS en dur dans les composants.
  Le client renverra des v2 de ses textes.
- Un seul template pour les 9 pages services : src/pages/services/[slug].astro
- Composant OtherServices : calcule automatiquement les 8 autres services.
  Aucune liste manuelle.
- Couleurs : orange #F96500, navy #232B4A, gris clair #F5F6F8. Police Inter.
- Chaque page : title, meta description, canonical, schema.org.
- Images : composant <Image> d'Astro, lazy loading, alt descriptif obligatoire.
- Mobile-first. Le trafic BTP local est majoritairement mobile.

## Interdits
- Les témoignages clients sont ANONYMISÉS : jamais de nom de personne,
  jamais de nom d'entreprise cliente (VINCI, Bouygues, etc.).
  Format : « citation » — Fonction, type d'entreprise.
  Exemple : « ... » — Responsable travaux, groupe de BTP national.
- Ne pas afficher de logos de clients tant que je ne l'ai pas validé.
- Ne pas inventer de contenu : tous les textes viennent des .docx.
- Ne pas copier le code ou le CSS de cordistes-responsables.com
  (seule la structure sert de référence).

## Méthode
- Montre-moi ton approche avant de coder sur toute tâche non triviale.
- Un changement = un prompt. Pas de méga-refonte.

---

# État du projet

_Dernière mise à jour : 13 août 2026._

**Le site est complet et fonctionnel : 17 pages, build vert, 4 261 Ko.**
Il n'est pas encore déployable en l'état — voir « En attente » plus bas.

## Fait

| Étape | Contenu |
|---|---|
| 1 | Rangement des sources brutes, inventaire, renommage séquentiel |
| 2 | Socle Astro + Tailwind, collections de contenu, extraction des 10 `.docx` |
| 3 | Design system : 8 composants, direction visuelle « le fil orange » |
| 4 | Gabarit unique des 9 pages services + hub `/services` |
| 5 | Page d'accueil : hero vidéo, 9 services, chiffres, témoignages, zones |
| 6 | Contact, formulaire Netlify, pages légales, blog, SEO technique |
| 7 | Audits mobile et performance, sécurité, relecture design |

Depuis : téléphone réel intégré, hero mobile retravaillé, filigrane de la vidéo
supprimé au recadrage, photos triées intégrées, barre d'action mobile renforcée,
header transparent sur l'accueil, mise en dépôt Git.

**Vérifié** : 0 page sans `title` / meta description / H1 unique / canonical.
0 image sans `alt`. 34 tests mobile (17 pages × 320 et 375 px) sans échec.
Contrastes AA mesurés sur la vidéo réelle. 0 erreur console.

## En attente — bloque la mise en ligne

1. **Redirections 301 des anciennes URLs Joomla.** Section prête dans
   `netlify.toml`, vide. Sans elles, tout l'historique SEO tombe en 404.
2. **9 champs légaux** dans `src/content/site/coordonnees.md` : SIRET, forme
   juridique, capital, RCS, TVA, directeur de publication, assureur, adresse,
   horaires. Le build les liste à chaque exécution.
3. **Mentions `[À COMPLÉTER]`** encore visibles sur `/mentions-legales` et
   `/confidentialite` — conséquence directe du point 2.
4. **Chiffres « 2009 » et « 7 000+ »** de l'accueil : absents des `.docx`,
   fournis oralement. Affirmations factuelles publiées, à confirmer.
5. **Bloc « Moyens d'accès »** : seule copie du site non tirée des `.docx`, et
   elle nuance le positionnement « sans échafaudage ni nacelle » des 9 pages
   services. À valider ou réécrire.
6. **Témoignages** : fonction des signataires + accord écrit. La section est
   masquée tant qu'aucun avis ne porte `valide: true`.
7. **Protection anti-spam** du formulaire à activer côté Netlify (honeypot seul
   aujourd'hui), et `maxlength` à poser sur les champs.
8. **Page `/merci`** à tester après un envoi réel.

À surveiller aussi : le filigrane « KlingAI 3.0 » a été retiré par recadrage,
mais la vidéo du hero reste vraisemblablement générée par IA — à trancher avant
de la présenter comme un chantier ALPITEC. Et 4 photos sur 10 ne correspondent
pas à leur dossier de prestation (commentaires « ATTENTION » dans les `.md`).

## Décisions techniques

**Astro 7, pas 5.** Version installée au démarrage du projet.

**`src/content.config.ts`, pas `src/content/config.ts`.** Astro 7 a supprimé les
_legacy content collections_ : l'ancien emplacement déclenche
`LegacyContentConfigError` et bloque le build. Les fichiers de contenu restent
dans `src/content/`. Le fichier est en TypeScript, comme `src/lib/content.ts` —
les imports y font référence en `.js`, c'est la convention TS attendue.

**Inter auto-hébergée.** woff2 variable dans `public/fonts/`, sous-ensemble latin
seul, `font-display: swap`, préchargée. Pas de `<link>` vers Google Fonts : une
requête tierce en moins sur le LCP mobile et aucune donnée visiteur envoyée à
Google. Le sous-ensemble latin-ext a été retiré, le français n'en a pas besoin.

**Témoignages anonymisés et verrouillés.** Les `.docx` les signent avec des noms
de personnes et d'entreprises clientes, ce que `CLAUDE.md` interdit. Citations
conservées mot pour mot, signatures supprimées, fonctions jamais inventées. Le
champ `valide: false` empêche tout rendu tant que le client n'a pas fourni la
fonction et l'accord écrit que son propre document réclame.

**Vidéo du hero sur desktop uniquement.** `autoplay` annule `preload` : déclarer
la balise coûtait 467 Ko à chaque première visite mobile pour un décor. Elle est
injectée en JavaScript à partir de 640 px, jamais si `prefers-reduced-motion`.
Sur mobile, seul le poster WebP est chargé.

**Photos dans `src/assets/photos/`, pas `_sources/`.** `_sources/` garde le
matériel brut du client (docx, vidéos originales, photos non triées, 27 Mo) et
reste hors du dépôt. Les photos du site sont des ressources de production dont le
build dépend : un glob sur `_sources/` ferait échouer le déploiement Netlify.

**Une photo sans `alt` écrit n'est pas affichée.** `<Image>` d'Astro exige un
`alt` : sans ce garde-fou, déposer une photo sans éditer le frontmatter casse le
build. La galerie complète alors avec des tuiles navy, et le build indique quoi
écrire.

**Header transparent : écouteur de scroll, pas `IntersectionObserver`.** Ni l'un
ni l'autre ne se déclenchent sur une page masquée, mais avec l'observateur le
header serait resté blanc sur blanc au retour sur un onglet d'arrière-plan.

**Page `/design-system` hors production.** Route dynamique dont
`getStaticPaths` renvoie `[]` en production. Accessible en `npm run dev`.
