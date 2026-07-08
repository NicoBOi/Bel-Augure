import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import VimeoBackground from '../components/VimeoBackground.jsx'

// Vidéo d'exemple montrée dans chaque offre en attendant les films du
// studio : identifiant Vimeo, lu en mode background.
const VIMEO_ID = '961941216'

const TIERS = [
  {
    name: 'Prélude',
    desc: "Une journée de tournage, un film d'une minute. Assez pour voir ce que votre maison donne à l'écran.",
    specs: [
      ['Le film', '45 à 60 secondes'],
      ['Le tournage', 'Une journée, un lieu'],
      ['Les déclinaisons', 'Écran et mobile'],
    ],
    meta: 'Livré en quatre semaines',
    tone: 'light',
  },
  {
    name: 'Signature',
    desc: "Deux journées de tournage. Le film central d'une maison : site, accueil, salons. C'est le cœur de notre métier, et la raison du nom.",
    specs: [
      ['Le film', '90 secondes à 2 minutes'],
      ['Le tournage', "Deux journées, jusqu'à deux lieux"],
      ['Les déclinaisons', 'Écran, mobile et réseaux'],
    ],
    meta: 'Livré en six semaines',
    tone: 'gold',
  },
  {
    name: 'Héritage',
    desc: 'Trois journées, des entretiens, vos archives. Pour les maisons qui se transmettent.',
    specs: [
      ['Le film', 'Deux à trois minutes, écrit comme un récit'],
      ['Le tournage', "Trois journées, jusqu'à trois lieux"],
      ['Les déclinaisons', 'Des réseaux au master 4K cinéma'],
    ],
    meta: 'Livré en huit semaines',
    tone: 'dark',
  },
  {
    name: 'Saisons',
    desc: "Quatre films courts, un par saison, dans la même écriture. Un seul interlocuteur, toute l'année.",
    specs: [
      ['Les films', 'Quatre par an, 15 à 30 secondes'],
      ['Le tournage', 'Une demi-journée par saison'],
      ['Les déclinaisons', 'Deux formats par film'],
    ],
    meta: 'Engagement annuel',
    tone: 'greige',
  },
  {
    name: 'Sur Mesure',
    desc: 'Plusieurs lieux, plusieurs films, une saison entière de tournage. Nous écrivons le périmètre ensemble.',
    specs: [
      ['Le projet', 'Plusieurs films, formats longs'],
      ['La production', 'Casting, décors, droits étendus'],
    ],
    meta: 'Sur devis',
    tone: 'dashed',
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

// Chaque offre garde la couleur de gamme de ses anciennes cartes, portée
// par un cartouche devant le nom : sable, or, encre, grège, et le trait
// pointillé pour Sur Mesure. Le nom reste en encre, pleine lisibilité.
const CHIPS = {
  light: 'bg-sable border border-encre/15',
  gold: 'bg-or',
  dark: 'bg-encre',
  greige: 'bg-grege',
  dashed: 'border border-dashed border-encre/50',
}

// Planches : en attendant les stills étalonnés de chaque format, une
// matière cinéma sombre propre à chaque offre, teintée de sa gamme.
const STILLS = {
  light: 'bg-[linear-gradient(135deg,#3a322a,#1a1512_62%)]',
  gold: 'bg-[linear-gradient(135deg,#4a3d28,#1a1512_66%)]',
  dark: 'bg-[linear-gradient(135deg,#241d17,#0e0b09_72%)]',
  greige: 'bg-[linear-gradient(135deg,#4c4436,#1a1512_66%)]',
  dashed: 'bg-[linear-gradient(135deg,#2e2820,#1a1512_62%)]',
}


export default function Offres({ setDark }) {
  const ref = useReveal(0.35)
  // Diptyque : l'offre survolée à gauche habite le panneau de droite.
  // Sa boucle vidéo se monte au premier passage et reste en place.
  const [focusTier, setFocusTier] = useState(TIERS[0])
  const [awake, setAwake] = useState(() => new Set([TIERS[0].name]))

  const wake = (name) =>
    setAwake((prev) => {
      if (prev.has(name)) return prev
      const next = new Set(prev)
      next.add(name)
      return next
    })

  const focusOn = (tier) => {
    setFocusTier(tier)
    wake(tier.name)
  }

  useEffect(() => {
    setDark?.(false)
  }, [setDark])

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="flex h-full flex-col justify-start overflow-y-auto px-6 pb-14 pt-28 md:pb-[9vh] md:px-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.15] text-encre">
            <span className="mask" style={{ '--d': '0.12s' }}>
              <span>
                Offres<span className="text-or">.</span>
              </span>
            </span>
          </h2>
        </div>

        <p
          className="reveal-up hidden max-w-[34ch] text-right text-[12px] font-light leading-[1.8] text-grege lg:block"
          style={{ '--d': '0.25s' }}
        >
          Du sanctuaire intimiste à la grande maison du bien-être, chaque
          lieu a son exigence.
        </p>
      </div>

      {/* Le diptyque : les noms à gauche comme un sommaire, et à droite un
          grand panneau qui prend la matière de l'offre survolée — boucle
          vidéo, specs posées dessus. On choisit comme en galerie. */}
      <div
        className="reveal-up mt-8 grid items-stretch gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-8"
        style={{ '--d': '0.25s' }}
      >
        <ul aria-label="Les offres" className="flex flex-col justify-center lg:col-span-4">
          {TIERS.map((tier) => {
            const focused = focusTier.name === tier.name
            return (
              <li key={tier.name} className="border-b border-encre/10 first:border-t">
                <button
                  type="button"
                  onMouseEnter={() => focusOn(tier)}
                  onFocus={() => focusOn(tier)}
                  className="group block w-full cursor-default py-5 text-left md:py-6"
                >
                  <span className="flex items-center gap-4">
                    {/* Cartouche de gamme : il s'étire quand l'offre est en focus */}
                    <span
                      aria-hidden="true"
                      className={`block h-3 shrink-0 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        focused ? 'w-9' : 'w-5 opacity-70'
                      } ${CHIPS[tier.tone]}`}
                    />
                    <span
                      className={`block font-display text-[clamp(1.7rem,2.4vw,2.3rem)] leading-[1.1] tracking-[0.04em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        focused ? 'translate-x-1 text-encre' : 'text-encre/55'
                      }`}
                    >
                      {tier.name}
                      <span
                        className={`text-or transition-opacity duration-300 ${
                          focused ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        .
                      </span>
                    </span>
                  </span>
                  {/* Sur mobile, pas de panneau : l'essentiel vit sous le nom */}
                  <span className="mt-1.5 block text-[12px] font-light leading-[1.7] text-grege lg:hidden">
                    {tier.specs.map(([, value]) => value).join(' · ')}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <div
          aria-hidden="true"
          className="relative hidden min-h-[460px] overflow-hidden rounded-3xl lg:col-span-8 lg:block"
        >
          {/* Matières et boucles : toutes montées, seule celle en focus est visible */}
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`absolute inset-0 transition-opacity duration-700 ${
                focusTier.name === tier.name ? 'opacity-100' : 'opacity-0'
              } ${STILLS[tier.tone]}`}
            >
              {awake.has(tier.name) && (
                <VimeoBackground
                  id={VIMEO_ID}
                  title={`Boucle ${tier.name}`}
                  className="absolute inset-0 h-full w-full"
                />
              )}
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-encre/80 via-encre/15 to-transparent" />

          <div key={focusTier.name} className="fade-in absolute inset-x-0 bottom-0 p-10">
            <p className="max-w-[52ch] text-[13.5px] font-light leading-[1.85] text-creme/90">
              {focusTier.desc}
            </p>
            <div className="mt-6">
              {focusTier.specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline gap-6 border-t border-creme/12 py-3 first:border-t-0"
                >
                  <span className="w-40 shrink-0 text-[9px] font-normal uppercase tracking-[0.28em] text-sable/60">
                    {label}
                  </span>
                  <span className="text-[14px] font-light text-creme">{value}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[10px] font-normal uppercase tracking-[0.2em] text-sable/65">
              {focusTier.meta}
            </p>
          </div>
        </div>
      </div>

      {/* Le déroulé et les questions : rassurer l'hésitant avant l'email */}
      <div className="mt-16 grid gap-14 border-t border-encre/10 pt-14 lg:grid-cols-12 lg:gap-8">
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
