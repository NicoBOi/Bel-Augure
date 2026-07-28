import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Le message est envoyé côté serveur par la fonction /api/contact (voir
// api/contact.js) : le studio reçoit un vrai email, sans ouvrir la messagerie
// du visiteur. Aucun stockage. La configuration (clé Resend) se fait côté
// Vercel — cf. commentaire de api/contact.js.
const ENDPOINT = '/api/contact'

export default function Contact({ onNavigate }) {
  const ref = useReveal(0.35)
  const [form, setForm] = useState({ nom: '', maison: '', email: '', message: '', website: '' })
  // status : 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Envoi impossible pour le moment.')
      setStatus('sent')
      setForm({ nom: '', maison: '', email: '', message: '', website: '' })
    } catch (err) {
      setErrorMsg(err.message || 'Envoi impossible pour le moment.')
      setStatus('error')
    }
  }

  const sending = status === 'sending'
  const sent = status === 'sent'

  return (
    <section
      ref={ref}
      aria-label="Contact"
      className="flex h-full flex-col justify-start px-6 pb-14 pt-28 overflow-y-auto md:pb-[9vh] md:px-16"
    >
      <div className="grid gap-12 lg:flex-1 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
          <div>
          <h1 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.25] text-encre">
            <span className="mask" style={{ '--d': '0.12s' }}>
              <span>On discute de votre</span>
            </span>
            <span className="mask md:ml-[3vw]" style={{ '--d': '0.2s' }}>
              <span>
                prochain film<span className="text-or">{' '}?</span>
              </span>
            </span>
          </h1>

          <p
            className="reveal-up mt-8 max-w-[42ch] text-[14px] font-light leading-[1.9] text-encre/80"
            style={{ '--d': '0.12s' }}
          >
            Un café, des idées, quelques notes et le projet commence
            <span className="text-or">{' '}!</span>
          </p>

          <p
            className="reveal-up mt-8 text-[13px] font-light tracking-[0.04em] text-grege"
            style={{ '--d': '0.08s' }}
          >
            <a
              href="mailto:nicolas@belaugure.studio"
              className="nav-link text-encre/80 transition-colors duration-500 hover:text-encre"
            >
              <span className="nav-label">nicolas@belaugure.studio</span>
            </a>
          </p>
          <p className="reveal-up mt-2 text-[12px] font-light tracking-[0.1em] text-grege" style={{ '--d': '0.32s' }}>
            Bordeaux · Nouvelle-Aquitaine
          </p>
          <p className="reveal-up mt-6" style={{ '--d': '0.36s' }}>
            <button
              type="button"
              onClick={() => onNavigate?.('mentions')}
              className="cursor-pointer py-2 -my-2 text-[10px] font-light uppercase tracking-[0.2em] text-grege/80 transition-colors duration-500 hover:text-encre"
            >
              Mentions légales
            </button>
          </p>
          </div>
        </div>

        <form
          className="reveal-right lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col lg:justify-center"
          style={{ '--d': '0.08s' }}
          onSubmit={submit}
        >
          <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
            <div>
              <label
                htmlFor="contact-nom"
                className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege"
              >
                Votre nom
              </label>
              <input
                id="contact-nom"
                type="text"
                required
                autoComplete="name"
                className="field mt-1"
                value={form.nom}
                onChange={update('nom')}
              />
            </div>

            <div>
              <label
                htmlFor="contact-maison"
                className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege"
              >
                Votre établissement
              </label>
              <input
                id="contact-maison"
                type="text"
                autoComplete="organization"
                className="field mt-1"
                value={form.maison}
                onChange={update('maison')}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="contact-email"
                className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege"
              >
                Votre email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                autoComplete="email"
                className="field mt-1"
                value={form.email}
                onChange={update('email')}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="contact-message"
                className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege"
              >
                Votre projet
              </label>
              <textarea
                id="contact-message"
                rows="5"
                required
                className="field mt-1"
                value={form.message}
                onChange={update('message')}
              />
            </div>
          </div>

          {/* Pot de miel anti-spam : hors écran, hors tabulation, ignoré des
              humains. Rempli = message écarté côté serveur. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            value={form.website}
            onChange={update('website')}
          />

          <button
            type="submit"
            disabled={sending || sent}
            className="cta mt-9 w-max cursor-pointer px-9 py-3.5 text-[13px] font-normal tracking-[0.06em] disabled:cursor-default disabled:opacity-60"
          >
            {sending ? 'Envoi en cours…' : sent ? 'Message envoyé, à très vite' : 'Écrire au studio'}
          </button>

          {/* Retour d'état, annoncé aux lecteurs d'écran (envoi / succès / erreur) */}
          <p
            aria-live="polite"
            role="status"
            className="mt-4 min-h-[1.3em] text-[12.5px] font-light leading-[1.6]"
          >
            {sending && <span className="text-grege">Envoi en cours…</span>}
            {sent && (
              <span className="text-encre/80">
                Merci, votre message est parti. On vous répond très vite.
              </span>
            )}
            {status === 'error' && <span className="text-encre/80">{errorMsg}</span>}
          </p>
        </form>
      </div>

      <p className="mt-auto pt-16 text-center text-[11px] font-light tracking-[0.04em] text-grege">
        Studio de production basé à Bordeaux
      </p>
    </section>
  )
}
