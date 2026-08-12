# ALPITEC — site vitrine

Site vitrine d'ALPITEC, entreprise de travaux d'accès difficile sur cordes
(cordistes) à Vitry-sur-Seine, intervenant à Paris et en Île-de-France.

Refonte d'un site Joomla de 2018. Deux objectifs : générer des demandes de devis
depuis les recherches Google locales, et rassurer les grands comptes qui
vérifient le sérieux d'un sous-traitant avant de signer.

## Stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) 7 — HTML statique, aucun rendu serveur |
| Styles | [Tailwind CSS](https://tailwindcss.com) 4 (via `@tailwindcss/vite`) |
| Hébergement | [Netlify](https://netlify.com) |
| Formulaire | Netlify Forms — pas de back-end |
| Police | Inter, auto-hébergée en woff2 |

Aucun framework côté client : pas de React, pas de Vue. Les quelques
interactions (menu, accordéon FAQ, validation du formulaire) sont en
JavaScript natif, inlinées dans le HTML — environ 4 Ko par page.

## Commandes

```bash
npm install      # installer les dépendances
npm run dev      # serveur de développement sur http://localhost:4321
npm run build    # générer le site dans dist/
npm run preview  # servir dist/ localement pour vérifier le build
```

Le build affiche des avertissements quand du contenu reste à valider
(coordonnées incomplètes, photos sans texte alternatif, chiffres non sourcés).
Ce ne sont pas des erreurs : le build réussit, mais ces points doivent être
réglés avant la mise en ligne.

## Où vit le contenu

**Aucun texte n'est écrit en dur dans les composants.** Tout se modifie dans
`src/content/`, sans toucher au code.

```
src/content/
├── services/          9 fichiers .md — un par prestation
├── home/accueil.md    tous les textes de la page d'accueil
├── site/coordonnees.md  téléphone, WhatsApp, email, adresse, mentions légales
├── pages/             mentions légales, politique de confidentialité
└── blog/              articles (vide pour l'instant)
```

Le schéma de chaque collection est défini dans `src/content.config.ts`. Si un
champ obligatoire manque ou si un type ne correspond pas, le build s'arrête avec
un message précis — c'est volontaire, ça évite de publier une page cassée.

### Modifier le texte d'une prestation

Ouvrir le fichier correspondant dans `src/content/services/`, par exemple
`ravalement.md`. Le fichier suit l'ordre d'affichage de la page :

```yaml
---
title: "Ravalement de façades"          # nom du service
slug: "ravalement"                       # segment d'URL : /services/ravalement
ordre: 1                                 # position dans les listes
shortLabel: "Ravalement de façades"      # libellé court (menus, pied de page)

metaTitle: "…"                           # balise <title>
metaDescription: "…"                     # meta description

surtitre: "Nos services · Ravalement"    # au-dessus du H1
h1: "…"                                  # titre de la page
intro: "…"                               # accroche du bandeau

sections:
  - type: "keyFacts"      # encadré « Infos clés »
  - type: "expertise"     # « Notre expertise » + liste des prestations
  - type: "process"       # « Comment ça marche » en 4 étapes
  - type: "audiences"     # « Adapté à vos enjeux »
  - type: "zones"         # zones d'intervention
  - type: "realisations"  # galerie photos
  - type: "cta"           # bloc d'appel final

faqTitle: "…"
faq:
  - question: "…"
    answer: "…"
---
```

Enregistrer suffit : `npm run dev` recharge la page. Les listes « Nos autres
services », le menu et le pied de page se recalculent tout seuls à partir de la
collection — il n'y a **aucune liste de services écrite à la main** dans le code.

Ajouter une 10ᵉ prestation = déposer un `.md` de plus dans
`src/content/services/`. Rien d'autre.

### Ajouter une photo

Les photos du site vivent dans `src/assets/photos/<prestation>/`, un dossier par
service, plus `accueil/` pour la bande de chantiers de la page d'accueil.

1. Déposer le fichier, par exemple `src/assets/photos/ravalement/chantier-042.jpeg`
2. Déclarer son texte alternatif dans le `.md` du service :

```yaml
  - type: "realisations"
    title: "Nos derniers chantiers de ravalement"
    photos:
      - fichier: "chantier-042.jpeg"
        alt: "Cordiste suspendu reprenant l'enduit d'une corniche haussmannienne"
```

**Une photo sans texte alternatif n'est pas affichée.** Le build le signale et
indique quoi écrire. C'est délibéré : un `alt` générique répété partout ne sert
ni l'accessibilité ni le référencement. Décrire ce qu'on voit sur cette
photo-là, pas « photo de chantier ».

La galerie affiche 3 ou 4 photos. En dessous de 3, elle complète avec des tuiles
navy plutôt que de répéter une image.

Astro convertit tout en WebP, génère les tailles adaptées et pose les dimensions
explicites. Ne pas optimiser les images à la main.

### Ajouter un article de blog

Copier `src/content/blog/_MODELE.md.txt` en `src/content/blog/mon-article.md`
(extension `.md`, sans le préfixe `_`) et remplir l'en-tête :

```yaml
---
title: "Titre de l'article"
slug: "titre-de-l-article"        # URL : /blog/titre-de-l-article
metaTitle: "…"
metaDescription: "…"
h1: "…"
resume: "…"                        # chapô, affiché dans la liste
datePublication: 2026-09-01
serviceLie: "ravalement"           # facultatif : encart de renvoi en bas d'article
tags: ["ravalement", "copropriété"]
brouillon: false                   # true = ni généré, ni listé, ni indexé
---

## Un intertitre

Le corps s'écrit en Markdown. Les styles sont déjà en place.
```

L'article apparaît automatiquement sur `/blog` et dans le sitemap. Tant qu'aucun
article n'existe, `/blog` est en `noindex` et hors sitemap — une page de liste
vide dans l'index de Google est un mauvais signal.

### Modifier le téléphone, l'adresse ou les mentions

Tout est dans `src/content/site/coordonnees.md`. Le numéro y figure une seule
fois et alimente le header, le pied de page, la barre mobile, les liens
`tel:`, le lien WhatsApp, le schema.org et les mentions légales.

## Structure du code

```
src/
├── pages/              une page = un fichier
│   ├── index.astro           accueil
│   ├── services/[slug].astro gabarit unique des 9 pages services
│   ├── services/index.astro  hub des services
│   ├── blog/                 liste + gabarit d'article
│   ├── contact.astro  merci.astro  404.astro
│   └── [slug].astro          pages légales
├── layouts/Base.astro  <head> : title, meta, canonical, og:, slot schema.org
├── components/         Header, Footer, Button, ServiceCard, FaqAccordion,
│                       CtaBand, InfoBox, OtherServices, Gallery, Breadcrumb,
│                       ContactSection, ServiceSection
├── lib/content.js      accès unique aux contenus et aux photos
├── assets/             logo + photos du site
├── styles/global.css   tokens de marque, police, styles de texte long
└── content.config.ts   schémas des collections
```

### Repères de design

- **Couleurs** : orange `#F96500`, navy `#232B4A`, gris `#F5F6F8`, blanc.
  L'orange ne sert qu'à deux choses : marquer la structure d'un filet de 2 px,
  et signaler ce qui mène au devis ou au téléphone. Jamais pour décorer.
- **Typographie** : Inter, deux graisses (400 / 700), angles vifs, aucune ombre.
- **Mobile d'abord** : le trafic BTP local est majoritairement mobile. Une barre
  d'action fixe (Appeler · WhatsApp · Devis) est présente sur toutes les pages.

### Règles de contenu

- Les témoignages sont **anonymisés** : jamais de nom de personne, jamais de nom
  d'entreprise cliente. Format : « citation » — Fonction, type d'entreprise.
  Un témoignage n'est publié que s'il porte `valide: true`.
- Les textes viennent des documents fournis par le client. Les rares écarts sont
  documentés en commentaire dans les fichiers concernés.

## Déploiement

Netlify se branche sur ce dépôt et déploie la branche `main` automatiquement.
La configuration est dans `netlify.toml` :

- build : `npm run build`, publication de `dist/`
- en-têtes de sécurité (CSP, HSTS, `X-Frame-Options`, `Permissions-Policy`)
- cache long sur les ressources à empreinte, revalidation du HTML
- section des redirections 301 pour les anciennes URLs Joomla

### Avant la mise en ligne

- [ ] Coller les redirections 301 des anciennes URLs Joomla dans `netlify.toml`
- [ ] Compléter les 9 champs légaux de `coordonnees.md` (SIRET, forme juridique,
      capital, RCS, TVA, directeur de publication, assureur, adresse, horaires)
- [ ] Remplacer les mentions `[À COMPLÉTER]` des deux pages légales
- [ ] Confirmer les chiffres « 2009 » et « 7 000+ » de la page d'accueil
- [ ] Valider ou réécrire le bloc « Moyens d'accès »
- [ ] Obtenir la fonction des signataires des témoignages et leur accord écrit
- [ ] Activer la protection anti-spam du formulaire dans Netlify
- [ ] Vérifier que la page `/merci` s'affiche après un envoi réel
