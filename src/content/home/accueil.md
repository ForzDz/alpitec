---
title: "Accueil"
slug: "accueil"

metaTitle: "ALPITEC — Travaux en hauteur Paris & Île-de-France | Cordistes certifiés"
metaDescription: "Entreprise de travaux en hauteur sur cordes à Paris et en Île-de-France. Cordistes certifiés CQP, IRATA, CATSC & CACES. Ravalement, couverture, nettoyage, sécurisation. Devis gratuit."

# Bande de chantiers : photos de src/assets/photos/accueil/, appariées par nom
# de fichier. Une photo sans alt écrit ici n'est pas affichée.
#
# chantier-001 (« compagnon harnaché DEPUIS UNE NACELLE ») a été retirée du site
# le 13 août 2026 : elle contredisait le « sans échafaudage ni nacelle » que les
# neuf pages services revendiquent. Elle reste dans l'historique Git.
# Remplacée par chantier-025, reprise du dossier nettoyage-vitres — deux
# cordistes sur cordes, c'est le métier tel qu'il se vend.
photosAccueil:
  - fichier: "chantier-025.jpeg"
    alt: "Deux cordistes suspendus à leurs cordes le long d'une façade d'immeuble de bureaux, nettoyant les grandes baies vitrées"
  - fichier: "chantier-011.jpeg"
    alt: "Cordiste casqué, en suspension sur ses cordes, nettoyant à l'éponge un luminaire en inox fixé sur une façade en brique"
    # Photo de tête de la bande de chantiers, en pleine largeur. Choisie parce
    # qu'elle montre un cordiste sur cordes : chantier-001, première par ordre
    # de nom de fichier, montre une nacelle — l'exact contraire du « sans
    # échafaudage ni nacelle » que le site revendique sur ses 9 pages services.
    miseEnAvant: true
  - fichier: "chantier-012.jpeg"
    alt: "Cordiste suspendu à l'angle d'un immeuble de bureaux, intervenant sur les lettres de l'enseigne en façade"
  - fichier: "chantier-024.jpeg"
    alt: "Cordiste au casque jaune, suspendu à sa corde, reprenant l'enduit sous la dalle d'un balcon d'immeuble d'habitation"

hero:
  surtitre: "Cordistes certifiés · Paris & Île-de-France"
  # Raccourci le 14 août 2026 : à 320 px l'ancien titre occupait six lignes et
  # noyait le hero. « sur cordes » remplace « spécialistes » — c'est la vraie
  # différenciation du métier. « Île-de-France » quitte le H1 mais reste dans le
  # metaTitle, le surtitre, l'accroche et toute la section Zones.
  h1: "Travaux en hauteur sur cordes à Paris"
  intro: "Ravalement, couverture, nettoyage, sécurisation : ALPITEC, entreprise de travaux en hauteur, fait intervenir ses cordistes sur tous types de bâtiments à Paris et en Île-de-France — copropriétés, sites industriels, chantiers du BTP. Sans échafaudage coûteux, sans immobiliser votre immeuble."
  # Dernière phrase de `intro`, précédée de la requête cible « travaux en
  # hauteur à Paris » : sur mobile, c'est le seul sous-titre affiché, et
  # l'accroche complète qui porte la requête y est masquée. Affichée à la place
  # de cette accroche, qui fait huit lignes et repousse le bouton de devis hors
  # de l'écran.
  introCourte: "Travaux en hauteur à Paris : sans échafaudage coûteux, sans immobiliser votre immeuble."
  buttons:
    - { label: "Demander un devis gratuit", action: "devis" }
  badges:
    - "Réponse rapide"
    - "Devis gratuit"
    - "Garantie décennale"

certifications:
  title: "La sécurité au plus haut niveau"
  intro: "Tous nos cordistes sont formés et certifiés, conformément à la réglementation française du travail en hauteur. Sur nos chantiers, aucune approximation."
  items:
    - { label: "CQP", text: "Cordiste qualifié" }
    - { label: "IRATA", text: "Standard international" }
    - { label: "CATSC", text: "Aptitude sur cordes" }
    - { label: "CACES", text: "Conduite d'engins" }

services:
  title: "Un savoir-faire complet sur cordes"
  intro: "Du ravalement de façade à la sécurisation de zones à risque : des travaux acrobatiques couverts par une seule et même entreprise de travaux en hauteur, depuis plus de 15 ans en Île-de-France."
  linkLabel: "Voir le service"
  cards:
    - slug: "ravalement"
      label: "Ravalement & façades"
      text: "Nettoyage, peinture, réparation et rénovation. Un immeuble entretenu, c'est un patrimoine préservé et valorisé."
    - slug: "couverture"
      label: "Couverture & étanchéité"
      text: "Réparation, remplacement et mise hors d'eau sur tous types de toitures, y compris les plus inaccessibles."
    - slug: "nettoyage-vitres"
      label: "Nettoyage de vitres toute hauteur"
      text: "Vitrines, baies et façades vitrées, nettoyées en toute sécurité quelle que soit la hauteur du bâtiment."
    - slug: "maconnerie"
      label: "Maçonnerie, corniches & cheminées"
      text: "Petite maçonnerie en hauteur et restauration : un savoir-faire précis, pour le bâti ancien comme récent."
    - slug: "filets-protection"
      label: "Filets de protection"
      text: "Mise en sécurité des zones à risque, pose de filets anti-chute et pare-gravats conformes aux normes, pour protéger compagnons, occupants et passants."
    - slug: "pics-anti-pigeons"
      label: "Anti-pigeons"
      text: "Protection durable et discrète de vos bâtiments contre les nuisances liées aux volatiles."

    # --- Les 3 cartes ci-dessous ne figurent PAS dans le document d'accueil ---
    # Le doc n'en présente que 6. Ces accroches sont la PREMIÈRE PHRASE de
    # l'accroche du bandeau de chaque page dédiée, reprise mot pour mot :
    #   cheneaux-gouttieres.md → intro, phrase 1
    #   devegetalisation.md    → intro, phrase 1
    #   points-ancrage.md      → intro, phrase 1
    # Rien n'est réécrit, mais la troncature reste un choix éditorial :
    # à faire valider, ou à remplacer par 3 accroches courtes du client.
    - slug: "cheneaux-gouttieres"
      label: "Nettoyage de chéneaux & gouttières"
      text: "Des chéneaux bouchés, ce sont des débordements à la première grosse pluie : infiltrations, façades tachées, dégâts des eaux chez les occupants."
    - slug: "devegetalisation"
      label: "Dévégétalisation de façades"
      text: "Le lierre qui semble décorer votre façade est en train de la démolir."
    - slug: "points-ancrage"
      label: "Points d'ancrage & lignes de vie"
      text: "Toiture à entretenir, équipements techniques à maintenir, façade à nettoyer régulièrement : chaque intervention future en hauteur exige des ancrages fiables."

# ---------------------------------------------------------------------------
# BANDEAU CHIFFRES CLÉS
# « 2009 » et « 7 000+ interventions » ne figurent dans AUCUN des dix .docx.
# Ils viennent de la demande de l'étape 4, pas des sources. Les documents ne
# donnent que « plus de 15 ans » — cohérent avec 2009 (17 ans en 2026), mais
# ce sont deux affirmations factuelles publiées : à confirmer par le client.
# Les deux autres chiffres sont dérivés des documents.
# ---------------------------------------------------------------------------
chiffres:
  title: "ALPITEC en chiffres"
  aValider: true
  items:
    - valeur: "2009"
      label: "Année de création"
      source: "client"
    - valeur: "7 000+"
      label: "Interventions réalisées"
      source: "client"
    - valeur: "4"
      label: "Certifications cordistes : CQP, IRATA, CATSC, CACES"
      source: "docx"
    - valeur: "8"
      label: "Départements couverts en Île-de-France"
      source: "docx"

# ---------------------------------------------------------------------------
# MOYENS D'ACCÈS — SEUL BLOC DU SITE NON TIRÉ DES .DOCX
#
# Deux réserves, à trancher avant mise en ligne :
#
# 1. Aucun texte source. Les trois descriptions ci-dessous sont rédigées, pas
#    reprises. Elles contreviennent à la règle « ne pas inventer de contenu ».
#
# 2. Contradiction de positionnement. Les dix documents vendent ALPITEC comme
#    l'ALTERNATIVE à la nacelle et à l'échafaudage : « sans échafaudage coûteux
#    ni nacelle » figure sur les neuf pages services, et la FAQ argumente
#    « pourquoi un cordiste plutôt qu'une nacelle ». Présenter nacelle et
#    échafaudage comme des moyens ALPITEC affaiblit l'argument principal.
#    Le texte ci-dessous les cadre donc comme des compléments, jamais comme
#    l'offre principale.
#
# Passer aValider à false une fois les textes validés ou réécrits.
# ---------------------------------------------------------------------------
moyensAcces:
  title: "Le bon moyen d'accès pour chaque chantier"
  intro: "L'accès sur cordes est notre métier et couvre la grande majorité des interventions. Quand la configuration l'impose, nous mobilisons d'autres moyens : c'est le chantier qui décide, pas l'outil."
  aValider: true
  items:
    - label: "Accès sur cordes"
      text: "Notre cœur de métier. Nos cordistes accèdent directement à la zone à traiter, sans emprise au sol ni autorisation de voirie. Le chantier démarre vite et le bâtiment reste pleinement accessible."
    - label: "Nacelle"
      text: "Pour les surfaces dégagées et les interventions au sol accessible, quand le rendement prime et que l'emprise sur la voirie ne pose pas de difficulté."
    - label: "Échafaudage"
      text: "Pour les chantiers lourds et de longue durée nécessitant un poste de travail fixe sur toute la façade. Nous le mettons en œuvre quand il est réellement justifié."

process:
  title: "De la demande à l'intervention"
  intro: "Un déroulement clair et sans surprise. De votre premier appel à la livraison du chantier, vous savez exactement où vous en êtes."
  steps:
    - step: "Étape 1"
      label: "Premier contact"
      text: "Vous nous décrivez votre besoin par téléphone ou via le formulaire. Échange clair, sans engagement."
    - step: "Étape 2"
      label: "Visite technique"
      text: "Nous nous déplaçons rapidement sur site, partout en Île-de-France, pour évaluer précisément l'intervention."
    - step: "Étape 3"
      label: "Devis détaillé"
      text: "Vous recevez un devis chiffré, gratuit et transparent. Aucune surprise en cours de chantier."
    - step: "Étape 4"
      label: "Intervention"
      text: "Équipe certifiée sur site, matériel professionnel, chantier livré dans les délais convenus."

why:
  title: "Ce qui nous rend différents"
  intro: "Plus de 15 ans de savoir-faire au service de vos projets les plus complexes, de la copropriété parisienne au site industriel francilien."
  items:
    - label: "Cordistes certifiés"
      text: "Nos équipes sont titulaires des certifications CQP, IRATA, CATSC et CACES. La sécurité est la base de chaque chantier."
    - label: "Réponse rapide"
      text: "Une demande de syndic ou de conducteur de travaux ne peut pas attendre : visite technique planifiée sous quelques jours, partout en Île-de-France."
    - label: "Garantie décennale"
      text: "ALPITEC est pleinement assurée. Vous engagez une entreprise couverte, pour des travaux réalisés dans les règles de l'art."
    - label: "Tous types de donneurs d'ordre"
      text: "Syndics et copropriétés, majors du BTP, sites industriels : nous adaptons notre organisation à vos exigences de chantier."

zones:
  title: "Cordistes à Paris et partout en Île-de-France"
  paragraphs:
    - "ALPITEC est une entreprise de travaux en hauteur francilienne. Nos cordistes interviennent à Paris (75) et dans toute la région : Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Yvelines (78), Essonne (91), Val-d'Oise (95) et Seine-et-Marne (77)."
    - "Cette proximité nous permet de répondre vite, avec des équipes locales, où que se trouve votre chantier. Pour les chantiers d'envergure ou les contrats récurrents, nous étudions également les interventions partout en France."
  encart:
    label: "Prochainement en Suisse romande"
    text: "ALPITEC ouvre bientôt une antenne en Suisse romande pour accompagner ses clients à Genève, Lausanne et dans l'ensemble des cantons romands. Un projet en Suisse ? Contactez-nous dès maintenant."

testimonials:
  title: "Une réputation bâtie chantier après chantier"
  intro: "Syndics, majors du BTP, sites industriels : tous nous choisissent pour la même raison — la fiabilité."
  # Avis nominatifs depuis le 14 août 2026. Le client déclare détenir l'accord
  # écrit des trois signataires. `valide: true` engage la publication du nom et
  # de l'entreprise : ne le repasser à true sur un nouvel avis qu'une fois
  # l'accord au dossier — voir la règle « Témoignages » de CLAUDE.md.
  items:
    - quote: "Intervention d'ALPITEC sur notre data center de Clichy : préparation sérieuse, consignes de sécurité respectées à la lettre et aucune perturbation de l'exploitation du site. Une équipe fiable, que nous solliciterons de nouveau."
      nom: "El Mahi Lhimer"
      company: "Bouygues"
      valide: true
    - quote: "Dans le cadre d'un ravalement de façade, ALPITEC a réalisé la pose de filets de sécurité anti-chute pour protéger nos compagnons. Installation rapide, conforme et parfaitement adaptée aux contraintes du chantier. Très satisfait de la prestation."
      nom: "Antoine Drieux"
      company: "Vinci"
      valide: true
    - quote: "Nous avons confié à ALPITEC un chantier de couverture avec désamiantage. Le travail a été mené avec rigueur, dans le respect des délais et des protocoles. Un partenaire de confiance pour les interventions délicates."
      nom: "Pierre-Xavier Jean"
      company: "Silosun"
      valide: true

faq:
  title: "Vous hésitez ? Voici les réponses"
  items:
    - question: "Quelles sont les certifications de vos cordistes ?"
      answer: "Tous nos cordistes sont titulaires du CQP Cordiste, de la certification internationale IRATA, du CATSC et du CACES. Ces qualifications sont conformes à la réglementation française du travail en hauteur et régulièrement renouvelées."
    - question: "Dans quelles zones intervenez-vous ?"
      answer: "Nos cordistes interviennent à Paris et dans toute l'Île-de-France : petite et grande couronne, du 75 au 77. Pour les chantiers d'envergure ou les contrats récurrents, notre entreprise de travaux en hauteur intervient également partout en France, au cas par cas."
    - question: "Travaillez-vous avec les copropriétés et les syndics ?"
      answer: "Oui, les syndics et gestionnaires de copropriété représentent une part importante de notre activité en Île-de-France. Nous connaissons leurs contraintes : occupants à préserver, délais à tenir, comptes-rendus clairs à fournir."
    - question: "Intervenez-vous pour les entreprises du BTP et l'industrie ?"
      answer: "Oui. Nous travaillons pour les entreprises du bâtiment, y compris les grands groupes nationaux, ainsi que sur les sites industriels, en nous adaptant à leurs exigences de sécurité et de planning."
    - question: "Êtes-vous assurés ?"
      answer: "Oui. ALPITEC est couverte par une garantie décennale et intervient en tant qu'entreprise pleinement assurée, pour des travaux réalisés dans les règles de l'art."
    - question: "Sous quel délai puis-je obtenir un devis ?"
      answer: "Nous répondons rapidement à chaque demande : après un premier échange et une visite technique, vous recevez un devis détaillé, gratuit et sans engagement."
    - question: "Intervenez-vous en Suisse ?"
      answer: "ALPITEC ouvre prochainement une antenne en Suisse romande. Si vous avez un projet à Genève, Lausanne ou ailleurs en Suisse romande, contactez-nous dès maintenant : nous étudions déjà les demandes."

contact:
  title: "Demandez votre devis gratuit"
  text: "Remplissez le formulaire ou appelez-nous directement : nous vous rappelons rapidement pour qualifier votre projet."
  reassurance:
    - "Réponse rapide à chaque demande"
    - "Devis gratuit et sans engagement"
    - "Cordistes certifiés CQP, IRATA, CATSC, CACES"
    - "Garantie décennale"
    - "Paris & Île-de-France"
  form:
    title: "Décrivez votre projet en 1 minute"
    subtitle: "Plus vous nous donnez de détails, plus notre devis sera précis."
    fields:
      - "Prénom"
      - "Nom"
      - "Email"
      - "Téléphone"
      - "Type de projet (liste déroulante)"
      - "Ville d'intervention"
      - "Décrivez votre besoin (zone de texte)"
    submitLabel: "Envoyer ma demande"
    legalNote: "Vos données restent confidentielles."
---

<!-- Source : _sources/docs/ALPITEC-IDF-accueil.docx -->
<!--
ÉCARTS VOLONTAIRES (règle « Interdits » de CLAUDE.md — témoignages anonymisés,
jamais de nom de personne ni d'entreprise cliente) :

1. Section 7, avis clients. Le document signe les 3 témoignages nom + entreprise :
   « El Mahi Lhimer, Bouygues », « Antoine Drieux, Vinci »,
   « Pierre-Xavier Jean, Silosun ». Les citations sont conservées mot pour mot,
   les signatures sont supprimées. La fonction de chaque signataire n'est pas
   connue et n'a pas été inventée : elle reste à confirmer par le client.
   `valide: false` sur les trois — aucun ne doit être rendu tant que le client
   n'a pas fourni la fonction et l'accord écrit que son propre document exige.

2. FAQ, question 4. Le document écrit : « y compris les grands groupes comme
   Bouygues ou Vinci ». Les deux noms sont remplacés par « les grands groupes
   nationaux ». Le reste de la réponse est inchangé.

À noter : le témoignage 1 mentionne « notre data center de Clichy ». Ce n'est pas
un nom d'entreprise, mais l'information reste identifiante — à valider avec le
client avant mise en ligne.
-->
