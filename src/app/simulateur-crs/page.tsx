import type { Metadata } from 'next'
import { SiteHeader, SiteFooter } from '@/components/public/site-chrome'
import { CrsCalculator } from '@/components/public/crs-calculator'

export const metadata: Metadata = {
  title: 'Simulateur de score CRS 2026 gratuit — Entrée express Canada | NouveauCap',
  description:
    "Calculez votre score CRS (Système de classement global) pour Entrée express en 2 minutes : âge, diplôme, NCLC, expérience. Gratuit, sans compte, en français.",
  alternates: { canonical: '/simulateur-crs' },
  openGraph: {
    title: 'Simulateur de score CRS gratuit — Entrée express Canada',
    description: 'Estimez votre score Entrée express en 2 minutes. Gratuit, sans compte.',
    type: 'website',
    locale: 'fr_CA',
  },
}

export default function SimulateurCrsPage() {
  return (
    <div className="bg-white text-gray-900">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
          Outil gratuit
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
          Simulateur de score CRS
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          Le score CRS (Système de classement global) détermine votre rang dans le bassin
          Entrée express. Estimez le vôtre en 2 minutes — aucun compte requis.
        </p>
        <div className="mt-10">
          <CrsCalculator />
        </div>

        <section className="prose prose-gray mt-16 max-w-none">
          <h2 className="text-2xl font-bold">Comment le score CRS est-il calculé ?</h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            IRCC attribue des points selon l&apos;âge (max 110 pour un candidat seul), le niveau
            d&apos;études (max 150), la maîtrise des langues officielles (max 160 pour la première
            langue), l&apos;expérience de travail au Canada (max 80) et des facteurs de
            transférabilité. Les candidats francophones bénéficient de points supplémentaires et de
            tirages ciblés dont les seuils sont nettement plus bas que les tirages généraux.
          </p>
          <h2 className="mt-8 text-2xl font-bold">Comment augmenter votre score ?</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-gray-600">
            <li>Repasser un test de langue (TEF/TCF pour le français) : passer de NCLC 7 à 9 peut ajouter plus de 60 points.</li>
            <li>Faire évaluer tous vos diplômes (EDE/ECA), pas seulement le plus récent.</li>
            <li>Viser une nomination provinciale (+600 points) ou les volets francophones.</li>
            <li>Une année d&apos;expérience canadienne (permis de travail, PVT) change fortement la donne.</li>
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
