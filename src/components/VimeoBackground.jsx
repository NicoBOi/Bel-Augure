import { useEffect, useRef, useState } from 'react'

// Lecteur Vimeo en mode background qui ne se montre qu'une fois la lecture
// réellement démarrée : avant cela, le fond encre reste seul en scène.
// Évite la tuile grise ou noire du player pendant le chargement — le film
// fond au travers de l'encre quand il joue, jamais avant.
export default function VimeoBackground({ id, title, className = '', onPlaying, soundOn }) {
  const frameRef = useRef(null)
  const notified = useRef(false)
  // Vrai uniquement quand Vimeo confirme la lecture (play/playProgress) :
  // sert à cesser de relancer play() au moindre geste une fois le film lancé.
  const playedRef = useRef(false)
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
        // iOS/Safari n'honore pas toujours l'autoplay du paramètre d'URL :
        // on force la lecture muette, seule autorisée sans geste utilisateur.
        post('setVolume', 0)
        post('play')
        if (soundRef.current !== undefined) {
          post('setVolume', soundRef.current ? 1 : 0)
        }
      } else if (data.event === 'play' || data.event === 'playProgress') {
        playedRef.current = true
        setPlaying(true)
        if (!notified.current) {
          notified.current = true
          onPlaying?.()
        }
      }
    }
    window.addEventListener('message', onMessage)

    // Filet de sécurité mobile : certains navigateurs ne renvoient pas les
    // messages 'play'/'playProgress' de façon fiable pour un fond muet. Sans
    // ce signal, l'iframe resterait invisible (opacity-0). On révèle donc le
    // film après un court délai, la lecture muette inline étant permise.
    const reveal = setTimeout(() => {
      setPlaying(true)
      if (!notified.current) {
        notified.current = true
        onPlaying?.()
      }
    }, 2200)

    // iOS (Safari, mode Économie d'énergie) refuse l'autoplay et laisse le
    // player sur sa cover. On relance donc la lecture muette au tout premier
    // geste du visiteur — le seul moment où iOS autorise play(). On réarme
    // tant que le film n'a pas signalé qu'il tourne (playedRef).
    const kick = () => {
      if (playedRef.current) return
      post('setVolume', 0)
      post('play')
    }
    const gestures = ['touchstart', 'pointerdown', 'click']
    for (const g of gestures) {
      window.addEventListener(g, kick, { passive: true })
    }

    return () => {
      window.removeEventListener('message', onMessage)
      clearTimeout(reveal)
      for (const g of gestures) window.removeEventListener(g, kick)
    }
  }, [onPlaying])

  // Le son suit la volonté du visiteur, sans recharger le player
  useEffect(() => {
    if (soundOn === undefined) return
    post('setVolume', soundOn ? 1 : 0)
  }, [soundOn])

  if (!id) return null

  // Fond pur : le film joue sans aucune UI Vimeo, non cliquable. Les seuls
  // contrôles sont ceux, dessinés main, que la page Films pose par-dessus
  // (son + plein écran) — la charte reste maîtresse de chaque pixel.
  const src = `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&autopause=0&controls=0&title=0&byline=0&portrait=0&dnt=1`

  return (
    <iframe
      ref={frameRef}
      title={title}
      src={src}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      tabIndex={-1}
      className={`pointer-events-none border-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        playing ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  )
}
