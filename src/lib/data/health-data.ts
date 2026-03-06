// Healthcare Coverage Data for Canadian Provinces
// Provincial health insurance waiting periods and eligibility

// Provincial health plan details
export const provincialHealthPlans = {
  'ON': {
    name: 'OHIP',
    fullName: 'Ontario Health Insurance Plan',
    fullNameFr: 'Régime d\'assurance-santé de l\'Ontario',
    waitingPeriod: 0, // NO waiting period as of 2024
    waitingPeriodNote: {
      fr: 'Pas de délai de carence! Couverture immédiate pour les résidents permanents et certains travailleurs temporaires.',
      en: 'No waiting period! Immediate coverage for PRs and certain temporary workers.',
    },
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT', 'SPOUSE_WORK_PERMIT'],
    notEligible: ['FOREIGN_STUDENT'],
    studentNote: {
      fr: 'Les étudiants internationaux ne sont PAS admissibles à OHIP. Assurance privée obligatoire.',
      en: 'International students are NOT eligible for OHIP. Private insurance mandatory.',
    },
    applyUrl: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
    documents: [
      { name: 'Preuve de statut (COPR, permis)', nameEn: 'Proof of status (COPR, permit)' },
      { name: 'Preuve de résidence en Ontario', nameEn: 'Proof of Ontario residence' },
      { name: 'Pièce d\'identité avec photo', nameEn: 'Photo ID' },
    ],
    processingTime: '4-6 weeks',
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false, // Except for seniors/children under certain programs
      vision: false, // Except for children/seniors
      mentalHealth: true, // Limited
    },
  },
  
  'QC': {
    name: 'RAMQ',
    fullName: 'Régie de l\'assurance maladie du Québec',
    fullNameFr: 'Régie de l\'assurance maladie du Québec',
    waitingPeriod: 90, // Up to 3 months
    waitingPeriodNote: {
      fr: 'Délai de carence jusqu\'à 3 mois. Couverture débute le premier jour du mois suivant les 3 mois.',
      en: 'Waiting period up to 3 months. Coverage starts first day of month following the 3 months.',
    },
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT'],
    studentEligible: 'conditional', // Only with social security agreement
    studentCountries: ['FR', 'BE', 'DK', 'FI', 'GR', 'LU', 'NO', 'PT', 'RO', 'SE'],
    studentNote: {
      fr: 'Les étudiants de pays avec entente de sécurité sociale (France, Belgique, etc.) sont admissibles.',
      en: 'Students from countries with social security agreements (France, Belgium, etc.) are eligible.',
    },
    applyUrl: 'https://www.ramq.gouv.qc.ca/en/citizens/health-insurance/register',
    documents: [
      { name: 'Preuve de statut', nameEn: 'Proof of status' },
      { name: 'Preuve de résidence au Québec', nameEn: 'Proof of Quebec residence' },
      { name: 'Acte de naissance (traduit)', nameEn: 'Birth certificate (translated)' },
      { name: 'Photo format passeport', nameEn: 'Passport size photo' },
    ],
    processingTime: '2-4 weeks',
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false, // Children under 10 covered
      prescription: true, // Public drug insurance available
      vision: false, // Children under 18 and seniors covered
      mentalHealth: true,
    },
  },
  
  'BC': {
    name: 'MSP',
    fullName: 'Medical Services Plan',
    fullNameFr: 'Régime de services médicaux',
    waitingPeriod: 90, // 3 months
    waitingPeriodNote: {
      fr: 'Délai de carence de 3 mois. Couverture débute après résidence de 3 mois.',
      en: '3-month waiting period. Coverage starts after 3 months of residence.',
    },
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT'],
    notEligible: ['FOREIGN_STUDENT'],
    studentNote: {
      fr: 'Les étudiants internationaux ne sont pas admissibles. Vérifiez avec votre établissement.',
      en: 'International students are not eligible. Check with your institution.',
    },
    applyUrl: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment',
    documents: [
      { name: 'Preuve de citoyenneté/statut', nameEn: 'Proof of citizenship/status' },
      { name: 'Preuve de résidence en C.-B.', nameEn: 'Proof of BC residence' },
    ],
    processingTime: '3-4 weeks',
    premiums: false, // Eliminated in 2020
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false,
      vision: false,
      mentalHealth: true,
    },
  },
  
  'AB': {
    name: 'AHCIP',
    fullName: 'Alberta Health Care Insurance Plan',
    fullNameFr: 'Régime d\'assurance-santé de l\'Alberta',
    waitingPeriod: 90, // 3 months
    waitingPeriodNote: {
      fr: 'Délai de carence de 3 mois.',
      en: '3-month waiting period.',
    },
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT'],
    studentEligible: true,
    studentNote: {
      fr: 'Les étudiants internationaux avec permis valide sont admissibles.',
      en: 'International students with valid permit are eligible.',
    },
    applyUrl: 'https://www.alberta.ca/ahcip.aspx',
    documents: [
      { name: 'Preuve de statut', nameEn: 'Proof of status' },
      { name: 'Preuve de résidence en Alberta', nameEn: 'Proof of Alberta residence' },
    ],
    processingTime: '2-4 weeks',
    premiums: false,
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false,
      vision: false,
      mentalHealth: true,
    },
  },
  
  'MB': {
    name: 'Manitoba Health',
    fullName: 'Manitoba Health, Seniors and Long-Term Care',
    fullNameFr: 'Santé Manitoba',
    waitingPeriod: 90,
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT', 'FOREIGN_STUDENT'],
    studentNote: {
      fr: 'Les étudiants internationaux avec permis valide sont admissibles.',
      en: 'International students with valid permit are eligible.',
    },
    applyUrl: 'https://www.gov.mb.ca/health/mhsip/index.html',
    documents: [
      { name: 'Preuve de statut', nameEn: 'Proof of status' },
      { name: 'Preuve de résidence au Manitoba', nameEn: 'Proof of Manitoba residence' },
    ],
    processingTime: '2-4 weeks',
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false,
      vision: false,
      mentalHealth: true,
    },
  },
  
  'SK': {
    name: 'eHealth Saskatchewan',
    fullName: 'Saskatchewan Health Card',
    fullNameFr: 'Carte de santé de la Saskatchewan',
    waitingPeriod: 90,
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT', 'FOREIGN_STUDENT'],
    applyUrl: 'https://www.ehealthsask.ca/HealthCardRegistration/Pages/default.aspx',
    documents: [
      { name: 'Preuve de statut', nameEn: 'Proof of status' },
      { name: 'Preuve de résidence', nameEn: 'Proof of residence' },
    ],
    processingTime: '2-4 weeks',
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false,
      vision: false,
      mentalHealth: true,
    },
  },
  
  'NS': {
    name: 'MSI',
    fullName: 'Medical Services Insurance',
    fullNameFr: 'Assurance des services médicaux',
    waitingPeriod: 0, // First day of third month
    waitingPeriodNote: {
      fr: 'Couverture le premier jour du troisième mois de résidence.',
      en: 'Coverage on the first day of the third month of residence.',
    },
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT', 'FOREIGN_STUDENT'],
    applyUrl: 'https://novascotia.ca/dhw/msi/',
    documents: [
      { name: 'Preuve de statut', nameEn: 'Proof of status' },
      { name: 'Preuve de résidence', nameEn: 'Proof of residence' },
    ],
    processingTime: '2-4 weeks',
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false,
      vision: false,
      mentalHealth: true,
    },
  },
  
  'NB': {
    name: 'Medicare',
    fullName: 'New Brunswick Medicare',
    fullNameFr: 'Assurance-maladie du Nouveau-Brunswick',
    waitingPeriod: 90,
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT', 'FOREIGN_STUDENT'],
    applyUrl: 'https://www2.gnb.ca/content/gnb/en/services/services_renderer.817.New_Brunswick_Medicare.html',
    documents: [
      { name: 'Preuve de statut', nameEn: 'Proof of status' },
      { name: 'Preuve de résidence', nameEn: 'Proof of residence' },
    ],
    processingTime: '2-4 weeks',
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false,
      vision: false,
      mentalHealth: true,
    },
  },
  
  'PE': {
    name: 'PEI Health Card',
    fullName: 'Prince Edward Island Health Card',
    fullNameFr: 'Carte de santé de l\'Î.-P.-É.',
    waitingPeriod: 0, // First day of third month
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT', 'FOREIGN_STUDENT'],
    applyUrl: 'https://www.princeedwardisland.ca/en/service/apply-for-a-pei-health-card',
    documents: [
      { name: 'Preuve de statut', nameEn: 'Proof of status' },
      { name: 'Preuve de résidence', nameEn: 'Proof of residence' },
    ],
    processingTime: '2-3 weeks',
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false,
      vision: false,
      mentalHealth: true,
    },
  },
  
  'NL': {
    name: 'MCP',
    fullName: 'Medical Care Plan',
    fullNameFr: 'Régime de soins médicaux',
    waitingPeriod: 90,
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT', 'FOREIGN_STUDENT'],
    applyUrl: 'https://www.gov.nl.ca/hcs/mcp/',
    documents: [
      { name: 'Preuve de statut', nameEn: 'Proof of status' },
      { name: 'Preuve de résidence', nameEn: 'Proof of residence' },
    ],
    processingTime: '2-4 weeks',
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false,
      vision: false,
      mentalHealth: true,
    },
  },
  
  'YT': {
    name: 'Yukon Health Care Insurance',
    fullName: 'Yukon Health Care Insurance Plan',
    fullNameFr: 'Régime d\'assurance-santé du Yukon',
    waitingPeriod: 90,
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT', 'FOREIGN_STUDENT'],
    applyUrl: 'https://yukon.ca/en/health-and-wellness/health-insurance/yukon-health-care-insurance-plan',
    documents: [
      { name: 'Preuve de statut', nameEn: 'Proof of status' },
      { name: 'Preuve de résidence', nameEn: 'Proof of residence' },
    ],
    processingTime: '2-3 weeks',
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false,
      vision: false,
      mentalHealth: true,
    },
  },
  
  'NT': {
    name: 'NWT Health Care',
    fullName: 'Northwest Territories Health Care Plan',
    fullNameFr: 'Régime de soins de santé des TNO',
    waitingPeriod: 90,
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT', 'FOREIGN_STUDENT'],
    applyUrl: 'https://www.hss.gov.nt.ca/en/services/nwt-health-care-plan',
    documents: [
      { name: 'Preuve de statut', nameEn: 'Proof of status' },
      { name: 'Preuve de résidence', nameEn: 'Proof of residence' },
    ],
    processingTime: '2-3 weeks',
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false,
      vision: false,
      mentalHealth: true,
    },
  },
  
  'NU': {
    name: 'NU Health Card',
    fullName: 'Nunavut Health Card',
    fullNameFr: 'Carte de santé du Nunavut',
    waitingPeriod: 90,
    eligibleStatuses: ['PERMANENT_RESIDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT', 'FOREIGN_STUDENT'],
    applyUrl: 'https://www.gov.nu.ca/health/information/health-card',
    documents: [
      { name: 'Preuve de statut', nameEn: 'Proof of status' },
      { name: 'Preuve de résidence', nameEn: 'Proof of residence' },
    ],
    processingTime: '2-3 weeks',
    coverage: {
      doctor: true,
      hospital: true,
      specialist: true,
      dental: false,
      prescription: false,
      vision: false,
      mentalHealth: true,
    },
  },
}

// Private insurance recommendations for waiting period
export const privateInsuranceOptions = [
  {
    name: 'Manulife Visitors to Canada',
    type: 'visitors_newcomers',
    coverage: 'Emergency medical',
    cost: 'From $3/day',
    url: 'https://www.manulife.ca/',
    recommended: true,
  },
  {
    name: 'GMS Visitors to Canada',
    type: 'visitors_newcomers',
    coverage: 'Emergency medical',
    cost: 'From $2.50/day',
    url: 'https://www.gms.ca/',
    recommended: true,
  },
  {
    name: 'Blue Cross Visitors',
    type: 'visitors_newcomers',
    coverage: 'Emergency medical',
    cost: 'From $3/day',
    url: 'https://www.bluecross.ca/',
    recommended: true,
  },
  {
    name: 'Guard.me (Students)',
    type: 'students',
    coverage: 'Full medical',
    cost: 'Institution-specific',
    url: 'https://guard.me/',
    recommended: true,
    note: 'Often included in university fees',
  },
  {
    name: 'MSH International (Students)',
    type: 'students',
    coverage: 'Full medical',
    cost: 'Institution-specific',
    url: 'https://www.msh-intl.com/',
    recommended: true,
  },
]

// Find a doctor resources by province
export const findDoctorResources = {
  'ON': [
    { name: 'Health Care Connect', url: 'https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner', type: 'government' },
    { name: 'College of Physicians and Surgeons of Ontario', url: 'https://www.cpso.on.ca/', type: 'regulatory' },
  ],
  'QC': [
    { name: 'Gabrielle-Minott Clinic (GMF)', url: 'https://www.ramq.gouv.qc.ca/en/citizens/find-resource', type: 'government' },
    { name: 'Québec Family Doctor Finder', url: 'https://www.quebec.ca/sante/trouver-medecin-famille', type: 'government' },
  ],
  'BC': [
    { name: 'HealthLink BC', url: 'https://www.healthlinkbc.ca/', type: 'government' },
    { name: 'College of Physicians and Surgeons of BC', url: 'https://www.cpsbc.ca/', type: 'regulatory' },
  ],
  'AB': [
    { name: 'Alberta Find a Doctor', url: 'https://albertafindadoctor.ca/', type: 'government' },
    { name: 'CPSA Physician Search', url: 'https://www.cpsa.ca/', type: 'regulatory' },
  ],
}

// Mental health resources for newcomers
export const mentalHealthResources = [
  {
    name: 'Wellness Together Canada',
    url: 'https://wellnesstogether.ca/',
    languages: ['EN', 'FR'],
    free: true,
    services: ['counseling', 'peer_support', 'self_guided'],
  },
  {
    name: 'Talk4Healing (Indigenous)',
    url: 'https://www.talk4healing.com/',
    languages: ['EN', 'Ojibway', 'Cree', 'Oji-Cree'],
    free: true,
    services: ['counseling', 'crisis_support'],
  },
  {
    name: 'Hope for Wellness',
    url: 'https://www.hopeforwellness.ca/',
    languages: ['EN', 'FR', 'Cree', 'Ojibway', 'Inuktitut'],
    free: true,
    services: ['counseling', 'crisis_support'],
    phone: '1-855-242-3310',
  },
  {
    name: 'Canadian Mental Health Association',
    url: 'https://cmha.ca/',
    languages: ['EN', 'FR'],
    free: true,
    services: ['support_groups', 'crisis_intervention'],
  },
]

// Calculate coverage start date
export function calculateCoverageStartDate(
  province: string,
  arrivalDate: Date,
  status: string
): { startDate: Date; needsPrivateInsurance: boolean; privateInsuranceDays: number } {
  const plan = provincialHealthPlans[province as keyof typeof provincialHealthPlans]
  
  if (!plan) {
    return { startDate: arrivalDate, needsPrivateInsurance: true, privateInsuranceDays: 90 }
  }
  
  // Check eligibility
  if (plan.notEligible?.includes(status as any)) {
    return { startDate: new Date('2099-12-31'), needsPrivateInsurance: true, privateInsuranceDays: 9999 }
  }
  
  if (plan.waitingPeriod === 0) {
    return { startDate: arrivalDate, needsPrivateInsurance: false, privateInsuranceDays: 0 }
  }
  
  // Calculate coverage start after waiting period
  const coverageStart = new Date(arrivalDate)
  coverageStart.setDate(coverageStart.getDate() + plan.waitingPeriod)
  
  return {
    startDate: coverageStart,
    needsPrivateInsurance: plan.waitingPeriod > 0,
    privateInsuranceDays: plan.waitingPeriod,
  }
}
