import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth-jwt'

// GET - List all tickets (admin) or user's tickets
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    
    // If authResult is a Response, it means auth failed
    if (authResult instanceof Response) {
      return authResult
    }
    
    const user = authResult
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const userId = searchParams.get('userId')
    
    // Build filter
    const where: any = {}
    
    // Non-admin users can only see their own tickets
    if (user.subscriptionPlan !== 'ADMIN' && user.email !== 'admin@nouveaucap.com') {
      where.userId = user.id
    } else if (userId) {
      where.userId = userId
    }
    
    if (status && status !== 'ALL') {
      where.status = status
    }
    
    const tickets = await db.supportTicket.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({ tickets })
  } catch (error) {
    console.error('Get tickets error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new ticket
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    
    if (authResult instanceof Response) {
      return authResult
    }
    
    const user = authResult
    const body = await request.json()
    const { subject, message, priority } = body
    
    if (!subject || !message) {
      return NextResponse.json(
        { error: 'Subject and message are required' },
        { status: 400 }
      )
    }
    
    const ticket = await db.supportTicket.create({
      data: {
        userId: user.id,
        subject,
        message,
        priority: priority || 'NORMAL',
        status: 'OPEN',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        }
      }
    })
    
    return NextResponse.json({ ticket })
  } catch (error) {
    console.error('Create ticket error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update a ticket (admin responds or changes status)
export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    
    if (authResult instanceof Response) {
      return authResult
    }
    
    const user = authResult
    const body = await request.json()
    const { ticketId, status, response, priority } = body
    
    if (!ticketId) {
      return NextResponse.json(
        { error: 'Ticket ID is required' },
        { status: 400 }
      )
    }
    
    // Check if ticket exists
    const existingTicket = await db.supportTicket.findUnique({
      where: { id: ticketId }
    })
    
    if (!existingTicket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      )
    }
    
    // Check permissions - only admin or ticket owner can update
    const isAdmin = user.subscriptionPlan === 'ADMIN' || user.email === 'admin@nouveaucap.com'
    if (!isAdmin && existingTicket.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }
    
    // Build update data
    const updateData: any = {}
    
    if (status) {
      updateData.status = status
    }
    
    if (priority) {
      updateData.priority = priority
    }
    
    // Only admin can respond
    if (response && isAdmin) {
      updateData.response = response
      updateData.respondedAt = new Date()
      updateData.respondedBy = user.id
    }
    
    const ticket = await db.supportTicket.update({
      where: { id: ticketId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        }
      }
    })
    
    return NextResponse.json({ ticket })
  } catch (error) {
    console.error('Update ticket error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a ticket (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    
    if (authResult instanceof Response) {
      return authResult
    }
    
    const user = authResult
    const isAdmin = user.subscriptionPlan === 'ADMIN' || user.email === 'admin@nouveaucap.com'
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 403 }
      )
    }
    
    const { searchParams } = new URL(request.url)
    const ticketId = searchParams.get('id')
    
    if (!ticketId) {
      return NextResponse.json(
        { error: 'Ticket ID is required' },
        { status: 400 }
      )
    }
    
    await db.supportTicket.delete({
      where: { id: ticketId }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete ticket error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
