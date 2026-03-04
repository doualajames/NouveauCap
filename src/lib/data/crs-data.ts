// CRS (Comprehensive Ranking System) Data for Express Entry
// Updated for 2025 changes - Job offer points REMOVED as of March 25, 2025

// Age points (max 110 points with spouse, 100 without)
export const agePoints: Record<string, { withSpouse: number; withoutSpouse: number }> = {
  '17': { withSpouse: 0, withoutSpouse: 0 },
  '18': { withSpouse: 90, withoutSpouse: 99 },
  '19': { withSpouse: 95, withoutSpouse: 105 },
  '20': { withSpouse: 100, withoutSpouse: 110 },
  '21': { withSpouse: 100, withoutSpouse: 110 },
  '22': { withSpouse: 100, withoutSpouse: 110 },
  '23': { withSpouse: 100, withoutSpouse: 110 },
  '24': { withSpouse: 100, withoutSpouse: 110 },
  '25': { withSpouse: 100, withoutSpouse: 110 },
  '26': { withSpouse: 100, withoutSpouse: 110 },
  '27': { withSpouse: 100, withoutSpouse: 110 },
  '28': { withSpouse: 100, withoutSpouse: 110 },
  '29': { withSpouse: 100, withoutSpouse: 110 },
  '30': { withSpouse: 95, withoutSpouse: 105 },
  '31': { withSpouse: 90, withoutSpouse: 99 },
  '32': { withSpouse: 85, withoutSpouse: 94 },
  '33': { withSpouse: 80, withoutSpouse: 88 },
  '34': { withSpouse: 75, withoutSpouse: 83 },
  '35': { withSpouse: 70, withoutSpouse: 77 },
  '36': { withSpouse: 65, withoutSpouse: 72 },
  '37': { withSpouse: 60, withoutSpouse: 66 },
  '38': { withSpouse: 55, withoutSpouse: 61 },
  '39': { withSpouse: 50, withoutSpouse: 55 },
  '40': { withSpouse: 45, withoutSpouse: 50 },
  '41': { withSpouse: 35, withoutSpouse: 39 },
  '42': { withSpouse: 25, withoutSpouse: 28 },
  '43': { withSpouse: 15, withoutSpouse: 17 },
  '44': { withSpouse: 5, withoutSpouse: 6 },
  '45+': { withSpouse: 0, withoutSpouse: 0 },
}

// Education points (max 140 with spouse, 150 without)
export const educationPoints: Record<string, { withSpouse: number; withoutSpouse: number }> = {
  'less_than_secondary': { withSpouse: 0, withoutSpouse: 0 },
  'secondary': { withSpouse: 28, withoutSpouse: 30 },
  'one_year_degree': { withSpouse: 42, withoutSpouse: 45 },
  'two_year_degree': { withSpouse: 49, withoutSpouse: 53 },
  'bachelors': { withSpouse: 56, withoutSpouse: 60 },
  'two_or_more_degrees': { withSpouse: 63, withoutSpouse: 68 },
  'masters': { withSpouse: 70, withoutSpouse: 75 },
  'doctorate': { withSpouse: 80, withoutSpouse: 85 },
  'professional_degree': { withSpouse: 84, withoutSpouse: 90 }, // Law, Medicine, etc.
}

// First language (English) - CLB level points (max 136 with spouse, 160 without)
export const clbPoints = {
  withSpouse: {
    '4': { speaking: 6, listening: 6, reading: 6, writing: 6 },
    '5': { speaking: 6, listening: 6, reading: 6, writing: 6 },
    '6': { speaking: 9, listening: 9, reading: 9, writing: 9 },
    '7': { speaking: 12, listening: 12, reading: 12, writing: 12 },
    '8': { speaking: 16, listening: 16, reading: 16, writing: 16 },
    '9': { speaking: 20, listening: 20, reading: 20, writing: 20 },
    '10': { speaking: 23, listening: 24, reading: 23, writing: 24 },
  },
  withoutSpouse: {
    '4': { speaking: 6, listening: 6, reading: 6, writing: 6 },
    '5': { speaking: 6, listening: 6, reading: 6, writing: 6 },
    '6': { speaking: 9, listening: 9, reading: 9, writing: 9 },
    '7': { speaking: 17, listening: 17, reading: 17, writing: 17 },
    '8': { speaking: 23, listening: 23, reading: 23, writing: 23 },
    '9': { speaking: 31, listening: 31, reading: 31, writing: 31 },
    '10': { speaking: 34, listening: 34, reading: 34, writing: 34 },
  }
}

// IELTS to CLB conversion
export const ieltsToClb: Record<string, number> = {
  '4.0': 4, '4.5': 5, '5.0': 5, '5.5': 6, '6.0': 6, '6.5': 7,
  '7.0': 7, '7.5': 8, '8.0': 8, '8.5': 9, '9.0': 9, '9.5': 10
}

// Canadian work experience points (max 70 with spouse, 80 without)
export const canadianWorkPoints: Record<string, { withSpouse: number; withoutSpouse: number }> = {
  'none': { withSpouse: 0, withoutSpouse: 0 },
  '1': { withSpouse: 35, withoutSpouse: 40 },
  '2': { withSpouse: 46, withoutSpouse: 53 },
  '3': { withSpouse: 56, withoutSpouse: 64 },
  '4': { withSpouse: 63, withoutSpouse: 72 },
  '5+': { withSpouse: 70, withoutSpouse: 80 },
}

// Foreign work experience points (max 35 with spouse, 45 without)
export const foreignWorkPoints: Record<string, { withSpouse: number; withoutSpouse: number }> = {
  'none': { withSpouse: 0, withoutSpouse: 0 },
  '1': { withSpouse: 13, withoutSpouse: 15 },
  '2': { withSpouse: 15, withoutSpouse: 17 },
  '3+': { withSpouse: 15, withoutSpouse: 17 },
}

// Skill Transferability factors (max 100 points)
export const skillTransferability = {
  // Education + Canadian work experience
  educationWithWork: {
    'none': 0,
    '1_year': 13,
    '2_years': 25,
    '3_years': 25,
    'none_work': 0,
  },
  // Education + Language
  educationWithLanguage: {
    'none': 0,
    'clb7': 13,
    'clb9': 25,
    'clb_none': 0,
  },
  // Foreign work + Language
  foreignWorkWithLanguage: {
    'none': 0,
    'clb7': 13,
    'clb9': 25,
  },
  // Foreign work + Canadian work
  foreignWithCanadianWork: {
    'none': 0,
    '1_year': 13,
    '2_years': 25,
  },
  // Certificate of Qualification + Language
  certificateWithLanguage: {
    'none': 0,
    'clb5': 25,
    'clb7': 50,
  },
}

// Provincial Nominee bonus (changed from 600 to allow differentiation)
export const pnpBonus = {
  standard: 600,
  enhanced: 600, // Express Entry aligned
  base: 600, // Non-Express Entry
}

// Express Entry draw history (recent draws)
export const expressEntryDraws = [
  { date: '2025-02-19', type: 'General', minScore: 450, invitations: 2500 },
  { date: '2025-02-12', type: 'General', minScore: 455, invitations: 2300 },
  { date: '2025-02-05', type: 'PNP', minScore: 680, invitations: 800 },
  { date: '2025-01-29', type: 'General', minScore: 458, invitations: 2400 },
  { date: '2025-01-22', type: 'CEC', minScore: 420, invitations: 3000 },
  { date: '2025-01-15', type: 'General', minScore: 462, invitations: 2200 },
  { date: '2025-01-08', type: 'PNP', minScore: 685, invitations: 750 },
]

// Score interpretation
export const scoreInterpretation = {
  'high': { min: 500, message: { fr: 'Score excellent - Invitation probable', en: 'Excellent score - Invitation likely' } },
  'good': { min: 470, max: 499, message: { fr: 'Bon score - PNP recommandé pour améliorer', en: 'Good score - PNP recommended to improve' } },
  'moderate': { min: 430, max: 469, message: { fr: 'Score modéré - PNP fortement recommandé', en: 'Moderate score - PNP strongly recommended' } },
  'low': { min: 300, max: 429, message: { fr: 'Score faible - Considérez les autres voies', en: 'Low score - Consider other pathways' } },
}

// NOC TEER categories
export const nocTeerCategories = {
  '0': { name: 'Management occupations', nameFr: 'Professions de direction', examples: ['Senior managers', 'Middle managers'] },
  '1': { name: 'Professional occupations', nameFr: 'Professions professionnelles', examples: ['Engineers', 'Doctors', 'Teachers'] },
  '2': { name: 'Technical occupations', nameFr: 'Professions techniques', examples: ['Technicians', 'Analysts'] },
  '3': { name: 'Skilled technical occupations', nameFr: 'Professions techniques qualifiées', examples: ['Electricians', 'Plumbers'] },
  '4': { name: 'Intermediate occupations', nameFr: 'Professions intermédiaires', examples: ['Clerks', 'Assistants'] },
  '5': { name: 'Labour occupations', nameFr: 'Professions manuelles', examples: ['Truck drivers', 'Cleaners'] },
}

// CRS Calculator function
export function calculateCRSScore(params: {
  age: number
  education: string
  hasSpouse: boolean
  englishListening: number
  englishSpeaking: number
  englishReading: number
  englishWriting: number
  frenchListening?: number
  frenchSpeaking?: number
  frenchReading?: number
  frenchWriting?: number
  canadianWorkYears: number
  foreignWorkYears: number
  hasCanadianEducation: boolean
  canadianEducationLevel?: string
  hasProvincialNomination: boolean
  hasSiblingInCanada: boolean
  relativeInCanada?: 'parent' | 'sibling' | 'child' | 'grandparent' | 'none'
  hasJobOffer?: boolean // REMOVED from CRS as of March 2025 - kept for reference
  nocTeer?: string
}): { total: number; breakdown: Record<string, number>; recommendations: string[] } {
  
  const breakdown: Record<string, number> = {}
  const recommendations: string[] = []
  let total = 0

  // Age points
  const ageKey = params.age >= 45 ? '45+' : params.age.toString()
  const agePointsValue = agePoints[ageKey]?.[params.hasSpouse ? 'withSpouse' : 'withoutSpouse'] || 0
  breakdown['age'] = agePointsValue
  total += agePointsValue

  if (params.age > 35) {
    recommendations.push('Consider provincial programs that may have lower age requirements')
  }

  // Education points
  const eduPoints = educationPoints[params.education]?.[params.hasSpouse ? 'withSpouse' : 'withoutSpouse'] || 0
  breakdown['education'] = eduPoints
  total += eduPoints

  if (params.education === 'secondary' || params.education === 'less_than_secondary') {
    recommendations.push('Consider obtaining a post-secondary credential to improve score')
  }

  // Language points (English)
  const spouseKey = params.hasSpouse ? 'withSpouse' : 'withoutSpouse'
  const clbListening = params.englishListening
  const clbSpeaking = params.englishSpeaking
  const clbReading = params.englishReading
  const clbWriting = params.englishWriting

  const minClb = Math.min(clbListening, clbSpeaking, clbReading, clbWriting)
  const langPoints = (clbPoints[spouseKey][Math.min(minClb, 10).toString()]?.listening || 0) +
                     (clbPoints[spouseKey][Math.min(minClb, 10).toString()]?.speaking || 0) +
                     (clbPoints[spouseKey][Math.min(minClb, 10).toString()]?.reading || 0) +
                     (clbPoints[spouseKey][Math.min(minClb, 10).toString()]?.writing || 0)
  
  breakdown['language'] = langPoints
  total += langPoints

  if (minClb < 9) {
    recommendations.push('Improve IELTS/CELPIP score to CLB 9+ for maximum language points')
  }

  // Canadian work experience
  const workKey = params.canadianWorkYears >= 5 ? '5+' : params.canadianWorkYears === 0 ? 'none' : params.canadianWorkYears.toString()
  const cdnWorkPoints = canadianWorkPoints[workKey]?.[params.hasSpouse ? 'withSpouse' : 'withoutSpouse'] || 0
  breakdown['canadianWork'] = cdnWorkPoints
  total += cdnWorkPoints

  if (params.canadianWorkYears < 3) {
    recommendations.push('Gain more Canadian work experience (3+ years optimal)')
  }

  // Foreign work experience
  const foreignKey = params.foreignWorkYears >= 3 ? '3+' : params.foreignWorkYears === 0 ? 'none' : params.foreignWorkYears.toString()
  const foreignPointsValue = foreignWorkPoints[foreignKey]?.[params.hasSpouse ? 'withSpouse' : 'withoutSpouse'] || 0
  breakdown['foreignWork'] = foreignPointsValue
  total += foreignPointsValue

  // Skill transferability
  let skillTransferPoints = 0
  
  // Education + Language
  if (minClb >= 9 && params.education !== 'less_than_secondary') {
    skillTransferPoints += 25
  } else if (minClb >= 7) {
    skillTransferPoints += 13
  }
  
  // Foreign + Canadian work
  if (params.canadianWorkYears >= 1 && params.foreignWorkYears >= 1) {
    skillTransferPoints += 13
  }
  if (params.canadianWorkYears >= 2 && params.foreignWorkYears >= 2) {
    skillTransferPoints += 12 // Additional points
  }

  skillTransferPoints = Math.min(skillTransferPoints, 100) // Cap at 100
  breakdown['skillTransferability'] = skillTransferPoints
  total += skillTransferPoints

  // Provincial Nomination (600 points)
  if (params.hasProvincialNomination) {
    breakdown['provincialNomination'] = 600
    total += 600
  }

  // Sibling in Canada (15 points)
  if (params.hasSiblingInCanada) {
    breakdown['siblingInCanada'] = 15
    total += 15
  }

  // Canadian education (additional points)
  if (params.hasCanadianEducation) {
    let eduBonus = 0
    if (params.canadianEducationLevel === 'two_year_degree' || params.canadianEducationLevel === 'bachelors') {
      eduBonus = 15
    } else if (params.canadianEducationLevel === 'masters' || params.canadianEducationLevel === 'doctorate') {
      eduBonus = 30
    }
    breakdown['canadianEducation'] = eduBonus
    total += eduBonus
  }

  // French language bonus (if bilingual)
  if (params.frenchListening && params.frenchListening >= 7) {
    const frenchBonus = params.hasSpouse ? 15 : 25
    breakdown['frenchBonus'] = frenchBonus
    total += frenchBonus
    recommendations.push('French proficiency provides bonus points - consider improving French skills')
  }

  // Add general recommendations based on score
  if (total < 450 && !params.hasProvincialNomination) {
    recommendations.push('Consider applying for Provincial Nominee Program (PNP) for 600 bonus points')
  }

  return { total, breakdown, recommendations }
}
