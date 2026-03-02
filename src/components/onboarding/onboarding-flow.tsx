'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useTranslation } from '@/hooks/use-i18n'
import { 
  useProfileStore, 
  useAuthStore, 
  useAppStore,
  ImmigrationStatus, 
  Province, 
  FamilyStatus,
  OnboardingData 
} from '@/lib/stores/app-store'
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Globe, 
  Users, 
  Target,
  Loader2 
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const TOTAL_STEPS = 7

const immigrationStatuses: ImmigrationStatus[] = [
  'PERMANENT_RESIDENT',
  'FOREIGN_STUDENT',
  'OPEN_WORK_PERMIT',
  'CLOSED_WORK_PERMIT',
]

const provinces: Province[] = [
  'ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'PE', 'NL', 'NT', 'YT', 'NU'
]

const familyStatuses: FamilyStatus[] = ['SINGLE', 'COUPLE', 'FAMILY_WITH_CHILDREN']

const professionalSectors = [
  { key: 'tech', fr: 'Technologie / IT', en: 'Technology / IT' },
  { key: 'healthcare', fr: 'Santé', en: 'Healthcare' },
  { key: 'finance', fr: 'Finance / Comptabilité', en: 'Finance / Accounting' },
  { key: 'education', fr: 'Éducation', en: 'Education' },
  { key: 'engineering', fr: 'Ingénierie', en: 'Engineering' },
  { key: 'hospitality', fr: 'Hôtellerie / Restauration', en: 'Hospitality / Food Service' },
  { key: 'retail', fr: 'Commerce de détail', en: 'Retail' },
  { key: 'manufacturing', fr: 'Fabrication', en: 'Manufacturing' },
  { key: 'construction', fr: 'Construction', en: 'Construction' },
  { key: 'other', fr: 'Autre', en: 'Other' },
]

const goals = [
  { key: 'work', fr: 'Trouver un emploi', en: 'Find a job' },
  { key: 'study', fr: 'Poursuivre mes études', en: 'Continue my studies' },
  { key: 'family', fr: 'Faire venir ma famille', en: 'Bring my family' },
  { key: 'business', fr: 'Créer une entreprise', en: 'Start a business' },
]

export function OnboardingFlow() {
  const { t, language } = useTranslation()
  const { toast } = useToast()
  const user = useAuthStore((state) => state.user)
  const onboardingData = useProfileStore((state) => state.onboardingData)
  const updateOnboardingStep = useProfileStore((state) => state.updateOnboardingStep)
  const updateOnboardingField = useProfileStore((state) => state.updateOnboardingField)
  const setOnboardingData = useProfileStore((state) => state.setOnboardingData)
  const setCurrentView = useAppStore((state) => state.setCurrentView)
  
  const [isLoading, setIsLoading] = useState(false)
  const [localData, setLocalData] = useState<OnboardingData>(onboardingData || {
    immigrationStatus: null,
    province: null,
    city: null,
    arrivalDate: null,
    plannedArrivalDate: null,
    alreadyInCanada: false,
    professionalSector: null,
    yearsOfExperience: null,
    educationLevel: null,
    preferredLanguage: language,
    needsFrenchClasses: false,
    needsEnglishClasses: false,
    familyStatus: null,
    numberOfChildren: null,
    primaryGoal: null,
    currentStep: 1,
  })
  
  const currentStep = localData.currentStep || 1
  const progress = (currentStep / TOTAL_STEPS) * 100

  const updateField = <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => {
    setLocalData(prev => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!localData.immigrationStatus
      case 2:
        return !!localData.province
      case 3:
        return localData.alreadyInCanada ? !!localData.arrivalDate : !!localData.plannedArrivalDate
      case 4:
        return true // Professional info is optional
      case 5:
        return true // Preferences are optional
      case 6:
        return !!localData.familyStatus
      case 7:
        return true // Goals are optional
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      updateField('currentStep', currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      updateField('currentStep', currentStep - 1)
    }
  }

  const handleComplete = async () => {
    if (!user) return
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...localData,
          completed: true,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save onboarding')
      }

      setOnboardingData({ ...localData, currentStep: TOTAL_STEPS })
      setCurrentView('dashboard')
      
      toast({
        title: t('common.success'),
        description: language === 'fr' 
          ? 'Bienvenue ! Votre profil est configuré.'
          : 'Welcome! Your profile is set up.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: t('errors.generic'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const stepIcons = [MapPin, MapPin, Calendar, Briefcase, Globe, Users, Target]
  const StepIcon = stepIcons[currentStep - 1]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto w-full mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {t('onboarding.step')} {currentStep} {t('onboarding.of')} {TOTAL_STEPS}
          </span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <Card className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <StepIcon className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <CardTitle>{t(`onboarding.steps.${['immigration', 'province', 'arrival', 'professional', 'preferences', 'family', 'goals'][currentStep - 1]}.title`)}</CardTitle>
              <CardDescription>{t(`onboarding.steps.${['immigration', 'province', 'arrival', 'professional', 'preferences', 'family', 'goals'][currentStep - 1]}.subtitle`)}</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1">
          {/* Step 1: Immigration Status */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <RadioGroup
                value={localData.immigrationStatus || ''}
                onValueChange={(value) => updateField('immigrationStatus', value as ImmigrationStatus)}
                className="grid gap-3"
              >
                {immigrationStatuses.map((status) => (
                  <Label
                    key={status}
                    htmlFor={status}
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      localData.immigrationStatus === status 
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/30' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <RadioGroupItem value={status} id={status} className="sr-only" />
                    <div className="flex-1">
                      <p className="font-medium">{t(`onboarding.immigrationStatus.${status.toLowerCase()}`)}</p>
                    </div>
                    {localData.immigrationStatus === status && (
                      <Check className="w-5 h-5 text-red-600" />
                    )}
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 2: Province */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <RadioGroup
                value={localData.province || ''}
                onValueChange={(value) => updateField('province', value as Province)}
                className="grid grid-cols-2 md:grid-cols-3 gap-3"
              >
                {provinces.map((province) => (
                  <Label
                    key={province}
                    htmlFor={province}
                    className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      localData.province === province 
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/30' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <RadioGroupItem value={province} id={province} className="sr-only" />
                    <div className="text-center">
                      <p className="font-medium">{t(`onboarding.provinces.${province}`)}</p>
                      <p className="text-xs text-muted-foreground">{province}</p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 3: Arrival */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alreadyInCanada"
                  checked={localData.alreadyInCanada}
                  onCheckedChange={(checked) => updateField('alreadyInCanada', !!checked)}
                />
                <Label htmlFor="alreadyInCanada" className="font-normal">
                  {language === 'fr' ? 'Je suis déjà au Canada' : 'I am already in Canada'}
                </Label>
              </div>

              {localData.alreadyInCanada ? (
                <div className="space-y-2">
                  <Label>{language === 'fr' ? 'Date d\'arrivée' : 'Arrival Date'}</Label>
                  <Input
                    type="date"
                    value={localData.arrivalDate || ''}
                    onChange={(e) => updateField('arrivalDate', e.target.value)}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>{language === 'fr' ? 'Date d\'arrivée prévue' : 'Planned Arrival Date'}</Label>
                  <Input
                    type="date"
                    value={localData.plannedArrivalDate || ''}
                    onChange={(e) => updateField('plannedArrivalDate', e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>{language === 'fr' ? 'Ville (optionnel)' : 'City (optional)'}</Label>
                <Input
                  type="text"
                  value={localData.city || ''}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder={language === 'fr' ? 'Montréal, Toronto, Vancouver...' : 'Montreal, Toronto, Vancouver...'}
                />
              </div>
            </div>
          )}

          {/* Step 4: Professional */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>{language === 'fr' ? 'Secteur professionnel' : 'Professional Sector'}</Label>
                <RadioGroup
                  value={localData.professionalSector || ''}
                  onValueChange={(value) => updateField('professionalSector', value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2"
                >
                  {professionalSectors.map((sector) => (
                    <Label
                      key={sector.key}
                      htmlFor={sector.key}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors text-sm ${
                        localData.professionalSector === sector.key 
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/30' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <RadioGroupItem value={sector.key} id={sector.key} className="sr-only" />
                      <span>{language === 'fr' ? sector.fr : sector.en}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>{language === 'fr' ? 'Années d\'expérience' : 'Years of Experience'}</Label>
                <Input
                  type="number"
                  min="0"
                  max="50"
                  value={localData.yearsOfExperience || ''}
                  onChange={(e) => updateField('yearsOfExperience', parseInt(e.target.value) || null)}
                />
              </div>
            </div>
          )}

          {/* Step 5: Preferences */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>{language === 'fr' ? 'Langue préférée' : 'Preferred Language'}</Label>
                <RadioGroup
                  value={localData.preferredLanguage || 'fr'}
                  onValueChange={(value) => updateField('preferredLanguage', value as 'fr' | 'en')}
                  className="flex gap-4"
                >
                  <Label
                    htmlFor="lang-fr"
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      localData.preferredLanguage === 'fr' 
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/30' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <RadioGroupItem value="fr" id="lang-fr" className="sr-only" />
                    <span className="font-medium">Français</span>
                  </Label>
                  <Label
                    htmlFor="lang-en"
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      localData.preferredLanguage === 'en' 
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/30' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <RadioGroupItem value="en" id="lang-en" className="sr-only" />
                    <span className="font-medium">English</span>
                  </Label>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>{language === 'fr' ? 'Cours de langue souhaités' : 'Language Classes Needed'}</Label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="frenchClasses"
                      checked={localData.needsFrenchClasses}
                      onCheckedChange={(checked) => updateField('needsFrenchClasses', !!checked)}
                    />
                    <Label htmlFor="frenchClasses" className="font-normal">
                      {language === 'fr' ? 'Cours de français' : 'French classes'}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="englishClasses"
                      checked={localData.needsEnglishClasses}
                      onCheckedChange={(checked) => updateField('needsEnglishClasses', !!checked)}
                    />
                    <Label htmlFor="englishClasses" className="font-normal">
                      {language === 'fr' ? 'Cours d\'anglais' : 'English classes'}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Family */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>{language === 'fr' ? 'Situation familiale' : 'Family Status'}</Label>
                <RadioGroup
                  value={localData.familyStatus || ''}
                  onValueChange={(value) => updateField('familyStatus', value as FamilyStatus)}
                  className="grid gap-3"
                >
                  {familyStatuses.map((status) => (
                    <Label
                      key={status}
                      htmlFor={status}
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                        localData.familyStatus === status 
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/30' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <RadioGroupItem value={status} id={status} className="sr-only" />
                      <p className="font-medium">{t(`onboarding.familyStatus.${status.toLowerCase()}`)}</p>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              {localData.familyStatus === 'FAMILY_WITH_CHILDREN' && (
                <div className="space-y-2">
                  <Label>{language === 'fr' ? 'Nombre d\'enfants' : 'Number of Children'}</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={localData.numberOfChildren || ''}
                    onChange={(e) => updateField('numberOfChildren', parseInt(e.target.value) || null)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 7: Goals */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>{language === 'fr' ? 'Objectif principal' : 'Primary Goal'}</Label>
                <RadioGroup
                  value={localData.primaryGoal || ''}
                  onValueChange={(value) => updateField('primaryGoal', value)}
                  className="grid gap-3"
                >
                  {goals.map((goal) => (
                    <Label
                      key={goal.key}
                      htmlFor={goal.key}
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                        localData.primaryGoal === goal.key 
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/30' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <RadioGroupItem value={goal.key} id={goal.key} className="sr-only" />
                      <p className="font-medium">{language === 'fr' ? goal.fr : goal.en}</p>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t('onboarding.previous')}
          </Button>
          
          {currentStep === TOTAL_STEPS ? (
            <Button
              onClick={handleComplete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <Check className="w-4 h-4 mr-2" />
              {t('onboarding.complete')}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-red-600 hover:bg-red-700"
            >
              {t('onboarding.next')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
