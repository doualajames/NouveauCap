'use client'

import { useEffect } from 'react'
import { track } from '@/lib/track'

// Émet un page_view au montage. Placé dans le chrome public → couvre toutes les pages publiques.
export function PageView({ source }: { source?: string }) {
  useEffect(() => {
    track('page_view', { source })
  }, [source])
  return null
}
