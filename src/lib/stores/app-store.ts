import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export type ImmigrationStatus = 'PERMANENT_RESIDENT' | 'FOREIGN_STUDENT' | 'OPEN_WORK_PERMIT' | 'CLOSED_WORK_PERMIT'
export type Province = 'ON' | 'QC' | 'BC' | 'AB' | 'MB' | 'SK' | 'NS' | 'NB' | 'PE' | 'NL' | 'NT' | 'YT' | 'NU'
export type SubscriptionTier = 'FREE' | 'ESSENTIEL' | 'PREMIUM' | 'FAMILLE'
export type Language = 'fr' | 'en'

// Auth Store Types
interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
}

// Profile Store Types
interface ProfileState {
  immigrationStatus: ImmigrationStatus | null
  province: Province | null
  city: string | null
  arrivalDate: string | null
  plannedArrivalDate: string | null
  alreadyInCanada: boolean
  professionalSector: string | null
  yearsOfExperience: number | null
  educationLevel: string | null
  preferredLanguage: Language
  needsFrenchClasses: boolean
  needsEnglishClasses: boolean
  familyStatus: FamilyStatus | null
  numberOfChildren: number | null
  primaryGoal: string | null
  onboardingCompleted: boolean
  profileCompletion: number
  onboardingData: OnboardingData
  setProfile: (profile: Partial<ProfileState>) => void
  setOnboardingData: (data: Partial<OnboardingData>) => void
  updateOnboardingStep: (step: number) => void
  updateOnboardingField: <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => void
}

// Default onboarding data
export const defaultOnboardingData = {
  immigrationStatus: undefined as ImmigrationStatus | undefined,
  province: undefined as Province | undefined,
  city: undefined as string | undefined,
  arrivalDate: undefined as string | undefined,
  plannedArrivalDate: undefined as string | undefined,
  alreadyInCanada: true,
  professionalSector: undefined as string | undefined,
  yearsOfExperience: undefined as number | undefined,
  educationLevel: undefined as string | undefined,
  preferredLanguage: 'fr' as Language,
  needsFrenchClasses: false,
  needsEnglishClasses: false,
  familyStatus: undefined as 'SINGLE' | 'COUPLE' | 'FAMILY_WITH_CHILDREN' | undefined,
  numberOfChildren: undefined as number | undefined,
  primaryGoal: undefined as string | undefined,
  currentStep: 1,
}

// Export FamilyStatus type
export type FamilyStatus = 'SINGLE' | 'COUPLE' | 'FAMILY_WITH_CHILDREN'

// Export OnboardingData type
export type OnboardingData = typeof defaultOnboardingData

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

const translations = { fr, en }

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

// Auth Store (for authentication)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isLoading: false })
    }),
    {
      name: 'nouveau-cap-auth'
    }
  )
)

// Profile Store (for user profile data)
export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      immigrationStatus: null,
      province: null,
      city: null,
      arrivalDate: null,
      plannedArrivalDate: null,
      alreadyInCanada: true,
      professionalSector: null,
      yearsOfExperience: null,
      educationLevel: null,
      preferredLanguage: 'fr',
      needsFrenchClasses: false,
      needsEnglishClasses: false,
      familyStatus: null,
      numberOfChildren: null,
      primaryGoal: null,
      onboardingCompleted: false,
      profileCompletion: 0,
      onboardingData: defaultOnboardingData,
      setProfile: (profile) => set((state) => ({ ...state, ...profile })),
      setOnboardingData: (data) => set((state) => ({
        onboardingData: { ...state.onboardingData, ...data }
      })),
      updateOnboardingStep: (step) => set((state) => ({
        onboardingData: { ...state.onboardingData, currentStep: step }
      })),
      updateOnboardingField: (field, value) => set((state) => ({
        onboardingData: { ...state.onboardingData, [field]: value }
      }))
    }),
    {
      name: 'nouveau-cap-profile'
    }
  )
)
