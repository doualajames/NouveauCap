import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth-jwt'

// GET /api/forum/posts/:id — returns post + comments, increments views
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const { id } = await params

    const post = await db.forumPost.update({
      where: { id },
      data: { views: { increment: 1 } },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        comments: {
          include: {
            author: { select: { id: true, name: true, avatar: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
        _count: { select: { comments: true } },
      },
    })

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Forum post GET error:', error)
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
}

// POST /api/forum/posts/:id  body: { action: 'like' }
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const { id } = await params
    const body = await request.json()

    if (body.action === 'like') {
      const post = await db.forumPost.update({
        where: { id },
        data: { likes: { increment: 1 } },
        select: { id: true, likes: true },
      })
      return NextResponse.json({ post })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (error) {
    console.error('Forum post POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/forum/posts/:id — only author can delete
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const user = authResult
    const { id } = await params

    const post = await db.forumPost.findUnique({ where: { id }, select: { authorId: true } })
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    const isAdmin = user.email === 'admin@nouveaucap.com'
    if (post.authorId !== user.id && !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    await db.forumPost.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Forum post DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
