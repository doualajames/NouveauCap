'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Smartphone, Globe, Shield, ChevronRight, CheckCircle2
} from 'lucide-react'

// Phone Frame Component
function PhoneFrame({ children, screen }: { children: React.ReactNode; screen: string }) {
  return (
    <div className="relative mx-auto" style={{ width: '320px', height: '640px' }}>
      {/* Phone outer frame */}
      <div className="absolute inset-0 bg-gray-900 rounded-[40px] shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
        
        {/* Screen */}
        <div className="absolute inset-2 bg-white rounded-[32px] overflow-hidden">
          {/* Status bar */}
          <div className="h-8 bg-gray-50 flex items-center justify-between px-6 text-xs">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="h-[calc(100%-32px)] overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      
      {/* Screen label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <Badge variant="outline" className="text-xs">{screen}</Badge>
      </div>
    </div>
  )
}

// Auth Screen
function AuthPreview() {
  const [isLogin, setIsLogin] = useState(true)
  
  return (
    <div className="h-full bg-gradient-to-b from-indigo-50 to-white p-4 flex flex-col">
      <div className="text-center mt-8 mb-6">
        <div className="w-16 h-16 bg-indigo-500 rounded-2xl mx-auto flex items-center justify-center mb-3">
          <span className="text-3xl">🇨🇦</span>
        </div>
        <h2 className="text-xl font-bold">NouveauCap</h2>
        <p className="text-xs text-gray-500">Votre compagnon pour une nouvelle vie au Canada</p>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm flex-1">
        <h3 className="font-semibold text-center mb-4">
          {isLogin ? 'Connexion' : 'Créer un compte'}
        </h3>
        
        {!isLogin && (
          <div className="mb-3">
            <Label className="text-xs">Nom complet</Label>
            <Input className="h-9 text-sm mt-1" placeholder="Jean Dupont" />
          </div>
        )}
        
        <div className="mb-3">
          <Label className="text-xs">Courriel</Label>
          <Input className="h-9 text-sm mt-1" placeholder="email@exemple.com" />
        </div>
        
        <div className="mb-4">
          <Label className="text-xs">Mot de passe</Label>
          <Input type="password" className="h-9 text-sm mt-1" placeholder="••••••••" />
        </div>
        
        <Button className="w-full h-10 bg-indigo-500 hover:bg-indigo-600">
          {isLogin ? 'Se connecter' : 'Créer mon compte'}
        </Button>
        
        <p 
          className="text-xs text-center mt-4 text-indigo-600 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Pas encore de compte? S\'inscrire' : 'Déjà un compte? Se connecter'}
        </p>
      </div>
    </div>
  )
}

// Onboarding Screen
function OnboardingPreview() {
  const [step, setStep] = useState(1)
  const steps = [
    { title: 'Statut d\'immigration', options: ['🛡️ Résident permanent', '🎓 Étudiant', '💼 Permis travail'] },
    { title: 'Province', options: ['🇨🇦 Ontario', '🍁 Québec', '🏔️ C.-B.', '🌾 Alberta'] },
    { title: 'Ville', options: ['Montréal', 'Toronto', 'Vancouver', 'Calgary'] },
    { title: 'Secteur', options: ['💻 Technologie', '🏥 Santé', '💰 Finance', '🔧 Ingénierie'] },
  ]
  
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Progress */}
      <div className="p-4">
        <div className="h-1 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-indigo-500 rounded-full transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-center text-gray-500 mt-2">Étape {step} sur 4</p>
      </div>
      
      {/* Content */}
      <div className="flex-1 px-4">
        <h2 className="text-lg font-bold text-center mb-4">{steps[step-1].title}</h2>
        
        <div className="grid grid-cols-2 gap-2">
          {steps[step-1].options.map((opt, i) => (
            <div 
              key={i}
              className="bg-white border-2 border-gray-100 rounded-xl p-3 text-center cursor-pointer hover:border-indigo-300"
            >
              <span className="text-sm">{opt}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="p-4 flex gap-2">
        {step > 1 && (
          <Button variant="outline" className="flex-1 h-10" onClick={() => setStep(step - 1)}>
            Retour
          </Button>
        )}
        <Button 
          className="flex-1 h-10 bg-indigo-500" 
          onClick={() => step < 4 && setStep(step + 1)}
        >
          {step < 4 ? 'Suivant' : 'Terminer'}
        </Button>
      </div>
    </div>
  )
}

// Home Screen
function HomePreview() {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4">
        <h2 className="font-bold text-lg">Bienvenue, Jean 👋</h2>
        <p className="text-xs text-gray-500">Votre compagnon pour une nouvelle vie au Canada</p>
      </div>
      
      {/* Status Card */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-xl">🛡️</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Votre statut</p>
              <p className="font-semibold">Résident permanent</p>
              <Badge className="text-xs mt-1">Québec</Badge>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="px-4 flex gap-2">
        <div className="flex-1 bg-white rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-indigo-500">5</p>
          <p className="text-xs text-gray-500">Tâches</p>
        </div>
        <div className="flex-1 bg-white rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-amber-500">2</p>
          <p className="text-xs text-gray-500">Alertes</p>
        </div>
      </div>
      
      {/* Modules */}
      <div className="p-4">
        <h3 className="font-semibold mb-2 text-sm">Modules</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '🛡️', name: 'Immigration', color: 'border-indigo-400' },
            { icon: '💼', name: 'Emploi', color: 'border-purple-400' },
            { icon: '🏠', name: 'Logement', color: 'border-pink-400' },
            { icon: '🏥', name: 'Santé', color: 'border-green-400' },
          ].map((mod, i) => (
            <div 
              key={i}
              className={`bg-white rounded-xl p-3 border-l-4 ${mod.color}`}
            >
              <span className="text-lg">{mod.icon}</span>
              <p className="text-xs font-medium mt-1">{mod.name}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="mt-auto bg-white border-t flex">
        {[
          { icon: '🏠', label: 'Accueil', active: true },
          { icon: '🛡️', label: 'Immigration' },
          { icon: '🏠', label: 'Logement' },
          { icon: '👤', label: 'Profil' },
        ].map((tab, i) => (
          <div 
            key={i}
            className={`flex-1 py-2 text-center ${tab.active ? 'text-indigo-500' : 'text-gray-400'}`}
          >
            <span className="text-lg">{tab.icon}</span>
            <p className="text-[10px]">{tab.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Immigration Screen
function ImmigrationPreview() {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-indigo-500 text-white p-4">
        <h2 className="font-bold">🛡️ Immigration</h2>
        <p className="text-xs opacity-80">Tâches, CRS, Alertes</p>
      </div>
      
      {/* Tabs */}
      <div className="bg-white flex border-b text-xs">
        <div className="flex-1 py-2 text-center border-b-2 border-indigo-500 text-indigo-600 font-medium">Tâches</div>
        <div className="flex-1 py-2 text-center text-gray-500">CRS</div>
        <div className="flex-1 py-2 text-center text-gray-500">Alertes</div>
      </div>
      
      {/* Stats */}
      <div className="p-4 flex gap-2">
        <div className="flex-1 bg-white rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-indigo-500">5</p>
          <p className="text-xs text-gray-500">En attente</p>
        </div>
        <div className="flex-1 bg-white rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-green-500">3</p>
          <p className="text-xs text-gray-500">Complétées</p>
        </div>
      </div>
      
      {/* Tasks */}
      <div className="px-4 flex-1 overflow-auto">
        {[
          { title: 'Obtenir carte santé', priority: 'HIGH', done: false },
          { title: 'Ouvrir compte bancaire', priority: 'MEDIUM', done: true },
          { title: 'Inscription fiscale', priority: 'HIGH', done: false },
        ].map((task, i) => (
          <div key={i} className="bg-white rounded-lg p-3 mb-2 flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.done ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
              {task.done && <CheckCircle2 className="w-3 h-3 text-white" />}
            </div>
            <span className={`text-sm flex-1 ${task.done ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </span>
            {task.priority === 'HIGH' && (
              <Badge className="text-[10px] bg-red-100 text-red-600">!</Badge>
            )}
          </div>
        ))}
      </div>
      
      {/* Bottom Nav */}
      <div className="mt-auto bg-white border-t flex">
        {[
          { icon: '🏠', label: 'Accueil' },
          { icon: '🛡️', label: 'Immigration', active: true },
          { icon: '🏠', label: 'Logement' },
          { icon: '👤', label: 'Profil' },
        ].map((tab, i) => (
          <div 
            key={i}
            className={`flex-1 py-2 text-center ${tab.active ? 'text-indigo-500' : 'text-gray-400'}`}
          >
            <span className="text-lg">{tab.icon}</span>
            <p className="text-[10px]">{tab.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Housing Screen
function HousingPreview() {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-pink-500 text-white p-4">
        <h2 className="font-bold">🏠 Logement</h2>
        <p className="text-xs opacity-80">Budget, Droits, Ressources</p>
      </div>
      
      {/* Calculator Card */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-sm mb-3">💰 Calculateur Budget</h3>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Revenu mensuel</span>
              <span className="font-semibold">$5,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Loyer</span>
              <span className="font-semibold">$1,800</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Services</span>
              <span className="font-semibold">$150</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="font-semibold">Ratio logement</span>
              <span className="font-bold text-amber-500">39%</span>
            </div>
          </div>
          
          <div className="mt-3 p-2 bg-amber-50 rounded-lg">
            <p className="text-xs text-amber-700">⚠️ Ratio élevé (&gt;30%)</p>
          </div>
        </div>
      </div>
      
      {/* Tenant Rights */}
      <div className="px-4">
        <h3 className="font-semibold text-sm mb-2">📋 Droits des locataires</h3>
        
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="bg-purple-500 text-white px-3 py-2">
            <span className="font-semibold text-sm">Québec</span>
          </div>
          <div className="p-3 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Tribunal</span>
              <span>TAL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Dépôt</span>
              <span>1er mois max</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Préavis</span>
              <span>3 mois</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="mt-auto bg-white border-t flex">
        {[
          { icon: '🏠', label: 'Accueil' },
          { icon: '🛡️', label: 'Immigration' },
          { icon: '🏠', label: 'Logement', active: true },
          { icon: '👤', label: 'Profil' },
        ].map((tab, i) => (
          <div 
            key={i}
            className={`flex-1 py-2 text-center ${tab.active ? 'text-pink-500' : 'text-gray-400'}`}
          >
            <span className="text-lg">{tab.icon}</span>
            <p className="text-[10px]">{tab.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Profile Screen
function ProfilePreview() {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4">
        <h2 className="font-bold">👤 Profil</h2>
      </div>
      
      {/* Profile Card */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="w-16 h-16 bg-indigo-500 rounded-full mx-auto flex items-center justify-center mb-2">
            <span className="text-2xl text-white font-bold">J</span>
          </div>
          <h3 className="font-semibold">Jean Dupont</h3>
          <p className="text-xs text-gray-500">jean.dupont@email.com</p>
          <div className="flex justify-center gap-2 mt-2">
            <Badge className="text-xs">Résident permanent</Badge>
            <Badge className="text-xs bg-purple-100 text-purple-600">Premium</Badge>
          </div>
        </div>
      </div>
      
      {/* Language */}
      <div className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-sm mb-2">🌐 Langue</h4>
          <div className="flex gap-2">
            <div className="flex-1 bg-indigo-100 border-2 border-indigo-500 rounded-lg p-2 text-center">
              <span className="text-sm">🇫🇷 Français</span>
            </div>
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
              <span className="text-sm text-gray-500">🇬🇧 English</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {[
            { icon: '🔔', label: 'Notifications' },
            { icon: '🔒', label: 'Confidentialité' },
            { icon: '❓', label: 'Aide' },
            { icon: '🚪', label: 'Déconnexion' },
          ].map((item, i) => (
            <div 
              key={i}
              className="flex items-center justify-between p-3 border-b last:border-0"
            >
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="mt-auto bg-white border-t flex">
        {[
          { icon: '🏠', label: 'Accueil' },
          { icon: '🛡️', label: 'Immigration' },
          { icon: '🏠', label: 'Logement' },
          { icon: '👤', label: 'Profil', active: true },
        ].map((tab, i) => (
          <div 
            key={i}
            className={`flex-1 py-2 text-center ${tab.active ? 'text-indigo-500' : 'text-gray-400'}`}
          >
            <span className="text-lg">{tab.icon}</span>
            <p className="text-[10px]">{tab.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Page Component
export default function MobilePreviewPage() {
  const [currentScreen, setCurrentScreen] = useState('home')
  
  const screens = [
    { id: 'auth', name: 'Connexion', component: <AuthPreview /> },
    { id: 'onboarding', name: 'Onboarding', component: <OnboardingPreview /> },
    { id: 'home', name: 'Accueil', component: <HomePreview /> },
    { id: 'immigration', name: 'Immigration', component: <ImmigrationPreview /> },
    { id: 'housing', name: 'Logement', component: <HousingPreview /> },
    { id: 'profile', name: 'Profil', component: <ProfilePreview /> },
  ]
  
  const currentScreenData = screens.find(s => s.id === currentScreen)!
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-indigo-500">Application Mobile</Badge>
          <h1 className="text-3xl font-bold text-white mb-2">
            📱 NouveauCap Mobile Preview
          </h1>
          <p className="text-gray-400">
            Découvrez l&apos;interface de l&apos;application mobile Expo
          </p>
        </div>
        
        {/* Screen Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {screens.map((screen) => (
            <Button
              key={screen.id}
              variant={currentScreen === screen.id ? 'default' : 'outline'}
              onClick={() => setCurrentScreen(screen.id)}
              className={currentScreen === screen.id 
                ? 'bg-indigo-500 hover:bg-indigo-600' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }
            >
              {screen.name}
            </Button>
          ))}
        </div>
        
        {/* Phone Preview */}
        <div className="flex justify-center mb-12">
          <PhoneFrame screen={currentScreenData.name}>
            {currentScreenData.component}
          </PhoneFrame>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-indigo-400" />
                iOS & Android
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Application native optimisée pour iOS et Android avec Expo.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-400" />
                Bilingue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Interface complète en français et anglais.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Sécurisé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Authentification JWT avec stockage sécurisé.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Download Section */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Disponible bientôt sur les stores
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/10 rounded-xl px-6 py-3 flex items-center gap-3">
              <span className="text-2xl">🍎</span>
              <div className="text-left">
                <p className="text-xs text-gray-400">Bientôt sur</p>
                <p className="text-white font-semibold">App Store</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-3 flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <p className="text-xs text-gray-400">Bientôt sur</p>
                <p className="text-white font-semibold">Google Play</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
