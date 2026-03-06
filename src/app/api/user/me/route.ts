import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth-jwt'

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    
    if (authResult instanceof Response) {
      return authResult
    }
    
    const user = authResult
    
    const fullUser = await db.user.findUnique({
      where: { id: user.id },
      include: {
        profile: true,
        onboarding: true,
        subscription: true,
        tasks: {
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
      },
    })

    if (!fullUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user: {
        id: fullUser.id,
        email: fullUser.email,
        name: fullUser.name,
        avatar: fullUser.avatar,
      },
      profile: fullUser.profile,
      onboarding: fullUser.onboarding,
      subscription: fullUser.subscription,
      tasks: fullUser.tasks,
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
