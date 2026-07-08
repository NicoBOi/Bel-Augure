/**
 * État d'attente d'une zone vidéo : libellé explicite et filet d'or qui
 * balaye — le même langage que le voile d'ouverture du site.
 */
export default function VideoLoader() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 flex flex-col items-center justify-center gap-4"
    >
      <span className="text-[10px] font-normal uppercase tracking-[0.28em] text-sable/70">
        Le film se prépare
      </span>
      <span className="block h-px w-24 overflow-hidden bg-creme/12">
        <span className="load-sweep block h-full w-1/2 bg-or" />
      </span>
    </span>
  )
}
