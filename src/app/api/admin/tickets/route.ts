import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ tickets: [] })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Support tickets coming soon', ticket: null })
}
