import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <span aria-hidden>🍁</span> NouveauCap
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <Link href="/simulateur-crs" className="hover:text-gray-900">Simulateur CRS</Link>
          <Link href="/quiz-citoyennete" className="hover:text-gray-900">Quiz citoyenneté</Link>
          <Link href="/pack-atterrissage" className="hover:text-gray-900">Pack Atterrissage</Link>
        </nav>
        <Link
          href="/app"
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          Mon espace
        </Link>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-gray-500">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div>
            <p className="font-semibold text-gray-900">🍁 NouveauCap</p>
            <p className="mt-1 max-w-md">
              Le GPS de votre immigration au Canada. Parcours personnalisé, échéances,
              outils gratuits — en français.
            </p>
          </div>
          <nav className="flex flex-col gap-2">
            <Link href="/simulateur-crs" className="hover:text-gray-900">Simulateur de score CRS</Link>
            <Link href="/quiz-citoyennete" className="hover:text-gray-900">Quiz de citoyenneté</Link>
            <Link href="/pack-atterrissage" className="hover:text-gray-900">Pack Atterrissage</Link>
            <Link href="/app" className="hover:text-gray-900">Connexion</Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-gray-200 pt-6 text-xs leading-relaxed">
          NouveauCap fournit de l&apos;information et des outils d&apos;organisation, pas des conseils
          en immigration au sens de la loi canadienne. Pour un avis sur votre dossier, consultez un
          consultant réglementé (CRIC) ou un avocat. Vérifiez toujours les informations auprès
          d&apos;IRCC et des organismes provinciaux. © {new Date().getFullYear()} NouveauCap.
        </p>
      </div>
    </footer>
  )
}
