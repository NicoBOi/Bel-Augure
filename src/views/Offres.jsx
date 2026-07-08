import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Trois offres, trois cartons : la page Offres est une salle obscure et
// chaque offre passe comme un intertitre de film muet, dans son cadre à
// double filet. Un studio de cinéma présente ses offres comme un film.
const OFFRES = [
  {
    name: 'Signature',
    numeral: 'I',
    eyebrow: 'Le film central',
    desc: "Le film qui porte l'image d'une maison : son site, son accueil, ses salons. De 90 secondes à 2 minutes, écrit et tourné pour durer des années.",
    detail: 'Deux journées de tournage. Livré en six semaines.',
  },
  {
    name: 'Saisons',
    numeral: 'II',
    eyebrow: 'Le rendez-vous annuel',
    desc: 'Quatre films courts par an, un par saison, dans la même écriture. Un seul interlocuteur, toute l’année.',
    detail: 'Une demi-journée de tournage à chaque saison.',
  },
  {
    name: 'Sur Mesure',
    numeral: 'III',
    eyebrow: "L'exception",
    desc: 'Campagnes de plusieurs films, formats longs, casting et décors, droits publicitaires étendus.',
    detail: 'Le périmètre s’écrit ensemble. Sur devis.',
  },
]

// Le déroulé, en trois temps : ce que le client veut savoir avant d'écrire.
const DEROULE = [
  {
    n: '01',
    titre: "L'écriture",
    texte:
      'Un échange, un repérage, une note d’intention. Vous savez ce qui sera filmé avant le premier plan.',
  },
  {
    n: '02',
    titre: 'Le tournage',
    texte:
      "De l'équipement cinéma, une équipe à taille humaine, qui sait se faire oublier.",
  },
  {
    n: '03',
    titre: 'La livraison',
    texte:
      'Le film, ses déclinaisons, les droits pour vos canaux. Deux séries de retouches sont incluses.',
  },
]

// Les questions qui reviennent : réponses courtes, sans renvoi.
const QUESTIONS = [
  {
    q: 'Combien ça coûte ?',
    r: 'Chaque projet est devisé après un premier échange, selon le lieu et le format. Le devis est ferme, sans surprise ensuite.',
  },
  {
    q: 'Qu’attendez-vous de nous ?',
    r: 'Très peu. Un échange au départ, un contact sur place le jour du tournage. Votre maison reste ouverte.',
  },
  {
    q: 'Qui apparaît à l’écran ?',
    r: 'Votre équipe, des silhouettes castées, ou personne. Nous composons selon votre image et gérons les autorisations.',
  },
  {
    q: 'Vous déplacez-vous où ?',
    r: 'En Nouvelle-Aquitaine d’abord. Plus loin, au cas par cas : parlons-en.',
  },
  {
    q: 'Et si le résultat ne nous plaît pas ?',
    r: 'Vous validez la direction avant le premier plan, et deux séries de retouches sont incluses.',
  },
  {
    q: 'À qui appartient le film ?',
    r: 'À vous. Les droits sont cédés pour votre site, vos réseaux et votre accueil. Les usages publicitaires étendus s’écrivent au devis.',
  },
]

export default function Offres({ setDark }) {
  const ref = useReveal(0.35)
  const [index, setIndex] = useState(0)
  const offre = OFFRES[index]

  // La salle obscure : toute la page vit dans l'encre, header compris.
  useEffect(() => {
    setDark?.(true)
  }, [setDark])

  // Flèches clavier : on passe d'un carton à l'autre comme au projecteur.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % OFFRES.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + OFFRES.length) % OFFRES.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="h-full overflow-y-auto px-6 pb-14 pt-28 md:px-16 md:pb-[9vh]"
    >
      <p
        className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-sable/60"
        style={{ '--d': '0.05s' }}
      >
        Offres
      </p>

      {/* Le carton : cadre à double filet des intertitres de film muet.
          Le cadre est l'écran, il ne bouge pas — seul le contenu se
          projette, avec la grammaire du site : titres qui montent sous
          masque, révélations décalées, point d'or qui respire. */}
      <div className="reveal-up mx-auto flex min-h-[62vh] w-full max-w-3xl flex-col items-center justify-center" style={{ '--d': '0.2s' }}>
        <div className="w-full border border-creme/25 p-2 transition-colors duration-700">
          <div className="border border-creme/12 px-8 py-14 text-center md:px-16 md:py-20">
            <div key={offre.name}>
              <p className="fade-in text-[10px] font-normal uppercase tracking-[0.32em] text-sable/60" style={{ '--d': '0.05s' }}>
                {offre.eyebrow}
              </p>
              <h3 className="mt-6 font-display text-[clamp(2.6rem,5.5vw,5rem)] leading-[1.05] text-creme">
                <span className="mask" style={{ '--d': '0.1s' }}>
                  <span>
                    {offre.name}
                    <span className="dot-breathe text-or">.</span>
                  </span>
                </span>
              </h3>
              <p className="fade-in mx-auto mt-7 max-w-[46ch] text-[14px] font-light leading-[1.9] text-sable/90" style={{ '--d': '0.3s' }}>
                {offre.desc}
              </p>
              <p className="fade-in mt-5 text-[10px] font-normal uppercase tracking-[0.24em] text-sable/55" style={{ '--d': '0.45s' }}>
                {offre.detail}
              </p>
            </div>
          </div>
        </div>

        {/* Le projecteur : I · II · III, dans la langue des liens du site */}
        <div className="mt-10 flex items-center gap-8">
          <button
            type="button"
            aria-label="Offre précédente"
            onClick={() => setIndex((i) => (i - 1 + OFFRES.length) % OFFRES.length)}
            className="group cursor-pointer p-2 text-sable/50 transition-colors duration-500 hover:text-creme"
          >
            <svg
              width="26"
              height="10"
              viewBox="0 0 26 10"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
            >
              <path d="M25 5H1M1 5L5.5 1M1 5L5.5 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex items-baseline gap-6">
            {OFFRES.map((o, i) => (
              <button
                key={o.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Voir ${o.name}`}
                aria-current={i === index ? 'page' : undefined}
                className={`nav-link cursor-pointer p-1 font-display text-[17px] transition-colors duration-500 ${
                  i === index ? 'text-or' : 'text-sable/40 hover:text-sable/75'
                }`}
              >
                <span className="nav-label">{o.numeral}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Offre suivante"
            onClick={() => setIndex((i) => (i + 1) % OFFRES.length)}
            className="group cursor-pointer p-2 text-sable/50 transition-colors duration-500 hover:text-creme"
          >
            <svg
              width="26"
              height="10"
              viewBox="0 0 26 10"
              fill="none"
              aria-hidden="true"
              className="rotate-180 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
            >
              <path d="M25 5H1M1 5L5.5 1M1 5L5.5 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Le déroulé et les questions : les coulisses, toujours dans la salle */}
      <div className="mt-16 grid gap-14 border-t border-creme/12 pt-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-sable/60">
            Comment ça se passe
          </p>
          <div className="mt-8 space-y-8">
            {DEROULE.map((etape) => (
              <div key={etape.n} className="flex gap-5">
                <span className="font-display text-[15px] leading-[1.6] text-or">{etape.n}</span>
                <div>
                  <p className="font-display text-[17px] text-creme">{etape.titre}</p>
                  <p className="mt-1.5 max-w-[38ch] text-[13px] font-light leading-[1.8] text-sable/75">
                    {etape.texte}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-sable/60">
            Les questions qui reviennent
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2">
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <dt className="font-display text-[16px] leading-[1.4] text-creme">
                  {item.q}
                </dt>
                <dd className="mt-2 text-[13px] font-light leading-[1.8] text-sable/75">
                  {item.r}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
