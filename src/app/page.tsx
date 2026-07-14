import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader, SiteFooter } from '@/components/public/site-chrome'
import { LeadForm } from '@/components/public/lead-form'

export const metadata: Metadata = {
  title: 'NouveauCap — Le GPS de votre immigration au Canada',
  description:
    "Parcours personnalisé selon votre statut et votre province : démarches dans le bon ordre, échéances à ne pas manquer, CV canadien, santé, banques. Outils gratuits, en français.",
  alternates: { canonical: '/' },
  openGraph: {
    title: 'NouveauCap — Le GPS de votre immigration au Canada',
    description:
      'Checklist personnalisée, simulateur CRS gratuit, quiz citoyenneté, CV canadien. Pour les nouveaux arrivants francophones.',
    type: 'website',
    locale: 'fr_CA',
  },
}

const FEATURES = [
  {
    icon: '🧭',
    title: 'Parcours personnalisé',
    text: "Checklist générée selon votre statut (RP, permis de travail, étudiant) et votre province — documents requis, délais, coûts, sources officielles.",
  },
  {
    icon: '⏰',
    title: 'Zéro échéance manquée',
    text: "Rappels d'expiration de permis, délais d'inscription à l'assurance maladie (RAMQ, OHIP…), dates limites fiscales.",
  },
  {
    icon: '📝',
    title: 'CV au format canadien',
    text: "Optimisation IA selon les normes canadiennes : format ATS, mots-clés, pas de photo ni d'âge — adapté au poste visé.",
  },
  {
    icon: '🏦',
    title: 'Finances et installation',
    text: 'Comparateur banques nouveaux arrivants, guide crédit, budget par ville, droits des locataires.',
  },
]

const STEPS = [
  { n: '1', title: 'Répondez à 5 questions', text: 'Statut, province, date d\'arrivée, situation familiale.' },
  { n: '2', title: 'Recevez votre parcours', text: 'Chaque démarche dans le bon ordre, avec documents et délais.' },
  { n: '3', title: 'Avancez sereinement', text: 'Cochez, suivez votre progression, recevez les rappels.' },
]

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
              🍁 Pour les nouveaux arrivants francophones
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Immigrer au Canada sans rien oublier,{' '}
              <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                dans le bon ordre
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              RAMQ ou OHIP ? NAS avant ou après le bail ? Quel délai pour l&apos;assurance maladie ?
              NouveauCap génère votre parcours personnalisé selon votre statut et votre province —
              avec les sources officielles, en français.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/app"
                className="rounded-xl bg-red-600 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-red-700"
              >
                Créer mon parcours gratuit
              </Link>
              <Link
                href="/simulateur-crs"
                className="rounded-xl border border-gray-300 px-8 py-4 text-center text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Calculer mon score CRS
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Gratuit, sans carte bancaire. 10 provinces × 4 statuts couverts.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Tout ce qui compte pour vos premiers mois
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {FEATURES.map(f => (
            <div key={f.title} className="rounded-2xl border border-gray-100 p-8 shadow-sm">
              <p className="text-3xl" aria-hidden>{f.icon}</p>
              <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Comment ça marche</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map(s => (
              <div key={s.n} className="text-center">
                <p className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                  {s.n}
                </p>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-gray-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free tools */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Outils gratuits, sans compte</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Link
            href="/simulateur-crs"
            className="group rounded-2xl border border-gray-200 p-8 transition-shadow hover:shadow-lg"
          >
            <p className="text-3xl" aria-hidden>🧮</p>
            <h3 className="mt-4 text-xl font-semibold group-hover:text-red-600">
              Simulateur de score CRS
            </h3>
            <p className="mt-2 text-gray-600">
              Estimez votre score Entrée express en 2 minutes : âge, études, langues, expérience.
            </p>
          </Link>
          <Link
            href="/quiz-citoyennete"
            className="group rounded-2xl border border-gray-200 p-8 transition-shadow hover:shadow-lg"
          >
            <p className="text-3xl" aria-hidden>🎓</p>
            <h3 className="mt-4 text-xl font-semibold group-hover:text-red-600">
              Quiz de citoyenneté
            </h3>
            <p className="mt-2 text-gray-600">
              20 questions type examen : droits, histoire, gouvernement, symboles du Canada.
            </p>
          </Link>
        </div>
      </section>

      {/* Email capture */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">Le guide des 90 premiers jours, gratuit</h2>
          <p className="mt-3 text-red-100">
            Recevez la checklist essentielle de vos trois premiers mois au Canada, par courriel.
          </p>
          <div className="mt-8 text-left">
            <LeadForm source="landing" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
