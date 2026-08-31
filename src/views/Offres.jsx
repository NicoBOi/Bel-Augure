import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import VimeoBackground from '../components/VimeoBackground.jsx'
import VideoLoader from '../components/VideoLoader.jsx'
import { useVimeoThumb } from '../hooks/useVimeoThumb.js'
import { EXTENSIONS, FAQS, HERO_FILM_ID, OFFERS, PROCESS } from '../content/offres.js'
import SiteFooter from '../components/SiteFooter.jsx'

const RULE = 'border-orfonce/20'
const BG = '#EFE4D5'
const CTA = 'inline-flex cursor-pointer items-center justify-center rounded-full border border-encre/55 px-8 py-3.5 text-[13px] font-normal tracking-[0.06em] text-encre transition-colors duration-300 hover:bg-encre hover:text-creme'

function DashList({ items }) {
  return <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">{items.map((item) => <li key={item} className="flex items-start gap-3.5 text-[14px] font-light leading-[1.55] text-encre/80"><span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-orfonce/70" />{item}</li>)}</ul>
}

function OfferChapter({ offer, num, onContact }) {
  const [open, setOpen] = useState(false)
  return <div id={`detail-${offer.id}`} className="scroll-mt-24 px-6 py-24 md:px-16 md:py-32" style={{ backgroundColor: num === '02' ? '#E6D8C1' : '#F4ECDF' }}>
    <article className="mx-auto grid w-full max-w-[1180px] items-start gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-x-24">
      <span className="font-display text-[clamp(4.5rem,10vw,8.5rem)] font-light leading-[0.8] tabular-nums text-encre">{num}</span>
      <div className="min-w-0"><p className="text-[11px] uppercase tracking-[0.3em] text-orfonce">{offer.eyebrow}</p><h2 className="mt-3 font-display text-[clamp(2.3rem,4.8vw,3.4rem)] font-light leading-[1.03] text-encre">{offer.title}</h2><p className="mt-5 max-w-[32ch] font-display text-[clamp(1.45rem,2.1vw,1.75rem)] font-light leading-[1.22] text-encre/90">{offer.short}</p><p className="mt-7 max-w-[61ch] text-[16px] font-light leading-[1.75] text-encre/80">{offer.detail}</p>
        <div className="mt-12 space-y-10 md:mt-14"><section className={`border-t pt-8 ${RULE}`}><h3 className="text-[11px] uppercase tracking-[0.28em] text-encre/70">En bref</h3><DashList items={offer.notes} /></section>
          <section className={`border-t pt-8 ${RULE}`}><button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between text-left text-[11px] uppercase tracking-[0.28em] text-encre/70">Ce que cela comprend <span className={`text-xl transition-transform ${open ? 'rotate-45' : ''}`}>+</span></button>{open && <div className="mt-7"><DashList items={offer.includes} /></div>}</section>
          <div className={`flex flex-col items-start gap-6 border-t pt-8 sm:flex-row sm:items-end sm:justify-between ${RULE}`}><div><p className="text-[10px] uppercase tracking-[0.22em] text-encre/55">Tarif</p><p className="mt-1.5 font-display text-[clamp(1.5rem,2.2vw,1.9rem)] font-light leading-none text-encre">{offer.price}</p><p className="mt-2 max-w-[45ch] text-[12.5px] font-light leading-[1.6] text-encre/65">{offer.for}</p></div><button type="button" onClick={() => onContact(offer.eyebrow)} className={CTA}>Parler de votre projet</button></div>
        </div>
      </div>
    </article>
  </div>
}

export default function Offres({ setDark, onNavigate }) {
  const ref = useReveal(0.35)
  const [heroReady, setHeroReady] = useState(false)
  const heroThumb = useVimeoThumb(HERO_FILM_ID)
  const goContact = (offer) => onNavigate?.('contact', { offer })
  const scrollTo = (id) => document.getElementById(`detail-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  useEffect(() => setDark?.(false), [setDark])
  return <section ref={ref} aria-label="Offres" className="h-full overflow-y-auto" style={{ backgroundColor: BG }}>
    <h1 className="sr-only">Nos offres — Bel Augure</h1>
    <div className="mx-auto flex min-h-[calc(100dvh-7rem)] w-full max-w-[1180px] flex-col px-6 pt-28 md:px-16"><div className="reveal-up grid flex-1 items-center gap-10 lg:grid-cols-2 lg:gap-16" style={{ '--d': '0.08s' }}><div><p className="text-[10px] uppercase tracking-[0.3em] text-orfonce">Bel Augure</p><h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2.3rem,4.4vw,3.5rem)] font-light leading-[1.08] text-encre">Votre univers mérite une histoire.</h2><p className="mt-6 max-w-[44ch] text-[16px] font-light leading-[1.7] text-encre/75">Nous imaginons et réalisons des films pour les maisons et les marques qui accordent autant d’importance à leur image qu’à leur expérience.</p></div><div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-encre lg:rounded-3xl">{heroThumb && <img src={heroThumb} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />}<VimeoBackground id={HERO_FILM_ID} title="Film Bel Augure" onPlaying={() => setHeroReady(true)} className="absolute inset-0 h-full w-full" /><div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-[1] bg-encre/45 transition-opacity duration-700 ${heroReady ? 'opacity-0' : 'opacity-100'}`}><VideoLoader /></div></div></div>
      <div className="reveal-up grid gap-px border-t pt-10 sm:grid-cols-2 md:pt-14" style={{ '--d': '0.16s' }}>{OFFERS.map((offer) => <button key={offer.id} type="button" onClick={() => scrollTo(offer.id)} className={`group flex cursor-pointer flex-col items-center px-5 py-7 text-center transition-colors hover:bg-encre/[0.04] sm:last:border-l ${RULE}`}><p className="text-[10px] uppercase tracking-[0.24em] text-orfonce">{offer.eyebrow}</p><h3 className="mt-3 font-display text-[clamp(1.3rem,2vw,1.65rem)] font-light text-encre">{offer.short}</h3><p className="mt-3 font-display text-[1.1rem] font-light text-encre/80">{offer.price}</p></button>)}</div>
      <div className="reveal-up pb-6 pt-8 text-center" style={{ '--d': '0.22s' }}><button type="button" onClick={() => scrollTo('histoires')} className="text-[10px] uppercase tracking-[0.24em] text-orfonce">Découvrir les deux formats ↓</button></div></div>
    {OFFERS.map((offer, i) => <OfferChapter key={offer.id} offer={offer} num={String(i + 1).padStart(2, '0')} onContact={goContact} />)}
    <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-16 md:py-32"><section className={`border-t pt-14 ${RULE}`}><h2 className="text-[11px] uppercase tracking-[0.3em] text-encre/70">Comment nous travaillons</h2><ol className="mt-8 grid gap-x-14 gap-y-9 sm:grid-cols-3">{PROCESS.map((step, i) => <li key={step.t} className="flex items-start gap-4"><span className="text-[11px] tabular-nums tracking-[0.18em] text-orfonce">0{i + 1}</span><span><span className="block text-[12.5px] font-medium uppercase tracking-[0.16em] text-encre">{step.t}</span><span className="mt-1.5 block text-[13.5px] font-light leading-[1.7] text-encre/75">{step.d}</span></span></li>)}</ol></section></div>
    <div className="bg-[#E6D8C1] px-6 py-24 md:px-16 md:py-32"><section className="mx-auto max-w-[1180px]"><p className="text-[11px] uppercase tracking-[0.3em] text-orfonce">Aller plus loin</p><div className="mt-9 grid gap-10 md:grid-cols-2 md:gap-20">{EXTENSIONS.map((item) => <article key={item.id} className={`border-t pt-7 ${RULE}`}><h2 className="font-display text-[2rem] font-light text-encre">{item.title}</h2><p className="mt-4 max-w-[40ch] text-[14px] font-light leading-[1.7] text-encre/75">{item.body}</p><p className="mt-6 font-display text-[1.35rem] font-light text-encre">{item.price}</p><button type="button" onClick={() => goContact(item.id === 'campagne' ? 'Une campagne' : 'Une collaboration dans la durée')} className="mt-7 text-[11px] uppercase tracking-[0.18em] text-encre underline underline-offset-4">{item.cta} →</button></article>)}</div></section></div>
    <div className="mx-auto max-w-[850px] px-6 py-24 md:px-16 md:py-32"><p className="text-[11px] uppercase tracking-[0.3em] text-orfonce">Questions fréquentes</p><div className={`mt-7 border-t ${RULE}`}>{FAQS.map((faq) => <details key={faq.q} className={`border-b py-5 ${RULE}`}><summary className="flex cursor-pointer list-none justify-between gap-5 font-display text-[1.35rem] font-light text-encre">{faq.q}<span>+</span></summary><p className="pt-4 text-[13.5px] font-light leading-[1.7] text-encre/70">{faq.a}</p></details>)}</div><p className="mx-auto mt-16 max-w-[24ch] text-center font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.08] text-encre">Imaginons votre prochain film.</p><div className="mt-8 text-center"><button type="button" onClick={() => goContact('')} className={CTA}>Parler de votre projet</button></div></div>
    <SiteFooter onNavigate={onNavigate} className="px-6 pb-28 md:px-16 lg:pb-20" />
  </section>
}
