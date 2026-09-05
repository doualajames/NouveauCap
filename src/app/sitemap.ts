import type { MetadataRoute } from 'next'
import { guides } from '@/lib/guides/content'

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://nouveaucap.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const guidePages: MetadataRoute.Sitemap = guides.map(g => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: new Date(g.updated),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/simulateur-crs`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/quiz-citoyennete`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pack-atterrissage`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...guidePages,
  ]
}
