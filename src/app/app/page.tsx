'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { t, type ImmigrationStatus, type Language, type Province, type Task, useAppStore } from '@/lib/stores/app-store'
import { AlertCircle, Briefcase, Building, Calendar, CheckCircle2, ChevronLeft, ChevronRight, Crown, ExternalLink, FileText, Globe, GraduationCap, Heart, Home, ListChecks, Loader2, LogOut, MapPin, Menu, Plane, Settings, Shield, Sparkles, User, Users, Wallet, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { countries, immigrationStatuses, modules, provinces, sectors } from '@/lib/app-data'
import { AdminModule } from '@/components/modules/admin-module'
import { CommunityModule } from '@/components/modules/community-module'
import { DashboardHome } from '@/components/modules/dashboard'
import { EmploymentModule } from '@/components/modules/employment-module'
import { FinanceModule } from '@/components/modules/finance-module'
import { HealthModule } from '@/components/modules/health-module'
import { HousingModule } from '@/components/modules/housing-module'
import { ImmigrationModule } from '@/components/modules/immigration-module'
import { ProfileModule } from '@/components/modules/profile-module'
import { ProvinceModule } from '@/components/modules/province-module'

export default function NouveauCapApp() {
  const {
    user, isAuthenticated, currentView, setCurrentView,
    onboardingStep, setOnboardingStep, onboardingData, setOnboardingData,
    language, setLanguage, tasks, setTasks, updateTaskStatus,
    activeModule, setActiveModule, authMode, setAuthMode,
    completeOnboarding, logout
  } = useAppStore()

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [success, setSuccess] = useState('')
  const [isHydrated, setIsHydrated] = useState(true) // Start hydrated on client

  // Task detail modal
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [taskModalOpen, setTaskModalOpen] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (res.ok) {
          const data = await res.json()
          if (data.user) {
            useAppStore.setState({ 
              user: data.user, 
              isAuthenticated: true 
            })
            if (data.user.onboardingCompleted) {
              setCurrentView('dashboard')
            } else {
              setCurrentView('onboarding')
            }
          }
        }
      } catch (e) {
        console.error('Session check failed', e)
      }
    }
    
    // Only check session if not already authenticated
    if (!isAuthenticated) {
      checkSession()
    }
  }, []) // Run once on mount

  // Fetch user profile from database when authenticated
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.id) return
      try {
        const res = await fetch(`/api/user-data?action=get-profile&userId=${user.id}`)
        const data = await res.json()
        if (data.user) {
          useAppStore.setState({ user: data.user })
        }
      } catch (e) {
        console.error('Failed to fetch user profile', e)
      }
    }
    
    if (isAuthenticated && user?.id) {
      fetchUserProfile()
    }
  }, [isAuthenticated, user?.id])

  // Fetch tasks when authenticated
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.id) return
      try {
        // First refresh task descriptions (in case they're missing)
        await fetch('/api/tasks/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        })
        
        // Then fetch updated tasks
        const res = await fetch(`/api/onboarding?userId=${user.id}`)
        const data = await res.json()
        if (data.tasks) setTasks(data.tasks)
      } catch (e) {
        console.error('Failed to fetch tasks', e)
      }
    }
    
    if (isAuthenticated && user?.id) {
      fetchTasks()
    }
  }, [isAuthenticated, user?.id, setTasks])

  // Auth handler
  const handleAuth = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: authMode === 'signIn' ? 'signin' : 'signup',
          email,
          password,
          name
        })
      })
      
      const data = await res.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        useAppStore.setState({ 
          user: data.user, 
          isAuthenticated: true,
          currentView: data.user.onboardingCompleted ? 'dashboard' : 'onboarding'
        })
        setEmail('')
        setPassword('')
        setName('')
      }
    } catch (e) {
      setError('Une erreur est survenue')
    }
    
    setIsLoading(false)
  }

  // Onboarding complete
  const handleOnboardingComplete = async () => {
    // Get fresh user state from store (in case of stale closure)
    const currentUser = useAppStore.getState().user
    
    if (!currentUser?.id) {
      setError(language === 'fr' 
        ? 'Erreur: Utilisateur non connecté. Veuillez vous reconnecter.' 
        : 'Error: User not logged in. Please log in again.')
      return
    }
    
    // Validate required fields
    if (!onboardingData.immigrationStatus) {
      setError(language === 'fr' 
        ? 'Veuillez sélectionner votre statut d\'immigration.' 
        : 'Please select your immigration status.')
      return
    }
    if (!onboardingData.province) {
      setError(language === 'fr' 
        ? 'Veuillez sélectionner votre province.' 
        : 'Please select your province.')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          onboardingData
        })
      })
      
      const data = await res.json()
      
      if (data.success) {
        useAppStore.setState({ user: data.user })
        if (data.tasks) setTasks(data.tasks)
        completeOnboarding()
        setSuccess(language === 'fr' ? 'Profil complété avec succès!' : 'Profile completed successfully!')
      } else {
        setError(data.error || (language === 'fr' 
          ? 'Une erreur est survenue lors de la sauvegarde.' 
          : 'An error occurred while saving.'))
      }
    } catch (e) {
      console.error('Onboarding error', e)
      setError(language === 'fr' 
        ? 'Erreur de connexion. Veuillez réessayer.' 
        : 'Connection error. Please try again.')
    }
    
    setIsLoading(false)
  }

  // Task status update
  const handleTaskUpdate = async (taskId: string, status: Task['status']) => {
    updateTaskStatus(taskId, status)
    try {
      await fetch('/api/onboarding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, status })
      })
      setSuccess(language === 'fr' ? 'Tâche mise à jour!' : 'Task updated!')
      setTimeout(() => setSuccess(''), 2000)
    } catch (e) {
      console.error('Task update error', e)
    }
  }

  // Calculate progress
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0

  // ==================== HYDRATION LOADING ====================
  // Show loading while hydrating from localStorage to prevent flash
  // Added fallback timeout to prevent infinite loading
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg shadow-red-500/30">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    )
  }

  // ==================== RENDER LANDING ====================
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        {/* Background Pattern & Orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
        </div>

        {/* Header */}
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">NouveauCap</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="rounded-xl gap-1.5" onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}>
                <Globe className="w-4 h-4" />
                {language === 'fr' ? 'EN' : 'FR'}
              </Button>
              <Button className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/20" onClick={() => { setCurrentView('auth'); setAuthMode('signIn') }}>
                {t('auth.signIn', language)}
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-4 py-2 mb-6">
                  <Sparkles className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-red-700">
                    {language === 'fr' ? 'Nouveau au Canada? On vous accompagne!' : 'New to Canada? We guide you!'}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                  {language === 'fr' ? 'Votre nouveau départ' : 'Your new beginning'}
                  <span className="block bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                    {language === 'fr' ? 'au Canada commence ici' : 'in Canada starts here'}
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                  {language === 'fr'
                    ? 'NouveauCap vous guide à travers toutes les étapes de votre installation: immigration, emploi, santé, finance et plus encore.'
                    : 'NouveauCap guides you through every step of your settlement: immigration, employment, health, finance and more.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8 h-14 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-xl shadow-red-500/30 gap-2" onClick={() => { setCurrentView('auth'); setAuthMode('signUp') }}>
                    {t('auth.createAccount', language)}
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-xl border-2 hover:bg-gray-50 gap-2" onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}>
                    <Globe className="w-5 h-5" />
                    {language === 'fr' ? 'Continue in English' : 'Continuer en français'}
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-bold shadow-md">
                        {['JD', 'MK', 'SL', 'AR', 'PT'][i-1]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">+5,000 {language === 'fr' ? 'utilisateurs' : 'users'}</p>
                    <p className="text-sm text-gray-500">{language === 'fr' ? 'nous font confiance' : 'trust us'}</p>
                  </div>
                </div>
              </div>

              {/* Illustration / Dashboard Preview */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-3xl bg-gradient-to-br from-red-500 to-red-600 p-1 shadow-2xl shadow-red-500/30">
                  <div className="rounded-[22px] bg-white p-6">
                    {/* Mini Dashboard Preview */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="h-6 w-24 rounded-lg bg-gray-100" />
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-red-600" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: Shield, label: 'Immigration', value: '75%', color: 'from-purple-500 to-pink-500' },
                          { icon: Briefcase, label: 'Emploi', value: '3', color: 'from-green-500 to-emerald-500' },
                          { icon: Heart, label: 'Santé', value: 'Active', color: 'from-red-500 to-rose-500' },
                          { icon: Wallet, label: 'Finance', value: 'Setup', color: 'from-amber-500 to-orange-500' },
                        ].map((item, i) => (
                          <div key={i} className="rounded-xl bg-gray-50 p-3">
                            <div className={`inline-flex rounded-lg bg-gradient-to-br ${item.color} p-1.5 mb-2 shadow-md`}>
                              <item.icon className="h-3 w-3 text-white" />
                            </div>
                            <p className="text-xs text-gray-500">{item.label}</p>
                            <p className="font-semibold text-gray-900">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="h-16 rounded-xl bg-gray-50 flex items-center px-4 gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{language === 'fr' ? 'Tâche complétée!' : 'Task completed!'}</p>
                          <p className="text-xs text-gray-500">{language === 'fr' ? 'Demande NAS envoyée' : 'SIN application sent'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -left-8 top-1/4 rounded-xl bg-white p-3 shadow-xl border border-gray-100 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{language === 'fr' ? 'CRS: 468' : 'CRS: 468'}</p>
                      <p className="text-[10px] text-green-600">+15 {language === 'fr' ? 'points' : 'points'}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 bottom-1/3 rounded-xl bg-white p-3 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{language === 'fr' ? 'RP Éligible' : 'PR Eligible'}</p>
                      <p className="text-[10px] text-gray-500">{language === 'fr' ? 'Express Entry' : 'Express Entry'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'fr' ? 'Tout ce dont vous avez besoin' : 'Everything you need'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'fr' 
                  ? 'Une plateforme complète pour vous accompagner à chaque étape de votre installation'
                  : 'A complete platform to accompany you at every step of your settlement'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: language === 'fr' ? 'Immigration' : 'Immigration', desc: language === 'fr' ? 'Suivi de permis, simulateurs CRS, alertes de dates limites' : 'Permit tracking, CRS simulators, deadline alerts', color: 'from-purple-500 to-pink-500', badge: language === 'fr' ? 'Populaire' : 'Popular' },
                { icon: Briefcase, title: language === 'fr' ? 'Emploi' : 'Employment', desc: language === 'fr' ? 'Optimisation CV IA, préparation entretiens, offres ciblées' : 'AI CV optimization, interview prep, targeted offers', color: 'from-green-500 to-emerald-500' },
                { icon: Building, title: language === 'fr' ? 'Logement' : 'Housing', desc: language === 'fr' ? 'Guides locatifs, calculateur budget, conseils premiers locataires' : 'Rental guides, budget calculator, first renter tips', color: 'from-blue-500 to-cyan-500' },
                { icon: Wallet, title: language === 'fr' ? 'Finances' : 'Finance', desc: language === 'fr' ? 'Comparateur bancaire, guide du crédit, outils budgétaires' : 'Bank comparator, credit guide, budgeting tools', color: 'from-amber-500 to-orange-500' },
                { icon: Heart, title: language === 'fr' ? 'Santé' : 'Health', desc: language === 'fr' ? 'Assurance maladie, annuaire cliniques, rendez-vous médicaux' : 'Health insurance, clinic directory, medical appointments', color: 'from-red-500 to-rose-500', badge: language === 'fr' ? 'Nouveau' : 'New' },
                { icon: Users, title: language === 'fr' ? 'Communauté' : 'Community', desc: language === 'fr' ? 'Forum, événements locaux, programme de mentorat' : 'Forum, local events, mentorship program', color: 'from-indigo-500 to-violet-500' },
              ].map((feature, i) => (
                <div 
                  key={i} 
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
                  
                  <div className={`w-12 h-12 rounded-xl mb-4 bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    {feature.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                  
                  <div className="mt-4 flex items-center text-sm font-medium text-gray-400 transition-colors group-hover:text-red-500">
                    {language === 'fr' ? 'Explorer' : 'Explore'}
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 to-red-600 p-8 md:p-12 shadow-2xl shadow-red-500/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {language === 'fr' ? 'Prêt à commencer votre aventure?' : 'Ready to start your adventure?'}
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto">
                  {language === 'fr' 
                    ? 'Rejoignez des milliers de nouveaux arrivants qui ont fait confiance à NouveauCap pour leur installation.'
                    : 'Join thousands of newcomers who trusted NouveauCap for their settlement.'}
                </p>
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 h-14 rounded-xl shadow-xl gap-2" onClick={() => { setCurrentView('auth'); setAuthMode('signUp') }}>
                  {t('auth.createAccount', language)}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t bg-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md shadow-red-500/30">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">NouveauCap</span>
            </div>
            <p className="text-gray-500 text-sm">© 2025 NouveauCap. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <a href="#" className="hover:text-gray-900 transition-colors">{language === 'fr' ? 'Confidentialité' : 'Privacy'}</a>
              <a href="#" className="hover:text-gray-900 transition-colors">{language === 'fr' ? 'Conditions' : 'Terms'}</a>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // ==================== RENDER AUTH ====================
  if (currentView === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/30">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">
              {authMode === 'signIn' ? t('auth.welcomeBack', language) : t('auth.joinUs', language)}
            </CardTitle>
            <CardDescription>
              {authMode === 'signIn' 
                ? (language === 'fr' ? 'Connectez-vous à votre compte' : 'Sign in to your account')
                : (language === 'fr' ? 'Créez votre compte gratuit' : 'Create your free account')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {authMode === 'signUp' && (
              <div className="space-y-2">
                <Label htmlFor="name">{language === 'fr' ? 'Nom complet' : 'Full name'}</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jean Dupont" />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email', language)}</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jean@exemple.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password', language)}</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            
            <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30" onClick={handleAuth} disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {authMode === 'signIn' ? t('auth.signIn', language) : t('auth.signUp', language)}
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              {authMode === 'signIn' ? (
                <>
                  {t('auth.noAccount', language)}{' '}
                  <Button variant="link" className="p-0 h-auto" onClick={() => setAuthMode('signUp')}>
                    {t('auth.createAccount', language)}
                  </Button>
                </>
              ) : (
                <>
                  {t('auth.hasAccount', language)}{' '}
                  <Button variant="link" className="p-0 h-auto" onClick={() => setAuthMode('signIn')}>
                    {t('auth.signIn', language)}
                  </Button>
                </>
              )}
            </div>
            
            <Separator />
            
            <Button variant="outline" className="w-full" onClick={() => setCurrentView('landing')}>
              {t('common.back', language)}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ==================== RENDER ONBOARDING ====================
  if (currentView === 'onboarding') {
    // Dynamic steps based on immigration status
    const isForeignStudent = onboardingData.immigrationStatus === 'FOREIGN_STUDENT'
    const isTemporaryResident = ['FOREIGN_STUDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT'].includes(onboardingData.immigrationStatus || '')
    
    // Foreign students have an extra step for country of origin
    // Flow: Status -> Country (students only) -> Province -> Arrival -> Documents -> Sector -> Language -> Family
    const totalSteps = isForeignStudent ? 8 : isTemporaryResident ? 7 : 6
    const progressPercent = ((onboardingStep + 1) / totalSteps) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>{t('onboarding.step', language)} {onboardingStep + 1} {t('onboarding.of', language)} {totalSteps}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {onboardingStep === 0 && t('onboarding.status.title', language)}
                {onboardingStep === 1 && isForeignStudent && (language === 'fr' ? '🌍 Votre pays d\'origine' : '🌍 Your country of origin')}
                {onboardingStep === 1 && !isForeignStudent && t('onboarding.province.title', language)}
                {onboardingStep === 2 && isForeignStudent && t('onboarding.province.title', language)}
                {onboardingStep === 2 && !isForeignStudent && t('onboarding.arrival.title', language)}
                {onboardingStep === 3 && isForeignStudent && t('onboarding.arrival.title', language)}
                {onboardingStep === 3 && !isForeignStudent && isTemporaryResident && (language === 'fr' ? '📅 Dates d\'expiration de vos documents' : '📅 Document expiry dates')}
                {onboardingStep === 3 && !isTemporaryResident && t('onboarding.sector.title', language)}
                {onboardingStep === 4 && isForeignStudent && (language === 'fr' ? '📅 Dates d\'expiration de vos documents' : '📅 Document expiry dates')}
                {onboardingStep === 4 && !isForeignStudent && isTemporaryResident && t('onboarding.sector.title', language)}
                {onboardingStep === 4 && !isTemporaryResident && t('onboarding.language.title', language)}
                {onboardingStep === 5 && isForeignStudent && t('onboarding.sector.title', language)}
                {onboardingStep === 5 && !isForeignStudent && isTemporaryResident && t('onboarding.language.title', language)}
                {onboardingStep === 5 && !isTemporaryResident && t('onboarding.family.title', language)}
                {onboardingStep === 6 && isForeignStudent && t('onboarding.language.title', language)}
                {onboardingStep === 6 && !isForeignStudent && isTemporaryResident && t('onboarding.family.title', language)}
                {onboardingStep === 7 && isForeignStudent && t('onboarding.family.title', language)}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {/* Success Alert */}
              {success && (
                <Alert className="bg-green-50 border-green-200 text-green-800 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              
              {onboardingStep === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {immigrationStatuses.map((status) => {
                    const Icon = status.icon
                    const isSelected = onboardingData.immigrationStatus === status.code
                    const label = t(`status.${status.code}`, language)
                    
                    return (
                      <Card 
                        key={status.code}
                        className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' : ''}`}
                        onClick={() => setOnboardingData({ immigrationStatus: status.code as ImmigrationStatus })}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className={`w-12 h-12 ${status.color} rounded-xl flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{label}</p>
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-500 ml-auto" />}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}

              {/* Country of Origin - Step 1 for Foreign Students only */}
              {onboardingStep === 1 && isForeignStudent && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>{language === 'fr' ? '💡 Pourquoi cette question?' : '💡 Why this question?'}</strong>
                      <br />
                      {language === 'fr' 
                        ? 'Votre pays d\'origine détermine votre admissibilité à l\'assurance maladie provinciale (ex: RAMQ au Québec pour les étudiants français).'
                        : 'Your country of origin determines your eligibility for provincial health insurance (e.g., RAMQ in Quebec for French students).'}
                    </p>
                  </div>
                  
                  {/* Countries with Quebec Agreement */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      {language === 'fr' ? '🏥 Pays avec entente de sécurité sociale (RAMQ éligible au Québec):' : '🏥 Countries with social security agreement (RAMQ eligible in Quebec):'}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {countries.filter(c => c.quebecAgreement).map((country) => {
                        const isSelected = onboardingData.countryOfOrigin === country.code
                        return (
                          <Button
                            key={country.code}
                            variant={isSelected ? 'default' : 'outline'}
                            className={`h-auto py-2 justify-start ${isSelected ? 'bg-green-500 hover:bg-green-600' : ''}`}
                            onClick={() => setOnboardingData({ countryOfOrigin: country.code })}
                          >
                            <span className="mr-2">{country.flag}</span>
                            <span className="text-sm">{country.name}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Other Countries */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {language === 'fr' ? 'Autres pays:' : 'Other countries:'}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                      {countries.filter(c => !c.quebecAgreement).map((country) => {
                        const isSelected = onboardingData.countryOfOrigin === country.code
                        return (
                          <Button
                            key={country.code}
                            variant={isSelected ? 'default' : 'outline'}
                            className="h-auto py-2 justify-start text-left"
                            onClick={() => setOnboardingData({ countryOfOrigin: country.code })}
                          >
                            <span className="mr-2">{country.flag}</span>
                            <span className="text-sm truncate">{country.name}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" />}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Province - Step 1 for non-students, Step 2 for foreign students */}
              {((onboardingStep === 1 && !isForeignStudent) || (onboardingStep === 2 && isForeignStudent)) && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {provinces.map((province) => {
                    const isSelected = onboardingData.province === province.code
                    return (
                      <Button
                        key={province.code}
                        variant={isSelected ? 'default' : 'outline'}
                        className="h-auto py-3"
                        onClick={() => setOnboardingData({ province: province.code })}
                      >
                        {language === 'fr' ? province.name : province.nameEn}
                        {isSelected && <CheckCircle2 className="w-4 h-4 ml-2" />}
                      </Button>
                    )
                  })}
                </div>
              )}

              {/* Arrival Date - Step 2 for non-students, Step 3 for foreign students */}
              {((onboardingStep === 2 && !isForeignStudent) || (onboardingStep === 3 && isForeignStudent)) && (
                <div className="space-y-4">
                  <Input
                    type="date"
                    value={onboardingData.arrivalDate || ''}
                    onChange={(e) => setOnboardingData({ arrivalDate: e.target.value })}
                    className="text-lg py-6"
                  />
                </div>
              )}

              {/* Document Expiry - Step 3 for non-student temp residents, Step 4 for foreign students */}
              {((onboardingStep === 3 && isTemporaryResident && !isForeignStudent) || (onboardingStep === 4 && isForeignStudent)) && (
                <div className="space-y-6">
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>{language === 'fr' ? '💡 Pourquoi ces dates?' : '💡 Why these dates?'}</strong>
                      <br />
                      {language === 'fr' 
                        ? 'Nous vous enverrons des rappels avant l\'expiration de vos documents pour que vous puissiez les renouveler à temps.'
                        : 'We\'ll send you reminders before your documents expire so you can renew them on time.'}
                    </p>
                  </div>
                  
                  {/* Study Permit Expiry */}
                  {onboardingData.immigrationStatus === 'FOREIGN_STUDENT' && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-blue-500" />
                        {language === 'fr' ? 'Date d\'expiration du permis d\'études' : 'Study permit expiry date'}
                      </Label>
                      <Input
                        type="date"
                        value={onboardingData.studyPermitExpiry || ''}
                        onChange={(e) => setOnboardingData({ studyPermitExpiry: e.target.value })}
                        className="text-lg py-4"
                      />
                      <p className="text-xs text-gray-500">
                        {language === 'fr' 
                          ? '📅 Renouvellement recommandé 90 jours avant l\'expiration'
                          : '📅 Renewal recommended 90 days before expiry'}
                      </p>
                    </div>
                  )}

                  {/* Work Permit Expiry */}
                  {(onboardingData.immigrationStatus === 'OPEN_WORK_PERMIT' || onboardingData.immigrationStatus === 'CLOSED_WORK_PERMIT') && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-purple-500" />
                        {language === 'fr' ? 'Date d\'expiration du permis de travail' : 'Work permit expiry date'}
                      </Label>
                      <Input
                        type="date"
                        value={onboardingData.workPermitExpiry || ''}
                        onChange={(e) => setOnboardingData({ workPermitExpiry: e.target.value })}
                        className="text-lg py-4"
                      />
                      <p className="text-xs text-gray-500">
                        {language === 'fr' 
                          ? '📅 Renouvellement recommandé 90 jours avant l\'expiration'
                          : '📅 Renewal recommended 90 days before expiry'}
                      </p>
                    </div>
                  )}

                  {/* Passport Expiry */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-500" />
                      {language === 'fr' ? 'Date d\'expiration du passeport' : 'Passport expiry date'}
                    </Label>
                    <Input
                      type="date"
                      value={onboardingData.passportExpiry || ''}
                      onChange={(e) => setOnboardingData({ passportExpiry: e.target.value })}
                      className="text-lg py-4"
                    />
                    <p className="text-xs text-gray-500">
                      {language === 'fr' 
                        ? '🛂 Un passeport valide est requis pour toute demande de permis'
                        : '🛂 A valid passport is required for all permit applications'}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>{language === 'fr' ? '⚠️ Statut implicite' : '⚠️ Implied status'}</strong>
                      <br />
                      {language === 'fr' 
                        ? 'Si vous appliquez avant l\'expiration, vous pouvez continuer à travailler/étudier pendant le traitement de votre demande.'
                        : 'If you apply before expiry, you can continue to work/study while your application is being processed.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Professional Sector - Dynamic position */}
              {((isForeignStudent && onboardingStep === 5) || (isTemporaryResident && !isForeignStudent && onboardingStep === 4) || (!isTemporaryResident && onboardingStep === 3)) && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {sectors.map((sector) => {
                    const isSelected = onboardingData.professionalSector === sector.code
                    return (
                      <Button
                        key={sector.code}
                        variant={isSelected ? 'default' : 'outline'}
                        className="h-auto py-3"
                        onClick={() => setOnboardingData({ professionalSector: sector.code })}
                      >
                        {language === 'fr' ? sector.label : sector.labelEn}
                        {isSelected && <CheckCircle2 className="w-4 h-4 ml-2" />}
                      </Button>
                    )
                  })}
                </div>
              )}

              {/* Language - Dynamic position */}
              {((isForeignStudent && onboardingStep === 6) || (isTemporaryResident && !isForeignStudent && onboardingStep === 5) || (!isTemporaryResident && onboardingStep === 4)) && (
                <div className="flex gap-4 justify-center">
                  {['fr', 'en'].map((lang) => {
                    const isSelected = onboardingData.preferredLanguage === lang
                    return (
                      <Card
                        key={lang}
                        className={`cursor-pointer transition-all hover:shadow-md flex-1 max-w-[200px] ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={() => {
                          setOnboardingData({ preferredLanguage: lang as Language })
                          setLanguage(lang as Language)
                        }}
                      >
                        <CardContent className="p-6 text-center">
                          <Globe className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                          <p className="font-medium text-lg">{lang === 'fr' ? 'Français' : 'English'}</p>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-500 mt-2 mx-auto" />}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}

              {/* Family Status - Dynamic position */}
              {((isForeignStudent && onboardingStep === 7) || (isTemporaryResident && !isForeignStudent && onboardingStep === 6) || (!isTemporaryResident && onboardingStep === 5)) && (
                <div className="flex flex-col gap-3">
                  {[
                    { code: 'SINGLE', label: language === 'fr' ? 'Célibataire' : 'Single' },
                    { code: 'COUPLE', label: language === 'fr' ? 'En couple' : 'In a relationship' },
                    { code: 'FAMILY_WITH_CHILDREN', label: language === 'fr' ? 'Famille avec enfants' : 'Family with children' },
                  ].map((status) => {
                    const isSelected = onboardingData.familyStatus === status.code
                    return (
                      <Button
                        key={status.code}
                        variant={isSelected ? 'default' : 'outline'}
                        className="h-auto py-4 justify-start px-6"
                        onClick={() => setOnboardingData({ familyStatus: status.code as 'SINGLE' | 'COUPLE' | 'FAMILY_WITH_CHILDREN' })}
                      >
                        {status.label}
                        {isSelected && <CheckCircle2 className="w-5 h-5 ml-auto" />}
                      </Button>
                    )
                  })}
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setOnboardingStep(Math.max(0, onboardingStep - 1))}
                  disabled={onboardingStep === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  {t('common.previous', language)}
                </Button>
                
                {onboardingStep < totalSteps - 1 ? (
                  <Button
                    onClick={() => setOnboardingStep(onboardingStep + 1)}
                    disabled={
                      (onboardingStep === 0 && !onboardingData.immigrationStatus) ||
                      (onboardingStep === 1 && !onboardingData.province)
                    }
                  >
                    {t('common.next', language)}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleOnboardingComplete} disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {t('onboarding.complete.startExploring', language)}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // ==================== RENDER DASHBOARD ====================
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 w-full bg-white/95 backdrop-blur-xl z-50 border-b border-gray-200 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">NouveauCap</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}>
                <Globe className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl animate-slide-in" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user?.name || user?.email}</p>
                    <p className="text-sm text-gray-500">{user?.subscriptionTier === 'FREE' ? t('subscription.free.name', language) : user?.subscriptionTier}</p>
                  </div>
                </div>
              </div>
              <div className="p-2 space-y-1">
                <button onClick={() => { setActiveModule(null); setMobileMenuOpen(false) }} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <Home className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">{t('dashboard.title', language)}</span>
                </button>
                {modules.map(m => {
                  const Icon = m.icon
                  return (
                    <button key={m.id} onClick={() => { setActiveModule(m.id); setMobileMenuOpen(false) }} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <Icon className={`w-5 h-5 ${m.color}`} />
                      <span className="font-medium text-gray-700">{t(`modules.${m.id}.title`, language)}</span>
                    </button>
                  )
                })}
                <Separator className="my-2" />
                <button onClick={() => { setActiveModule('profile'); setMobileMenuOpen(false) }} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">{language === 'fr' ? 'Mon Profil' : 'My Profile'}</span>
                </button>
                <Separator className="my-2" />
                <button onClick={() => { logout(); setCurrentView('landing') }} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 transition-colors text-red-600">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">{t('auth.signOut', language)}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex">
          {/* Desktop Sidebar - Nouveau Design */}
          <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-200 min-h-screen fixed">
            {/* Logo Header */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">NouveauCap</span>
                <p className="text-xs text-gray-500 truncate">{language === 'fr' ? 'Votre guide au Canada' : 'Your guide to Canada'}</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {/* Main Section */}
              <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{language === 'fr' ? 'Principal' : 'Main'}</p>
              
              <button
                onClick={() => setActiveModule(null)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-50 ${activeModule === null ? 'bg-gradient-to-r from-gray-50 to-white shadow-sm border border-gray-100' : ''}`}
              >
                <div className={`relative shrink-0 rounded-lg p-2 transition-all ${activeModule === null ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>
                  <Home className="w-5 h-5" />
                </div>
                <span className={`flex-1 text-left font-medium ${activeModule === null ? 'text-gray-900' : 'text-gray-600'}`}>
                  {t('dashboard.title', language)}
                </span>
              </button>
              
              {modules.filter(m => m.id !== 'admin').map(m => {
                const Icon = m.icon
                const gradients: Record<string, string> = {
                  'province': 'from-cyan-500 to-teal-500',
                  'immigration': 'from-purple-500 to-pink-500',
                  'employment': 'from-green-500 to-emerald-500',
                  'housing': 'from-violet-500 to-purple-500',
                  'finance': 'from-amber-500 to-orange-500',
                  'health': 'from-red-500 to-rose-500',
                  'community': 'from-indigo-500 to-violet-500',
                }
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveModule(m.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-50 ${activeModule === m.id ? 'bg-gradient-to-r from-gray-50 to-white shadow-sm border border-gray-100' : ''}`}
                  >
                    <div className={`relative shrink-0 rounded-lg p-2 transition-all ${activeModule === m.id ? `bg-gradient-to-br ${gradients[m.id] || 'from-gray-500 to-gray-600'} text-white shadow-lg` : 'bg-gray-100 text-gray-600'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`flex-1 text-left font-medium ${activeModule === m.id ? 'text-gray-900' : 'text-gray-600'}`}>
                      {t(`modules.${m.id}.title`, language)}
                    </span>
                  </button>
                )
              })}

              {/* Tools Section */}
              <p className="px-3 py-2 mt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{language === 'fr' ? 'Outils' : 'Tools'}</p>
              
              <button
                onClick={() => setActiveModule('admin')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-50 ${activeModule === 'admin' ? 'bg-gradient-to-r from-gray-50 to-white shadow-sm border border-gray-100' : ''}`}
              >
                <div className={`relative shrink-0 rounded-lg p-2 transition-all ${activeModule === 'admin' ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>
                  <Settings className="w-5 h-5" />
                </div>
                <span className={`flex-1 text-left font-medium ${activeModule === 'admin' ? 'text-gray-900' : 'text-gray-600'}`}>
                  {t('modules.admin.title', language)}
                </span>
              </button>
            </nav>
            
            {/* Premium Banner */}
            {user?.subscriptionTier === 'FREE' && (
              <div className="mx-3 mb-3 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold text-amber-900">{language === 'fr' ? 'Passez Premium' : 'Go Premium'}</span>
                </div>
                <p className="text-xs text-amber-700 mb-3">
                  {language === 'fr' ? 'Accédez à tous les outils et support prioritaire' : 'Access all tools and priority support'}
                </p>
                <Button size="sm" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  {language === 'fr' ? 'Découvrir' : 'Discover'}
                </Button>
              </div>
            )}
            
            {/* User Profile Footer */}
            <div className="p-3 border-t border-gray-100">
              <div
                onClick={() => setActiveModule('profile')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-gray-50 cursor-pointer ${activeModule === 'profile' ? 'bg-gray-50' : ''}`}
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shrink-0 flex items-center justify-center text-white font-semibold shadow-md">
                  {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name || user?.email}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">
                      {user?.subscriptionTier === 'FREE' ? t('subscription.free.name', language) : user?.subscriptionTier}
                    </span>
                    {user?.subscriptionTier !== 'FREE' && <Crown className="h-3 w-3 text-amber-500" />}
                  </div>
                </div>
                <button 
                  className="shrink-0 p-2 rounded-lg hover:bg-red-50 transition-colors" 
                  onClick={(e) => { e.stopPropagation(); logout(); setCurrentView('landing') }}
                  title={t('auth.signOut', language)}
                >
                  <LogOut className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 lg:ml-72 pt-16 lg:pt-0">
            {success && (
              <div className="fixed top-20 right-4 z-50">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <AlertDescription className="text-green-700">{success}</AlertDescription>
                </Alert>
              </div>
            )}
            
            {/* Dashboard Home */}
            {activeModule === null && (
              <DashboardHome
                language={language}
                user={user}
                tasks={tasks}
                progress={progress}
                completedTasks={completedTasks}
                onTaskClick={(task) => { setSelectedTask(task); setTaskModalOpen(true) }}
                onTaskUpdate={handleTaskUpdate}
                onModuleClick={setActiveModule}
              />
            )}

            {/* Province Module */}
            {activeModule === 'province' && (
              <ProvinceModule
                language={language}
                user={user}
              />
            )}

            {/* Immigration Module */}
            {activeModule === 'immigration' && (
              <ImmigrationModule
                language={language}
                user={user}
                tasks={tasks}
                onTaskUpdate={handleTaskUpdate}
              />
            )}

            {/* Employment Module */}
            {activeModule === 'employment' && (
              <EmploymentModule
                language={language}
                user={user}
              />
            )}

            {/* Housing Module */}
            {activeModule === 'housing' && (
              <HousingModule
                language={language}
                user={user}
              />
            )}

            {/* Finance Module */}
            {activeModule === 'finance' && (
              <FinanceModule
                language={language}
                user={user}
              />
            )}

            {/* Health Module */}
            {activeModule === 'health' && (
              <HealthModule
                language={language}
                user={user}
                onNavigate={setActiveModule}
              />
            )}

            {/* Community Module */}
            {activeModule === 'community' && (
              <CommunityModule
                language={language}
                user={user}
              />
            )}

            {/* Admin Module */}
            {activeModule === 'admin' && (
              <AdminModule language={language} />
            )}

            {/* Profile Module */}
            {activeModule === 'profile' && (
              <ProfileModule
                language={language}
                user={user}
                onUpdate={async (updatedUser) => {
                  // Update user in store immediately for UI responsiveness
                  useAppStore.setState({ user: updatedUser })
                  setSuccess(language === 'fr' ? 'Profil mis à jour! Rechargement...' : 'Profile updated! Reloading...')
                  
                  // Reload all data from database to ensure consistency
                  try {
                    // 1. Reload user profile
                    const profileRes = await fetch(`/api/user-data?action=get-profile&userId=${updatedUser.id}`)
                    const profileData = await profileRes.json()
                    
                    // 2. Refresh task descriptions (in case they changed based on new profile)
                    await fetch('/api/tasks/refresh', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ userId: updatedUser.id })
                    })
                    
                    // 3. Reload tasks
                    const tasksRes = await fetch(`/api/onboarding?userId=${updatedUser.id}`)
                    const tasksData = await tasksRes.json()
                    
                    // 4. Update store with fresh data
                    if (profileData.user) {
                      useAppStore.setState({ user: profileData.user })
                    }
                    if (tasksData.tasks) {
                      setTasks(tasksData.tasks)
                    }
                    
                    setSuccess(language === 'fr' ? '✅ Profil et données rechargés avec succès!' : '✅ Profile and data reloaded successfully!')
                  } catch (e) {
                    console.error('Failed to reload data after profile update', e)
                  }
                  
                  setTimeout(() => setSuccess(''), 3000)
                }}
              />
            )}
          </main>
        </div>

        {/* Task Detail Modal */}
        <Dialog open={taskModalOpen} onOpenChange={setTaskModalOpen}>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedTask?.status === 'COMPLETED' 
                    ? 'bg-green-500' 
                    : selectedTask?.priority === 'HIGH' 
                    ? 'bg-red-500' 
                    : 'bg-blue-500'
                }`}>
                  {selectedTask?.status === 'COMPLETED' 
                    ? <CheckCircle2 className="w-5 h-5 text-white" />
                    : <ListChecks className="w-5 h-5 text-white" />
                  }
                </div>
                <div>
                  <DialogTitle className="text-xl">
                    {language === 'fr' ? selectedTask?.title : (selectedTask?.titleEn || selectedTask?.title)}
                  </DialogTitle>
                  <Badge className="mt-1" variant="outline">{t(`modules.${selectedTask?.category?.toLowerCase()}.title`, language)}</Badge>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Task Type Banner */}
              <div className={`p-3 rounded-lg border ${
                selectedTask?.status === 'COMPLETED' 
                  ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' 
                  : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
              }`}>
                <p className={`text-sm font-medium ${
                  selectedTask?.status === 'COMPLETED' 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-blue-700 dark:text-blue-300'
                }`}>
                  {selectedTask?.status === 'COMPLETED' 
                    ? (language === 'fr' ? '✅ Cette tâche est complétée!' : '✅ This task is completed!')
                    : (language === 'fr' 
                      ? '📌 Action à effectuer - Consultez les informations ci-dessous, puis marquez comme terminé une fois accompli.'
                      : '📌 Action to complete - Review the information below, then mark as done once completed.')
                  }
                </p>
              </div>

              {/* Description */}
              {(selectedTask?.description || selectedTask?.descriptionEn) ? (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans">
                    {language === 'fr' 
                      ? selectedTask?.description 
                      : (selectedTask?.descriptionEn || selectedTask?.description)}
                  </pre>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {language === 'fr' 
                      ? '📋 Aucune description détaillée pour cette tâche. Complétez l\'action et marquez-la comme terminée.'
                      : '📋 No detailed description for this task. Complete the action and mark it as done.'}
                  </p>
                </div>
              )}
              
              {/* Source Link */}
              {selectedTask?.source && (
                <a 
                  href={selectedTask.source} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-medium">{language === 'fr' ? 'Accéder à la source officielle' : 'Access official source'}</span>
                </a>
              )}
              
              {/* Priority & Required Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant={selectedTask?.priority === 'HIGH' ? 'destructive' : selectedTask?.priority === 'MEDIUM' ? 'default' : 'secondary'}>
                  {selectedTask?.priority === 'HIGH' ? (language === 'fr' ? '🔥 Haute priorité' : '🔥 High priority') : 
                   selectedTask?.priority === 'MEDIUM' ? (language === 'fr' ? '⚡ Priorité moyenne' : '⚡ Medium priority') :
                   (language === 'fr' ? '📋 Basse priorité' : '📋 Low priority')}
                </Badge>
                {selectedTask?.isRequired && (
                  <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                    {language === 'fr' ? '⚠️ Obligatoire' : '⚠️ Required'}
                  </Badge>
                )}
              </div>

              {/* Due Date */}
              {selectedTask?.dueDate && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {language === 'fr' ? 'Échéance: ' : 'Due: '}
                    {new Date(selectedTask.dueDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {selectedTask?.status !== 'COMPLETED' && (
                <Button 
                  onClick={() => { handleTaskUpdate(selectedTask!.id, 'COMPLETED'); setTaskModalOpen(false) }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Marquer comme terminé' : 'Mark as completed'}
                </Button>
              )}
              {selectedTask?.status === 'COMPLETED' && (
                <div className="flex items-center gap-2 text-green-600 p-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">{language === 'fr' ? 'Tâche complétée!' : 'Task completed!'}</span>
                </div>
              )}
              <Button variant="outline" onClick={() => setTaskModalOpen(false)}>
                {t('common.close', language)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return null
}

// ==================== DASHBOARD HOME COMPONENT ====================
