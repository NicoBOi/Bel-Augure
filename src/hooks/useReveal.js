import { useCallback, useRef } from 'react'

/**
 * Callback-ref : (ré)observe chaque élément attaché, y compris quand une vue
 * interne remonte sa grille après un détail (retour). Ajoute `is-visible`
 * quand 35 % de la surface entre dans le viewport ; les descendants
 * `.reveal-up`, `.reveal-right` et `.mask > span` s'animent alors.
 * Mouvement réduit : tout est révélé immédiatement.
 */
export function useReveal(threshold = 0.35) {
  const cleanup = useRef(null)

  return useCallback(
    (el) => {
      if (cleanup.current) {
        cleanup.current()
        cleanup.current = null
      }
      if (!el) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('is-visible')
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-visible')
              observer.disconnect()
            }
          }
        },
        { threshold },
      )

      observer.observe(el)
      cleanup.current = () => observer.disconnect()
    },
    [threshold],
  )
}
