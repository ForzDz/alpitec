import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * IMPORTANT — emplacement du fichier
 * Astro 7 a supprimé les « legacy content collections » : un fichier
 * src/content/config.ts déclenche l'erreur LegacyContentConfigError et bloque
 * le build. La config vit donc ici, à src/content.config.ts.
 * Les fichiers de contenu, eux, restent bien dans src/content/services/.
 */

/* -------------------------------------------------------------------------- */
/* Briques réutilisables                                                      */
/* -------------------------------------------------------------------------- */

/** Un couple libellé + texte : « Nettoyage de façade — Élimination des... » */
const itemSchema = z.object({
  label: z.string(),
  text: z.string(),
});

/** Une étape du « Comment ça marche ». */
const stepSchema = z.object({
  /** « Étape 1 » — repris tel quel des documents client. */
  step: z.string(),
  /** « Diagnostic & devis » */
  label: z.string(),
  text: z.string(),
});

/** Un bouton d'appel à l'action. `action` est résolue par le composant. */
const buttonSchema = z.object({
  label: z.string(),
  action: z.enum(['devis', 'tel']),
});

/** Une question / réponse. Rendue en <h3> dans la page. */
const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

/* -------------------------------------------------------------------------- */
/* Sections d'une page service                                                */
/* -------------------------------------------------------------------------- */

/**
 * Les sections suivent l'ordre d'affichage imposé par les documents client.
 * Chaque type correspond à un bloc identifié dans les .docx :
 *   keyFacts     → « 2. Infos clés »
 *   expertise    → « 3. Notre expertise »
 *   process      → « 4. Comment ça marche »
 *   audiences    → « 5. Adapté à vos enjeux »
 *   zones        → « 6. Zones d'intervention »
 *   realisations → « 7. Réalisations » (galerie, légendes à fournir)
 *   cta          → « 9. Bloc d'appel final »
 */
const sectionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('keyFacts'),
    items: z.array(itemSchema),
  }),
  z.object({
    type: z.literal('expertise'),
    title: z.string(),
    intro: z.string(),
    items: z.array(itemSchema),
  }),
  z.object({
    type: z.literal('process'),
    title: z.string(),
    steps: z.array(stepSchema),
  }),
  z.object({
    type: z.literal('audiences'),
    title: z.string(),
    items: z.array(itemSchema),
  }),
  z.object({
    type: z.literal('zones'),
    title: z.string(),
    paragraphs: z.array(z.string()),
  }),
  z.object({
    type: z.literal('realisations'),
    title: z.string(),
    /**
     * Légendes et textes alternatifs, appariés par nom de fichier aux images
     * réellement présentes dans _sources/photos/{slug}/.
     * Tableau vide = la galerie affiche les photos trouvées avec un alt générique.
     */
    photos: z
      .array(
        z.object({
          fichier: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
          /**
           * Photo de tête de la galerie, affichée en pleine largeur.
           * Sans ce drapeau c'est la première par ordre de nom de fichier, ce
           * qui n'est le choix de personne. Une seule par service.
           */
          miseEnAvant: z.boolean().optional(),
        }),
      )
      .default([]),
  }),
  z.object({
    type: z.literal('cta'),
    title: z.string(),
    text: z.string(),
    buttons: z.array(buttonSchema),
  }),
]);

/* -------------------------------------------------------------------------- */
/* Collection « services » — 9 pages                                          */
/* -------------------------------------------------------------------------- */

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    /** Nom complet du service. */
    title: z.string(),
    /** Segment d'URL : /services/{slug} */
    slug: z.string(),
    /** Position dans les listes et menus. */
    ordre: z.number().int().positive(),
    /** Libellé court, tel qu'employé dans les listes « Nos autres services ». */
    shortLabel: z.string(),

    /* SEO */
    metaTitle: z.string(),
    metaDescription: z.string(),

    /* Bandeau d'accueil de la page */
    surtitre: z.string(),
    h1: z.string(),
    /** L'accroche du bandeau. */
    intro: z.string(),
    heroButtons: z.array(buttonSchema),
    heroBadges: z.array(z.string()).default([]),

    /* Corps de page */
    sections: z.array(sectionSchema),
    /** Le H2 de la section 8, propre à chaque document client. */
    faqTitle: z.string(),
    faq: z.array(faqSchema),

    /**
     * Visuel du service. `icon` est une clé symbolique résolue par le
     * composant ; `image` pointera vers _sources/photos/{slug} une fois le tri
     * des photos terminé.
     */
    iconOrImage: z.object({
      icon: z.string(),
      image: z.string().optional(),
      alt: z.string().optional(),
    }),

    /** Cette page sert de landing Google Ads (contraintes de conversion). */
    landingAds: z.boolean().default(false),
  }),
});

/* -------------------------------------------------------------------------- */
/* Collection « home » — la page d'accueil                                    */
/* -------------------------------------------------------------------------- */

const home = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),

    /**
     * Photos de la bande de chantiers, lues dans _sources/photos/accueil/ et
     * appariées par nom de fichier. Même règle que les services : pas d'alt
     * écrit, pas d'affichage.
     */
    photosAccueil: z
      .array(
        z.object({
          fichier: z.string(),
          alt: z.string(),
          /**
           * Photo placée en tête de la bande de chantiers, en pleine largeur.
           * Sans ce drapeau, c'est la première par ordre de nom de fichier —
           * ce qui n'est pas un choix éditorial. Une seule doit le porter.
           */
          miseEnAvant: z.boolean().optional(),
        }),
      )
      .default([]),

    hero: z.object({
      surtitre: z.string(),
      h1: z.string(),
      /** Accroche complète du document, affichée à partir de `sm`. */
      intro: z.string(),
      /**
       * Version courte pour mobile, où l'accroche complète écrase la page et
       * repousse le CTA sous la ligne de flottaison. Doit être une phrase
       * extraite telle quelle de `intro`, jamais une reformulation.
       */
      introCourte: z.string(),
      buttons: z.array(buttonSchema),
      badges: z.array(z.string()),
    }),

    certifications: z.object({
      title: z.string(),
      intro: z.string(),
      items: z.array(itemSchema),
    }),

    /**
     * Les cartes services de l'accueil. `slug` fait le lien vers la collection
     * services : aucune liste de noms n'est dupliquée côté composant.
     */
    services: z.object({
      title: z.string(),
      intro: z.string(),
      linkLabel: z.string(),
      cards: z.array(
        z.object({
          slug: z.string(),
          label: z.string(),
          text: z.string(),
        }),
      ),
    }),

    /**
     * Bandeau chiffres clés.
     * `aValider` : deux valeurs (année de création, nombre d'interventions) ne
     * figurent dans AUCUN des dix .docx — elles viennent de la demande du
     * client, pas de ses documents. Le build avertit tant que c'est le cas.
     */
    chiffres: z.object({
      title: z.string(),
      aValider: z.boolean().default(true),
      items: z.array(
        z.object({
          valeur: z.string(),
          label: z.string(),
          source: z.enum(['docx', 'client']),
        }),
      ),
    }),

    /**
     * Pourquoi les cordes — argumentaire comparatif face à l'échafaudage et
     * à la nacelle. Copie fournie directement par le client le 16 août 2026,
     * pas tirée des .docx : elle n'a donc pas de drapeau `aValider`, le
     * client en est l'auteur.
     *
     * Cette section précède immédiatement « Moyens d'accès » et la prépare :
     * les cordes d'abord, les autres moyens quand le chantier l'impose.
     */
    pourquoiCordes: z.object({
      title: z.string(),
      intro: z.string(),
      items: z.array(itemSchema),
    }),

    /**
     * Moyens d'accès.
     * ATTENTION : aucun texte source. C'est le seul bloc du site dont la copie
     * n'est pas tirée des .docx. Voir le commentaire dans accueil.md.
     */
    moyensAcces: z.object({
      title: z.string(),
      intro: z.string(),
      aValider: z.boolean().default(true),
      items: z.array(itemSchema),
    }),

    process: z.object({
      title: z.string(),
      intro: z.string(),
      steps: z.array(stepSchema),
    }),

    why: z.object({
      title: z.string(),
      intro: z.string(),
      items: z.array(itemSchema),
    }),

    zones: z.object({
      title: z.string(),
      paragraphs: z.array(z.string()),
      encart: z.object({ label: z.string(), text: z.string() }),
    }),

    /**
     * Témoignages ANONYMISÉS (règle CLAUDE.md) : jamais de nom de personne ni
     * d'entreprise cliente. `role` et `company` décrivent une fonction et un
     * type d'entreprise, rien d'identifiant.
     *
     * `valide` verrouille l'affichage : tant qu'il est à false, le composant ne
     * doit pas rendre le témoignage. Les documents client fournissent des avis
     * signés nom + entreprise, et demandent eux-mêmes l'accord écrit de chaque
     * personne citée avant mise en ligne. La fonction exacte de chaque
     * signataire n'est pas connue : elle doit être confirmée par le client.
     */
    testimonials: z.object({
      title: z.string(),
      intro: z.string(),
      items: z.array(
        z.object({
          quote: z.string(),
          /**
           * Nom du signataire. Ne se remplit que sur accord écrit de la
           * personne ET de son employeur — voir la règle dans CLAUDE.md.
           */
          nom: z.string(),
          /** Entreprise citée. Même condition que `nom`. */
          company: z.string(),
          /** Fonction, si le client l'a fournie. */
          role: z.string().optional(),
          /**
           * Verrou de publication : tant qu'il est faux, l'avis n'est pas
           * rendu. Il ne passe à vrai qu'une fois l'accord écrit au dossier.
           */
          valide: z.boolean().default(false),
        }),
      ),
    }),

    faq: z.object({
      title: z.string(),
      items: z.array(faqSchema),
    }),

    contact: z.object({
      title: z.string(),
      text: z.string(),
      reassurance: z.array(z.string()),
      form: z.object({
        title: z.string(),
        subtitle: z.string(),
        fields: z.array(z.string()),
        submitLabel: z.string(),
        legalNote: z.string(),
      }),
    }),
  }),
});

/* -------------------------------------------------------------------------- */
/* Collection « site » — coordonnées et mentions                              */
/* -------------------------------------------------------------------------- */

/**
 * Les coordonnées ne figurent dans AUCUN des dix .docx fournis. Elles vivent
 * ici plutôt qu'en dur dans Header / Footer / barre mobile, qui les consomment
 * tous les trois. `aRenseigner` reste à true tant que le client n'a pas donné
 * les vraies valeurs : le build émet alors un avertissement.
 */
const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: z.object({
    nom: z.string(),
    baseline: z.string(),

    telephone: z.object({
      affichage: z.string(),
      /** Format international espacé, affiché sur le bouton d'appel du hero */
      affichageInternational: z.string(),
      /** Format E.164, utilisé pour href="tel:" */
      lien: z.string(),
    }),
    whatsapp: z.object({
      /** Numéro sans espaces ni +, utilisé pour wa.me */
      numero: z.string(),
      message: z.string(),
    }),
    email: z.string(),

    adresse: z.object({
      rue: z.string(),
      codePostal: z.string(),
      ville: z.string(),
      pays: z.string(),
    }),

    horaires: z.string(),

    certifications: z.array(itemSchema),

    legal: z.object({
      siret: z.string(),
      formeJuridique: z.string(),
      capital: z.string().default(''),
      rcs: z.string().default(''),
      tvaIntracom: z.string().default(''),
      directeurPublication: z.string().default(''),
      assurance: z.string(),
      assureur: z.string().default(''),
      hebergeur: z
        .object({ nom: z.string(), adresse: z.string(), site: z.string() })
        .default({ nom: 'Netlify, Inc.', adresse: '', site: 'https://www.netlify.com' }),
      liens: z.array(z.object({ label: z.string(), href: z.string() })),
      copyright: z.string(),
    }),

    /** true tant que des valeurs sont des espaces réservés. */
    aRenseigner: z.boolean().default(true),
  }),
});

/* -------------------------------------------------------------------------- */
/* Collection « pages » — pages légales et éditoriales                        */
/* -------------------------------------------------------------------------- */

/**
 * Le corps Markdown porte tout le texte. Les mentions marquées
 * « [À COMPLÉTER : … ] » sont signalées au build tant qu'elles subsistent.
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    h1: z.string(),
    /** Date de dernière mise à jour, affichée en tête de page. */
    maj: z.coerce.date(),
    noindex: z.boolean().default(false),
  }),
});

/* -------------------------------------------------------------------------- */
/* Collection « blog » — vide, prête à recevoir des .md                       */
/* -------------------------------------------------------------------------- */

/**
 * Aucun article pour l'instant. Déposer un .md dans src/content/blog/ avec ce
 * frontmatter suffit : la page de liste et le gabarit d'article existent déjà.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    h1: z.string(),
    /** Chapô affiché dans la liste et en tête d'article. */
    resume: z.string(),
    datePublication: z.coerce.date(),
    dateMaj: z.coerce.date().optional(),
    auteur: z.string().default('ALPITEC'),
    /** Slug d'un service de la collection `services`, pour le maillage interne. */
    serviceLie: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { services, home, site, pages, blog };
