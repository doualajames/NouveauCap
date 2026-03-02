import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Save job application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    if (action === 'save-job-application') {
      const { userId, company, position, status, notes } = data
      
      const application = await prisma.jobApplication.create({
        data: {
          userId,
          company,
          position,
          status: status || 'APPLIED',
          notes,
          appliedDate: new Date()
        }
      })
      
      return NextResponse.json({ success: true, application })
    }

    if (action === 'update-job-application') {
      const { applicationId, status, notes } = data
      
      const application = await prisma.jobApplication.update({
        where: { id: applicationId },
        data: { status, notes, updatedAt: new Date() }
      })
      
      return NextResponse.json({ success: true, application })
    }

    if (action === 'save-document') {
      const { userId, name, type, content, aiOptimized } = data
      
      const document = await prisma.document.create({
        data: {
          userId,
          name,
          type,
          content,
          aiOptimized: aiOptimized || false
        }
      })
      
      return NextResponse.json({ success: true, document })
    }

    if (action === 'update-profile') {
      const { 
        userId, name, phone, dateOfBirth, immigrationStatus, province, postalCode, arrivalDate,
        studyPermitExpiry, workPermitExpiry, passportExpiry, countryOfOrigin,
        professionalSector, educationLevel, yearsExperience, englishLevel, frenchLevel,
        familyStatus, numberOfChildren, preferredLanguage 
      } = data
      
      const updateData: any = {}
      if (name !== undefined) updateData.name = name
      if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null
      if (immigrationStatus !== undefined) updateData.immigrationStatus = immigrationStatus
      if (province !== undefined) updateData.province = province
      if (postalCode !== undefined) updateData.postalCode = postalCode
      if (arrivalDate !== undefined) updateData.arrivalDate = arrivalDate ? new Date(arrivalDate) : null
      if (studyPermitExpiry !== undefined) updateData.studyPermitExpiry = studyPermitExpiry ? new Date(studyPermitExpiry) : null
      if (workPermitExpiry !== undefined) updateData.workPermitExpiry = workPermitExpiry ? new Date(workPermitExpiry) : null
      if (passportExpiry !== undefined) updateData.passportExpiry = passportExpiry ? new Date(passportExpiry) : null
      if (countryOfOrigin !== undefined) updateData.countryOfOrigin = countryOfOrigin
      if (professionalSector !== undefined) updateData.professionalSector = professionalSector
      if (preferredLanguage !== undefined) updateData.preferredLanguage = preferredLanguage
      if (familyStatus !== undefined) updateData.familyStatus = familyStatus
      
      const user = await prisma.user.update({
        where: { id: userId },
        data: updateData
      })
      
      return NextResponse.json({ 
        success: true, 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth?.toISOString(),
          immigrationStatus: user.immigrationStatus,
          province: user.province,
          postalCode: user.postalCode,
          arrivalDate: user.arrivalDate?.toISOString(),
          studyPermitExpiry: user.studyPermitExpiry?.toISOString(),
          workPermitExpiry: user.workPermitExpiry?.toISOString(),
          passportExpiry: user.passportExpiry?.toISOString(),
          countryOfOrigin: user.countryOfOrigin,
          professionalSector: user.professionalSector,
          preferredLanguage: user.preferredLanguage,
          familyStatus: user.familyStatus,
          subscriptionTier: user.subscriptionTier
        }
      })
    }

    return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// Get job applications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const action = searchParams.get('action')

    if (action === 'get-job-applications' && userId) {
      const applications = await prisma.jobApplication.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })
      
      return NextResponse.json({ applications })
    }

    if (action === 'get-documents' && userId) {
      const documents = await prisma.document.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })
      
      return NextResponse.json({ documents })
    }

    if (action === 'get-profile' && userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })
      
      if (!user) {
        return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
      }
      
      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          dateOfBirth: user.dateOfBirth?.toISOString(),
          immigrationStatus: user.immigrationStatus,
          province: user.province,
          postalCode: user.postalCode,
          arrivalDate: user.arrivalDate?.toISOString(),
          professionalSector: user.professionalSector,
          preferredLanguage: user.preferredLanguage,
          familyStatus: user.familyStatus,
          countryOfOrigin: user.countryOfOrigin,
          studyPermitExpiry: user.studyPermitExpiry?.toISOString(),
          workPermitExpiry: user.workPermitExpiry?.toISOString(),
          passportExpiry: user.passportExpiry?.toISOString(),
          subscriptionTier: user.subscriptionTier,
          onboardingCompleted: user.onboardingCompleted
        }
      })
    }

    if (action === 'get-events') {
      const events = await prisma.event.findMany({
        where: {
          date: { gte: new Date() }
        },
        orderBy: { date: 'asc' },
        take: 10
      })
      
      return NextResponse.json({ events })
    }

    if (action === 'get-banks') {
      const banks = await prisma.bankOffer.findMany({
        where: { isActive: true }
      })
      
      return NextResponse.json({ banks })
    }

    if (action === 'get-province-info') {
      const provinceCode = searchParams.get('province')
      
      if (provinceCode) {
        const info = await prisma.provinceInfo.findUnique({
          where: { provinceCode }
        })
        
        return NextResponse.json({ info })
      }
      
      const allProvinces = await prisma.provinceInfo.findMany()
      return NextResponse.json({ provinces: allProvinces })
    }

    return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// Delete job application
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const applicationId = searchParams.get('applicationId')
    
    if (applicationId) {
      await prisma.jobApplication.delete({
        where: { id: applicationId }
      })
      
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: 'ID manquant' }, { status: 400 })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
