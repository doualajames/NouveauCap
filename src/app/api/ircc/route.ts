import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-jwt'

// IRCC Integration API — placeholder for Immigration, Refugees and Citizenship Canada
// Phase 2: When IRCC opens public API access, swap mock data with real endpoints
// For now: provides official CRS scoring tables, draw history, and processing times

// Official IRCC CRS scoring table (2024-2025 data)
const CRS_SCORING_TABLE = {
  // Core/Human capital factors (with spouse)
  age: {
    withSpouse: [
      { min: 17, max: 17, points: 0 },
      { min: 18, max: 18, points: 90 },
      { min: 19, max: 19, points: 95 },
      { min: 20, max: 29, points: 100 },
      { min: 30, max: 30, points: 95 },
      { min: 31, max: 31, points: 90 },
      { min: 32, max: 32, points: 85 },
      { min: 33, max: 33, points: 80 },
      { min: 34, max: 34, points: 75 },
      { min: 35, max: 35, points: 70 },
      { min: 36, max: 36, points: 65 },
      { min: 37, max: 37, points: 60 },
      { min: 38, max: 38, points: 55 },
      { min: 39, max: 39, points: 50 },
      { min: 40, max: 40, points: 45 },
      { min: 41, max: 41, points: 35 },
      { min: 42, max: 42, points: 25 },
      { min: 43, max: 43, points: 15 },
      { min: 44, max: 44, points: 5 },
      { min: 45, max: 99, points: 0 },
    ],
    withoutSpouse: [
      { min: 17, max: 17, points: 0 },
      { min: 18, max: 18, points: 99 },
      { min: 19, max: 19, points: 105 },
      { min: 20, max: 29, points: 110 },
      { min: 30, max: 30, points: 105 },
      { min: 31, max: 31, points: 99 },
      { min: 32, max: 32, points: 94 },
      { min: 33, max: 33, points: 88 },
      { min: 34, max: 34, points: 83 },
      { min: 35, max: 35, points: 77 },
      { min: 36, max: 36, points: 72 },
      { min: 37, max: 37, points: 66 },
      { min: 38, max: 38, points: 61 },
      { min: 39, max: 39, points: 55 },
      { min: 40, max: 40, points: 50 },
      { min: 41, max: 41, points: 39 },
      { min: 42, max: 42, points: 28 },
      { min: 43, max: 43, points: 17 },
      { min: 44, max: 44, points: 6 },
      { min: 45, max: 99, points: 0 },
    ],
  },
  education: {
    withSpouse: {
      NONE: 0, HIGH_SCHOOL: 28, ONE_YEAR_POST_SEC: 84, TWO_YEAR_POST_SEC: 91,
      BACHELORS: 112, TWO_OR_MORE_CREDS: 119, MASTERS: 126, PHD: 140,
    },
    withoutSpouse: {
      NONE: 0, HIGH_SCHOOL: 30, ONE_YEAR_POST_SEC: 90, TWO_YEAR_POST_SEC: 98,
      BACHELORS: 120, TWO_OR_MORE_CREDS: 128, MASTERS: 135, PHD: 150,
    },
  },
  // Additional points
  additionalPoints: {
    provincialNomination: 600,
    arrangedEmployment_NOC_00: 200,
    arrangedEmployment_other: 50,
    canadianEducation_1_2_year: 15,
    canadianEducation_3_plus: 30,
    frenchLanguageBonus_CLB7: 25,
    frenchLanguageBonus_CLB7_english: 50,
    sibling_in_canada: 15,
  },
}

// Recent Express Entry draw data (mock but based on real IRCC patterns)
const RECENT_DRAWS = [
  { date: '2026-03-12', program: 'No program specified', invitations: 1470, lowestScore: 524 },
  { date: '2026-03-05', program: 'No program specified', invitations: 1470, lowestScore: 520 },
  { date: '2026-02-26', program: 'Healthcare occupations', invitations: 3200, lowestScore: 431 },
  { date: '2026-02-19', program: 'No program specified', invitations: 1500, lowestScore: 516 },
  { date: '2026-02-12', program: 'French language proficiency', invitations: 800, lowestScore: 410 },
  { date: '2026-02-05', program: 'STEM occupations', invitations: 4000, lowestScore: 481 },
  { date: '2026-01-29', program: 'No program specified', invitations: 1600, lowestScore: 510 },
  { date: '2026-01-22', program: 'Trade occupations', invitations: 1800, lowestScore: 436 },
]

// Processing times (official IRCC estimates)
const PROCESSING_TIMES = {
  expressEntry: { months: 6, description: 'Express Entry (CEC, FSW, FSTP)' },
  pnp: { months: 18, description: 'Provincial Nominee Program' },
  familySponsorship: { months: 12, description: 'Spousal/Partner sponsorship' },
  parentSponsorship: { months: 24, description: 'Parent/Grandparent sponsorship' },
  studyPermitInitial: { months: 8, description: 'Study permit (initial)' },
  studyPermitExtension: { months: 4, description: 'Study permit (extension)' },
  workPermitEmployerSpecific: { months: 8, description: 'Work permit (employer-specific)' },
  openWorkPermit: { months: 6, description: 'Open work permit' },
  pgwp: { months: 4, description: 'Post-graduation work permit' },
  citizenship: { months: 12, description: 'Citizenship application' },
  prCard: { months: 4, description: 'PR card renewal' },
  trv: { months: 3, description: 'Temporary resident visa' },
}

// GET /api/ircc?action=scoring|draws|processing-times|calculate-crs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'scoring'

    switch (action) {
      case 'scoring':
        return NextResponse.json({ scoringTable: CRS_SCORING_TABLE })

      case 'draws':
        return NextResponse.json({ draws: RECENT_DRAWS })

      case 'processing-times':
        return NextResponse.json({ processingTimes: PROCESSING_TIMES })

      case 'calculate-crs': {
        // Enhanced CRS calculation using official IRCC tables
        const age = parseInt(searchParams.get('age') || '30')
        const education = searchParams.get('education') || 'BACHELORS'
        const hasSpouse = searchParams.get('hasSpouse') === 'true'
        const clbEnglish = parseInt(searchParams.get('clbEnglish') || '7')
        const clbFrench = parseInt(searchParams.get('clbFrench') || '0')
        const canadaExp = parseInt(searchParams.get('canadaExp') || '0')
        const foreignExp = parseInt(searchParams.get('foreignExp') || '0')
        const hasProvNomination = searchParams.get('provincialNomination') === 'true'
        const hasArrangedEmployment = searchParams.get('arrangedEmployment') === 'true'
        const hasCanadianEducation = searchParams.get('canadianEducation') === 'true'
        const hasSibling = searchParams.get('siblingInCanada') === 'true'

        // Calculate using IRCC official tables
        const ageTable = hasSpouse ? CRS_SCORING_TABLE.age.withSpouse : CRS_SCORING_TABLE.age.withoutSpouse
        const agePoints = ageTable.find(r => age >= r.min && age <= r.max)?.points || 0

        const eduTable = hasSpouse ? CRS_SCORING_TABLE.education.withSpouse : CRS_SCORING_TABLE.education.withoutSpouse
        const eduPoints = (eduTable as any)[education] || 0

        // Language points (simplified from official CLB scoring)
        let langPoints = 0
        if (clbEnglish >= 10) langPoints = hasSpouse ? 128 : 136
        else if (clbEnglish >= 9) langPoints = hasSpouse ? 116 : 124
        else if (clbEnglish >= 8) langPoints = hasSpouse ? 96 : 112
        else if (clbEnglish >= 7) langPoints = hasSpouse ? 64 : 68
        else if (clbEnglish >= 6) langPoints = hasSpouse ? 32 : 34
        else if (clbEnglish >= 5) langPoints = hasSpouse ? 16 : 17
        else if (clbEnglish >= 4) langPoints = hasSpouse ? 6 : 6

        // Canada experience
        let canadaExpPoints = 0
        if (canadaExp >= 5) canadaExpPoints = hasSpouse ? 72 : 80
        else if (canadaExp >= 3) canadaExpPoints = hasSpouse ? 56 : 64
        else if (canadaExp >= 2) canadaExpPoints = hasSpouse ? 46 : 53
        else if (canadaExp >= 1) canadaExpPoints = hasSpouse ? 35 : 40

        // Skill transferability (simplified)
        let transferPoints = 0
        if (education === 'MASTERS' || education === 'PHD') {
          if (clbEnglish >= 9) transferPoints += 50
          if (foreignExp >= 3) transferPoints += 50
        }
        if (canadaExp >= 2 && foreignExp >= 2) transferPoints += 50
        transferPoints = Math.min(transferPoints, 100) // Cap at 100

        // Additional points
        let additionalPoints = 0
        if (hasProvNomination) additionalPoints += 600
        if (hasArrangedEmployment) additionalPoints += 50
        if (hasCanadianEducation) additionalPoints += 30
        if (hasSibling) additionalPoints += 15
        if (clbFrench >= 7 && clbEnglish >= 5) additionalPoints += 50
        else if (clbFrench >= 7) additionalPoints += 25

        const totalCRS = agePoints + eduPoints + langPoints + canadaExpPoints + transferPoints + additionalPoints

        return NextResponse.json({
          totalCRS,
          breakdown: {
            age: agePoints,
            education: eduPoints,
            language: langPoints,
            canadianExperience: canadaExpPoints,
            skillTransferability: transferPoints,
            additional: additionalPoints,
          },
          eligibility: {
            expressEntry: totalCRS >= 450,
            recentDrawAvg: 510,
            chancesDescription: totalCRS >= 520 ? 'HIGH' : totalCRS >= 480 ? 'MEDIUM' : totalCRS >= 450 ? 'LOW' : 'VERY_LOW',
          },
        })
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }
  } catch (error) {
    console.error('IRCC GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/ircc — placeholder for future IRCC data sync
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const body = await request.json()
    const { action } = body

    if (action === 'sync-profile') {
      // Future: Connect to MyCRA/IRCC portal via OAuth
      return NextResponse.json({
        message: 'IRCC profile sync is planned for Phase 2. Manual data entry is currently used.',
        status: 'NOT_AVAILABLE',
      })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (error) {
    console.error('IRCC POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
