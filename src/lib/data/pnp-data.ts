// Provincial Nominee Program (PNP) Data
// Complete database of all PNP streams by province

export type PNPStream = {
  id: string
  province: string
  provinceCode: string
  name: string
  nameEn: string
  type: 'enhanced' | 'base' // Enhanced = Express Entry aligned
  category: 'skilled_worker' | 'international_graduate' | 'entrepreneur' | 'tech' | 'healthcare' | 'trades' | 'agriculture' | 'other'
  requirements: {
    language?: { english: number; french?: number } // CLB level
    education?: string
    workExperience?: number // years
    jobOffer?: boolean
    wageMinimum?: number
    nocCodes?: string[]
    investment?: number // for entrepreneur streams
    netWorth?: number
    ageRange?: { min: number; max: number }
  }
  points: number // Points given if nominated
  processingTime?: string
  isActive: boolean
  quota?: number
  lastDrawScore?: number
  lastDrawDate?: string
  frequency?: 'weekly' | 'biweekly' | 'monthly' | 'quarterly'
  url: string
  description: string
  descriptionEn: string
}

// Alberta (AAIP)
export const albertaStreams: PNPStream[] = [
  {
    id: 'ab-opportunity',
    province: 'Alberta',
    provinceCode: 'AB',
    name: 'Alberta Opportunity Stream',
    nameEn: 'Alberta Opportunity Stream',
    type: 'base',
    category: 'skilled_worker',
    requirements: {
      language: { english: 4 },
      workExperience: 2,
      jobOffer: true,
      wageMinimum: 18.47,
    },
    points: 600,
    isActive: true,
    processingTime: '4-6 months',
    url: 'https://www.alberta.ca/aaip-alberta-opportunity-stream',
    description: 'Pour les travailleurs qualifiés avec offre d\'emploi en Alberta',
    descriptionEn: 'For skilled workers with a job offer in Alberta',
  },
  {
    id: 'ab-accelerated-tech',
    province: 'Alberta',
    provinceCode: 'AB',
    name: 'Accéléré Technologie',
    nameEn: 'Accelerated Tech Pathway',
    type: 'enhanced',
    category: 'tech',
    requirements: {
      language: { english: 5 },
      workExperience: 1,
      jobOffer: true,
      nocCodes: ['20012', '21211', '21220', '21221', '21222', '21223', '21230', '21231', '21232', '21311', '2171', '2172', '2173', '2174', '2175', '2281', '2282', '2283'],
    },
    points: 600,
    isActive: true,
    processingTime: '2-3 months',
    lastDrawScore: 300,
    lastDrawDate: '2025-02-15',
    frequency: 'monthly',
    url: 'https://www.alberta.ca/aaip-accelerated-tech-pathway',
    description: 'Volet accéléré pour les professionnels tech',
    descriptionEn: 'Accelerated pathway for tech professionals',
  },
  {
    id: 'ab-healthcare',
    province: 'Alberta',
    provinceCode: 'AB',
    name: 'Volet Santé',
    nameEn: 'Healthcare Pathway',
    type: 'enhanced',
    category: 'healthcare',
    requirements: {
      language: { english: 7 },
      workExperience: 1,
      jobOffer: true,
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    url: 'https://www.alberta.ca/aaip-healthcare-pathway',
    description: 'Pour les professionnels de la santé',
    descriptionEn: 'For healthcare professionals',
  },
]

// British Columbia (BC PNP)
export const bcStreams: PNPStream[] = [
  {
    id: 'bc-tech',
    province: 'Colombie-Britannique',
    provinceCode: 'BC',
    name: 'BC PNP Tech',
    nameEn: 'BC PNP Tech',
    type: 'enhanced',
    category: 'tech',
    requirements: {
      language: { english: 5 },
      workExperience: 2,
      jobOffer: true,
      nocCodes: ['20012', '21211', '21220', '21221', '21222', '21223', '21230', '21231', '21232', '21311', '2171', '2172', '2173', '2174', '2175', '2281', '2282', '2283'],
    },
    points: 600,
    isActive: true,
    processingTime: '2-3 months',
    lastDrawScore: 90,
    lastDrawDate: '2025-02-18',
    frequency: 'weekly',
    url: 'https://www.welcomebc.ca/immigrate-to-b-c/b-c-provincial-nominee-program-b-c-pnp/tech',
    description: 'Programme prioritaire pour les talents tech',
    descriptionEn: 'Priority program for tech talent',
  },
  {
    id: 'bc-skilled-worker',
    province: 'Colombie-Britannique',
    provinceCode: 'BC',
    name: 'Travailleur qualifié',
    nameEn: 'Skilled Worker',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 4 },
      workExperience: 2,
      jobOffer: true,
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    url: 'https://www.welcomebc.ca/immigrate-to-b-c/b-c-provincial-nominee-program-b-c-pnp/skills-immigration/skilled-worker',
    description: 'Pour les travailleurs qualifiés avec offre d\'emploi',
    descriptionEn: 'For skilled workers with job offer',
  },
  {
    id: 'bc-international-graduate',
    province: 'Colombie-Britannique',
    provinceCode: 'BC',
    name: 'Diplômé international',
    nameEn: 'International Graduate',
    type: 'enhanced',
    category: 'international_graduate',
    requirements: {
      language: { english: 4 },
      workExperience: 0,
      jobOffer: true,
      education: 'canadian_degree',
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    url: 'https://www.welcomebc.ca/immigrate-to-b-c/b-c-provincial-nominee-program-b-c-pnp/skills-immigration/international-graduate',
    description: 'Pour les diplômés récents d\'universités canadiennes',
    descriptionEn: 'For recent graduates from Canadian universities',
  },
  {
    id: 'bc-healthcare',
    province: 'Colombie-Britannique',
    provinceCode: 'BC',
    name: 'Volet Santé',
    nameEn: 'Healthcare Category',
    type: 'enhanced',
    category: 'healthcare',
    requirements: {
      language: { english: 7 },
      workExperience: 2,
      jobOffer: true,
    },
    points: 600,
    isActive: true,
    processingTime: '2-3 months',
    lastDrawScore: 85,
    url: 'https://www.welcomebc.ca/immigrate-to-b-c/b-c-provincial-nominee-program-b-c-pnp/skills-immigration/health-authority',
    description: 'Pour les professionnels de la santé',
    descriptionEn: 'For healthcare professionals',
  },
]

// Manitoba (MPNP)
export const manitobaStreams: PNPStream[] = [
  {
    id: 'mb-skilled-worker',
    province: 'Manitoba',
    provinceCode: 'MB',
    name: 'Travailleur qualifié au Manitoba',
    nameEn: 'Skilled Worker in Manitoba',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 4 },
      workExperience: 1,
      jobOffer: true,
    },
    points: 600,
    isActive: true,
    processingTime: '4-6 months',
    lastDrawScore: 600,
    lastDrawDate: '2025-02-13',
    frequency: 'biweekly',
    url: 'https://immigratemanitoba.com/immigrate-to-manitoba/provincial-nominee-program/skilled-worker-in-manitoba/',
    description: 'Pour les travailleurs avec emploi au Manitoba',
    descriptionEn: 'For workers with employment in Manitoba',
  },
  {
    id: 'mb-strategic-recruitment',
    province: 'Manitoba',
    provinceCode: 'MB',
    name: 'Recrutement stratégique',
    nameEn: 'Strategic Recruitment',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 5 },
      workExperience: 2,
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    url: 'https://immigratemanitoba.com/immigrate-to-manitoba/provincial-nominee-program/strategic-recruitment-initiative/',
    description: 'Recrutement ciblé par le Manitoba',
    descriptionEn: 'Targeted recruitment by Manitoba',
  },
]

// Ontario (OINP)
export const ontarioStreams: PNPStream[] = [
  {
    id: 'on-human-capital',
    province: 'Ontario',
    provinceCode: 'ON',
    name: 'Capital humain',
    nameEn: 'Human Capital',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 7 },
      workExperience: 1,
    },
    points: 600,
    isActive: true,
    processingTime: '4-6 months',
    lastDrawScore: 460,
    lastDrawDate: '2025-02-11',
    frequency: 'monthly',
    url: 'https://www.ontario.ca/page/ontario-immigrant-nominee-program-human-capital-priorities-stream',
    description: 'Tirages basés sur le score CRS',
    descriptionEn: 'CRS score based draws',
  },
  {
    id: 'on-tech',
    province: 'Ontario',
    provinceCode: 'ON',
    name: 'Ontario Tech',
    nameEn: 'Ontario Tech',
    type: 'enhanced',
    category: 'tech',
    requirements: {
      language: { english: 7 },
      workExperience: 1,
      nocCodes: ['20012', '21211', '21220', '21221', '21222', '21223', '21230', '21231', '21232', '21311', '2171', '2172', '2173', '2174', '2175'],
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    lastDrawScore: 450,
    lastDrawDate: '2025-02-06',
    frequency: 'monthly',
    url: 'https://www.ontario.ca/page/ontario-immigrant-nominee-program-tech-draws',
    description: 'Tirages ciblés pour professionnels tech',
    descriptionEn: 'Targeted draws for tech professionals',
  },
  {
    id: 'on-french-speaking',
    province: 'Ontario',
    provinceCode: 'ON',
    name: 'Francophone',
    nameEn: 'French-Speaking Skilled Worker',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 6, french: 7 },
      workExperience: 1,
    },
    points: 600,
    isActive: true,
    processingTime: '4-5 months',
    lastDrawScore: 350,
    url: 'https://www.ontario.ca/page/ontario-immigrant-nominee-program-french-speaking-skilled-worker-stream',
    description: 'Pour les candidats francophones',
    descriptionEn: 'For French-speaking candidates',
  },
  {
    id: 'on-employer-job-offer',
    province: 'Ontario',
    provinceCode: 'ON',
    name: 'Offre d\'emploi employeur',
    nameEn: 'Employer Job Offer',
    type: 'base',
    category: 'skilled_worker',
    requirements: {
      language: { english: 5 },
      workExperience: 2,
      jobOffer: true,
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    lastDrawScore: 54,
    url: 'https://www.ontario.ca/page/oinp-employer-job-offer-foreign-worker-stream',
    description: 'Avec offre d\'emploi d\'un employeur ontarien',
    descriptionEn: 'With job offer from Ontario employer',
  },
  {
    id: 'on-masters-graduate',
    province: 'Ontario',
    provinceCode: 'ON',
    name: 'Diplômé Master',
    nameEn: 'Masters Graduate',
    type: 'base',
    category: 'international_graduate',
    requirements: {
      language: { english: 7 },
      education: 'masters',
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    url: 'https://www.ontario.ca/page/oinp-masters-graduate-stream',
    description: 'Pour les diplômés d\'un programme de maîtrise en Ontario',
    descriptionEn: 'For graduates of a master\'s program in Ontario',
  },
  {
    id: 'on-phd-graduate',
    province: 'Ontario',
    provinceCode: 'ON',
    name: 'Diplômé PhD',
    nameEn: 'PhD Graduate',
    type: 'base',
    category: 'international_graduate',
    requirements: {
      language: { english: 7 },
      education: 'doctorate',
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    url: 'https://www.ontario.ca/page/oinp-phd-graduate-stream',
    description: 'Pour les diplômés d\'un programme de doctorat en Ontario',
    descriptionEn: 'For graduates of a PhD program in Ontario',
  },
]

// Quebec (has its own system - PEQ, PRTQ)
export const quebecStreams: PNPStream[] = [
  {
    id: 'qc-peq',
    province: 'Québec',
    provinceCode: 'QC',
    name: 'Programme de l\'expérience québécoise',
    nameEn: 'Quebec Experience Program (PEQ)',
    type: 'base',
    category: 'international_graduate',
    requirements: {
      language: { english: 0, french: 7 },
      workExperience: 1,
    },
    points: 0, // Quebec has CSQ system, not PNP points
    isActive: true,
    processingTime: '6-12 months',
    url: 'https://www.immigration-quebec.gouv.qc.ca/en/immigrate-settle/permanent-residents/programs-immigration-worker/quebec-experience-program/index.html',
    description: 'Pour les diplômés québécois et travailleurs temporaires',
    descriptionEn: 'For Quebec graduates and temporary workers',
  },
  {
    id: 'qc-prtq',
    province: 'Québec',
    provinceCode: 'QC',
    name: 'Programme régulier des travailleurs qualifiés',
    nameEn: 'Regular Skilled Worker Program',
    type: 'base',
    category: 'skilled_worker',
    requirements: {
      language: { english: 0, french: 5 },
      workExperience: 1,
      ageRange: { min: 18, max: 55 },
    },
    points: 0, // Points-based system within Quebec
    isActive: true,
    processingTime: '12-24 months',
    url: 'https://www.immigration-quebec.gouv.qc.ca/en/immigrate-settle/permanent-residents/programs-immigration-worker/regular-skilled-worker-program/index.html',
    description: 'Programme basé sur un système de points',
    descriptionEn: 'Points-based program',
  },
  {
    id: 'qc-peq-graduates',
    province: 'Québec',
    provinceCode: 'QC',
    name: 'PEQ Diplômés',
    nameEn: 'PEQ Graduates',
    type: 'base',
    category: 'international_graduate',
    requirements: {
      language: { french: 7 },
      education: 'quebec_degree',
    },
    points: 0,
    isActive: true,
    processingTime: '6-8 months',
    url: 'https://www.immigration-quebec.gouv.qc.ca/',
    description: 'Pour les diplômés d\'établissements québécois',
    descriptionEn: 'For graduates of Quebec institutions',
  },
]

// Saskatchewan (SINP)
export const saskatchewanStreams: PNPStream[] = [
  {
    id: 'sk-international-skilled-worker',
    province: 'Saskatchewan',
    provinceCode: 'SK',
    name: 'Travailleur international qualifié',
    nameEn: 'International Skilled Worker',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 4 },
      workExperience: 1,
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    lastDrawScore: 68,
    lastDrawDate: '2025-02-10',
    frequency: 'monthly',
    url: 'https://www.saskatchewan.ca/business/immigration/hire-employees/international-skilled-workers',
    description: 'Programme basé sur un système de points',
    descriptionEn: 'Points-based program',
  },
  {
    id: 'sk-tech',
    province: 'Saskatchewan',
    provinceCode: 'SK',
    name: 'Saskatchewan Tech',
    nameEn: 'Saskatchewan Tech',
    type: 'enhanced',
    category: 'tech',
    requirements: {
      language: { english: 5 },
      workExperience: 1,
      nocCodes: ['20012', '21211', '21220', '21221', '21222', '21223', '21230', '21231', '21232', '21311', '2171', '2172', '2173', '2174', '2175'],
    },
    points: 600,
    isActive: true,
    processingTime: '2-3 months',
    url: 'https://www.saskatchewan.ca/',
    description: 'Volet prioritaire pour les talents tech',
    descriptionEn: 'Priority pathway for tech talent',
  },
]

// Atlantic Provinces
export const atlanticStreams: PNPStream[] = [
  // Nova Scotia
  {
    id: 'ns-labour-market',
    province: 'Nouvelle-Écosse',
    provinceCode: 'NS',
    name: 'Priorités du marché du travail',
    nameEn: 'Labour Market Priorities',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 7 },
      workExperience: 1,
    },
    points: 600,
    isActive: true,
    processingTime: '4-6 months',
    lastDrawScore: 400,
    url: 'https://novascotia.ca/immigrate/labour-market-priorities/',
    description: 'Tirages ciblés selon les besoins du marché',
    descriptionEn: 'Targeted draws based on market needs',
  },
  {
    id: 'ns-tech',
    province: 'Nouvelle-Écosse',
    provinceCode: 'NS',
    name: 'NS Tech',
    nameEn: 'NS Tech',
    type: 'enhanced',
    category: 'tech',
    requirements: {
      language: { english: 5 },
      workExperience: 1,
      jobOffer: true,
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    url: 'https://novascotia.ca/immigrate/',
    description: 'Pour les professionnels tech avec offre d\'emploi',
    descriptionEn: 'For tech professionals with job offer',
  },
  // New Brunswick
  {
    id: 'nb-express-entry',
    province: 'Nouveau-Brunswick',
    provinceCode: 'NB',
    name: 'Express Entry',
    nameEn: 'Express Entry',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 7 },
      workExperience: 1,
    },
    points: 600,
    isActive: true,
    processingTime: '4-6 months',
    url: 'https://www.welcomenb.ca/',
    description: 'Aligné sur Express Entry',
    descriptionEn: 'Express Entry aligned',
  },
  // PEI
  {
    id: 'pei-express-entry',
    province: 'Île-du-Prince-Édouard',
    provinceCode: 'PE',
    name: 'Express Entry',
    nameEn: 'Express Entry',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 5 },
      workExperience: 1,
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    lastDrawScore: 65,
    frequency: 'monthly',
    url: 'https://www.princeedwardisland.ca/en/immigration',
    description: 'Programme nominatif aligné Express Entry',
    descriptionEn: 'Express Entry aligned nominee program',
  },
  // Newfoundland
  {
    id: 'nl-priority-skills',
    province: 'Terre-Neuve-et-Labrador',
    provinceCode: 'NL',
    name: 'Compétences prioritaires',
    nameEn: 'Priority Skills',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 5 },
      workExperience: 1,
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    url: 'https://www.gov.nl.ca/immigration/',
    description: 'Pour les compétences en demande',
    descriptionEn: 'For in-demand skills',
  },
]

// Yukon and Northern Territories
export const northernStreams: PNPStream[] = [
  {
    id: 'yt-skilled-worker',
    province: 'Yukon',
    provinceCode: 'YT',
    name: 'Travailleur qualifié',
    nameEn: 'Skilled Worker',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 5 },
      workExperience: 1,
      jobOffer: true,
    },
    points: 600,
    isActive: true,
    processingTime: '3-4 months',
    url: 'https://yukon.ca/en/immigrate-yukon',
    description: 'Pour les travailleurs avec offre d\'emploi au Yukon',
    descriptionEn: 'For workers with job offer in Yukon',
  },
  {
    id: 'nt-skilled-worker',
    province: 'Territoires du Nord-Ouest',
    provinceCode: 'NT',
    name: 'Travailleur qualifié',
    nameEn: 'Skilled Worker',
    type: 'enhanced',
    category: 'skilled_worker',
    requirements: {
      language: { english: 4 },
      workExperience: 1,
      jobOffer: true,
    },
    points: 600,
    isActive: true,
    processingTime: '4-6 months',
    url: 'https://www.immigratent.ca/',
    description: 'Pour les travailleurs avec offre d\'emploi aux TNO',
    descriptionEn: 'For workers with job offer in NWT',
  },
]

// Combine all streams
export const allPNPStreams: PNPStream[] = [
  ...albertaStreams,
  ...bcStreams,
  ...manitobaStreams,
  ...ontarioStreams,
  ...quebecStreams,
  ...saskatchewanStreams,
  ...atlanticStreams,
  ...northernStreams,
]

// Get streams by province
export function getStreamsByProvince(provinceCode: string): PNPStream[] {
  return allPNPStreams.filter(s => s.provinceCode === provinceCode)
}

// Get streams by category
export function getStreamsByCategory(category: PNPStream['category']): PNPStream[] {
  return allPNPStreams.filter(s => s.category === category && s.isActive)
}

// Get active tech streams
export function getTechStreams(): PNPStream[] {
  return allPNPStreams.filter(s => s.category === 'tech' && s.isActive)
}

// Get active healthcare streams
export function getHealthcareStreams(): PNPStream[] {
  return allPNPStreams.filter(s => s.category === 'healthcare' && s.isActive)
}

// Get enhanced streams (Express Entry aligned)
export function getEnhancedStreams(): PNPStream[] {
  return allPNPStreams.filter(s => s.type === 'enhanced' && s.isActive)
}

// Check eligibility for a stream
export function checkEligibility(stream: PNPStream, profile: {
  clbEnglish: number
  clbFrench?: number
  workExperience: number
  hasJobOffer: boolean
  education: string
  age: number
  nocCode?: string
}): { eligible: boolean; missingRequirements: string[] } {
  const missing: string[] = []
  
  if (stream.requirements.language?.english && profile.clbEnglish < stream.requirements.language.english) {
    missing.push(`Anglais requis: CLB ${stream.requirements.language.english}`)
  }
  
  if (stream.requirements.language?.french && (profile.clbFrench || 0) < stream.requirements.language.french) {
    missing.push(`Français requis: CLB ${stream.requirements.language.french}`)
  }
  
  if (stream.requirements.workExperience && profile.workExperience < stream.requirements.workExperience) {
    missing.push(`Expérience requise: ${stream.requirements.workExperience} ans`)
  }
  
  if (stream.requirements.jobOffer && !profile.hasJobOffer) {
    missing.push('Offre d\'emploi requise')
  }
  
  if (stream.requirements.ageRange) {
    if (profile.age < stream.requirements.ageRange.min || profile.age > stream.requirements.ageRange.max) {
      missing.push(`Âge: ${stream.requirements.ageRange.min}-${stream.requirements.ageRange.max} ans`)
    }
  }
  
  if (stream.requirements.nocCodes && profile.nocCode && !stream.requirements.nocCodes.includes(profile.nocCode)) {
    missing.push('Code NOC non éligible pour ce volet')
  }
  
  return {
    eligible: missing.length === 0,
    missingRequirements: missing,
  }
}

// Province names with codes
export const provinceInfo = {
  'AB': { name: 'Alberta', nameFr: 'Alberta', capital: 'Edmonton' },
  'BC': { name: 'British Columbia', nameFr: 'Colombie-Britannique', capital: 'Victoria' },
  'MB': { name: 'Manitoba', nameFr: 'Manitoba', capital: 'Winnipeg' },
  'NB': { name: 'New Brunswick', nameFr: 'Nouveau-Brunswick', capital: 'Fredericton' },
  'NL': { name: 'Newfoundland and Labrador', nameFr: 'Terre-Neuve-et-Labrador', capital: 'St. John\'s' },
  'NS': { name: 'Nova Scotia', nameFr: 'Nouvelle-Écosse', capital: 'Halifax' },
  'NT': { name: 'Northwest Territories', nameFr: 'Territoires du Nord-Ouest', capital: 'Yellowknife' },
  'NU': { name: 'Nunavut', nameFr: 'Nunavut', capital: 'Iqaluit' },
  'ON': { name: 'Ontario', nameFr: 'Ontario', capital: 'Toronto' },
  'PE': { name: 'Prince Edward Island', nameFr: 'Île-du-Prince-Édouard', capital: 'Charlottetown' },
  'QC': { name: 'Quebec', nameFr: 'Québec', capital: 'Québec City' },
  'SK': { name: 'Saskatchewan', nameFr: 'Saskatchewan', capital: 'Regina' },
  'YT': { name: 'Yukon', nameFr: 'Yukon', capital: 'Whitehorse' },
}
