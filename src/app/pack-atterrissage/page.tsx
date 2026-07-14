import type { Metadata } from 'next'
import { SiteHeader, SiteFooter } from '@/components/public/site-chrome'
import { LeadForm } from '@/components/public/lead-form'

export const metadata: Metadata = {
  title: 'Pack Atterrissage — Vos 90 premiers jours au Canada, guidés | NouveauCap',
  description:
    "Forfait unique : parcours personnalisé complet, rappels d'échéances, CV canadien optimisé par IA, comparateur banques. Un paiement, pas d'abonnement. Liste d'attente ouverte.",
  alternates: { canonical: '/pack-atterrissage' },
  openGraph: {
    title: 'Pack Atterrissage — Vos 90 premiers jours au Canada, guidés',
    description: 'Un paiement unique, pas d\'abonnement. Liste d\'attente ouverte.',
    type: 'website',
    locale: 'fr_CA',
  },
}

const INCLUDED = [
  ['🧭', 'Parcours personnalisé complet', 'Toutes les démarches pour votre statut et votre province, dans le bon ordre, avec documents, délais et sources officielles.'],
  ['⏰', 'Rappels d\'échéances illimités', 'Permis, assurance maladie, impôts — vous ne manquez aucune date pendant 12 mois.'],
  ['📝', 'CV canadien optimisé par IA', 'Analyse illimitée pendant 90 jours : format ATS, mots-clés, adaptation au poste visé.'],
  ['🏦', 'Kit finances', 'Comparateur banques nouveaux arrivants, guide crédit, budget d\'installation par ville.'],
  ['🎓', 'Préparation citoyenneté', 'Quiz illimités et guide de révision complet.'],
  ['💬', 'Support prioritaire', 'Réponse en français sous 24 h pendant vos 90 premiers jours.'],
]

export default function PackAtterrissagePage() {
  return (
    <div className="bg-white text-gray-900">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
            🚀 Lancement bientôt — liste d&apos;attente ouverte
          </p>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Pack Atterrissage</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            Vos 90 premiers jours au Canada, guidés de bout en bout.{' '}
            <strong>Un paiement unique, pas d&apos;abonnement</strong> — parce que votre
            installation a une fin, votre facture aussi.
          </p>
          <div className="mt-8 inline-flex items-baseline gap-2">
            <span className="text-5xl font-bold text-red-600">99 $</span>
            <span className="text-gray-500">CAD, une seule fois</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Prix de lancement réservé à la liste d&apos;attente (au lieu de 149 $).
            Garantie remboursement 30 jours.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {INCLUDED.map(([icon, title, text]) => (
            <div key={title} className="rounded-2xl border border-gray-100 p-6 shadow-sm">
              <p className="text-2xl" aria-hidden>{icon}</p>
              <h2 className="mt-3 text-lg font-semibold">{title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 p-8 text-white sm:p-10">
          <h2 className="text-2xl font-bold">Rejoindre la liste d&apos;attente</h2>
          <p className="mt-2 text-red-100">
            Soyez averti·e au lancement et bloquez le prix de 99 $. Aucun engagement.
          </p>
          <div className="mt-6">
            <LeadForm
              source="pack-atterrissage"
              buttonLabel="Bloquer le prix de lancement"
              successMessage="Vous êtes sur la liste — prix de 99 $ garanti au lancement."
            />
          </div>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-bold">Questions fréquentes</h2>
          <dl className="mt-6 space-y-6">
            <div>
              <dt className="font-semibold">Pourquoi un paiement unique plutôt qu&apos;un abonnement ?</dt>
              <dd className="mt-1 leading-relaxed text-gray-600">
                Votre installation dure quelques mois, pas des années. Vous payez une fois, vous
                êtes couvert·e pour l&apos;essentiel : 90 jours d&apos;accompagnement complet et
                12 mois de rappels d&apos;échéances.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Est-ce un service de conseil en immigration ?</dt>
              <dd className="mt-1 leading-relaxed text-gray-600">
                Non. NouveauCap fournit de l&apos;information organisée et des outils, avec les
                sources officielles. Pour un avis juridique sur votre dossier, consultez un
                consultant réglementé (CRIC) ou un avocat.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Et si je ne suis pas satisfait·e ?</dt>
              <dd className="mt-1 leading-relaxed text-gray-600">
                Remboursement intégral sous 30 jours, sans justification.
              </dd>
            </div>
          </dl>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
