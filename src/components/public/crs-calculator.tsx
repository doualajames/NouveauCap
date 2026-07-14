'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LeadForm } from '@/components/public/lead-form'

// Barème simplifié inspiré de la grille CRS d'Entrée express (candidat seul).
// Estimation indicative — le calcul officiel d'IRCC fait foi.
function agePoints(age: number): number {
  if (age <= 17 || age >= 45) return 0
  if (age <= 19) return 90
  if (age <= 29) return 110
  const table: Record<number, number> = {
    30: 105, 31: 99, 32: 94, 33: 88, 34: 83, 35: 77,
    36: 72, 37: 66, 38: 61, 39: 55, 40: 50, 41: 39, 42: 28, 43: 17, 44: 6,
  }
  return table[age] ?? 0
}

const EDUCATION_POINTS: Record<string, number> = {
  secondary: 30,
  diploma: 90,
  bachelors: 120,
  masters: 135,
  phd: 150,
}

function languagePoints(clb: number): number {
  if (clb >= 9) return 160
  if (clb >= 7) return 100
  return 50
}

function canadaXpPoints(years: number): number {
  if (years >= 5) return 80
  if (years >= 3) return 64
  if (years >= 1) return 40
  return 0
}

function foreignXpPoints(years: number): number {
  if (years >= 3) return 50
  if (years >= 1) return 25
  return 0
}

export function CrsCalculator() {
  const [age, setAge] = useState(30)
  const [education, setEducation] = useState('bachelors')
  const [clb, setClb] = useState(7)
  const [canadaXp, setCanadaXp] = useState(0)
  const [foreignXp, setForeignXp] = useState(3)
  const [score, setScore] = useState<number | null>(null)

  const calculate = () => {
    const total =
      agePoints(age) +
      (EDUCATION_POINTS[education] ?? 30) +
      languagePoints(clb) +
      canadaXpPoints(canadaXp) +
      foreignXpPoints(foreignXp) +
      100 // facteurs de transférabilité (base simplifiée)
    setScore(total)
  }

  const field = 'block text-sm font-medium text-gray-700'
  const input =
    'mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500'

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={field} htmlFor="crs-age">Votre âge</label>
          <input
            id="crs-age" type="number" min={17} max={60} value={age}
            onChange={e => setAge(Number(e.target.value))} className={input}
          />
        </div>
        <div>
          <label className={field} htmlFor="crs-edu">Plus haut diplôme</label>
          <select
            id="crs-edu" value={education}
            onChange={e => setEducation(e.target.value)} className={input}
          >
            <option value="secondary">Secondaire</option>
            <option value="diploma">Diplôme post-secondaire (1-2 ans)</option>
            <option value="bachelors">Baccalauréat (licence)</option>
            <option value="masters">Maîtrise (master)</option>
            <option value="phd">Doctorat</option>
          </select>
        </div>
        <div>
          <label className={field} htmlFor="crs-clb">
            Niveau de langue (NCLC/CLB, 1re langue officielle)
          </label>
          <select
            id="crs-clb" value={clb}
            onChange={e => setClb(Number(e.target.value))} className={input}
          >
            <option value={5}>NCLC 5-6 (intermédiaire)</option>
            <option value={7}>NCLC 7-8 (intermédiaire avancé)</option>
            <option value={9}>NCLC 9+ (avancé)</option>
          </select>
        </div>
        <div>
          <label className={field} htmlFor="crs-cxp">Années d&apos;expérience au Canada</label>
          <input
            id="crs-cxp" type="number" min={0} max={10} value={canadaXp}
            onChange={e => setCanadaXp(Number(e.target.value))} className={input}
          />
        </div>
        <div>
          <label className={field} htmlFor="crs-fxp">Années d&apos;expérience hors Canada</label>
          <input
            id="crs-fxp" type="number" min={0} max={20} value={foreignXp}
            onChange={e => setForeignXp(Number(e.target.value))} className={input}
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="mt-8 w-full rounded-xl bg-red-600 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-red-700"
      >
        Calculer mon score
      </button>

      {score !== null && (
        <div className="mt-8 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Score CRS estimé
          </p>
          <p className="mt-2 text-6xl font-bold text-red-600">{score}</p>
          <p className="mt-3 text-sm text-gray-600">
            {score >= 500
              ? 'Excellent — au-dessus des seuils récents des tirages généraux.'
              : score >= 450
                ? 'Compétitif — proche des seuils de plusieurs tirages. Les tirages ciblés (francophones !) descendent souvent plus bas.'
                : 'Sous les seuils généraux récents — mais les tirages francophones et provinciaux ont des seuils bien plus bas. Améliorez votre NCLC : c\'est le levier le plus rapide.'}
          </p>
          <p className="mt-4 text-xs text-gray-400">
            Estimation simplifiée (candidat seul). Le calcul officiel d&apos;IRCC fait foi.
          </p>

          <div className="mt-8 border-t border-red-100 pt-6 text-left">
            <p className="mb-3 text-sm font-semibold text-gray-800">
              📬 Recevez le plan d&apos;action pour augmenter votre score
            </p>
            <LeadForm source="simulateur-crs" buttonLabel="Recevoir le plan" />
          </div>
          <Link
            href="/app"
            className="mt-6 inline-block text-sm font-semibold text-red-600 hover:underline"
          >
            Créer mon parcours d&apos;immigration complet →
          </Link>
        </div>
      )}
    </div>
  )
}
