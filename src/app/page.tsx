import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader, SiteFooter } from '@/components/public/site-chrome'
import { LeadForm } from '@/components/public/lead-form'
import {
  Compass, Clock, FileText, Wallet, Calculator, GraduationCap,
  BookOpen, ArrowRight, ShieldCheck, MapPin,
} from 'lucide-react'

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
  { icon: Compass, title: 'Parcours personnalisé', text: "Checklist générée selon votre statut (RP, permis de travail, étudiant) et votre province — documents, délais, coûts, sources officielles." },
  { icon: Clock, title: 'Zéro échéance manquée', text: "Rappels d'expiration de permis, délais d'assurance maladie (RAMQ, OHIP…), dates limites fiscales." },
  { icon: FileText, title: 'CV au format canadien', text: 'Format ATS, mots-clés, sans photo ni âge — adapté au poste visé, selon les normes canadiennes.' },
  { icon: Wallet, title: 'Finances et installation', text: 'Comparateur banques nouveaux arrivants, guide crédit, budget par ville, droits des locataires.' },
]

const STEPS = [
  { n: '01', title: 'Répondez à 5 questions', text: "Statut, province, date d'arrivée, situation familiale." },
  { n: '02', title: 'Recevez votre parcours', text: 'Chaque démarche dans le bon ordre, avec documents et délais.' },
  { n: '03', title: 'Avancez sereinement', text: 'Cochez, suivez votre progression, recevez les rappels.' },
]

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      {/* Hero — éditorial, un seul message, une seule action principale */}
      <section className="border-b border-foreground/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-destructive">
              Pour les nouveaux arrivants francophones
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Immigrer au Canada sans rien oublier,{' '}
              <span className="text-destructive">dans le bon ordre.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              RAMQ ou OHIP ? NAS avant ou après le bail ? NouveauCap génère votre parcours
              personnalisé selon votre statut et votre province, avec les sources officielles, en français.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/app"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--foreground))] px-7 py-4 text-base font-semibold text-[hsl(var(--background))] transition-opacity hover:opacity-90"
              >
                Créer mon parcours gratuit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/simulateur-crs"
                className="inline-flex items-center justify-center rounded-lg border border-foreground/80 px-7 py-4 text-base font-semibold transition-colors hover:bg-muted"
              >
                Calculer mon score CRS
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Gratuit, sans carte bancaire. 10 provinces × 4 statuts couverts.
            </p>
          </div>

          {/* Aperçu éditorial : une checklist, pas une image générique */}
          <div className="rounded-2xl border border-foreground/80 bg-card p-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Votre parcours · Québec · Résident permanent</span>
              <span className="text-xs font-bold">8 / 23</span>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { t: 'Numéro d\'assurance sociale (NAS)', done: true },
                { t: 'Carte d\'assurance maladie (RAMQ)', urgent: true },
                { t: 'Ouvrir un compte bancaire', done: true },
                { t: 'Trouver un logement', urgent: false },
                { t: 'Faire reconnaître ses diplômes', urgent: false },
              ].map((x, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className={`flex h-5 w-5 flex-none items-center justify-center rounded ${x.done ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]' : x.urgent ? 'border-2 border-destructive' : 'border-2 border-foreground/60'}`}>
                    {x.done ? '✓' : ''}
                  </span>
                  <span className={x.done ? 'text-muted-foreground line-through' : 'font-medium'}>{x.t}</span>
                  {x.urgent && <span className="ml-auto text-xs font-bold uppercase text-destructive">Urgent</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bande de confiance */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Sources officielles IRCC</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> 10 provinces</span>
          <span>4 statuts d&apos;immigration</span>
          <span>16 guides pratiques</span>
          <span>100 % en français</span>
        </div>
      </section>

      {/* Ce qui compte */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
          Tout ce qui compte pour vos premiers mois
        </h2>
        <div className="mt-12 grid divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-y-0">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={f.title} className={`flex gap-5 py-8 sm:px-8 ${i % 2 === 0 ? 'sm:border-r sm:border-border' : ''} ${i >= 2 ? 'sm:border-t sm:border-border' : ''}`}>
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-foreground/80">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">Comment ça marche</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {STEPS.map(s => (
              <div key={s.n}>
                <p className="font-serif text-4xl font-bold text-destructive">{s.n}</p>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outils gratuits + guides */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold sm:text-4xl">Commencez gratuitement, sans compte</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Link href="/simulateur-crs" className="group rounded-2xl border border-border p-7 transition-colors hover:border-foreground">
            <Calculator className="h-6 w-6" />
            <h3 className="mt-4 text-lg font-semibold group-hover:underline">Simulateur de score CRS</h3>
            <p className="mt-1 text-sm text-muted-foreground">Estimez votre score Entrée express en 2 minutes.</p>
          </Link>
          <Link href="/quiz-citoyennete" className="group rounded-2xl border border-border p-7 transition-colors hover:border-foreground">
            <GraduationCap className="h-6 w-6" />
            <h3 className="mt-4 text-lg font-semibold group-hover:underline">Quiz de citoyenneté</h3>
            <p className="mt-1 text-sm text-muted-foreground">20 questions type examen : droits, histoire, gouvernement.</p>
          </Link>
          <Link href="/guides" className="group rounded-2xl border border-border p-7 transition-colors hover:border-foreground">
            <BookOpen className="h-6 w-6" />
            <h3 className="mt-4 text-lg font-semibold group-hover:underline">16 guides pratiques</h3>
            <p className="mt-1 text-sm text-muted-foreground">NAS, santé, banque, logement, impôts — étape par étape.</p>
          </Link>
        </div>
      </section>

      {/* Capture email — éditorial, pas de dégradé rouge */}
      <section className="border-t border-foreground/80 bg-[hsl(var(--foreground))] text-[hsl(var(--background))]">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--background)/0.6)]">Gratuit, par courriel</p>
          <h2 className="mt-3 text-3xl font-bold">Le guide des 90 premiers jours</h2>
          <p className="mt-3 text-[hsl(var(--background)/0.7)]">
            La checklist essentielle de vos trois premiers mois au Canada, dans votre boîte mail.
          </p>
          <div className="mt-8">
            <LeadForm source="landing" buttonLabel="Recevoir le guide" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
