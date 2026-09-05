import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Événements de funnel autorisés (allowlist stricte)
const EVENTS = ['page_view', 'tool_used', 'lead_captured', 'survey_submitted', 'signup']

// POST /api/track — événement first-party, fire-and-forget. Pas de PII.
export async function POST(request: NextRequest) {
  try {
    const { name, path, source, sessionId } = await request.json()
    if (!EVENTS.includes(name) || typeof sessionId !== 'string' || sessionId.length > 64) {
      return new NextResponse(null, { status: 204 }) // on ne casse jamais l'UX pour de la mesure
    }
    await db.funnelEvent.create({
      data: {
        name,
        path: typeof path === 'string' ? path.slice(0, 200) : null,
        source: typeof source === 'string' ? source.slice(0, 60) : null,
        sessionId,
      },
    })
  } catch {
    // silencieux : la mesure ne doit jamais impacter l'utilisateur
  }
  return new NextResponse(null, { status: 204 })
}
