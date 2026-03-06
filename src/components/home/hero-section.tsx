'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Play,
  Sparkles,
  Check,
  Shield,
  Briefcase,
  Heart,
  Users,
  TrendingUp,
  Globe,
} from 'lucide-react'

export function HeroSection({ onGetStarted }: { onGetStarted?: () => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Gradient Orbs */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
              <Sparkles className="h-4 w-4" />
              Nouveau au Canada? On vous accompagne!
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl leading-tight">
              Votre nouveau départ
              <span className="block bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                au Canada commence ici
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl">
              NouveauCap vous guide à travers toutes les étapes de votre installation: 
              immigration, emploi, santé, finance et plus encore — le tout adapté à votre statut.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30 rounded-xl px-8"
              >
                Commencer gratuitement
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 rounded-xl border-2 border-gray-200 hover:border-gray-300"
              >
                <Play className="h-5 w-5" />
                Voir la démo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br',
                      i % 3 === 0 ? 'from-blue-400 to-blue-500' : 'from-gray-400 to-gray-500'
                    )}
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">+5,000 utilisateurs</p>
                <p className="text-sm text-gray-500">nous font confiance</p>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl bg-gradient-to-br from-red-500 to-red-600 p-1 shadow-2xl shadow-red-500/30">
              <div className="rounded-[22px] bg-white p-8">
                {/* Dashboard Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-32 rounded-lg bg-gray-200" />
                    <div className="h-8 w-8 rounded-full bg-red-100" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Immigration', color: 'from-purple-500 to-pink-500' },
                      { label: 'Emploi', color: 'from-green-500 to-emerald-500' },
                      { label: 'Santé', color: 'from-red-500 to-rose-500' },
                      { label: 'Finance', color: 'from-amber-500 to-orange-500' },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl bg-gray-50 p-4">
                        <div
                          className={cn(
                            'h-8 w-8 rounded-lg mb-2 bg-gradient-to-br',
                            item.color
                          )}
                        />
                        <div className="h-4 w-16 rounded bg-gray-200 mb-2" />
                        <div className="h-6 w-12 rounded bg-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -left-8 top-1/4 rounded-xl bg-white p-4 shadow-xl animate-bounce">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Tâche complétée!</p>
                  <p className="text-xs text-gray-500">Demande NAS envoyée</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 rounded-xl bg-white p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">CRS: 468</p>
                  <p className="text-xs text-green-600">+15 points ce mois</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Grid
export function FeaturesGrid() {
  const features = [
    {
      icon: Shield,
      title: 'Immigration',
      description: 'Quiz citoyenneté, simulateur CRS, suivi des permis et alertes d\'expiration.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Briefcase,
      title: 'Emploi',
      description: 'Optimisation CV avec IA, recherche d\'emploi et suivi des candidatures.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Heart,
      title: 'Santé',
      description: 'Cliniques proches, rappels RAMQ/OHIP et informations par province.',
      gradient: 'from-red-500 to-rose-500',
    },
    {
      icon: TrendingUp,
      title: 'Finance',
      description: 'Comparaison banques, construction de crédit et conseils fiscaux.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Événements locaux, forums et groupes par province.',
      gradient: 'from-indigo-500 to-violet-500',
    },
    {
      icon: Globe,
      title: 'Multilingue',
      description: 'Interface complète en français et anglais pour tous les services.',
      gradient: 'from-cyan-500 to-blue-500',
    },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tout ce dont vous avez besoin
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Une plateforme complète pour réussir votre installation au Canada
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-gray-100 transition-all duration-300 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div
                className={cn(
                  'mb-4 inline-flex rounded-xl bg-gradient-to-br p-3 text-white shadow-lg',
                  'transition-transform duration-300 group-hover:scale-110',
                  feature.gradient
                )}
              >
                <feature.icon className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>

              {/* Arrow */}
              <div className="mt-4 flex items-center text-sm font-medium text-gray-400 transition-all duration-300 group-hover:text-red-600">
                Explorer
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
export function CTASection({ onGetStarted }: { onGetStarted?: () => void }) {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-red-600 to-red-700">
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Prêt à commencer votre aventure canadienne?
        </h2>
        <p className="mt-4 text-lg text-red-100 max-w-2xl mx-auto">
          Rejoignez des milliers de nouveaux arrivants qui utilisent NouveauCap pour réussir leur installation.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="gap-2 bg-white text-red-600 hover:bg-red-50 shadow-xl rounded-xl px-8"
          >
            Créer un compte gratuit
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 rounded-xl border-2 border-white/30 text-white hover:bg-white/10"
          >
            En savoir plus
          </Button>
        </div>
      </div>
    </section>
  )
}
