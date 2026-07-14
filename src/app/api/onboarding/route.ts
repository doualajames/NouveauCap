import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAuth } from '@/lib/auth-jwt'

const prisma = new PrismaClient()

import { provinceSpecificTasks, taskTemplates } from '@/lib/onboarding-templates'

// Save onboarding data
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await requireAuth(request)
    
    if (authResult instanceof Response) {
      return authResult
    }
    
    const user = authResult
    const body = await request.json()
    const onboardingData = body

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
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
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

    // Templates depuis la base (administrables) — fallback sur le corpus versionné si table vide
    let allTasks: any[] = await prisma.taskTemplate.findMany({
      where: {
        active: true,
        status: onboardingData.immigrationStatus,
        OR: [{ province: null }, { province: onboardingData.province }],
      },
      orderBy: { order: 'asc' },
    })
    if (allTasks.length === 0) {
      const tasks = taskTemplates[onboardingData.immigrationStatus as keyof typeof taskTemplates] || []
      const provinceTasks = provinceSpecificTasks[onboardingData.province]?.[onboardingData.immigrationStatus as keyof typeof provinceSpecificTasks[string]] || []
      allTasks = [...tasks, ...provinceTasks]
    }
    
    // Create tasks for the user
    for (const task of allTasks) {
      await prisma.task.create({
        data: {
          userId: user.id,
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
            userId: user.id,
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
          userId: user.id,
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
            userId: user.id,
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
          userId: user.id,
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
            userId: user.id,
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
