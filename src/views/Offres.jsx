import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import VimeoBackground from '../components/VimeoBackground.jsx'
import VideoLoader from '../components/VideoLoader.jsx'
import { useVimeoThumb } from '../hooks/useVimeoThumb.js'
import { EXTENSIONS, FAQS, HERO_FILM_ID, OFFERS, PROCESS } from '../content/offres.js'
import SiteFooter from '../components/SiteFooter.jsx'

const BG = '#EFE4D5'
const RULE = 'border-encre/15'
const CTA = 'inline-flex cursor-pointer items-center justify-center rounded-full border border-encre/55 px-7 py-3.5 text-[13px] tracking-[0.06em] text-encre transition-colors duration-300 hover:bg-encre hover:text-creme'

function Plus({ open = false }) {
  return <span aria-hidden="true" className={`ml-5 text-xl font-light transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
}

function Offer({ offer, thumb, onContact }) {
  const [open, setOpen] = useState(false)
  const dark = offer.id === 'film'
  const text = dark ? 'text-creme' : 'text-encre'
  const muted = dark ? 'text-creme/70' : 'text-encre/70'
  const rule = dark ? 'border-creme/20' : RULE
  const cta = dark ? CTA.replace('border-encre/55', 'border-creme/55').replace('text-encre', 'text-creme').replace('hover:bg-encre hover:text-creme', 'hover:bg-creme hover:text-encre') : CTA
  return (
    <article className={`relative overflow-hidden ${dark ? 'bg-encre' : 'bg-[#F5EDE1]'}`}>
      {dark && thumb && <img src={thumb} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-[0.16]" />}
      <div className="relative flex min-h-[34rem] flex-col justify-between p-7 sm:p-10 lg:min-h-[43rem] lg:p-14">
        <div>
          <p className={`text-[10px] uppercase tracking-[0.3em] ${dark ? 'text-or' : 'text-orfonce'}`}>{offer.eyebrow}</p>
          <h3 className={`mt-6 max-w-[12ch] font-display text-[clamp(2.25rem,4vw,4rem)] font-light leading-[1.04] ${text}`}>{offer.title}</h3>
          <p className={`mt-6 max-w-[35ch] text-[15px] font-light leading-[1.7] ${muted}`}>{offer.short}</p>
        </div>
        <div className={`mt-12 border-t pt-6 ${rule}`}>
          <p className={`font-display text-[1.45rem] font-light ${text}`}>{offer.price}</p>
          <p className={`mt-3 max-w-[36ch] text-[13px] font-light leading-[1.65] ${muted}`}>{offer.for}</p>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className={`mt-7 flex w-full items-center justify-between border-t pt-5 text-left text-[11px] uppercase tracking-[0.2em] ${rule} ${text}`}>Ce que cela comprend <Plus open={open} /></button>
          {open && <div className={`mt-5 border-b pb-6 text-[13.5px] font-light leading-[1.65] ${rule} ${muted}`}><p>{offer.detail}</p><ul className="mt-5 space-y-2.5">{offer.notes.map((note) => <li key={note}>— {note}</li>)}</ul><ul className="mt-5 grid gap-2.5 sm:grid-cols-2">{offer.includes.map((item) => <li key={item}>— {item}</li>)}</ul></div>}
          <button type="button" onClick={() => onContact(offer.eyebrow)} className={`mt-7 ${cta}`}>Parler de votre projet</button>
        </div>
      </div>
    </article>
  )
}

export default function Offres({ setDark, onNavigate }) {
  const ref = useReveal(0.35)
  const [heroReady, setHeroReady] = useState(false)
  const heroThumb = useVimeoThumb(HERO_FILM_ID)
  const goContact = (offer) => onNavigate?.('contact', { offer })
  useEffect(() => setDark?.(false), [setDark])
  return (
    <section ref={ref} aria-label="Offres" className="h-full overflow-y-auto" style={{ backgroundColor: BG }}>
      <h1 className="sr-only">Nos offres — Bel Augure</h1>
      <div className="mx-auto w-full max-w-[1180px] px-6 pt-28 md:px-16 md:pt-32"><div className="reveal-up grid items-end gap-10 lg:grid-cols-[0.82fr_1.18fr]" style={{ '--d': '0.08s' }}>
        <div className="pb-3"><p className="text-[10px] uppercase tracking-[0.3em] text-orfonce">Bel Augure</p><h2 className="mt-5 max-w-[11ch] font-display text-[clamp(2.7rem,5.5vw,5.1rem)] font-light leading-[0.98] text-encre">Votre univers mérite une histoire.</h2><p className="mt-6 max-w-[40ch] text-[15px] font-light leading-[1.75] text-encre/75">Nous imaginons et réalisons des films pour les maisons et les marques qui accordent autant d’importance à leur image qu’à leur expérience.</p></div>
        <div className="relative aspect-[16/10] overflow-hidden bg-encre sm:rounded-2xl">{heroThumb && <img src={heroThumb} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />}<VimeoBackground id={HERO_FILM_ID} title="Film Bel Augure" onPlaying={() => setHeroReady(true)} className="absolute inset-0 h-full w-full" /><div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-encre/40 transition-opacity duration-700 ${heroReady ? 'opacity-0' : 'opacity-100'}`}><VideoLoader /></div></div>
      </div></div>

      <div className="mx-auto mt-24 w-full max-w-[1320px] px-6 md:mt-32 md:px-16"><div className="reveal-up max-w-[42rem]" style={{ '--d': '0.12s' }}><p className="text-[10px] uppercase tracking-[0.3em] text-orfonce">Deux façons de raconter votre univers</p><p className="mt-4 font-display text-[clamp(1.65rem,2.4vw,2.25rem)] font-light leading-[1.2] text-encre">Plusieurs histoires courtes, ou une histoire plus ample.</p></div><div className="reveal-up mt-10 grid gap-4 lg:grid-cols-2" style={{ '--d': '0.18s' }}>{OFFERS.map((offer) => <Offer key={offer.id} offer={offer} thumb={heroThumb} onContact={goContact} />)}</div><p className="mx-auto mt-8 max-w-[66ch] text-center text-[12.5px] font-light leading-[1.65] text-encre/60">Chaque film est écrit sur mesure. Les tarifs affichés correspondent à une production dans une configuration standard ; le scénario, le casting, les lieux et le périmètre de diffusion déterminent le devis final.</p></div>

      <div className="mx-auto mt-28 max-w-[1180px] px-6 md:mt-36 md:px-16"><div className={`border-t pt-12 ${RULE}`}><p className="text-[10px] uppercase tracking-[0.3em] text-orfonce">Comment nous travaillons</p><ol className="mt-10 grid gap-9 md:grid-cols-3">{PROCESS.map((step, i) => <li key={step.t} className="border-t border-encre/15 pt-5"><span className="text-[11px] tracking-[0.2em] text-orfonce">0{i + 1}</span><h3 className="mt-5 font-display text-[1.8rem] font-light text-encre">{step.t}</h3><p className="mt-3 max-w-[30ch] text-[13.5px] font-light leading-[1.7] text-encre/70">{step.d}</p></li>)}</ol></div></div>

      <div className="mx-auto mt-28 max-w-[1180px] px-6 md:mt-36 md:px-16"><div className="bg-[#E6D8C1] px-7 py-12 sm:px-12 sm:py-16"><p className="text-[10px] uppercase tracking-[0.3em] text-orfonce">Aller plus loin</p><div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">{EXTENSIONS.map((extension) => <article key={extension.id} className="border-t border-encre/20 pt-6"><h3 className="font-display text-[2rem] font-light text-encre">{extension.title}</h3><p className="mt-4 max-w-[39ch] text-[14px] font-light leading-[1.7] text-encre/75">{extension.body}</p><p className="mt-6 font-display text-[1.35rem] font-light text-encre">{extension.price}</p><button type="button" onClick={() => goContact(extension.id === 'campagne' ? 'Une campagne' : 'Une collaboration dans la durée')} className="mt-7 text-[11px] uppercase tracking-[0.18em] text-encre underline decoration-orfonce/60 underline-offset-4">{extension.cta} →</button></article>)}</div></div></div>

      <div className="mx-auto mt-28 max-w-[850px] px-6 md:mt-36 md:px-16"><p className="text-[10px] uppercase tracking-[0.3em] text-orfonce">Questions fréquentes</p><div className="mt-7 border-t border-encre/15">{FAQS.map((faq) => <details key={faq.q} className="group border-b border-encre/15 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[clamp(1.2rem,2vw,1.45rem)] font-light text-encre">{faq.q}<Plus /></summary><p className="max-w-[64ch] pt-4 text-[13.5px] font-light leading-[1.7] text-encre/70">{faq.a}</p></details>)}</div></div>
      <div className="mx-auto mt-28 max-w-[1180px] px-6 text-center md:mt-36 md:px-16"><p className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.05] text-encre">Imaginons votre prochain film.</p><button type="button" onClick={() => goContact('')} className={`mt-8 ${CTA}`}>Parler de votre projet</button></div>
      <SiteFooter onNavigate={onNavigate} className="mt-20 px-6 pb-28 md:px-16 lg:pb-20" />
    </section>
  )
}
