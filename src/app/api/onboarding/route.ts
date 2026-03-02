import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Province-specific task templates
const provinceSpecificTasks: Record<string, Record<string, any[]>> = {
  // Ontario
  'ON': {
    PERMANENT_RESIDENT: [
      { 
        title: 'Inscrivez-vous à l\'assurance-maladie OHIP', 
        titleEn: 'Register for OHIP health insurance',
        description: '🏥 OHIP (Ontario Health Insurance Plan)\n\n✅ Conditions:\n• Résident de l\'Ontario\n• Présent physiquement 153 jours par année\n\n📋 Documents requis:\n• Preuve de résidence (bail, facture)\n• Permis de conduire ou carte photo Ontario\n• Carte de résident permanent\n\n⏱️ Délai: Pas de période d\'attente pour les RP',
        descriptionEn: '🏥 OHIP (Ontario Health Insurance Plan)\n\n✅ Requirements:\n• Ontario resident\n• Physically present 153 days per year\n\n📋 Required documents:\n• Proof of residence (lease, bill)\n• Ontario driver\'s license or photo card\n• Permanent Resident card\n\n⏱️ No waiting period for PRs',
        category: 'HEALTH', 
        priority: 'HIGH', 
        isRequired: true, 
        order: 15,
        source: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card'
      }
    ],
    FOREIGN_STUDENT: [
      {
        title: 'Obtenir une assurance santé privée (OHIP non disponible)',
        titleEn: 'Get private health insurance (OHIP not available)',
        description: '🏥 Assurance santé pour étudiants internationaux\n\n⚠️ Les étudiants internationaux ne sont PAS admissibles à OHIP\n\n📋 Options recommandées:\n• Guard.me (offert par plusieurs institutions)\n• MSH International\n• Intrepid Direct Insurance\n\n💰 Coût: $50-150/mois selon la couverture',
        descriptionEn: '🏥 Health insurance for international students\n\n⚠️ International students are NOT eligible for OHIP\n\n📋 Recommended options:\n• Guard.me (offered by many institutions)\n• MSH International\n• Intrepid Direct Insurance\n\n💰 Cost: $50-150/month depending on coverage',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    OPEN_WORK_PERMIT: [
      {
        title: 'Vérifier l\'admissibilité à OHIP',
        titleEn: 'Check OHIP eligibility',
        description: '🏥 OHIP pour titulaires de permis de travail\n\n✅ Conditions d\'admissibilité:\n• Permis de travail valide minimum 6 mois\n• Emploi à temps plein (min. 30h/semaine)\n• Intention de résider en Ontario\n\n⏱️ Période d\'attente: 3 mois\n\n📋 Documents requis:\n• Permis de travail\n• Lettre de l\'employeur\n• Preuve de résidence',
        descriptionEn: '🏥 OHIP for work permit holders\n\n✅ Eligibility:\n• Valid work permit for minimum 6 months\n• Full-time employment (min. 30h/week)\n• Intention to reside in Ontario\n\n⏱️ Waiting period: 3 months\n\n📋 Required documents:\n• Work permit\n• Employer letter\n• Proof of residence',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15,
        source: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card'
      }
    ],
    CLOSED_WORK_PERMIT: [
      {
        title: 'Vérifier l\'admissibilité à OHIP',
        titleEn: 'Check OHIP eligibility',
        description: '🏥 OHIP pour travailleurs avec permis fermé\n\n✅ Conditions d\'admissibilité:\n• Permis de travail valide minimum 6 mois\n• Emploi à temps plein\n\n⏱️ Période d\'attente: 3 mois',
        descriptionEn: '🏥 OHIP for closed work permit holders\n\n✅ Eligibility:\n• Valid work permit for minimum 6 months\n• Full-time employment\n\n⏱️ Waiting period: 3 months',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ]
  },
  // Québec
  'QC': {
    PERMANENT_RESIDENT: [
      { 
        title: 'Inscrivez-vous au régime d\'assurance maladie RAMQ', 
        titleEn: 'Register for RAMQ health insurance',
        description: '🏥 RAMQ (Régie de l\'assurance maladie du Québec)\n\n✅ Conditions:\n• Résident du Québec\n• Présent au Québec minimum 183 jours par année\n\n📋 Documents requis:\n• Preuve de résidence\n• Certificat de sélection du Québec (CSQ) ou PR\n• Acte de naissance avec traduction certifiée\n\n⏱️ Délai: Maximum 3 mois après l\'arrivée',
        descriptionEn: '🏥 RAMQ (Quebec Health Insurance Board)\n\n✅ Requirements:\n• Quebec resident\n• Present in Quebec minimum 183 days per year\n\n📋 Required documents:\n• Proof of residence\n• Certificat de sélection du Québec (CSQ) or PR\n• Birth certificate with certified translation\n\n⏱️ Deadline: Maximum 3 months after arrival',
        category: 'HEALTH', 
        priority: 'HIGH', 
        isRequired: true, 
        order: 15,
        source: 'https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/inscription'
      },
      {
        title: 'Demander votre certificat de sélection du Québec (si applicable)',
        titleEn: 'Apply for your Certificat de sélection du Québec (if applicable)',
        category: 'IMMIGRATION',
        priority: 'HIGH',
        isRequired: false,
        order: 16
      }
    ],
    FOREIGN_STUDENT: [
      {
        title: 'Inscrivez-vous à la RAMQ (si éligible)',
        titleEn: 'Register for RAMQ (if eligible)',
        description: '🏥 RAMQ pour étudiants internationaux\n\n✅ Pays avec entente:\n• France, Belgique, Danemark, Finlande, Grèce, Luxembourg, Norvège, Portugal, Roumanie, Suède\n\n📋 Si pas d\'entente:\n• Assurance privée obligatoire\n• Vérifier avec votre établissement\n\n💰 Coût: Gratuit si pays avec entente',
        descriptionEn: '🏥 RAMQ for international students\n\n✅ Countries with agreement:\n• France, Belgium, Denmark, Finland, Greece, Luxembourg, Norway, Portugal, Romania, Sweden\n\n📋 If no agreement:\n• Private insurance mandatory\n• Check with your institution\n\n💰 Cost: Free if country with agreement',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15,
        source: 'https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/inscription'
      }
    ],
    OPEN_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à la RAMQ',
        titleEn: 'Register for RAMQ',
        description: '🏥 RAMQ pour titulaires de permis de travail\n\n✅ Conditions:\n• Permis de travail valide\n• Résident du Québec\n\n⏱️ Période d\'attente: Maximum 3 mois\n\n⚠️ Important: Inscrivez-vous dès votre arrivée',
        descriptionEn: '🏥 RAMQ for work permit holders\n\n✅ Requirements:\n• Valid work permit\n• Quebec resident\n\n⏱️ Waiting period: Maximum 3 months\n\n⚠️ Important: Register as soon as you arrive',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    CLOSED_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à la RAMQ',
        titleEn: 'Register for RAMQ',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ]
  },
  // Colombie-Britannique
  'BC': {
    PERMANENT_RESIDENT: [
      { 
        title: 'Inscrivez-vous à MSP (Medical Services Plan)', 
        titleEn: 'Register for MSP (Medical Services Plan)',
        description: '🏥 MSP (Medical Services Plan) - Colombie-Britannique\n\n✅ Conditions:\n• Résident de la C.-B.\n• Citoyen canadien ou résident permanent\n\n⏱️ Période d\'attente: 3 mois\n\n💰 Frais: $0 (gratuit depuis 2020)\n\n📋 Documents requis:\n• Preuve de résidence\n• Carte de résident permanent',
        descriptionEn: '🏥 MSP (Medical Services Plan) - British Columbia\n\n✅ Requirements:\n• B.C. resident\n• Canadian citizen or permanent resident\n\n⏱️ Waiting period: 3 months\n\n💰 Fees: $0 (free since 2020)\n\n📋 Required documents:\n• Proof of residence\n• Permanent Resident card',
        category: 'HEALTH', 
        priority: 'HIGH', 
        isRequired: true, 
        order: 15,
        source: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents'
      }
    ],
    FOREIGN_STUDENT: [
      {
        title: 'Obtenir une assurance santé privée',
        titleEn: 'Get private health insurance',
        description: '🏥 Assurance santé pour étudiants en C.-B.\n\n⚠️ Les étudiants internationaux ne sont PAS admissibles à MSP\n\n📋 Options:\n• Guard.me\n• AMS/GSS Health Plan (UBC)\n• Vancouver College Health Plan\n\n💰 Coût: ~$300-$600/année',
        descriptionEn: '🏥 Health insurance for students in B.C.\n\n⚠️ International students are NOT eligible for MSP\n\n📋 Options:\n• Guard.me\n• AMS/GSS Health Plan (UBC)\n• Vancouver College Health Plan\n\n💰 Cost: ~$300-$600/year',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    OPEN_WORK_PERMIT: [
      {
        title: 'Vérifier l\'admissibilité à MSP',
        titleEn: 'Check MSP eligibility',
        description: '🏥 MSP pour titulaires de permis de travail\n\n✅ Conditions:\n• Permis de travail valide\n• Résident de la C.-B.\n\n⏱️ Période d\'attente: 3 mois',
        descriptionEn: '🏥 MSP for work permit holders\n\n✅ Requirements:\n• Valid work permit\n• B.C. resident\n\n⏱️ Waiting period: 3 months',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    CLOSED_WORK_PERMIT: [
      {
        title: 'Vérifier l\'admissibilité à MSP',
        titleEn: 'Check MSP eligibility',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ]
  },
  // Alberta
  'AB': {
    PERMANENT_RESIDENT: [
      { 
        title: 'Inscrivez-vous à AHCIP (Alberta Health Care Insurance Plan)', 
        titleEn: 'Register for AHCIP (Alberta Health Care Insurance Plan)',
        description: '🏥 AHCIP - Alberta\n\n✅ Conditions:\n• Résident de l\'Alberta\n• Présent minimum 183 jours par année\n\n⏱️ Période d\'attente: 3 mois\n\n💰 Frais: Gratuit\n\n📋 Documents:\n• Preuve de résidence\n• Carte de résident permanent',
        descriptionEn: '🏥 AHCIP - Alberta\n\n✅ Requirements:\n• Alberta resident\n• Present minimum 183 days per year\n\n⏱️ Waiting period: 3 months\n\n💰 Fees: Free\n\n📋 Documents:\n• Proof of residence\n• Permanent Resident card',
        category: 'HEALTH', 
        priority: 'HIGH', 
        isRequired: true, 
        order: 15,
        source: 'https://www.alberta.ca/ahcip.aspx'
      }
    ],
    FOREIGN_STUDENT: [
      {
        title: 'Obtenir une assurance santé (vérifier admissibilité AHCIP)',
        titleEn: 'Get health insurance (check AHCIP eligibility)',
        description: '🏥 Assurance santé étudiants Alberta\n\n📋 Certains étudiants peuvent être admissibles à AHCIP\n• Visa étudiant valide 12+ mois\n• Intention de résider 12 mois\n\nSinon: assurance privée requise',
        descriptionEn: '🏥 Student health insurance Alberta\n\n📋 Some students may be eligible for AHCIP\n• Valid study visa for 12+ months\n• Intention to reside 12 months\n\nOtherwise: private insurance required',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    OPEN_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à AHCIP',
        titleEn: 'Register for AHCIP',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    CLOSED_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à AHCIP',
        titleEn: 'Register for AHCIP',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ]
  },
  // Manitoba
  'MB': {
    PERMANENT_RESIDENT: [
      { 
        title: 'Inscrivez-vous à Manitoba Health', 
        titleEn: 'Register for Manitoba Health',
        description: '🏥 Manitoba Health\n\n✅ Conditions:\n• Résident du Manitoba\n• Présent minimum 183 jours par année\n\n⏱️ Période d\'attente: 3 mois\n\n💰 Frais: Gratuit',
        descriptionEn: '🏥 Manitoba Health\n\n✅ Requirements:\n• Manitoba resident\n• Present minimum 183 days per year\n\n⏱️ Waiting period: 3 months\n\n💰 Fees: Free',
        category: 'HEALTH', 
        priority: 'HIGH', 
        isRequired: true, 
        order: 15
      }
    ],
    FOREIGN_STUDENT: [
      {
        title: 'Obtenir une assurance santé privée',
        titleEn: 'Get private health insurance',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    OPEN_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à Manitoba Health',
        titleEn: 'Register for Manitoba Health',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    CLOSED_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à Manitoba Health',
        titleEn: 'Register for Manitoba Health',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ]
  },
  // Saskatchewan
  'SK': {
    PERMANENT_RESIDENT: [
      { 
        title: 'Inscrivez-vous à eHealth Saskatchewan', 
        titleEn: 'Register for eHealth Saskatchewan',
        description: '🏥 Saskatchewan Health Card\n\n✅ Conditions:\n• Résident de la Saskatchewan\n• Présent minimum 183 jours par année\n\n⏱️ Période d\'attente: 3 mois\n\n💰 Frais: Gratuit',
        descriptionEn: '🏥 Saskatchewan Health Card\n\n✅ Requirements:\n• Saskatchewan resident\n• Present minimum 183 days per year\n\n⏱️ Waiting period: 3 months\n\n💰 Fees: Free',
        category: 'HEALTH', 
        priority: 'HIGH', 
        isRequired: true, 
        order: 15
      }
    ],
    FOREIGN_STUDENT: [
      {
        title: 'Obtenir une assurance santé privée',
        titleEn: 'Get private health insurance',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    OPEN_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à eHealth Saskatchewan',
        titleEn: 'Register for eHealth Saskatchewan',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    CLOSED_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à eHealth Saskatchewan',
        titleEn: 'Register for eHealth Saskatchewan',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ]
  },
  // Nouvelle-Écosse
  'NS': {
    PERMANENT_RESIDENT: [
      { 
        title: 'Inscrivez-vous à MSI (Medical Services Insurance)', 
        titleEn: 'Register for MSI (Medical Services Insurance)',
        description: '🏥 MSI - Nouvelle-Écosse\n\n✅ Conditions:\n• Résident de la N.-É.\n\n⏱️ Période d\'attente: 3 mois\n\n💰 Frais: Gratuit',
        descriptionEn: '🏥 MSI - Nova Scotia\n\n✅ Requirements:\n• N.S. resident\n\n⏱️ Waiting period: 3 months\n\n💰 Fees: Free',
        category: 'HEALTH', 
        priority: 'HIGH', 
        isRequired: true, 
        order: 15
      }
    ],
    FOREIGN_STUDENT: [
      {
        title: 'Obtenir une assurance santé privée',
        titleEn: 'Get private health insurance',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    OPEN_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à MSI',
        titleEn: 'Register for MSI',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    CLOSED_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à MSI',
        titleEn: 'Register for MSI',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ]
  },
  // Nouveau-Brunswick
  'NB': {
    PERMANENT_RESIDENT: [
      { 
        title: 'Inscrivez-vous à Medicare Nouveau-Brunswick', 
        titleEn: 'Register for New Brunswick Medicare',
        description: '🏥 Medicare N.-B.\n\n✅ Conditions:\n• Résident du N.-B.\n\n⏱️ Période d\'attente: 3 mois\n\n💰 Frais: Gratuit',
        descriptionEn: '🏥 N.B. Medicare\n\n✅ Requirements:\n• N.B. resident\n\n⏱️ Waiting period: 3 months\n\n💰 Fees: Free',
        category: 'HEALTH', 
        priority: 'HIGH', 
        isRequired: true, 
        order: 15
      }
    ],
    FOREIGN_STUDENT: [
      {
        title: 'Obtenir une assurance santé privée',
        titleEn: 'Get private health insurance',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    OPEN_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à Medicare',
        titleEn: 'Register for Medicare',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    CLOSED_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à Medicare',
        titleEn: 'Register for Medicare',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ]
  },
  // Île-du-Prince-Édouard
  'PE': {
    PERMANENT_RESIDENT: [
      { 
        title: 'Inscrivez-vous à PEI Health Card', 
        titleEn: 'Register for PEI Health Card',
        category: 'HEALTH', 
        priority: 'HIGH', 
        isRequired: true, 
        order: 15
      }
    ],
    FOREIGN_STUDENT: [
      {
        title: 'Obtenir une assurance santé privée',
        titleEn: 'Get private health insurance',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    OPEN_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à PEI Health Card',
        titleEn: 'Register for PEI Health Card',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    CLOSED_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à PEI Health Card',
        titleEn: 'Register for PEI Health Card',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ]
  },
  // Terre-Neuve-et-Labrador
  'NL': {
    PERMANENT_RESIDENT: [
      { 
        title: 'Inscrivez-vous à MCP (Medical Care Plan)', 
        titleEn: 'Register for MCP (Medical Care Plan)',
        category: 'HEALTH', 
        priority: 'HIGH', 
        isRequired: true, 
        order: 15
      }
    ],
    FOREIGN_STUDENT: [
      {
        title: 'Obtenir une assurance santé privée',
        titleEn: 'Get private health insurance',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    OPEN_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à MCP',
        titleEn: 'Register for MCP',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ],
    CLOSED_WORK_PERMIT: [
      {
        title: 'Inscrivez-vous à MCP',
        titleEn: 'Register for MCP',
        category: 'HEALTH',
        priority: 'HIGH',
        isRequired: true,
        order: 15
      }
    ]
  }
}

// Task templates based on immigration status
const taskTemplates = {
  PERMANENT_RESIDENT: [
    { 
      title: 'Obtenir votre Numéro d\'Assurance Sociale (NAS)', 
      titleEn: 'Get your Social Insurance Number (SIN)', 
      description: '🆔 Numéro d\'Assurance Sociale (NAS)\n\n✅ OÙ OBTENIR:\n• Service Canada (en personne)\n• En ligne: canada.ca/sin\n\n📋 DOCUMENTS REQUIS:\n• Passeport ou carte de PR\n• Preuve de résidence\n• Formulaire completé\n\n💰 COÛT: Gratuit\n⏱️ DÉLAI: Immédiat (en personne) ou 10-20 jours (en ligne)\n\n⚠️ IMPORTANT: Le NAS est OBLIGATOIRE pour travailler au Canada.',
      descriptionEn: '🆔 Social Insurance Number (SIN)\n\n✅ WHERE TO GET:\n• Service Canada (in person)\n• Online: canada.ca/sin\n\n📋 REQUIRED DOCUMENTS:\n• Passport or PR card\n• Proof of residence\n• Completed form\n\n💰 COST: Free\n⏱️ PROCESSING: Immediate (in person) or 10-20 days (online)\n\n⚠️ IMPORTANT: SIN is MANDATORY to work in Canada.',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 1,
      source: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html'
    },
    { 
      title: 'Ouvrir un compte bancaire canadien', 
      titleEn: 'Open a Canadian bank account',
      description: '🏦 Compte bancaire canadien\n\n✅ BANQUES AVEC PROGRAMMES NOUVEAUX ARRIVANTS:\n• RBC: Compte gratuit 1 an + bonus $300\n• TD: Compte gratuit 1 an + bonus $350\n• Scotiabank: StartRight® + bonus $350\n• BMO: NewStart® + bonus $350\n• CIBC: Compte Smart™ + bonus $400\n\n📋 DOCUMENTS REQUIS:\n• Passeport\n• Carte de PR ou Confirmation de PR\n• Preuve de résidence (bail accepté)\n\n💰 DÉPÔT MINIMUM: $0-100 selon la banque',
      descriptionEn: '🏦 Canadian Bank Account\n\n✅ BANKS WITH NEWCOMER PROGRAMS:\n• RBC: Free account 1 year + $300 bonus\n• TD: Free account 1 year + $350 bonus\n• Scotiabank: StartRight® + $350 bonus\n• BMO: NewStart® + $350 bonus\n• CIBC: Smart™ Account + $400 bonus\n\n📋 REQUIRED DOCUMENTS:\n• Passport\n• PR card or Confirmation of PR\n• Proof of residence (lease accepted)\n\n💰 MINIMUM DEPOSIT: $0-100 depending on bank',
      category: 'FINANCE', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 2 
    },
    { 
      title: 'Demander votre carte d\'assurance-maladie provinciale', 
      titleEn: 'Apply for provincial health insurance card',
      description: '🏥 Assurance-maladie provinciale\n\n✅ DÉLAI D\'ATTENTE:\n• Ontario: Aucun pour les RP\n• Québec: 0-3 mois\n• Autres provinces: 3 mois\n\n📋 DOCUMENTS GÉNÉRALEMENT REQUIS:\n• Carte de résident permanent\n• Preuve de résidence (bail, factures)\n• Passeport\n• Pièce d\'identité avec photo\n\n⚠️ PRÉVOYEZ une assurance privée pendant la période d\'attente!',
      descriptionEn: '🏥 Provincial Health Insurance\n\n✅ WAITING PERIOD:\n• Ontario: None for PRs\n• Quebec: 0-3 months\n• Other provinces: 3 months\n\n📋 GENERALLY REQUIRED DOCUMENTS:\n• Permanent Resident card\n• Proof of residence (lease, bills)\n• Passport\n• Photo ID\n\n⚠️ PLAN for private insurance during waiting period!',
      category: 'HEALTH', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 3 
    },
    { 
      title: 'Obtenir votre carte de résident permanent', 
      titleEn: 'Get your Permanent Resident card',
      description: '🛡️ Carte de résident permanent (PR Card)\n\n✅ POUR LES NOUVEAUX RP:\n• IRCC envoie automatiquement la carte après l\'atterrissage\n• Délai: 2-4 semaines\n\n📋 SI VOUS DEVEZ DEMANDER:\n• Formulaire IMM 5444\n• Photos conformes aux spécifications\n• Frais: $50 CAD\n\n⚠️ La carte est OBLIGATOIRE pour:\n• Voyages hors Canada\n• Preuve de statut\n• Demandes gouvernementales',
      descriptionEn: '🛡️ Permanent Resident Card (PR Card)\n\n✅ FOR NEW PRs:\n• IRCC automatically sends card after landing\n• Processing: 2-4 weeks\n\n📋 IF YOU NEED TO APPLY:\n• Form IMM 5444\n• Photos meeting specifications\n• Fee: $50 CAD\n\n⚠️ Card is MANDATORY for:\n• Travel outside Canada\n• Proof of status\n• Government applications',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 4,
      source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/demande/carte-resident-permanent.html'
    },
    { 
      title: 'Créer un compte CRA (Agence du revenu du Canada)', 
      titleEn: 'Create a CRA (Canada Revenue Agency) account',
      description: '💰 Compte CRA (Agence du revenu du Canada)\n\n✅ POURQUOI CRÉER UN COMPTE:\n• Déclaration d\'impôts en ligne\n• Suivi des prestations (CCB, GST/HST)\n• Accès à Mon Dossier\n• Gestion des remboursements\n\n📋 INSCRIPTION:\n• canada.ca/mon-dossier\n• Numéro d\'assurance sociale requis\n• Code de sécurité envoyé par courrier\n\n💰 GRATUIT',
      descriptionEn: '💰 CRA Account (Canada Revenue Agency)\n\n✅ WHY CREATE AN ACCOUNT:\n• File taxes online\n• Track benefits (CCB, GST/HST)\n• Access My Account\n• Manage refunds\n\n📋 REGISTRATION:\n• canada.ca/my-account\n• Social Insurance Number required\n• Security code sent by mail\n\n💰 FREE',
      category: 'FINANCE', 
      priority: 'MEDIUM', 
      isRequired: true, 
      order: 5,
      source: 'https://www.canada.ca/fr/agence-revenu/services/services-electroniques/services-connexion-ouverture-session.html'
    },
    { 
      title: 'Trouver un logement', 
      titleEn: 'Find housing',
      description: '🏠 Trouver un logement au Canada\n\n✅ TYPES DE LOGEMENT:\n• Appartement\n• Condo\n• Maison\n• Sous-sol aménagé\n\n📋 DOCUMENTS REQUIS PAR LES PROPRIÉTAIRES:\n• Lettre d\'emploi/salaire\n• Références\n• Preuve de revenu (3x le loyer)\n• Vérification de crédit (peut être difficile sans historique)\n\n💰 COÛTS PRÉVISUALISÉS:\n• Premier mois de loyer\n• Dépôt de garantie (varie par province)\n\n🔍 SITES RECOMMANDÉS:\n• Rentals.ca\n• Kijiji\n• Facebook Marketplace\n• Centris.ca (Québec)',
      descriptionEn: '🏠 Finding Housing in Canada\n\n✅ HOUSING TYPES:\n• Apartment\n• Condo\n• House\n• Basement suite\n\n📋 DOCUMENTS LANDLORDS REQUIRE:\n• Employment/salary letter\n• References\n• Proof of income (3x rent)\n• Credit check (can be difficult without history)\n\n💰 UPFRONT COSTS:\n• First month rent\n• Security deposit (varies by province)\n\n🔍 RECOMMENDED SITES:\n• Rentals.ca\n• Kijiji\n• Facebook Marketplace\n• Centris.ca (Quebec)',
      category: 'HOUSING', 
      priority: 'HIGH', 
      isRequired: false, 
      order: 6 
    },
    { 
      title: 'Construire votre crédit canadien', 
      titleEn: 'Build your Canadian credit',
      description: '💳 Construire votre historique de crédit\n\n✅ POURQUOI C\'EST IMPORTANT:\n• Location de logement\n• Prêts automobiles\n• Hypothèque\n• Taux d\'intérêt favorables\n\n📋 COMMENT COMMENCER:\n1. Obtenir une carte de crédit sécurisée ($500-1000 dépôt)\n2. Cartes pour nouveaux arrivants (RBC, Capital One)\n3. Toujours payer à temps\n4. Maintenir l\'utilisation sous 30%\n\n⚠️ Évitez:\n• Trop de demandes de crédit\n• Paiements en retard\n• Soldes élevés',
      descriptionEn: '💳 Building Your Credit History\n\n✅ WHY IT\'S IMPORTANT:\n• Rental applications\n• Car loans\n• Mortgage\n• Favorable interest rates\n\n📋 HOW TO START:\n1. Get a secured credit card ($500-1000 deposit)\n2. Newcomer cards (RBC, Capital One)\n3. Always pay on time\n4. Keep utilization under 30%\n\n⚠️ Avoid:\n• Too many credit applications\n• Late payments\n• High balances',
      category: 'FINANCE', 
      priority: 'MEDIUM', 
      isRequired: false, 
      order: 7 
    },
    { 
      title: 'Faire reconnaître vos diplômes', 
      titleEn: 'Get your credentials recognized',
      description: '🎓 Reconnaissance des diplômes\n\n✅ POURQUOI:\n• Travailler dans votre domaine\n• Exercer une profession réglementée\n• Études avancées\n\n📋 SERVICES D\'ÉVALUATION:\n• WES (World Education Services) - $200-400\n• ICAS (International Credential Assessment)\n• IQAS (Alberta)\n• BCIT (Colombie-Britannique)\n\n⏱️ DÉLAI: 4-8 semaines\n\n⚠️ Certains métiers réglementés nécessitent des étapes supplémentaires (médecins, ingénieurs, comptables).',
      descriptionEn: '🎓 Credential Recognition\n\n✅ WHY:\n• Work in your field\n• Practice a regulated profession\n• Advanced studies\n\n📋 ASSESSMENT SERVICES:\n• WES (World Education Services) - $200-400\n• ICAS (International Credential Assessment)\n• IQAS (Alberta)\n• BCIT (British Columbia)\n\n⏱️ PROCESSING: 4-8 weeks\n\n⚠️ Some regulated professions require additional steps (doctors, engineers, accountants).',
      category: 'EMPLOYMENT', 
      priority: 'MEDIUM', 
      isRequired: false, 
      order: 8,
      source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/immigrer-canada/trouver-emploi/reconnaissances-diplomes.html'
    },
    { 
      title: 'Mettre à jour votre CV au format canadien', 
      titleEn: 'Update your CV to Canadian format',
      description: '📄 CV au format canadien\n\n✅ CARACTÉRISTIQUES:\n• 1-2 pages maximum\n• Pas de photo\n• Pas d\'informations personnelles (âge, statut marital)\n• Format chronologique inversé\n\n📋 STRUCTURE RECOMMANDÉE:\n1. Coordonnées\n2. Résumé professionnel (3-4 lignes)\n3. Expérience professionnelle\n4. Formation\n5. Compétences\n\n💡 NOTRE MODULE EMPLOI peut optimiser votre CV avec l\'IA!',
      descriptionEn: '📄 Canadian Format CV\n\n✅ CHARACTERISTICS:\n• 1-2 pages maximum\n• No photo\n• No personal info (age, marital status)\n• Reverse chronological format\n\n📋 RECOMMENDED STRUCTURE:\n1. Contact information\n2. Professional summary (3-4 lines)\n3. Work experience\n4. Education\n5. Skills\n\n💡 OUR EMPLOYMENT MODULE can optimize your CV with AI!',
      category: 'EMPLOYMENT', 
      priority: 'MEDIUM', 
      isRequired: false, 
      order: 9 
    },
    { 
      title: 'Rejoindre des groupes communautaires', 
      titleEn: 'Join community groups',
      description: '👥 Intégration communautaire\n\n✅ AVANTAGES:\n• Réseautage professionnel\n• Soutien social\n• Pratique linguistique\n• Découverte culturelle\n\n📋 OÙ TROUVER:\n• Meetup.com\n• Groupes Facebook locaux\n• Centres communautaires\n• Bibliothèques publiques\n• Associations culturelles\n\n💡 Visitez notre module Communauté pour découvrir les événements locaux!',
      descriptionEn: '👥 Community Integration\n\n✅ BENEFITS:\n• Professional networking\n• Social support\n• Language practice\n• Cultural discovery\n\n📋 WHERE TO FIND:\n• Meetup.com\n• Local Facebook groups\n• Community centers\n• Public libraries\n• Cultural associations\n\n💡 Visit our Community module to discover local events!',
      category: 'COMMUNITY', 
      priority: 'LOW', 
      isRequired: false, 
      order: 10 
    }
  ],
  FOREIGN_STUDENT: [
    { 
      title: 'Confirmer votre inscription à l\'établissement d\'enseignement', 
      titleEn: 'Confirm your enrollment at the educational institution',
      description: '🎓 Inscription universitaire\n\n✅ ÉTAPES:\n1. Accepter l\'offre d\'admission\n2. Payer les frais d\'inscription\n3. Choisir vos cours\n4. Obtenir votre horaire\n\n📋 DOCUMENTS À PRÉPARER:\n• Lettre d\'admission\n• Permis d\'études\n• Passeport\n• Preuve de paiement\n\n⏱️ Respectez les délais de votre établissement!',
      descriptionEn: '🎓 University Enrollment\n\n✅ STEPS:\n1. Accept admission offer\n2. Pay registration fees\n3. Select your courses\n4. Get your schedule\n\n📋 DOCUMENTS TO PREPARE:\n• Admission letter\n• Study permit\n• Passport\n• Proof of payment\n\n⏱️ Meet your institution\'s deadlines!',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 1 
    },
    { 
      title: 'Obtenir votre Numéro d\'Assurance Sociale (NAS)', 
      titleEn: 'Get your Social Insurance Number (SIN)',
      description: '🆔 NAS pour étudiants internationaux\n\n✅ OÙ OBTENIR:\n• Service Canada (en personne)\n• En ligne: canada.ca/sin\n\n📋 DOCUMENTS REQUIS:\n• Passeport\n• Permis d\'études\n\n⏱️ DÉLAI: Immédiat (en personne)\n\n⚠️ Votre NAS commencera par "9" - cela indique un statut temporaire.',
      descriptionEn: '🆔 SIN for International Students\n\n✅ WHERE TO GET:\n• Service Canada (in person)\n• Online: canada.ca/sin\n\n📋 REQUIRED DOCUMENTS:\n• Passport\n• Study permit\n\n⏱️ PROCESSING: Immediate (in person)\n\n⚠️ Your SIN will start with "9" - this indicates temporary status.',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 2,
      source: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html'
    },
    { 
      title: 'Ouvrir un compte bancaire pour étudiants', 
      titleEn: 'Open a student bank account',
      description: '🏦 Compte bancaire étudiant\n\n✅ BANQUES AVEC OFFRES ÉTUDIANTS:\n• RBC: Compte étudiant gratuit\n• TD: Compte étudiant illimité\n• Scotiabank: SCENE+ rewards\n• CIBC: Compte étudiant intelligent\n\n📋 DOCUMENTS REQUIS:\n• Passeport\n• Permis d\'études\n• Preuve d\'inscription\n\n💰 GRATUIT pendant vos études!',
      descriptionEn: '🏦 Student Bank Account\n\n✅ BANKS WITH STUDENT OFFERS:\n• RBC: Free student account\n• TD: Unlimited student account\n• Scotiabank: SCENE+ rewards\n• CIBC: Smart student account\n\n📋 REQUIRED DOCUMENTS:\n• Passport\n• Study permit\n• Proof of enrollment\n\n💰 FREE during your studies!',
      category: 'FINANCE', 
      priority: 'HIGH', 
      isRequired: false, 
      order: 3 
    },
    { 
      title: 'Comprendre vos droits de travail (max 24h/semaine hors campus)', 
      titleEn: 'Understand your work rights (max 24h/week off-campus)',
      description: '💼 Droits de travail - Étudiants internationaux\n\n✅ AUTORISATION DE TRAVAIL:\n• Hors campus: Maximum 24h/semaine pendant les sessions\n• Sur campus: Illimité\n• Vacances: Plein temps autorisé\n\n📋 CONDITIONS:\n• Permis d\'études valide\n• Études à temps plein\n• DLI (établissement désigné)\n\n⚠️ RÈGLES 2024:\nLe gouvernement a temporairement augmenté la limite à 24h/semaine.\n\n🚨 NE DÉPASSEZ PAS ces limites - risque de refus de futurs permis!',
      descriptionEn: '💼 Work Rights - International Students\n\n✅ WORK AUTHORIZATION:\n• Off-campus: Maximum 24h/week during sessions\n• On-campus: Unlimited\n• Breaks: Full-time allowed\n\n📋 CONDITIONS:\n• Valid study permit\n• Full-time studies\n• DLI (designated institution)\n\n⚠️ 2024 RULES:\nGovernment temporarily increased limit to 24h/week.\n\n🚨 DO NOT EXCEED these limits - risk of future permit refusal!',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 4,
      source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/travailler-canada/etudiants.html'
    },
    { 
      title: 'Souscrire une assurance santé privée (si applicable)', 
      titleEn: 'Get private health insurance (if applicable)',
      description: '🏥 Assurance santé pour étudiants\n\n✅ OPTIONS:\n• Guard.me (populaire au Canada)\n• MSH International\n• Assurance de votre université\n\n📋 VÉRIFIER:\n• Couverture médicale complète\n• Soins dentaires inclus?\n• Médicaments couverts?\n\n💰 COÛT: $50-150/mois\n\n⚠️ La plupart des provinces ne couvrent PAS les étudiants internationaux.',
      descriptionEn: '🏥 Health Insurance for Students\n\n✅ OPTIONS:\n• Guard.me (popular in Canada)\n• MSH International\n• Your university\'s plan\n\n📋 CHECK:\n• Complete medical coverage\n• Dental care included?\n• Medications covered?\n\n💰 COST: $50-150/month\n\n⚠️ Most provinces do NOT cover international students.',
      category: 'HEALTH', 
      priority: 'MEDIUM', 
      isRequired: false, 
      order: 5 
    },
    { 
      title: 'Trouver un logement étudiant', 
      titleEn: 'Find student housing',
      description: '🏠 Logement étudiant\n\n✅ OPTIONS:\n• Résidences universitaires\n• Appartements partagés\n• Chambre chez l\'habitant\n\n📋 DOCUMENTS REQUIS:\n• Preuve d\'inscription\n• Lettre de garantie (parfois)\n\n💰 BUDGET À PRÉVOIR:\n• Résidence: $600-1200/mois\n• Appartement partagé: $400-800/mois\n\n🔍 SITES UTILES:\n• Kijiji\n• Facebook Marketplace\n• Site de votre université',
      descriptionEn: '🏠 Student Housing\n\n✅ OPTIONS:\n• University residences\n• Shared apartments\n• Room in a house\n\n📋 REQUIRED DOCUMENTS:\n• Proof of enrollment\n• Guarantee letter (sometimes)\n\n💰 BUDGET TO PLAN:\n• Residence: $600-1200/month\n• Shared apartment: $400-800/month\n\n🔍 USEFUL SITES:\n• Kijiji\n• Facebook Marketplace\n• Your university\'s website',
      category: 'HOUSING', 
      priority: 'HIGH', 
      isRequired: false, 
      order: 6 
    },
    {
      title: 'Planifier votre éligibilité au PGWP',
      titleEn: 'Plan your PGWP eligibility',
      description: '🎓 Permis de travail post-diplôme (PGWP)\n\n✅ CONDITIONS D\'ÉLIGIBILITÉ:\n• Programme de minimum 8 mois dans un DLI\n• Mène à un diplôme, certificat ou grade\n• Temps plein pendant les études\n• Permis d\'études valide\n\n📋 DURÉE DU PGWP:\n• 8-12 mois → PGWP de même durée\n• 12+ mois → PGWP de 3 ans\n\n⚠️ ATTENTION:\n• Programmes FSL < 12 mois: NON éligibles\n• Programmes à distance: NON éligibles\n• 180 jours après la fin pour appliquer\n\n💰 FRAIS: $255 CAD\n⏱️ DÉLAI: ~80-100 jours',
      descriptionEn: '🎓 Post-Graduation Work Permit (PGWP)\n\n✅ ELIGIBILITY REQUIREMENTS:\n• Minimum 8-month program at a DLI\n• Leads to a degree, certificate or diploma\n• Full-time during studies\n• Valid study permit\n\n📋 PGWP DURATION:\n• 8-12 months → Same length PGWP\n• 12+ months → 3-year PGWP\n\n⚠️ IMPORTANT:\n• FSL programs < 12 months: NOT eligible\n• Distance learning: NOT eligible\n• 180 days after graduation to apply\n\n💰 FEE: $255 CAD\n⏱️ PROCESSING: ~80-100 days',
      category: 'IMMIGRATION',
      priority: 'MEDIUM',
      isRequired: false,
      order: 7,
      source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/travailler-canada/permis/post-diplome.html'
    },
    { 
      title: 'Créer votre profil LinkedIn', 
      titleEn: 'Create your LinkedIn profile',
      description: '🔗 Profil LinkedIn pour étudiants\n\n✅ POURQUOI:\n• Réseautage professionnel\n• Opportunités d\'emploi\n• Stages et coop\n\n📋 CONSEILS:\n• Photo professionnelle\n• Résumé clair\n• Compétences pertinentes\n• Projets académiques\n\n💡 Utilisez notre module Emploi pour optimiser votre profil!',
      descriptionEn: '🔗 LinkedIn Profile for Students\n\n✅ WHY:\n• Professional networking\n• Job opportunities\n• Internships and co-ops\n\n📋 TIPS:\n• Professional photo\n• Clear summary\n• Relevant skills\n• Academic projects\n\n💡 Use our Employment module to optimize your profile!',
      category: 'EMPLOYMENT', 
      priority: 'LOW', 
      isRequired: false, 
      order: 8 
    },
    { 
      title: 'Explorer les offres d\'emploi étudiant', 
      titleEn: 'Explore student job opportunities',
      description: '💼 Emplois pour étudiants\n\n✅ TYPES D\'EMPLOIS:\n• Sur campus (bibliothèque, cafétéria)\n• Hors campus (vente au détail, service)\n• Stages rémunérés\n\n🔍 OÙ CHERCHER:\n• Centre de carrière de votre université\n• Indeed.ca\n• Job Bank (guichet-emplois.gc.ca)\n\n📋 PRÉPAREZ:\n• CV canadien\n• Lettre de motivation\n• Références',
      descriptionEn: '💼 Student Jobs\n\n✅ JOB TYPES:\n• On-campus (library, cafeteria)\n• Off-campus (retail, service)\n• Paid internships\n\n🔍 WHERE TO LOOK:\n• Your university\'s career center\n• Indeed.ca\n• Job Bank (jobbank.gc.ca)\n\n📋 PREPARE:\n• Canadian CV\n• Cover letter\n• References',
      category: 'EMPLOYMENT', 
      priority: 'LOW', 
      isRequired: false, 
      order: 9 
    }
  ],
  OPEN_WORK_PERMIT: [
    { 
      title: 'Vérifier la date d\'expiration de votre permis', 
      titleEn: 'Check your permit expiry date',
      description: '📅 Suivi des dates d\'expiration\n\n⚠️ IMPORTANT:\n• Renouvelez au moins 90 jours avant\n• Minimum légal: 30 jours\n\n📋 SI EXPIRATION PROCHE:\n• Appliquez immédiatement\n• Statut implicite si demande envoyée à temps\n\n💡 NouveauCap vous envoie des rappels automatiques!',
      descriptionEn: '📅 Expiry Date Tracking\n\n⚠️ IMPORTANT:\n• Renew at least 90 days before\n• Legal minimum: 30 days\n\n📋 IF EXPIRING SOON:\n• Apply immediately\n• Implied status if application sent on time\n\n💡 NouveauCap sends you automatic reminders!',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 1 
    },
    { 
      title: 'Obtenir votre NAS si pas déjà fait', 
      titleEn: 'Get your SIN if not already done',
      description: '🆔 Numéro d\'Assurance Sociale\n\n✅ OÙ OBTENIR:\n• Service Canada (en personne)\n• En ligne: canada.ca/sin\n\n📋 DOCUMENTS:\n• Passeport\n• Permis de travail\n\n⏱️ Immédiat en personne',
      descriptionEn: '🆔 Social Insurance Number\n\n✅ WHERE TO GET:\n• Service Canada (in person)\n• Online: canada.ca/sin\n\n📋 DOCUMENTS:\n• Passport\n• Work permit\n\n⏱️ Immediate in person',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 2,
      source: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html'
    },
    { 
      title: 'Ouvrir un compte bancaire canadien', 
      titleEn: 'Open a Canadian bank account',
      description: '🏦 Compte bancaire pour travailleurs\n\n✅ BANQUES RECOMMANDÉES:\n• RBC, TD, Scotiabank, BMO, CIBC\n\n📋 DOCUMENTS:\n• Passeport\n• Permis de travail\n• Preuve d\'adresse\n\n💰 Programmes nouveaux arrivants disponibles!',
      descriptionEn: '🏦 Bank Account for Workers\n\n✅ RECOMMENDED BANKS:\n• RBC, TD, Scotiabank, BMO, CIBC\n\n📋 DOCUMENTS:\n• Passport\n• Work permit\n• Proof of address\n\n💰 Newcomer programs available!',
      category: 'FINANCE', 
      priority: 'HIGH', 
      isRequired: false, 
      order: 3 
    },
    { 
      title: 'Calculer vos points CRS pour Entrée Express', 
      titleEn: 'Calculate your CRS points for Express Entry',
      description: '📊 Système de classement complet (CRS)\n\n✅ FACTEURS:\n• Âge (max 110 points)\n• Éducation (max 150 points)\n• Langue (max 160 points)\n• Expérience Canada (max 80 points)\n\n🎯 SCORE COMPÉTITIF: 450+\n\n💡 Utilisez notre simulateur CRS dans le module Immigration!',
      descriptionEn: '📊 Comprehensive Ranking System (CRS)\n\n✅ FACTORS:\n• Age (max 110 points)\n• Education (max 150 points)\n• Language (max 160 points)\n• Canadian experience (max 80 points)\n\n🎯 COMPETITIVE SCORE: 450+\n\n💡 Use our CRS simulator in the Immigration module!',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: false, 
      order: 4 
    },
    { 
      title: 'Demander l\'assurance-maladie provinciale', 
      titleEn: 'Apply for provincial health insurance',
      description: '🏥 Assurance-maladie pour travailleurs\n\n✅ CONDITIONS GÉNÉRALES:\n• Permis de travail valide min. 6 mois\n• Emploi à temps plein\n• Résident de la province\n\n⏱️ PÉRIODE D\'ATTENTE:\n• Ontario: 3 mois\n• Québec: Max 3 mois\n• Autres: 3 mois\n\n⚠️ Prévoyez une assurance privée!',
      descriptionEn: '🏥 Health Insurance for Workers\n\n✅ GENERAL REQUIREMENTS:\n• Valid work permit min. 6 months\n• Full-time employment\n• Province resident\n\n⏱️ WAITING PERIOD:\n• Ontario: 3 months\n• Quebec: Max 3 months\n• Others: 3 months\n\n⚠️ Plan for private insurance!',
      category: 'HEALTH', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 5 
    },
    { 
      title: 'Préparer votre dossier de résidence permanente', 
      titleEn: 'Prepare your permanent residence application',
      description: '🛡️ Préparation RP\n\n✅ PROGRAMMES:\n• Entrée Express (FSW, CEC, FST)\n• PNP (Programme des candidats des provinces)\n• ESDC (parrainage)\n\n📋 DOCUMENTS À PRÉPARER:\n• Résultats EERA (examen médical)\n• Certificats de police\n• Preuves de fonds\n• Résultats IELTS/TEF\n\n💡 NouveauCap peut vous aider à planifier!',
      descriptionEn: '🛡️ PR Preparation\n\n✅ PROGRAMS:\n• Express Entry (FSW, CEC, FST)\n• PNP (Provincial Nominee Program)\n• ESDC (sponsorship)\n\n📋 DOCUMENTS TO PREPARE:\n• EERA results (medical exam)\n• Police certificates\n• Proof of funds\n• IELTS/TEF results\n\n💡 NouveauCap can help you plan!',
      category: 'IMMIGRATION', 
      priority: 'MEDIUM', 
      isRequired: false, 
      order: 6 
    },
    { 
      title: 'Mettre à jour votre CV canadien', 
      titleEn: 'Update your Canadian CV',
      description: '📄 CV canadien professionnel\n\n✅ FORMAT STANDARD:\n• 1-2 pages\n• Pas de photo\n• Chronologie inversée\n\n📋 INCLURE:\n• Résumé professionnel\n• Expérience pertinente\n• Compétences transférables\n\n💡 Utilisez notre optimiseur IA!',
      descriptionEn: '📄 Professional Canadian CV\n\n✅ STANDARD FORMAT:\n• 1-2 pages\n• No photo\n• Reverse chronology\n\n📋 INCLUDE:\n• Professional summary\n• Relevant experience\n• Transferable skills\n\n💡 Use our AI optimizer!',
      category: 'EMPLOYMENT', 
      priority: 'HIGH', 
      isRequired: false, 
      order: 7 
    },
    { 
      title: 'Créer un profil Entrée Express', 
      titleEn: 'Create an Express Entry profile',
      description: '🚀 Profil Entrée Express\n\n✅ ÉTAPES:\n1. Vérifier l\'admissibilité\n2. Rassembler les documents\n3. Créer le profil en ligne\n4. Soumettre\n\n📋 DOCUMENTS REQUIS:\n• Passeport\n• Résultats langue (IELTS/TEF)\n• Évaluation des diplômes (EÉC)\n• Lettres d\'emploi\n\n💰 Frais: $1,365 CAD (inclut les droits de RP)',
      descriptionEn: '🚀 Express Entry Profile\n\n✅ STEPS:\n1. Check eligibility\n2. Gather documents\n3. Create online profile\n4. Submit\n\n📋 REQUIRED DOCUMENTS:\n• Passport\n• Language results (IELTS/TEF)\n• Credential assessment (ECA)\n• Employment letters\n\n💰 Fee: $1,365 CAD (includes PR fees)',
      category: 'IMMIGRATION', 
      priority: 'MEDIUM', 
      isRequired: false, 
      order: 8,
      source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/immigrer-canada/entree-express.html'
    }
  ],
  CLOSED_WORK_PERMIT: [
    { 
      title: 'Comprendre vos droits en tant que travailleur', 
      titleEn: 'Understand your rights as a worker',
      description: '⚖️ Droits des travailleurs au Canada\n\n✅ DROITS FONDAMENTAUX:\n• Salaire minimum provincial\n• Heures supplémentaires payées\n• Congés annuels payés\n• Environnement sécuritaire\n• Protection contre le harcèlement\n\n📋 LOIS APPLICABLES:\n• Code canadien du travail\n• Normes d\'emploi provinciales\n\n🚨 SI PROBLÈME:\n• Contactez le ministère du Travail\n• Services d\'aide juridique disponibles',
      descriptionEn: '⚖️ Worker Rights in Canada\n\n✅ FUNDAMENTAL RIGHTS:\n• Provincial minimum wage\n• Paid overtime\n• Paid annual leave\n• Safe environment\n• Protection from harassment\n\n📋 APPLICABLE LAWS:\n• Canada Labour Code\n• Provincial employment standards\n\n🚨 IF ISSUES:\n• Contact Ministry of Labour\n• Legal aid services available',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 1,
      source: 'https://www.canada.ca/fr/emploi-developpement-social/services/normes-travail.html'
    },
    { 
      title: 'Obtenir votre NAS', 
      titleEn: 'Get your SIN',
      description: '🆔 Numéro d\'Assurance Sociale\n\n✅ OÙ OBTENIR:\n• Service Canada (en personne)\n• En ligne: canada.ca/sin\n\n📋 DOCUMENTS:\n• Passeport\n• Permis de travail fermé\n\n⏱️ Immédiat en personne',
      descriptionEn: '🆔 Social Insurance Number\n\n✅ WHERE TO GET:\n• Service Canada (in person)\n• Online: canada.ca/sin\n\n📋 DOCUMENTS:\n• Passport\n• Closed work permit\n\n⏱️ Immediate in person',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 2,
      source: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html'
    },
    { 
      title: 'Ouvrir un compte bancaire', 
      titleEn: 'Open a bank account',
      description: '🏦 Compte bancaire canadien\n\n✅ OPTIONS:\n• Grandes banques (RBC, TD, etc.)\n• Banques en ligne (Tangerine, Simpli)\n\n📋 DOCUMENTS:\n• Passeport\n• Permis de travail\n• Preuve d\'adresse',
      descriptionEn: '🏦 Canadian Bank Account\n\n✅ OPTIONS:\n• Major banks (RBC, TD, etc.)\n• Online banks (Tangerine, Simpli)\n\n📋 DOCUMENTS:\n• Passport\n• Work permit\n• Proof of address',
      category: 'FINANCE', 
      priority: 'HIGH', 
      isRequired: false, 
      order: 3 
    },
    { 
      title: 'Vérifier la date d\'expiration de votre permis', 
      titleEn: 'Check your permit expiry date',
      description: '📅 Suivi des dates d\'expiration\n\n⚠️ IMPORTANT:\n• Renouvelez 90 jours avant\n• Minimum légal: 30 jours\n\n📋 SI CHANGEMENT D\'EMPLOYEUR:\n• Nouveau permis requis\n• Demandez à votre employeur',
      descriptionEn: '📅 Expiry Date Tracking\n\n⚠️ IMPORTANT:\n• Renew 90 days before\n• Legal minimum: 30 days\n\n📋 IF CHANGING EMPLOYER:\n• New permit required\n• Ask your employer',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 4 
    },
    { 
      title: 'Connaître vos recours en cas d\'abus', 
      titleEn: 'Know your recourse in case of abuse',
      description: '🚨 Recours contre les abus\n\n✅ TYPES D\'ABUS:\n• Non-paiement du salaire\n• Conditions de travail dangereuses\n• Harcèlement\n• Confiscation de documents\n\n📋 OÙ DEMANDER DE L\'AIDE:\n• Ministère du Travail provincial\n• Immigration, Réfugiés et Citoyenneté Canada\n• Centres d\'aide juridique\n\n📞 URGENCES: 911',
      descriptionEn: '🚨 Recourse Against Abuse\n\n✅ TYPES OF ABUSE:\n• Non-payment of wages\n• Dangerous working conditions\n• Harassment\n• Document confiscation\n\n📋 WHERE TO GET HELP:\n• Provincial Ministry of Labour\n• Immigration, Refugees and Citizenship Canada\n• Legal aid centers\n\n📞 EMERGENCIES: 911',
      category: 'IMMIGRATION', 
      priority: 'HIGH', 
      isRequired: true, 
      order: 5,
      source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/travailler-canada/employeurs-travailleurs-etrangers/assistance.html'
    },
    { 
      title: 'Accéder aux services de santé', 
      titleEn: 'Access health services',
      description: '🏥 Services de santé\n\n✅ OPTIONS:\n• Assurance-maladie provinciale\n• Cliniques sans rendez-vous\n• Services d\'urgence\n\n📋 VÉRIFIER:\n• Admissibilité à l\'assurance provinciale\n• Assurance privée de votre employeur',
      descriptionEn: '🏥 Health Services\n\n✅ OPTIONS:\n• Provincial health insurance\n• Walk-in clinics\n• Emergency services\n\n📋 CHECK:\n• Eligibility for provincial insurance\n• Employer\'s private insurance',
      category: 'HEALTH', 
      priority: 'HIGH', 
      isRequired: false, 
      order: 6 
    },
    { 
      title: 'Options pour transferts d\'argent', 
      titleEn: 'Money transfer options',
      description: '💰 Transferts d\'argent international\n\n✅ OPTIONS:\n• Services en ligne (Wise, Remitly)\n• Banques canadiennes\n• Western Union\n\n💰 FRAIS À COMPARER:\n• Taux de change\n• Frais de transfert\n• Délais\n\n💡 Wise offre souvent les meilleurs taux!',
      descriptionEn: '💰 International Money Transfers\n\n✅ OPTIONS:\n• Online services (Wise, Remitly)\n• Canadian banks\n• Western Union\n\n💰 FEES TO COMPARE:\n• Exchange rate\n• Transfer fees\n• Processing time\n\n💡 Wise often offers the best rates!',
      category: 'FINANCE', 
      priority: 'MEDIUM', 
      isRequired: false, 
      order: 7 
    }
  ]
}

// Save onboarding data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, onboardingData } = body

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'ID utilisateur manquant' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Validate immigration status
    const validStatuses = ['PERMANENT_RESIDENT', 'FOREIGN_STUDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT']
    if (!onboardingData.immigrationStatus || !validStatuses.includes(onboardingData.immigrationStatus)) {
      return NextResponse.json(
        { success: false, error: 'Statut d\'immigration invalide' },
        { status: 400 }
      )
    }

    // Validate province
    const validProvinces = ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'PE', 'NL', 'NT', 'YT', 'NU']
    if (!onboardingData.province || !validProvinces.includes(onboardingData.province)) {
      return NextResponse.json(
        { success: false, error: 'Province invalide' },
        { status: 400 }
      )
    }

    // Prepare permit expiry dates
    const permitData: any = {}
    if (onboardingData.studyPermitExpiry) {
      permitData.studyPermitExpiry = new Date(onboardingData.studyPermitExpiry)
    }
    if (onboardingData.workPermitExpiry) {
      permitData.workPermitExpiry = new Date(onboardingData.workPermitExpiry)
    }
    if (onboardingData.passportExpiry) {
      permitData.passportExpiry = new Date(onboardingData.passportExpiry)
    }

    // Update user with onboarding data
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        immigrationStatus: onboardingData.immigrationStatus,
        province: onboardingData.province,
        arrivalDate: onboardingData.arrivalDate ? new Date(onboardingData.arrivalDate) : null,
        professionalSector: onboardingData.professionalSector,
        preferredLanguage: onboardingData.preferredLanguage || 'fr',
        familyStatus: onboardingData.familyStatus,
        countryOfOrigin: onboardingData.countryOfOrigin,
        onboardingCompleted: true,
        ...permitData
      }
    })

    // Generate tasks based on immigration status
    const tasks = taskTemplates[onboardingData.immigrationStatus as keyof typeof taskTemplates] || []
    
    // Get province-specific tasks
    const provinceTasks = provinceSpecificTasks[onboardingData.province]?.[onboardingData.immigrationStatus as keyof typeof provinceSpecificTasks[string]] || []
    
    // Combine all tasks
    const allTasks = [...tasks, ...provinceTasks]
    
    // Create tasks for the user
    for (const task of allTasks) {
      await prisma.task.create({
        data: {
          userId,
          title: task.title,
          titleEn: task.titleEn,
          description: task.description,
          descriptionEn: task.descriptionEn,
          category: task.category,
          priority: task.priority,
          isRequired: task.isRequired,
          order: task.order,
          status: 'PENDING',
          source: task.source
        }
      })
    }

    // Create permit renewal alerts based on Canadian rules
    // Rules: Apply at least 30 days before expiry (official minimum)
    // Recommended: 90 days (3 months) before expiry
    const now = new Date()
    const alertThresholds = [
      { days: 90, urgency: 'WARNING', messageFr: '⚠️ Renouvelez votre permis dans les 90 jours', messageEn: '⚠️ Renew your permit within 90 days' },
      { days: 60, urgency: 'URGENT', messageFr: '🔴 Renouvelez votre permis dans les 60 jours - Action recommandée', messageEn: '🔴 Renew your permit within 60 days - Action recommended' },
      { days: 30, urgency: 'CRITICAL', messageFr: '🚨 DERNIER DÉLAI: Renouvelez votre permis dans les 30 jours!', messageEn: '🚨 FINAL DEADLINE: Renew your permit within 30 days!' }
    ]

    // Create alerts for study permit
    if (permitData.studyPermitExpiry) {
      const expiryDate = new Date(permitData.studyPermitExpiry)
      
      // Create initial alert
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysUntilExpiry <= 90 && daysUntilExpiry > 0) {
        const urgency = daysUntilExpiry <= 30 ? 'CRITICAL' : daysUntilExpiry <= 60 ? 'URGENT' : 'WARNING'
        const messageFr = daysUntilExpiry <= 30 
          ? `🚨 URGENT: Votre permis d'études expire dans ${daysUntilExpiry} jours! Renouvelez IMMÉDIATEMENT pour maintenir votre statut légal.`
          : daysUntilExpiry <= 60 
          ? `🔴 Votre permis d'études expire dans ${daysUntilExpiry} jours. Commencez votre demande de renouvellement maintenant.`
          : `⚠️ Votre permis d'études expire dans ${daysUntilExpiry} jours. Planifiez votre renouvellement.`
        const messageEn = daysUntilExpiry <= 30 
          ? `🚨 URGENT: Your study permit expires in ${daysUntilExpiry} days! Renew IMMEDIATELY to maintain your legal status.`
          : daysUntilExpiry <= 60 
          ? `🔴 Your study permit expires in ${daysUntilExpiry} days. Start your renewal application now.`
          : `⚠️ Your study permit expires in ${daysUntilExpiry} days. Plan your renewal.`

        await prisma.alert.create({
          data: {
            userId,
            type: 'STUDY_PERMIT_EXPIRY',
            title: onboardingData.preferredLanguage === 'fr' ? '📅 Permis d\'études à renouveler' : '📅 Study Permit Renewal',
            message: onboardingData.preferredLanguage === 'fr' ? messageFr : messageEn,
            dueDate: expiryDate
          }
        })
      }

      // Create reminder task for renewal
      const renewalTaskTitle = onboardingData.preferredLanguage === 'fr' 
        ? `Renouveler votre permis d'études (expire le ${expiryDate.toLocaleDateString('fr-CA')})`
        : `Renew your study permit (expires ${expiryDate.toLocaleDateString('en-CA')})`
      const renewalTaskTitleEn = `Renew your study permit (expires ${expiryDate.toLocaleDateString('en-CA')})`
      
      await prisma.task.create({
        data: {
          userId,
          title: renewalTaskTitle,
          titleEn: renewalTaskTitleEn,
          description: onboardingData.preferredLanguage === 'fr' 
            ? `📋 RÈGLES DE RENOUVELLEMENT:\n\n✅ Quand renouveler:\n• Minimum 30 jours avant l'expiration (obligatoire)\n• Recommandé: 90 jours avant\n\n📋 Documents nécessaires:\n• Passeport valide\n• Preuve d'inscription à votre établissement\n• Preuve de ressources financières\n• Photo format passeport\n\n💰 Frais: $150 CAD\n⏱️ Délai de traitement: 27 jours (moyenne)\n\n⚠️ STATUT IMPLICITE:\nSi vous appliquez avant l'expiration, vous pouvez continuer à étudier pendant le traitement de votre demande.`
            : `📋 RENEWAL RULES:\n\n✅ When to renew:\n• Minimum 30 days before expiry (mandatory)\n• Recommended: 90 days before\n\n📋 Required documents:\n• Valid passport\n• Proof of enrollment at your institution\n• Proof of financial resources\n• Passport-size photo\n\n💰 Fee: $150 CAD\n⏱️ Processing time: 27 days (average)\n\n⚠️ IMPLIED STATUS:\nIf you apply before expiry, you can continue studying while your application is processed.`,
          descriptionEn: `📋 RENEWAL RULES:\n\n✅ When to renew:\n• Minimum 30 days before expiry (mandatory)\n• Recommended: 90 days before\n\n📋 Required documents:\n• Valid passport\n• Proof of enrollment at your institution\n• Proof of financial resources\n• Passport-size photo\n\n💰 Fee: $150 CAD\n⏱️ Processing time: 27 days (average)\n\n⚠️ IMPLIED STATUS:\nIf you apply before expiry, you can continue studying while your application is processed.`,
          category: 'IMMIGRATION',
          priority: daysUntilExpiry <= 30 ? 'HIGH' : daysUntilExpiry <= 60 ? 'HIGH' : 'MEDIUM',
          isRequired: true,
          order: 0,
          status: 'PENDING',
          dueDate: expiryDate,
          source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/demande/prolonger-permis-etudes.html'
        }
      })
    }

    // Create alerts for work permit
    if (permitData.workPermitExpiry) {
      const expiryDate = new Date(permitData.workPermitExpiry)
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysUntilExpiry <= 90 && daysUntilExpiry > 0) {
        const messageFr = daysUntilExpiry <= 30 
          ? `🚨 URGENT: Votre permis de travail expire dans ${daysUntilExpiry} jours! Renouvelez IMMÉDIATEMENT pour continuer à travailler légalement.`
          : daysUntilExpiry <= 60 
          ? `🔴 Votre permis de travail expire dans ${daysUntilExpiry} jours. Commencez votre demande de renouvellement.`
          : `⚠️ Votre permis de travail expire dans ${daysUntilExpiry} jours. Planifiez votre renouvellement.`
        const messageEn = daysUntilExpiry <= 30 
          ? `🚨 URGENT: Your work permit expires in ${daysUntilExpiry} days! Renew IMMEDIATELY to continue working legally.`
          : daysUntilExpiry <= 60 
          ? `🔴 Your work permit expires in ${daysUntilExpiry} days. Start your renewal application.`
          : `⚠️ Your work permit expires in ${daysUntilExpiry} days. Plan your renewal.`

        await prisma.alert.create({
          data: {
            userId,
            type: 'WORK_PERMIT_EXPIRY',
            title: onboardingData.preferredLanguage === 'fr' ? '📅 Permis de travail à renouveler' : '📅 Work Permit Renewal',
            message: onboardingData.preferredLanguage === 'fr' ? messageFr : messageEn,
            dueDate: expiryDate
          }
        })
      }

      // Create reminder task for renewal
      const renewalTaskTitle = onboardingData.preferredLanguage === 'fr' 
        ? `Renouveler votre permis de travail (expire le ${expiryDate.toLocaleDateString('fr-CA')})`
        : `Renew your work permit (expires ${expiryDate.toLocaleDateString('en-CA')})`
      
      await prisma.task.create({
        data: {
          userId,
          title: renewalTaskTitle,
          titleEn: `Renew your work permit (expires ${expiryDate.toLocaleDateString('en-CA')})`,
          description: onboardingData.preferredLanguage === 'fr' 
            ? `📋 RÈGLES DE RENOUVELLEMENT:\n\n✅ Quand renouveler:\n• Minimum 30 jours avant l'expiration\n• Recommandé: 90 jours avant\n\n📋 Documents nécessaires:\n• Passeport valide\n• Offre d'emploi ou preuve d'admissibilité\n• Résultats d'examen médical (si requis)\n• Preuve de ressources financières\n\n💰 Frais: $155 CAD (permis ouvert) / $100 CAD (permis fermé)\n⏱️ Délai de traitement: 80 jours (moyenne en ligne)\n\n⚠️ STATUT IMPLICITE:\nSi vous appliquez avant l'expiration, vous pouvez continuer à travailler aux mêmes conditions pendant le traitement.`
            : `📋 RENEWAL RULES:\n\n✅ When to renew:\n• Minimum 30 days before expiry\n• Recommended: 90 days before\n\n📋 Required documents:\n• Valid passport\n• Job offer or proof of eligibility\n• Medical exam results (if required)\n• Proof of financial resources\n\n💰 Fee: $155 CAD (open permit) / $100 CAD (closed permit)\n⏱️ Processing time: 80 days (online average)\n\n⚠️ IMPLIED STATUS:\nIf you apply before expiry, you can continue working under the same conditions while your application is processed.`,
          descriptionEn: `📋 RENEWAL RULES:\n\n✅ When to renew:\n• Minimum 30 days before expiry\n• Recommended: 90 days before\n\n📋 Required documents:\n• Valid passport\n• Job offer or proof of eligibility\n• Medical exam results (if required)\n• Proof of financial resources\n\n💰 Fee: $155 CAD (open permit) / $100 CAD (closed permit)\n⏱️ Processing time: 80 days (online average)\n\n⚠️ IMPLIED STATUS:\nIf you apply before expiry, you can continue working under the same conditions while your application is processed.`,
          category: 'IMMIGRATION',
          priority: daysUntilExpiry <= 30 ? 'HIGH' : daysUntilExpiry <= 60 ? 'HIGH' : 'MEDIUM',
          isRequired: true,
          order: 0,
          status: 'PENDING',
          dueDate: expiryDate,
          source: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/travailler-canada/permis/pourquoi-prolonger.html'
        }
      })
    }

    // Create alerts for passport expiry (affects permit applications)
    if (permitData.passportExpiry) {
      const expiryDate = new Date(permitData.passportExpiry)
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysUntilExpiry <= 180 && daysUntilExpiry > 0) {
        const messageFr = daysUntilExpiry <= 90 
          ? `🛂 Votre passeport expire dans ${daysUntilExpiry} jours. Renouvelez-le rapidement - il est requis pour toute demande de permis!`
          : `🛂 Votre passeport expire dans ${daysUntilExpiry} jours. Planifiez son renouvellement.`
        const messageEn = daysUntilExpiry <= 90 
          ? `🛂 Your passport expires in ${daysUntilExpiry} days. Renew it soon - it's required for all permit applications!`
          : `🛂 Your passport expires in ${daysUntilExpiry} days. Plan your renewal.`

        await prisma.alert.create({
          data: {
            userId,
            type: 'PASSPORT_EXPIRY',
            title: onboardingData.preferredLanguage === 'fr' ? '🛂 Passeport à renouveler' : '🛂 Passport Renewal',
            message: onboardingData.preferredLanguage === 'fr' ? messageFr : messageEn,
            dueDate: expiryDate
          }
        })
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        dateOfBirth: user.dateOfBirth?.toISOString(),
        immigrationStatus: user.immigrationStatus,
        province: user.province,
        arrivalDate: user.arrivalDate?.toISOString(),
        professionalSector: user.professionalSector,
        preferredLanguage: user.preferredLanguage,
        familyStatus: user.familyStatus,
        countryOfOrigin: user.countryOfOrigin,
        subscriptionTier: user.subscriptionTier,
        onboardingCompleted: user.onboardingCompleted,
        studyPermitExpiry: user.studyPermitExpiry?.toISOString(),
        workPermitExpiry: user.workPermitExpiry?.toISOString(),
        passportExpiry: user.passportExpiry?.toISOString()
      }
    })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde' },
      { status: 500 }
    )
  }
}

// Get user tasks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ tasks: [], alerts: [] })
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { order: 'asc' }
    })

    const alerts = await prisma.alert.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    return NextResponse.json({
      tasks: tasks.map(t => ({
        id: t.id,
        title: t.title,
        titleEn: t.titleEn,
        description: t.description,
        descriptionEn: t.descriptionEn,
        category: t.category,
        priority: t.priority,
        status: t.status,
        dueDate: t.dueDate?.toISOString(),
        order: t.order,
        isRequired: t.isRequired,
        source: t.source
      })),
      alerts: alerts.map(a => ({
        id: a.id,
        type: a.type,
        title: a.title,
        message: a.message,
        dueDate: a.dueDate.toISOString(),
        isRead: a.isRead
      }))
    })
  } catch (error) {
    console.error('Get tasks error:', error)
    return NextResponse.json({ tasks: [], alerts: [] })
  }
}

// Update task status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskId, status } = body

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        status,
        completedAt: status === 'COMPLETED' ? new Date() : null
      }
    })

    return NextResponse.json({ success: true, task })
  } catch (error) {
    console.error('Update task error:', error)
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}
