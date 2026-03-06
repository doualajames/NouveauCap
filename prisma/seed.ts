import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Bank Offers
  const banks = [
    {
      bankName: 'RBC',
      bankNameEn: 'RBC',
      accountType: 'Newcomer Advantage',
      monthlyFee: 0,
      firstYearFree: true,
      newcomerOffer: 'Pas de frais la première année, carte de crédit sans historique de crédit',
      newcomerOfferEn: 'No fees first year, credit card without credit history',
      features: JSON.stringify(['Free transactions', 'Credit card', 'Safe deposit box']),
      link: 'https://www.rbc.com/newcomers',
    },
    {
      bankName: 'TD',
      bankNameEn: 'TD',
      accountType: 'New to Canada',
      monthlyFee: 0,
      firstYearFree: true,
      newcomerOffer: 'Compte gratuit 6 mois, $300 bonus de bienvenue',
      newcomerOfferEn: 'Free account 6 months, $300 welcome bonus',
      features: JSON.stringify(['Unlimited transactions', 'Credit card', 'Safety deposit box']),
      link: 'https://www.td.com/new-to-canada',
    },
    {
      bankName: 'Scotiabank',
      bankNameEn: 'Scotiabank',
      accountType: 'StartRight',
      monthlyFee: 0,
      firstYearFree: true,
      newcomerOffer: 'Programme StartRight, $300 bonus, scène+ points',
      newcomerOfferEn: 'StartRight Program, $300 bonus, scene+ points',
      features: JSON.stringify(['No monthly fee', 'Credit card', 'Scene+ points']),
      link: 'https://www.scotiabank.com/startright',
    },
    {
      bankName: 'BMO',
      bankNameEn: 'BMO',
      accountType: 'NewStart',
      monthlyFee: 0,
      firstYearFree: true,
      newcomerOffer: 'Performance Plan gratuit 12 mois',
      newcomerOfferEn: 'Free Performance Plan 12 months',
      features: JSON.stringify(['Unlimited transactions', 'Credit card', 'Global transfer']),
      link: 'https://www.bmo.com/newstart',
    },
    {
      bankName: 'Desjardins',
      bankNameEn: 'Desjardins',
      accountType: 'AccèsD Nouveaux arrivants',
      monthlyFee: 0,
      firstYearFree: true,
      newcomerOffer: 'Offre spéciale Québec, carte de crédit garantie',
      newcomerOfferEn: 'Special Quebec offer, secured credit card',
      features: JSON.stringify(['Free transactions', 'Credit card', 'Caisses network']),
      link: 'https://www.desjardins.com/newcomers',
    },
    {
      bankName: 'CIBC',
      bankNameEn: 'CIBC',
      accountType: 'Newcomer',
      monthlyFee: 0,
      firstYearFree: true,
      newcomerOffer: 'Smart Account gratuit 12 mois',
      newcomerOfferEn: 'Free Smart Account 12 months',
      features: JSON.stringify(['Unlimited transactions', 'Credit card', 'Global money transfer']),
      link: 'https://www.cibc.com/newcomers',
    },
  ]

  for (const bank of banks) {
    await prisma.bankOffer.upsert({
      where: { id: bank.bankName.toLowerCase() + '-newcomer' },
      update: bank,
      create: {
        id: bank.bankName.toLowerCase() + '-newcomer',
        ...bank,
      },
    })
  }

  // Seed Province Info
  const provinces = [
    {
      provinceCode: 'ON',
      provinceName: 'Ontario',
      provinceNameEn: 'Ontario',
      healthInsurance: JSON.stringify({
        name: 'OHIP',
        waitPeriod: '3 months',
        coverage: 'Doctor visits, hospital stays, medical procedures',
        applyUrl: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
      }),
      housingInfo: JSON.stringify({
        averageRent: { studio: 1800, oneBed: 2200, twoBed: 2800 },
        landlordTenantBoard: 'Landlord and Tenant Board',
        rightsUrl: 'https://www.ontario.ca/page/renting-ontario-your-rights',
      }),
      taxInfo: JSON.stringify({
        provincialTax: '5.05% - 13.16%',
        salesTax: '13% HST',
        taxCredits: ['Ontario Trillium Benefit', 'Ontario Child Benefit'],
      }),
    },
    {
      provinceCode: 'QC',
      provinceName: 'Québec',
      provinceNameEn: 'Quebec',
      healthInsurance: JSON.stringify({
        name: 'RAMQ',
        waitPeriod: '3 months',
        coverage: 'Doctor visits, hospital stays, medical procedures, some medications',
        applyUrl: 'https://www.ramq.gouv.qc.ca/en',
      }),
      housingInfo: JSON.stringify({
        averageRent: { studio: 1200, oneBed: 1500, twoBed: 1800 },
        landlordTenantBoard: 'Tribunal administratif du logement',
        rightsUrl: 'https://www.tal.gouv.qc.ca/en',
      }),
      taxInfo: JSON.stringify({
        provincialTax: '14% - 25.75%',
        salesTax: '14.975% (GST + QST)',
        taxCredits: ['Solidarity Tax Credit', 'Family Allowance'],
      }),
    },
    {
      provinceCode: 'BC',
      provinceName: 'Colombie-Britannique',
      provinceNameEn: 'British Columbia',
      healthInsurance: JSON.stringify({
        name: 'MSP',
        waitPeriod: '3 months',
        coverage: 'Doctor visits, hospital stays, medical procedures',
        applyUrl: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp',
      }),
      housingInfo: JSON.stringify({
        averageRent: { studio: 2000, oneBed: 2500, twoBed: 3200 },
        landlordTenantBoard: 'Residential Tenancy Branch',
        rightsUrl: 'https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies',
      }),
      taxInfo: JSON.stringify({
        provincialTax: '5.06% - 20.5%',
        salesTax: '12% (GST + PST)',
        taxCredits: ['BC Climate Action Tax Credit', 'BC Family Benefit'],
      }),
    },
    {
      provinceCode: 'AB',
      provinceName: 'Alberta',
      provinceNameEn: 'Alberta',
      healthInsurance: JSON.stringify({
        name: 'AHCIP',
        waitPeriod: '0 months (immediate)',
        coverage: 'Doctor visits, hospital stays, medical procedures',
        applyUrl: 'https://www.alberta.ca/ahcip.aspx',
      }),
      housingInfo: JSON.stringify({
        averageRent: { studio: 1200, oneBed: 1400, twoBed: 1700 },
        landlordTenantBoard: 'Residential Tenancy Dispute Resolution Service',
        rightsUrl: 'https://www.alberta.ca/residential-tenancies.aspx',
      }),
      taxInfo: JSON.stringify({
        provincialTax: '10% flat',
        salesTax: '5% GST only',
        taxCredits: ['Alberta Child and Family Benefit'],
      }),
    },
  ]

  for (const province of provinces) {
    await prisma.provinceInfo.upsert({
      where: { provinceCode: province.provinceCode },
      update: province,
      create: province,
    })
  }

  // Seed some events
  const events = [
    {
      id: 'event-1',
      title: 'Atelier CV Canadien',
      titleEn: 'Canadian CV Workshop',
      description: 'Apprenez à adapter votre CV au marché canadien avec des experts en recrutement.',
      descriptionEn: 'Learn how to adapt your CV to the Canadian market with recruitment experts.',
      type: 'WORKSHOP',
      province: 'QC',
      city: 'Montréal',
      date: new Date('2025-02-15T14:00:00'),
      endDate: new Date('2025-02-15T17:00:00'),
      isVirtual: true,
      capacity: 50,
      price: 0,
    },
    {
      id: 'event-2',
      title: 'Réseautage Francophone Toronto',
      titleEn: 'Toronto Francophone Networking',
      description: 'Rencontrez d\'autres immigrants francophones et développez votre réseau professionnel.',
      descriptionEn: 'Meet other Francophone immigrants and develop your professional network.',
      type: 'NETWORKING',
      province: 'ON',
      city: 'Toronto',
      date: new Date('2025-02-20T18:00:00'),
      endDate: new Date('2025-02-20T21:00:00'),
      isVirtual: false,
      address: 'Alliance Française de Toronto',
      capacity: 100,
      price: 0,
    },
    {
      id: 'event-3',
      title: 'Séance d\'information immigration',
      titleEn: 'Immigration Information Session',
      description: 'Tout savoir sur les démarches d\'immigration et les renouvellements de permis.',
      descriptionEn: 'Everything you need to know about immigration procedures and permit renewals.',
      type: 'WORKSHOP',
      province: 'BC',
      city: 'Vancouver',
      date: new Date('2025-02-25T10:00:00'),
      endDate: new Date('2025-02-25T12:00:00'),
      isVirtual: true,
      capacity: 200,
      price: 0,
    },
  ]

  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: event,
      create: event,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
