'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FormInput, FormSelect, ActionButton, ProgressSteps, StatusBadge } from '@/components/ui-extended'
import {
  User, MapPin, Briefcase, GraduationCap, Shield, CheckCircle2,
  ChevronRight, ChevronLeft, Building2, Globe, Heart, Wallet,
  Plane, FileText, Calendar, Sparkles
} from 'lucide-react'

// =====================================================
// TYPES
// =====================================================

interface OnboardingData {
  // Étape 1: Informations personnelles
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  dateOfBirth?: string
  countryOfOrigin?: string
  
  // Étape 2: Statut d'immigration
  immigrationStatus?: 'PERMANENT_RESIDENT' | 'FOREIGN_STUDENT' | 'OPEN_WORK_PERMIT' | 'CLOSED_WORK_PERMIT'
  arrivalDate?: string
  visaExpiryDate?: string
  
  // Étape 3: Localisation
  province?: string
  city?: string
  postalCode?: string
  
  // Étape 4: Emploi & Éducation
  sector?: string
  educationLevel?: string
  languages?: string[]
  workExperience?: string
  
  // Étape 5: Objectifs
  goals?: string[]
  interests?: string[]
}

interface OnboardingFlowProps {
  onComplete?: (data: OnboardingData) => void
  language?: 'fr' | 'en'
}

// =====================================================
// DONNÉES
// =====================================================

const onboardingSteps = [
  { id: 'personal', label: 'Profil', labelEn: 'Profile' },
  { id: 'immigration', label: 'Immigration', labelEn: 'Immigration' },
  { id: 'location', label: 'Localisation', labelEn: 'Location' },
  { id: 'employment', label: 'Emploi', labelEn: 'Employment' },
  { id: 'goals', label: 'Objectifs', labelEn: 'Goals' },
]

const countries = [
  { value: 'FR', label: 'France 🇫🇷' },
  { value: 'BE', label: 'Belgique 🇧🇪' },
  { value: 'CH', label: 'Suisse 🇨🇭' },
  { value: 'MA', label: 'Maroc 🇲🇦' },
  { value: 'TN', label: 'Tunisie 🇹🇳' },
  { value: 'DZ', label: 'Algérie 🇩🇿' },
  { value: 'SN', label: 'Sénégal 🇸🇳' },
  { value: 'CI', label: 'Côte d\'Ivoire 🇨🇮' },
  { value: 'CM', label: 'Cameroun 🇨🇲' },
  { value: 'CD', label: 'RDC 🇨🇩' },
  { value: 'US', label: 'États-Unis 🇺🇸' },
  { value: 'CN', label: 'Chine 🇨🇳' },
  { value: 'IN', label: 'Inde 🇮🇳' },
  { value: 'BR', label: 'Brésil 🇧🇷' },
  { value: 'OTHER', label: 'Autre pays 🌍' },
]

const provinces = [
  { value: 'QC', label: 'Québec' },
  { value: 'ON', label: 'Ontario' },
  { value: 'BC', label: 'Colombie-Britannique' },
  { value: 'AB', label: 'Alberta' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NS', label: 'Nouvelle-Écosse' },
  { value: 'NB', label: 'Nouveau-Brunswick' },
  { value: 'PE', label: 'Île-du-Prince-Édouard' },
  { value: 'NL', label: 'Terre-Neuve-et-Labrador' },
]

const immigrationStatuses = [
  { 
    value: 'PERMANENT_RESIDENT', 
    label: 'Résident permanent',
    description: 'Vous avez le statut de résident permanent du Canada',
    icon: Shield,
    color: 'text-green-600 bg-green-100'
  },
  { 
    value: 'FOREIGN_STUDENT', 
    label: 'Étudiant étranger',
    description: 'Vous étudiez au Canada avec un permis d\'études',
    icon: GraduationCap,
    color: 'text-blue-600 bg-blue-100'
  },
  { 
    value: 'OPEN_WORK_PERMIT', 
    label: 'Permis de travail ouvert',
    description: 'Vous pouvez travailler pour n\'importe quel employeur',
    icon: Briefcase,
    color: 'text-purple-600 bg-purple-100'
  },
  { 
    value: 'CLOSED_WORK_PERMIT', 
    label: 'Permis de travail fermé',
    description: 'Vous travaillez pour un employeur spécifique',
    icon: Building2,
    color: 'text-amber-600 bg-amber-100'
  },
]

const sectors = [
  { value: 'technology', label: 'Technologie / TI' },
  { value: 'finance', label: 'Finance / Comptabilité' },
  { value: 'health', label: 'Santé / Médical' },
  { value: 'education', label: 'Éducation' },
  { value: 'engineering', label: 'Ingénierie' },
  { value: 'trades', label: 'Métiers spécialisés' },
  { value: 'hospitality', label: 'Hôtellerie / Restauration' },
  { value: 'retail', label: 'Commerce de détail' },
  { value: 'other', label: 'Autre' },
]

const goals = [
  { id: 'citizenship', label: 'Obtenir la citoyenneté', icon: FileText },
  { id: 'employment', label: 'Trouver un emploi', icon: Briefcase },
  { id: 'education', label: 'Poursuivre mes études', icon: GraduationCap },
  { id: 'business', label: 'Créer une entreprise', icon: Building2 },
  { id: 'family', label: 'Faire venir ma famille', icon: Heart },
  { id: 'language', label: 'Améliorer mon français/anglais', icon: Globe },
]

// =====================================================
// ONBOARDING FLOW COMPONENT
// =====================================================

export function OnboardingFlow({ onComplete, language = 'fr' }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [data, setData] = React.useState<OnboardingData>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const t = (fr: string, en: string) => (language === 'fr' ? fr : en)

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onComplete?.(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-md">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg gradient-text">NouveauCap</h1>
                <p className="text-xs text-gray-400">{t('Configuration initiale', 'Initial Setup')}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {t('Étape', 'Step')} {currentStep + 1} {t('sur', 'of')} {onboardingSteps.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <Progress value={progress} className="h-2 bg-gray-100" />
          
          {/* Step Indicators */}
          <div className="mt-4">
            <ProgressSteps
              steps={onboardingSteps.map(s => ({ id: s.id, label: t(s.label, s.labelEn) }))}
              currentStep={currentStep}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center p-4 pt-8">
        <Card className="w-full max-w-2xl border-0 shadow-xl animate-scale-in">
          <CardContent className="p-8">
            {currentStep === 0 && (
              <PersonalInfoStep data={data} updateData={updateData} language={language} />
            )}
            {currentStep === 1 && (
              <ImmigrationStep data={data} updateData={updateData} language={language} />
            )}
            {currentStep === 2 && (
              <LocationStep data={data} updateData={updateData} language={language} />
            )}
            {currentStep === 3 && (
              <EmploymentStep data={data} updateData={updateData} language={language} />
            )}
            {currentStep === 4 && (
              <GoalsStep data={data} updateData={updateData} language={language} />
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('Précédent', 'Previous')}
          </Button>
          <ActionButton
            onClick={handleNext}
            loading={isSubmitting}
            icon={currentStep === onboardingSteps.length - 1 ? CheckCircle2 : ChevronRight}
            iconPosition="right"
          >
            {currentStep === onboardingSteps.length - 1
              ? t('Terminer', 'Complete')
              : t('Suivant', 'Next')}
          </ActionButton>
        </div>
      </footer>
    </div>
  )
}

// =====================================================
// STEP COMPONENTS
// =====================================================

function PersonalInfoStep({ 
  data, 
  updateData, 
  language 
}: { 
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  language: 'fr' | 'en'
}) {
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('Parlons de vous', 'Let\'s talk about you')}
        </h2>
        <p className="text-gray-500 mt-2">
          {t('Ces informations nous aident à personnaliser votre expérience', 'This information helps us personalize your experience')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label={t('Prénom', 'First Name')}
          placeholder={t('Votre prénom', 'Your first name')}
          value={data.firstName || ''}
          onChange={(e) => updateData({ firstName: e.target.value })}
          required
        />
        <FormInput
          label={t('Nom', 'Last Name')}
          placeholder={t('Votre nom', 'Your last name')}
          value={data.lastName || ''}
          onChange={(e) => updateData({ lastName: e.target.value })}
          required
        />
      </div>

      <FormInput
        label={t('Courriel', 'Email')}
        type="email"
        placeholder="exemple@email.com"
        value={data.email || ''}
        onChange={(e) => updateData({ email: e.target.value })}
        required
      />

      <FormInput
        label={t('Téléphone', 'Phone')}
        type="tel"
        placeholder="+1 (514) 123-4567"
        value={data.phone || ''}
        onChange={(e) => updateData({ phone: e.target.value })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label={t('Date de naissance', 'Date of Birth')}
          type="date"
          value={data.dateOfBirth || ''}
          onChange={(e) => updateData({ dateOfBirth: e.target.value })}
        />
        <FormSelect
          label={t('Pays d\'origine', 'Country of Origin')}
          options={countries}
          value={data.countryOfOrigin || ''}
          onChange={(e) => updateData({ countryOfOrigin: e.target.value })}
          placeholder={t('Sélectionnez', 'Select')}
        />
      </div>
    </div>
  )
}

function ImmigrationStep({ 
  data, 
  updateData, 
  language 
}: { 
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  language: 'fr' | 'en'
}) {
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Plane className="w-8 h-8 text-secondary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('Votre statut au Canada', 'Your status in Canada')}
        </h2>
        <p className="text-gray-500 mt-2">
          {t('Cette information nous permet de vous montrer les ressources pertinentes', 'This helps us show you relevant resources')}
        </p>
      </div>

      <div className="space-y-3">
        {immigrationStatuses.map((status) => {
          const Icon = status.icon
          const isSelected = data.immigrationStatus === status.value

          return (
            <button
              key={status.value}
              type="button"
              onClick={() => updateData({ immigrationStatus: status.value as any })}
              className={cn(
                'w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                'hover:border-primary-300 hover:bg-primary-50/50',
                isSelected
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500/20'
                  : 'border-gray-200'
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', status.color)}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{status.label}</h3>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-primary-500" />}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{status.description}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {data.immigrationStatus && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 animate-slide-up">
          <FormInput
            label={t('Date d\'arrivée', 'Arrival Date')}
            type="date"
            value={data.arrivalDate || ''}
            onChange={(e) => updateData({ arrivalDate: e.target.value })}
          />
          {data.immigrationStatus !== 'PERMANENT_RESIDENT' && (
            <FormInput
              label={t('Date d\'expiration du visa', 'Visa Expiry Date')}
              type="date"
              value={data.visaExpiryDate || ''}
              onChange={(e) => updateData({ visaExpiryDate: e.target.value })}
            />
          )}
        </div>
      )}
    </div>
  )
}

function LocationStep({ 
  data, 
  updateData, 
  language 
}: { 
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  language: 'fr' | 'en'
}) {
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('Où résidez-vous?', 'Where do you live?')}
        </h2>
        <p className="text-gray-500 mt-2">
          {t('Chaque province a ses propres programmes et services', 'Each province has its own programs and services')}
        </p>
      </div>

      <FormSelect
        label={t('Province', 'Province')}
        options={provinces}
        value={data.province || ''}
        onChange={(e) => updateData({ province: e.target.value })}
        placeholder={t('Sélectionnez votre province', 'Select your province')}
        required
      />

      <FormInput
        label={t('Ville', 'City')}
        placeholder={t('Votre ville', 'Your city')}
        value={data.city || ''}
        onChange={(e) => updateData({ city: e.target.value })}
      />

      <FormInput
        label={t('Code postal', 'Postal Code')}
        placeholder="A1A 1A1"
        value={data.postalCode || ''}
        onChange={(e) => updateData({ postalCode: e.target.value })}
        hint={t('Le code postal nous aide à trouver les services près de chez vous', 'Postal code helps us find services near you')}
      />

      {data.province && (
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 animate-slide-up">
          <p className="text-sm text-blue-700">
            <Sparkles className="w-4 h-4 inline mr-1" />
            {t(
              `Nous personnaliserons votre expérience pour ${provinces.find(p => p.value === data.province)?.label}`,
              `We'll personalize your experience for ${data.province}`
            )}
          </p>
        </div>
      )}
    </div>
  )
}

function EmploymentStep({ 
  data, 
  updateData, 
  language 
}: { 
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  language: 'fr' | 'en'
}) {
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('Votre parcours professionnel', 'Your professional journey')}
        </h2>
        <p className="text-gray-500 mt-2">
          {t('Pour mieux vous accompagner dans votre recherche d\'emploi', 'To better support your job search')}
        </p>
      </div>

      <FormSelect
        label={t('Secteur d\'activité', 'Industry')}
        options={sectors}
        value={data.sector || ''}
        onChange={(e) => updateData({ sector: e.target.value })}
        placeholder={t('Sélectionnez votre secteur', 'Select your industry')}
      />

      <FormSelect
        label={t('Niveau d\'études', 'Education Level')}
        options={[
          { value: 'highschool', label: t('Diplôme secondaire', 'High School Diploma') },
          { value: 'college', label: t('Collège/CEGEP', 'College/CEGEP') },
          { value: 'bachelor', label: t('Baccalauréat', 'Bachelor\'s Degree') },
          { value: 'master', label: t('Maîtrise', 'Master\'s Degree') },
          { value: 'phd', label: t('Doctorat', 'PhD') },
        ]}
        value={data.educationLevel || ''}
        onChange={(e) => updateData({ educationLevel: e.target.value })}
        placeholder={t('Sélectionnez', 'Select')}
      />

      <FormSelect
        label={t('Années d\'expérience', 'Years of Experience')}
        options={[
          { value: '0-1', label: '0-1 ' + t('an', 'year') },
          { value: '2-5', label: '2-5 ' + t('ans', 'years') },
          { value: '6-10', label: '6-10 ' + t('ans', 'years') },
          { value: '10+', label: '10+ ' + t('ans', 'years') },
        ]}
        value={data.workExperience || ''}
        onChange={(e) => updateData({ workExperience: e.target.value })}
        placeholder={t('Sélectionnez', 'Select')}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {t('Langues parlées', 'Languages Spoken')}
        </label>
        <div className="flex flex-wrap gap-2">
          {['Français', 'English', 'Español', 'العربية', '中文', 'हिन्दी', 'Other'].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                const current = data.languages || []
                const updated = current.includes(lang)
                  ? current.filter(l => l !== lang)
                  : [...current, lang]
                updateData({ languages: updated })
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                data.languages?.includes(lang)
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function GoalsStep({ 
  data, 
  updateData, 
  language 
}: { 
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  language: 'fr' | 'en'
}) {
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('Vos objectifs', 'Your Goals')}
        </h2>
        <p className="text-gray-500 mt-2">
          {t('Sélectionnez vos objectifs pour que nous puissions vous aider', 'Select your goals so we can help you achieve them')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {goals.map((goal) => {
          const Icon = goal.icon
          const isSelected = data.goals?.includes(goal.id)

          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => {
                const current = data.goals || []
                const updated = current.includes(goal.id)
                  ? current.filter(g => g !== goal.id)
                  : [...current, goal.id]
                updateData({ goals: updated })
              }}
              className={cn(
                'p-4 rounded-xl border-2 text-left transition-all duration-200',
                'hover:border-primary-300',
                isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  isSelected ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-500'
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={cn(
                  'font-medium',
                  isSelected ? 'text-primary-700' : 'text-gray-700'
                )}>
                  {goal.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-primary-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">
              {t('Vous êtes prêt(e)!', 'You\'re all set!')}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {t(
                'Nous créerons un tableau de bord personnalisé basé sur vos informations.',
                'We\'ll create a personalized dashboard based on your information.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingFlow
