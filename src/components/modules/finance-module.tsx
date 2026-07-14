'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { t, type Language, type Province } from '@/lib/stores/app-store'
import { CheckCircle2, ChevronRight, CreditCard, ExternalLink, Landmark, MapPin, Plus, Receipt, Send, Wallet, X } from 'lucide-react'
import { useState } from 'react'
import { modules, provinces } from '@/lib/app-data'

export function FinanceModule({ language, user }: {
  language: Language
  user: any
}) {
  const [selectedBank, setSelectedBank] = useState<any>(null)

  // Get user's province
  const userProvince = user?.province || 'ON'

  // Province-specific recommendations and notes
  const provinceBankInfo: Record<string, { recommended: string[]; notes: string; notesFr: string }> = {
    'QC': {
      recommended: ['desjardins', 'nbc', 'bmo', 'rbc', 'td'],
      notes: 'Desjardins and National Bank are highly recommended for Quebec residents due to their strong French services and local presence.',
      notesFr: 'Desjardins et Banque Nationale sont fortement recommandés pour les résidents du Québec grâce à leurs services en français et leur présence locale.'
    },
    'ON': {
      recommended: ['rbc', 'td', 'scotia', 'bmo', 'cibc'],
      notes: 'All major Canadian banks have excellent coverage in Ontario. RBC and TD are particularly recommended for their newcomer programs.',
      notesFr: 'Toutes les grandes banques canadiennes offrent une excellente couverture en Ontario. RBC et TD sont particulièrement recommandés pour leurs programmes nouveaux arrivants.'
    },
    'BC': {
      recommended: ['rbc', 'td', 'scotia', 'bmo', 'cibc'],
      notes: 'British Columbia has excellent coverage from all major banks. Scotiabank has a strong presence in Vancouver.',
      notesFr: 'La Colombie-Britannique bénéficie d\'une excellente couverture de toutes les grandes banques. Scotiabank a une forte présence à Vancouver.'
    },
    'AB': {
      recommended: ['td', 'rbc', 'scotia', 'bmo', 'cibc'],
      notes: 'Alberta has good coverage from all major banks. ATB Financial is also a local option for Alberta residents.',
      notesFr: 'L\'Alberta bénéficie d\'une bonne couverture de toutes les grandes banques. ATB Financial est également une option locale pour les résidents albertain.'
    },
    'MB': {
      recommended: ['rbc', 'td', 'scotia', 'bmo', 'cibc'],
      notes: 'Manitoba has good coverage from all major Canadian banks.',
      notesFr: 'Le Manitoba bénéficie d\'une bonne couverture de toutes les grandes banques canadiennes.'
    },
    'SK': {
      recommended: ['rbc', 'td', 'scotia', 'bmo', 'cibc'],
      notes: 'Saskatchewan has good coverage from all major Canadian banks.',
      notesFr: 'La Saskatchewan bénéficie d\'une bonne couverture de toutes les grandes banques canadiennes.'
    },
    'NS': {
      recommended: ['rbc', 'td', 'scotia', 'bmo', 'cibc'],
      notes: 'Nova Scotia has good coverage from all major banks.',
      notesFr: 'La Nouvelle-Écosse bénéficie d\'une bonne couverture de toutes les grandes banques.'
    },
    'NB': {
      recommended: ['rbc', 'td', 'scotia', 'bmo', 'cibc'],
      notes: 'New Brunswick has excellent coverage from all major banks.',
      notesFr: 'Le Nouveau-Brunswick bénéficie d\'une excellente couverture de toutes les grandes banques.'
    },
    'PE': {
      recommended: ['rbc', 'td', 'scotia', 'bmo', 'cibc'],
      notes: 'Prince Edward Island has coverage from all major Canadian banks.',
      notesFr: 'L\'Île-du-Prince-Édouard est couverte par toutes les grandes banques canadiennes.'
    },
    'NL': {
      recommended: ['rbc', 'td', 'scotia', 'bmo', 'cibc'],
      notes: 'Newfoundland and Labrador has coverage from all major Canadian banks.',
      notesFr: 'Terre-Neuve-et-Labrador est couverte par toutes les grandes banques canadiennes.'
    }
  }

  // Canadian banks with newcomer programs - real data with province recommendations
  const newcomerBanks = [
    {
      id: 'rbc',
      name: 'RBC Royal Bank',
      nameFr: 'RBC Banque Royale',
      logo: '🦁',
      color: 'from-blue-600 to-blue-800',
      accountName: 'RBC Newcomer Account',
      accountNameFr: 'Compte Nouvel Arrivant RBC',
      monthlyFee: 0,
      firstYearFree: true,
      bonusOffer: '$300 bonus',
      bonusOfferFr: 'Bonus de 300 $',
      features: ['Unlimited transactions', 'No minimum balance', 'Credit card without history', 'Safe deposit box discount'],
      featuresFr: ['Transactions illimitées', 'Aucun solde minimum', 'Carte de crédit sans historique', 'Réduction coffre-fort'],
      processingTime: 'Same day',
      processingTimeFr: 'Même jour',
      newcomersUrl: 'https://www.rbc.com/newcomers/',
      recommended: true,
      recommendedProvinces: ['ON', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'PE', 'NL', 'QC'],
      provinceNote: '',
      provinceNoteFr: ''
    },
    {
      id: 'td',
      name: 'TD Canada Trust',
      nameFr: 'TD Canada Trust',
      logo: '🟢',
      color: 'from-green-600 to-green-800',
      accountName: 'TD New to Canada',
      accountNameFr: 'TD Nouveau au Canada',
      monthlyFee: 0,
      firstYearFree: true,
      bonusOffer: '$350 bonus',
      bonusOfferFr: 'Bonus de 350 $',
      features: ['Unlimited transactions', 'No minimum balance', 'Free small safety deposit box', 'Credit card options'],
      featuresFr: ['Transactions illimitées', 'Aucun solde minimum', 'Petit coffre-fort gratuit', 'Options de carte de crédit'],
      processingTime: 'Same day',
      processingTimeFr: 'Même jour',
      newcomersUrl: 'https://www.td.com/ca/en/personal-banking/new-to-canada/',
      recommended: true,
      recommendedProvinces: ['ON', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'PE', 'NL', 'QC'],
      provinceNote: '',
      provinceNoteFr: ''
    },
    {
      id: 'scotia',
      name: 'Scotiabank',
      nameFr: 'Banque Scotia',
      logo: '🔴',
      color: 'from-red-600 to-red-800',
      accountName: 'Scotiabank StartRight',
      accountNameFr: 'Scotiabank StartRight',
      monthlyFee: 0,
      firstYearFree: true,
      bonusOffer: '$350 bonus + SCENE points',
      bonusOfferFr: 'Bonus 350 $ + points SCENE',
      features: ['No monthly fee for 1 year', 'No credit history required', 'Unlimited debits', 'Safety deposit box'],
      featuresFr: ['Aucuns frais pendant 1 an', 'Pas d\'historique de crédit requis', 'Débits illimités', 'Coffre-fort'],
      processingTime: 'Same day',
      processingTimeFr: 'Même jour',
      newcomersUrl: 'https://www.scotiabank.com/ca/en/personal/banking/new-to-canada.html',
      recommended: false,
      recommendedProvinces: ['ON', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'PE', 'NL'],
      provinceNote: 'Strong presence in Vancouver',
      provinceNoteFr: 'Forte présence à Vancouver'
    },
    {
      id: 'bmo',
      name: 'BMO Bank of Montreal',
      nameFr: 'BMO Banque de Montréal',
      logo: '🔵',
      color: 'from-blue-500 to-blue-700',
      accountName: 'BMO NewStart',
      accountNameFr: 'BMO Nouveau Départ',
      monthlyFee: 0,
      firstYearFree: true,
      bonusOffer: '$350 bonus',
      bonusOfferFr: 'Bonus de 350 $',
      features: ['Performance Plan waived for 1 year', 'No credit history needed', 'Unlimited transactions', 'BMO rewards'],
      featuresFr: ['Forfait Performance gratuit 1 an', 'Pas d\'historique de crédit', 'Transactions illimitées', 'Récompenses BMO'],
      processingTime: 'Same day',
      processingTimeFr: 'Même jour',
      newcomersUrl: 'https://www.bmo.com/main/personal/newcomers/',
      recommended: false,
      recommendedProvinces: ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'PE', 'NL'],
      provinceNote: 'Excellent French services for Quebec',
      provinceNoteFr: 'Excellents services en français pour le Québec'
    },
    {
      id: 'cibc',
      name: 'CIBC',
      nameFr: 'CIBC',
      logo: '🟠',
      color: 'from-amber-500 to-amber-700',
      accountName: 'CIBC Newcomer',
      accountNameFr: 'CIBC Nouvel Arrivant',
      monthlyFee: 0,
      firstYearFree: true,
      bonusOffer: '$250 bonus',
      bonusOfferFr: 'Bonus de 250 $',
      features: ['Smart Account free for 1 year', 'No credit history required', 'Global money transfer', 'Student options'],
      featuresFr: ['Compte Smart gratuit 1 an', 'Pas d\'historique de crédit', 'Transfert d\'argent mondial', 'Options étudiants'],
      processingTime: 'Same day',
      processingTimeFr: 'Même jour',
      newcomersUrl: 'https://www.cibc.com/en/new-to-canada.html',
      recommended: false,
      recommendedProvinces: ['ON', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'PE', 'NL', 'QC'],
      provinceNote: '',
      provinceNoteFr: ''
    },
    {
      id: 'nbc',
      name: 'National Bank',
      nameFr: 'Banque Nationale',
      logo: '🟣',
      color: 'from-purple-600 to-purple-800',
      accountName: 'NBC Newcomer Package',
      accountNameFr: 'Forfait Nouvel Arrivant NBC',
      monthlyFee: 0,
      firstYearFree: true,
      bonusOffer: '$200 bonus',
      bonusOfferFr: 'Bonus de 200 $',
      features: ['No fees for 2 years', 'Credit card included', 'Unlimited transactions', 'Preferred for Quebec residents'],
      featuresFr: ['Aucuns frais 2 ans', 'Carte de crédit incluse', 'Transactions illimitées', 'Idéal pour résidents QC'],
      processingTime: 'Same day',
      processingTimeFr: 'Même jour',
      newcomersUrl: 'https://www.nbc.ca/personal/accounts/newcomers.html',
      recommended: false,
      recommendedProvinces: ['QC'],
      provinceNote: '🌟 #1 recommended for Quebec',
      provinceNoteFr: '🌟 #1 recommandé pour le Québec'
    },
    {
      id: 'desjardins',
      name: 'Desjardins',
      nameFr: 'Desjardins',
      logo: '🟤',
      color: 'from-emerald-600 to-emerald-800',
      accountName: 'Desjardins Newcomer',
      accountNameFr: 'Desjardins Nouvel Arrivant',
      monthlyFee: 0,
      firstYearFree: true,
      bonusOffer: 'Varies by region',
      bonusOfferFr: 'Variable selon région',
      features: ['Quebec focused', 'French services', 'Credit building program', 'Insurance bundles'],
      featuresFr: ['Axé sur le Québec', 'Services en français', 'Programme construction crédit', 'Forfaits assurance'],
      processingTime: 'Same day',
      processingTimeFr: 'Même jour',
      newcomersUrl: 'https://www.desjardins.com/ca/personal-accounts/newcomers/',
      recommended: false,
      recommendedProvinces: ['QC'],
      provinceNote: '🌟 Largest French cooperative in Canada',
      provinceNoteFr: '🌟 Plus grande coopérative francophone au Canada'
    },
    {
      id: 'tangerine',
      name: 'Tangerine (Online)',
      nameFr: 'Tangerine (En ligne)',
      logo: '🟡',
      color: 'from-orange-500 to-orange-700',
      accountName: 'Tangerine No-Fee Daily Chequing',
      accountNameFr: 'Compte-chèques sans frais Tangerine',
      monthlyFee: 0,
      firstYearFree: true,
      bonusOffer: '$50 referral bonus',
      bonusOfferFr: 'Bonus de parrainage 50 $',
      features: ['No monthly fees ever', 'Free unlimited transactions', 'Online only', 'Owned by Scotiabank'],
      featuresFr: ['Aucuns frais mensuels', 'Transactions illimitées gratuites', 'En ligne uniquement', 'Propriété Scotia'],
      processingTime: '2-3 days',
      processingTimeFr: '2-3 jours',
      newcomersUrl: 'https://www.tangerine.ca/',
      recommended: false,
      recommendedProvinces: ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'PE', 'NL'],
      provinceNote: 'Online only - ABMs via Scotiabank network',
      provinceNoteFr: 'En ligne uniquement - GAB via réseau Scotiabank'
    },
    {
      id: 'simpli',
      name: 'Simpli Financial',
      nameFr: 'Simpli Financial',
      logo: '⭐',
      color: 'from-pink-500 to-pink-700',
      accountName: 'Simpli No Fee Chequing',
      accountNameFr: 'Compte-chèques sans frais Simpli',
      monthlyFee: 0,
      firstYearFree: true,
      bonusOffer: '$300 bonus',
      bonusOfferFr: 'Bonus de 300 $',
      features: ['No monthly fees', 'Unlimited e-Transfers', 'Online banking', 'Owned by CIBC'],
      featuresFr: ['Aucuns frais mensuels', 'e-Transferts illimités', 'Banque en ligne', 'Propriété CIBC'],
      processingTime: '2-3 days',
      processingTimeFr: '2-3 jours',
      newcomersUrl: 'https://www.simpli.ca/',
      recommended: false,
      recommendedProvinces: ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'PE', 'NL'],
      provinceNote: 'Online only - ABMs via CIBC network',
      provinceNoteFr: 'En ligne uniquement - GAB via réseau CIBC'
    }
  ]

  // Sort banks based on province recommendations
  const sortedBanks = [...newcomerBanks].sort((a, b) => {
    const aRecommended = a.recommendedProvinces?.includes(userProvince) ? 1 : 0
    const bRecommended = b.recommendedProvinces?.includes(userProvince) ? 1 : 0
    const provinceRecs = provinceBankInfo[userProvince]?.recommended || []
    const aIndex = provinceRecs.indexOf(a.id)
    const bIndex = provinceRecs.indexOf(b.id)
    
    // Banks specifically recommended for this province come first
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1
    
    // Then banks that serve this province
    if (aRecommended && !bRecommended) return -1
    if (!aRecommended && bRecommended) return 1
    
    return 0
  })

  // Check if a bank is specifically recommended for user's province
  const isProvinceRecommended = (bankId: string) => {
    return provinceBankInfo[userProvince]?.recommended?.includes(bankId) || false
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/20 dark:to-gray-900">
      <div className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200 dark:shadow-amber-900/30">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              {t('modules.finance.title', language)}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{t('modules.finance.description', language)}</p>
          </div>
        </div>

        {/* Bank Comparator Table */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Landmark className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              {language === 'fr' ? '🏦 Comparateur Bancaire Nouveaux Arrivants' : '🏦 Newcomer Bank Comparator'}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'fr' 
                ? 'Comparez les meilleures offres bancaires pour nouveaux arrivants au Canada' 
                : 'Compare the best banking offers for newcomers to Canada'}
            </p>
          </CardHeader>
          
          {/* Province-specific banner */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 px-6 py-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-purple-800 dark:text-purple-200">
                  {language === 'fr' 
                    ? `📍 Recommandations pour votre province: ${provinces.find(p => p.code === userProvince)?.name || userProvince}`
                    : `📍 Recommendations for your province: ${provinces.find(p => p.code === userProvince)?.nameEn || userProvince}`}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-300">
                  {language === 'fr' 
                    ? provinceBankInfo[userProvince]?.notesFr 
                    : provinceBankInfo[userProvince]?.notes}
                </p>
              </div>
            </div>
          </div>
          
          <CardContent className="p-0">
            {/* Mobile Cards View */}
            <div className="lg:hidden divide-y">
              {sortedBanks.map((bank) => (
                <div 
                  key={bank.id} 
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selectedBank?.id === bank.id ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}
                  onClick={() => setSelectedBank(bank)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${bank.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                        {bank.logo}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{language === 'fr' ? bank.nameFr : bank.name}</p>
                        <p className="text-sm text-gray-500">{language === 'fr' ? bank.accountNameFr : bank.accountName}</p>
                      </div>
                    </div>
                    {bank.recommended && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs">
                        ⭐ {language === 'fr' ? 'Recommandé' : 'Recommended'}
                      </Badge>
                    )}
                    {isProvinceRecommended(bank.id) && !bank.recommended && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 text-xs">
                        🎯 {language === 'fr' ? 'Top pour votre province' : 'Top for your province'}
                      </Badge>
                    )}
                    {bank.provinceNote && bank.recommendedProvinces?.includes(userProvince) && (
                      <span className="text-xs text-purple-600 dark:text-purple-400 ml-2">
                        {language === 'fr' ? bank.provinceNoteFr : bank.provinceNote}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">{language === 'fr' ? 'Frais/mois' : 'Fee/month'}</p>
                      <p className="font-bold text-green-600">${bank.monthlyFee}</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">{language === 'fr' ? '1ère année' : '1st year'}</p>
                      <p className="font-bold text-blue-600">{language === 'fr' ? 'Gratuite' : 'Free'}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg p-2 mb-3">
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                      🎁 {language === 'fr' ? bank.bonusOfferFr : bank.bonusOffer}
                    </p>
                  </div>
                  
                  <a 
                    href={bank.newcomersUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    {language === 'fr' ? 'Visiter la page Nouveaux Arrivants' : 'Visit Newcomer Page'}
                  </a>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
                      {language === 'fr' ? '🏦 Banque' : '🏦 Bank'}
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
                      {language === 'fr' ? '📦 Compte' : '📦 Account'}
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700 dark:text-gray-300">
                      {language === 'fr' ? '💰 Frais/mois' : '💰 Fee/month'}
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700 dark:text-gray-300">
                      {language === 'fr' ? '🎁 Bonus' : '🎁 Bonus'}
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
                      {language === 'fr' ? '✨ Avantages clés' : '✨ Key benefits'}
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700 dark:text-gray-300">
                      {language === 'fr' ? '⏱️ Délai' : '⏱️ Time'}
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700 dark:text-gray-300">
                      {language === 'fr' ? '🔗 Lien' : '🔗 Link'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {sortedBanks.map((bank, index) => (
                    <tr 
                      key={bank.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                        selectedBank?.id === bank.id ? 'bg-amber-50 dark:bg-amber-900/20' : ''
                      } ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'}`}
                      onClick={() => setSelectedBank(bank)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${bank.color} rounded-xl flex items-center justify-center text-white text-lg shadow-md`}>
                            {bank.logo}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-bold">{language === 'fr' ? bank.nameFr : bank.name}</p>
                              {bank.recommended && (
                                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-[10px] px-1.5 py-0">
                                  ⭐ TOP
                                </Badge>
                              )}
                              {isProvinceRecommended(bank.id) && !bank.recommended && (
                                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 text-[10px] px-1.5 py-0">
                                  🎯 {language === 'fr' ? 'Province' : 'Province'}
                                </Badge>
                              )}
                            </div>
                            {bank.provinceNote && bank.recommendedProvinces?.includes(userProvince) && (
                              <p className="text-xs text-purple-600 dark:text-purple-400 mt-0.5">
                                {language === 'fr' ? bank.provinceNoteFr : bank.provinceNote}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium">{language === 'fr' ? bank.accountNameFr : bank.accountName}</p>
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="text-2xl font-bold text-green-600">${bank.monthlyFee}</span>
                          <span className="text-xs text-gray-500">
                            {bank.firstYearFree ? (language === 'fr' ? '(1ère année gratuite)' : '(1st year free)') : ''}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 text-amber-700 dark:text-amber-300 px-3 py-1.5 rounded-full text-sm font-semibold">
                          🎁 {language === 'fr' ? bank.bonusOfferFr : bank.bonusOffer}
                        </span>
                      </td>
                      <td className="p-4">
                        <ul className="space-y-1">
                          {(language === 'fr' ? bank.featuresFr : bank.features).slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-xs">
                          {language === 'fr' ? bank.processingTimeFr : bank.processingTime}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <a 
                          href={bank.newcomersUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                          {language === 'fr' ? 'Visiter' : 'Visit'}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 border-t px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4 w-full">
              <p className="text-sm text-gray-500">
                {language === 'fr' 
                  ? '💡 Conseil: Les 5 grandes banques (RBC, TD, Scotia, BMO, CIBC) offrent toutes des programmes spéciaux nouveaux arrivants avec des bonus compétitifs.'
                  : '💡 Tip: The Big 5 banks (RBC, TD, Scotia, BMO, CIBC) all offer special newcomer programs with competitive bonuses.'}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{language === 'fr' ? 'Dernière mise à jour:' : 'Last updated:'}</span>
                <span className="text-xs font-medium">2025</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Selected Bank Details Modal */}
        {selectedBank && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${selectedBank.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                    {selectedBank.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{language === 'fr' ? selectedBank.nameFr : selectedBank.name}</h3>
                    <p className="text-gray-500">{language === 'fr' ? selectedBank.accountNameFr : selectedBank.accountName}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedBank(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {language === 'fr' ? 'Avantages complets' : 'Full benefits'}
                  </h4>
                  <ul className="space-y-2">
                    {(language === 'fr' ? selectedBank.featuresFr : selectedBank.features).map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-500" />
                    {language === 'fr' ? 'Détails de l\'offre' : 'Offer details'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{language === 'fr' ? 'Frais mensuels:' : 'Monthly fee:'}</span>
                      <span className="font-semibold text-green-600">${selectedBank.monthlyFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{language === 'fr' ? '1ère année:' : '1st year:'}</span>
                      <span className="font-semibold text-green-600">{language === 'fr' ? 'Gratuite' : 'Free'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{language === 'fr' ? 'Bonus:' : 'Bonus:'}</span>
                      <span className="font-semibold text-amber-600">{language === 'fr' ? selectedBank.bonusOfferFr : selectedBank.bonusOffer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{language === 'fr' ? 'Ouverture:' : 'Opening:'}</span>
                      <span className="font-medium">{language === 'fr' ? selectedBank.processingTimeFr : selectedBank.processingTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <a 
                href={selectedBank.newcomersUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-medium shadow-lg transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                {language === 'fr' ? `Ouvrir un compte chez ${selectedBank.nameFr}` : `Open an account with ${selectedBank.name}`}
              </a>
            </CardContent>
          </Card>
        )}

        {/* Credit & Tax Guides */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                {language === 'fr' ? '📈 Construire votre crédit' : '📈 Build Your Credit'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { step: 1, title: language === 'fr' ? 'Obtenir une carte sécurisée' : 'Get a secured card', desc: language === 'fr' ? 'Carte avec dépôt de garantie' : 'Card with security deposit', emoji: '💳' },
                { step: 2, title: language === 'fr' ? 'Payer à temps' : 'Pay on time', desc: language === 'fr' ? 'Toujours payer le minimum' : 'Always pay at least the minimum', emoji: '📅' },
                { step: 3, title: language === 'fr' ? 'Maintenir l\'utilisation basse' : 'Keep utilization low', desc: language === 'fr' ? '<30% de votre limite' : '<30% of your limit', emoji: '📊' },
                { step: 4, title: language === 'fr' ? 'Vérifier votre score' : 'Check your score', desc: language === 'fr' ? 'Equifax ou TransUnion' : 'Equifax or TransUnion', emoji: '🔍' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.emoji} {item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Receipt className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                {language === 'fr' ? '🧾 Guide fiscal simplifié' : '🧾 Simplified Tax Guide'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: 'T4', desc: language === 'fr' ? 'Revenu d\'emploi' : 'Employment income', emoji: '💼' },
                { title: 'T1 General', desc: language === 'fr' ? 'Déclaration de revenus' : 'Tax return form', emoji: '📝' },
                { title: 'GST/HST Credit', desc: language === 'fr' ? 'Crédit TPS/TVH' : 'GST/HST credit', emoji: '💰' },
                { title: 'Canada Child Benefit', desc: language === 'fr' ? 'Allocation canadienne enfants' : 'Canada Child Benefit', emoji: '👨‍👩‍👧' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Money Transfer */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Send className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              {language === 'fr' ? '💸 Transferts d\'argent internationaux' : '💸 International Money Transfers'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Wise', fee: '~0.5%', time: language === 'fr' ? '1-2 jours' : '1-2 days', color: 'from-green-400 to-green-600', rating: '⭐⭐⭐⭐⭐', note: language === 'fr' ? 'Meilleurs taux' : 'Best rates' },
                { name: 'Remitly', fee: '~1%', time: language === 'fr' ? 'Instantané' : 'Instant', color: 'from-blue-400 to-blue-600', rating: '⭐⭐⭐⭐', note: language === 'fr' ? 'Rapide' : 'Fast' },
                { name: 'Tap Tap Send', fee: '~0-2%', time: language === 'fr' ? 'Instantané' : 'Instant', color: 'from-purple-400 to-pink-600', rating: '⭐⭐⭐⭐', note: language === 'fr' ? 'Populaire pour Afrique' : 'Popular for Africa' },
                { name: 'Western Union', fee: '~3%', time: language === 'fr' ? 'Instantané' : 'Instant', color: 'from-yellow-400 to-yellow-600', rating: '⭐⭐⭐', note: language === 'fr' ? 'Partout' : 'Everywhere' },
              ].map((service, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                  <CardContent className="p-5 text-center">
                    <p className="font-bold text-xl">{service.name}</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1">{service.note}</p>
                    <p className="text-sm text-gray-500 mt-1">{language === 'fr' ? 'Frais' : 'Fee'}: {service.fee}</p>
                    <Badge className="mt-2">{service.time}</Badge>
                    <p className="text-xs mt-2">{service.rating}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ==================== HEALTH MODULE ====================
// Health eligibility rules by province and immigration status
