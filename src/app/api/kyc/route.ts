import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth-jwt'

// KYC / Document Verification API
// Manages identity document uploads and verification status
// Uses the existing Document model with type-based filtering

type KycStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED'

interface KycMeta {
  kycStatus: KycStatus
  verifiedAt?: string
  rejectionReason?: string
  documentNumber?: string
  expiryDate?: string
}

// GET /api/kyc — get user's KYC documents and verification status
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const user = authResult

    const kycDocuments = await db.document.findMany({
      where: {
        userId: user.id,
        type: { in: ['PASSPORT', 'PERMIT', 'ID_CARD', 'PROOF_OF_ADDRESS', 'STUDY_PERMIT', 'WORK_PERMIT'] },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Parse content field as KYC metadata
    const documents = kycDocuments.map((doc) => {
      let meta: KycMeta = { kycStatus: 'PENDING' }
      try {
        if (doc.content) meta = JSON.parse(doc.content)
      } catch { /* not JSON, raw content */ }
      return { ...doc, kycMeta: meta }
    })

    // Overall KYC status
    const hasPassport = documents.some(
      (d) => d.type === 'PASSPORT' && d.kycMeta.kycStatus === 'VERIFIED',
    )
    const hasPermit = documents.some(
      (d) => ['STUDY_PERMIT', 'WORK_PERMIT', 'PERMIT'].includes(d.type) && d.kycMeta.kycStatus === 'VERIFIED',
    )

    const overallStatus: KycStatus = hasPassport && hasPermit
      ? 'VERIFIED'
      : documents.some((d) => d.kycMeta.kycStatus === 'PENDING')
        ? 'PENDING'
        : 'PENDING'

    return NextResponse.json({
      overallStatus,
      documents,
      requiredDocuments: ['PASSPORT', 'STUDY_PERMIT', 'WORK_PERMIT', 'PROOF_OF_ADDRESS'],
    })
  } catch (error) {
    console.error('KYC GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/kyc — submit a document for KYC verification
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const user = authResult
    const body = await request.json()
    const { type, documentNumber, expiryDate, fileUrl } = body

    const validTypes = ['PASSPORT', 'PERMIT', 'ID_CARD', 'PROOF_OF_ADDRESS', 'STUDY_PERMIT', 'WORK_PERMIT']
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json({ error: `type must be one of: ${validTypes.join(', ')}` }, { status: 400 })
    }

    const kycMeta: KycMeta = {
      kycStatus: 'PENDING',
      documentNumber: documentNumber || undefined,
      expiryDate: expiryDate || undefined,
    }

    const document = await db.document.create({
      data: {
        userId: user.id,
        name: `KYC - ${type}`,
        type,
        content: JSON.stringify({ ...kycMeta, fileUrl }),
        aiOptimized: false,
      },
    })

    return NextResponse.json({
      document: { ...document, kycMeta },
      message: 'Document submitted for verification. You will be notified once reviewed.',
    }, { status: 201 })
  } catch (error) {
    console.error('KYC POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/kyc — admin: approve or reject a KYC document
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
    const { documentId, status, rejectionReason } = body

    if (!documentId || !['VERIFIED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'documentId and valid status required' }, { status: 400 })
    }

    const doc = await db.document.findUnique({ where: { id: documentId } })
    if (!doc) return NextResponse.json({ error: 'Document not found' }, { status: 404 })

    let existingMeta: any = {}
    try { if (doc.content) existingMeta = JSON.parse(doc.content) } catch {}

    const updatedMeta = {
      ...existingMeta,
      kycStatus: status,
      verifiedAt: status === 'VERIFIED' ? new Date().toISOString() : undefined,
      rejectionReason: status === 'REJECTED' ? rejectionReason : undefined,
    }

    const updated = await db.document.update({
      where: { id: documentId },
      data: { content: JSON.stringify(updatedMeta) },
    })

    // Create notification for the document owner
    await db.alert.create({
      data: {
        userId: doc.userId,
        type: 'KYC_UPDATE',
        title: status === 'VERIFIED' ? 'Document verified' : 'Document rejected',
        message: status === 'VERIFIED'
          ? `Your ${doc.type} has been verified successfully.`
          : `Your ${doc.type} was rejected: ${rejectionReason || 'Please resubmit.'}`,
        dueDate: new Date(),
        isRead: false,
        isEmailSent: false,
      },
    })

    return NextResponse.json({ document: updated })
  } catch (error) {
    console.error('KYC PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
