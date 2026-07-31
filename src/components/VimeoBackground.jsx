import { useEffect, useMemo, useRef, useState } from 'react'

// Lecteur Vimeo en mode background qui ne se montre qu'une fois la lecture
// réellement démarrée : avant cela, le fond encre reste seul en scène.
// Évite la tuile grise ou noire du player pendant le chargement — le film
// fond au travers de l'encre quand il joue, jamais avant.
// background=true : décor pur, muet forcé (le mode « background » de Vimeo
// ignore tout contrôle de volume). background=false : lecteur muet à
// l'autoplay mais dont on peut rétablir le son (page Films) — le paramètre
// background=1 est alors retiré pour que setVolume/setMuted répondent.
export default function VimeoBackground({
  id,
  title,
  className = '',
  onPlaying,
  soundOn,
  paused,
  background = true,
}) {
  const frameRef = useRef(null)
  const notified = useRef(false)
  const [playing, setPlaying] = useState(false)
  // Dernière valeur du son : appliquée aussi au signal ready du player
  const soundRef = useRef(soundOn)
  soundRef.current = soundOn
  // onPlaying passé en ref : l'effet ne dépend plus de son identité (les
  // parents passent une arrow inline), donc il ne se reconstruit pas à
  // chaque rendu — sinon le timer de révélation 900 ms serait remis à zéro
  // en boucle pendant le chargement et n'aboutirait jamais.
  const onPlayingRef = useRef(onPlaying)
  onPlayingRef.current = onPlaying
  // Vrai dès que Vimeo confirme la lecture — coupe les relances au geste.
  const playedRef = useRef(false)
  // Miroir de `paused` : ne pas relancer un film que le visiteur a mis en pause.
  const pausedRef = useRef(paused)
  pausedRef.current = paused
  // Audio « réchauffé » une seule fois : le player passe en démuté/volume 0 dès
  // le premier geste, pour qu'activer le son plus tard soit instantané.
  const warmedRef = useRef(false)

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
        // Le player est prêt : on s'abonne aux signaux de lecture, et on force
        // une lecture muette — iOS/Safari n'honore pas toujours l'autoplay
        // du paramètre d'URL, seule une lecture muette est autorisée.
        for (const value of ['play', 'playProgress']) {
          frameRef.current.contentWindow.postMessage(
            JSON.stringify({ method: 'addEventListener', value }),
            'https://player.vimeo.com',
          )
        }
        post('setMuted', soundRef.current ? false : true)
        post('setVolume', soundRef.current ? 1 : 0)
        if (!pausedRef.current) post('play')
      } else if (data.event === 'play' || data.event === 'playProgress') {
        playedRef.current = true
        setPlaying(true)
        if (!notified.current) {
          notified.current = true
          onPlayingRef.current?.()
        }
      }
    }
    window.addEventListener('message', onMessage)

    // Filet de sécurité : sur mobile l'autoplay muet ne renvoie pas toujours
    // les événements 'play'/'playProgress'. Sans ce signal, l'iframe resterait
    // à opacity-0 et rien ne s'afficherait. On révèle donc le film après un
    // court délai. (Un simple setTimeout, aucun listener : ne touche pas au
    // scroll.)
    const reveal = setTimeout(() => {
      setPlaying(true)
      if (!notified.current) {
        notified.current = true
        onPlayingRef.current?.()
      }
    }, 900)

    // Au premier geste discret (jamais 'scroll', qui saccaderait le défilement) :
    //  • tant que le film n'a pas démarré, on relance une lecture muette —
    //    déblocage iOS quand l'autoplay est refusé (Économie d'énergie, Safari) ;
    //  • une fois lancé, sur le lecteur Films (non-background), on réchauffe la
    //    piste audio une seule fois : le player passe en « démuté, volume 0 »
    //    (donc silencieux). Activer le son ensuite n'est plus qu'un changement
    //    de volume — instantané, sans re-bufferisation ni saccade de l'image.
    const onGesture = () => {
      if (!playedRef.current && !pausedRef.current) {
        post('setVolume', soundRef.current ? 1 : 0)
        post('play')
        return
      }
      if (!background && !warmedRef.current) {
        warmedRef.current = true
        post('setVolume', soundRef.current ? 1 : 0)
        post('setMuted', false)
      }
    }
    const gestures = ['pointerdown', 'touchend']
    for (const g of gestures) window.addEventListener(g, onGesture, { passive: true })

    return () => {
      window.removeEventListener('message', onMessage)
      clearTimeout(reveal)
      for (const g of gestures) window.removeEventListener(g, onGesture)
    }
  }, [])

  // Le son suit la volonté du visiteur, sans recharger le player. À l'activation
  // on lève le muet (le clic fournit le geste utilisateur exigé par iOS) ; à la
  // coupure on ne remute jamais — on descend juste le volume à 0. La piste audio
  // reste « chaude », donc revenir au son est instantané, sans saccade d'image.
  useEffect(() => {
    if (soundOn === undefined) return
    if (soundOn) post('setMuted', false)
    post('setVolume', soundOn ? 1 : 0)
  }, [soundOn])

  // Pause / lecture au clic sur l'image (page Films)
  useEffect(() => {
    if (paused === undefined) return
    post(paused ? 'pause' : 'play')
  }, [paused])

  // Fond pur : le film joue sans aucune UI Vimeo, non cliquable. playsinline
  // garde la lecture dans la page sur iOS (pas de bascule plein écran forcée).
  const src = id
    ? `https://player.vimeo.com/video/${id}?${
        background ? 'background=1&' : ''
      }autoplay=1&loop=1&muted=1&playsinline=1&autopause=0&controls=0&title=0&byline=0&portrait=0&dnt=1`
    : ''

  // L'iframe est mémoïsée : une fois la lecture lancée, couper le son ou mettre
  // en pause re-rend le composant (pour poster le message à Vimeo) mais React
  // réutilise le même élément iframe — le player n'est jamais retouché ni
  // rechargé, donc la vidéo ne saccade plus au clic sur les contrôles.
  const iframe = useMemo(
    () => (
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
    ),
    [src, title, playing, className],
  )

  if (!id) return null
  return iframe
}
