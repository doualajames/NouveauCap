// Intelligent Alerts System for NouveauCap
// Deadline tracking and proactive notifications

export type AlertType = 
  | 'permit_expiry' 
  | 'passport_expiry' 
  | 'tax_deadline' 
  | 'health_coverage'
  | 'citizenship_eligibility'
  | 'pr_card_renewal'
  | 'express_entry_draw'
  | 'pnp_draw'
  | 'driver_license'
  | 'custom'

export type AlertPriority = 'critical' | 'high' | 'medium' | 'low' | 'info'

export interface Alert {
  id: string
  type: AlertType
  priority: AlertPriority
  title: string
  titleEn: string
  message: string
  messageEn: string
  dueDate?: Date
  daysRemaining?: number
  actionRequired: boolean
  actionUrl?: string
  actionLabel?: string
  actionLabelEn?: string
  category: 'immigration' | 'finance' | 'health' | 'employment' | 'housing' | 'general'
  createdAt: Date
  dismissed?: boolean
}

// Alert rules configuration
export const alertRules = {
  study_permit: {
    warningDays: [90, 60, 30, 14, 7],
    actions: {
      fr: 'Renouveler votre permis d\'études',
      en: 'Renew your study permit',
    },
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/extend-study-permit.html',
    category: 'immigration',
  },
  work_permit: {
    warningDays: [90, 60, 30, 14, 7],
    actions: {
      fr: 'Renouveler votre permis de travail',
      en: 'Renew your work permit',
    },
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/extend-permit.html',
    category: 'immigration',
  },
  passport: {
    warningDays: [365, 180, 90, 30],
    actions: {
      fr: 'Renouveler votre passeport',
      en: 'Renew your passport',
    },
    url: '', // Country-specific
    category: 'immigration',
  },
  pr_card: {
    warningDays: [180, 90, 30],
    actions: {
      fr: 'Renouveler votre carte RP',
      en: 'Renew your PR card',
    },
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5445.html',
    category: 'immigration',
  },
  tax_return: {
    warningDays: [60, 30, 14, 7, 1],
    actions: {
      fr: 'Déposer votre déclaration d\'impôts',
      en: 'File your tax return',
    },
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/tax-return-where-send.html',
    category: 'finance',
  },
  health_coverage: {
    warningDays: [30, 14, 7],
    actions: {
      fr: 'Demander votre carte d\'assurance-maladie',
      en: 'Apply for your health card',
    },
    url: '', // Province-specific
    category: 'health',
  },
  citizenship: {
    warningDays: [1095], // 3 years = 1095 days
    actions: {
      fr: 'Vérifier votre admissibilité à la citoyenneté',
      en: 'Check your citizenship eligibility',
    },
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5445.html',
    category: 'immigration',
  },
}

// Calculate days until date
export function daysUntil(targetDate: Date): number {
  const now = new Date()
  const target = new Date(targetDate)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// Get priority based on days remaining
export function getPriorityFromDays(days: number): AlertPriority {
  if (days < 0) return 'critical'
  if (days <= 7) return 'critical'
  if (days <= 30) return 'high'
  if (days <= 60) return 'medium'
  if (days <= 90) return 'low'
  return 'info'
}

// Generate alerts from user profile
export function generateAlertsFromProfile(profile: {
  immigrationStatus: string
  studyPermitExpiry?: Date
  workPermitExpiry?: Date
  passportExpiry?: Date
  prCardExpiry?: Date
  arrivalDate?: Date
  province?: string
  healthCardApplied?: boolean
}): Alert[] {
  const alerts: Alert[] = []
  const now = new Date()
  
  // Study permit expiry
  if (profile.studyPermitExpiry) {
    const days = daysUntil(profile.studyPermitExpiry)
    if (days <= 90 || days < 0) {
      alerts.push({
        id: `study_permit_${profile.studyPermitExpiry.getTime()}`,
        type: 'permit_expiry',
        priority: getPriorityFromDays(days),
        title: 'Permis d\'études expire bientôt',
        titleEn: 'Study permit expiring soon',
        message: days < 0 
          ? `Votre permis d'études a expiré il y a ${Math.abs(days)} jours. Renouvelez immédiatement.`
          : `Votre permis d'études expire dans ${days} jours. Renouvelez-le au moins 90 jours avant l'expiration.`,
        messageEn: days < 0
          ? `Your study permit expired ${Math.abs(days)} days ago. Renew immediately.`
          : `Your study permit expires in ${days} days. Renew at least 90 days before expiry.`,
        dueDate: profile.studyPermitExpiry,
        daysRemaining: days,
        actionRequired: true,
        actionUrl: alertRules.study_permit.url,
        actionLabel: alertRules.study_permit.actions.fr,
        actionLabelEn: alertRules.study_permit.actions.en,
        category: 'immigration',
        createdAt: now,
      })
    }
  }
  
  // Work permit expiry
  if (profile.workPermitExpiry) {
    const days = daysUntil(profile.workPermitExpiry)
    if (days <= 90 || days < 0) {
      alerts.push({
        id: `work_permit_${profile.workPermitExpiry.getTime()}`,
        type: 'permit_expiry',
        priority: getPriorityFromDays(days),
        title: 'Permis de travail expire bientôt',
        titleEn: 'Work permit expiring soon',
        message: days < 0
          ? `Votre permis de travail a expiré il y a ${Math.abs(days)} jours. Vous ne pouvez plus travailler légalement.`
          : `Votre permis de travail expire dans ${days} jours. Renouvelez-le au moins 90 jours avant l'expiration.`,
        messageEn: days < 0
          ? `Your work permit expired ${Math.abs(days)} days ago. You can no longer work legally.`
          : `Your work permit expires in ${days} days. Renew at least 90 days before expiry.`,
        dueDate: profile.workPermitExpiry,
        daysRemaining: days,
        actionRequired: true,
        actionUrl: alertRules.work_permit.url,
        actionLabel: alertRules.work_permit.actions.fr,
        actionLabelEn: alertRules.work_permit.actions.en,
        category: 'immigration',
        createdAt: now,
      })
    }
  }
  
  // Passport expiry
  if (profile.passportExpiry) {
    const days = daysUntil(profile.passportExpiry)
    if (days <= 365 || days < 0) {
      alerts.push({
        id: `passport_${profile.passportExpiry.getTime()}`,
        type: 'passport_expiry',
        priority: days <= 180 ? getPriorityFromDays(days) : 'low',
        title: 'Passeport expire bientôt',
        titleEn: 'Passport expiring soon',
        message: days < 0
          ? `Votre passeport a expiré. Renouvelez-le auprès de votre ambassade.`
          : `Votre passeport expire dans ${days} jours. Renouvelez-le avant qu'il n'expire.`,
        messageEn: days < 0
          ? `Your passport has expired. Renew it with your embassy.`
          : `Your passport expires in ${days} days. Renew before it expires.`,
        dueDate: profile.passportExpiry,
        daysRemaining: days,
        actionRequired: true,
        actionLabel: alertRules.passport.actions.fr,
        actionLabelEn: alertRules.passport.actions.en,
        category: 'immigration',
        createdAt: now,
      })
    }
  }
  
  // PR card renewal (for permanent residents)
  if (profile.immigrationStatus === 'PERMANENT_RESIDENT' && profile.prCardExpiry) {
    const days = daysUntil(profile.prCardExpiry)
    if (days <= 180 || days < 0) {
      alerts.push({
        id: `pr_card_${profile.prCardExpiry.getTime()}`,
        type: 'pr_card_renewal',
        priority: getPriorityFromDays(days),
        title: 'Carte RP à renouveler',
        titleEn: 'PR card renewal needed',
        message: days < 0
          ? `Votre carte de résident permanent a expiré. Renouvelez-la immédiatement.`
          : `Votre carte RP expire dans ${days} jours. Renouvelez-la 6 mois avant l'expiration.`,
        messageEn: days < 0
          ? `Your PR card has expired. Renew immediately.`
          : `Your PR card expires in ${days} days. Renew 6 months before expiry.`,
        dueDate: profile.prCardExpiry,
        daysRemaining: days,
        actionRequired: true,
        actionUrl: alertRules.pr_card.url,
        actionLabel: alertRules.pr_card.actions.fr,
        actionLabelEn: alertRules.pr_card.actions.en,
        category: 'immigration',
        createdAt: now,
      })
    }
  }
  
  // Citizenship eligibility (for PRs)
  if (profile.immigrationStatus === 'PERMANENT_RESIDENT' && profile.arrivalDate) {
    const days = daysUntil(new Date(profile.arrivalDate.getTime() + 1095 * 24 * 60 * 60 * 1000))
    if (days <= 0) {
      alerts.push({
        id: `citizenship_eligible`,
        type: 'citizenship_eligibility',
        priority: 'info',
        title: 'Admissible à la citoyenneté!',
        titleEn: 'Eligible for citizenship!',
        message: `Vous avez résidé au Canada pendant 3 ans. Vous pouvez maintenant présenter une demande de citoyenneté canadienne.`,
        messageEn: `You have lived in Canada for 3 years. You can now apply for Canadian citizenship.`,
        daysRemaining: days,
        actionRequired: false,
        actionUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5445.html',
        actionLabel: 'En savoir plus',
        actionLabelEn: 'Learn more',
        category: 'immigration',
        createdAt: now,
      })
    } else if (days <= 180) {
      alerts.push({
        id: `citizenship_soon`,
        type: 'citizenship_eligibility',
        priority: 'low',
        title: 'Citoyenneté bientôt admissible',
        titleEn: 'Citizenship eligibility soon',
        message: `Vous serez admissible à la citoyenneté dans ${days} jours. Préparez votre demande.`,
        messageEn: `You will be eligible for citizenship in ${days} days. Prepare your application.`,
        daysRemaining: days,
        actionRequired: false,
        category: 'immigration',
        createdAt: now,
      })
    }
  }
  
  // Health coverage reminder
  if (profile.province && !profile.healthCardApplied && profile.arrivalDate) {
    const arrivalDays = daysUntil(profile.arrivalDate) * -1
    if (arrivalDays >= 0 && arrivalDays <= 30) {
      alerts.push({
        id: `health_card_reminder`,
        type: 'health_coverage',
        priority: 'medium',
        title: 'Demandez votre carte d\'assurance-maladie',
        titleEn: 'Apply for your health card',
        message: `Demandez votre carte d'assurance-maladie provinciale dès maintenant pour éviter les délais.`,
        messageEn: `Apply for your provincial health card now to avoid delays.`,
        actionRequired: true,
        actionLabel: 'En savoir plus',
        actionLabelEn: 'Learn more',
        category: 'health',
        createdAt: now,
      })
    }
  }
  
  // Sort by priority and days remaining
  return alerts.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return (a.daysRemaining || 999) - (b.daysRemaining || 999)
  })
}

// Seasonal/time-based alerts
export function getSeasonalAlerts(language: 'fr' | 'en'): Alert[] {
  const now = new Date()
  const month = now.getMonth()
  const alerts: Alert[] = []
  
  // Tax season (January - April)
  if (month >= 0 && month <= 3) {
    const deadline = new Date(now.getFullYear(), 3, 30) // April 30
    const days = daysUntil(deadline)
    
    alerts.push({
      id: 'tax_season',
      type: 'tax_deadline',
      priority: month >= 2 ? 'high' : 'medium',
      title: language === 'fr' ? 'Saison des impôts' : 'Tax Season',
      message: language === 'fr' 
        ? `La date limite de déclaration est le 30 avril. ${days} jours restants.`
        : `Tax filing deadline is April 30. ${days} days remaining.`,
      dueDate: deadline,
      daysRemaining: days,
      actionRequired: true,
      actionUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return.html',
      actionLabel: language === 'fr' ? 'Commencer' : 'Get Started',
      actionLabelEn: 'Get Started',
      category: 'finance',
      createdAt: now,
    })
  }
  
  // Holiday travel reminder (November-December)
  if (month >= 10) {
    alerts.push({
      id: 'holiday_travel',
      type: 'custom',
      priority: 'low',
      title: language === 'fr' ? 'Voyages des fêtes' : 'Holiday Travel',
      message: language === 'fr'
        ? 'Prévoyez voyager? Vérifiez la validité de vos documents avant de partir.'
        : 'Planning to travel? Check your document validity before you go.',
      actionRequired: false,
      category: 'general',
      createdAt: now,
    })
  }
  
  return alerts
}

// Get alert icon
export function getAlertIcon(type: AlertType): string {
  const icons: Record<AlertType, string> = {
    permit_expiry: '📋',
    passport_expiry: '🛂',
    tax_deadline: '💰',
    health_coverage: '🏥',
    citizenship_eligibility: '🇨🇦',
    pr_card_renewal: '💳',
    express_entry_draw: '🎯',
    pnp_draw: '🗺️',
    driver_license: '🚗',
    custom: '📌',
  }
  return icons[type] || '📌'
}

// Get alert color
export function getAlertColor(priority: AlertPriority): string {
  const colors: Record<AlertPriority, string> = {
    critical: 'red',
    high: 'orange',
    medium: 'yellow',
    low: 'blue',
    info: 'gray',
  }
  return colors[priority] || 'gray'
}
