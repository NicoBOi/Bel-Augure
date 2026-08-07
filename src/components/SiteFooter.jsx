// Pied de page commun à toutes les vues : la signature du studio et les deux
// accès légaux. La LCEN impose des mentions légales joignables depuis tout le
// site, et la CNIL demande que l'information sur les données personnelles soit
// « aisément accessible » — pas seulement depuis la page Contact.
export default function SiteFooter({ onNavigate, tone = 'clair', className = '' }) {
  const base = tone === 'or' ? 'text-encre/55' : 'text-grege'
  const lien =
    'cursor-pointer py-2 -my-2 transition-colors duration-500 hover:text-encre focus-visible:text-encre'

  return (
    <div className={`text-center text-[11px] font-light tracking-[0.04em] ${base} ${className}`}>
      <p>Studio de production basé à Bordeaux</p>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3">
        <button type="button" onClick={() => onNavigate?.('mentions')} className={lien}>
          Mentions légales
        </button>
        <span aria-hidden="true" className="opacity-50">
          ·
        </span>
        <button type="button" onClick={() => onNavigate?.('confidentialite')} className={lien}>
          Confidentialité
        </button>
      </p>
    </div>
  )
}
