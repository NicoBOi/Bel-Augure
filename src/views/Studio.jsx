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
      'Depuis plus de 5 ans, je travaille entre production, entreprise et freelance, notamment pour Betclic, Better Feeling, Sephora et Showroomprivé. Chez Bel Augure, je réalise les films et dirige la photographie, du premier échange à l’étalonnage, afin que chaque image serve le récit et reste fidèle à votre marque.',
    ],
  },
  {
    nom: 'Corentin Crestia',
    teinte: '#E6D8C1',
    roles: 'Auteur — Monteur — Motion designer',
    bio: [
      'Depuis trois ans, je conçois des contenus pour le corporate et l’événementiel. Chez Bel Augure, j’écris les films, puis j’en assure le montage, le sound design et les finitions en motion design afin de préserver l’intention du projet jusqu’à sa livraison.',
    ],
  },
]

const CONVICTIONS = [
  {
    titre: 'Pourquoi ce secteur',
    paras: [
      'Dans l’hôtellerie et le bien-être, l’image doit transmettre une expérience avant la visite ou l’achat. Pourtant, beaucoup de films montrent un lieu ou un produit sans parvenir à en faire ressentir la singularité.',
      'Nous réunissons une image exigeante et une narration précise pour créer des films qui donnent envie de vivre cette expérience.',
    ],
  },
  {
    // Titre en deux lignes : la coupe tombe sur la virgule, jamais au milieu
    // d'un groupe de mots.
    titre: ['Deux interlocuteurs,', 'du début à la fin'],
    paras: [
      'Nous réalisons l’écriture, le tournage et la postproduction en interne. Nous sommes tous les deux présents à chaque étape importante du projet.',
      'Lorsque la production le demande, nous constituons une équipe adaptée : techniciens, comédiens ou équipe dédiée aux coulisses.',
      'Cette organisation légère nous permet de travailler avec discrétion, y compris dans des établissements en activité, tout en maintenant une direction claire du premier échange à la livraison.',
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
              Corentin Crestia. Nous concevons des films de marque pour l’hôtellerie et le
              bien-être haut de gamme.
            </p>
            <p>
              Nous nous connaissons depuis quinze ans. Après avoir développé séparément nos
              métiers, nous avons créé Bel Augure pour réunir l’écriture, la réalisation et la
              postproduction au sein d’un même studio.
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
