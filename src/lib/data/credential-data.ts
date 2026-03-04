// Educational Credential Assessment (ECA) and Professional Recognition Data
// For foreign credential recognition in Canada

// ECA Designated Organizations
export const ecaOrganizations = [
  {
    id: 'wes',
    name: 'World Education Services',
    shortName: 'WES',
    description: 'Organisme le plus populaire pour l\'immigration canadienne',
    descriptionEn: 'Most popular organization for Canadian immigration',
    processingTime: '4-8 weeks',
    processingTimeExpedited: '7 business days',
    cost: 280, // CAD approximate
    costExpedited: 380,
    acceptedFor: ['express_entry', 'cec', 'fsw', 'fst', 'pnp'],
    notAcceptedFor: ['immigration_quebec', 'mcrcp'],
    url: 'https://www.wes.org/ca/',
    requirements: ['Diplômes originaux', 'Traductions certifiées', 'Transcripts'],
    rating: 4.5,
  },
  {
    id: 'iqas',
    name: 'International Qualifications Assessment Service',
    shortName: 'IQAS',
    description: 'Service provincial de l\'Alberta, accepté partout',
    descriptionEn: 'Alberta provincial service, accepted everywhere',
    processingTime: '6-8 weeks',
    cost: 200,
    acceptedFor: ['express_entry', 'cec', 'fsw', 'fst', 'pnp', 'immigration_quebec'],
    url: 'https://www.alberta.ca/iqas-immigration.aspx',
    requirements: ['Diplômes originaux', 'Traductions', 'Formulaire IQAS'],
    rating: 4.3,
  },
  {
    id: 'ices',
    name: 'International Credential Evaluation Service',
    shortName: 'ICES',
    description: 'Service de la Colombie-Britannique',
    descriptionEn: 'British Columbia service',
    processingTime: '4-6 weeks',
    cost: 230,
    acceptedFor: ['express_entry', 'cec', 'fsw', 'fst', 'pnp'],
    url: 'https://www.bcit.ca/ices/',
    requirements: ['Diplômes originaux', 'Traductions', 'Transcripts'],
    rating: 4.2,
  },
  {
    id: 'ces',
    name: 'Comparative Education Service',
    shortName: 'CES',
    description: 'Service de l\'Université de Toronto',
    descriptionEn: 'University of Toronto service',
    processingTime: '4-6 weeks',
    cost: 285,
    acceptedFor: ['express_entry', 'cec', 'fsw', 'fst', 'pnp'],
    url: 'https://ces.utoronto.ca/',
    requirements: ['Diplômes originaux', 'Traductions', 'Transcripts'],
    rating: 4.4,
  },
  {
    id: 'mcc',
    name: 'Medical Council of Canada',
    shortName: 'MCC',
    description: 'Pour les médecins étrangers uniquement',
    descriptionEn: 'For foreign physicians only',
    processingTime: '8-12 weeks',
    cost: 850,
    acceptedFor: ['express_entry_physicians'],
    url: 'https://mcc.ca/',
    requirements: ['Diplôme médical', 'LMCC', 'Examen MCCQE'],
    rating: 4.0,
    professions: ['Physician', 'Doctor', 'Medical Doctor'],
  },
  {
    id: 'pebc',
    name: 'Pharmacy Examining Board of Canada',
    shortName: 'PEBC',
    description: 'Pour les pharmaciens étrangers uniquement',
    descriptionEn: 'For foreign pharmacists only',
    processingTime: '6-10 weeks',
    cost: 530,
    acceptedFor: ['express_entry_pharmacists'],
    url: 'https://pebc.ca/',
    requirements: ['Diplôme pharmacie', 'Examen PEBC', 'Stage'],
    rating: 4.0,
    professions: ['Pharmacist'],
  },
  {
    id: 'ncca',
    name: 'National Committee of the Chiropractic Assessors',
    shortName: 'NCCA',
    description: 'Pour les chiropraticiens',
    descriptionEn: 'For chiropractors',
    processingTime: '6-8 weeks',
    cost: 400,
    acceptedFor: ['express_entry_chiropractors'],
    url: 'https://www.chiropracticcanada.ca/',
    rating: 4.0,
    professions: ['Chiropractor'],
  },
]

// Regulated professions in Canada
export const regulatedProfessions = {
  health: [
    {
      name: 'Médecin / Omnipraticien',
      nameEn: 'Physician / General Practitioner',
      noc: '31102',
      regulatoryBody: 'Collège des médecins par province',
      regulatoryBodyEn: 'Provincial College of Physicians',
      requirements: [
        'ECA du MCC',
        'Examen MCCQE Part 1 et 2',
        'Résidence au Canada',
        'Licence provinciale',
      ],
      timeline: '2-5 ans',
      difficulty: 'very_hard',
      bridgingPrograms: ['Practice Ready Assessment', 'IMG Programs'],
    },
    {
      name: 'Infirmier autorisé',
      nameEn: 'Registered Nurse',
      noc: '31301',
      regulatoryBody: 'Ordre des infirmiers par province',
      regulatoryBodyEn: 'Provincial College of Nurses',
      requirements: [
        'ECA (WES ou autres)',
        'Examen NCLEX-RN',
        'Évaluation NNAS',
        'Licence provinciale',
      ],
      timeline: '6-18 mois',
      difficulty: 'moderate',
      bridgingPrograms: ['Caring for Ontario', 'Nursing Bridge Programs'],
    },
    {
      name: 'Pharmacien',
      nameEn: 'Pharmacist',
      noc: '31120',
      regulatoryBody: 'Ordre des pharmaciens par province',
      regulatoryBodyEn: 'Provincial College of Pharmacists',
      requirements: [
        'Évaluation PEBC',
        'Examen PEBC Qualifying',
        'Stage pratique',
        'Licence provinciale',
      ],
      timeline: '1-2 ans',
      difficulty: 'moderate',
    },
    {
      name: 'Dentiste',
      nameEn: 'Dentist',
      noc: '31110',
      regulatoryBody: 'Ordre des dentistes par province',
      regulatoryBodyEn: 'Provincial College of Dentists',
      requirements: [
        'Évaluation NDEB',
        'Examen NDEB',
        'Programme qualifiant optionnel',
        'Licence provinciale',
      ],
      timeline: '1-3 ans',
      difficulty: 'hard',
    },
  ],
  
  engineering: [
    {
      name: 'Ingénieur',
      nameEn: 'Engineer',
      noc: '21300',
      regulatoryBody: 'Ordre des ingénieurs par province',
      regulatoryBodyEn: 'Provincial Engineering Association',
      requirements: [
        'Évaluation académique',
        'Examen de pratique professionnelle',
        'Expérience canadienne (1-4 ans)',
        'Examen PPE',
      ],
      timeline: '1-4 ans',
      difficulty: 'moderate',
      bridgingPrograms: ['Engineering Employment Bridging Program'],
    },
  ],
  
  legal: [
    {
      name: 'Avocat',
      nameEn: 'Lawyer',
      noc: '41101',
      regulatoryBody: 'Barreau par province',
      regulatoryBodyEn: 'Provincial Law Society',
      requirements: [
        'Évaluation NCA',
        'Examens NCA ou école de droit',
        'Stage (articling)',
        'Examen du barreau',
      ],
      timeline: '2-4 ans',
      difficulty: 'very_hard',
      bridgingPrograms: ['NCA Program', 'Internationally Trained Lawyers'],
    },
    {
      name: 'Notaire (Québec)',
      nameEn: 'Notary (Quebec)',
      noc: '41102',
      regulatoryBody: 'Chambre des notaires du Québec',
      regulatoryBodyEn: 'Chamber of Notaries of Quebec',
      requirements: [
        'Maîtrise en droit notarial (UdeM ou UQAM)',
        'Stage de 2 ans',
        'Examen professionnel',
      ],
      timeline: '3-5 ans',
      difficulty: 'very_hard',
    },
  ],
  
  accounting: [
    {
      name: 'Comptable professionnel agréé (CPA)',
      nameEn: 'Chartered Professional Accountant (CPA)',
      noc: '11100',
      regulatoryBody: 'Ordre des CPA par province',
      regulatoryBodyEn: 'Provincial CPA Order',
      requirements: [
        'Évaluation CPA',
        'Cours de perfectionnement',
        'Examen CFE (Common Final Examination)',
        'Expérience pratique',
      ],
      timeline: '1-3 ans',
      difficulty: 'moderate',
      bridgingPrograms: ['CPA Bridging Program'],
    },
  ],
  
  skilledTrades: [
    {
      name: 'Électricien',
      nameEn: 'Electrician',
      noc: '72200',
      regulatoryBody: 'Apprentissage par province',
      regulatoryBodyEn: 'Provincial Apprenticeship Authority',
      requirements: [
        'Évaluation des compétences',
        'Examen de certification (Red Seal)',
        'Heures d\'apprentissage',
      ],
      timeline: '6-18 mois',
      difficulty: 'moderate',
      redSeal: true,
    },
    {
      name: 'Plombier',
      nameEn: 'Plumber',
      noc: '72300',
      regulatoryBody: 'Apprentissage par province',
      regulatoryBodyEn: 'Provincial Apprenticeship Authority',
      requirements: [
        'Évaluation des compétences',
        'Examen de certification (Red Seal)',
        'Heures d\'apprentissage',
      ],
      timeline: '6-18 mois',
      difficulty: 'moderate',
      redSeal: true,
    },
    {
      name: 'Soudeur',
      nameEn: 'Welder',
      noc: '72106',
      regulatoryBody: 'Apprentissage par province',
      regulatoryBodyEn: 'Provincial Apprenticeship Authority',
      requirements: [
        'Test de soudage',
        'Certification CWB',
      ],
      timeline: '3-6 mois',
      difficulty: 'easy',
      redSeal: false,
    },
  ],
  
  education: [
    {
      name: 'Enseignant (primaire/secondaire)',
      nameEn: 'Teacher (Elementary/Secondary)',
      noc: '41220',
      regulatoryBody: 'Ordre des enseignants par province',
      regulatoryBodyEn: 'Provincial Teachers\' College',
      requirements: [
        'Évaluation du diplôme',
        'Cours additionnels si requis',
        'Certification provinciale',
        'Test de langue (selon province)',
      ],
      timeline: '6-18 mois',
      difficulty: 'moderate',
      bridgingPrograms: ['Teacher Bridging Programs'],
    },
  ],
}

// Non-regulated professions (no license required)
export const nonRegulatedProfessions = [
  { name: 'Développeur informatique', nameEn: 'Software Developer', noc: '21230' },
  { name: 'Analyste de données', nameEn: 'Data Analyst', noc: '21211' },
  { name: 'Designer graphique', nameEn: 'Graphic Designer', noc: '52112' },
  { name: 'Marketing', nameEn: 'Marketing Specialist', noc: '11202' },
  { name: 'Gestionnaire de projet', nameEn: 'Project Manager', noc: '70010' },
  { name: 'Comptable (non-CPA)', nameEn: 'Accountant (non-CPA)', noc: '11100' },
  { name: 'Vendeur', nameEn: 'Sales Representative', noc: '64100' },
  { name: 'Agent de service à la clientèle', nameEn: 'Customer Service Representative', noc: '64409' },
]

// Bridging programs by province
export const bridgingPrograms = {
  'ON': [
    { name: 'Bridge Training Programs', url: 'https://www.ontario.ca/page/bridge-training-programs', target: 'all_professions' },
    { name: 'Health Force Ontario', url: 'https://www.healthforceontario.ca/', target: 'health' },
    { name: 'Access Centre for Regulated Employment', url: 'https://www.accesscentre.ca/', target: 'all_professions' },
  ],
  'BC': [
    { name: 'Skills Connect for Immigrants', url: 'https://www.issbc.org/', target: 'all_professions' },
    { name: 'BC Internationally Trained Professionals Network', url: 'https://www.bc-itp.com/', target: 'all_professions' },
  ],
  'QC': [
    { name: 'Programme d\'aide à l\'intégration', url: 'https://www.immigration-quebec.gouv.qc.ca/', target: 'all_professions' },
    { name: 'Ordres professionnels (formations)', url: 'https://www.immigration-quebec.gouv.qc.ca/', target: 'regulated' },
  ],
  'AB': [
    { name: 'Alberta Immigrant Nominee Program', url: 'https://www.alberta.ca/aaip.aspx', target: 'all_professions' },
    { name: 'Calgary Catholic Immigration Society', url: 'https://www.ccisab.ca/', target: 'all_professions' },
  ],
}

// Language test requirements for professional licensing
export const languageTestRequirements = {
  academic: {
    ielts: { listening: 7.5, reading: 7, writing: 7, speaking: 7.5 },
    celpip: { listening: 9, reading: 9, writing: 9, speaking: 9 },
    tef: { listening: 300, reading: 250, writing: 350, speaking: 350 },
  },
  general: {
    ielts: { listening: 6, reading: 6, writing: 6, speaking: 6 },
    celcip: { listening: 7, reading: 7, writing: 7, speaking: 7 },
  },
  professions: {
    nurse: { ielts: { overall: 7, no_below: 6.5 }, description: 'CELPIP/IELTS Academic' },
    pharmacist: { ielts: { overall: 7, no_below: 6.5 }, description: 'IELTS Academic' },
    teacher: { ielts: { overall: 7, speaking_writing: 7 }, description: 'Varies by province' },
  },
}

// Steps for credential recognition
export const credentialRecognitionSteps = [
  {
    step: 1,
    title: 'Évaluation des diplômes (ECA)',
    titleEn: 'Educational Credential Assessment (ECA)',
    description: 'Faire évaluer vos diplômes par un organisme désigné',
    descriptionEn: 'Have your credentials evaluated by a designated organization',
    duration: '4-8 semaines',
  },
  {
    step: 2,
    title: 'Évaluation professionnelle',
    titleEn: 'Professional Assessment',
    description: 'Contacter l\'ordre professionnel de votre province',
    descriptionEn: 'Contact your provincial professional regulatory body',
    duration: '2-4 semaines',
  },
  {
    step: 3,
    title: 'Examens et tests',
    titleEn: 'Exams and Tests',
    description: 'Passer les examens requis selon votre profession',
    descriptionEn: 'Take required exams for your profession',
    duration: 'Variable',
  },
  {
    step: 4,
    title: 'Programme de transition',
    titleEn: 'Bridging Program',
    description: 'Cours de formation ou stage si nécessaire',
    descriptionEn: 'Training courses or internship if required',
    duration: '3-12 mois',
  },
  {
    step: 5,
    title: 'Certification/Licence',
    titleEn: 'Certification/License',
    description: 'Obtenir votre licence professionnelle',
    descriptionEn: 'Obtain your professional license',
    duration: '2-4 semaines',
  },
]
