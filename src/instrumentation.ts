/**
 * Next.js Instrumentation — runs once at server startup.
 * Provides a safety-net polyfill for the Node.js runtime.
 * The primary polyfill lives in src/lib/server-polyfills.ts and is
 * imported directly by routes that need it (e.g. extract-cv-text).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('@/lib/server-polyfills')
  }
}
