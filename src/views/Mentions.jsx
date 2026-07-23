// Mentions légales et confidentialité : page sobre, hors navigation
// principale, accessible depuis le pied de la page Contact (#mentions).
// Les champs entre crochets sont à compléter avant mise en ligne.
const BLOCS = [
  {
    titre: 'Éditeur',
    lignes: [
      'Bel Augure, [forme juridique et capital à compléter]',
      '[SIRET à compléter] · [adresse du siège à compléter], Bordeaux',
      'Directeur de la publication : Nicolas (nicolas@belaugure.studio)',
    ],
  },
  {
    titre: 'Hébergement',
    lignes: ["[Nom de l'hébergeur à compléter]", "[Adresse et contact de l'hébergeur à compléter]"],
  },
  {
    titre: 'Propriété intellectuelle',
    lignes: [
      "L'ensemble du site (textes, films, photographies, identité) est la propriété de Bel Augure ou de ses clients pour les œuvres qui leur ont été cédées. Toute reproduction sans accord écrit est interdite.",
    ],
  },
  {
    titre: 'Données personnelles',
    lignes: [
      "Le formulaire de contact compose un email dans votre messagerie : aucune donnée n'est enregistrée sur un serveur du site. Les emails reçus servent uniquement à répondre à votre demande et ne sont jamais transmis à des tiers.",
      'Ce site ne dépose aucun cookie de suivi.',
      'Pour exercer vos droits (accès, rectification, suppression) : nicolas@belaugure.studio.',
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

      <h2 className="mt-7 font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.25] text-encre">
        Le cadre, posé<span className="text-or">.</span>
      </h2>

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
        Studio de production basé à Bordeaux
      </p>
    </section>
  )
}
