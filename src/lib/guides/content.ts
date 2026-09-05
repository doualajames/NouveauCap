// Corpus des guides SEO (contenu francophone haute intention post-arrivée).
// Chaque guide = une page /guides/<slug> indexable. Sources officielles citées.
// Info générale d'organisation — PAS un conseil en immigration (voir disclaimer).

export type GuideSection = {
  heading: string
  body: string[] // paragraphes
  steps?: string[] // liste d'étapes optionnelle
}

export type GuideFaq = { q: string; a: string }

export type Guide = {
  slug: string
  title: string // H1 + <title>
  metaTitle: string // <title> si différent (SEO)
  description: string // meta description
  keywords: string[]
  category: 'Démarches' | 'Santé' | 'Finances' | 'Logement' | 'Emploi' | 'Famille' | 'Transport' | 'Langue'
  readingTime: number // minutes
  intro: string[]
  sections: GuideSection[]
  faq: GuideFaq[]
  sources: { label: string; url: string }[]
  relatedTools?: { label: string; href: string }[]
  updated: string // ISO date
}

export const guides: Guide[] = [
  {
    slug: 'numero-assurance-sociale-nas',
    title: "Obtenir votre NAS (numéro d'assurance sociale) au Canada",
    metaTitle: "NAS Canada : comment obtenir votre numéro d'assurance sociale (2026)",
    description:
      "Guide pas à pas pour obtenir votre numéro d'assurance sociale (NAS) dès votre arrivée au Canada : documents requis, en ligne ou en personne, délais.",
    keywords: [
      'NAS Canada', "numéro d'assurance sociale", 'obtenir NAS nouvel arrivant',
      'NAS résident permanent', 'NAS permis de travail', 'Service Canada NAS',
    ],
    category: 'Démarches',
    readingTime: 4,
    intro: [
      "Le numéro d'assurance sociale (NAS) est le tout premier document à obtenir en arrivant au Canada. Sans lui, vous ne pouvez ni être payé, ni ouvrir certains comptes, ni recevoir de prestations.",
      "C'est gratuit, rapide, et faisable dès le premier jour. Voici comment procéder selon votre statut.",
    ],
    sections: [
      {
        heading: 'À quoi sert le NAS',
        body: [
          "Le NAS est un numéro à 9 chiffres délivré par Service Canada. Votre employeur en a besoin pour vous verser un salaire et déclarer vos impôts. Les banques peuvent le demander pour les comptes qui génèrent des intérêts.",
          "Gardez-le confidentiel : ne le communiquez qu'à un employeur, une institution financière ou l'administration fiscale.",
        ],
      },
      {
        heading: 'Documents requis',
        body: ['Vous avez besoin d\'un document d\'identité prouvant votre statut :'],
        steps: [
          'Résident permanent : carte de RP ou confirmation de résidence permanente (IMM 5292 / 5688).',
          'Travailleur temporaire : permis de travail valide.',
          'Étudiant : permis d\'études autorisant le travail, ou permis de travail.',
          'Un justificatif de domicile peut être demandé pour la demande en personne.',
        ],
      },
      {
        heading: 'Comment faire la demande',
        body: [
          "Trois options existent, toutes gratuites. La demande en ligne est la plus rapide si vos documents sont numérisables.",
        ],
        steps: [
          'En ligne : sur le site de Service Canada, téléversez vos documents. NAS reçu par la poste sous ~10 jours ouvrables.',
          'En personne : dans un Centre Service Canada, avec vos documents originaux. Souvent délivré le jour même.',
          'Par courrier : en dernier recours, délais plus longs.',
        ],
      },
      {
        heading: 'Après l\'obtention',
        body: [
          "Vous ne recevez pas de carte plastifiée : notez votre numéro et rangez la lettre en lieu sûr. Communiquez le NAS à votre employeur dès l'embauche (dans les 3 jours suivant le début du travail).",
        ],
      },
    ],
    faq: [
      {
        q: 'Le NAS est-il payant ?',
        a: 'Non. La demande et la délivrance du NAS sont entièrement gratuites via Service Canada. Méfiez-vous de tout site qui facture ce service.',
      },
      {
        q: 'Puis-je travailler en attendant mon NAS ?',
        a: "Vous pouvez commencer à travailler si vous avez fait la demande, mais devez fournir le NAS à votre employeur dès réception, normalement dans les 3 jours suivant le début de l'emploi.",
      },
      {
        q: 'Mon NAS commence par 9, est-ce normal ?',
        a: "Oui pour les résidents temporaires : les NAS commençant par 9 sont temporaires et liés à la date d'expiration de votre permis. Il faut le mettre à jour au renouvellement.",
      },
    ],
    sources: [
      { label: 'Service Canada — Numéro d\'assurance sociale', url: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html' },
    ],
    relatedTools: [
      { label: 'Simulateur de score CRS', href: '/simulateur-crs' },
      { label: 'Pack Atterrissage', href: '/pack-atterrissage' },
    ],
    updated: '2026-09-04',
  },
  {
    slug: 'assurance-maladie-par-province',
    title: "Assurance maladie au Canada : s'inscrire selon votre province",
    metaTitle: 'Assurance maladie Canada par province : RAMQ, OHIP, MSP… (2026)',
    description:
      "Comment obtenir votre carte d'assurance maladie provinciale à l'arrivée : RAMQ (Québec), OHIP (Ontario), MSP (C.-B.) et le délai de carence à anticiper.",
    keywords: [
      'assurance maladie Canada', 'carte RAMQ nouvel arrivant', 'OHIP Ontario immigrant',
      'délai de carence assurance maladie', "s'inscrire assurance maladie province", 'MSP Colombie-Britannique',
    ],
    category: 'Santé',
    readingTime: 5,
    intro: [
      "La santé publique est gérée par chaque province, pas par le fédéral. Votre couverture dépend donc de là où vous vous installez — et beaucoup de provinces imposent un délai de carence pouvant aller jusqu'à 3 mois.",
      "Inscrivez-vous le plus tôt possible et prévoyez une assurance privée temporaire pour couvrir la période de carence.",
    ],
    sections: [
      {
        heading: 'Le piège du délai de carence',
        body: [
          "Plusieurs provinces (Québec, Ontario, Colombie-Britannique) appliquent un délai de carence avant que la couverture publique ne débute — souvent jusqu'à 3 mois après l'inscription.",
          "Pendant cette période, une urgence médicale peut coûter très cher. Une assurance santé privée pour nouveaux arrivants comble ce trou. Souscrivez-la idéalement avant le départ.",
        ],
      },
      {
        heading: 'Québec — RAMQ',
        body: [
          "Inscrivez-vous à la Régie de l'assurance maladie du Québec dès l'arrivée. La couverture débute généralement après un délai pouvant atteindre 3 mois. Une fois la carte reçue, elle couvre les soins médicaux essentiels.",
        ],
      },
      {
        heading: 'Ontario — OHIP',
        body: [
          "Le régime d'assurance-santé de l'Ontario (OHIP) exige une présence physique et des justificatifs de résidence. Le délai de carence de 3 mois a été assoupli ces dernières années — vérifiez les règles en vigueur à votre inscription.",
        ],
      },
      {
        heading: 'Colombie-Britannique — MSP',
        body: [
          "Le Medical Services Plan couvre les résidents après un délai correspondant au mois d'arrivée plus deux mois. L'inscription se fait en ligne.",
        ],
      },
      {
        heading: 'Documents généralement demandés',
        body: ['Les pièces varient selon la province, mais prévoyez :'],
        steps: [
          "Preuve de statut (carte RP, permis de travail ou d'études).",
          'Preuve de résidence dans la province (bail, facture).',
          "Pièce d'identité avec photo.",
        ],
      },
    ],
    faq: [
      {
        q: 'Suis-je couvert dès mon arrivée ?',
        a: "Rarement. La plupart des grandes provinces imposent un délai de carence pouvant atteindre 3 mois. Prévoyez une assurance privée temporaire pour cette période.",
      },
      {
        q: 'La carte est-elle valable dans tout le Canada ?',
        a: "La couverture est provinciale. En voyage dans une autre province, les soins urgents sont généralement pris en charge, mais pas tout. Hors Canada, la couverture publique est très limitée.",
      },
      {
        q: 'Les enfants sont-ils couverts séparément ?',
        a: 'Chaque membre de la famille doit être inscrit. Vous pouvez généralement inscrire vos enfants sur la même demande que la vôtre.',
      },
    ],
    sources: [
      { label: 'RAMQ — Admissibilité des nouveaux arrivants', url: 'https://www.ramq.gouv.qc.ca/' },
      { label: 'Ontario — OHIP', url: 'https://www.ontario.ca/fr/page/assurance-sante-de-lontario-ohip' },
    ],
    relatedTools: [{ label: 'Pack Atterrissage', href: '/pack-atterrissage' }],
    updated: '2026-09-04',
  },
  {
    slug: 'ouvrir-compte-bancaire-nouvel-arrivant',
    title: 'Ouvrir un compte bancaire canadien en tant que nouvel arrivant',
    metaTitle: 'Compte bancaire nouvel arrivant au Canada : comment ouvrir (2026)',
    description:
      "Ouvrir un compte bancaire dès l'arrivée : documents acceptés, forfaits gratuits pour nouveaux arrivants et comment commencer à bâtir votre historique de crédit.",
    keywords: [
      'compte bancaire nouvel arrivant Canada', 'ouvrir compte banque immigrant',
      'forfait nouvel arrivant banque', 'historique de crédit Canada', 'carte de crédit sans historique',
    ],
    category: 'Finances',
    readingTime: 4,
    intro: [
      "Un compte bancaire canadien est indispensable pour recevoir un salaire, payer un loyer et bâtir votre crédit. La bonne nouvelle : vous pouvez souvent en ouvrir un sans emploi ni historique de crédit.",
      "Les grandes banques proposent des forfaits « nouvel arrivant » gratuits la première année, souvent avec une carte de crédit sans historique requis.",
    ],
    sections: [
      {
        heading: 'Documents généralement acceptés',
        body: ['Prévoyez deux pièces, dont une avec photo :'],
        steps: [
          'Passeport et carte de RP / permis de travail ou d\'études.',
          "Preuve d'adresse au Canada si disponible (certaines banques l'exigent, d'autres non au départ).",
          'Le NAS n\'est pas obligatoire pour un compte courant, mais utile pour les comptes à intérêts.',
        ],
      },
      {
        heading: 'Choisir un forfait nouvel arrivant',
        body: [
          "Les grandes banques (RBC, TD, Scotiabank, BMO, CIBC, Banque Nationale) ont des offres dédiées : frais mensuels offerts pendant 6 à 12 mois, et parfois une carte de crédit approuvée sans historique canadien.",
          "Comparez les frais après la période promotionnelle, l'accès aux virements internationaux et les frais de change.",
        ],
      },
      {
        heading: 'Bâtir votre historique de crédit',
        body: [
          "Au Canada, votre historique repart de zéro. Pour le construire vite et bien :",
        ],
        steps: [
          'Obtenez une carte de crédit (même à faible limite) et utilisez-la pour de petites dépenses.',
          'Payez la totalité du solde chaque mois, avant l\'échéance.',
          'Gardez votre utilisation sous ~30 % de la limite.',
          'Ne multipliez pas les demandes de crédit sur une courte période.',
        ],
      },
    ],
    faq: [
      {
        q: 'Puis-je ouvrir un compte sans emploi ?',
        a: 'Oui. Un compte courant ne requiert pas de preuve d\'emploi. L\'approbation d\'une carte de crédit dépend de la banque et du forfait nouvel arrivant.',
      },
      {
        q: 'Ai-je besoin du NAS pour ouvrir un compte ?',
        a: "Pas pour un compte courant de base. Le NAS devient nécessaire pour les comptes générant des intérêts (épargne, placements), car les intérêts sont déclarés au fisc.",
      },
      {
        q: 'Combien de temps pour un bon score de crédit ?',
        a: "Avec une carte utilisée et payée intégralement chaque mois, un historique utile se construit en 6 à 12 mois. La régularité compte plus que le montant.",
      },
    ],
    sources: [
      { label: 'Agence de la consommation en matière financière du Canada', url: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere.html' },
    ],
    relatedTools: [{ label: 'Pack Atterrissage', href: '/pack-atterrissage' }],
    updated: '2026-09-04',
  },
  {
    slug: 'louer-logement-sans-historique-credit',
    title: 'Louer un logement au Canada sans historique de crédit',
    metaTitle: 'Louer sans historique de crédit au Canada : le guide nouvel arrivant',
    description:
      "Comment convaincre un propriétaire sans dossier de crédit canadien : documents à préparer, alternatives au score, et pièges à éviter à l'arrivée.",
    keywords: [
      'louer logement nouvel arrivant Canada', 'location sans historique de crédit',
      'dossier location immigrant', 'preuve de revenu location Canada', 'caution loyer Canada',
    ],
    category: 'Logement',
    readingTime: 5,
    intro: [
      "Sans historique de crédit canadien, louer semble difficile — mais des milliers de nouveaux arrivants y arrivent chaque mois. La clé : un dossier solide qui rassure le propriétaire autrement que par un score.",
      "Préparez vos documents avant les visites : les logements partent vite dans les grandes villes.",
    ],
    sections: [
      {
        heading: 'Ce que le propriétaire veut vraiment',
        body: [
          "Un propriétaire cherche l'assurance d'être payé. À défaut de score de crédit, compensez par des preuves de solvabilité et de sérieux.",
        ],
      },
      {
        heading: 'Constituez un dossier convaincant',
        body: ['Rassemblez avant les visites :'],
        steps: [
          "Preuve de fonds (relevé bancaire montrant plusieurs mois de loyer disponibles).",
          "Lettre d'emploi ou contrat, ou preuve d'admission si étudiant.",
          "Références (ancien propriétaire, employeur), même de l'étranger.",
          "Pièce d'identité et statut au Canada.",
        ],
      },
      {
        heading: 'Alternatives au score de crédit',
        body: [
          "Si le propriétaire hésite, proposez des solutions courantes :",
        ],
        steps: [
          'Payer quelques mois de loyer d\'avance (attention : encadré par la loi selon la province).',
          "Fournir un garant résidant au Canada.",
          'Souscrire une assurance loyer ou présenter une lettre de votre banque.',
        ],
      },
      {
        heading: 'Attention aux arnaques',
        body: [
          "Ne versez jamais de dépôt avant d'avoir visité et signé un bail. Méfiez-vous des annonces trop belles, des propriétaires « à l'étranger » qui demandent un virement, et vérifiez toujours l'adresse.",
          "Les règles sur les dépôts varient selon la province : renseignez-vous sur le montant maximum légal avant de payer.",
        ],
      },
    ],
    faq: [
      {
        q: 'Puis-je louer sans emploi au Canada ?',
        a: 'Oui, en compensant par une preuve de fonds suffisante, un garant, ou un paiement anticipé encadré par la loi provinciale.',
      },
      {
        q: 'Le propriétaire peut-il exiger plusieurs mois de dépôt ?',
        a: "Cela dépend de la province : certaines limitent strictement le dépôt (par ex. au premier et dernier mois). Vérifiez la règle locale avant d'accepter.",
      },
      {
        q: 'Une garantie de l\'étranger est-elle acceptée ?',
        a: 'Rarement suffisante seule. Un garant résidant au Canada ou une preuve de fonds locale rassure davantage.',
      },
    ],
    sources: [
      { label: 'CMHC — Se loger au Canada', url: 'https://www.cmhc-schl.gc.ca/fr' },
    ],
    relatedTools: [{ label: 'Pack Atterrissage', href: '/pack-atterrissage' }],
    updated: '2026-09-04',
  },
  {
    slug: 'echanger-permis-de-conduire',
    title: 'Échanger votre permis de conduire étranger au Canada',
    metaTitle: 'Échange de permis de conduire au Canada par province (2026)',
    description:
      "Comment échanger votre permis étranger contre un permis canadien : accords de réciprocité, délai pour conduire, examens selon la province.",
    keywords: ['échange permis de conduire Canada', 'permis étranger Québec SAAQ', 'conduire nouvel arrivant', 'permis international Canada'],
    category: 'Transport',
    readingTime: 4,
    intro: [
      "Le permis de conduire est provincial. Vous pouvez généralement conduire quelques mois avec votre permis étranger, mais devez ensuite l'échanger contre un permis local.",
      "Certains pays ont un accord de réciprocité (échange sans examen). Sinon, examens théorique et pratique sont requis.",
    ],
    sections: [
      { heading: 'Le délai pour conduire', body: ["À l'arrivée, vous pouvez conduire avec votre permis étranger (parfois accompagné d'un permis international) pendant une période limitée, souvent 60 à 90 jours selon la province. Passé ce délai, un permis local est obligatoire."] },
      { heading: 'Accords de réciprocité', body: ["Plusieurs pays (France, Suisse, Belgique et d'autres selon la province) ont un accord permettant l'échange sans examen. Renseignez-vous auprès de l'organisme provincial (SAAQ au Québec, ServiceOntario en Ontario)."] },
      { heading: 'Sans accord', body: ['Sans réciprocité, prévoyez :'], steps: ['Un examen théorique (code de la route).', 'Un examen pratique de conduite.', "Parfois un examen de la vue et une période de permis probatoire."] },
    ],
    faq: [
      { q: 'Puis-je conduire dès mon arrivée ?', a: 'Oui, temporairement avec votre permis étranger (souvent 60 à 90 jours), un permis de conduire international aide. Ensuite, échange obligatoire.' },
      { q: 'Mon expérience de conduite compte-t-elle ?', a: "Oui : une preuve d'ancienneté (relevé de votre pays) peut réduire la période probatoire et les frais d'assurance." },
    ],
    sources: [{ label: 'SAAQ — Nouveaux arrivants', url: 'https://saaq.gouv.qc.ca/' }],
    updated: '2026-09-04',
  },
  {
    slug: 'inscrire-enfants-ecole',
    title: 'Inscrire vos enfants à l\'école au Canada',
    metaTitle: 'Inscrire son enfant à l\'école au Canada : démarches nouvel arrivant',
    description:
      "L'école est gratuite et obligatoire. Comment inscrire vos enfants à l'arrivée : documents, secteur scolaire, classes d'accueil et francisation.",
    keywords: ['inscrire enfant école Canada', 'école nouvel arrivant', 'classe accueil francisation', 'commission scolaire inscription'],
    category: 'Famille',
    readingTime: 4,
    intro: [
      "L'école publique est gratuite et obligatoire (généralement de 5-6 ans jusqu'à 16-18 ans selon la province). Inscrivez vos enfants dès l'arrivée, même en cours d'année.",
      "Des classes d'accueil aident les enfants non francophones/anglophones à rattraper la langue.",
    ],
    sections: [
      { heading: 'Où inscrire', body: ["L'inscription se fait auprès du centre de services scolaire (ou conseil scolaire) de votre quartier. L'école dépend de votre adresse : ayez un justificatif de domicile."] },
      { heading: 'Documents habituels', body: ['Prévoyez :'], steps: ["Preuve de statut de l'enfant (passeport, carte RP, permis).", "Preuve d'adresse.", 'Carnet de vaccination / dossier médical.', 'Bulletins scolaires du pays d\'origine (traduits si possible).'] },
      { heading: 'Classes d\'accueil et soutien', body: ["Les enfants ne maîtrisant pas la langue d'enseignement sont souvent placés en classe d'accueil ou reçoivent un soutien linguistique, puis intègrent le cursus régulier."] },
    ],
    faq: [
      { q: "Puis-je inscrire en cours d'année ?", a: "Oui. L'inscription est possible toute l'année ; l'école évalue le niveau et place l'enfant." },
      { q: 'Combien ça coûte ?', a: "L'école publique est gratuite. Restent des frais mineurs (fournitures, sorties, parfois service de garde)." },
    ],
    sources: [{ label: 'Gouvernement du Québec — Scolarisation', url: 'https://www.quebec.ca/education' }],
    updated: '2026-09-04',
  },
  {
    slug: 'reconnaissance-diplomes-equivalence',
    title: 'Faire reconnaître vos diplômes étrangers au Canada',
    metaTitle: 'Équivalence de diplômes au Canada : reconnaissance des acquis (2026)',
    description:
      "Comment faire évaluer vos diplômes étrangers pour l'emploi ou les études : évaluation comparative, ordres professionnels et métiers réglementés.",
    keywords: ['équivalence diplôme Canada', 'reconnaissance diplôme étranger', 'évaluation comparative études', 'ordre professionnel métier réglementé'],
    category: 'Emploi',
    readingTime: 5,
    intro: [
      "Vos diplômes étrangers ne sont pas automatiquement reconnus. Une évaluation comparative situe votre niveau par rapport au système canadien — utile pour l'emploi et les études.",
      "Pour les métiers réglementés (santé, ingénierie, droit, enseignement), un ordre professionnel encadre l'accès et impose souvent des étapes supplémentaires.",
    ],
    sections: [
      { heading: 'Évaluation comparative', body: ["Des organismes provinciaux ou nationaux émettent une évaluation comparant votre diplôme au niveau canadien. Ce document rassure les employeurs, mais ne donne pas le droit d'exercer un métier réglementé."] },
      { heading: 'Métiers réglementés', body: ["Environ 20 % des professions sont réglementées. Pour exercer, il faut l'autorisation de l'ordre concerné : examens, stage, parfois formation d'appoint. Renseignez-vous AVANT le départ, les délais sont longs."] },
      { heading: 'Métiers non réglementés', body: ["Pour la majorité des emplois, aucun permis n'est requis : l'employeur décide. Un CV canadien et l'évaluation comparative suffisent souvent."] },
    ],
    faq: [
      { q: "L'évaluation me permet-elle d'exercer ?", a: "Non pour un métier réglementé : elle atteste seulement du niveau. Le droit d'exercer vient de l'ordre professionnel." },
      { q: 'Quand commencer ?', a: 'Le plus tôt possible, idéalement avant le départ : les procédures des ordres prennent des mois.' },
    ],
    sources: [{ label: 'IRCC — Faire évaluer ses diplômes', url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete.html' }],
    relatedTools: [{ label: 'Simulateur de score CRS', href: '/simulateur-crs' }],
    updated: '2026-09-04',
  },
  {
    slug: 'premiere-declaration-impots',
    title: 'Votre première déclaration d\'impôts au Canada',
    metaTitle: 'Première déclaration d\'impôts au Canada pour nouvel arrivant (2026)',
    description:
      "Pourquoi déclarer même sans revenu, quand et comment produire votre déclaration, et les prestations débloquées (crédit TPS/TVH, allocation enfants).",
    keywords: ['première déclaration impôts Canada', 'déclaration revenus nouvel arrivant', 'crédit TPS TVH', 'ARC nouvel arrivant impôts'],
    category: 'Finances',
    readingTime: 5,
    intro: [
      "Produire une déclaration de revenus, même sans revenu, débloque des prestations : crédit pour la TPS/TVH, allocation canadienne pour enfants, crédits provinciaux.",
      "La date limite est généralement le 30 avril pour l'année précédente.",
    ],
    sections: [
      { heading: 'Pourquoi déclarer même sans revenu', body: ["Beaucoup de prestations sont calculées à partir de votre déclaration. Sans elle, vous ne recevez pas le crédit TPS/TVH ni certaines allocations. C'est souvent de l'argent laissé sur la table."] },
      { heading: "L'année d'arrivée", body: ["Pour votre première déclaration, vous indiquez votre date d'entrée : vous êtes imposé sur les revenus mondiaux à partir de cette date. Rassemblez vos revenus canadiens et la date exacte d'établissement."] },
      { heading: 'Comment produire', body: ['Options :'], steps: ['En ligne via un logiciel certifié par l\'ARC (plusieurs gratuits).', "Par un comptable ou une clinique d'impôts bénévole (pour revenus modestes).", 'Sur papier en dernier recours.'] },
    ],
    faq: [
      { q: 'Dois-je déclarer si je viens d\'arriver ?', a: 'Oui, dès la première année fiscale où vous résidez, même partielle et même sans revenu : cela débloque vos prestations.' },
      { q: 'Quels revenus déclarer ?', a: "Vos revenus canadiens, et vos revenus mondiaux à partir de la date où vous devenez résident fiscal. En cas de doute, consultez l'ARC ou un professionnel." },
    ],
    sources: [{ label: 'ARC — Nouveaux arrivants au Canada', url: 'https://www.canada.ca/fr/agence-revenu.html' }],
    updated: '2026-09-04',
  },
  {
    slug: 'allocation-canadienne-enfants-ace',
    title: 'Allocation canadienne pour enfants (ACE) : y avoir droit',
    metaTitle: 'Allocation canadienne pour enfants (ACE) nouvel arrivant : demande 2026',
    description:
      "L'ACE est un versement mensuel non imposable par enfant de moins de 18 ans. Conditions pour les nouveaux arrivants, comment la demander et le rôle de la déclaration d'impôts.",
    keywords: ['allocation canadienne enfants ACE', 'ACE nouvel arrivant', 'prestation enfant Canada', 'demande ACE ARC'],
    category: 'Finances',
    readingTime: 4,
    intro: [
      "L'Allocation canadienne pour enfants (ACE) est un versement mensuel, non imposable, pour aider à couvrir le coût d'un enfant de moins de 18 ans. Le montant dépend du revenu familial.",
      "Les nouveaux arrivants peuvent y avoir droit dès qu'ils remplissent les conditions de résidence.",
    ],
    sections: [
      { heading: 'Conditions', body: ["Il faut résider au Canada, vivre avec l'enfant et en être le principal responsable, et avoir un statut admissible (résident permanent, protégé, ou temporaire remplissant certaines conditions de durée)."] },
      { heading: 'Comment la demander', body: ['Deux voies :'], steps: ["Au moment de déclarer la naissance (pour un enfant né au Canada).", "En remplissant le formulaire de demande de l'ARC et en fournissant les preuves de statut et de résidence.", 'Vous et votre conjoint devez produire une déclaration de revenus chaque année pour continuer à la recevoir.'] },
      { heading: 'Le lien avec les impôts', body: ["Le montant est recalculé chaque année selon votre revenu de l'année précédente. Ne pas déclarer = versements suspendus."] },
    ],
    faq: [
      { q: 'Faut-il être résident permanent ?', a: "Pas forcément : certains résidents temporaires y ont droit après une période de résidence. La déclaration de statut et de résidence est requise." },
      { q: "Quand arrive le premier versement ?", a: "Généralement dans les 8 semaines suivant une demande complète, versé mensuellement ensuite." },
    ],
    sources: [{ label: 'ARC — Allocation canadienne pour enfants', url: 'https://www.canada.ca/fr/agence-revenu/services/prestations-enfants-familles.html' }],
    updated: '2026-09-04',
  },
  {
    slug: 'cours-francais-anglais-gratuits',
    title: 'Cours de français et d\'anglais gratuits pour nouveaux arrivants',
    metaTitle: 'Cours de langue gratuits au Canada : francisation, CLIC/LINC (2026)',
    description:
      "Des cours de langue gratuits financés par le gouvernement : francisation au Québec, CLIC/LINC ailleurs. Qui y a droit et comment s'inscrire.",
    keywords: ['cours français gratuit Canada', 'francisation Québec', 'cours anglais gratuit immigrant', 'CLIC LINC nouvel arrivant'],
    category: 'Langue',
    readingTime: 3,
    intro: [
      "La maîtrise de la langue est le premier levier d'intégration et d'emploi. Le gouvernement finance des cours gratuits pour les nouveaux arrivants.",
      "Certains programmes offrent aussi une aide financière, la garde d'enfants ou le transport pendant la formation.",
    ],
    sections: [
      { heading: 'Au Québec — francisation', body: ["Des cours de français gratuits (temps plein ou partiel, en présentiel ou en ligne) sont offerts, parfois avec allocation. L'inscription se fait via les services d'intégration du gouvernement du Québec."] },
      { heading: 'Ailleurs — CLIC / LINC', body: ["Les Cours de langue pour les immigrants au Canada (CLIC en français, LINC en anglais) sont gratuits pour les résidents permanents et certains autres statuts, financés par IRCC."] },
      { heading: "S'inscrire", body: ["Passez par un organisme d'accueil des nouveaux arrivants : il évalue votre niveau et vous oriente vers le bon cours."] },
    ],
    faq: [
      { q: 'Est-ce vraiment gratuit ?', a: 'Oui pour les publics admissibles. Certains programmes ajoutent une allocation, la garde d\'enfants ou le transport.' },
      { q: 'Puis-je travailler en même temps ?', a: "Oui : des cours à temps partiel et en soirée existent pour les personnes qui travaillent." },
    ],
    sources: [{ label: 'IRCC — Cours de langue gratuits', url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete.html' }],
    updated: '2026-09-04',
  },
  {
    slug: 'cv-canadien',
    title: 'Adapter votre CV au format canadien',
    metaTitle: 'CV canadien : comment adapter votre CV pour le marché (2026)',
    description:
      "Le CV canadien a ses codes : pas de photo, pas d'âge, ciblé sur les résultats. Comment adapter le vôtre pour passer les filtres et décrocher des entrevues.",
    keywords: ['CV canadien', 'adapter CV Canada', 'CV nouvel arrivant emploi', 'lettre présentation Canada', 'ATS CV'],
    category: 'Emploi',
    readingTime: 4,
    intro: [
      "Un CV étranger tel quel passe mal au Canada. Le format local est court, factuel, orienté résultats — et souvent lu d'abord par un logiciel (ATS) avant un humain.",
      "Adapter votre CV double vos chances d'entrevue.",
    ],
    sections: [
      { heading: 'Les règles de base', body: ['Un CV canadien :'], steps: ['Ne contient ni photo, ni âge, ni situation familiale, ni religion.', 'Fait 1 à 2 pages maximum.', 'Met en avant des réalisations chiffrées, pas des tâches.', 'Utilise les mots-clés de l\'offre (pour passer les filtres ATS).'] },
      { heading: 'Structure recommandée', body: ["En-tête (nom, ville, téléphone, courriel, LinkedIn), résumé de profil en 2-3 lignes, expériences (verbe d'action + résultat), formation, compétences, langues."] },
      { heading: "L'expérience étrangère", body: ["Ne la cachez pas : traduisez les intitulés en équivalents canadiens et expliquez le contexte si l'employeur est inconnu ici."] },
    ],
    faq: [
      { q: 'Faut-il mettre une photo ?', a: 'Non. Photo, âge et statut familial sont à proscrire au Canada pour éviter tout biais et respecter les usages.' },
      { q: "Qu'est-ce qu'un ATS ?", a: "Un logiciel qui filtre les CV par mots-clés avant lecture humaine. Reprenez les termes exacts de l'offre pour passer ce filtre." },
    ],
    sources: [{ label: 'Guichet-Emplois du Canada', url: 'https://www.guichetemplois.gc.ca/' }],
    relatedTools: [{ label: 'Pack Atterrissage', href: '/pack-atterrissage' }],
    updated: '2026-09-04',
  },
  {
    slug: 'forfait-mobile-internet-nouvel-arrivant',
    title: 'Choisir un forfait mobile et internet à l\'arrivée',
    metaTitle: 'Forfait mobile et internet nouvel arrivant au Canada (2026)',
    description:
      "Comment obtenir une ligne mobile sans historique de crédit, éviter les frais cachés et choisir un forfait internet adapté dès votre arrivée.",
    keywords: ['forfait mobile nouvel arrivant Canada', 'téléphone sans crédit Canada', 'forfait internet immigrant', 'SIM prépayée Canada'],
    category: 'Démarches',
    readingTime: 3,
    intro: [
      "Une ligne canadienne est nécessaire pour l'emploi, la banque et les démarches. Sans historique de crédit, un forfait prépayé ou un fournisseur à bas coût est le point de départ.",
      "Les prix sont élevés au Canada : comparez avant de signer.",
    ],
    sections: [
      { heading: 'Prépayé vs forfait', body: ["Sans historique de crédit, commencez par un forfait prépayé (aucune vérification). Après quelques mois de factures payées, vous accédez aux forfaits mensuels moins chers au Go."] },
      { heading: 'Marques à bas coût', body: ["Les grands opérateurs ont des marques secondaires (souvent moins chères) et des fournisseurs indépendants existent. Regardez le prix APRÈS promotion et les frais d'activation."] },
      { heading: 'Internet à domicile', body: ["Pour internet, comparez les offres de votre quartier ; des fournisseurs indépendants sont souvent moins chers que les gros. Vérifiez la durée d'engagement."] },
    ],
    faq: [
      { q: 'Puis-je avoir une ligne sans crédit ?', a: 'Oui : un forfait prépayé ne demande aucune vérification de crédit. Idéal les premiers mois.' },
      { q: 'Pourquoi c\'est si cher ?', a: "Le marché canadien est concentré. Les marques secondaires et les fournisseurs indépendants réduisent la facture." },
    ],
    sources: [{ label: 'CRTC — Services de communication', url: 'https://crtc.gc.ca/fra/accueil-home.htm' }],
    updated: '2026-09-04',
  },
  {
    slug: 'trouver-garderie-place-cpe',
    title: 'Trouver une garderie ou une place en CPE',
    metaTitle: 'Garderie et CPE au Canada : trouver une place (nouvel arrivant 2026)',
    description:
      "Les places de garde sont rares et se réservent tôt. Types de garde, coûts, listes d'attente et aides financières selon la province.",
    keywords: ['garderie Canada nouvel arrivant', 'place CPE Québec', 'coût garderie Canada', 'liste attente garderie'],
    category: 'Famille',
    readingTime: 4,
    intro: [
      "Les places de garde sont très demandées : inscrivez-vous sur les listes d'attente dès que possible, parfois avant même l'arrivée.",
      "Les coûts et aides varient beaucoup selon la province — certaines subventionnent fortement la garde.",
    ],
    sections: [
      { heading: 'Types de garde', body: ["Garde subventionnée (places à tarif réduit, listes d'attente longues), garde privée non subventionnée (plus chère, plus de disponibilité), et garde en milieu familial."] },
      { heading: "S'inscrire tôt", body: ["Inscrivez votre enfant sur les listes d'attente le plus tôt possible. Au Québec, un guichet unique centralise les demandes de places subventionnées."] },
      { heading: 'Aides financières', body: ["Selon la province, des crédits d'impôt ou subventions réduisent le coût. Renseignez-vous sur le soutien disponible pour votre revenu."] },
    ],
    faq: [
      { q: "Puis-je m'inscrire avant d'arriver ?", a: "Souvent oui, sur les listes d'attente. Vu la demande, plus tôt vaut mieux." },
      { q: 'Combien ça coûte ?', a: "Très variable : de quelques dollars par jour en place subventionnée à plusieurs dizaines en privé. Vérifiez les aides de votre province." },
    ],
    sources: [{ label: 'Québec — Guichet unique places (La Place 0-5)', url: 'https://www.laplace0-5.com/' }],
    updated: '2026-09-04',
  },
  {
    slug: 'se-deplacer-transport-voiture',
    title: 'Se déplacer au Canada : transport en commun et voiture',
    metaTitle: 'Transport au Canada nouvel arrivant : bus, métro, acheter une voiture',
    description:
      "Cartes de transport en commun, faut-il une voiture, assurance auto obligatoire et coûts à prévoir selon la ville.",
    keywords: ['transport en commun Canada', 'carte OPUS Presto', 'acheter voiture nouvel arrivant', 'assurance auto Canada'],
    category: 'Transport',
    readingTime: 3,
    intro: [
      "Dans les grandes villes, le transport en commun suffit souvent au départ. Ailleurs, une voiture devient vite nécessaire — avec une assurance obligatoire.",
      "Anticipez les coûts : l'auto (achat, assurance, essence) pèse lourd dans un budget de nouvel arrivant.",
    ],
    sections: [
      { heading: 'Transport en commun', body: ["Chaque ville a sa carte rechargeable (OPUS à Montréal, Presto à Toronto, Compass à Vancouver). Des tarifs réduits existent pour étudiants et aînés."] },
      { heading: 'Faut-il une voiture ?', body: ["En centre urbain, non au départ. En banlieue ou petite ville, souvent oui. Comparez le coût total (assurance + essence + stationnement) au transport en commun avant d'acheter."] },
      { heading: 'Assurance auto', body: ["L'assurance auto est obligatoire pour conduire. Le tarif dépend de votre historique : apportez une preuve d'ancienneté et de bon dossier de votre pays pour le réduire."] },
    ],
    faq: [
      { q: 'Puis-je conduire ma voiture sans assurance ?', a: 'Non. L\'assurance responsabilité est obligatoire partout au Canada pour conduire légalement.' },
      { q: 'Comment payer moins cher l\'assurance ?', a: "Fournissez une lettre d'expérience de votre ancien assureur : elle prouve votre ancienneté et fait baisser la prime." },
    ],
    sources: [{ label: 'Gouvernement du Canada — Vivre au Canada', url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete.html' }],
    updated: '2026-09-04',
  },
  {
    slug: 'maintenir-carte-residence-permanente',
    title: 'Maintenir et renouveler votre carte de résident permanent',
    metaTitle: 'Carte de RP : obligation de résidence et renouvellement (2026)',
    description:
      "L'obligation de résidence (730 jours sur 5 ans), quand renouveler votre carte de RP et comment voyager sans la perdre.",
    keywords: ['carte résident permanent renouvellement', 'obligation de résidence RP', '730 jours sur 5 ans', 'perdre statut résident permanent'],
    category: 'Démarches',
    readingTime: 4,
    intro: [
      "Le statut de résident permanent s'accompagne d'une obligation : être physiquement présent au Canada au moins 730 jours sur 5 ans. La carte de RP, elle, se renouvelle.",
      "Anticipez : voyager beaucoup ou laisser expirer votre carte peut compliquer votre retour et votre statut.",
    ],
    sections: [
      { heading: "L'obligation de résidence", body: ["Vous devez cumuler au moins 730 jours de présence au Canada sur toute période de 5 ans. Certaines absences (accompagner un conjoint citoyen, travail pour une entreprise canadienne à l'étranger) peuvent compter."] },
      { heading: 'Renouveler la carte', body: ["La carte de RP a une durée de validité (souvent 5 ans). Renouvelez-la avant expiration si vous prévoyez de voyager : elle sert de document de voyage pour rentrer par avion."] },
      { heading: 'Voyager sans la perdre', body: ["Une carte expirée ne fait pas perdre le statut, mais complique le retour. Sans carte valide à l'étranger, un titre de voyage spécial peut être nécessaire."] },
    ],
    faq: [
      { q: 'Je voyage beaucoup, vais-je perdre mon statut ?', a: "Risque si vous descendez sous 730 jours de présence sur 5 ans. Suivez vos jours de présence de près." },
      { q: 'Ma carte expire, ai-je perdu mon statut ?', a: "Non : la carte est un document, pas le statut. Mais renouvelez-la avant de voyager par avion." },
    ],
    sources: [{ label: 'IRCC — Obligation de résidence', url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete.html' }],
    updated: '2026-09-04',
  },
  {
    slug: 'budget-premieres-semaines',
    title: 'Budget des premières semaines au Canada',
    metaTitle: 'Budget d\'installation au Canada : combien prévoir à l\'arrivée (2026)',
    description:
      "Les dépenses à anticiper le premier mois : dépôt de loyer, meubles, épicerie, transport, téléphone. Comment éviter les mauvaises surprises.",
    keywords: ['budget installation Canada', 'coût premier mois immigrant', 'combien argent arriver Canada', 'dépenses nouvel arrivant'],
    category: 'Finances',
    readingTime: 4,
    intro: [
      "Le premier mois concentre beaucoup de dépenses en une fois : logement, meubles, dépôts, épicerie. Un coussin financier évite le stress.",
      "Les montants varient fortement selon la ville : Toronto et Vancouver coûtent bien plus que la moyenne.",
    ],
    sections: [
      { heading: 'Les gros postes du premier mois', body: ['À prévoir dès l\'arrivée :'], steps: ['Logement : premier (et parfois dernier) mois de loyer + éventuel dépôt.', 'Meubles et électroménagers de base (l\'occasion fait économiser).', 'Épicerie et produits ménagers de départ.', 'Téléphone + transport + éventuellement assurance santé temporaire.'] },
      { heading: 'Réduire la facture', body: ["Achetez d'occasion (groupes d'entraide, marchés en ligne), profitez des banques alimentaires et organismes d'accueil, et comparez systématiquement avant de signer un engagement."] },
      { heading: 'Garder une réserve', body: ["Gardez de quoi couvrir plusieurs semaines sans revenu : trouver un emploi prend du temps, et les premières paies arrivent en décalé."] },
    ],
    faq: [
      { q: 'Combien faut-il prévoir ?', a: "Cela dépend de la ville et de la taille du foyer. Prévoyez plusieurs mois de dépenses courantes en réserve, au-delà des minimums exigés par l'immigration." },
      { q: 'Où trouver des meubles pas chers ?', a: "Marchés en ligne d'occasion, groupes d'entraide de nouveaux arrivants, ventes de déménagement et organismes communautaires." },
    ],
    sources: [{ label: 'IRCC — Préparer son installation', url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete.html' }],
    relatedTools: [{ label: 'Pack Atterrissage', href: '/pack-atterrissage' }],
    updated: '2026-09-04',
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug)
}
