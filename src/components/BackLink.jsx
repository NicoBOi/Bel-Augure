/**
 * Lien de retour avec flèche : le geste doit se lire immédiatement.
 * `light` inverse les couleurs pour les fonds encre (détail film).
 */
export default function BackLink({ label, onClick, light = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-max cursor-pointer items-center gap-3 py-2 -my-2 text-[11px] font-normal uppercase tracking-[0.22em] transition-colors duration-500 ${
        light ? 'text-creme/70 hover:text-creme' : 'text-grege hover:text-encre'
      }`}
    >
      <svg
        width="20"
        height="10"
        viewBox="0 0 20 10"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
      >
        <path
          d="M19 5H1M1 5L5.2 1M1 5L5.2 9"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </button>
  )
}
