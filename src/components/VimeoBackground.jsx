import { useEffect, useRef, useState } from 'react'

// Lecteur Vimeo en mode background qui ne se montre qu'une fois la lecture
// réellement démarrée : avant cela, le fond encre reste seul en scène.
// Évite la tuile grise ou noire du player pendant le chargement — le film
// fond au travers de l'encre quand il joue, jamais avant.
export default function VimeoBackground({ id, title, className = '', onPlaying, soundOn, controls = false }) {
  const frameRef = useRef(null)
  const notified = useRef(false)
  const [playing, setPlaying] = useState(false)
  // Dernière valeur du son : appliquée aussi au signal ready du player
  const soundRef = useRef(soundOn)
  soundRef.current = soundOn

  const post = (method, value) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method, value }),
      'https://player.vimeo.com',
    )
  }

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
        if (soundRef.current !== undefined) {
          post('setVolume', soundRef.current ? 1 : 0)
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

  // Le son suit la volonté du visiteur, sans recharger le player
  useEffect(() => {
    if (soundOn === undefined) return
    post('setVolume', soundOn ? 1 : 0)
  }, [soundOn])

  if (!id) return null

  // Deux modes : fond pur (background=1, sans aucune UI, non cliquable) pour
  // le hero ; player interactif (contrôles Vimeo, plein écran, volume, barre
  // de lecture) teinté à l'or de la charte pour la page Films.
  const src = controls
    ? `https://player.vimeo.com/video/${id}?autoplay=1&loop=1&muted=1&autopause=0&controls=1&color=d9c6a6&title=0&byline=0&portrait=0&pip=1&dnt=1`
    : `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&autopause=0&controls=0&title=0&byline=0&portrait=0&dnt=1`

  return (
    <iframe
      ref={frameRef}
      title={title}
      src={src}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      tabIndex={controls ? 0 : -1}
      className={`border-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        controls ? '' : 'pointer-events-none'
      } ${playing ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  )
}
