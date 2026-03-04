'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/hooks/use-i18n'
import { SignInForm, SignUpForm } from './auth-forms'
import { MapPin, Globe } from 'lucide-react'

export function AuthContainer() {
  const { t, language, setLanguage } = useTranslation()
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          {language === 'fr' ? 'EN' : 'FR'}
        </Button>
      </div>

      {/* Logo and Title */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
            <MapPin className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            {t('app.name')}
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">{t('app.tagline')}</p>
      </div>

      {/* Auth Form */}
      {isSignUp ? <SignUpForm /> : <SignInForm />}

      {/* Toggle between Sign In and Sign Up */}
      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          {isSignUp ? t('auth.hasAccount') : t('auth.noAccount')}{' '}
          <Button
            variant="link"
            className="p-0 h-auto font-semibold text-red-600 hover:text-red-700"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? t('auth.signIn') : t('auth.signUp')}
          </Button>
        </p>
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl text-center">
        <div className="p-4">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-semibold mb-1">Immigration</h3>
          <p className="text-sm text-muted-foreground">
            {language === 'fr' 
              ? 'Guides personnalisés selon votre statut'
              : 'Personalized guides based on your status'}
          </p>
        </div>
        <div className="p-4">
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-1">Emploi</h3>
          <p className="text-sm text-muted-foreground">
            {language === 'fr' 
              ? 'Optimisation de CV avec l\'IA'
              : 'AI-powered CV optimization'}
          </p>
        </div>
        <div className="p-4">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-1">Communauté</h3>
          <p className="text-sm text-muted-foreground">
            {language === 'fr' 
              ? 'Forum et événements locaux'
              : 'Forum and local events'}
          </p>
        </div>
      </div>
    </div>
  )
}
