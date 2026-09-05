'use client'

import { useState } from 'react'
import { track } from '@/lib/track'

type Format = 'one-shot' | 'monthly' | 'freemium'
type Who = 'self' | 'relative' | 'employer'

const FORMATS: { v: Format; label: string; hint: string }[] = [
  { v: 'one-shot', label: 'Paiement unique', hint: 'Un seul paiement à vie (ex. 99 $)' },
  { v: 'monthly', label: 'Abonnement mensuel', hint: 'Petit montant chaque mois (ex. 9 $/mois)' },
  { v: 'freemium', label: 'Gratuit + option payante', hint: 'Base gratuite, on paie pour le plus' },
]

const WHO: { v: Who; label: string }[] = [
  { v: 'self', label: 'Moi-même' },
  { v: 'relative', label: 'Un proche déjà au Canada' },
  { v: 'employer', label: 'Un employeur / organisme' },
]

export function PriceSurvey() {
  const [format, setFormat] = useState<Format | ''>('')
  const [maxPrice, setMaxPrice] = useState('')
  const [whoPays, setWhoPays] = useState<Who | ''>('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!format) { setErr('Choisissez un format.'); return }
    setErr('')
    setStatus('loading')
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, format, maxPrice, whoPays, comment }),
      })
      if (res.ok) track('survey_submitted', { source: 'temoignages' })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-xl border border-foreground/80 p-6">
        <p className="text-lg font-bold">Merci, c&apos;est noté.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Vos réponses nous aident à fixer un prix juste. On vous tient au courant du lancement.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-border p-6 space-y-6">
      <div>
        <p className="font-semibold">Quel format vous conviendrait le mieux ?</p>
        <div className="mt-3 space-y-2">
          {FORMATS.map(f => (
            <label key={f.v} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${format === f.v ? 'border-foreground' : 'border-border'}`}>
              <input type="radio" name="format" className="mt-1" checked={format === f.v} onChange={() => setFormat(f.v)} />
              <span>
                <span className="block font-medium">{f.label}</span>
                <span className="block text-sm text-muted-foreground">{f.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="font-semibold" htmlFor="maxPrice">Prix maximum que vous paieriez (CAD)</label>
        <input
          id="maxPrice" type="number" min="0" max="10000" inputMode="numeric"
          value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
          placeholder="ex. 49"
          className="mt-2 w-40 rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
        />
      </div>

      <div>
        <p className="font-semibold">Qui paierait, à votre avis ?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {WHO.map(w => (
            <button
              type="button" key={w.v} onClick={() => setWhoPays(w.v)}
              className={`rounded-lg border px-3 py-2 text-sm ${whoPays === w.v ? 'border-foreground bg-muted' : 'border-border'}`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-semibold" htmlFor="comment">Un mot sur ce qui vous ferait payer (optionnel)</label>
        <textarea
          id="comment" value={comment} onChange={e => setComment(e.target.value)} rows={2}
          className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
        />
      </div>

      <div>
        <label className="font-semibold" htmlFor="semail">Courriel (pour être prévenu du lancement — optionnel)</label>
        <input
          id="semail" type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="votre@courriel.com"
          className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
        />
      </div>

      {err && <p className="text-sm text-destructive">{err}</p>}
      {status === 'error' && <p className="text-sm text-destructive">Erreur — réessayez.</p>}

      <button
        type="submit" disabled={status === 'loading'}
        className="rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background disabled:opacity-60"
      >
        {status === 'loading' ? 'Envoi…' : 'Envoyer mes réponses'}
      </button>
    </form>
  )
}
