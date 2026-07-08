import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Trois offres, trois natures, trois échelles : le film central d'une
// maison, le rendez-vous des saisons, et ce qui sort du cadre. La page
// les descend en cascade, comme l'escalier éditorial des pages Films et
// Studio — la taille et l'indentation disent la hiérarchie.
const OFFRES = [
  {
    name: 'Signature',
    eyebrow: 'Le film central',
    desc: "Le film qui porte l'image d'une maison : son site, son accueil, ses salons. De 90 secondes à 2 minutes, écrit et tourné pour durer des années.",
    detail: 'Deux journées de tournage. Livré en six semaines.',
    tint: 'bg-or/25',
  },
  {
    name: 'Saisons',
    eyebrow: 'Le rendez-vous annuel',
    desc: 'Quatre films courts par an, un par saison, dans la même écriture. Un seul interlocuteur, toute l’année.',
    detail: 'Une demi-journée de tournage à chaque saison.',
    tint: 'bg-grege/15',
  },
  {
    name: 'Sur Mesure',
    eyebrow: "L'exception",
    desc: 'Campagnes de plusieurs films, formats longs, casting et décors, droits publicitaires étendus.',
    detail: 'Le périmètre s’écrit ensemble. Sur devis.',
    tint: 'bg-sable/60',
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
  // Une seule offre déployée à la fois : Signature ouvre la page.
  const [open, setOpen] = useState('Signature')

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

      {/* L'accordéon éditorial : trois lignes nues. Celle qu'on ouvre se
          déploie seule, dans sa matière — jamais plus d'une offre à lire. */}
      <div className="reveal-up mt-10 md:mt-12" style={{ '--d': '0.15s' }}>
        {OFFRES.map((offre) => {
          const isOpen = open === offre.name
          return (
            <div key={offre.name} className="border-t border-encre/10 last:border-b">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : offre.name)}
                aria-expanded={isOpen}
                className="group flex w-full cursor-pointer items-baseline justify-between gap-6 py-7 text-left md:py-8"
              >
                <span className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <span
                    className={`font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.05] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'text-encre' : 'text-encre/45 group-hover:text-encre/75'
                    }`}
                  >
                    {offre.name}
                    <span
                      className={`text-or transition-opacity duration-300 ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      .
                    </span>
                  </span>
                  <span
                    className={`text-[10px] font-normal uppercase tracking-[0.28em] transition-colors duration-500 ${
                      isOpen ? 'text-grege' : 'text-grege/50'
                    }`}
                  >
                    {offre.eyebrow}
                  </span>
                </span>
                {/* Croix fine : + fermé, × ouvert */}
                <span aria-hidden="true" className="relative block h-4 w-4 shrink-0 self-center">
                  <span
                    className={`absolute left-0 top-1/2 h-px w-4 bg-encre/60 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 h-px w-4 bg-encre/60 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'rotate-[135deg]' : 'rotate-90'
                    }`}
                  />
                </span>
              </button>

              <div className="offer-panel" data-open={isOpen}>
                <div className="offer-panel-inner">
                  <div className={`mb-8 rounded-2xl p-7 md:p-9 ${offre.tint}`}>
                    <p className="max-w-[56ch] text-[14.5px] font-light leading-[1.9] text-encre/85">
                      {offre.desc}
                    </p>
                    <p className="mt-4 text-[10.5px] font-normal uppercase tracking-[0.2em] text-encre/60">
                      {offre.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
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
