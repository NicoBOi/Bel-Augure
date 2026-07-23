import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// Endpoint du formulaire (Formspree ou équivalent). Tant qu'il est vide,
// le formulaire compose un email dans la messagerie du visiteur. Pour
// capturer les demandes côté studio : créer un formulaire sur
// https://formspree.io pointant vers nicolas@belaugure.studio, puis coller
// ici l'URL fournie (https://formspree.io/f/xxxx). Rien d'autre à changer.
const FORM_ENDPOINT = ''

export default function Contact({ onNavigate }) {
  const ref = useReveal(0.35)
  const [form, setForm] = useState({ nom: '', maison: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const mailtoFallback = () => {
    const subject = encodeURIComponent(
      form.maison ? `Échange · ${form.maison}` : 'Échange',
    )
    const body = encodeURIComponent(
      `${form.message}\n\n${form.nom}${form.maison ? `\n${form.maison}` : ''}${
        form.email ? `\n${form.email}` : ''
      }`,
    )
    window.location.href = `mailto:nicolas@belaugure.studio?subject=${subject}&body=${body}`
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!FORM_ENDPOINT) {
      mailtoFallback()
      setSent(true)
      setTimeout(() => setSent(false), 5000)
      return
    }
    setSending(true)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(String(res.status))
      setSent(true)
      setForm({ nom: '', maison: '', email: '', message: '' })
      setTimeout(() => setSent(false), 6000)
    } catch {
      // Le réseau ou le service faillit : l'email direct prend le relais
      mailtoFallback()
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      ref={ref}
      aria-label="Contact"
      className="flex h-full flex-col justify-start px-6 pb-14 pt-28 max-md:overflow-y-auto md:pb-[9vh] md:px-16"
    >
      <div className="grid gap-12 lg:flex-1 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
          <div>
          <h2 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.25] text-encre">
            <span className="mask" style={{ '--d': '0.12s' }}>
              <span>On discute de votre</span>
            </span>
            <span className="mask md:ml-[3vw]" style={{ '--d': '0.2s' }}>
              <span>
                prochain film<span className="text-or"> ?</span>
              </span>
            </span>
          </h2>

          <p
            className="reveal-up mt-8 max-w-[42ch] text-[14px] font-light leading-[1.9] text-encre/80"
            style={{ '--d': '0.12s' }}
          >
            Un café, des idées, quelques notes et le projet commence
            <span className="text-or"> !</span>
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
              className="cursor-pointer text-[10px] font-light uppercase tracking-[0.2em] text-grege/80 transition-colors duration-500 hover:text-encre"
            >
              Mentions légales
            </button>
          </p>
          </div>
        </div>

        <form
          className="reveal-right lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col lg:justify-end"
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

          <button
            type="submit"
            className="cta mt-9 w-max cursor-pointer px-9 py-3.5 text-[13px] font-normal tracking-[0.06em]"
          >
            {sending
              ? 'Envoi en cours'
              : sent
                ? FORM_ENDPOINT
                  ? 'Message envoyé, à très vite'
                  : 'Message prêt dans votre messagerie'
                : 'Écrire au studio'}
          </button>
          <p aria-live="polite" className="sr-only">
            {sent
              ? FORM_ENDPOINT
                ? 'Votre message a bien été envoyé.'
                : 'Votre messagerie s\'ouvre avec le message préparé.'
              : ''}
          </p>
        </form>
      </div>

      <p className="mt-auto pt-16 text-center text-[11px] font-light tracking-[0.04em] text-grege">
        Studio de production basé à Bordeaux
      </p>
    </section>
  )
}
