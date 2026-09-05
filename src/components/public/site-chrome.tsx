import Link from 'next/link'
import { Compass } from 'lucide-react'
import { PageView } from './page-view'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/80 bg-background/90 backdrop-blur">
      <PageView />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Compass className="h-5 w-5" aria-hidden /> NouveauCap
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/guides" className="hover:text-foreground">Guides</Link>
          <Link href="/temoignages" className="hover:text-foreground">Bêta</Link>
          <Link href="/simulateur-crs" className="hover:text-foreground">Simulateur CRS</Link>
          <Link href="/quiz-citoyennete" className="hover:text-foreground">Quiz citoyenneté</Link>
          <Link href="/pack-atterrissage" className="hover:text-foreground">Pack Atterrissage</Link>
        </nav>
        <Link
          href="/app"
          className="rounded-lg bg-[hsl(var(--foreground))] px-4 py-2 text-sm font-semibold text-[hsl(var(--background))] transition-opacity hover:opacity-90"
        >
          Mon espace
        </Link>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div>
            <p className="flex items-center gap-2 font-semibold text-foreground">
              <Compass className="h-4 w-4" aria-hidden /> NouveauCap
            </p>
            <p className="mt-1 max-w-md">
              Le GPS de votre immigration au Canada. Parcours personnalisé, échéances,
              outils gratuits — en français.
            </p>
          </div>
          <nav className="flex flex-col gap-2">
            <Link href="/guides" className="hover:text-foreground">Guides pratiques</Link>
            <Link href="/simulateur-crs" className="hover:text-foreground">Simulateur de score CRS</Link>
            <Link href="/quiz-citoyennete" className="hover:text-foreground">Quiz de citoyenneté</Link>
            <Link href="/temoignages" className="hover:text-foreground">Programme bêta</Link>
            <Link href="/app" className="hover:text-foreground">Connexion</Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs leading-relaxed">
          NouveauCap fournit de l&apos;information et des outils d&apos;organisation, pas des conseils
          en immigration au sens de la loi canadienne. Pour un avis sur votre dossier, consultez un
          consultant réglementé (CRIC) ou un avocat. Vérifiez toujours les informations auprès
          d&apos;IRCC et des organismes provinciaux. © {new Date().getFullYear()} NouveauCap.
        </p>
      </div>
    </footer>
  )
}
