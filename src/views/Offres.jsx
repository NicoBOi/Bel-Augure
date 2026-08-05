import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Page /offres — présentation éditoriale. Une vue d'ensemble en tête (les
// différences se lisent immédiatement : label, ce qu'on achète, usage, prix),
// puis les trois offres détaillées empilées et séparées par de grands espaces
// et de très subtils changements de fond. Pas de cartes commerciales, pas
// d'icônes, pas de couleur propre à chaque offre : la hiérarchie est portée
// par la typographie et le vide.
const OFFERS = [
  {
    id: 'film',
    num: '01',
    name: 'Film Signature',
    label: 'Un film central',
    pitch: 'Un projet ponctuel pour installer, révéler ou renouveler l’univers d’une marque.',
    usage: 'Pour une ouverture, un repositionnement ou un nouveau souffle.',
    price: 'À partir de 5 500 € HT',
    tint: '#F3EADC',
    accroche: 'Faites ressentir ce qui vous distingue.',
    description: [
      'Nous partons de votre vision, de vos gestes, de vos produits ou de votre lieu pour créer le film central de votre communication. Une pièce forte, entièrement pensée pour vous, conçue pour porter durablement votre image.',
    ],
    receiveTitle: 'Ce que comprend le projet',
    receive: [
      'Un film de marque sur mesure de 60 à 90 secondes',
      'Selon le périmètre retenu, une ou deux versions horizontales de 30 et 15 secondes',
      'La conception, l’écriture, la direction artistique et les repérages',
      'Un à deux jours de tournage, dans les lieux définis pour le projet',
      'Le montage, la création sonore et l’étalonnage, réalisés au studio',
      'Une musique licenciée, choisie pour le film',
    ],
    cadre: [
      'Première version présentée sous deux semaines après le tournage',
      'Deux séries de retours incluses',
      'Droits d’utilisation inclus pendant deux ans en France : site internet, réseaux sociaux, présentations et salons',
      'Votre projet est suivi directement par les deux fondateurs',
    ],
    extensionsTitle: 'Extensions possibles',
    extensionsIntro: 'Définies et chiffrées dans la proposition.',
    extensionGroups: [
      {
        label: 'Création',
        items: ['Déclinaisons verticales', 'Voix off', 'Musique originale', 'Prises de vues aériennes'],
      },
      { label: 'Production', items: ['Journée de tournage supplémentaire'] },
      {
        label: 'Droits d’utilisation',
        items: ['Télévision, affichage ou cinéma', 'Diffusion internationale', 'Durée d’utilisation étendue'],
      },
    ],
    cta: 'Prendre rendez-vous',
  },
  {
    id: 'histoires',
    num: '02',
    name: 'Histoires de marque',
    label: 'Des récits ciblés',
    pitch: 'Un ou plusieurs films courts pour révéler un soin, un produit, un geste, une personne ou un lieu.',
    usage: 'Pour une communication régulière, plusieurs sujets à valoriser.',
    price: 'À partir de 3 500 € HT',
    priceNote: 'pour une histoire',
    tint: '#E9DDCB',
    description: [
      'Des films courts qui mettent en lumière ce qui fait votre marque. Selon votre besoin : une histoire seule, une collection pensée d’un bloc, ou un partenariat qui installe un rythme sur la saison.',
    ],
    formatsTitle: 'Trois façons de travailler',
    formats: [
      {
        label: 'Une histoire',
        price: 'À partir de 3 500 € HT',
        desc: 'Un film autonome consacré à un sujet précis.',
        usage: 'Pour mettre en lumière une expérience, un produit, une personne ou un savoir-faire.',
      },
      {
        label: 'Une collection',
        tag: 'Format conseillé',
        price: 'À partir de 8 500 € HT',
        desc: 'Trois histoires imaginées et tournées ensemble autour de plusieurs facettes de la marque.',
        usage: 'Pour construire une prise de parole cohérente tout en optimisant la production.',
      },
      {
        label: 'Un partenariat saisonnier',
        price: 'À partir de 3 000 € HT / mois · engagement de trois mois',
        desc: 'Une nouvelle collection planifiée sur trois mois, avec des livraisons progressives.',
        usage: 'Engagement d’une saison, renouvelable d’un commun accord.',
      },
    ],
    receiveTitle: 'Ce que comprend chaque histoire',
    receive: [
      'Un format principal et une adaptation verticale ou horizontale de chaque film',
      'Un à deux extraits courts issus de chaque histoire',
      'Le montage, la création sonore et l’étalonnage, réalisés au studio',
      'Les musiques licenciées pour les usages prévus',
    ],
    cadre: [
      'Tournages groupés, généralement une à deux journées par vague',
      'Deux séries de retours regroupées par vague',
      'Droits d’utilisation inclus pendant deux ans à compter de chaque livraison, selon les supports définis dans la proposition',
      'Casting, stylisme, maquillage, décors, déplacements et moyens techniques supplémentaires chiffrés séparément',
    ],
    cta: 'Prendre rendez-vous',
  },
  {
    id: 'campagne',
    num: '03',
    name: 'Campagne Sensorielle',
    label: 'Un dispositif complet',
    pitch: 'Une campagne audiovisuelle conçue autour d’une ouverture, d’un lancement ou d’une nouvelle identité.',
    usage: 'Pour un temps fort à fort enjeu.',
    price: 'À partir de 15 000 € HT',
    tint: '#F3EADC',
    accroche: 'Donnez à votre prochain temps fort toute son ampleur.',
    description: [
      'Pour une ouverture, un lancement ou une nouvelle identité, nous imaginons l’idée qui donnera sa cohérence à toute votre prise de parole.',
      'Elle prend vie dans un film principal, plusieurs films courts et les formats conçus pour vos différents supports. Chaque création a son propre rôle : annoncer, révéler ou prolonger le lancement. Ensemble, elles forment une campagne immédiatement reconnaissable.',
    ],
    receiveTitle: 'Ce que comprend la campagne',
    receive: [
      'Une idée directrice et une direction créative commune',
      'Un film principal de 60 à 90 secondes',
      'Une série de trois films courts minimum, de 15 à 30 secondes',
      'Les adaptations horizontales et verticales prévues pour les supports retenus',
      'La conception, l’écriture, la direction artistique et la préparation du tournage',
      'La production et la postproduction de l’ensemble',
      'Les musiques licenciées pour les usages prévus',
    ],
    receiveNote: [
      'Les films courts sont conçus comme des pièces à part entière, et non comme de simples extraits du film principal.',
      'Le nombre de films, leurs durées et leurs formats sont définis précisément dans la proposition.',
    ],
    rhythm: {
      title: 'Photographie de campagne',
      body: [
        'Une série photographique peut être imaginée dans la même direction artistique et réalisée pendant la production avec un photographe partenaire.',
        'Selon le concept retenu, le casting, le stylisme, la coiffure-maquillage, les décors, les prises de vues aériennes, la musique originale et les moyens techniques particuliers sont définis et chiffrés dès la proposition.',
      ],
    },
    cadre: [
      'Un calendrier construit à partir de votre date de lancement',
      'Environ huit à dix semaines entre la validation de la proposition et la livraison finale',
      'Validation de l’idée et du traitement créatif avant le tournage',
      'Deux séries de retours regroupées en postproduction',
      'Une campagne suivie directement par les deux fondateurs',
      'Droits d’utilisation inclus pendant deux ans en France : site internet, réseaux sociaux et campagnes digitales sponsorisées',
      'Télévision, affichage, cinéma, international ou durée étendue chiffrés dès la proposition',
    ],
    note: 'Chaque campagne fait l’objet d’une proposition dédiée.',
    cta: 'Écrire au studio',
  },
]

// Bloc transverse (bas de page) — commun aux trois offres.
const PROCESS = [
  {
    t: 'Un échange de trente minutes',
    d: 'Votre projet, votre échéance, votre budget. Nous vous disons ce qui est possible.',
  },
  {
    t: 'Une proposition détaillée',
    d: 'Livrables, calendrier, prix : tout est écrit avant de commencer.',
  },
  {
    t: 'Le tournage',
    d: 'Une équipe légère, deux à trois personnes, dans le respect de votre lieu et de vos clients.',
  },
  {
    t: 'La livraison',
    d: 'Postproduction entièrement réalisée au studio. Deux allers-retours de validation inclus.',
  },
]

const DIFFUSION = {
  title: 'La diffusion, en clair',
  body: 'Tous nos prix incluent deux ans d’utilisation en France, sur le digital et les réseaux sociaux. Télévision, affichage, cinéma, international ou durée étendue : ces usages sont définis et chiffrés dès la proposition.',
}

// Palette — page entièrement claire (encre sur papier chaud). Plus de mode
// sombre par offre : la distinction passe par la typographie et l'espace.
const DASH = 'bg-orfonce/70'
const RULE = 'border-orfonce/20'

function DashList({ items, className = '' }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3.5 text-[14px] font-light leading-[1.55] text-encre/85">
          <span aria-hidden="true" className={`mt-[0.62em] h-px w-4 shrink-0 ${DASH}`} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Offres({ setDark, onNavigate }) {
  const ref = useReveal(0.35)

  // La page vit dans la lumière : on force l'en-tête clair et on le laisse
  // ainsi (aucune bascule sombre selon l'offre).
  useEffect(() => {
    setDark?.(false)
  }, [setDark])

  const goContact = (name) => onNavigate?.('contact', { offer: name })

  const scrollToDetail = (id) => {
    document.getElementById(`detail-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const cta =
    'inline-flex cursor-pointer items-center justify-center rounded-full border border-encre/55 px-8 py-3.5 text-[13px] font-normal tracking-[0.06em] text-encre transition-colors duration-500 hover:border-encre hover:bg-encre hover:text-creme'

  return (
    <section
      ref={ref}
      aria-label="Offres"
      className="h-full overflow-y-auto scroll-smooth px-6 pt-28 md:px-16"
      style={{ backgroundColor: '#EFE4D5' }}
    >
      <h1 className="sr-only">Nos offres — Bel Augure</h1>

      {/* ── Intro ── */}
      <div className="reveal-up mx-auto w-full max-w-[1180px]" style={{ '--d': '0.08s' }}>
        <p className="mt-4 text-[11px] font-normal uppercase tracking-[0.32em] text-orfonce md:mt-8">
          Trois façons de travailler ensemble
        </p>
        <p className="mt-4 max-w-[24ch] font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-[1.15] text-encre">
          Un film fondateur. Un univers qui vit. Un déploiement complet.
        </p>
      </div>

      {/* ── Vue d'ensemble : les trois offres, lisibles d'emblée ── */}
      <div className="reveal-up mx-auto mt-14 w-full max-w-[1180px] md:mt-20" style={{ '--d': '0.14s' }}>
        {OFFERS.map((o) => (
          <div
            key={o.id}
            className={`grid gap-6 border-t py-10 md:grid-cols-[7rem_1fr] md:gap-14 md:py-12 ${RULE}`}
          >
            {/* Repère : numéro + label — sur mobile, le label vient avant tout */}
            <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-3">
              <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light tabular-nums leading-none text-orfonce/40">
                {o.num}
              </span>
              <span className="text-[10.5px] font-normal uppercase tracking-[0.26em] text-orfonce">
                {o.label}
              </span>
            </div>

            <div>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.3rem)] font-light leading-[1.1] text-encre">
                {o.name}
              </h2>
              <p className="mt-3 max-w-[46ch] text-[clamp(0.98rem,1.5vw,1.15rem)] font-light leading-[1.5] text-encre/85">
                {o.pitch}
              </p>
              <p className="mt-2 max-w-[46ch] text-[13px] font-light leading-[1.6] text-encre/55">
                {o.usage}
              </p>

              <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-3">
                <span className="text-[15px] font-normal tracking-[0.01em] text-encre">
                  {o.price}
                  {o.priceNote && (
                    <span className="ml-2 text-[12px] font-light text-encre/55">{o.priceNote}</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => scrollToDetail(o.id)}
                  className="group/link inline-flex cursor-pointer items-center gap-2 text-[11.5px] font-normal uppercase tracking-[0.18em] text-orfonce transition-colors duration-300 hover:text-encre"
                >
                  Voir le détail
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className={`border-t ${RULE}`} />
      </div>

      {/* ── Détails empilés ── */}
      {OFFERS.map((o) => (
        <div
          key={o.id}
          id={`detail-${o.id}`}
          className="-mx-6 scroll-mt-24 px-6 py-20 md:-mx-16 md:px-16 md:py-28"
          style={{ backgroundColor: o.tint }}
        >
          <article className="mx-auto w-full max-w-[1180px]">
            {/* En-tête d'offre */}
            <header className={`border-t pt-10 ${RULE}`}>
              <div className="flex items-baseline gap-5">
                <span className="font-display text-[clamp(2.2rem,6vw,4rem)] font-light tabular-nums leading-none text-orfonce/25">
                  {o.num}
                </span>
                <span className="text-[11px] font-normal uppercase tracking-[0.28em] text-orfonce">
                  {o.label}
                </span>
              </div>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3rem)] font-light leading-[1.05] text-encre">
                {o.name}
              </h2>
              <p className="mt-4 max-w-[40ch] text-[15px] font-normal tracking-[0.01em] text-encre">
                {o.price}
                {o.priceNote && <span className="ml-2 text-[13px] font-light text-encre/55">{o.priceNote}</span>}
              </p>
            </header>

            <div className="mt-10 grid gap-x-16 gap-y-12 lg:grid-cols-12">
              {/* Colonne de lecture */}
              <div className="lg:col-span-7">
                {o.accroche && (
                  <p className="max-w-[24ch] text-[clamp(1.4rem,2.4vw,2rem)] font-light leading-[1.2] text-encre">
                    {o.accroche}
                  </p>
                )}
                <div className={`max-w-[56ch] space-y-4 text-[15px] font-light leading-[1.8] text-encre/80 ${o.accroche ? 'mt-6' : ''}`}>
                  {o.description.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {/* Histoires : les trois formats comme choix distincts */}
                {o.formats && (
                  <div className={`mt-10 border-t pt-8 ${RULE}`}>
                    <h3 className="text-[11px] font-normal uppercase tracking-[0.28em] text-encre/70">
                      {o.formatsTitle}
                    </h3>
                    <div className="mt-6 space-y-7">
                      {o.formats.map((f) => (
                        <div key={f.label} className={`border-l-2 pl-5 ${f.tag ? 'border-orfonce' : 'border-orfonce/25'}`}>
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="font-display text-[clamp(1.15rem,1.8vw,1.4rem)] font-light leading-[1.15] text-encre">
                              {f.label}
                            </span>
                            {f.tag && (
                              <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-orfonce">
                                — {f.tag}
                              </span>
                            )}
                          </div>
                          <p className="mt-2 max-w-[52ch] text-[14px] font-light leading-[1.6] text-encre/85">
                            {f.desc}
                          </p>
                          <p className="mt-1.5 max-w-[52ch] text-[13px] font-light leading-[1.6] text-encre/55">
                            {f.usage}
                          </p>
                          <p className="mt-2.5 text-[13.5px] font-normal text-encre">{f.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ce que comprend le projet / la campagne / chaque histoire */}
                {o.receive && (
                  <div className={`mt-10 border-t pt-8 ${RULE}`}>
                    <h3 className="text-[11px] font-normal uppercase tracking-[0.28em] text-encre/70">
                      {o.receiveTitle}
                    </h3>
                    <DashList items={o.receive} className="mt-5" />
                    {o.receiveNote && (
                      <div className="mt-5 max-w-[56ch] space-y-2.5 text-[12.5px] font-light leading-[1.7] text-encre/60">
                        {o.receiveNote.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Section prose (Photographie de campagne) */}
                {o.rhythm && (
                  <div className={`mt-8 border-t pt-8 ${RULE}`}>
                    <h3 className="text-[11px] font-normal uppercase tracking-[0.28em] text-encre/70">
                      {o.rhythm.title}
                    </h3>
                    <div className="mt-5 max-w-[56ch] space-y-4 text-[14px] font-light leading-[1.75] text-encre/80">
                      {o.rhythm.body.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Colonne latérale : cadre, extensions, note, appel à l'action */}
              <div className="lg:col-span-5">
                {o.cadre && (
                  <div className={`border-t pt-8 ${RULE} lg:border-t-0 lg:pt-0`}>
                    <h3 className="text-[11px] font-normal uppercase tracking-[0.28em] text-encre/70">
                      Le cadre
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {o.cadre.map((it) => (
                        <li key={it} className="flex items-start gap-3.5 text-[13.5px] font-light leading-[1.55] text-encre/70">
                          <span aria-hidden="true" className={`mt-[0.62em] h-px w-4 shrink-0 ${DASH}`} />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {o.extensionGroups && (
                  <div className={`mt-8 border-t pt-8 ${RULE}`}>
                    <h3 className="text-[11px] font-normal uppercase tracking-[0.28em] text-encre/70">
                      {o.extensionsTitle}
                    </h3>
                    {o.extensionsIntro && (
                      <p className="mt-2 text-[12.5px] font-light leading-[1.6] text-encre/60">
                        {o.extensionsIntro}
                      </p>
                    )}
                    <div className="mt-5 space-y-5">
                      {o.extensionGroups.map((g) => (
                        <div key={g.label}>
                          <p className="text-[10px] font-normal uppercase tracking-[0.22em] text-orfonce/70">
                            {g.label}
                          </p>
                          <DashList items={g.items} className="mt-3" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {o.note && (
                  <p className={`mt-8 border-t pt-8 text-[13px] font-light italic leading-[1.7] text-encre/70 ${RULE}`}>
                    {o.note}
                  </p>
                )}

                <div className="mt-8">
                  <button type="button" onClick={() => goContact(o.name)} className={cta}>
                    {o.cta}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      ))}

      {/* ── Bloc transverse : comment nous travaillons ── */}
      <div className="mx-auto w-full max-w-[1180px] pb-40 lg:pb-24">
        <div className={`mt-16 border-t pt-14 ${RULE}`}>
          <h2 className="text-[11px] font-normal uppercase tracking-[0.3em] text-encre/70">
            Comment nous travaillons
          </h2>
          <ol className="mt-8 grid gap-x-14 gap-y-9 sm:grid-cols-2">
            {PROCESS.map((step, i) => (
              <li key={step.t} className="flex items-start gap-4">
                <span className="font-display text-[13px] tabular-nums text-orfonce">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-display text-[16px] leading-[1.35] text-encre">{step.t}</span>
                  <span className="mt-1.5 block text-[13px] font-light leading-[1.7] text-encre/75">
                    {step.d}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className={`mt-12 border-t pt-8 ${RULE}`}>
            <h3 className="font-display text-[16px] leading-[1.4] text-encre">{DIFFUSION.title}</h3>
            <p className="mt-3 max-w-[70ch] text-[13.5px] font-light leading-[1.85] text-encre/80">
              {DIFFUSION.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
