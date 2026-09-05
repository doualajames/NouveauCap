import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader, SiteFooter } from '@/components/public/site-chrome'
import { LeadForm } from '@/components/public/lead-form'
import { guides, getGuide } from '@/lib/guides/content'

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://nouveaucap.com'

export function generateStaticParams() {
  return guides.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return { title: 'Guide introuvable — NouveauCap' }
  const url = `${BASE}/guides/${guide.slug}`
  return {
    title: guide.metaTitle,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: guide.metaTitle,
      description: guide.description,
      url,
      type: 'article',
      locale: 'fr_CA',
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  // JSON-LD : FAQ + Article (rich results Google)
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    inLanguage: 'fr-CA',
    dateModified: guide.updated,
    author: { '@type': 'Organization', name: 'NouveauCap' },
    publisher: { '@type': 'Organization', name: 'NouveauCap' },
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/guides" className="hover:text-foreground">Guides</Link>
          <span className="mx-2">/</span>
          <span>{guide.category}</span>
        </nav>

        <p className="text-xs font-semibold uppercase tracking-wider text-destructive">{guide.category}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight">{guide.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {guide.readingTime} min de lecture · Mis à jour le{' '}
          {new Date(guide.updated).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="mt-6 space-y-4">
          {guide.intro.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-foreground/90">{p}</p>
          ))}
        </div>

        {guide.sections.map((s, i) => (
          <section key={i} className="mt-10">
            <h2 className="text-2xl font-bold">{s.heading}</h2>
            <div className="mt-3 space-y-3">
              {s.body.map((p, j) => (
                <p key={j} className="leading-relaxed text-foreground/90">{p}</p>
              ))}
            </div>
            {s.steps && (
              <ul className="mt-4 space-y-2">
                {s.steps.map((step, k) => (
                  <li key={k} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-foreground" />
                    <span className="leading-relaxed text-foreground/90">{step}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Capture email — funnel guide → lead */}
        <aside className="mt-12 rounded-xl border border-foreground/80 p-6">
          <h2 className="text-xl font-bold">Recevez le guide des 90 premiers jours</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Une check-list par étapes, adaptée à votre statut et votre province. Gratuit, en français.
          </p>
          <div className="mt-4">
            <LeadForm source="guides" buttonLabel="Recevoir le guide" />
          </div>
        </aside>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Questions fréquentes</h2>
          <div className="mt-4 divide-y divide-border">
            {guide.faq.map((f, i) => (
              <div key={i} className="py-4">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-2 leading-relaxed text-foreground/90">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="mt-10">
          <h2 className="text-lg font-bold">Sources officielles</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {guide.sources.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-destructive underline underline-offset-2 hover:opacity-80">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {guide.relatedTools && guide.relatedTools.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold">Outils utiles</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {guide.relatedTools.map((t, i) => (
                <Link key={i} href={t.href} className="rounded-lg border border-foreground/80 px-4 py-2 text-sm font-medium hover:bg-muted">
                  {t.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="mt-12 rounded-lg bg-muted px-4 py-3 text-xs text-muted-foreground">
          Information générale d'organisation, pas un conseil en immigration. NouveauCap n'est pas un
          consultant réglementé (CRIC/CICC). Pour un avis sur votre dossier, consultez un professionnel autorisé.
        </p>

        {/* Autres guides */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-lg font-bold">Autres guides</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {guides.filter(g => g.slug !== guide.slug).slice(0, 4).map(g => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="rounded-xl border border-border p-4 hover:border-foreground">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.category}</p>
                <p className="mt-1 font-semibold leading-snug">{g.title}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
