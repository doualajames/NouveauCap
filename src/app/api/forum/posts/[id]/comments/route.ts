import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth-jwt'

// GET /api/forum/posts/:id/comments
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const { id: postId } = await params

    const comments = await db.forumComment.findMany({
      where: { postId },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({ comments })
  } catch (error) {
    console.error('Forum comments GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/forum/posts/:id/comments  body: { content }
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) return authResult

    const user = authResult
    const { id: postId } = await params
    const body = await request.json()
    const { content } = body

    if (!content?.trim()) {
      return NextResponse.json({ error: 'content is required' }, { status: 400 })
    }

    // Ensure post exists
    const post = await db.forumPost.findUnique({ where: { id: postId }, select: { id: true } })
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    const comment = await db.forumComment.create({
      data: {
        postId,
        authorId: user.id,
        content: content.trim(),
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
      },
    })

    return NextResponse.json({ comment }, { status: 201 })
  } catch (error) {
    console.error('Forum comment CREATE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
