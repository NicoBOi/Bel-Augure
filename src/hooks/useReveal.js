import { useEffect, useRef } from 'react'

/**
 * Ajoute la classe `is-visible` au conteneur observé quand 35 % de sa surface
 * entre dans le viewport. Les descendants `.reveal-up`, `.reveal-right` et
 * `.mask > span` déclenchent alors leurs animations (voir index.css).
 * Si l'utilisateur préfère un mouvement réduit, tout est révélé immédiatement.
 */
export function useReveal(threshold = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
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
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
