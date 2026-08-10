import { useReveal } from '../hooks/useReveal.js'
import SiteFooter from '../components/SiteFooter.jsx'

// Page Studio — éditoriale et scrollable : le manifeste des deux fondateurs,
// leurs deux portraits côte à côte, puis les deux convictions du studio.
// Texte fourni par le studio (août 2026).
const FONDATEURS = [
  {
    nom: 'Nicolas Sempere',
    teinte: '#F4ECDF',
    roles: 'Réalisateur — Directeur de la photographie — Coloriste',
    bio: [
      'Depuis plus de cinq ans, je travaille l’image pour des marques comme Betclic, Better Feeling, Sephora et Showroomprivé. Chez Bel Augure, je réalise les films et dirige leur image jusqu’à l’étalonnage, pour rester fidèle à l’identité de chaque marque.',
    ],
  },
  {
    nom: 'Corentin Crestia',
    teinte: '#E6D8C1',
    roles: 'Auteur — Monteur — Motion designer',
    bio: [
      'Depuis trois ans, je travaille le montage et le motion design, notamment en interne à l’IRTS et à MJM Graphic Design. Chez Bel Augure, j’écris les films et j’en assure le montage, le travail sonore et le motion design jusqu’à leur livraison.',
    ],
  },
]

const CONVICTIONS = [
  {
    titre: 'Pourquoi ce secteur',
    paras: [
      'Dans le bien-être, l’image précède l’expérience. Elle doit en transmettre la qualité, l’attention et le caractère pour que vos clients la ressentent avant même de la vivre. C’est précisément le rôle de nos films.',
    ],
  },
  {
    // Titre en deux lignes : la coupe tombe sur la virgule, jamais au milieu
    // d'un groupe de mots.
    titre: ['Deux interlocuteurs,', 'du début à la fin'],
    paras: [
      'Nous assurons l’écriture, le tournage et la postproduction en interne. Vous échangez avec nous à chaque étape du projet.',
      'Quand la production l’exige, nous réunissons autour de nous les profils nécessaires.',
      'Cette équipe resserrée nous permet de tourner avec discrétion, même dans un établissement en activité, tout en gardant une direction claire du premier échange à la livraison.',
    ],
  },
]

export default function Studio({ onNavigate }) {
  const ref = useReveal(0.35)

  return (
    <section
      ref={ref}
      aria-label="Le studio"
      className="h-full overflow-y-auto px-6 pb-14 pt-32 md:px-16 md:pb-[7vh] md:pt-[16vh]"
    >
      <div className="mx-auto w-full max-w-[62rem]">
        {/* ── Manifeste ── */}
        <div className="text-left md:text-center">
          <p
            className="reveal-up mb-5 text-[11px] font-normal uppercase tracking-[0.3em] text-orfonce md:mb-6"
            style={{ '--d': '0.06s' }}
          >
            Studio de production — Bordeaux
          </p>
          <h1 className="font-display text-[clamp(1.9rem,5vw,3.9rem)] leading-[1.12] text-encre">
            <span className="mask" style={{ '--d': '0.12s' }}>
              <span>Derrière chaque film,</span>
            </span>
            <span className="mask" style={{ '--d': '0.2s' }}>
              <span>
                nous sommes deux<span className="text-or">.</span>
              </span>
            </span>
          </h1>

          <div
            className="reveal-up mx-auto mt-8 max-w-[44rem] space-y-4 text-[15px] font-light leading-[1.85] text-encre/80"
            style={{ '--d': '0.35s', textWrap: 'pretty' }}
          >
            <p>
              Bel Augure est un studio de production fondé à Bordeaux par Nicolas Sempere et
              Corentin Crestia. Nous créons des films de marque pour les{' '}
              <span className="font-medium text-encre">lieux et marques de bien-être haut de gamme</span>.
            </p>
            <p>
              Nous travaillons ensemble depuis quinze ans et réunissons l’écriture, la réalisation
              et la postproduction au sein du même studio.
            </p>
          </div>
        </div>

        {/* ── Les deux fondateurs : le langage des chapitres d'offres — les
            deux mêmes teintes de bande, le liseré fin, et le grand caractère
            display en tête (le monogramme joue le rôle du numéro). */}
        <div className="reveal-up mt-16 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-8" style={{ '--d': '0.5s' }}>
          {FONDATEURS.map((f) => (
            <div
              key={f.nom}
              className="rounded-xl border border-encre/12 p-7 md:p-9"
              style={{ backgroundColor: f.teinte }}
            >
              <h2 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-light leading-[1.1] text-encre">
                {f.nom}
              </h2>
              <p className="mt-3 text-[10px] font-normal uppercase tracking-[0.22em] leading-[1.9] text-orfonce">
                {f.roles}
              </p>
              <div className="mt-5 space-y-3 text-[14px] font-light leading-[1.8] text-encre/80">
                {f.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Convictions ── */}
        <div className="mt-14 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-14">
          {CONVICTIONS.map((c) => {
            const lignes = Array.isArray(c.titre) ? c.titre : [c.titre]
            return (
            <div key={lignes[0]} className="border-t border-orfonce/25 pt-7">
              <h2 className="font-display text-[clamp(1.3rem,1.9vw,1.65rem)] font-light leading-[1.2] text-encre">
                {lignes.map((l, i) => (
                  <span key={l} className="block whitespace-nowrap">
                    {l}
                    {i === lignes.length - 1 && <span className="text-or">.</span>}
                  </span>
                ))}
              </h2>
              <div className="mt-5 space-y-3 text-[14px] font-light leading-[1.8] text-encre/80">
                {c.paras.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            )
          })}
        </div>

        {/* ── Appel ── */}
        <p className="mt-14 text-center md:mt-16">
          <button
            type="button"
            onClick={() => onNavigate?.('contact')}
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-encre/45 px-8 py-3.5 text-[13px] font-normal tracking-[0.06em] text-encre transition-colors duration-300 hover:bg-encre hover:text-creme"
          >
            Parler d’un projet
          </button>
        </p>

        <SiteFooter onNavigate={onNavigate} className="pt-14" />
      </div>
    </section>
  )
}
