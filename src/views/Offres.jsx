import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Trois offres, trois natures, trois échelles : le film central d'une
// maison, le rendez-vous des saisons, et ce qui sort du cadre. La page
// les descend en cascade, comme l'escalier éditorial des pages Films et
// Studio — la taille et l'indentation disent la hiérarchie.
const OFFRES = [
  {
    name: 'Signature',
    eyebrow: 'Le film central',
    desc: "Le film qui porte l'image d'une maison : son site, son accueil, ses salons. De 90 secondes à 2 minutes.",
    detail: 'Deux journées de tournage. Livré en six semaines.',
    size: 'text-[clamp(3rem,6.5vw,6rem)]',
    indent: '',
    delay: '0.1s',
  },
  {
    name: 'Saisons',
    eyebrow: 'Le rendez-vous annuel',
    desc: 'Quatre films courts par an, un par saison, dans la même écriture.',
    detail: 'Une demi-journée de tournage à chaque saison.',
    size: 'text-[clamp(2.2rem,4vw,3.6rem)]',
    indent: 'md:ml-[26vw]',
    delay: '0.22s',
  },
  {
    name: 'Sur Mesure',
    eyebrow: "L'exception",
    desc: 'Campagnes, formats longs, casting et décors.',
    detail: 'Le périmètre s’écrit ensemble. Sur devis.',
    size: 'text-[clamp(1.7rem,2.9vw,2.7rem)]',
    indent: 'md:ml-[10vw]',
    delay: '0.34s',
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

  useEffect(() => {
    setDark?.(false)
  }, [setDark])

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="flex h-full flex-col justify-start overflow-y-auto px-6 pb-14 pt-28 md:pb-[9vh] md:px-16"
    >
      <p
        className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
        style={{ '--d': '0.05s' }}
      >
        Offres
      </p>

      {/* La cascade : chaque offre descend d'un cran et d'une taille.
          Le nom en didone porte la scène, le texte se tient dans sa marge. */}
      <div className="mt-10 space-y-14 md:mt-14 md:space-y-16">
        {OFFRES.map((offre) => (
          <div
            key={offre.name}
            className={`reveal-up ${offre.indent}`}
            style={{ '--d': offre.delay }}
          >
            <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
              {offre.eyebrow}
            </p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-baseline md:gap-10">
              <h3 className={`font-display leading-[1.02] text-encre ${offre.size}`}>
                {offre.name}
                <span className="text-or">.</span>
              </h3>
              <div className="max-w-[46ch] md:pb-1">
                <p className="text-[13.5px] font-light leading-[1.85] text-encre/80">
                  {offre.desc}
                </p>
                <p className="mt-2 text-[10.5px] font-normal uppercase tracking-[0.2em] text-grege">
                  {offre.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Le déroulé et les questions : rassurer l'hésitant avant l'email */}
      <div className="mt-20 grid gap-14 border-t border-encre/10 pt-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
            Comment ça se passe
          </p>
          <div className="mt-8 space-y-8">
            {DEROULE.map((etape) => (
              <div key={etape.n} className="flex gap-5">
                <span className="font-display text-[15px] leading-[1.6] text-or">{etape.n}</span>
                <div>
                  <p className="font-display text-[17px] text-encre">{etape.titre}</p>
                  <p className="mt-1.5 max-w-[38ch] text-[13px] font-light leading-[1.8] text-encre/75">
                    {etape.texte}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
            Les questions qui reviennent
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2">
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <dt className="font-display text-[16px] leading-[1.4] text-encre">
                  {item.q}
                </dt>
                <dd className="mt-2 text-[13px] font-light leading-[1.8] text-encre/75">
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
