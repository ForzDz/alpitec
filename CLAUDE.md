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
