import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader, SiteFooter } from '@/components/public/site-chrome'
import { guides } from '@/lib/guides/content'

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://nouveaucap.com'

export const metadata: Metadata = {
  title: 'Guides pratiques pour nouveaux arrivants au Canada — NouveauCap',
  description:
    "Guides gratuits en français pour vos premières démarches au Canada : NAS, assurance maladie, compte bancaire, logement. Étapes claires et sources officielles.",
  keywords: ['guides immigration Canada', 'démarches nouvel arrivant', "s'installer au Canada francophone"],
  alternates: { canonical: `${BASE}/guides` },
}

export default function GuidesIndex() {
  const byCategory = guides.reduce<Record<string, typeof guides>>((acc, g) => {
    (acc[g.category] ||= []).push(g)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-destructive">Guides</p>
        <h1 className="mt-2 text-4xl font-bold leading-tight">
          Vos premières démarches au Canada, expliquées simplement
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Des guides gratuits en français, par étapes, avec les sources officielles. Écrits pour
          les nouveaux arrivants francophones.
        </p>

        {Object.entries(byCategory).map(([cat, list]) => (
          <section key={cat} className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{cat}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {list.map(g => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="group rounded-xl border border-border p-5 transition-colors hover:border-foreground"
                >
                  <h3 className="text-lg font-bold leading-snug group-hover:underline">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.description}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{g.readingTime} min de lecture</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  )
}
