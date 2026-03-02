import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // In a real app with sessions, you'd destroy the session here
    // For this client-side auth approach, the client just clears its state
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
