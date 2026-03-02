'use client'

import * as React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from '@/hooks/use-i18n'
import { useAuthStore } from '@/lib/stores/app-store'
import { useAppStore } from '@/lib/stores/app-store'
import { useProfileStore, defaultOnboardingData } from '@/lib/stores/app-store'
import { Loader2, Mail, Lock, User } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AuthFormProps {
  onSuccess?: () => void
}

export function SignInForm({ onSuccess }: AuthFormProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const setUser = useAuthStore((state) => state.setUser)
  const setLoading = useAuthStore((state) => state.setLoading)
  const setProfile = useProfileStore((state) => state.setProfile)
  const setOnboardingData = useProfileStore((state) => state.setOnboardingData)
  const setCurrentView = useAppStore((state) => state.setCurrentView)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t('auth.invalidCredentials'))
      }

      setUser(data.user)
      setProfile(data.profile)
      
      if (data.onboarding) {
        setOnboardingData({
          immigrationStatus: data.onboarding.immigrationStatus,
          province: data.onboarding.province,
          city: data.onboarding.city,
          arrivalDate: data.onboarding.arrivalDate,
          plannedArrivalDate: data.onboarding.plannedArrivalDate,
          alreadyInCanada: data.onboarding.alreadyInCanada,
          professionalSector: data.onboarding.professionalSector,
          yearsOfExperience: data.onboarding.yearsOfExperience,
          educationLevel: data.onboarding.educationLevel,
          preferredLanguage: data.onboarding.preferredLanguage || 'fr',
          needsFrenchClasses: data.onboarding.needsFrenchClasses,
          needsEnglishClasses: data.onboarding.needsEnglishClasses,
          familyStatus: data.onboarding.familyStatus,
          numberOfChildren: data.onboarding.numberOfChildren,
          primaryGoal: data.onboarding.primaryGoal,
          currentStep: data.onboarding.currentStep || 1,
        })
      }

      // Check if onboarding is complete
      if (data.profile?.onboardingCompleted) {
        setCurrentView('dashboard')
      } else {
        setCurrentView('onboarding')
      }

      toast({
        title: t('common.success'),
        description: t('auth.welcomeBack') + ', ' + (data.user.name || data.user.email) + '!',
      })

      onSuccess?.()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: error instanceof Error ? error.message : t('errors.generic'),
      })
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{t('auth.signIn')}</CardTitle>
        <CardDescription className="text-center">{t('auth.signInSubtitle')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="nom@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('auth.signIn')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export function SignUpForm({ onSuccess }: AuthFormProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const setUser = useAuthStore((state) => state.setUser)
  const setProfile = useProfileStore((state) => state.setProfile)
  const setOnboardingData = useProfileStore((state) => state.setOnboardingData)
  const setCurrentView = useAppStore((state) => state.setCurrentView)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: t('auth.passwordMismatch'),
      })
      return
    }

    if (password.length < 8) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: t('auth.passwordRequirements'),
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t('errors.generic'))
      }

      setUser(data.user)
      setProfile({
        immigrationStatus: null,
        province: null,
        arrivalDate: null,
        professionalSector: null,
        preferredLanguage: 'fr',
        familyStatus: null,
        onboardingCompleted: false,
        profileCompletion: 0,
      })
      setOnboardingData(defaultOnboardingData)
      setCurrentView('onboarding')

      toast({
        title: t('common.success'),
        description: t('auth.registerSuccess'),
      })

      onSuccess?.()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: error instanceof Error ? error.message : t('errors.generic'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{t('auth.signUp')}</CardTitle>
        <CardDescription className="text-center">{t('auth.signUpSubtitle')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('auth.name')}</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Jean Dupont"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">{t('auth.email')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-email"
                type="email"
                placeholder="nom@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">{t('auth.password')}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">{t('auth.passwordRequirements')}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">{t('auth.confirmPassword')}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('auth.createAccount')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
