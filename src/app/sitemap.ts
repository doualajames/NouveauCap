import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://nouveaucap.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/simulateur-crs`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/quiz-citoyennete`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pack-atterrissage`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
