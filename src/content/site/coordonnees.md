---
# Téléphone et WhatsApp : valeurs réelles, fournies par le client.
# Restent à obtenir : rue, horaires, SIRET et les autres mentions légales.
# Le build liste automatiquement les champs encore vides (voir lib/content.js).
aRenseigner: false

nom: "ALPITEC"
baseline: "Entreprise de travaux en hauteur sur cordes"

telephone:
  # Affichage au format national français, plus lisible qu'un +33 pour un
  # visiteur francilien. Le lien tel:, lui, reste au format international.
  affichage: "07 88 30 08 95"
  lien: "+33788300895"

whatsapp:
  numero: "33788300895"
  message: "Bonjour, je souhaite un devis pour des travaux en hauteur."

email: "contact@alpitec.fr" # À CONFIRMER

adresse:
  rue: "" # À RENSEIGNER
  codePostal: "94400" # À CONFIRMER
  ville: "Vitry-sur-Seine"
  pays: "France"

horaires: "" # À RENSEIGNER

# Reprises de la section « Nos certifications » du document d'accueil.
certifications:
  - { label: "CQP", text: "Cordiste qualifié" }
  - { label: "IRATA", text: "Standard international" }
  - { label: "CATSC", text: "Aptitude sur cordes" }
  - { label: "CACES", text: "Conduite d'engins" }

legal:
  siret: "" # À RENSEIGNER — obligatoire dans les mentions légales
  formeJuridique: "" # À RENSEIGNER — SARL, SAS, EURL…
  capital: "" # À RENSEIGNER — montant du capital social
  rcs: "" # À RENSEIGNER — ex. « RCS Créteil 500 000 000 »
  tvaIntracom: "" # À RENSEIGNER — ex. « FR00500000000 »
  directeurPublication: "" # À RENSEIGNER — nom du représentant légal
  assurance: "Garantie décennale"
  assureur: "" # À RENSEIGNER — nom de l'assureur et n° de police
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
