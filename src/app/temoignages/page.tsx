import type { Metadata } from 'next'
import { SiteHeader, SiteFooter } from '@/components/public/site-chrome'
import { PriceSurvey } from '@/components/public/price-survey'
import { LeadForm } from '@/components/public/lead-form'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://nouveaucap.com'

export const metadata: Metadata = {
  title: 'Bêta et témoignages — NouveauCap',
  description:
    "Rejoignez les premiers arrivants qui testent NouveauCap et aidez-nous à fixer un prix juste. Programme bêta gratuit pour la diaspora francophone.",
  alternates: { canonical: `${BASE}/temoignages` },
}

type Testimonial = { id: string; name: string; role: string; quote: string }

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const rows = await db.testimonial.findMany({
      where: { approved: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: 12,
    })
    return rows.map(r => ({ id: r.id, name: r.name, role: r.role, quote: r.quote }))
  } catch {
    return []
  }
}

export default async function TemoignagesPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-destructive">Programme bêta</p>
        <h1 className="mt-2 text-4xl font-bold leading-tight">
          Testez NouveauCap avant tout le monde
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          On construit NouveauCap avec les premiers arrivants francophones. Rejoignez la bêta :
          c&apos;est gratuit, et vos retours décident de ce qu&apos;on construit ensuite.
        </p>

        {/* Process bêta */}
        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { n: '1', t: 'Vous vous inscrivez', d: 'Accès gratuit à tout : parcours, outils, guides.' },
            { n: '2', t: 'Vous utilisez, vous dites', d: 'Ce qui aide, ce qui manque, ce qui coince.' },
            { n: '3', t: 'On améliore', d: 'Vos retours passent en priorité avant le lancement.' },
          ].map(s => (
            <div key={s.n} className="rounded-xl border border-border p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/80 text-sm font-bold">{s.n}</div>
              <p className="mt-3 font-semibold">{s.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 rounded-xl border border-foreground/80 p-6">
          <h2 className="text-xl font-bold">Rejoindre la bêta</h2>
          <p className="mt-2 text-sm text-muted-foreground">Laissez votre courriel, on vous ouvre l&apos;accès.</p>
          <div className="mt-4"><LeadForm source="guides" buttonLabel="Rejoindre la bêta" /></div>
        </div>

        {/* Sondage prix */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold">Aidez-nous à fixer un prix juste</h2>
          <p className="mt-2 text-muted-foreground">
            NouveauCap restera gratuit sur l&apos;essentiel. Mais pour tenir dans le temps, une partie
            sera peut-être payante. Dites-nous ce qui vous semblerait honnête — 30 secondes.
          </p>
          <div className="mt-6"><PriceSurvey /></div>
        </section>

        {/* Témoignages — honnête : rien de fabriqué */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold">Ce que disent les testeurs</h2>
          {testimonials.length === 0 ? (
            <p className="mt-3 rounded-xl border border-dashed border-border p-6 text-muted-foreground">
              La bêta vient de commencer. Les premiers retours seront publiés ici, tels quels — on
              n&apos;invente pas de témoignages. Envie d&apos;être parmi les premiers ? Rejoignez la bêta ci-dessus.
            </p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {testimonials.map(t => (
                <figure key={t.id} className="rounded-xl border border-border p-5">
                  <blockquote className="leading-relaxed">« {t.quote} »</blockquote>
                  <figcaption className="mt-3 text-sm">
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-muted-foreground"> — {t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
