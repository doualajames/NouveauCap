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
  category: 'Démarches' | 'Santé' | 'Finances' | 'Logement' | 'Emploi'
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
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug)
}
