import LegalPage from '../components/LegalPage.jsx'

// Mentions légales — identité de l'éditeur, hébergeur et propriété
// intellectuelle. La protection des données vit sur sa propre page
// (/confidentialite) : deux liens de pied de page, deux pages distinctes.
// Données issues du Kbis (RCS Bordeaux, 03/08/2026).
const BLOCS = [
  {
    titre: 'Éditeur',
    lignes: [
      'Bel Augure, société à responsabilité limitée au capital de 1 000 €.',
      'RCS Bordeaux 108 264 524 — TVA intracommunautaire : FR45 108 264 524.',
      'Siège social : 83 rue Marcelin Jourdan, 33200 Bordeaux.',
      'Directeur de la publication : Nicolas Sempere, gérant.',
      'Contact : nicolas@belaugure.studio · 06 68 49 95 04.',
    ],
  },
  {
    titre: 'Hébergement',
    lignes: [
      'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.',
      'Téléphone : +1 559 288 7060 — vercel.com.',
    ],
  },
  {
    titre: 'Propriété intellectuelle',
    lignes: [
      "L'ensemble du site (textes, films, photographies, identité) est la propriété de Bel Augure ou de ses clients pour les œuvres qui leur ont été cédées. Toute reproduction sans accord écrit est interdite.",
      '© Bel Augure 2026.',
    ],
  },
  {
    titre: 'Données personnelles',
    lignes: [
      'Le traitement de vos informations est décrit en détail sur la page Confidentialité.',
    ],
  },
]

export default function Mentions({ onNavigate }) {
  return (
    <LegalPage
      titre="Mentions légales"
      blocs={BLOCS}
      onNavigate={onNavigate}
      lienVue="confidentialite"
      lienLabel="Confidentialité"
    />
  )
}
