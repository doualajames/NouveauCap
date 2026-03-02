import { useAppStore } from '@/lib/stores/app-store'
import fr from '@/i18n/fr.json'
import en from '@/i18n/en.json'

const translations = { fr, en }

type TranslationKey = string

// Get nested value from object using dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj) as string | undefined
}

export function useTranslation() {
  const language = useAppStore((state) => state.language)
  
  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const translation = getNestedValue(translations[language] as unknown as Record<string, unknown>, key)
    
    if (!translation) {
      // Fallback to French if key not found in current language
      const fallback = getNestedValue(translations.fr as unknown as Record<string, unknown>, key)
      if (!fallback) {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
      return fallback
    }
    
    if (params) {
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replace(new RegExp(`{${k}}`, 'g'), String(v)),
        translation
      )
    }
    
    return translation
  }
  
  const setLanguage = useAppStore((state) => state.setLanguage)
  
  return { t, language, setLanguage }
}

export type { TranslationKey }
