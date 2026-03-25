import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export type ImmigrationStatus = 'PERMANENT_RESIDENT' | 'FOREIGN_STUDENT' | 'OPEN_WORK_PERMIT' | 'CLOSED_WORK_PERMIT'
export type Province = 'ON' | 'QC' | 'BC' | 'AB' | 'MB' | 'SK' | 'NS' | 'NB' | 'PE' | 'NL' | 'NT' | 'YT' | 'NU'
export type SubscriptionTier = 'FREE' | 'ESSENTIEL' | 'PREMIUM' | 'FAMILLE'
export type Language = 'fr' | 'en' | 'es' | 'zh' | 'ar' | 'tl'

export interface User {
  id: string
  email: string
  name?: string
  immigrationStatus?: ImmigrationStatus
  province?: Province
  postalCode?: string // Postal code for geolocation services
  arrivalDate?: string
  dateOfBirth?: string // Date of birth for CRS calculation
  professionalSector?: string
  preferredLanguage: Language
  familyStatus?: 'SINGLE' | 'COUPLE' | 'FAMILY_WITH_CHILDREN'
  countryOfOrigin?: string
  subscriptionTier: SubscriptionTier
  onboardingCompleted: boolean
  // Permit expiry dates
  studyPermitExpiry?: string
  workPermitExpiry?: string
  passportExpiry?: string
  visaExpiry?: string
}

export interface Task {
  id: string
  title: string
  titleEn?: string
  description?: string
  descriptionEn?: string
  category: 'IMMIGRATION' | 'EMPLOYMENT' | 'HOUSING' | 'FINANCE' | 'HEALTH' | 'COMMUNITY'
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED'
  dueDate?: string
  order: number
  isRequired: boolean
  source?: string
}

export interface Alert {
  id: string
  type: string
  title: string
  message: string
  dueDate: string
  isRead: boolean
}

// App State
interface AppState {
  // Auth
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Onboarding
  onboardingStep: number
  onboardingData: {
    immigrationStatus?: ImmigrationStatus
    province?: Province
    arrivalDate?: string
    professionalSector?: string
    preferredLanguage: Language
    familyStatus?: 'SINGLE' | 'COUPLE' | 'FAMILY_WITH_CHILDREN'
    countryOfOrigin?: string
    // Permit expiry dates
    studyPermitExpiry?: string
    workPermitExpiry?: string
    passportExpiry?: string
  }
  
  // Navigation
  currentView: 'landing' | 'auth' | 'onboarding' | 'dashboard' | 'module'
  activeModule: string | null
  authMode: 'signIn' | 'signUp'
  
  // Tasks
  tasks: Task[]
  alerts: Alert[]
  
  // Language
  language: Language
  
  // Actions
  setUser: (user: User | null) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  setLoading: (isLoading: boolean) => void
  setOnboardingStep: (step: number) => void
  setOnboardingData: (data: Partial<AppState['onboardingData']>) => void
  setCurrentView: (view: AppState['currentView']) => void
  setActiveModule: (module: string | null) => void
  setAuthMode: (mode: 'signIn' | 'signUp') => void
  setTasks: (tasks: Task[]) => void
  updateTaskStatus: (taskId: string, status: Task['status']) => void
  setAlerts: (alerts: Alert[]) => void
  markAlertRead: (alertId: string) => void
  setLanguage: (language: Language) => void
  resetOnboarding: () => void
  completeOnboarding: () => void
  logout: () => void
}

// Initial onboarding data
const initialOnboardingData = {
  immigrationStatus: undefined,
  province: undefined,
  arrivalDate: undefined,
  professionalSector: undefined,
  preferredLanguage: 'fr' as Language,
  familyStatus: undefined,
  countryOfOrigin: undefined,
  studyPermitExpiry: undefined,
  workPermitExpiry: undefined,
  passportExpiry: undefined,
}

// Create store with persistence
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      onboardingStep: 0,
      onboardingData: initialOnboardingData,
      currentView: 'landing',
      activeModule: null,
      authMode: 'signIn',
      tasks: [],
      alerts: [],
      language: 'fr',
      
      // Actions
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setLoading: (isLoading) => set({ isLoading }),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      setOnboardingData: (data) => set((state) => ({
        onboardingData: { ...state.onboardingData, ...data }
      })),
      setCurrentView: (view) => set({ currentView: view }),
      setActiveModule: (module) => set({ activeModule: module }),
      setAuthMode: (mode) => set({ authMode: mode }),
      setTasks: (tasks) => set({ tasks }),
      updateTaskStatus: (taskId, status) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === taskId ? { ...task, status } : task
        )
      })),
      setAlerts: (alerts) => set({ alerts }),
      markAlertRead: (alertId) => set((state) => ({
        alerts: state.alerts.map(alert =>
          alert.id === alertId ? { ...alert, isRead: true } : alert
        )
      })),
      setLanguage: (language) => set({ language }),
      resetOnboarding: () => set({
        onboardingStep: 0,
        onboardingData: initialOnboardingData
      }),
      completeOnboarding: () => {
        const state = get()
        set({
          onboardingStep: 7,
          currentView: 'dashboard',
          user: state.user ? {
            ...state.user,
            onboardingCompleted: true,
            immigrationStatus: state.onboardingData.immigrationStatus,
            province: state.onboardingData.province,
            arrivalDate: state.onboardingData.arrivalDate,
            professionalSector: state.onboardingData.professionalSector,
            preferredLanguage: state.onboardingData.preferredLanguage,
            familyStatus: state.onboardingData.familyStatus,
            countryOfOrigin: state.onboardingData.countryOfOrigin,
          } : null
        })
      },
      logout: () => set({
        user: null,
        isAuthenticated: false,
        currentView: 'landing',
        onboardingStep: 0,
        onboardingData: initialOnboardingData,
        activeModule: null,
        tasks: [],
        alerts: []
      })
    }),
    {
      name: 'nouveau-cap-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        onboardingData: state.onboardingData,
        language: state.language,
        tasks: state.tasks,
        currentView: state.currentView,
        onboardingStep: state.onboardingStep,
        activeModule: state.activeModule
      })
    }
  )
)

// Translation helper
import fr from '@/i18n/fr.json'
import en from '@/i18n/en.json'
import es from '@/i18n/es.json'
import zh from '@/i18n/zh.json'
import ar from '@/i18n/ar.json'
import tl from '@/i18n/tl.json'

const translations: Record<string, typeof fr> = { fr, en, es, zh, ar, tl }

export function t(key: string, language?: Language): string {
  const lang = language || useAppStore.getState().language
  const keys = key.split('.')
  let value: unknown = translations[lang]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return key // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key
}
