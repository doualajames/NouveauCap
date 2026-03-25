import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth-jwt'

// B2B Partnership API — manages institutional partners (banks, schools, recruiters, etc.)
// Partners are stored as BankOffer model (reused for all partner types via accountType field)

// GET /api/partners — list all active partners
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // BANK, SCHOOL, RECRUITER, ASSOCIATION, INSURANCE
    const province = searchParams.get('province')

    const where: any = { isActive: true }
    if (type) where.accountType = type

    // BankOffer model is reused for all partner types
    const partners = await db.bankOffer.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    // Parse JSON features field
    const parsed = partners.map((p) => ({
      ...p,
      features: p.features ? JSON.parse(p.features) : [],
    }))

    return NextResponse.json({ partners: parsed })
  } catch (error) {
    console.error('Partners GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/partners — create a new partner (admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const user = authResult
    const isAdmin = user.email === 'admin@nouveaucap.com'
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin only' }, { status: 403 })
    }

    const body = await request.json()
    const {
      bankName, bankNameEn, accountType, monthlyFee,
      firstYearFree, newcomerOffer, newcomerOfferEn,
      features, link,
    } = body

    if (!bankName || !accountType) {
      return NextResponse.json({ error: 'name and type are required' }, { status: 400 })
    }

    const partner = await db.bankOffer.create({
      data: {
        bankName,
        bankNameEn: bankNameEn || bankName,
        accountType,
        monthlyFee: monthlyFee || 0,
        firstYearFree: firstYearFree || false,
        newcomerOffer: newcomerOffer || null,
        newcomerOfferEn: newcomerOfferEn || null,
        features: features ? JSON.stringify(features) : null,
        link: link || null,
        isActive: true,
      },
    })

    return NextResponse.json({ partner }, { status: 201 })
  } catch (error) {
    console.error('Partners POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/partners — update a partner (admin only)
export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const user = authResult
    const isAdmin = user.email === 'admin@nouveaucap.com'
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin only' }, { status: 403 })
    }

    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Partner ID required' }, { status: 400 })
    }

    if (updateData.features && typeof updateData.features !== 'string') {
      updateData.features = JSON.stringify(updateData.features)
    }

    const partner = await db.bankOffer.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ partner })
  } catch (error) {
    console.error('Partners PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/partners?id= — deactivate a partner (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const user = authResult
    const isAdmin = user.email === 'admin@nouveaucap.com'
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin only' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    await db.bankOffer.update({ where: { id }, data: { isActive: false } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Partners DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
