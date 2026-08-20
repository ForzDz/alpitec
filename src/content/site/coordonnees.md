---
# Téléphone et WhatsApp : valeurs réelles, fournies par le client.
# Restent à obtenir : rue, horaires, SIRET et les autres mentions légales.
# Le build liste automatiquement les champs encore vides (voir lib/content.ts).
aRenseigner: false

nom: "ALPITEC"
baseline: "Entreprise de travaux en hauteur sur cordes"

telephone:
  # Affichage au format national français, plus lisible qu'un +33 pour un
  # visiteur francilien. Le lien tel:, lui, reste au format international.
  affichage: "07 56 96 60 56"
  # Format international, affiché sur le bouton d'appel du hero : le CTA doit
  # se lire comme un numéro joignable depuis n'importe où, pas seulement en
  # Île-de-France.
  affichageInternational: "+33 7 56 96 60 56"
  lien: "+33756966056"

whatsapp:
  numero: "33788300895"
  message: "Bonjour, je souhaite un devis pour des travaux en hauteur."

email: "contact@alpitec.fr"

# Adresse de l'ÉTABLISSEMENT de Vitry-sur-Seine : c'est le site d'exploitation
# francilien, celui qu'on met en avant sur le site et dans le schema.org.
# ⚠️ Ce n'est PAS le siège social — voir `legal.siegeSocial` plus bas.
adresse:
  rue: "36 bis rue Henri Matisse"
  codePostal: "94400"
  ville: "Vitry-sur-Seine"
  pays: "France"

# Horaires fournis par le client le 19 août 2026.
# `horaires` est la version LUE PAR LE VISITEUR ; `horairesSchema` est la
# version machine, au format schema.org, celle que Google exploite pour le
# référencement local. Les deux doivent rester cohérentes.
# ⚠️ Le client a donné la plage 7h-19h sans préciser les jours. « Mo-Sa » est
# une hypothèse (semaine BTP classique) : à faire confirmer, un jour erroné
# enverrait un prospect devant une porte close.
horaires: "Du lundi au samedi, 7h – 19h"
horairesSchema: "Mo-Sa 07:00-19:00"

# Reprises de la section « Nos certifications » du document d'accueil.
certifications:
  - { label: "CQP", text: "Cordiste qualifié" }
  - { label: "IRATA", text: "Standard international" }
  - { label: "CATSC", text: "Aptitude sur cordes" }
  - { label: "CACES", text: "Conduite d'engins" }

# ---------------------------------------------------------------------------
# MENTIONS LÉGALES
# ---------------------------------------------------------------------------
# Renseignées le 16 août 2026 à partir des trois documents fournis par le
# client : Extrait Kbis (greffe de Créteil, à jour au 29/03/2024) et les deux
# attestations MAAF (décennale et RC Pro, établies le 03/01/2025).
#
# Ce que les documents NE contiennent PAS, et qui reste à obtenir :
#   · capital social            (obligatoire pour une SAS)
#   · directeur de publication  (le Kbis d'établissement secondaire ne nomme
#                                pas le président)
#   · SIRET                     (le Kbis ne donne que le SIREN, il manque le
#                                NIC à 5 chiffres de l'établissement de Vitry)
#   · médiateur de la consommation
#   · horaires
# ---------------------------------------------------------------------------
legal:
  siren: "984 029 983"
  # SIRET = SIREN + NIC de l'établissement. Le NIC n'est sur aucun document.
  siret: "" # À RENSEIGNER — SIREN connu, NIC à 5 chiffres manquant
  formeJuridique: "Société par actions simplifiée (SAS)"
  capital: "" # À RENSEIGNER — absent des trois documents
  rcs: "RCS Marseille 984 029 983"
  # ⚠️ CALCULÉ, PAS LU. Aucun document ne porte le numéro de TVA. Celui-ci est
  # dérivé du SIREN par l'algorithme officiel — clé = (12 + 3 × (SIREN mod 97))
  # mod 97 = 12 — et vaut donc pour toute entreprise assujettie. À faire
  # confirmer par le client : s'il relève de la franchise en base, il n'en a pas.
  tvaIntracom: "FR12984029983"
  directeurPublication: "" # À RENSEIGNER — non nommé sur le Kbis fourni
  # Le siège social est à MARSEILLE. Vitry-sur-Seine est l'établissement
  # secondaire, immatriculé au greffe de Créteil sous le n° de gestion
  # 2024B02850. Les mentions légales doivent porter le siège, pas l'exploitation.
  siegeSocial:
    rue: "Dockissimo Bâtiment B2, 412 boulevard National"
    codePostal: "13003"
    ville: "Marseille"
  assurance: "Responsabilité civile professionnelle et garantie décennale"
  assureur: "MAAF Assurances S.A."
  # Un seul contrat multirisque couvre la RC Pro et la décennale.
  policeContrat: "Multirisque professionnelle du bâtiment et des travaux publics"
  policeNumero: "194103183 R - MCE - 001"
  policeDecennale: "194103183 R 001"
  # ⚠️ Les deux attestations fournies couvrent le 01/01/2025 → 31/12/2025.
  # Elles sont EXPIRÉES. Demander les attestations de l'exercice en cours
  # avant toute mise en ligne.
  assuranceValidite: "01/01/2025 – 31/12/2025"
  mediateur: "" # À RENSEIGNER — obligatoire (art. L.612-1 code de la consommation)
  hebergeur:
    nom: "Netlify, Inc."
    adresse: "512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis"
    site: "https://www.netlify.com"
  liens:
    - { label: "Mentions légales", href: "/mentions-legales" }
    - { label: "Politique de confidentialité", href: "/confidentialite" }
  copyright: "ALPITEC — Tous droits réservés"
---

<!-- Coordonnées absentes des sources : à obtenir du client (voir rapport étape 1). -->
