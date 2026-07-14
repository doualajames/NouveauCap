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
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Résultat</p>
        <p className="mt-2 text-6xl font-bold text-red-600">
          {correctCount}/{questions.length}
        </p>
        <p className="mt-3 text-lg font-semibold">
          {pass
            ? '🎉 Réussi ! L\'examen officiel exige 15 bonnes réponses sur 20.'
            : '📚 Pas encore — l\'examen officiel exige 15/20. Continuez à réviser !'}
        </p>
        <button
          onClick={restart}
          className="mt-6 rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Recommencer le quiz
        </button>

        <div className="mt-8 border-t border-gray-100 pt-6 text-left">
          <p className="mb-3 text-sm font-semibold text-gray-800">
            📬 Recevez le guide de révision complet (Découvrir le Canada, résumé)
          </p>
          <LeadForm source="quiz-citoyennete" buttonLabel="Recevoir le guide" />
        </div>
        <Link
          href="/app"
          className="mt-6 inline-block text-sm font-semibold text-red-600 hover:underline"
        >
          Préparer toute mon installation au Canada →
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Question {current + 1} / {questions.length}</span>
        <span>{correctCount} bonne{correctCount > 1 ? 's' : ''} réponse{correctCount > 1 ? 's' : ''}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-red-600 transition-all"
          style={{ width: `${(current / questions.length) * 100}%` }}
        />
      </div>

      <h2 className="mt-6 text-xl font-semibold leading-snug">{q.question}</h2>

      <div className="mt-6 space-y-3">
        {q.options.map((opt, i) => {
          let style = 'border-gray-200 hover:border-red-300'
          if (answered) {
            if (i === q.correctAnswer) style = 'border-green-500 bg-green-50'
            else if (i === selected) style = 'border-red-500 bg-red-50'
            else style = 'border-gray-200 opacity-60'
          } else if (i === selected) {
            style = 'border-red-500 bg-red-50'
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
        <p className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-800">
          💡 {q.explanation}
        </p>
      )}

      <button
        onClick={answered ? next : validate}
        disabled={selected === null}
        className="mt-6 w-full rounded-xl bg-red-600 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
      >
        {answered
          ? current + 1 >= questions.length ? 'Voir mon résultat' : 'Question suivante'
          : 'Valider ma réponse'}
      </button>
    </div>
  )
}
