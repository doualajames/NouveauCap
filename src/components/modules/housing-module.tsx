'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { t, type Language, type Province } from '@/lib/stores/app-store'
import { BookOpen, Building, Calculator, Download, ExternalLink, FileText, Home, Percent, PiggyBank } from 'lucide-react'
import { useState } from 'react'
import { modules } from '@/lib/app-data'

export function HousingModule({ language, user }: {
  language: Language
  user: any
}) {
  const [monthlyIncome, setMonthlyIncome] = useState(5000)
  const [rent, setRent] = useState(1800)
  const [utilities, setUtilities] = useState(150)
  const [insurance, setInsurance] = useState(30)
  const [transport, setTransport] = useState(200)

  const totalHousingCost = rent + utilities + insurance
  const disposableIncome = monthlyIncome - totalHousingCost - transport
  const housingRatio = (totalHousingCost / monthlyIncome) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/20 dark:to-gray-900">
      <div className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 dark:shadow-purple-900/30">
              <Building className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {t('modules.housing.title', language)}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">{t('modules.housing.description', language)}</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500">{language === 'fr' ? 'Coût total' : 'Total Cost'}</p>
              <p className="font-bold text-purple-600">${totalHousingCost}</p>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500">{language === 'fr' ? 'Revenu disponible' : 'Disposable'}</p>
              <p className="font-bold text-green-600">${disposableIncome}</p>
            </div>
          </div>
        </div>

        {/* Budget Calculator */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Calculator className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              {language === 'fr' ? 'Calculateur de Budget Logement' : 'Housing Budget Calculator'}
            </CardTitle>
            <CardDescription>
              {language === 'fr' ? 'Planifiez votre budget logement' : 'Plan your housing budget'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Sliders */}
              <div className="space-y-5">
                {[
                  { label: language === 'fr' ? 'Revenu mensuel' : 'Monthly Income', value: monthlyIncome, setter: setMonthlyIncome, min: 1000, max: 15000, step: 100, emoji: '💰' },
                  { label: language === 'fr' ? 'Loyer mensuel' : 'Monthly Rent', value: rent, setter: setRent, min: 500, max: 5000, step: 50, emoji: '🏠' },
                  { label: language === 'fr' ? 'Services publics' : 'Utilities', value: utilities, setter: setUtilities, min: 0, max: 500, step: 10, emoji: '💡' },
                  { label: language === 'fr' ? 'Assurance locataire' : 'Tenant Insurance', value: insurance, setter: setInsurance, min: 0, max: 100, step: 5, emoji: '🛡️' },
                  { label: language === 'fr' ? 'Transport' : 'Transport', value: transport, setter: setTransport, min: 0, max: 500, step: 10, emoji: '🚗' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">{item.emoji} {item.label}</Label>
                      <Badge variant="outline" className="font-mono text-base">${item.value}</Badge>
                    </div>
                    <Slider 
                      value={[item.value]} 
                      onValueChange={([v]) => item.setter(v)} 
                      min={item.min} 
                      max={item.max} 
                      step={item.step}
                      className="py-2"
                    />
                  </div>
                ))}
              </div>
              
              {/* Results */}
              <div className="space-y-4">
                <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{language === 'fr' ? 'Coût total logement' : 'Total Housing Cost'}</p>
                      <p className="text-4xl font-bold text-purple-600">${totalHousingCost}</p>
                      <p className="text-sm text-gray-500">{language === 'fr' ? 'par mois' : 'per month'}</p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-5 rounded-xl transition-all duration-300 ${
                  housingRatio > 30 
                    ? 'bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20' 
                    : housingRatio > 25 
                    ? 'bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20'
                    : 'bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      housingRatio > 30 ? 'bg-red-500' : housingRatio > 25 ? 'bg-amber-500' : 'bg-green-500'
                    }`}>
                      <Percent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{language === 'fr' ? 'Ratio logement/revenu' : 'Housing/Income Ratio'}</p>
                      <p className={`text-4xl font-bold ${housingRatio > 30 ? 'text-red-600' : housingRatio > 25 ? 'text-amber-600' : 'text-green-600'}`}>
                        {housingRatio.toFixed(1)}%
                      </p>
                      <p className={`text-sm font-medium ${housingRatio > 30 ? 'text-red-600' : housingRatio > 25 ? 'text-amber-600' : 'text-green-600'}`}>
                        {housingRatio > 30 
                          ? (language === 'fr' ? '⚠️ Trop élevé (>30%)' : '⚠️ Too high (>30%)')
                          : housingRatio > 25
                          ? (language === 'fr' ? '⚡ Limite acceptable' : '⚡ Acceptable limit')
                          : (language === 'fr' ? '✓ Excellent ratio' : '✓ Excellent ratio')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <PiggyBank className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{language === 'fr' ? 'Revenu disponible' : 'Disposable Income'}</p>
                      <p className="text-4xl font-bold text-blue-600">${disposableIncome}</p>
                      <p className="text-sm text-gray-500">{language === 'fr' ? 'par mois après logement' : 'per month after housing'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tenant Rights by Province - Comprehensive */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              {language === 'fr' ? 'Droits des locataires par province' : 'Tenant Rights by Province'}
            </CardTitle>
            <CardDescription>
              {language === 'fr' 
                ? 'Informations essentielles avec sources officielles canadiennes'
                : 'Essential information with official Canadian sources'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Ontario */}
              <Card className={`overflow-hidden ${user?.province === 'ON' ? 'ring-2 ring-blue-500' : ''}`}>
                <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">🇨🇦 Ontario</h4>
                        <Badge variant="outline" className="text-xs">ON</Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Tribunal' : 'Board'}</p>
                          <p className="font-medium">Landlord and Tenant Board (LTB)</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Dépôt de garantie' : 'Security Deposit'}</p>
                          <p className="font-medium text-green-600">{language === 'fr' ? '❌ Illégal (interdit)' : '❌ Illegal (prohibited)'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Préavis (locataire)' : 'Notice (tenant)'}</p>
                          <p className="font-medium">60 {language === 'fr' ? 'jours' : 'days'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Augmentation max (2024)' : 'Max increase (2024)'}</p>
                          <p className="font-medium text-blue-600">2.5%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href="https://www.sjto.gov.on.ca/ltb/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        LTB Official
                      </a>
                      <a href="https://www.ontario.ca/page/rent-increases" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Ontario.ca
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Québec */}
              <Card className={`overflow-hidden ${user?.province === 'QC' ? 'ring-2 ring-purple-500' : ''}`}>
                <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600" />
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">🇨🇦 Québec</h4>
                        <Badge variant="outline" className="text-xs">QC</Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Tribunal' : 'Board'}</p>
                          <p className="font-medium">Tribunal administratif du logement (TAL)</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Dépôt de garantie' : 'Security Deposit'}</p>
                          <p className="font-medium">{language === 'fr' ? '1er mois max (intérêt payable)' : '1st month max (interest payable)'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Préavis (locataire)' : 'Notice (tenant)'}</p>
                          <p className="font-medium">3 {language === 'fr' ? 'mois (appartement)' : 'months (apartment)'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Augmentation' : 'Rent Increase'}</p>
                          <p className="font-medium text-amber-600">{language === 'fr' ? 'Raisonnable (doit être justifiée)' : 'Reasonable (must be justified)'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href="https://tal.gouv.qc.ca/" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        TAL Official
                      </a>
                      <a href="https://tal.gouv.qc.ca/fr/etre-locataire/loyer-et-augmentation" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {language === 'fr' ? 'Calcul augmentation' : 'Increase calculator'}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Colombie-Britannique */}
              <Card className={`overflow-hidden ${user?.province === 'BC' ? 'ring-2 ring-green-500' : ''}`}>
                <div className="h-1 bg-gradient-to-r from-green-400 to-green-600" />
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">🇨🇦 {language === 'fr' ? 'Colombie-Britannique' : 'British Columbia'}</h4>
                        <Badge variant="outline" className="text-xs">BC</Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Tribunal' : 'Board'}</p>
                          <p className="font-medium">Residential Tenancy Branch (RTB)</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Dépôt de garantie' : 'Security Deposit'}</p>
                          <p className="font-medium">{language === 'fr' ? '½ mois de loyer max' : '½ month rent max'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Préavis (locataire)' : 'Notice (tenant)'}</p>
                          <p className="font-medium">1 {language === 'fr' ? 'mois' : 'month'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Augmentation max (2024)' : 'Max increase (2024)'}</p>
                          <p className="font-medium text-blue-600">3.5%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href="https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies" target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        BC Gov RTB
                      </a>
                      <a href="https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/rent-increases" target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {language === 'fr' ? 'Règles augmentation' : 'Increase rules'}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alberta */}
              <Card className={`overflow-hidden ${user?.province === 'AB' ? 'ring-2 ring-amber-500' : ''}`}>
                <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">🇨🇦 Alberta</h4>
                        <Badge variant="outline" className="text-xs">AB</Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Tribunal' : 'Board'}</p>
                          <p className="font-medium">RTDRS (Residential Tenancy Dispute Resolution Service)</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Dépôt de garantie' : 'Security Deposit'}</p>
                          <p className="font-medium">{language === 'fr' ? '1 mois max' : '1 month max'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Préavis (locataire)' : 'Notice (tenant)'}</p>
                          <p className="font-medium">1 {language === 'fr' ? 'mois (mois au mois)' : 'month (month-to-month)'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Augmentation' : 'Rent Increase'}</p>
                          <p className="font-medium text-amber-600">{language === 'fr' ? 'Aucun plafond, 3 mois préavis' : 'No cap, 3 months notice'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href="https://www.alberta.ca/rtdrs.aspx" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        RTDRS Alberta
                      </a>
                      <a href="https://www.alberta.ca/landlord-tenants" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Alberta.ca
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Manitoba */}
              <Card className={`overflow-hidden ${user?.province === 'MB' ? 'ring-2 ring-sky-500' : ''}`}>
                <div className="h-1 bg-gradient-to-r from-sky-400 to-sky-600" />
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">🇨🇦 Manitoba</h4>
                        <Badge variant="outline" className="text-xs">MB</Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Tribunal' : 'Board'}</p>
                          <p className="font-medium">Residential Tenancies Branch</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Dépôt de garantie' : 'Security Deposit'}</p>
                          <p className="font-medium">{language === 'fr' ? '½ mois max' : '½ month max'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Préavis (locataire)' : 'Notice (tenant)'}</p>
                          <p className="font-medium">1 {language === 'fr' ? 'mois' : 'month'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Augmentation' : 'Rent Increase'}</p>
                          <p className="font-medium text-blue-600">{language === 'fr' ? 'Limitée par guideline annuel' : 'Limited by annual guideline'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href="https://www.gov.mb.ca/cca/rtb/" target="_blank" rel="noopener noreferrer" className="text-xs text-sky-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        MB Gov RTB
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Saskatchewan */}
              <Card className={`overflow-hidden ${user?.province === 'SK' ? 'ring-2 ring-emerald-500' : ''}`}>
                <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">🇨🇦 Saskatchewan</h4>
                        <Badge variant="outline" className="text-xs">SK</Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Tribunal' : 'Board'}</p>
                          <p className="font-medium">Office of Residential Tenancies (ORT)</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Dépôt de garantie' : 'Security Deposit'}</p>
                          <p className="font-medium">{language === 'fr' ? '1 mois max' : '1 month max'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Préavis (locataire)' : 'Notice (tenant)'}</p>
                          <p className="font-medium">1 {language === 'fr' ? 'mois' : 'month'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Augmentation' : 'Rent Increase'}</p>
                          <p className="font-medium text-amber-600">{language === 'fr' ? 'Aucun plafond, 6 mois entre augmentations' : 'No cap, 6 months between increases'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href="https://www.saskatchewan.ca/business/housing-development-construction-and-property-management/renting-property/landlord-and-tenant" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        SK Gov
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nouvelle-Écosse */}
              <Card className={`overflow-hidden ${user?.province === 'NS' ? 'ring-2 ring-indigo-500' : ''}`}>
                <div className="h-1 bg-gradient-to-r from-indigo-400 to-indigo-600" />
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">🇨🇦 {language === 'fr' ? 'Nouvelle-Écosse' : 'Nova Scotia'}</h4>
                        <Badge variant="outline" className="text-xs">NS</Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Tribunal' : 'Board'}</p>
                          <p className="font-medium">Residential Tenancies Program</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Dépôt de garantie' : 'Security Deposit'}</p>
                          <p className="font-medium">{language === 'fr' ? '½ mois max' : '½ month max'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Préavis (locataire)' : 'Notice (tenant)'}</p>
                          <p className="font-medium">3 {language === 'fr' ? 'mois (année), 1 mois (mois au mois)' : 'months (year), 1 month (month-to-month)'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Augmentation' : 'Rent Increase'}</p>
                          <p className="font-medium text-amber-600">{language === 'fr' ? 'Aucun plafond, 4 mois préavis' : 'No cap, 4 months notice'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href="https://novascotia.ca/sns/access/landlords-tenants.asp" target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        NS Gov
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nouveau-Brunswick */}
              <Card className={`overflow-hidden ${user?.province === 'NB' ? 'ring-2 border-rose-500' : ''}`}>
                <div className="h-1 bg-gradient-to-r from-rose-400 to-rose-600" />
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">🇨🇦 {language === 'fr' ? 'Nouveau-Brunswick' : 'New Brunswick'}</h4>
                        <Badge variant="outline" className="text-xs">NB</Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Tribunal' : 'Board'}</p>
                          <p className="font-medium">{language === 'fr' ? 'Tribunal de la location résidentielle' : 'Residential Tenancies Tribunal'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Dépôt de garantie' : 'Security Deposit'}</p>
                          <p className="font-medium">{language === 'fr' ? '1 mois max' : '1 month max'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Préavis (locataire)' : 'Notice (tenant)'}</p>
                          <p className="font-medium">1 {language === 'fr' ? 'mois' : 'month'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Augmentation' : 'Rent Increase'}</p>
                          <p className="font-medium text-amber-600">{language === 'fr' ? 'Aucun plafond, 6 mois préavis' : 'No cap, 6 months notice'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href="https://www2.gnb.ca/content/gnb/en/departments/social_development/tenancies.html" target="_blank" rel="noopener noreferrer" className="text-xs text-rose-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        NB Gov
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Île-du-Prince-Édouard */}
              <Card className={`overflow-hidden ${user?.province === 'PE' ? 'ring-2 ring-teal-500' : ''}`}>
                <div className="h-1 bg-gradient-to-r from-teal-400 to-teal-600" />
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">🇨🇦 {language === 'fr' ? 'Île-du-Prince-Édouard' : 'Prince Edward Island'}</h4>
                        <Badge variant="outline" className="text-xs">PE</Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Tribunal' : 'Board'}</p>
                          <p className="font-medium">IRAC (Island Regulatory and Appeals Commission)</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Dépôt de garantie' : 'Security Deposit'}</p>
                          <p className="font-medium">{language === 'fr' ? 'Aucun maximum légal' : 'No legal maximum'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Préavis (locataire)' : 'Notice (tenant)'}</p>
                          <p className="font-medium">2 {language === 'fr' ? 'mois (année), 1 mois (mois au mois)' : 'months (year), 1 month (month-to-month)'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Augmentation' : 'Rent Increase'}</p>
                          <p className="font-medium text-blue-600">{language === 'fr' ? 'Doit être approuvée par IRAC' : 'Must be approved by IRAC'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href="https://www.princeedwardisland.ca/en/topic/landlord-and-tenant" target="_blank" rel="noopener noreferrer" className="text-xs text-teal-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        PEI Gov
                      </a>
                      <a href="https://irac.pe.ca/rental" target="_blank" rel="noopener noreferrer" className="text-xs text-teal-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        IRAC Rental
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terre-Neuve-et-Labrador */}
              <Card className={`overflow-hidden ${user?.province === 'NL' ? 'ring-2 border-cyan-500' : ''}`}>
                <div className="h-1 bg-gradient-to-r from-cyan-400 to-cyan-600" />
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">🇨🇦 {language === 'fr' ? 'Terre-Neuve-et-Labrador' : 'Newfoundland and Labrador'}</h4>
                        <Badge variant="outline" className="text-xs">NL</Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Tribunal' : 'Board'}</p>
                          <p className="font-medium">Residential Tenancies</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Dépôt de garantie' : 'Security Deposit'}</p>
                          <p className="font-medium">{language === 'fr' ? '¾ mois max' : '¾ month max'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Préavis (locataire)' : 'Notice (tenant)'}</p>
                          <p className="font-medium">2 {language === 'fr' ? 'mois (année), 1 mois (mois au mois)' : 'months (year), 1 month (month-to-month)'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? 'Augmentation' : 'Rent Increase'}</p>
                          <p className="font-medium text-amber-600">{language === 'fr' ? 'Aucun plafond' : 'No cap'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href="https://www.gov.nl.ca/servicenl/landlord/" target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        NL Gov
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Important Notice */}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>{language === 'fr' ? '⚠️ Important:' : '⚠️ Important:'}</strong> {language === 'fr' 
                  ? 'Ces informations sont fournies à titre indicatif. Pour les informations les plus récentes, consultez toujours les sites officiels provinciaux. Les règles peuvent changer.'
                  : 'This information is provided for guidance only. Always check official provincial websites for the most current information. Rules may change.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Letter Templates */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { 
              icon: FileText, 
              title: language === 'fr' ? 'Candidature locataire' : 'Tenant Application', 
              desc: language === 'fr' ? 'Sans historique de crédit' : 'Without credit history',
              color: 'text-blue-500',
              bg: 'bg-blue-50 dark:bg-blue-950'
            },
            { 
              icon: FileText, 
              title: language === 'fr' ? 'Lettre de garant' : 'Guarantor Letter', 
              desc: language === 'fr' ? 'Pour les nouveaux arrivants' : 'For newcomers',
              color: 'text-purple-500',
              bg: 'bg-purple-50 dark:bg-purple-950'
            },
          ].map((item, i) => (
            <Card key={i} className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 group">
              <CardContent className={`p-5 ${item.bg} rounded-lg`}>
                <item.icon className={`w-10 h-10 ${item.color} mb-3 group-hover:scale-110 transition-transform`} />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                <Button size="sm" className="mt-3">
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Télécharger' : 'Download'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== FINANCE MODULE ====================
