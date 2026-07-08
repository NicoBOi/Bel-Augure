import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// La carte de la maison : cinq formats, deux lignes chacun, rien d'autre.
// Les trois grands d'abord, les deux formats complémentaires en retrait.
const OFFRES = [
  {
    name: 'Héritage',
    lines: [
      'Un film de deux à trois minutes, écrit comme un récit.',
      'Trois journées de tournage. Livré en huit semaines.',
    ],
  },
  {
    name: 'Signature',
    lines: [
      "Le film central d'une maison, de 90 secondes à 2 minutes.",
      'Deux journées de tournage. Livré en six semaines.',
    ],
  },
  {
    name: 'Prélude',
    lines: [
      'Un premier film, de 45 à 60 secondes.',
      'Une journée de tournage. Livré en quatre semaines.',
    ],
  },
  {
    name: 'Saisons',
    minor: true,
    lines: [
      'Quatre films courts par an, un par saison.',
      'Une demi-journée de tournage à chaque saison.',
    ],
  },
  {
    name: 'Sur Mesure',
    minor: true,
    lines: ['Campagnes, formats longs, casting et décors.', 'Sur devis.'],
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

// Chaque nom porte la couleur de sa gamme, assombrie pour rester pleine
// sur le crème : encre pour Héritage, or profond pour Signature, bronze
// doux pour Prélude, grège pour Saisons. Sur Mesure se signale par son
// filet pointillé.
const NAME_COLORS = {
  dark: 'text-encre',
  gold: 'text-[#9c7f4e]',
  light: 'text-[#8f7d5f]',
  greige: 'text-grege',
  dashed: 'text-encre/75',
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
        <p
          className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
          style={{ '--d': '0.05s' }}
        >
          Offres
        </p>

        <p
          className="reveal-up hidden max-w-[34ch] text-right text-[12px] font-light leading-[1.8] text-grege lg:block"
          style={{ '--d': '0.25s' }}
        >
          Du sanctuaire intimiste à la grande maison du bien-être, chaque
          lieu a son exigence.
        </p>
      </div>

      {/* La carte du soir : tout centré, un nom, deux lignes, un filet
          d'or entre chaque service. Rien à survoler, rien à ouvrir. */}
      <ul aria-label="Les offres" className="mx-auto mt-14 w-full max-w-2xl text-center lg:mt-16">
        {OFFRES.map((offre, i) => (
          <li
            key={offre.name}
            className="reveal-up"
            style={{ '--d': `${0.15 + i * 0.08}s` }}
          >
            {i > 0 && (
              <span aria-hidden="true" className="mx-auto my-9 block h-px w-12 bg-or/70 md:my-10" />
            )}
            <h3
              className={`font-display leading-[1.15] ${
                offre.minor
                  ? 'text-[clamp(1.35rem,1.9vw,1.8rem)] text-encre/80'
                  : 'text-[clamp(1.9rem,3vw,2.8rem)] text-encre'
              }`}
            >
              {offre.name}
              <span className="text-or">.</span>
            </h3>
            <p className="mx-auto mt-3 max-w-[52ch] text-[13.5px] font-light leading-[1.9] text-encre/75">
              {offre.lines[0]}
              <br />
              {offre.lines[1]}
            </p>
          </li>
        ))}
      </ul>

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
