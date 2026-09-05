'use client'

import { useState } from 'react'
import { track } from '@/lib/track'

export function LeadForm({
  source,
  buttonLabel = 'Recevoir le guide gratuit',
  placeholder = 'votre@courriel.com',
  successMessage = 'Merci ! Vous êtes sur la liste.',
}: {
  source: string
  buttonLabel?: string
  placeholder?: string
  successMessage?: string
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, locale: 'fr' }),
      })
      if (res.ok) track('lead_captured', { source })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="rounded-xl bg-muted border border-border px-4 py-3 text-sm font-medium text-foreground">
        ✅ {successMessage}
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-foreground/30"
        aria-label="Adresse courriel"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-xl bg-[hsl(var(--foreground))] px-6 py-3 text-sm font-semibold text-[hsl(var(--background))] hover:opacity-90 disabled:opacity-60 transition-colors"
      >
        {status === 'loading' ? 'Envoi…' : buttonLabel}
      </button>
      {status === 'error' && (
        <p className="text-sm text-destructive sm:self-center">Erreur — réessayez.</p>
      )}
    </form>
  )
}
