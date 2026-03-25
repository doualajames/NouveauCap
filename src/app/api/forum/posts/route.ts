import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth-jwt'

// GET /api/forum/posts?category=&province=&limit=20&offset=0
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const province = searchParams.get('province')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}
    if (category && category !== 'ALL') where.category = category
    if (province) where.province = province

    const [posts, total] = await Promise.all([
      db.forumPost.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { comments: true } },
        },
        orderBy: [{ pinned: 'desc' }, { createdAt: 'desc' }],
        take: limit,
        skip: offset,
      }),
      db.forumPost.count({ where }),
    ])

    return NextResponse.json({ posts, total })
  } catch (error) {
    console.error('Forum posts GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/forum/posts  body: { title, content, category, province? }
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const user = authResult
    const body = await request.json()
    const { title, content, category, province } = body

    if (!title?.trim() || !content?.trim() || !category) {
      return NextResponse.json(
        { error: 'title, content and category are required' },
        { status: 400 },
      )
    }

    const post = await db.forumPost.create({
      data: {
        authorId: user.id,
        title: title.trim(),
        content: content.trim(),
        category,
        province: province || null,
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        _count: { select: { comments: true } },
      },
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error('Forum post CREATE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
