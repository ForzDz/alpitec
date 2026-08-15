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
- Direction artistique : voir « Acier & altitude » plus bas. Aucune couleur,
  ombre, rayon ou taille de texte en dur dans un composant — tout vient des
  tokens de `src/styles/global.css`.
- Chaque page : title, meta description, canonical, schema.org.
- Images : composant <Image> d'Astro, lazy loading, alt descriptif obligatoire.
- Mobile-first. Le trafic BTP local est majoritairement mobile.

## Direction artistique — « Acier & altitude »

_Validée le 13 août 2026. Source unique : `src/styles/global.css`.
Recette visible en `npm run dev` sur `/specimen` (hors production)._

Le ton est industriel-éditorial : le site se lit comme un dossier technique
adressé à un grand compte, pas comme une plaquette. Masses pleines, photos en
grand, typographie lourde, ornement quasi nul. Ce qui doit rester en tête après
la visite : la corde orange qui descend le long de la page, et des chantiers
qu'on a vraiment vus.

### Couleurs
| Token | Valeur | Emploi |
|---|---|---|
| `orange` | `#F96500` | Marque (logo). CTA, corde, accents. Aplat, ou texte ≥ 24 px sur navy. |
| `orange-texte` | `#D95A00` | Le SEUL orange autorisé en texte sur fond clair, et seulement ≥ 24 px. |
| `alerte` | `#B03A00` | Erreurs de formulaire. Seule couleur d'alerte du site. |
| `navy` | `#232B4A` | Marque (logo). Texte, aplats de section, tuiles d'icône. |
| `navy-profond` | `#1A2039` | Bandeaux de conversion, pied de page. |
| `navy-clair` | `#2F3960` | Surfaces posées SUR du navy, où une ombre ne se voit pas. |
| `gris` | `#F5F6F8` | Un temps sur quatre du cycle de fonds. |
| `gris-bord` | `#E4E7EE` | Séparateurs et contours de champ. |

**Règle de contraste, non négociable.** L'orange de marque ne donne que 3,0:1
sur blanc et 2,8:1 sur gris : il n'est JAMAIS employé en texte sur fond clair.
En texte il ne sert qu'à partir de 24 px, en `orange-texte` sur fond clair et en
orange de marque sur navy. Sous 24 px, un lien actif se signale par un
soulignement orange, jamais par la couleur. Aucun texte en dessous de
`navy/70` ni de `blanc/70`.

_Une exception, une seule : le filigrane décoratif — la guillemet géante
derrière les témoignages, en `orange/8`. Ce n'est pas du texte à lire mais
un ornement, `aria-hidden`, qui ne porte aucune information. Il ressort dans
les audits automatiques de contraste : c'est attendu._

**Le bouton primaire porte du texte navy sur l'aplat orange**, pas du blanc :
blanc sur orange plafonne à 3,0:1, navy monte à 4,5:1 — et c'est le contraste de
la signalétique de chantier.

### Typographie
**Montserrat** (titres, Google Fonts, licence OFL) + **Switzer** (corps,
Fontshare, licence FFL), auto-hébergées en woff2 variable, sous-ensemble latin
— 35 Ko + 28 Ko. Montserrat seule est préchargée : elle porte le H1, donc le
LCP.

_Montserrat remplace Technor le 14 août 2026, sur décision du client. Technor
reste dans public/fonts/ : rebrancher `--font-display` suffit à revenir en
arrière. Montserrat étant géométrique et large, le tracking des titres est
remonté de −0,035em à −0,02em — le serrage qui allait à Technor colle les
lettres ici._

L'échelle vit dans `@theme` : `text-affiche`, `text-titre`, `text-sous-titre`,
`text-carte`, `text-corps`, `text-corps-large`, `text-petit`, `text-etiquette`.
Chaque taille porte son interlignage et son tracking — on ne les redéfinit pas
au cas par cas. Titres 800/900 et tracking −0,02em ; corps 300/400 et
interlignage 1,7. C'est l'écart entre les deux qui fait la hiérarchie.

Pour régénérer une police : récupérer le woff2 variable (zip Fontshare pour
Switzer, API Google Fonts pour Montserrat), `npm i subset-font --no-save`,
sous-ensembler sur les plages latin listées dans `global.css`.

### Formes et profondeur
Trois rayons, pas un de plus : `rounded-tuile` (8 px) pour tout ce qui est petit
— icônes, badges, champs, boutons — `rounded-carte` (12 px) au-dessus,
`rounded-bloc` (16 px) sur les grandes surfaces photo.

Trois ombres, teintées navy et jamais noires : `shadow-repos` (surface posée),
`shadow-flottant` (survol, panneau ouvert), `shadow-eleve` (ce qui passe
au-dessus du contenu). Pas de bordure sèche pour délimiter une carte — c'est
l'ombre qui la décolle. La classe `.eleve` donne l'élévation au survol : ombre
élargie + 3 px vers le haut, 200 ms, désactivée au doigt.

Aucune icône n'est posée nue : elle vit dans une `<TuileIcone>` navy arrondie.

### Rythme
Le fond suit un cycle de quatre temps — blanc, gris, navy plein, photo pleine
largeur — et deux sections voisines n'ont jamais la même mise en page. On
alterne deux colonnes asymétriques (5/7), pleine largeur, grille décalée.
L'espacement inter-sections est `--espace-section` (80 → 160 px) ; c'est le
principal outil de hiérarchie de cette direction, il ne se réduit pas.

Chaque titre de section porte son dernier mot en orange, via `<TitreSection>`
qui le calcule. Les fichiers de contenu gardent des titres en texte brut.

### La corde
Le fil orange ne coiffe plus chaque titre à l'identique. C'est UNE verticale
continue (`.corde`) qui descend le long du contenu et marque ses points
d'accroche par un nœud (`.corde-noeud`). Une par page, deux au maximum : répétée,
elle redevient un ornement.

### Le voile du hero — chiffré, pas estimé

Le pixel le plus clair de la vidéo sous la zone de texte est `rgb(192,212,230)`,
luminance 0,640, relevé sur six images réparties sur les cinq secondes. Il faut
**55 % de navy minimum** pour que du blanc y tienne le seuil AA du corps de
texte. Toute retouche du voile se revérifie sur la vidéo réelle, jamais à l'œil.

Le seuil est `md` (768 px), pas `sm`.

**À partir de md — voile HORIZONTAL.** Opaque à gauche, transparent à partir
de 64 %, soit 36 % de largeur dégagée sur le cordiste. Pas 40 % : les glyphes
du H1 descendent jusqu’à 50,6 % et il faut une rampe pour les couvrir.

**Sous md — voile VERTICAL.** Le texte occupe toute la largeur, il n’existe
aucun côté droit libre. Dense jusqu’à 40 % derrière le surtitre et le titre,
puis chute : transparent à partir de 80 %.

Et surtout : sous md, les CTA et les badges portent LEUR PROPRE FOND — navy à
70 % pour le bouton téléphone, navy éclairci à 80 % pour les pastilles. C’est
ce qui permet d’alléger le voile sous eux sans rien perdre en lisibilité ; le
bouton de devis, aplat orange opaque, se suffit déjà.

**`object-position` en Y est inopérant sous md.** Le cadre du hero et l’image
ont presque le même ratio : il ne reste que 7 px à rogner. Le cordiste est où
la vidéo l’a mis, autour de 44 à 70 % de la hauteur, et aucun cadrage ne l’en
délogera. Le seul levier est le voile. Ne pas repartir sur cette piste.

**La bande du header a son propre voile**, tenu à 78 % sur toute la hauteur de
la barre. Le menu, le téléphone et le bouton de devis sont alignés à droite,
c'est-à-dire dans la zone devenue transparente : sans lui, du texte blanc s'y
retrouve à 2,5:1.

### Photos
Deux ratios seulement, 16/9 et 4/3. La classe `.photo` applique le traitement
qui unifie la série — contraste +8 %, saturation −5 %, voile navy 6 % en
multiply — et `.photo-zoom` le zoom lent au survol d'une carte. Une photo pleine
largeur par page comme respiration. Une entreprise de cordistes doit montrer ses
chantiers : les images sont grandes, jamais des vignettes.

### Mouvement

_Ajouté le 14 août 2026. Aucune bibliothèque : tout tient dans `global.css` et
le script de `Base.astro`._

Une courbe (`--sortie`, l'équivalent CSS de power3.out), une durée
(`--duree-reveal`, 500 ms), un pas de cascade (`--pas-stagger`, 80 ms). Trois
variantes d'apparition, déclenchées une seule fois par un observateur unique :

| Marqueur | Effet |
|---|---|
| `data-reveal` | monte de 20 px en fondu |
| `data-reveal="titre"` | révélation en masque, ligne par ligne |
| `data-reveal="image"` | fondu et détente de 1,04 vers 1 |
| `data-reveal-groupe` | les enfants directs entrent en cascade |

**Le masque des grands titres.** Aucun sélecteur CSS ne sait désigner une ligne
de texte : le script découpe le titre en mots, les regroupe par `offsetTop`
mesuré, et enveloppe chaque ligne d'un bloc à débordement masqué dont
l'intérieur glisse en 700 ms. Le découpage a lieu après la mise en page, donc
`text-wrap: balance` a déjà décidé des coupes, et il est refait au
redimensionnement.

Trois pièges déjà rencontrés, à ne pas réintroduire :
- une espace est insérée entre deux lignes, sinon `textContent` recolle les
  mots — « spécialistesdes » — et c'est ce texte que lisent les extracteurs ;
- `padding-block: 0.14em` compensé par une marge négative sur chaque ligne,
  sans quoi le masque coupe l'accent d'« Île-de-France » et les jambages ;
- le mot en orange de `<TitreSection>` doit survivre au découpage : les spans
  de mots héritent de la classe de leur parent.

Un `clip-path: inset()` calé sur la boîte de l'élément ferait la même chose en
apparence, mais coupe les glyphes qui débordent de la line-box. Ne pas y
revenir.

**Ne jamais poser `data-reveal` sur un conteneur qui abrite déjà un
`data-reveal-groupe`** : la section fondrait en bloc puis ses enfants
referaient le même mouvement.

L'apparition n'utilise que `translate` et `scale`. `transform` est réservé à
l'élévation au survol et au zoom photo — trois propriétés distinctes se
composent, alors que deux règles sur `transform` s'écrasent.

**La ligne de progression des étapes** (`data-etapes`) est MOBILE UNIQUEMENT,
sous 48 rem. Une verticale droite à gauche des cartes se remplit en orange
selon une ligne de référence fixée aux trois cinquièmes de la fenêtre ; chaque
numéro est un point posé dessus, navy tant qu'il n'est pas atteint. Au-delà de
48 rem le rail disparaît et la grille reprend ses colonnes — c'est pourquoi
elle reste à une seule colonne jusqu'à `md` et non jusqu'à `sm`.

L'état par défaut du CSS est l'état FINAL : rail plein, points allumés. Le
script ajoute `.etapes-animees` pour reprendre la main et repartir de zéro.
Sans JavaScript ou en mouvement réduit, on obtient donc un schéma d'étapes
complet, jamais une ligne grise inerte qui aurait l'air cassée.

Le point inactif est navy et non gris : c'est déjà l'état inactif des tuiles
d'icône partout ailleurs, et un gris de plus n'aurait servi qu'ici.

Le parallax (`data-parallax`) est limité aux photos pleine largeur : l'image
est tirée à 115 % et déplacée de ±7,5 % au maximum, dans une boucle rAF unique
qui ne tourne que tant qu'une photo est à l'écran.

Un filet de sécurité montre tout si, une seconde après le chargement ou le
premier défilement, un élément présent à l'écran est encore masqué. Il se
désarme à la première apparition réussie. Sans lui, un observateur défaillant
laisserait la page vide — un défaut bien pire que l'absence d'animation.

Tout tombe sous `prefers-reduced-motion`, y compris le parallax et la cascade.

## Deux numéros distincts — ce n'est pas une erreur

_Confirmé par le client le 14 août 2026._

| Usage | Numéro | Lien |
|---|---|---|
| **Appels** | 07 56 96 60 56 | `tel:+33756966056` |
| **WhatsApp** | 07 88 30 08 95 | `wa.me/33788300895` |

Ce sont **deux lignes différentes**, volontairement. Le bouton « Appeler » et le
bouton WhatsApp de la barre mobile ne pointent donc pas vers le même numéro, et
c'est normal. Ne jamais « corriger » l'un pour le faire coïncider avec l'autre.

Les deux vivent dans `src/content/site/coordonnees.md` : `telephone.lien` /
`telephone.affichage` / `telephone.affichageInternational` d'un côté,
`whatsapp.numero` de l'autre. Seul le numéro d'appel s'affiche en clair sur le
site ; le numéro WhatsApp n'apparaît que dans l'URL du lien.

Contrôle rapide après toute modification des coordonnées :

```bash
grep -rho 'tel:[+0-9]*' dist | sort -u        # doit ne montrer que +33756966056
grep -rho 'wa\.me/[0-9]*' dist | sort -u      # doit ne montrer que 33788300895
```

## Témoignages — nominatifs sur accord écrit

_Règle modifiée le 14 août 2026. Elle remplace l'anonymisation systématique
qui prévalait jusque-là._

Un témoignage peut citer le nom du signataire et son entreprise **à la seule
condition qu'un accord écrit soit au dossier**. Format : « citation » — Nom,
Entreprise, la fonction s'intercalant si le client l'a fournie.

Le champ `valide` du contenu est le verrou : tant qu'il est à `false`, l'avis
n'est pas rendu, et la section entière disparaît si aucun avis n'est validé.
**Ne jamais le passer à `true` sans que l'accord existe** — c'est le seul
garde-fou entre un brouillon et une publication nominative.

Trois avis sont publiés depuis le 14 août 2026 (Bouygues, Vinci, Silosun),
sur déclaration du client qu'il détient les accords des trois signataires.

**Deux autorisations, pas une.** L'accord de la personne couvre son nom et ses
propos. Il ne couvre PAS l'usage du nom de son employeur comme référence
commerciale : les grands groupes encadrent cet usage par une autorisation
distincte, et beaucoup de contrats-cadres contiennent une clause de
communication. Avant d'ajouter un nouveau nom d'entreprise, vérifier que les
deux accords existent.

## Interdits
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
