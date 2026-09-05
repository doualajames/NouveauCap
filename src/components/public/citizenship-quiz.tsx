'use client'

import { useState } from 'react'
import Link from 'next/link'
import { citizenshipTestQuestions } from '@/lib/public-data/citizenship-questions'
import { LeadForm } from '@/components/public/lead-form'

export function CitizenshipQuiz() {
  const questions = citizenshipTestQuestions
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[current]

  const validate = () => {
    if (selected === null) return
    if (current === 0) import('@/lib/track').then(m => m.track('tool_used', { source: 'quiz' })).catch(() => {})
    if (selected === q.correctAnswer) setCorrectCount(c => c + 1)
    setAnswered(true)
  }

  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setCorrectCount(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100)
    const pass = pct >= 75 // seuil de l'examen officiel : 15/20
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Résultat</p>
        <p className="mt-2 text-6xl font-bold text-destructive">
          {correctCount}/{questions.length}
        </p>
        <p className="mt-3 text-lg font-semibold">
          {pass
            ? '🎉 Réussi ! L\'examen officiel exige 15 bonnes réponses sur 20.'
            : '📚 Pas encore — l\'examen officiel exige 15/20. Continuez à réviser !'}
        </p>
        <button
          onClick={restart}
          className="mt-6 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors bg-muted"
        >
          Recommencer le quiz
        </button>

        <div className="mt-8 border-t border-border pt-6 text-left">
          <p className="mb-3 text-sm font-semibold text-muted-foreground">
            📬 Recevez le guide de révision complet (Découvrir le Canada, résumé)
          </p>
          <LeadForm source="quiz-citoyennete" buttonLabel="Recevoir le guide" />
        </div>
        <Link
          href="/app"
          className="mt-6 inline-block text-sm font-semibold text-destructive hover:underline"
        >
          Préparer toute mon installation au Canada →
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {current + 1} / {questions.length}</span>
        <span>{correctCount} bonne{correctCount > 1 ? 's' : ''} réponse{correctCount > 1 ? 's' : ''}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[hsl(var(--foreground))] transition-all"
          style={{ width: `${(current / questions.length) * 100}%` }}
        />
      </div>

      <h2 className="mt-6 text-xl font-semibold leading-snug">{q.question}</h2>

      <div className="mt-6 space-y-3">
        {q.options.map((opt, i) => {
          let style = 'border-border'
          if (answered) {
            if (i === q.correctAnswer) style = 'border-[hsl(var(--foreground))] bg-muted font-semibold'
            else if (i === selected) style = 'border-destructive bg-destructive/10'
            else style = 'border-border opacity-50'
          } else if (i === selected) {
            style = 'border-[hsl(var(--foreground))] bg-muted'
          }
          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={`w-full rounded-xl border-2 px-5 py-4 text-left text-sm font-medium transition-colors ${style}`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {answered && (
        <p className="mt-4 rounded-xl bg-muted px-4 py-3 text-sm text-foreground">
          💡 {q.explanation}
        </p>
      )}

      <button
        onClick={answered ? next : validate}
        disabled={selected === null}
        className="mt-6 w-full rounded-xl bg-[hsl(var(--foreground))] px-6 py-4 text-base font-semibold text-[hsl(var(--background))] transition-colors hover:opacity-90 disabled:opacity-50"
      >
        {answered
          ? current + 1 >= questions.length ? 'Voir mon résultat' : 'Question suivante'
          : 'Valider ma réponse'}
      </button>
    </div>
  )
}
