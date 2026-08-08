import { useEffect, useState } from 'react'

// Vignette officielle d'un film Vimeo (oEmbed, CORS ouvert). Elle sert
// d'image fixe le temps que le lecteur démarre : plus de rectangle noir.
// Si la requête échoue (réseau, blocage), on rend null et l'appelant garde
// son fond encre — rien ne casse.
export function useVimeoThumb(id, width = 960) {
  const [thumb, setThumb] = useState(null)

  useEffect(() => {
    if (!id) return undefined
    let alive = true
    const url = encodeURIComponent(`https://vimeo.com/${id}`)
    fetch(`https://vimeo.com/api/oembed.json?url=${url}&width=${width}`)
      .then((r) => r.json())
      .then((d) => {
        if (alive && d.thumbnail_url) setThumb(d.thumbnail_url)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [id, width])

  return thumb
}
