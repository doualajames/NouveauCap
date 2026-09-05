'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { t, type Language, type Province } from '@/lib/stores/app-store'
import { AlertCircle, CheckCircle2, Clock, ExternalLink, FileText, Heart, ListChecks, MapPin, Phone, Shield, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Clinic, countries, getClinicsByPostalCode, healthEligibilityRules, modules, provinces } from '@/lib/app-data'

export function HealthModule({ language, user, onNavigate }: {
  language: Language
  user: any
  onNavigate: (module: string | null) => void
}) {
  const [provinceHealthInfo, setProvinceHealthInfo] = useState<any>(null)
  const [showAllDocuments, setShowAllDocuments] = useState(false)
  const [postalCode, setPostalCode] = useState(user?.postalCode || '')
  const [clinicFilter, setClinicFilter] = useState<'ALL' | 'WALK_IN' | 'CLSC' | 'HOSPITAL' | 'PRIVATE'>('ALL')

  // Get eligibility for user's situation - with special handling for Quebec foreign students
  const getEligibility = () => {
    if (!user?.province || !user?.immigrationStatus) return null
    
    const baseEligibility = healthEligibilityRules[user.province]?.[user.immigrationStatus]
    
    // Special case: Quebec foreign students - check country of origin
    if (user.province === 'QC' && user.immigrationStatus === 'FOREIGN_STUDENT' && user.countryOfOrigin) {
      const country = countries.find(c => c.code === user.countryOfOrigin)
      const hasAgreement = country?.quebecAgreement || false
      
      if (hasAgreement) {
        // Country has agreement with Quebec - student is eligible for RAMQ
        return {
          eligible: true,
          conditional: false,
          waitPeriod: language === 'fr' ? 'Immédiat' : 'Immediate',
          waitPeriodEn: 'Immediate',
          conditions: [
            `✅ ${country?.flag} ${language === 'fr' ? country.name : (country.nameEn || country.name)} a une entente de sécurité sociale avec le Québec`,
            'Inscription à la RAMQ obligatoire dès l\'arrivée',
            'Présenter le certificat d\'assurance de votre pays d\'origine',
            'Permis d\'études valide'
          ],
          conditionsEn: [
            `✅ ${country?.flag} ${country.nameEn || country.name} has a social security agreement with Quebec`,
            'Mandatory RAMQ registration upon arrival',
            'Present insurance certificate from your home country',
            'Valid study permit'
          ],
          documents: [
            { name: 'Certificat d\'assurance du pays d\'origine', nameEn: 'Insurance certificate from home country', required: true },
            { name: 'Permis d\'études valide', nameEn: 'Valid study permit', required: true },
            { name: 'Attestation d\'inscription universitaire', nameEn: 'University enrollment certificate', required: true },
            { name: 'Passeport valide', nameEn: 'Valid passport', required: true },
            { name: 'Preuve de résidence au Québec', nameEn: 'Proof of Quebec residence', required: true }
          ],
          applyUrl: 'https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/inscription',
          planName: `RAMQ - ${country?.flag} ${language === 'fr' ? country.name : (country.nameEn || country.name)}`,
          planNameEn: `RAMQ - ${country?.flag} ${country.nameEn || country.name}`,
          specialNote: `✅ ${country?.flag} Excellente nouvelle! Vous êtes admissible à la RAMQ grâce à l'entente avec votre pays.`,
          specialNoteEn: `✅ ${country?.flag} Great news! You are eligible for RAMQ thanks to the agreement with your country.`
        }
      } else {
        // Country does NOT have agreement - need private insurance
        return {
          eligible: false,
          conditional: false,
          waitPeriod: language === 'fr' ? 'Non admissible' : 'Not eligible',
          waitPeriodEn: 'Not eligible',
          conditions: [
            `❌ ${country?.flag} ${language === 'fr' ? country.name : (country.nameEn || country.name)} n'a PAS d'entente de sécurité sociale avec le Québec`,
            'Une assurance santé privée est OBLIGATOIRE',
            'Vérifiez si votre établissement offre une assurance groupe',
            'Vous pouvez souscrire une assurance privée (Guard.me, MSH, etc.)'
          ],
          conditionsEn: [
            `❌ ${country?.flag} ${country.nameEn || country.name} does NOT have a social security agreement with Quebec`,
            'Private health insurance is MANDATORY',
            'Check if your institution offers group insurance',
            'You can purchase private insurance (Guard.me, MSH, etc.)'
          ],
          documents: [
            { name: 'Assurance santé privée', nameEn: 'Private health insurance', required: true, notes: 'Obligatoire pendant vos études', notesEn: 'Mandatory during your studies' },
            { name: 'Permis d\'études valide', nameEn: 'Valid study permit', required: true },
            { name: 'Lettre d\'admission', nameEn: 'Letter of admission', required: false }
          ],
          applyUrl: '#',
          planName: `Assurance privée requise - ${country?.flag}`,
          planNameEn: `Private insurance required - ${country?.flag}`,
          specialNote: `⚠️ ${country?.flag} Votre pays n'a pas d'entente avec le Québec. Souscrivez une assurance privée avant votre arrivée!`,
          specialNoteEn: `⚠️ ${country?.flag} Your country has no agreement with Quebec. Purchase private insurance before arrival!`
        }
      }
    }
    
    return baseEligibility
  }
  
  const eligibility = getEligibility()

  useEffect(() => {
    if (user?.province) {
      fetch(`/api/user-data?action=get-province-info&province=${user.province}`)
        .then(res => res.json())
        .then(data => {
          if (data.info) {
            const healthData = data.info.healthInsurance ? JSON.parse(data.info.healthInsurance) : null
            setProvinceHealthInfo(healthData)
          }
        })
    }
  }, [user?.province])

  return (
    <div className="min-h-screen bg-muted">
      <div className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-none shadow-red-200 dark:shadow-red-900/30">
            <Heart className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground dark:">
              {t('modules.health.title', language)}
            </h1>
            <p className="text-muted-foreground text-muted-foreground">{t('modules.health.description', language)}</p>
          </div>
        </div>

        {/* ELIGIBILITY CHECKER */}
        {eligibility ? (
          <Card className="border border-border shadow-none overflow-hidden">
            <div className={`p-4 ${eligibility.eligible 
 ? (eligibility.conditional 
 ? 'bg-primary text-primary-foreground' 
 : 'bg-primary text-primary-foreground')
 : 'bg-primary text-primary-foreground'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {eligibility.eligible ? (
                    eligibility.conditional ? (
                      <AlertCircle className="w-6 h-6" />
                    ) : (
                      <CheckCircle2 className="w-6 h-6" />
                    )
                  ) : (
                    <X className="w-6 h-6" />
                  )}
                  <div>
                    <h3 className="font-bold text-lg">
                      {eligibility.eligible 
                        ? (eligibility.conditional
                          ? (language === 'fr' ? 'Admissible sous conditions' : 'Eligible with conditions')
                          : (language === 'fr' ? 'Admissible' : 'Eligible'))
                        : (language === 'fr' ? 'Non admissible' : 'Not eligible')}
                    </h3>
                    <p className="/90 text-sm">{language === 'fr' ? eligibility.planName : eligibility.planNameEn}</p>
                  </div>
                </div>
                <Badge className="bg-card/20 text-sm px-3 py-1">
                  {language === 'fr' ? eligibility.waitPeriod : eligibility.waitPeriodEn}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Status & Province Info */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-muted text-foreground">
                  {user?.immigrationStatus === 'PERMANENT_RESIDENT' && (language === 'fr' ? 'Résident Permanent' : 'Permanent Resident')}
                  {user?.immigrationStatus === 'FOREIGN_STUDENT' && (language === 'fr' ? 'Étudiant' : 'Student')}
                  {user?.immigrationStatus === 'OPEN_WORK_PERMIT' && (language === 'fr' ? 'Permis Ouvert' : 'Open Permit')}
                  {user?.immigrationStatus === 'CLOSED_WORK_PERMIT' && (language === 'fr' ? 'Permis Fermé' : 'Closed Permit')}
                </Badge>
                <Badge variant="outline">
                  📍 {language === 'fr' 
                    ? provinces.find(p => p.code === user?.province)?.name 
                    : provinces.find(p => p.code === user?.province)?.nameEn}
                </Badge>
                {/* Country of origin badge for students */}
                {user?.immigrationStatus === 'FOREIGN_STUDENT' && user?.countryOfOrigin && (() => {
                  const country = countries.find(c => c.code === user.countryOfOrigin)
                  return (
                    <Badge className={`${country?.quebecAgreement ? 'bg-muted text-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {country?.flag} {language === 'fr' ? country?.name : (country?.nameEn || country?.name)}
                      {country?.quebecAgreement && ' 🏥'}
                    </Badge>
                  )
                })()}
              </div>

              {/* Special Note */}
              {eligibility.specialNote && (
                <div className={`p-4 rounded-xl ${eligibility.eligible ? 'bg-muted bg-muted border border-border border-border' : 'bg-destructive/10 bg-destructive/10 border border-destructive/40 border-destructive/40'}`}>
                  <p className={`text-sm font-medium ${eligibility.eligible ? 'text-foreground text-foreground' : 'text-destructive text-destructive'}`}>
                    {language === 'fr' ? eligibility.specialNote : eligibility.specialNoteEn}
                  </p>
                </div>
              )}

              {/* Conditions */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-foreground" />
                  {language === 'fr' ? 'Conditions d\'admissibilité' : 'Eligibility Conditions'}
                </h4>
                <div className="space-y-2">
                  {(language === 'fr' ? eligibility.conditions : eligibility.conditionsEn).map((condition, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-muted bg-foreground rounded-lg">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
 condition.startsWith('✅') ? 'bg-muted text-foreground' : 
 condition.startsWith('❌') ? 'bg-destructive/10 text-destructive' : 
 'bg-muted text-foreground'
 }`}>
                        {condition.startsWith('✅') ? '✓' : condition.startsWith('❌') ? '!' : '•'}
                      </div>
                      <span className="text-sm">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-foreground" />
                    {language === 'fr' ? 'Documents requis' : 'Required Documents'}
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => setShowAllDocuments(!showAllDocuments)}>
                    {showAllDocuments 
                      ? (language === 'fr' ? 'Voir moins' : 'Show less')
                      : (language === 'fr' ? 'Voir plus' : 'Show more')}
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {eligibility.documents.slice(0, showAllDocuments ? undefined : 4).map((doc, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 border rounded-lg bg-muted dark:hover:bg-foreground transition-colors">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
 doc.required ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'
 }`}>
                        {doc.required ? '!' : '?'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{language === 'fr' ? doc.name : doc.nameEn}</span>
                          {doc.required && (
                            <Badge className="text-xs bg-destructive/10 text-destructive">{language === 'fr' ? 'Obligatoire' : 'Required'}</Badge>
                          )}
                        </div>
                        {(doc.notes || doc.notesEn) && (
                          <p className="text-xs text-muted-foreground mt-1">
                            💡 {language === 'fr' ? doc.notes : doc.notesEn}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {eligibility.applyUrl && eligibility.applyUrl !== '#' && (
                  <Button 
                    className="flex-1 py-6 text-lg font-semibold bg-primary text-primary-foreground shadow-none"
                    onClick={() => window.open(eligibility.applyUrl, '_blank')}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {language === 'fr' ? 'Demander maintenant' : 'Apply now'}
                  </Button>
                )}
                {!eligibility.eligible && (
                  <Button 
                    variant="outline"
                    className="flex-1 py-6 text-lg"
                    onClick={() => onNavigate('finance')}
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    {language === 'fr' ? 'Voir les assurances privées' : 'View private insurance'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-border shadow-none bg-muted bg-muted border-border border-border">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-bold text-lg text-muted-foreground text-muted-foreground">
                {language === 'fr' ? 'Informations manquantes' : 'Missing Information'}
              </h3>
              <p className="text-muted-foreground text-muted-foreground mt-2">
                {language === 'fr' 
                  ? 'Complétez votre profil avec votre statut d\'immigration et votre province pour connaître votre admissibilité.'
                  : 'Complete your profile with your immigration status and province to check your eligibility.'}
              </p>
              <Button 
                className="mt-4" 
                onClick={() => onNavigate('profile')}
              >
                <User className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Compléter mon profil' : 'Complete my profile'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Private Insurance */}
        <Card className="border border-border shadow-none bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 bg-muted bg-muted rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-foreground text-foreground" />
              </div>
              {language === 'fr' ? 'Assurance privée (période d\'attente)' : 'Private Insurance (Waiting Period)'}
            </CardTitle>
            <CardDescription>
              {language === 'fr' ? 'Pendant le délai de carence, une assurance privée est recommandée' : 'During the waiting period, private insurance is recommended'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: 'Manulife', coverage: language === 'fr' ? 'Visite médicale, médicaments' : 'Doctor visits, medication', price: '~$150/mois', color: ' ' },
                { name: 'Sun Life', coverage: language === 'fr' ? 'Complète nouveaux arrivants' : 'Complete newcomer coverage', price: '~$200/mois', color: ' ' },
                { name: 'GMS', coverage: language === 'fr' ? 'Couverture de base' : 'Basic coverage', price: '~$100/mois', color: ' ' },
              ].map((ins, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-none transition-all duration-300 cursor-pointer group">
                  <div className={`h-2 bg-muted ${ins.color}`} />
                  <CardContent className="p-5">
                    <h4 className="font-bold text-lg">{ins.name}</h4>
                    <p className="text-sm text-muted-foreground mt-2">{ins.coverage}</p>
                    <p className="text-foreground font-bold mt-3">{ins.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Clinic Directory */}
        <Card className="border border-border shadow-none bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 bg-muted bg-muted rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-foreground text-foreground" />
              </div>
              {language === 'fr' ? 'Trouver une clinique' : 'Find a Clinic'}
            </CardTitle>
            <CardDescription>
              {language === 'fr' 
                ? 'Entrez votre code postal pour trouver les cliniques près de chez vous'
                : 'Enter your postal code to find clinics near you'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Postal Code Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Label className="text-sm font-medium mb-2 block">
                  {language === 'fr' ? 'Code postal' : 'Postal Code'}
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={language === 'fr' ? 'Ex: H2X 1Y4' : 'E.g.: H2X 1Y4'}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                    className="pl-10 uppercase"
                    maxLength={7}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'fr' 
                    ? 'Entrez les 3 premiers caractères pour une recherche par région'
                    : 'Enter the first 3 characters for a regional search'}
                </p>
              </div>
              
              {/* Filter Buttons */}
              <div className="sm:w-auto">
                <Label className="text-sm font-medium mb-2 block">
                  {language === 'fr' ? 'Type de clinique' : 'Clinic Type'}
                </Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={clinicFilter === 'ALL' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setClinicFilter('ALL')}
                  >
                    {language === 'fr' ? 'Tous' : 'All'}
                  </Button>
                  <Button
                    variant={clinicFilter === 'WALK_IN' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setClinicFilter('WALK_IN')}
                  >
                    {language === 'fr' ? 'Sans RDV' : 'Walk-in'}
                  </Button>
                  <Button
                    variant={clinicFilter === 'CLSC' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setClinicFilter('CLSC')}
                  >
                    CLSC
                  </Button>
                  <Button
                    variant={clinicFilter === 'HOSPITAL' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setClinicFilter('HOSPITAL')}
                  >
                    {language === 'fr' ? 'Hôpital' : 'Hospital'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Province Info Banner */}
            {user?.province && (
              <div className="flex items-center gap-2 p-3 bg-muted bg-muted rounded-lg border border-border border-border">
                <MapPin className="w-4 h-4 text-foreground" />
                <span className="text-sm text-foreground text-foreground">
                  {language === 'fr' 
                    ? `Recherche dans la province: ${provinces.find(p => p.code === user.province)?.name}`
                    : `Searching in: ${provinces.find(p => p.code === user.province)?.nameEn}`}
                </span>
              </div>
            )}

            {/* Clinics List */}
            <div className="space-y-3">
              {(() => {
                const userProvince = (user?.province || 'QC') as Province
                let clinics = getClinicsByPostalCode(userProvince, postalCode, 8)
                
                // Apply filter
                if (clinicFilter !== 'ALL') {
                  clinics = clinics.filter(c => c.type === clinicFilter)
                }
                
                if (clinics.length === 0) {
                  return (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="w-16 h-16 bg-muted bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="font-medium">
                        {language === 'fr' ? 'Aucune clinique trouvée' : 'No clinics found'}
                      </p>
                      <p className="text-sm mt-1">
                        {language === 'fr' 
                          ? 'Essayez un autre code postal ou filtre'
                          : 'Try a different postal code or filter'}
                      </p>
                    </div>
                  )
                }

                const getTypeLabel = (type: string) => {
                  switch (type) {
                    case 'WALK_IN': return language === 'fr' ? 'Sans rendez-vous' : 'Walk-in'
                    case 'CLSC': return 'CLSC'
                    case 'HOSPITAL': return language === 'fr' ? 'Hôpital' : 'Hospital'
                    case 'PRIVATE': return language === 'fr' ? 'Privé' : 'Private'
                    case 'COMMUNITY': return language === 'fr' ? 'Communautaire' : 'Community'
                    default: return type
                  }
                }

                const getTypeEmoji = (type: string) => {
                  switch (type) {
                    case 'WALK_IN': return '🏥'
                    case 'CLSC': return '🏛️'
                    case 'HOSPITAL': return '🏨'
                    case 'PRIVATE': return '💼'
                    case 'COMMUNITY': return '🤝'
                    default: return '🏥'
                  }
                }

                const getTypeColor = (type: string) => {
                  switch (type) {
                    case 'WALK_IN': return 'bg-muted text-foreground bg-muted text-foreground'
                    case 'CLSC': return 'bg-muted text-foreground bg-muted text-foreground'
                    case 'HOSPITAL': return 'bg-destructive/10 text-destructive bg-destructive/10 text-destructive'
                    case 'PRIVATE': return 'bg-muted text-foreground bg-muted text-foreground'
                    case 'COMMUNITY': return 'bg-muted text-muted-foreground bg-muted text-muted-foreground'
                    default: return 'bg-muted text-foreground'
                  }
                }

                const formatDistance = (distance: number) => {
                  if (distance === 0) return language === 'fr' ? 'Très proche' : 'Very close'
                  if (distance <= 5) return language === 'fr' ? `~${distance} km` : `~${distance} km`
                  if (distance <= 20) return language === 'fr' ? `~${distance} km` : `~${distance} km`
                  return language === 'fr' ? 'Dans votre province' : 'In your province'
                }

                return clinics.map((clinic, i) => (
                  <div 
                    key={i} 
                    className="flex items-start justify-between p-4 bg-muted bg-foreground rounded-xl bg-muted dark:hover:bg-foreground transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{getTypeEmoji(clinic.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{language === 'fr' ? clinic.name : (clinic.nameEn || clinic.name)}</p>
                          {clinic.distance === 0 && (
                            <Badge className="bg-muted text-xs">
                              {language === 'fr' ? 'Le plus proche' : 'Closest'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {language === 'fr' ? clinic.address : (clinic.addressEn || clinic.address)}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{clinic.phone}</span>
                          </div>
                          {clinic.hours && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {language === 'fr' ? clinic.hours : (clinic.hoursEn || clinic.hours)}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {language === 'fr' ? clinic.city : (clinic.cityEn || clinic.city)}
                            </span>
                          </div>
                        </div>
                        {clinic.services && clinic.services.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(language === 'fr' ? clinic.services : (clinic.servicesEn || clinic.services)).map((service, si) => (
                              <Badge key={si} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getTypeColor(clinic.type)}>
                        {getTypeLabel(clinic.type)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistance(clinic.distance)}
                      </span>
                    </div>
                  </div>
                ))
              })()}
            </div>

            {/* Google Maps Link */}
            {postalCode && (
              <div className="pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    const query = encodeURIComponent(`${postalCode}, Canada clinics`)
                    window.open(`https://www.google.com/maps/search/${query}`, '_blank')
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Voir sur Google Maps' : 'View on Google Maps'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ==================== COMMUNITY MODULE ====================
