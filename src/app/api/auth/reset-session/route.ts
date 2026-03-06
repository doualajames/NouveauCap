import { NextResponse } from 'next/server'

// Reset session - clears all auth state
export async function POST() {
  const response = NextResponse.json({ 
    success: true, 
    message: 'Session cleared. Please refresh the page.' 
  })
  
  // Clear session cookie
  response.cookies.set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  })
  
  return response
}
