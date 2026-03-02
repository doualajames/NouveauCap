import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all tasks for user
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    const where: Record<string, unknown> = { userId }
    if (status) where.status = status
    if (category) where.category = category

    const tasks = await db.task.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('Get tasks error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// CREATE new task
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    const task = await db.task.create({
      data: {
        userId,
        title: body.title,
        titleEn: body.titleEn,
        description: body.description,
        descriptionEn: body.descriptionEn,
        category: body.category,
        priority: body.priority || 'MEDIUM',
        status: body.status || 'PENDING',
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        province: body.province,
        immigrationStatus: body.immigrationStatus,
        estimatedDays: body.estimatedDays,
        resourceUrl: body.resourceUrl,
      },
    })

    return NextResponse.json({ task })
  } catch (error) {
    console.error('Create task error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
