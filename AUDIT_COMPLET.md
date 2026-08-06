# AUDIT COMPLET — BEL AUGURE

*Audit multi-agents réalisé le 06/08/2026 — 10 agents spécialisés + 1 red team contradictrice, orchestrés en parallèle, avec arbitrage final des désaccords. Sources : code intégral du projet, build `dist/`, tests navigateur Playwright (1440×900, 1024×768, 390×844), Kbis, statuts SARL, synthèse INPI, charte graphique PDF, recherches web sourcées. Le site de production (belaugure.studio) n'était pas joignable depuis l'environnement d'audit (proxy) : les constats portent sur le build local, identique au déployé ; les points exigeant la production sont marqués INCERTAIN.*

*Note de périmètre : le fichier « Description-de-l'entreprise.txt » mentionné dans la commande d'audit **n'existe pas dans le projet** (vérifié par l'orchestrateur et confirmé indépendamment par 6 agents). L'audit s'est appuyé sur les seuls textes publiés.*

---

## 1. Verdict honnête sur la crédibilité et l'attractivité actuelles

**Le site est beau, structuré, et raconte un studio qui n'existe pas encore.** L'architecture commerciale (trois offres bornées, prix publics, droits de diffusion explicites, process écrit) est objectivement **au-dessus des standards du marché** — aucun concurrent spécialisé identifié n'affiche ses prix. Mais tout ce qui est vérifiable raconte autre chose : une SARL immatriculée **il y a trois jours** (03/08/2026), au capital de 1 000 €, domiciliée chez le gérant, avec **un seul film auto-produit sans client**, des fondateurs réduits à leurs prénoms, et des mentions légales publiées **avec leurs placeholders de brouillon** (« [SIRET à compléter] »).

La formule de la red team résume le diagnostic : *« le site est écrit à la voix d'un studio établi alors que tout ce qui est vérifiable décrit deux fondateurs à J+3 avec un film et une boîte mail. Cet écart n'est pas un défaut de finition, c'est la thèse du site — et chaque vérification qu'un prospect fera (Pappers, mentions légales, portfolio, Google) le lui prouvera. »*

Le paradoxe central : **la seule preuve solide que Bel Augure possède est son existence légale réelle (Kbis impeccable) — et c'est la seule que le site sabote** (placeholders, prénoms seuls, aucun SIREN nulle part).

## 2. Note globale : **42 / 100**

| Domaine | Note /100 | Justification en une ligne |
|---|---|---|
| Stratégie & positionnement | 55 | Niche juste et « verbalement libre », mais énoncée uniquement dans les meta SEO, jamais à l'écran |
| Marché & prix | 50 | Transparence tarifaire unique sur le marché ; grille calibrée « studio avec références » sans références |
| Offres & modèle | 55 | Structure excellente ; prix incohérents entre sources, engagement 36 k€ invisible, livrables non quantifiés |
| Crédibilité & preuves | **20** | Zéro client, zéro témoignage, zéro visage, zéro SIREN — et mentions légales à trous en production |
| Copywriting | 45 | Bien écrit mais interchangeable ; vocabulaire métier bien-être quasi absent (« spa » : 0 occurrence visible) |
| Direction artistique | 60 | Exécution cohérente et dispositif cinéma réel ; violations de sa propre charte, identité mono-film |
| UX & conversion | 55 | Parcours mobile en 2 clics ; desktop : pitch et CTA invisibles sans scroll deviné ; page Offres 5–8 écrans |
| Technique | 65 | Léger (84 KB gzip), prérendu propre ; zéro header de sécurité, zéro test, double source de vérité |
| Conformité | **15** | LCEN violée en production (sanctionnable), RGPD lacunaire, licences typo non prouvées |
| **Global pondéré** | **42** | La crédibilité commerciale — le facteur dominant pour vendre à 5 500–15 000 € — est le maillon faible |

## 3. Ce qui est réellement efficace — à préserver absolument

1. **Le bloc « La diffusion, en clair »** (`Offres.jsx:128-131`) : deux ans France digital inclus, extensions chiffrées dès la proposition. Cité par 5 agents comme le meilleur texte du site — clarté sur les droits qu'aucun concurrent identifié n'offre. *(Réserve red team : à adosser à un vrai contrat de cession, cf. §10.)*
2. **Les prix publics et la structure en trois offres bornées** avec livrables énumérés et process en 4 étapes — « procurement-friendly », rare sur ce marché au devis opaque.
3. **« Une équipe légère, deux à trois personnes, dans le respect de votre lieu et de vos clients »** (`Offres.jsx:120`) : le seul argument du site qu'un généraliste ne revendiquerait pas — c'est le germe de la vraie différenciation (tourner dans un établissement **en exploitation**).
4. **« Filmer celles et ceux qui prennent soin des autres »** (`Studio.jsx:49`) : la meilleure idée de positionnement du site, enterrée en page Studio.
5. **« Nous vous répondons sous deux jours ouvrés pour convenir d'un premier échange de trente minutes »** (`Contact.jsx:352`) : le texte le plus concret du site (à assouplir juridiquement : « généralement sous deux jours »).
6. **Le dispositif « salle obscure → le jour se lève »** de l'accueil : une vraie idée de cinéma, unique parmi les concurrents observés (à condition de régler l'affordance de scroll, cf. §8).
7. **La qualité technique de base** : 84 KB gzip JS+CSS, code-splitting, prérendu HTML par page, formulaire accessible (labels, aria-live, honeypot), `dnt=1` sur Vimeo (vérifié : 0 cookie déposé).
8. **L'honnêteté du texte Films** (« Voici le premier film de Bel Augure ») : seul claim du site adossé à une preuve. À assumer comme film-manifeste plutôt qu'à laisser en aveu de portfolio vide.

## 4. Contradictions et failles observées (avec preuves)

### Bloquantes

| # | Faille | Preuve |
|---|---|---|
| F1 | **Mentions légales publiées avec placeholders** : « Bel Augure, [forme juridique et capital à compléter] », « [SIRET à compléter] · [adresse du siège à compléter] », « [Nom de l'hébergeur à compléter] » | `src/views/Mentions.jsx:8-15`, présent dans le bundle de prod — vérifié 3× (agents Preuves, UX, Conformité + arbitrage orchestrateur) |
| F2 | **Trois prix différents pour Histoires de marque selon la source** : 3 000 € HT à l'écran (`Offres.jsx:69`) ; 3 500 € HT en meta + og:description (`prerender.mjs:53`) ; « 3 500 € ponctuel / 3 000 €/mois × 12 mois » dans le corps prérendu (`dist/offres/index.html:202`) ; `minPrice: 3500` en JSON-LD (`index.html:93`) | Cause racine identifiée par la red team : commit du 06/08/2026 « tarif unique » appliqué à la page mais pas au prérendu — démonstration vivante de la double source de vérité |
| F3 | **L'engagement de douze mois (36 000 €) n'apparaît que dans le HTML SEO**, jamais à l'écran — grep « douze/engagement/mois » : zéro dans `Offres.jsx` | Google l'indexe, le client le découvre au devis |
| F4 | **Écart charte ↔ site sur l'élément « verrouillé »** : la tagline est en or + Giflika à l'écran (`Accueil.jsx:215`, mesuré `rgb(217,198,166)`) alors que la charte impose grège + Montserrat ; le mot-symbole est recomposé en HTML avec un point or inexistant dans la charte (« ne jamais recomposer le mot-symbole », charte p.2) | Ironie mesurée : le grège de la charte sur encre ferait 4,54:1 (AA limite) — le site a raison en accessibilité et tort en conformité de marque ; personne n'a arbitré |
| F5 | **Deux emails en circulation** : carte de visite de la charte « nico@belaugure.studio » vs site entier « nicolas@belaugure.studio » | Charte p.7 vs `Contact.jsx:121`, `Mentions.jsx:10`, `api/contact.js:15` |

### Importantes

- **F6 — La cible n'existe qu'en SEO** : « hôtels, spas, thermes » présents dans `prerender.mjs:22` et le JSON-LD, **jamais dans le texte affiché à l'écran** d'aucune page. Occurrences visibles de « spa » : 0. Vocabulaire métier (cabine, protocole, curiste, praticienne) : 0.
- **F7 — H1 prérendu ≠ H1 hydraté** : le prérendu affiche « Bel Augure — studio de production de films pour hôtels, spas… » ; après React, le H1 devient « Bel Augure. » (mesuré). Googlebot rendant le JS, le H1 riche n'est probablement pas celui indexé.
- **F8 — Le champ budget du formulaire commence à « 3 500 – 6 000 € »** (`Contact.jsx:16`) : le prospect attiré par le « 3 000 € HT » affiché n'a pas de case.
- **F9 — Incohérence de méthode** : « On revient vers vous très vite avec votre devis » (`Contact.jsx:157`) contredit le process affiché (échange de 30 min *puis* proposition, `Offres.jsx:111-117`).
- **F10 — « deux séries de retours » vs « Deux allers-retours de validation »** : deux termes pour la même chose sur la même page (`Offres.jsx:33` vs `:124`).
- **F11 — Licences typographiques** : Giflika « licence commerciale requise » (charte p.2) sans preuve dans le repo, **OTF source servi publiquement** (`index.css:7` — la plupart des EULA l'interdisent) ; Founders Grotesk + Noe Display uploadées, inutilisées, dont un fichier provenant de « fonnts.com » (agrégateur non officiel).
- **F12 — Recouvrement Film Signature / Campagne Sensorielle** : livrables quasi identiques (1 film 60-90 s + courts), l'écart de 9 500 € repose sur « une idée créative commune » — la vraie différence (orchestration teasing→révélation→prolongation) n'est pas livrabilisée.
- **F13 — Logo structuré = bannière OG** : le JSON-LD déclare `"logo": ".../og.png"` (1200×630) ; aucun asset logo n'existe dans le projet (trouvaille red team).
- **F14 — Zéro « © », zéro année, zéro SIREN** sur les six pages (grep confirmé) — pour un studio qui vit de la propriété intellectuelle et interdit « toute reproduction sans accord écrit » (`Mentions.jsx:20`).

### Désaccords entre agents, arbitrés par l'orchestrateur

| Litige | Positions | Arbitrage (vérifié) |
|---|---|---|
| Montserrat chargée ? | DA + Conformité : « non, retombe en Helvetica » ; Tech + red team : « oui » | **Chargée** — `src/main.jsx:6-11` importe 6 CSS @fontsource ; les conclusions DA/Conformité dérivées de ce point sont invalidées |
| Ratio or/encre | DA : 10,84:1 ; Conformité : 10,77:1 | **10,84:1** (recalculé) — dans tous les cas le « 9:1 » de la charte est faux, mais AAA reste atteint |
| Contraste labels grège | UX : 5,05:1 « AA ok » ; Tech : 3,23:1 « échec » | **Les deux sont justes** : UX mesurait le grège du code (#6E6350, assombri), Tech celui de la charte (#8A7E68). Le code a silencieusement corrigé la charte — dérogation à documenter |
| Tagline « cohérente » | Copy : ✅ ; DA : double violation | **DA a raison** : la chaîne de caractères est identique, la composition (couleur + police) viole le verrou |
| « Réponse sous 2 jours » | Preuves : « acceptable » ; Conformité : risque L.121-2 | **Conformité** : engagement public d'une structure de 2 personnes — reformuler en « généralement » |
| Prix 3 000 €/mois « rassurant » | Clients (profil thalasso) ; Offres : « faux en l'état » | **Offres** : le chiffre à l'écran omet « /mois » et l'engagement — il ne rassure que par malentendu |

## 5. Adéquation par segment du bien-être haut de gamme

| Segment | Se sent ciblé ? | Contact probable ? | Blocage n°1 (preuve) |
|---|---|---|---|
| Hôtel 5★ avec spa | **Oui, fortement** | Oui, mais « en observation » | Zéro film d'hôtel : le seul film est un paysage d'Arcachon (`Films.jsx:14`) — savoir filmer un modelage ou une suite est un autre métier |
| Thalasso / thermal | À moitié | Possible (Quatre saisons épouse la saisonnalité) | « thermes » absent du texte visible ; engagement 12 mois rigide pour un établissement qui ferme l'hiver ; registre 100 % luxe, jamais santé |
| Skincare premium | **Non** | Non | Site entièrement scénographié « lieux » (« avant même la première visite », « le respect de votre lieu ») ; zéro macro produit ; droits « France » inadaptés à une marque qui exporte |
| Indépendant (décideur unique) | Oui | Incertain | Rapport preuve/prix : 5 500 € sans une référence ; le formulaire lui signale qu'en dessous de 3 500 € il n'est pas bienvenu |
| Acheteur sceptique (achats) | — | **Non, éliminatoire** | « [SIRET à compléter] » en production ; ni Kbis annoncé, ni RC pro, ni référence contactable — dossier indéfendable en interne |

**Conclusion segment** : le cœur de cible réel aujourd'hui est l'« hôtel/spa/thermal indépendant ou premium régional ». La mention skincare dilue sans convaincre tant qu'aucune offre ni image ne lui est dédiée — à assumer en cible secondaire ou à retirer.

## 6. Comparaison concurrentielle (sourcée — via WebSearch ; lecture directe des sites bloquée par le proxy, précision INCERTAINE sur les détails)

| Acteur | Positionnement | Preuves affichées | Prix publics |
|---|---|---|---|
| **Signs Films** (Paris, 2017) — signsfilms.fr | « Maisons de luxe, palaces, tables étoilées », discours sensoriel — **le plus proche verbalement de Bel Augure**, avec 8 ans d'antériorité | Références palaces | Non |
| **COCO Creative Studio** (Paris) | Vidéo hôtels/restaurants/spas France entière | Page clients dédiée | Non |
| **Filmatik Production** | Hôtels, resorts, palaces | Portfolio | Non |
| **Diadao** (Montpellier, 2002) | Agence 360° hôtellerie (site+photo+vidéo) | 20 ans, clients hôteliers | Non |
| **Fygostudio, IJICOM, Grenouilles, Lucas Sajot…** (Bordeaux) | Généralistes régionaux | Références locales fortes (Cité du Vin, Opéra…) | Journée 1 500–3 000 € |
| **Bel Augure** | « Films signature du bien-être d'exception » | **1 film auto-produit, 0 client, 0 indexation Google (recherche du 06/08/2026 : aucun résultat pour la marque)** | **Oui — seul du panel** |

Fourchettes marché (sourcées) : film corporate France 1 500–15 000 € HT ; abonnement social ~3 500 €/mois chez Studio FLF (qui chiffre, lui, « 1 jour de tournage/mois ») ; brand film luxe international 15 000–50 000 $+. **Lecture** : Film Signature à 5 500 € est un prix de studio *avec* références ; la Campagne à 15 000 € met Bel Augure en concurrence frontale avec Signs Films et ses palaces — invendable en l'état des preuves ; Histoires à 3 000 €/mois est l'offre la plus compétitive du triptyque, à condition d'en chiffrer le volume (combien de films/mois ? aucune source ne le dit — seule offre sans livrable quantifié).

**Différenciation réellement défendable aujourd'hui** : transparence tarifaire + cadre de droits + méthode « établissement en exploitation ». La niche « vidéo bien-être Nouvelle-Aquitaine » semble libre localement (INCERTAIN : absence de preuve ≠ preuve d'absence).

## 7. Réactions probables des décideurs (issues des personas + red team)

Les cinq objections tueuses qu'un prospect formulera :

1. *« Votre société a trois jours, votre capital est de 1 000 €, et vous me demandez 36 000 € sur douze mois — engagement que votre site ne mentionne même pas à l'écran. »*
2. *« Montrez-moi UN établissement que vous avez filmé. »* — Réponse honnête actuelle : aucun.
3. *« Vos mentions légales disent “[SIRET à compléter]”. Si vous ne relisez pas votre propre site, comment relirez-vous mon film ? »*
4. *« Qui êtes-vous ? »* — Prénoms seuls, zéro crédit vérifiable, zéro LinkedIn, alors que le Kbis vous nomme de toute façon (Sempere / Crestia, publics sur Pappers).
5. *« Votre cession “2 ans France digital” — montrez-moi le contrat type et votre RC pro avant de tourner au milieu de mes clients. »*

## 8. Corrections exactes recommandées

### P0 — Avant toute prospection (1 journée, coût nul)

1. **`Mentions.jsx:8-15`** — remplacer les placeholders par : « Bel Augure, SARL au capital de 1 000 € — RCS Bordeaux 108 264 524 — Siège : 83 rue Marcelin Jourdan, 33200 Bordeaux — Directeur de la publication : Nicolas Sempere, gérant » + « Hébergeur : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis » (à confirmer sur le compte Vercel) + n° TVA. Rebuilder.
2. **Unifier le prix Histoires** partout (`Offres.jsx:69`, `prerender.mjs:53,59`, JSON-LD `index.html:93`) : « Collection — à partir de 3 500 € HT » / « Quatre saisons — 3 000 € HT/mois, engagement de douze mois », **prix affichés dans les cartes** et engagement visible à l'écran.
3. **Aligner la grille budget du formulaire** (`Contact.jsx:16`) sur le plancher retenu ; corriger « votre devis » → « un premier échange » (`Contact.jsx:157`) ; « généralement sous deux jours ouvrés » (`Contact.jsx:352`).
4. **Trancher nico@/nicolas@** (une seule adresse partout, avant impression des cartes).
5. **Retirer `giflika.otf` de `public/fonts/`** (ne servir que le woff2) et documenter la licence Giflika ; supprimer des uploads les polices non licenciées inutilisées.
6. RGPD : ajouter la mention d'information sous le bouton d'envoi (base légale art. 6-1-b, durée de conservation, droits complets + CNIL, sous-traitants Resend/Vercel US) ; reformuler « aucune donnée n'est conservée ».

### P1 — Crédibilité (1 semaine, coût quasi nul)

7. **Page Studio** : noms complets, portraits photo, bios de 5 lignes avec références nominatives vérifiables des parcours passés (événementiel / cinéma-mode : nommer les productions ou marques), liens LinkedIn. C'est le seul capital de preuve qu'une société de 3 jours possède.
8. **Nommer la cible à l'écran** : l'accueil doit dire « hôtels, spas, thermes et maisons de bien-être » (aujourd'hui uniquement en meta). Réécritures proposées en §9.
9. **Reformuler « notre studio »** (`Studio.jsx:40`) → « postproduction réalisée en interne, à Bordeaux » tant qu'aucun local n'est montrable.
10. **SIREN en footer**, « © Bel Augure 2026 » sur les pages.
11. Souscrire une **RC pro** et l'afficher (« Assurés en responsabilité civile professionnelle ») ; préparer un contrat type de cession adossé au bloc diffusion.

### P2 — Conversion et technique (2 semaines)

12. **Affordance de scroll desktop sur l'accueil** (chevron ou reprise du CTA « Voir le film » — aujourd'hui `md:hidden`) : le pitch et le CTA sont invisibles sans geste deviné.
13. **Cartes intro d'Offres cliquables** (ancres vers chapitres) + « à partir de X € » sur chaque carte (5,4–8,1 écrans avant le premier prix actuellement).
14. **Vrais liens `<a href>`** dans la Navbar (avec pushState en onClick) + maillage interne dans le prérendu.
15. **Quantifier les livrables** : « X films courts de Y s par mois » (Histoires) ; formats nommés (16:9, 9:16, 4:5) au lieu de « versions convenues » ; délais indicatifs par offre (« comptez 6 à 8 semaines ») ; unifier « allers-retours de validation ».
16. CTA sur la page Studio ; renvoi Films → Offres (suppression des culs-de-sac) ; focus visible sur les champs (`index.css:239`) ; fond `bg-encre/30` sous les contrôles vidéo.
17. **Headers de sécurité** dans `vercel.json` (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS) ; rate limiting + bornes de longueur dans `api/contact.js` ; `npm audit fix` (postcss).
18. **Résorber la double source de vérité** prérendu/vues (générer `prerender.mjs` depuis les données des vues, ou extraire les textes dans un module partagé) — cause racine de F2/F7, récidive garantie sinon.
19. `lastmod` dans le sitemap ; remplacer le type `VideoProductionCompany` (inexistant sur schema.org) par `LocalBusiness`+`ProfessionalService` ; fournir un vrai asset logo carré pour le JSON-LD ; vérifier en prod : redirection apex→www, statut de `/api/contact` (**canal de conversion unique — test d'envoi réel obligatoire**), Google Business Profile à créer.

## 9. Nouveaux textes proposés (là où le contenu doit changer)

- **H2 accueil** — au lieu de « Faites de votre image une raison de vous choisir » :
  > « Le film qui donne envie de réserver — pas seulement de regarder. »
- **Sous-titre accueil** (nomme enfin la cible) :
  > « Bel Augure est un studio de production dédié aux hôtels, spas, thermes et maisons de bien-être. Nous filmons ce que vos clients ne peuvent pas deviner depuis une fiche Booking : la main de la praticienne, la lumière de la cabine à 8 h, le silence du bassin. »
- **Intro Offres** — au lieu de « essence / facettes / ampleur » :
  > « **Un film de référence** pour votre site et vos ventes, **des films courts réguliers** pour vos réseaux, **une campagne complète** pour une ouverture ou un lancement. »
- **« Campagne Sensorielle »** → **« Campagne de lancement »** (garder « sensorielle » en qualificatif dans la description). Personne ne googlise « campagne sensorielle spa ».
- **Carte Histoires** — au lieu de la triade « découvrir/choisir/revenir » (36 mots) :
  > « Un film court par soin, par saison ou par nouveauté — pour des réseaux qui ressemblent à votre établissement, pas à un feed d'agence. »
- **Contact** — supprimer « café/idées/exclamations » (rupture de ton avec « bien-être d'exception ») :
  > Titre : « Parlons de votre prochain film. » · Chapeau : « Décrivez votre projet en quelques lignes — nous revenons vers vous sous deux jours ouvrés avec un premier avis et un créneau d'échange. » · Confirmation : « Votre demande est bien envoyée. Nous revenons vers vous sous deux jours ouvrés. »
- **Studio** — assumer l'année zéro plutôt que la masquer :
  > « Bel Augure est un studio neuf, fondé par deux amis de quinze ans : Nicolas Sempere ([parcours événementiel — références à nommer]) et Corentin Crestia ([parcours cinéma/mode — références à nommer]). Notre premier film, *Les Pieds dans l'eau*, est notre manifeste : voilà comment nous filmerons votre maison. »
- **Films** — requalifier la démo :
  > « *Les Pieds dans l'eau* — notre film-manifeste. Tourné sur le bassin d'Arcachon, sans commande et sans client : uniquement pour montrer notre regard. »

## 10. Preuves et réassurances à créer (par ordre de rendement)

1. **1 à 3 films pilotes dans de vrais établissements** (tarif fondateur ou échange visibilité, hôtels/spas du bassin d'Arcachon) contre droit de publication + témoignage nommé + logo. *Un seul vrai client filmé remplace tous les autres correctifs de cette liste.* — La red team exige un plan concret : cibler 5 établissements nommés, proposition écrite « film offert à −60 % contre référence publique », séquence sur 6 semaines.
2. **Identités vérifiables** : bios nominatives + portraits + LinkedIn (cf. P1-7).
3. **Étude de cas du film existant** : intention, repérage, tournage, étalonnage, son — la méthode montrée compense partiellement le portfolio vide.
4. **Exemple anonymisé de « proposition détaillée »** (promise en `Offres.jsx:116`) + CGV/contrat de cession couvrant « 2 ans France digital » (CPI L.131-3 : une cession s'écrit).
5. **RC professionnelle affichée** ; Kbis envoyé volontiers sur demande (en faire un réflexe commercial).
6. **Google Business Profile** + inscription annuaires (référencement local + NAP cohérent).
7. Documenter les **droits du film** (musique : licence de synchro ou composition originale ? personnes filmées ?) — INCERTAIN aujourd'hui, à archiver avant toute prospection.

## 11. Plan d'action — impact commercial × urgence × effort

| Rang | Action | Impact | Urgence | Effort |
|---|---|---|---|---|
| 1 | Mentions légales complètes (P0-1) | Élevé (dé-bloque l'acheteur sceptique) | **Illégal en l'état** | 1 h |
| 2 | Unification des prix + engagement visible (P0-2,3) | Élevé (confiance au premier contact) | Immédiate | 2 h |
| 3 | Test réel de `/api/contact` en prod | Critique (canal unique de conversion) | Immédiate | 30 min |
| 4 | Cible nommée à l'écran + réécritures §9 | Élevé (reconnaissance par la cible) | Semaine 1 | 1 j |
| 5 | Studio : noms, visages, bios vérifiables | Élevé (réassurance humaine) | Semaine 1 | 2 j |
| 6 | Films pilotes en établissements réels (§10-1) | **Décisif** | Semaines 2–8 | Élevé |
| 7 | RGPD formulaire + email unique + licence Giflika | Moyen (risque) | Semaine 1 | 0,5 j |
| 8 | UX : affordance scroll, cartes cliquables, ancres, CTA Studio | Moyen (conversion) | Semaine 2 | 1–2 j |
| 9 | Sécurité (headers, rate limiting) + source de vérité unique | Moyen (robustesse) | Semaine 2–3 | 1–2 j |
| 10 | RC pro + contrat de cession + GBP | Moyen (réassurance B2B) | Semaine 2–4 | 0,5 j + démarches |

## 12. Désaccords résiduels et incertitudes

**Arbitrés** (cf. tableau §4) : Montserrat (chargée), ratio de contraste (10,84:1), tagline (violation réelle), « 2 jours ouvrés » (à assouplir), grège code vs charte (deux couleurs différentes, dérogation à documenter).

**Non tranchés — décisions d'entreprise** :
- **Assumer l'année zéro vs voix de studio établi** : la red team plaide pour l'assomption complète (« offre fondateur », manifeste) ; l'agent stratégie propose de garder la voix premium en compensant par la précision. Les deux s'accordent sur l'urgence des preuves ; le ton final vous appartient.
- **Skincare : cible secondaire ou abandon** provisoire.
- **Le point or du mot-symbole** : violation de charte devenue signature de facto — à entériner dans la charte ou à retirer du site.
- **Prix : maintenir la grille et vendre en dessous en « tarif fondateur », ou l'abaisser publiquement** — l'agent marché penche pour le tarif fondateur explicite ; non tranché.

**INCERTAIN (invérifiable depuis l'environnement d'audit)** : comportement réel du player Vimeo en prod (LCP/CWV), redirection apex→www, statut réel de `/api/contact` et de la variable Resend en prod, HSTS Vercel, propriété du compte Vimeo (personnel ou société ?), licences réelles de Giflika/Founders/Noe, droits musicaux du film, existence d'un Google Business Profile.

---

## LES 10 CHANGEMENTS AU PLUS FORT IMPACT (crédibilité + conversion)

1. Compléter les mentions légales avec les données du Kbis (illégal + destructeur en l'état).
2. Unifier les prix d'Histoires de marque sur toutes les sources et afficher l'engagement 12 mois à l'écran.
3. Tester et fiabiliser `/api/contact` en production (canal de conversion unique).
4. Nommer « hôtels, spas, thermes, maisons de bien-être » dans les textes visibles, pas seulement en SEO.
5. Incarner les fondateurs : noms complets, visages, parcours vérifiables, LinkedIn.
6. Produire 1–3 films pilotes dans de vrais établissements (la preuve qui remplace toutes les autres).
7. Réécrire les 4 formules interchangeables (§9) avec le vocabulaire métier du bien-être.
8. Donner une affordance de scroll desktop à l'accueil + rendre les cartes d'offres cliquables avec prix.
9. Publier contrat de cession type + RC pro + SIREN : le kit de réassurance de l'acheteur B2B.
10. Résorber la double source de vérité prérendu/vues (cause racine des incohérences récidivantes).

## LES 5 ÉLÉMENTS QUI EMPÊCHENT ENCORE BEL AUGURE D'ÊTRE PERÇU COMME UNE RÉFÉRENCE

1. **Zéro preuve client** — un film auto-produit ne soutient pas une grille à 15 000 €.
2. **L'anonymat des fondateurs** — prénoms seuls face à un Kbis public qui les nomme de toute façon.
3. **Les signaux de négligence en série** — placeholders publiés, prix contradictoires, deux emails, zéro © : l'exact opposé de « signature ».
4. **La cible invisible à l'écran** — le spécialiste n'existe que pour Google, jamais pour le visiteur.
5. **L'absence de cadre contractuel visible** — cession de droits, CGV, assurance : tout est affirmé, rien n'est montré.

## VERDICT FINAL : **« REPOSITIONNEMENT NÉCESSAIRE »** — du statut énoncé, pas de la niche

La niche est juste, verbalement disponible en région, et l'architecture commerciale est au-dessus du marché. Mais le site parle avec la voix d'un studio établi alors que chaque élément vérifiable — Kbis de 3 jours, capital de 1 000 €, un film sans client, mentions à trous — dit le contraire, et **tout prospect sérieux vérifiera**. En l'état : la Campagne à 15 000 € est invendable ; le Film Signature à 5 500 € ne se vendra que par réseau personnel, c'est-à-dire hors site. Deux issues honnêtes : **assumer l'année zéro** (fondateurs incarnés, film-manifeste, offre fondateur avec contrepartie de référence, conformité impeccable) — recommandation de cet audit — ou continuer à jouer le studio établi et attendre que la première vérification tue le premier deal. Une fois les corrections P0/P1 faites et 2–3 films pilotes livrés, le verdict bascule en « crédible mais améliorable » ; c'est un horizon de 2 à 3 mois, pas de 2 ans.

---

*Rapports détaillés des 11 agents conservés dans l'environnement d'audit. Aucun fichier du site n'a été modifié : ce document est le seul ajout, en attente de votre validation avant toute correction.*
