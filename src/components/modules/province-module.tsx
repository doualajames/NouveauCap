'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { t, type Language, type Province } from '@/lib/stores/app-store'
import { AlertCircle, BookOpen, Briefcase, CheckCircle2, DollarSign, ExternalLink, Globe, HeartHandshake, Home, MapPin, PiggyBank } from 'lucide-react'
import { defaultProvincialPolicies, modules, provinces, provincialPolicies } from '@/lib/app-data'

export function ProvinceModule({ language, user }: {
  language: Language
  user: any
}) {
  const userProvince = user?.province || 'ON'
  const userStatus = user?.immigrationStatus || 'PERMANENT_RESIDENT'
  
  // Get policies for user's province and status
  const provinceName = provinces.find(p => p.code === userProvince)?.name || userProvince
  const provinceNameEn = provinces.find(p => p.code === userProvince)?.nameEn || userProvince
  
  // Get policies - use specific data if available, otherwise use defaults
  const policies = provincialPolicies[userProvince]?.[userStatus] || 
                   defaultProvincialPolicies[userStatus as keyof typeof defaultProvincialPolicies]
  
  const sections = [
    { key: 'welcomeProgram', icon: HeartHandshake, label: language === 'fr' ? 'Programme d\'accueil' : 'Welcome Program', color: 'from-pink-500 to-rose-500' },
    { key: 'employment', icon: Briefcase, label: language === 'fr' ? 'Emploi et formation' : 'Employment & Training', color: 'from-blue-500 to-cyan-500' },
    { key: 'language', icon: Globe, label: language === 'fr' ? 'Cours de langue' : 'Language Classes', color: 'from-green-500 to-emerald-500' },
    { key: 'settlement', icon: Home, label: language === 'fr' ? 'Services d\'établissement' : 'Settlement Services', color: 'from-purple-500 to-violet-500' },
  ]
  
  const statusLabel = t(`status.${userStatus}`, language)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/50 to-white dark:from-cyan-950/20 dark:to-gray-900">
      <div className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-200 dark:shadow-cyan-900/30">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {t('modules.province.title', language)} - {language === 'fr' ? provinceName : provinceNameEn}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {language === 'fr' 
                  ? `Programmes d'accueil et d'intégration pour ${statusLabel.toLowerCase()}`
                  : `Welcome and integration programs for ${statusLabel.toLowerCase()}`}
              </p>
            </div>
          </div>
          
          {/* Quick Info */}
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500">{language === 'fr' ? 'Province' : 'Province'}</p>
              <Badge variant="default" className="mt-0.5 bg-gradient-to-r from-cyan-500 to-teal-500">{provinceNameEn}</Badge>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500">{language === 'fr' ? 'Statut' : 'Status'}</p>
              <Badge variant="outline" className="mt-0.5">{statusLabel}</Badge>
            </div>
          </div>
        </div>

        {/* Province Info Banner */}
        <div className="bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-emerald-500/10 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {language === 'fr' ? '📋 Vos droits et services provinciaux' : '📋 Your Provincial Rights and Services'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {language === 'fr' 
                  ? `En tant que ${statusLabel.toLowerCase()} en ${provinceName}, vous avez accès à divers programmes et services d'intégration financés par le gouvernement provincial. Ces services sont généralement gratuits et conçus pour faciliter votre établissement.`
                  : `As a ${statusLabel.toLowerCase()} in ${provinceNameEn}, you have access to various government-funded integration programs and services. These services are generally free and designed to facilitate your settlement.`}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {sections.map((section) => {
            const Icon = section.icon
            const data = policies[section.key as keyof typeof policies]
            if (!data) return null
            
            return (
              <Card key={section.key} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className={`h-2 bg-gradient-to-r ${section.color}`} />
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className={`w-8 h-8 bg-gradient-to-br ${section.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    {language === 'fr' ? data.name : data.nameEn}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {language === 'fr' ? data.description : data.descriptionEn}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Services List */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {language === 'fr' ? 'Services offerts:' : 'Services offered:'}
                    </h4>
                    <ul className="space-y-2">
                      {(language === 'fr' ? data.services : data.servicesEn).map((service: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Link */}
                  {data.url && data.url !== '#' && (
                    <a 
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-teal-700 transition-all shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {language === 'fr' ? 'Accéder au programme' : 'Access program'}
                    </a>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Financial Aid Section (if available) */}
        {policies.financialAid && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:from-amber-950/30 dark:to-orange-950/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <PiggyBank className="w-4 h-4 text-white" />
                </div>
                {language === 'fr' ? policies.financialAid.name : policies.financialAid.nameEn}
              </CardTitle>
              <CardDescription>
                {language === 'fr' ? policies.financialAid.description : policies.financialAid.descriptionEn}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {policies.financialAid.amount && (
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-amber-700 dark:text-amber-300">
                    {language === 'fr' ? 'Montant: ' : 'Amount: '}{policies.financialAid.amount}
                  </span>
                </div>
              )}
              {policies.financialAid.url && (
                <a 
                  href={policies.financialAid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-all shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                </a>
              )}
            </CardContent>
          </Card>
        )}

        {/* Important Notes */}
        <Card className="border-0 shadow-lg bg-blue-50/50 dark:bg-blue-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {language === 'fr' ? '📌 Points importants à retenir' : '📌 Important points to remember'}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {language === 'fr' 
                      ? 'La plupart des services sont gratuits pour les résidents de la province.'
                      : 'Most services are free for provincial residents.'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {language === 'fr' 
                      ? 'Apportez vos documents d\'identité et de statut d\'immigration lors de vos rendez-vous.'
                      : 'Bring your identity documents and immigration status paperwork to your appointments.'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {language === 'fr' 
                      ? 'Les services d\'interprétation sont souvent disponibles sur demande.'
                      : 'Interpretation services are often available upon request.'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {language === 'fr' 
                      ? 'Certains programmes peuvent avoir des critères d\'admissibilité spécifiques.'
                      : 'Some programs may have specific eligibility criteria.'}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-cyan-500" />
              {language === 'fr' ? 'Liens utiles' : 'Useful Links'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <a 
                href="https://www.canada.ca/fr/immigration-refugis-citoyennete/services/nouveaux-arrivants.html"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition-colors border hover:border-cyan-300"
              >
                <p className="font-medium text-sm">{language === 'fr' ? '🇨🇦 Canada.ca Nouveaux arrivants' : '🇨🇦 Canada.ca Newcomers'}</p>
              </a>
              <a 
                href="https://www.canada.ca/fr/immigration-refugis-citoyennete/services/nouveaux-arrivants/services-etablissement.html"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition-colors border hover:border-cyan-300"
              >
                <p className="font-medium text-sm">{language === 'fr' ? '🏛️ Services d\'établissement' : '🏛️ Settlement Services'}</p>
              </a>
              <a 
                href="https://ircc.canada.ca/francais/travailler/index.asp"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition-colors border hover:border-cyan-300"
              >
                <p className="font-medium text-sm">{language === 'fr' ? '💼 Travailler au Canada' : '💼 Work in Canada'}</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ==================== IMMIGRATION MODULE ====================
