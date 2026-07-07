import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

export default function Contact() {
  const ref = useReveal(0.35)
  const [form, setForm] = useState({ nom: '', maison: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  // Pas de backend : le module compose un email prêt à partir.
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      form.maison ? `Échange · ${form.maison}` : 'Ouvrir un échange',
    )
    const body = encodeURIComponent(
      `${form.message}\n\n${form.nom}${form.maison ? `\n${form.maison}` : ''}${
        form.email ? `\n${form.email}` : ''
      }`,
    )
    window.location.href = `mailto:nico@belaugure.studio?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section
      ref={ref}
      aria-label="Contact"
      className="flex h-full flex-col justify-start px-6 pb-14 pt-28 max-md:overflow-y-auto md:pb-[9vh] md:px-16"
    >
      <div className="grid gap-12 lg:flex-1 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
          <p
            className="reveal-up text-[11px] font-normal uppercase tracking-[0.3em] text-grege"
            style={{ '--d': '0.05s' }}
          >
            Contact
          </p>

          <div>
          <h2 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.25] text-encre">
            <span className="mask" style={{ '--d': '0.12s' }}>
              <span>
                Parlez-nous de votre maison<span className="text-or">.</span>
              </span>
            </span>
          </h2>

          <p
            className="reveal-up mt-8 max-w-[42ch] text-[14px] font-light leading-[1.9] text-encre/80"
            style={{ '--d': '0.12s' }}
          >
            Une demi-heure d'échange suffit pour savoir si nous sommes le bon
            studio pour vous. Écrivez-nous, nous répondons sous deux jours.
          </p>

          <p
            className="reveal-up mt-8 text-[13px] font-light tracking-[0.04em] text-grege"
            style={{ '--d': '0.08s' }}
          >
            <a
              href="mailto:nico@belaugure.studio"
              className="nav-link text-encre/80 transition-colors duration-500 hover:text-encre"
            >
              <span className="nav-label">nico@belaugure.studio</span>
            </a>
          </p>
          <p className="reveal-up mt-2 text-[12px] font-light tracking-[0.1em] text-grege" style={{ '--d': '0.32s' }}>
            Bordeaux · Nouvelle-Aquitaine
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
                Votre maison
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
            {sent ? 'Message prêt dans votre messagerie' : 'Ouvrir un échange'}
          </button>
          <p aria-live="polite" className="sr-only">
            {sent ? 'Votre messagerie s\'ouvre avec le message préparé.' : ''}
          </p>
        </form>
      </div>
    </section>
  )
}
