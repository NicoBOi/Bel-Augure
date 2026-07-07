import { useEffect, useRef, useState } from 'react'

// Lecteur Vimeo en mode background qui ne se montre qu'une fois la lecture
// réellement démarrée : avant cela, le fond encre reste seul en scène.
// Évite la tuile grise ou noire du player pendant le chargement — le film
// fond au travers de l'encre quand il joue, jamais avant.
export default function VimeoBackground({ id, title, className = '', onPlaying }) {
  const frameRef = useRef(null)
  const notified = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== 'https://player.vimeo.com') return
      if (!frameRef.current || e.source !== frameRef.current.contentWindow) return
      let data
      try {
        data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
      } catch {
        return
      }
      if (data.event === 'ready') {
        // Le player est prêt : on s'abonne aux signaux de lecture
        for (const value of ['play', 'playProgress']) {
          frameRef.current.contentWindow.postMessage(
            JSON.stringify({ method: 'addEventListener', value }),
            'https://player.vimeo.com',
          )
        }
      } else if (data.event === 'play' || data.event === 'playProgress') {
        setPlaying(true)
        if (!notified.current) {
          notified.current = true
          onPlaying?.()
        }
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [onPlaying])

  if (!id) return null

  return (
    <iframe
      ref={frameRef}
      title={title}
      src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&autopause=0&controls=0&title=0&byline=0&portrait=0&dnt=1`}
      allow="autoplay; fullscreen"
      tabIndex={-1}
      className={`pointer-events-none border-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        playing ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  )
}
