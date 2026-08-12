import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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
  onError,
  soundOn,
  paused,
  background = true,
}) {
  const frameRef = useRef(null)
  const notified = useRef(false)
  const [playing, setPlaying] = useState(false)
  // Incrémenté à chaque tentative de récupération après une erreur Vimeo : ajouté
  // à l'URL de l'iframe, il force sa renavigation (un simple changement de props
  // sur le même élément suffit à React, pas besoin de démonter/remonter).
  const [retryToken, setRetryToken] = useState(0)
  const retryCount = useRef(0)
  const retryTimer = useRef(null)
  // Dernière valeur du son : appliquée aussi au signal ready du player
  const soundRef = useRef(soundOn)
  soundRef.current = soundOn
  // onPlaying passé en ref : l'effet ne dépend plus de son identité (les
  // parents passent une arrow inline), donc il ne se reconstruit pas à
  // chaque rendu — sinon le timer de révélation 900 ms serait remis à zéro
  // en boucle pendant le chargement et n'aboutirait jamais.
  const onPlayingRef = useRef(onPlaying)
  onPlayingRef.current = onPlaying
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError
  // Vrai dès que Vimeo confirme la lecture — coupe les relances au geste.
  const playedRef = useRef(false)
  // Miroir de `paused` : ne pas relancer un film que le visiteur a mis en pause.
  const pausedRef = useRef(paused)
  pausedRef.current = paused
  // Audio « réchauffé » une seule fois : le player passe en démuté/volume 0 dès
  // le premier geste, pour qu'activer le son plus tard soit instantané.
  const warmedRef = useRef(false)
  // Minuteries de révélation : grâce après chargement de l'iframe, et recours
  // absolu anti-blocage.
  const revealTimer = useRef(null)
  const hardTimer = useRef(null)

  // Révèle le film (fondu) et prévient le parent — une seule fois. Passé en ref
  // pour rester appelable depuis des callbacks stables (message, load, timers).
  const reveal = () => {
    setPlaying(true)
    if (!notified.current) {
      notified.current = true
      onPlayingRef.current?.()
    }
  }
  const revealRef = useRef(reveal)
  revealRef.current = reveal

  // Cache le film (retour à l'image fixe posée dessous par le parent, ou au
  // fond uni s'il n'y en a pas) et programme une reprise discrète. Jamais
  // d'interface Vimeo visible : on masque l'iframe entière, on ne tente pas
  // de piloter son contenu interne, qui a pu basculer sur son propre écran
  // d'erreur (« Erreur de réseau », hors de notre contrôle par postMessage).
  const fail = () => {
    clearTimeout(retryTimer.current)
    // Le recours anti-blocage du tout premier chargement ne doit plus révéler
    // à l'aveugle une fois qu'une erreur est survenue : c'est désormais le
    // cycle de reprise ci-dessous qui décide seul du retour à l'écran.
    clearTimeout(hardTimer.current)
    setPlaying(false)
    notified.current = false
    playedRef.current = false
    onErrorRef.current?.()
    // Recul progressif (3 s, 6 s, 12 s…), plafonné à six essais : au-delà,
    // l'image fixe reste affichée indéfiniment plutôt que de marteler Vimeo.
    if (retryCount.current >= 6) return
    const delay = Math.min(3000 * 2 ** retryCount.current, 20000)
    retryCount.current += 1
    retryTimer.current = setTimeout(() => setRetryToken((t) => t + 1), delay)
  }
  const failRef = useRef(fail)
  failRef.current = fail

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
        for (const value of ['play', 'playProgress', 'error']) {
          frameRef.current.contentWindow.postMessage(
            JSON.stringify({ method: 'addEventListener', value }),
            'https://player.vimeo.com',
          )
        }
        post('setMuted', soundRef.current ? false : true)
        post('setVolume', soundRef.current ? 1 : 0)
        if (!pausedRef.current) post('play')
      } else if (data.event === 'play' || data.event === 'playProgress') {
        // Signal réel de lecture : on révèle pile quand l'image tourne — donc au
        // bon moment, y compris sur connexion lente (jamais un player encore en
        // train de charger). C'est le chemin principal.
        playedRef.current = true
        retryCount.current = 0
        revealRef.current()
      } else if (data.event === 'error') {
        // Le player signale une panne (réseau, session expirée…) : masquer
        // avant que son propre écran d'erreur ne s'affiche, jamais après.
        failRef.current()
      }
    }
    window.addEventListener('message', onMessage)

    // Recours absolu anti-blocage : si le player ne signale jamais rien (cas très
    // rare — iframe morte, réseau coupé), on révèle au bout de quelques secondes
    // pour ne pas laisser le voile tourner indéfiniment. Le filet ordinaire est
    // le 'load' de l'iframe (handleFrameLoad) ; le chemin nominal, l'événement
    // 'play' réel ci-dessus. Volontairement long pour laisser une connexion lente
    // démarrer d'elle-même avant tout affichage forcé.
    hardTimer.current = setTimeout(() => revealRef.current(), 9000)

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
      clearTimeout(revealTimer.current)
      clearTimeout(hardTimer.current)
      clearTimeout(retryTimer.current)
      for (const g of gestures) window.removeEventListener(g, onGesture)
    }
  }, [])

  // Le player a fini de charger. S'il n'a pas encore signalé la lecture, on lui
  // laisse un court délai pour démarrer, puis on révèle — filet pour les
  // navigateurs (mobiles surtout) qui ne postent pas d'événement 'play'. Sur
  // connexion lente ce 'load' arrive tard, donc la révélation attend d'autant :
  // on n'affiche plus le film avant qu'il soit réellement chargé.
  const handleFrameLoad = useCallback(() => {
    if (notified.current) return
    clearTimeout(revealTimer.current)
    revealTimer.current = setTimeout(() => revealRef.current(), 2500)
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
  // Le jeton de reprise force l'iframe à renaviguer après une erreur, sans
  // jamais démonter le composant.
  const src = id
    ? `https://player.vimeo.com/video/${id}?${
        background ? 'background=1&' : ''
      }autoplay=1&loop=1&muted=1&playsinline=1&autopause=0&controls=0&title=0&byline=0&portrait=0&dnt=1${
        retryToken ? `&_r=${retryToken}` : ''
      }`
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
        onLoad={handleFrameLoad}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        tabIndex={-1}
        className={`pointer-events-none border-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          playing ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    ),
    [src, title, playing, className, handleFrameLoad],
  )

  if (!id) return null
  return iframe
}
