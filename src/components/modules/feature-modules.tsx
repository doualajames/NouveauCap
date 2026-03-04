'use client'

import { useState, useMemo } from 'react'
import { X, Send, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calculator, Globe, FileText, Heart, AlertTriangle, 
  CheckCircle2, Clock, TrendingUp, ChevronRight, Sparkles,
  Building, GraduationCap, Wallet, Shield, MessageSquare,
  ExternalLink, RefreshCw, Filter
} from 'lucide-react'

// Import data modules
import { calculateCRSScore, expressEntryDraws, scoreInterpretation } from '@/lib/data/crs-data'
import { allPNPStreams, getStreamsByProvince, checkEligibility, provinceInfo } from '@/lib/data/pnp-data'
import { newcomerTaxCredits, calculateEstimatedTax, firstTaxReturnDocuments } from '@/lib/data/tax-data'
import { provincialHealthPlans, calculateCoverageStartDate, privateInsuranceOptions } from '@/lib/data/health-data'
import { ecaOrganizations, regulatedProfessions } from '@/lib/data/credential-data'
import { generateAlertsFromProfile, getSeasonalAlerts, getAlertColor, getAlertIcon, type Alert } from '@/lib/data/alerts-data'

// ==================== CRS CALCULATOR MODULE ====================
interface CRSCalculatorProps {
  language: 'fr' | 'en'
  onScoreCalculated?: (score: number) => void
}

export function CRSCalculatorModule({ language, onScoreCalculated }: CRSCalculatorProps) {
  const [age, setAge] = useState(30)
  const [education, setEducation] = useState('bachelors')
  const [hasSpouse, setHasSpouse] = useState(false)
  const [englishClb, setEnglishClb] = useState(7)
  const [canadianWork, setCanadianWork] = useState(2)
  const [foreignWork, setForeignWork] = useState(3)
  const [hasPN, setHasPN] = useState(false)
  const [hasSibling, setHasSibling] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [breakdown, setBreakdown] = useState<Record<string, number>>({})
  const [recommendations, setRecommendations] = useState<string[]>([])

  const handleCalculate = () => {
    const result = calculateCRSScore({
      age,
      education,
      hasSpouse,
      englishListening: englishClb,
      englishSpeaking: englishClb,
      englishReading: englishClb,
      englishWriting: englishClb,
      canadianWorkYears: canadianWork,
      foreignWorkYears: foreignWork,
      hasProvincialNomination: hasPN,
      hasSiblingInCanada: hasSibling,
      hasCanadianEducation: false,
    })

    setScore(result.total)
    setBreakdown(result.breakdown)
    setRecommendations(result.recommendations)
    onScoreCalculated?.(result.total)
  }

  const getScoreColor = () => {
    if (!score) return 'text-gray-400'
    if (score >= 500) return 'text-green-500'
    if (score >= 470) return 'text-blue-500'
    if (score >= 430) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreMessage = () => {
    if (!score) return null
    if (score >= 500) return language === 'fr' ? 'Excellent - Invitation probable!' : 'Excellent - Invitation likely!'
    if (score >= 470) return language === 'fr' ? 'Bon score - PNP recommandé' : 'Good score - PNP recommended'
    if (score >= 430) return language === 'fr' ? 'Score modéré - PNP fortement recommandé' : 'Moderate - PNP strongly recommended'
    return language === 'fr' ? 'Considérez les autres voies' : 'Consider other pathways'
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-purple-500" />
          {language === 'fr' ? 'Simulateur CRS 2025' : 'CRS Calculator 2025'}
        </CardTitle>
        <CardDescription>
          {language === 'fr' 
            ? '⚠️ Points offre d\'emploi SUPPRIMÉS depuis mars 2025'
            : '⚠️ Job offer points REMOVED as of March 2025'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{language === 'fr' ? 'Âge' : 'Age'}</Label>
            <Input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} min={17} max={55} />
          </div>
          <div className="space-y-2">
            <Label>{language === 'fr' ? 'Niveau d\'études' : 'Education Level'}</Label>
            <Select value={education} onValueChange={setEducation}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="secondary">{language === 'fr' ? 'Secondaire' : 'Secondary'}</SelectItem>
                <SelectItem value="one_year_degree">{language === 'fr' ? 'Diplôme 1 an' : '1-year Diploma'}</SelectItem>
                <SelectItem value="two_year_degree">{language === 'fr' ? 'Diplôme 2 ans' : '2-year Diploma'}</SelectItem>
                <SelectItem value="bachelors">{language === 'fr' ? 'Baccalauréat' : 'Bachelor\'s'}</SelectItem>
                <SelectItem value="masters">{language === 'fr' ? 'Maîtrise' : 'Master\'s'}</SelectItem>
                <SelectItem value="doctorate">{language === 'fr' ? 'Doctorat' : 'PhD'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>CLB {language === 'fr' ? 'Anglais' : 'English'}</Label>
            <Select value={englishClb.toString()} onValueChange={(v) => setEnglishClb(parseInt(v))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {[4,5,6,7,8,9,10].map(clb => (
                  <SelectItem key={clb} value={clb.toString()}>CLB {clb}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{language === 'fr' ? 'Expérience Canada (ans)' : 'Canadian Exp (years)'}</Label>
            <Input type="number" value={canadianWork} onChange={(e) => setCanadianWork(parseInt(e.target.value))} min={0} max={5} />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={hasPN} onChange={(e) => setHasPN(e.target.checked)} className="rounded" />
            <span className="text-sm">{language === 'fr' ? 'Nomination provinciale (+600)' : 'Provincial Nomination (+600)'}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={hasSibling} onChange={(e) => setHasSibling(e.target.checked)} className="rounded" />
            <span className="text-sm">{language === 'fr' ? 'Frère/sœur au Canada (+15)' : 'Sibling in Canada (+15)'}</span>
          </label>
        </div>

        <Button onClick={handleCalculate} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
          <Calculator className="w-4 h-4 mr-2" />
          {language === 'fr' ? 'Calculer mon score' : 'Calculate my score'}
        </Button>

        {score !== null && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
              <p className="text-sm text-gray-500">{language === 'fr' ? 'Score CRS estimé' : 'Estimated CRS score'}</p>
              <p className={`text-6xl font-bold ${getScoreColor()}`}>{score}</p>
              <p className="text-sm text-gray-600 mt-2">{getScoreMessage()}</p>
            </div>

            {Object.keys(breakdown).length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">{language === 'fr' ? 'Détail des points' : 'Points breakdown'}</p>
                {Object.entries(breakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">{language === 'fr' ? 'Recommandations' : 'Recommendations'}</p>
                {recommendations.map((rec, i) => (
                  <p key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
                    {rec}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ==================== PNP TRACKER MODULE ====================
interface PNPTrackerProps {
  language: 'fr' | 'en'
  userProvince?: string
}

export function PNPTrackerModule({ language, userProvince }: PNPTrackerProps) {
  const [selectedProvince, setSelectedProvince] = useState(userProvince || 'ON')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [streams, setStreams] = useState(allPNPStreams)

  const filteredStreams = streams.filter(s => {
    if (!s.isActive) return false
    if (selectedProvince && s.provinceCode !== selectedProvince) return false
    if (selectedCategory !== 'all' && s.category !== selectedCategory) return false
    return true
  })

  const categories = [
    { value: 'all', label: language === 'fr' ? 'Tous' : 'All' },
    { value: 'tech', label: 'Tech' },
    { value: 'healthcare', label: language === 'fr' ? 'Santé' : 'Healthcare' },
    { value: 'skilled_worker', label: language === 'fr' ? 'Travailleurs qualifiés' : 'Skilled Worker' },
    { value: 'international_graduate', label: language === 'fr' ? 'Diplômés' : 'Graduates' },
  ]

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          {language === 'fr' ? 'Tracker PNP 2025' : 'PNP Tracker 2025'}
        </CardTitle>
        <CardDescription>
          {language === 'fr' 
            ? `${allPNPStreams.filter(s => s.isActive).length} programmes actifs`
            : `${allPNPStreams.filter(s => s.isActive).length} active programs`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Select value={selectedProvince} onValueChange={setSelectedProvince}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(provinceInfo).map(([code, info]) => (
                <SelectItem key={code} value={code}>{info.nameFr}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {filteredStreams.map(stream => (
              <div 
                key={stream.id} 
                className="p-4 rounded-xl border bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{stream.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{stream.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {stream.type === 'enhanced' && (
                      <Badge className="bg-green-100 text-green-700">EE</Badge>
                    )}
                    <Badge variant="outline">+{stream.points}</Badge>
                  </div>
                </div>
                
                {stream.lastDrawScore && (
                  <div className="mt-3 pt-3 border-t flex items-center gap-4 text-sm">
                    <span className="text-gray-500">
                      {language === 'fr' ? 'Dernier tirage:' : 'Last draw:'}
                    </span>
                    <span className="font-medium">{stream.lastDrawScore} pts</span>
                    {stream.lastDrawDate && (
                      <span className="text-gray-400">{stream.lastDrawDate}</span>
                    )}
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {stream.requirements.language && (
                    <Badge variant="secondary">CLB {stream.requirements.language.english}</Badge>
                  )}
                  {stream.requirements.workExperience && (
                    <Badge variant="secondary">{stream.requirements.workExperience}+ {language === 'fr' ? 'ans exp.' : 'yrs exp'}</Badge>
                  )}
                  {stream.requirements.jobOffer && (
                    <Badge variant="secondary">{language === 'fr' ? 'Offre requise' : 'Job offer req'}</Badge>
                  )}
                </div>

                <a 
                  href={stream.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-blue-500 hover:underline"
                >
                  {language === 'fr' ? 'Site officiel' : 'Official site'}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

// ==================== TAX GUIDE MODULE ====================
interface TaxGuideProps {
  language: 'fr' | 'en'
  province?: string
}

export function TaxGuideModule({ language, province = 'ON' }: TaxGuideProps) {
  const [income, setIncome] = useState(60000)
  const [taxResult, setTaxResult] = useState<{ federal: number; provincial: number; total: number; marginalRate: number } | null>(null)

  const handleCalculateTax = () => {
    const result = calculateEstimatedTax(income, province)
    setTaxResult(result)
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-green-500" />
          {language === 'fr' ? 'Guide Fiscal Nouveaux Arrivants' : 'Newcomer Tax Guide'}
        </CardTitle>
        <CardDescription>
          {language === 'fr' ? 'Crédits et prestations pour votre première année' : 'Credits and benefits for your first year'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="credits">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="credits">{language === 'fr' ? 'Crédits' : 'Credits'}</TabsTrigger>
            <TabsTrigger value="calculator">{language === 'fr' ? 'Calculateur' : 'Calculator'}</TabsTrigger>
            <TabsTrigger value="documents">{language === 'fr' ? 'Documents' : 'Documents'}</TabsTrigger>
          </TabsList>

          <TabsContent value="credits" className="space-y-4 mt-4">
            <div className="space-y-3">
              {newcomerTaxCredits.federal.slice(0, 4).map(credit => (
                <div key={credit.id} className="p-4 rounded-xl border bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{language === 'fr' ? credit.name : credit.nameEn}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {language === 'fr' ? credit.description : credit.descriptionEn}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      {language === 'fr' ? `Jusqu'à ${credit.maxAmount}$` : `Up to $${credit.maxAmount}`}
                    </Badge>
                  </div>
                  <a 
                    href={credit.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-blue-500 hover:underline"
                  >
                    {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{language === 'fr' ? 'Revenu annuel estimé' : 'Estimated annual income'}</Label>
                <Input 
                  type="number" 
                  value={income} 
                  onChange={(e) => setIncome(parseInt(e.target.value))}
                  className="text-lg"
                />
              </div>
              <Button onClick={handleCalculateTax} className="w-full">
                {language === 'fr' ? 'Estimer mes impôts' : 'Estimate my taxes'}
              </Button>

              {taxResult && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">{language === 'fr' ? 'Impôt fédéral' : 'Federal tax'}</p>
                      <p className="text-xl font-bold">${taxResult.federal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{language === 'fr' ? 'Impôt provincial' : 'Provincial tax'}</p>
                      <p className="text-xl font-bold">${taxResult.provincial.toLocaleString()}</p>
                    </div>
                    <div className="col-span-2 pt-4 border-t">
                      <p className="text-sm text-gray-500">{language === 'fr' ? 'Total estimé' : 'Total estimated'}</p>
                      <p className="text-3xl font-bold text-green-600">${taxResult.total.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {language === 'fr' ? `Taux marginal: ${taxResult.marginalRate}%` : `Marginal rate: ${taxResult.marginalRate}%`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4 mt-4">
            <div className="space-y-2">
              {firstTaxReturnDocuments.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <FileText className={`w-5 h-5 ${doc.required ? 'text-red-500' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <p className="font-medium">{language === 'fr' ? doc.name : doc.nameEn}</p>
                    {doc.required && (
                      <Badge variant="outline" className="text-xs">{language === 'fr' ? 'Requis' : 'Required'}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// ==================== HEALTH COVERAGE MODULE ====================
interface HealthCoverageProps {
  language: 'fr' | 'en'
  province?: string
  immigrationStatus?: string
  arrivalDate?: Date
}

export function HealthCoverageModule({ language, province = 'ON', immigrationStatus, arrivalDate }: HealthCoverageProps) {
  const plan = provincialHealthPlans[province as keyof typeof provincialHealthPlans]
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          {language === 'fr' ? 'Couverture Santé Provinciale' : 'Provincial Health Coverage'}
        </CardTitle>
        <CardDescription>
          {plan?.fullNameFr} ({plan?.name})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Waiting Period Alert */}
        <div className={`p-4 rounded-xl ${plan?.waitingPeriod === 0 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
          <div className="flex items-start gap-3">
            {plan?.waitingPeriod === 0 ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
            ) : (
              <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
            )}
            <div>
              <p className="font-medium">
                {plan?.waitingPeriod === 0 
                  ? (language === 'fr' ? 'Pas de délai de carence!' : 'No waiting period!')
                  : (language === 'fr' ? `Délai de carence: ${plan?.waitingPeriod} jours` : `Waiting period: ${plan?.waitingPeriod} days`)
                }
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'fr' ? plan?.waitingPeriodNote?.fr : plan?.waitingPeriodNote?.en}
              </p>
            </div>
          </div>
        </div>

        {/* Eligibility */}
        <div className="space-y-2">
          <h4 className="font-medium">{language === 'fr' ? 'Statuts admissibles' : 'Eligible statuses'}</h4>
          <div className="flex flex-wrap gap-2">
            {plan?.eligibleStatuses?.map(status => (
              <Badge key={status} className="bg-green-100 text-green-700">{status}</Badge>
            ))}
          </div>
          {plan?.notEligible && (
            <div className="mt-2">
              <p className="text-sm text-red-600">
                {language === 'fr' ? 'Non admissible: ' : 'Not eligible: '}
                {plan.notEligible.join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Coverage */}
        <div className="space-y-2">
          <h4 className="font-medium">{language === 'fr' ? 'Services couverts' : 'Covered services'}</h4>
          <div className="grid grid-cols-2 gap-2">
            {plan?.coverage && Object.entries(plan.coverage).map(([service, covered]) => (
              <div key={service} className="flex items-center gap-2">
                {covered ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                )}
                <span className="text-sm capitalize">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <a 
          href={plan?.applyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="w-full">
            {language === 'fr' ? 'Demander la carte d\'assurance-maladie' : 'Apply for health card'}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </a>

        {/* Private Insurance */}
        {plan?.waitingPeriod && plan.waitingPeriod > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-medium">{language === 'fr' ? 'Assurance privée recommandée' : 'Recommended private insurance'}</h4>
            <div className="space-y-2">
              {privateInsuranceOptions.slice(0, 3).map(option => (
                <a 
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg border hover:border-blue-300 transition-colors"
                >
                  <p className="font-medium">{option.name}</p>
                  <p className="text-sm text-gray-500">{option.cost}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ==================== CREDENTIAL RECOGNITION MODULE ====================
interface CredentialRecognitionProps {
  language: 'fr' | 'en'
}

export function CredentialRecognitionModule({ language }: CredentialRecognitionProps) {
  const [searchProfession, setSearchProfession] = useState('')

  const allProfessions = [
    ...regulatedProfessions.health,
    ...regulatedProfessions.engineering,
    ...regulatedProfessions.legal,
    ...regulatedProfessions.accounting,
    ...regulatedProfessions.skilledTrades,
    ...regulatedProfessions.education,
  ]

  const filteredProfessions = searchProfession 
    ? allProfessions.filter(p => 
        p.name.toLowerCase().includes(searchProfession.toLowerCase()) ||
        p.nameEn.toLowerCase().includes(searchProfession.toLowerCase())
      )
    : allProfessions.slice(0, 5)

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-500" />
          {language === 'fr' ? 'Reconnaissance des Diplômes' : 'Credential Recognition'}
        </CardTitle>
        <CardDescription>
          {language === 'fr' ? 'ECA et professions réglementées' : 'ECA and regulated professions'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="eca">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="eca">ECA</TabsTrigger>
            <TabsTrigger value="professions">{language === 'fr' ? 'Professions' : 'Professions'}</TabsTrigger>
          </TabsList>

          <TabsContent value="eca" className="space-y-3 mt-4">
            {ecaOrganizations.slice(0, 5).map(org => (
              <div key={org.id} className="p-4 rounded-xl border">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{org.shortName}</h4>
                    <p className="text-sm text-gray-500">{language === 'fr' ? org.description : org.descriptionEn}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">{org.processingTime}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="text-green-600">${org.cost} CAD</span>
                  <span className="text-yellow-600">★ {org.rating}/5</span>
                </div>
                <a href={org.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-blue-500">
                  {language === 'fr' ? 'Site officiel' : 'Official site'} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="professions" className="space-y-4 mt-4">
            <Input 
              placeholder={language === 'fr' ? 'Rechercher une profession...' : 'Search for a profession...'}
              value={searchProfession}
              onChange={(e) => setSearchProfession(e.target.value)}
            />
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {filteredProfessions.map((prof, i) => (
                  <div key={i} className="p-4 rounded-xl border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{language === 'fr' ? prof.name : prof.nameEn}</h4>
                        <p className="text-sm text-gray-500">NOC: {prof.noc}</p>
                      </div>
                      <Badge className={
                        prof.difficulty === 'very_hard' ? 'bg-red-100 text-red-700' :
                        prof.difficulty === 'hard' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }>
                        {prof.timeline}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {language === 'fr' ? prof.regulatoryBody : prof.regulatoryBodyEn}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// ==================== ALERTS MODULE ====================
interface AlertsModuleProps {
  language: 'fr' | 'en'
  userProfile?: {
    immigrationStatus: string
    studyPermitExpiry?: Date
    workPermitExpiry?: Date
    passportExpiry?: Date
    prCardExpiry?: Date
    arrivalDate?: Date
    province?: string
    healthCardApplied?: boolean
  }
}

export function AlertsModule({ language, userProfile }: AlertsModuleProps) {
  // Use useMemo instead of useEffect + setState to avoid cascading renders
  const alerts = useMemo(() => {
    if (userProfile) {
      const profileAlerts = generateAlertsFromProfile(userProfile)
      const seasonalAlerts = getSeasonalAlerts(language)
      return [...profileAlerts, ...seasonalAlerts]
    }
    return []
  }, [userProfile, language])

  const priorityColors: Record<string, string> = {
    critical: 'bg-red-50 border-red-200',
    high: 'bg-orange-50 border-orange-200',
    medium: 'bg-yellow-50 border-yellow-200',
    low: 'bg-blue-50 border-blue-200',
    info: 'bg-gray-50 border-gray-200',
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          {language === 'fr' ? 'Alertes Intelligentes' : 'Smart Alerts'}
        </CardTitle>
        <CardDescription>
          {alerts.length} {language === 'fr' ? 'alertes actives' : 'active alerts'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px]">
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                <p>{language === 'fr' ? 'Aucune alerte' : 'No alerts'}</p>
              </div>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className={`p-4 rounded-xl border ${priorityColors[alert.priority]}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                    <div className="flex-1">
                      <h4 className="font-medium">{language === 'fr' ? alert.title : alert.titleEn}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {language === 'fr' ? alert.message : alert.messageEn}
                      </p>
                      {alert.daysRemaining !== undefined && alert.daysRemaining > 0 && (
                        <p className="text-sm font-medium mt-2">
                          {language === 'fr' ? `${alert.daysRemaining} jours restants` : `${alert.daysRemaining} days remaining`}
                        </p>
                      )}
                      {alert.actionRequired && alert.actionUrl && (
                        <a 
                          href={alert.actionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-sm text-blue-500 hover:underline"
                        >
                          {language === 'fr' ? alert.actionLabel : alert.actionLabelEn}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <Badge className={`bg-${getAlertColor(alert.priority)}-100 text-${getAlertColor(alert.priority)}-700`}>
                      {alert.priority}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

// ==================== CHATBOT WIDGET ====================
interface ChatbotWidgetProps {
  language: 'fr' | 'en'
}

export function ChatbotWidget({ language }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return

    const userMessage = message
    setMessage('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages, language })
      })
      const data = await res.json()
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: language === 'fr' ? 'Désolé, une erreur est survenue.' : 'Sorry, an error occurred.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">{language === 'fr' ? 'Assistant Immigration' : 'Immigration Assistant'}</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-8">
              {language === 'fr' 
                ? 'Bonjour! Posez-moi vos questions sur l\'immigration canadienne.'
                : 'Hello! Ask me your questions about Canadian immigration.'}
            </p>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-xl ${
                msg.role === 'user' 
                  ? 'bg-purple-500 text-white rounded-br-none' 
                  : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl rounded-bl-none">
                <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={language === 'fr' ? 'Votre message...' : 'Your message...'}
          />
          <Button onClick={sendMessage} disabled={isLoading} className="bg-purple-500 hover:bg-purple-600">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


