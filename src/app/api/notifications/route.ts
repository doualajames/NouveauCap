import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth-jwt'

// GET /api/notifications — list user's in-app notifications (alerts)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const user = authResult
    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unread') === 'true'
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)

    const where: any = { userId: user.id }
    if (unreadOnly) where.isRead = false

    const [notifications, unreadCount] = await Promise.all([
      db.alert.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
      }),
      db.alert.count({ where: { userId: user.id, isRead: false } }),
    ])

    return NextResponse.json({ notifications, unreadCount })
  } catch (error) {
    console.error('Notifications GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/notifications — mark notifications as read
export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const user = authResult
    const body = await request.json()
    const { notificationIds, markAllRead } = body

    if (markAllRead) {
      await db.alert.updateMany({
        where: { userId: user.id, isRead: false },
        data: { isRead: true },
      })
      return NextResponse.json({ success: true })
    }

    if (notificationIds?.length) {
      await db.alert.updateMany({
        where: {
          id: { in: notificationIds },
          userId: user.id,
        },
        data: { isRead: true },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Notifications PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/notifications — create an in-app notification (internal use)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const body = await request.json()
    const { userId, type, title, message, dueDate } = body

    if (!userId || !type || !title || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const notification = await db.alert.create({
      data: {
        userId,
        type,
        title,
        message,
        dueDate: dueDate ? new Date(dueDate) : new Date(),
        isRead: false,
        isEmailSent: false,
      },
    })

    return NextResponse.json({ notification }, { status: 201 })
  } catch (error) {
    console.error('Notifications POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
