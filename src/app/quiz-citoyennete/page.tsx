import type { Metadata } from 'next'
import { SiteHeader, SiteFooter } from '@/components/public/site-chrome'
import { CitizenshipQuiz } from '@/components/public/citizenship-quiz'

export const metadata: Metadata = {
  title: 'Quiz examen de citoyenneté canadienne 2026 — 20 questions gratuites | NouveauCap',
  description:
    "Testez-vous avec 20 questions type examen de citoyenneté canadienne : droits, histoire, gouvernement, symboles. Corrections expliquées. Gratuit, sans compte, en français.",
  alternates: { canonical: '/quiz-citoyennete' },
  openGraph: {
    title: 'Quiz examen de citoyenneté canadienne — 20 questions gratuites',
    description: 'Testez-vous comme à l\'examen officiel (seuil : 15/20). Gratuit, sans compte.',
    type: 'website',
    locale: 'fr_CA',
  },
}

export default function QuizCitoyennetePage() {
  return (
    <div className="bg-white text-gray-900">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
          Outil gratuit
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
          Quiz de citoyenneté canadienne
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          20 questions dans l&apos;esprit de l&apos;examen officiel, basées sur le guide
          « Découvrir le Canada ». L&apos;examen réel exige 15 bonnes réponses sur 20 en
          30 minutes.
        </p>
        <div className="mt-10">
          <CitizenshipQuiz />
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">À propos de l&apos;examen de citoyenneté</h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            L&apos;examen porte sur les droits et responsabilités des citoyens, l&apos;histoire du
            Canada, sa géographie, son système de gouvernement et ses symboles. Il est offert en
            français ou en anglais. Les candidats de 18 à 54 ans doivent le réussir pour obtenir la
            citoyenneté. La seule source officielle de préparation est le guide gratuit
            « Découvrir le Canada » publié par IRCC.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
