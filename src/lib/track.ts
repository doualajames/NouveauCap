'use client'

// Tracker de funnel first-party. Identifiant de session anonyme (localStorage),
// aucun cookie, aucune PII. Envoi fire-and-forget via sendBeacon (fallback fetch).

const SID_KEY = 'nc_sid'

function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr'
  try {
    let sid = localStorage.getItem(SID_KEY)
    if (!sid) {
      sid = (crypto.randomUUID?.() || Math.random().toString(36).slice(2) + Date.now().toString(36))
      localStorage.setItem(SID_KEY, sid)
    }
    return sid
  } catch {
    return 'anon'
  }
}

export type FunnelEventName =
  | 'page_view'
  | 'tool_used'
  | 'lead_captured'
  | 'survey_submitted'
  | 'signup'

export function track(name: FunnelEventName, opts?: { path?: string; source?: string }): void {
  if (typeof window === 'undefined') return
  const payload = JSON.stringify({
    name,
    path: opts?.path ?? window.location.pathname,
    source: opts?.source,
    sessionId: getSessionId(),
  })
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }))
      return
    }
  } catch {
    // fallback ci-dessous
  }
  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {})
  } catch {
    // silencieux
  }
}
