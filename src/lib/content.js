import { getCollection, getEntry } from 'astro:content';

let avertissementEmis = false;

/**
 * Coordonnées du site (téléphone, WhatsApp, adresse, mentions).
 * Source unique : src/content/site/coordonnees.md — jamais en dur dans un composant.
 */
export async function getSite() {
  const entry = await getEntry('site', 'coordonnees');
  const d = entry.data;

  if (!avertissementEmis) {
    // Vérification par champ plutôt que par drapeau global : le téléphone peut
    // être renseigné alors que le SIRET manque encore. Un seul booléen aurait
    // éteint l'alerte sur tout le reste.
    const manquants = [
      ['adresse.rue', d.adresse.rue],
      ['horaires', d.horaires],
      ['legal.siret', d.legal.siret],
      ['legal.formeJuridique', d.legal.formeJuridique],
      ['legal.capital', d.legal.capital],
      ['legal.rcs', d.legal.rcs],
      ['legal.tvaIntracom', d.legal.tvaIntracom],
      ['legal.directeurPublication', d.legal.directeurPublication],
      ['legal.assureur', d.legal.assureur],
    ]
      .filter(([, valeur]) => !String(valeur ?? '').trim())
      .map(([champ]) => champ);

    if (manquants.length > 0 || d.aRenseigner) {
      avertissementEmis = true;
      console.warn(
        '\n⚠️  ALPITEC — src/content/site/coordonnees.md, champs encore vides :\n' +
          manquants.map((c) => `   · ${c}`).join('\n') +
          '\n   Les mentions légales sont incomplètes tant qu\'ils le sont.\n',
      );
    }
  }

  return d;
}

let avertissementAccueilEmis = false;
/** Évite de répéter le même avertissement de photo à chaque page rendue. */
const photosSignalees = new Set();

/**
 * Contenu de la page d'accueil.
 *
 * Signale au build tout bloc dont la copie n'est pas validée : chiffres clés
 * absents des .docx, moyens d'accès rédigés, témoignages sans fonction connue.
 */
export async function getAccueil() {
  const entry = await getEntry('home', 'accueil');
  const d = entry.data;

  if (!avertissementAccueilEmis) {
    const alertes = [];
    if (d.chiffres.aValider) {
      const duClient = d.chiffres.items.filter((i) => i.source === 'client').map((i) => i.valeur);
      alertes.push(`chiffres clés absents des .docx : ${duClient.join(', ')}`);
    }
    if (d.moyensAcces.aValider) {
      alertes.push('bloc « Moyens d\'accès » : copie rédigée, sans source .docx');
    }
    const nonValides = d.testimonials.items.filter((t) => !t.valide).length;
    if (nonValides > 0) {
      alertes.push(`${nonValides} témoignage(s) sans fonction confirmée ni accord écrit`);
    }

    if (alertes.length > 0) {
      avertissementAccueilEmis = true;
      console.warn(
        '\n⚠️  ALPITEC — page d\'accueil, contenu à valider avant mise en ligne :\n' +
          alertes.map((a) => `   · ${a}`).join('\n') +
          '\n   Détail et provenance : commentaires de src/content/home/accueil.md\n',
      );
    }
  }

  return d;
}

/** Les 9 services, triés par le champ `ordre`. */
export async function getServices() {
  const services = await getCollection('services');
  return services.sort((a, b) => a.data.ordre - b.data.ordre);
}

/**
 * Les autres services, hors celui passé en argument.
 * C'est ce qui permet à OtherServices de n'avoir aucune liste manuelle.
 */
export async function getOtherServices(slugCourant) {
  const services = await getServices();
  return services.filter((s) => s.data.slug !== slugCourant);
}

/** URL d'une page service. */
export function serviceHref(slug) {
  return `/services/${slug}`;
}

/**
 * Résout l'action symbolique d'un bouton de contenu (`devis` / `tel`) en URL.
 * Les fichiers Markdown ne connaissent ni le numéro ni l'ancre du formulaire.
 */
export function actionHref(action, site) {
  if (action === 'tel') return `tel:${site.telephone.lien}`;
  return '#devis';
}

/** Lien WhatsApp pré-rempli. */
export function whatsappHref(site) {
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(site.whatsapp.message)}`;
}

/* -------------------------------------------------------------------------- */
/* Photos de chantier                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Photos du site, lues dans src/assets/photos/<dossier>/.
 *
 * C'est bien src/assets/ et non _sources/ : _sources/ garde le matériel brut
 * du client (docx, vidéos originales, photos non triées) et reste hors du
 * dépôt Git, alors que ces images-ci sont des ressources de production dont
 * le build a besoin. Un glob sur _sources/ ferait échouer le déploiement.
 *
 * Un dossier par prestation, plus « accueil » pour la bande de chantiers.
 * Déposer un fichier suffit à le rendre disponible : aucune liste à tenir.
 */
const fichiersPhotos = import.meta.glob(
  '/src/assets/photos/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

/**
 * Photos d'un service, prêtes pour <Image>.
 *
 * @param slug     dossier de src/assets/photos/
 * @param legendes tableau `photos` du contenu : { fichier, alt, caption }
 * @param max      nombre maximum de photos affichées
 */
export function getServicePhotos(slug, legendes = [], max = 4) {
  const prefixe = `/src/assets/photos/${slug}/`;

  const trouvees = Object.entries(fichiersPhotos)
    .filter(([chemin]) => chemin.startsWith(prefixe))
    .sort(([a], [b]) => a.localeCompare(b, 'fr', { numeric: true }))
    .map(([chemin, module]) => {
      const fichier = chemin.slice(prefixe.length);
      const legende = legendes.find((l) => l.fichier === fichier);
      return { src: module.default, fichier, alt: legende?.alt, caption: legende?.caption };
    });

  /*
   * Une photo sans texte alternatif écrit n'est pas affichée.
   *
   * Deux raisons. D'abord un alt générique répété sur toutes les images ne sert
   * ni l'accessibilité ni le référencement — la règle est un alt qui décrit
   * cette photo-là. Ensuite, laisser passer un alt vide ferait échouer le build
   * (<Image> d'Astro l'exige) : le client qui dépose une photo sans éditer le
   * frontmatter casserait le site sans comprendre pourquoi.
   *
   * La galerie complète alors avec ses tuiles navy, et le build dit quoi faire.
   */
  const sansAlt = trouvees.filter((p) => !p.alt?.trim());
  if (sansAlt.length > 0) {
    const cle = `${slug}:${sansAlt.map((p) => p.fichier).join(',')}`;
    if (!photosSignalees.has(cle)) {
      photosSignalees.add(cle);
      console.warn(
        `\n⚠️  ALPITEC — ${slug} : ${sansAlt.length} photo(s) sans texte alternatif, non affichée(s) :\n` +
          sansAlt.map((p) => `   · ${p.fichier}`).join('\n') +
          `\n   Ajouter dans src/content/services/${slug}.md, section « realisations » :\n` +
          `     photos:\n       - fichier: "${sansAlt[0].fichier}"\n         alt: "Décrire ce que montre la photo"\n`,
      );
    }
  }

  return trouvees.filter((p) => p.alt?.trim()).slice(0, max);
}
