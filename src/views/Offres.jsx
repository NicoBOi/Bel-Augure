import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Trois offres, trois cartons : la page Offres est une salle obscure et
// chaque offre passe comme un intertitre de film muet, dans son cadre à
// double filet. Un studio de cinéma présente ses offres comme un film.
// Trois offres, trois mondes : choisir une offre change la page entière
// de matière — l'or pâle de Signature, le grège de Saisons, l'encre de
// Sur Mesure. La hiérarchie n'est pas un style de texte, c'est la pièce
// qui change de lumière.
const OFFRES = [
  {
    name: 'Signature',
    eyebrow: 'Le film central',
    desc: "Le film qui porte l'image d'une maison : son site, son accueil, ses salons. De 90 secondes à 2 minutes, écrit et tourné pour durer des années.",
    detail: 'Deux journées de tournage. Livré en six semaines.',
    bgColor: 'rgb(217 198 166 / 0.45)',
    ink: false,
  },
  {
    name: 'Saisons',
    eyebrow: 'Le rendez-vous annuel',
    desc: 'Quatre films courts par an, un par saison, dans la même écriture. Un seul interlocuteur, toute l’année.',
    detail: 'Une demi-journée de tournage à chaque saison.',
    bgColor: '#6e6350',
    ink: true,
  },
  {
    name: 'Sur Mesure',
    eyebrow: "L'exception",
    desc: 'Campagnes de plusieurs films, formats longs, casting et décors, droits publicitaires étendus.',
    detail: 'Le périmètre s’écrit ensemble. Sur devis.',
    bgColor: '#1a1512',
    ink: true,
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
  const ink = offre.ink

  // Le header suit la lumière de la pièce : crème sur grège et encre,
  // encre sur l'or pâle.
  useEffect(() => {
    setDark?.(ink)
  }, [ink, setDark])

  // Flèches clavier : on passe d'une offre à l'autre.
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
      className="flex h-full flex-col justify-start overflow-y-auto px-6 pb-14 pt-28 transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-16 md:pb-[9vh]"
      style={{ backgroundColor: offre.bgColor }}
    >
      <p
        className={`reveal-up text-[11px] font-normal uppercase tracking-[0.3em] transition-colors duration-700 ${
          ink ? 'text-sable/60' : 'text-grege'
        }`}
        style={{ '--d': '0.05s' }}
      >
        Offres
      </p>

      {/* Le sélecteur : les trois noms, dans la langue des liens du site */}
      <nav aria-label="Choisir une offre" className="reveal-up mt-10 md:mt-12" style={{ '--d': '0.15s' }}>
        <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
          {OFFRES.map((o, i) => (
            <li key={o.name}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index ? 'true' : undefined}
                className={`nav-link cursor-pointer py-2 font-display text-[clamp(1.15rem,1.6vw,1.5rem)] transition-colors duration-500 ${
                  i === index
                    ? ink
                      ? 'text-creme'
                      : 'text-encre'
                    : ink
                      ? 'text-sable/45 hover:text-sable/80'
                      : 'text-encre/40 hover:text-encre/70'
                }`}
              >
                <span className="nav-label">
                  {o.name}
                  <span
                    className={`text-or transition-opacity duration-300 ${
                      i === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    .
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* La scène : grand titre sous masque, texte en colonnes, comme un
          détail de film — mais la pièce entière a changé de lumière. */}
      <div key={offre.name} className="mt-10 flex-1 md:mt-14">
        <p
          className={`fade-in text-[11px] font-normal uppercase tracking-[0.3em] ${
            ink ? 'text-sable/60' : 'text-grege'
          }`}
          style={{ '--d': '0.05s' }}
        >
          {offre.eyebrow}
        </p>
        <h3
          className={`mt-4 font-display text-[clamp(2.8rem,6.5vw,6rem)] leading-[1.02] ${
            ink ? 'text-creme' : 'text-encre'
          }`}
        >
          <span className="mask" style={{ '--d': '0.1s' }}>
            <span>
              {offre.name}
              <span className="dot-breathe text-or">.</span>
            </span>
          </span>
        </h3>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <p
            className={`fade-in max-w-[52ch] text-[14px] font-light leading-[1.9] lg:col-span-6 ${
              ink ? 'text-sable/90' : 'text-encre/80'
            }`}
            style={{ '--d': '0.3s' }}
          >
            {offre.desc}
          </p>
          <p
            className={`fade-in text-[10.5px] font-normal uppercase tracking-[0.22em] lg:col-span-4 lg:col-start-9 lg:self-end lg:text-right ${
              ink ? 'text-sable/55' : 'text-grege'
            }`}
            style={{ '--d': '0.45s' }}
          >
            {offre.detail}
          </p>
        </div>
      </div>

      {/* Le déroulé et les questions : dans la lumière de l'offre choisie */}
      <div
        className={`mt-16 grid gap-14 border-t pt-14 transition-colors duration-700 lg:grid-cols-12 lg:gap-8 ${
          ink ? 'border-creme/12' : 'border-encre/10'
        }`}
      >
        <div className="lg:col-span-4">
          <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${ink ? 'text-sable/60' : 'text-grege'}`}>
            Comment ça se passe
          </p>
          <div className="mt-8 space-y-8">
            {DEROULE.map((etape) => (
              <div key={etape.n} className="flex gap-5">
                <span className="font-display text-[15px] leading-[1.6] text-or">{etape.n}</span>
                <div>
                  <p className={`font-display text-[17px] ${ink ? 'text-creme' : 'text-encre'}`}>{etape.titre}</p>
                  <p className={`mt-1.5 max-w-[38ch] text-[13px] font-light leading-[1.8] ${ink ? 'text-sable/75' : 'text-encre/75'}`}>
                    {etape.texte}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className={`text-[11px] font-normal uppercase tracking-[0.3em] ${ink ? 'text-sable/60' : 'text-grege'}`}>
            Les questions qui reviennent
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2">
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <dt className={`font-display text-[16px] leading-[1.4] ${ink ? 'text-creme' : 'text-encre'}`}>
                  {item.q}
                </dt>
                <dd className={`mt-2 text-[13px] font-light leading-[1.8] ${ink ? 'text-sable/75' : 'text-encre/75'}`}>
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
