import SiteFooter from './SiteFooter.jsx'

// Gabarit commun aux deux pages légales (mentions et confidentialité) :
// même titre direct, même grille de blocs, mêmes boutons que le reste du
// site — la pilule bordée, comme « Parler de votre projet ».
const PILULE =
  'inline-flex cursor-pointer items-center justify-center rounded-full border border-encre/45 px-8 py-3.5 text-[13px] font-normal tracking-[0.06em] text-encre transition-colors duration-300 hover:bg-encre hover:text-creme'

export default function LegalPage({ titre, blocs, onNavigate, lienVue, lienLabel }) {
  return (
    <section
      aria-label={titre}
      className="flex h-full flex-col overflow-y-auto px-6 pb-14 pt-28 md:px-16 md:pb-[7vh] md:pt-32"
    >
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.25] text-encre">
          {titre}
          <span className="text-or">.</span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {blocs.map((bloc) => (
            <div key={bloc.titre}>
              <p className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege">
                {bloc.titre}
              </p>
              <div className="mt-3 space-y-3">
                {bloc.lignes.map((ligne) => (
                  <p key={ligne} className="text-[13px] font-light leading-[1.85] text-encre/80">
                    {ligne}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
          <button type="button" onClick={() => onNavigate?.('contact')} className={PILULE}>
            Nous écrire
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.(lienVue)}
            className="cursor-pointer py-2 -my-2 text-[12px] font-light tracking-[0.04em] text-grege underline decoration-encre/25 underline-offset-4 transition-colors duration-500 hover:text-encre"
          >
            {lienLabel}
          </button>
        </div>

        <SiteFooter onNavigate={onNavigate} className="mt-auto pt-16" />
      </div>
    </section>
  )
}
