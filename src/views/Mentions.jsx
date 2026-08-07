// Mentions légales et confidentialité : page sobre, hors navigation
// principale, accessible depuis le pied de la page Contact (#mentions).
// Données d'identification issues du Kbis (RCS Bordeaux, 03/08/2026).
const BLOCS = [
  {
    titre: 'Éditeur',
    lignes: [
      'Bel Augure, société à responsabilité limitée au capital de 1 000 €.',
      'RCS Bordeaux 108 264 524 — Siège social : 83 rue Marcelin Jourdan, 33200 Bordeaux.',
      'Directeur de la publication : Nicolas Sempere, gérant.',
      'Contact : nicolas@belaugure.studio.',
    ],
  },
  {
    titre: 'Hébergement',
    lignes: [
      'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.',
    ],
  },
  {
    titre: 'Propriété intellectuelle',
    lignes: [
      "L'ensemble du site (textes, films, photographies, identité) est la propriété de Bel Augure ou de ses clients pour les œuvres qui leur ont été cédées. Toute reproduction sans accord écrit est interdite.",
      '© Bel Augure 2026.',
    ],
  },
  {
    titre: 'Données personnelles',
    lignes: [
      "Les informations du formulaire de contact (nom, établissement, email, projet, échéance, budget, message) sont traitées par Bel Augure sur la base de mesures précontractuelles prises à votre demande (art. 6-1-b du RGPD), aux seules fins de répondre à votre message. Elles ne sont jamais cédées ni utilisées à des fins de prospection.",
      "Votre message est transmis par email et conservé dans notre messagerie et chez notre prestataire d'envoi Resend Inc. (États-Unis) ; le site est hébergé par Vercel Inc. (États-Unis). Ces transferts sont encadrés par les garanties contractuelles de ces prestataires. Les messages sont conservés au plus trois ans après notre dernier échange.",
      "Vous disposez de droits d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité, à exercer auprès de nicolas@belaugure.studio. Vous pouvez également adresser une réclamation à la CNIL (cnil.fr).",
      "Ce site ne dépose aucun cookie de suivi. La lecture des films fait appel au lecteur Vimeo (Vimeo.com Inc., États-Unis), configuré en mode « Do Not Track ».",
    ],
  },
]

export default function Mentions() {
  return (
    <section
      aria-label="Mentions légales"
      className="flex h-full flex-col overflow-y-auto px-6 pb-14 pt-28 md:px-16 md:pb-[9vh]"
    >
      <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-grege">
        Mentions légales
      </p>

      <h1 className="mt-7 font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.25] text-encre">
        Le cadre, posé<span className="text-or">.</span>
      </h1>

      <div className="mt-10 grid max-w-4xl gap-10 md:grid-cols-2">
        {BLOCS.map((bloc) => (
          <div key={bloc.titre}>
            <p className="text-[10px] font-normal uppercase tracking-[0.25em] text-grege">
              {bloc.titre}
            </p>
            <div className="mt-3 space-y-3">
              {bloc.lignes.map((ligne) => (
                <p key={ligne} className="text-[13px] font-light leading-[1.85] text-encre/80">
                  {ligne}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-auto pt-16 text-center text-[11px] font-light tracking-[0.04em] text-grege">
        Studio de production basé à Bordeaux · SIREN 108 264 524
      </p>
    </section>
  )
}
