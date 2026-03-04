// Tax and Benefits Data for Newcomers to Canada
// Based on CRA (Canada Revenue Agency) information

// Tax credits and benefits for newcomers
export const newcomerTaxCredits = {
  // Federal credits
  federal: [
    {
      id: 'gst_hst_credit',
      name: 'Crédit pour la TPS/TVH',
      nameEn: 'GST/HST Credit',
      description: 'Paiement trimestriel non imposable pour les personnes à revenu faible ou modéré',
      descriptionEn: 'Tax-free quarterly payment for low and modest income individuals',
      maxAmount: 519, // Per year (2024)
      maxAmountSpouse: 272, // Additional for spouse
      maxAmountChild: 171, // Per child
      eligibility: {
        fr: 'Résident canadien, 19+ ans, revenu sous le seuil',
        en: 'Canadian resident, 19+ years, income under threshold',
      },
      applicationRequired: true,
      applyWithTaxReturn: true,
      url: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/gst-hst-credit.html',
    },
    {
      id: 'ccb',
      name: 'Allocation canadienne pour enfants',
      nameEn: 'Canada Child Benefit (CCB)',
      description: 'Paiement mensuel non imposable pour les familles avec enfants de moins de 18 ans',
      descriptionEn: 'Tax-free monthly payment for families with children under 18',
      maxAmount: 7787, // Per year for child under 6 (2024)
      maxAmount6to17: 6603, // Per year for child 6-17
      eligibility: {
        fr: 'Parent principal, enfant <18 ans, résident canadien',
        en: 'Primary caregiver, child <18 years, Canadian resident',
      },
      applicationRequired: true,
      applyWithTaxReturn: true,
      incomeTested: true,
      url: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview.html',
    },
    {
      id: 'climate_action',
      name: 'Incitatif à l\'action climatique',
      nameEn: 'Climate Action Incentive',
      description: 'Paiement pour compenser le prix de la pollution',
      descriptionEn: 'Payment to offset pollution pricing',
      amountByProvince: {
        'ON': 488, // Single individual
        'AB': 772,
        'SK': 680,
        'MB': 528,
        'NL': 512,
        'NS': 496,
        'NB': 488,
        'PE': 480,
      },
      eligibility: {
        fr: 'Résident de province sous régime fédéral de tarification',
        en: 'Resident of province under federal carbon pricing',
      },
      applicationRequired: false,
      applyWithTaxReturn: true,
      url: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/cai-payment.html',
    },
    {
      id: 'canada_workers_benefit',
      name: 'Prestation canadienne pour les travailleurs',
      nameEn: 'Canada Workers Benefit (CWB)',
      description: 'Prestation remboursable pour travailleurs à faible revenu',
      descriptionEn: 'Refundable benefit for low-income workers',
      maxAmount: 1428, // Single
      maxAmountFamily: 2461, // Family
      eligibility: {
        fr: 'Revenu d\'emploi, 19+ ans, résident canadien',
        en: 'Employment income, 19+ years, Canadian resident',
      },
      applicationRequired: false,
      applyWithTaxReturn: true,
      incomeTested: true,
      url: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-workers-benefit.html',
    },
    {
      id: 'first_time_home_buyer',
      name: 'Crédit pour l\'achat d\'une première habitation',
      nameEn: 'First-Time Home Buyer Credit',
      description: 'Crédit d\'impôt non remboursable pour l\'achat d\'une première maison',
      descriptionEn: 'Non-refundable tax credit for first home purchase',
      maxAmount: 1500, // Based on $10,000 x 15%
      eligibility: {
        fr: 'Premier achat de maison, résident canadien',
        en: 'First home purchase, Canadian resident',
      },
      applicationRequired: false,
      applyWithTaxReturn: true,
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-31270-home-buyers-amount.html',
    },
    {
      id: 'tuition_credit',
      name: 'Crédit pour frais de scolarité',
      nameEn: 'Tuition Tax Credit',
      description: 'Crédit pour frais de scolarité postsecondaire',
      descriptionEn: 'Credit for post-secondary tuition fees',
      calculation: 'Frais totaux × 15%',
      eligibility: {
        fr: 'Inscription à établissement postsecondaire canadien',
        en: 'Enrollment at Canadian post-secondary institution',
      },
      applicationRequired: false,
      applyWithTaxReturn: true,
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-32300-your-tuition-education-textbook-amounts.html',
    },
  ],
  
  // Provincial credits (major provinces)
  provincial: {
    'QC': [
      {
        id: 'qc_solidarity',
        name: 'Crédit de solidarité',
        nameEn: 'Solidarity Tax Credit',
        maxAmount: 1330,
        description: 'Crédit pour personnes à faible revenu au Québec',
        descriptionEn: 'Credit for low-income individuals in Quebec',
        url: 'https://www.revenuquebec.ca/en/citizens/tax-credits/solidarity-tax-credit/',
      },
      {
        id: 'qc_family_allowance',
        name: 'Allocation famille',
        nameEn: 'Family Allowance',
        maxAmount: 2834, // Per child per year max
        description: 'Aide financière aux familles avec enfants',
        descriptionEn: 'Financial assistance for families with children',
        url: 'https://www.rrq.gouv.qc.ca/en/enfants/naissance/naissance_enfants/Pages/allocation_famille.aspx',
      },
    ],
    'ON': [
      {
        id: 'on_trillium',
        name: 'Prestation Trillium de l\'Ontario',
        nameEn: 'Ontario Trillium Benefit',
        maxAmount: 800, // Approximate combined
        description: 'Combine crédits énergie, vente et impôt foncier',
        descriptionEn: 'Combined energy, sales, and property tax credits',
        url: 'https://www.ontario.ca/page/ontario-trillium-benefit',
      },
      {
        id: 'on_child_benefit',
        name: 'Prestation ontarienne pour enfants',
        nameEn: 'Ontario Child Benefit',
        maxAmount: 1313, // Per child
        description: 'Aide pour familles à faible revenu',
        descriptionEn: 'Support for low-income families',
        url: 'https://www.ontario.ca/page/ontario-child-benefit',
      },
    ],
    'BC': [
      {
        id: 'bc_climate_action',
        name: 'Crédit d\'action climatique de la C.-B.',
        nameEn: 'BC Climate Action Tax Credit',
        maxAmount: 447, // Single
        description: 'Crédit pour résidents de C.-B.',
        descriptionEn: 'Credit for BC residents',
        url: 'https://www2.gov.bc.ca/gov/content/taxes/income-taxes/personal/credits/climate-action',
      },
      {
        id: 'bc_family_benefit',
        name: 'Prestation familiale de la C.-B.',
        nameEn: 'BC Family Benefit',
        maxAmount: 2300, // Per year for 2 children
        description: 'Aide aux familles avec enfants',
        descriptionEn: 'Support for families with children',
        url: 'https://www2.gov.bc.ca/gov/content/taxes/income-taxes/personal/credits/bc-family-benefit',
      },
    ],
    'AB': [
      {
        id: 'ab_child_benefit',
        name: 'Prestation pour enfants de l\'Alberta',
        nameEn: 'Alberta Child and Family Benefit',
        maxAmount: 2668, // Per year for 2 children
        description: 'Aide aux familles à faible revenu',
        descriptionEn: 'Support for low-income families',
        url: 'https://www.alberta.ca/alberta-child-and-family-benefit.aspx',
      },
    ],
  },
}

// Important tax dates for newcomers
export const taxDates = {
  taxYearStart: 'January 1',
  taxYearEnd: 'December 31',
  filingDeadline: 'April 30', // Following year
  rrspDeadline: 'March 1', // Or first 60 days
  installmentDates: ['March 15', 'June 15', 'September 15', 'December 15'],
}

// Residency status for tax purposes
export const taxResidencyStatus = {
  resident: {
    fr: 'Résident fiscal',
    en: 'Resident for tax purposes',
    description: {
      fr: 'Impôt sur le revenu mondial, droit aux crédits et prestations',
      en: 'Tax on worldwide income, eligible for credits and benefits',
    },
  },
  nonResident: {
    fr: 'Non-résident',
    en: 'Non-resident',
    description: {
      fr: 'Impôt uniquement sur revenus canadiens',
      en: 'Tax only on Canadian source income',
    },
  },
  deemedResident: {
    fr: 'Résident réputé',
    en: 'Deemed resident',
    description: {
      fr: 'Séjour de 183+ jours, liens résidentiels au Canada',
      en: '183+ days stay, residential ties in Canada',
    },
  },
  partYearResident: {
    fr: 'Résident pour partie de l\'année',
    en: 'Part-year resident',
    description: {
      fr: 'Première année au Canada - statut change à l\'arrivée',
      en: 'First year in Canada - status changes upon arrival',
    },
  },
}

// Tax brackets 2024 (Federal)
export const federalTaxBrackets = [
  { min: 0, max: 55867, rate: 0.15 },
  { min: 55867, max: 111733, rate: 0.205 },
  { min: 111733, max: 173205, rate: 0.26 },
  { min: 173205, max: 246752, rate: 0.29 },
  { min: 246752, max: Infinity, rate: 0.33 },
]

// Provincial tax brackets (simplified)
export const provincialTaxBrackets: Record<string, Array<{ min: number; max: number; rate: number }>> = {
  'ON': [
    { min: 0, max: 51446, rate: 0.0505 },
    { min: 51446, max: 102894, rate: 0.0915 },
    { min: 102894, max: 150000, rate: 0.1116 },
    { min: 150000, max: 220000, rate: 0.1216 },
    { min: 220000, max: Infinity, rate: 0.1316 },
  ],
  'QC': [
    { min: 0, max: 51780, rate: 0.14 },
    { min: 51780, max: 103545, rate: 0.19 },
    { min: 103545, max: 126000, rate: 0.24 },
    { min: 126000, max: Infinity, rate: 0.2575 },
  ],
  'BC': [
    { min: 0, max: 47937, rate: 0.0506 },
    { min: 47937, max: 95875, rate: 0.077 },
    { min: 95875, max: 110076, rate: 0.105 },
    { min: 110076, max: 133664, rate: 0.1229 },
    { min: 133664, max: 181232, rate: 0.147 },
    { min: 181232, max: 252752, rate: 0.168 },
    { min: 252752, max: Infinity, rate: 0.205 },
  ],
  'AB': [
    { min: 0, max: 148269, rate: 0.10 },
    { min: 148269, max: 177922, rate: 0.12 },
    { min: 177922, max: 237230, rate: 0.13 },
    { min: 237230, max: 355845, rate: 0.14 },
    { min: 355845, max: Infinity, rate: 0.15 },
  ],
}

// Calculate estimated taxes
export function calculateEstimatedTax(
  income: number,
  province: string,
  deductions: number = 0
): { federal: number; provincial: number; total: number; marginalRate: number } {
  const taxableIncome = Math.max(0, income - deductions)
  
  // Federal tax
  let federalTax = 0
  let remainingIncome = taxableIncome
  for (const bracket of federalTaxBrackets) {
    if (remainingIncome <= 0) break
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
    federalTax += taxableInBracket * bracket.rate
    remainingIncome -= taxableInBracket
  }
  
  // Provincial tax
  let provincialTax = 0
  const provincialBrackets = provincialTaxBrackets[province] || provincialTaxBrackets['ON']
  remainingIncome = taxableIncome
  for (const bracket of provincialBrackets) {
    if (remainingIncome <= 0) break
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
    provincialTax += taxableInBracket * bracket.rate
    remainingIncome -= taxableInBracket
  }
  
  // Find marginal rate
  let marginalRate = 0
  for (let i = federalTaxBrackets.length - 1; i >= 0; i--) {
    if (taxableIncome > federalTaxBrackets[i].min) {
      marginalRate = federalTaxBrackets[i].rate
      break
    }
  }
  for (let i = provincialBrackets.length - 1; i >= 0; i--) {
    if (taxableIncome > provincialBrackets[i].min) {
      marginalRate += provincialBrackets[i].rate
      break
    }
  }
  
  return {
    federal: Math.round(federalTax),
    provincial: Math.round(provincialTax),
    total: Math.round(federalTax + provincialTax),
    marginalRate: Math.round(marginalRate * 10000) / 100,
  }
}

// Documents needed for first tax return
export const firstTaxReturnDocuments = [
  { name: 'Numéro d\'assurance sociale (NAS)', nameEn: 'Social Insurance Number (SIN)', required: true },
  { name: 'Relevés d\'emploi (T4)', nameEn: 'T4 slips from employers', required: true },
  { name: 'Relevés bancaires (T5)', nameEn: 'T5 slips for investment income', required: false },
  { name: 'Reçus de frais de scolarité (T2202)', nameEn: 'Tuition receipts (T2202)', required: false },
  { name: 'Reçus médicaux', nameEn: 'Medical expense receipts', required: false },
  { name: 'Reçus de dons de charité', nameEn: 'Charitable donation receipts', required: false },
  { name: 'Preuve de résidence', nameEn: 'Proof of residence', required: true },
  { name: 'Date d\'arrivée au Canada', nameEn: 'Date of arrival in Canada', required: true },
]

// Free tax filing software for newcomers
export const taxFilingSoftware = [
  { name: 'TurboTax Free', url: 'https://turbotax.intuit.ca/', newcomerFriendly: true, french: true },
  { name: 'Wealthsimple Tax', url: 'https://www.wealthsimple.com/tax', newcomerFriendly: true, french: true, free: true },
  { name: 'UFile', url: 'https://ufile.ca/', newcomerFriendly: true, french: true },
  { name: 'H&R Block Online', url: 'https://www.hrblock.ca/', newcomerFriendly: true, french: true },
  { name: 'StudioTax', url: 'https://studiotax.com/', newcomerFriendly: false, french: true, free: true },
]

// Community Volunteer Income Tax Program (CVITP) - Free tax clinics
export const cvitpInfo = {
  fr: 'Programme communautaire des bénévoles en matière d\'impôt',
  en: 'Community Volunteer Income Tax Program',
  description: {
    fr: 'Cliniques d\'impôt gratuites pour les personnes à revenu modeste',
    en: 'Free tax clinics for individuals with modest income',
  },
  eligibility: {
    fr: 'Revenu ≤ 35 000 $ (personne seule) ou ≤ 45 000 $ (couple)',
    en: 'Income ≤ $35,000 (single) or ≤ $45,000 (couple)',
  },
  url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/community-volunteer-income-tax-program.html',
}
