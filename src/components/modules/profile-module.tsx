'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { type Language, type Province, type Task } from '@/lib/stores/app-store'
import { Bell, Briefcase, Building2, Calendar, CheckCircle2, Crown, FileText, Globe, GraduationCap, Loader2, MapPin, Settings, Shield, Star, User } from 'lucide-react'
import { useState } from 'react'
import { countries, provinces, sectors } from '@/lib/app-data'

export function ProfileModule({ language, user, onUpdate }: {
  language: Language
  user: any
  onUpdate: (user: any) => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState<'personal' | 'immigration' | 'professional' | 'preferences'>('personal')
  
  // Form states
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '')
  
  // Immigration states
  const [immigrationStatus, setImmigrationStatus] = useState(user?.immigrationStatus || '')
  const [province, setProvince] = useState(user?.province || '')
  const [postalCode, setPostalCode] = useState(user?.postalCode || '')
  const [arrivalDate, setArrivalDate] = useState(user?.arrivalDate ? user.arrivalDate.split('T')[0] : '')
  const [studyPermitExpiry, setStudyPermitExpiry] = useState(user?.studyPermitExpiry ? user.studyPermitExpiry.split('T')[0] : '')
  const [workPermitExpiry, setWorkPermitExpiry] = useState(user?.workPermitExpiry ? user.workPermitExpiry.split('T')[0] : '')
  const [passportExpiry, setPassportExpiry] = useState(user?.passportExpiry ? user.passportExpiry.split('T')[0] : '')
  const [countryOfOrigin, setCountryOfOrigin] = useState(user?.countryOfOrigin || '')
  
  // Professional states
  const [professionalSector, setProfessionalSector] = useState(user?.professionalSector || '')
  const [educationLevel, setEducationLevel] = useState(user?.educationLevel || '')
  const [yearsExperience, setYearsExperience] = useState(user?.yearsExperience || 0)
  const [englishLevel, setEnglishLevel] = useState(user?.englishLevel || 7)
  const [frenchLevel, setFrenchLevel] = useState(user?.frenchLevel || 0)
  
  // Family states
  const [familyStatus, setFamilyStatus] = useState(user?.familyStatus || '')
  const [numberOfChildren, setNumberOfChildren] = useState(user?.numberOfChildren || 0)
  
  // Preferences
  const [preferredLanguage, setPreferredLanguage] = useState(user?.preferredLanguage || 'fr')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailReminders, setEmailReminders] = useState(true)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-profile',
          data: {
            userId: user.id,
            name,
            phone,
            dateOfBirth,
            immigrationStatus,
            province,
            postalCode,
            arrivalDate,
            studyPermitExpiry,
            workPermitExpiry,
            passportExpiry,
            countryOfOrigin,
            professionalSector,
            educationLevel,
            yearsExperience,
            englishLevel,
            frenchLevel,
            familyStatus,
            numberOfChildren,
            preferredLanguage
          }
        })
      })
      const data = await res.json()
      if (data.success && data.user) {
        // Use the returned user data from the API to ensure consistency with the database
        onUpdate(data.user)
      }
    } catch (e) {
      console.error('Profile update error', e)
    }
    setIsLoading(false)
  }

  const countries = [
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'BE', name: 'Belgique', flag: '🇧🇪' },
    { code: 'CH', name: 'Suisse', flag: '🇨🇭' },
    { code: 'MA', name: 'Maroc', flag: '🇲🇦' },
    { code: 'TN', name: 'Tunisie', flag: '🇹🇳' },
    { code: 'DZ', name: 'Algérie', flag: '🇩🇿' },
    { code: 'SN', name: 'Sénégal', flag: '🇸🇳' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { code: 'CM', name: 'Cameroun', flag: '🇨🇲' },
    { code: 'HT', name: 'Haïti', flag: '🇭🇹' },
    { code: 'IN', name: 'Inde', flag: '🇮🇳' },
    { code: 'CN', name: 'Chine', flag: '🇨🇳' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
    { code: 'BR', name: 'Brésil', flag: '🇧🇷' },
    { code: 'CO', name: 'Colombie', flag: '🇨🇴' },
    { code: 'OTHER', name: language === 'fr' ? 'Autre pays' : 'Other country', flag: '🌍' },
  ]

  const educationLevels = [
    { code: 'highschool', label: language === 'fr' ? '🏫 Diplôme secondaire' : '🏫 High School Diploma' },
    { code: 'cegep', label: language === 'fr' ? '📋 DEC (Cégep)' : '📋 College Diploma (CEGEP)' },
    { code: 'bachelor', label: language === 'fr' ? '🎓 Baccalauréat' : '🎓 Bachelor\'s Degree' },
    { code: 'master', label: language === 'fr' ? '📚 Maîtrise' : '📚 Master\'s Degree' },
    { code: 'phd', label: language === 'fr' ? '🎓 Doctorat' : '🎓 PhD' },
    { code: 'trade', label: language === 'fr' ? '🔧 Métier spécialisé' : '🔧 Skilled Trade' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {language === 'fr' ? 'Mon Profil' : 'My Profile'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {language === 'fr' ? 'Gérez vos informations personnelles' : 'Manage your personal information'}
              </p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
            {language === 'fr' ? 'Enregistrer' : 'Save'}
          </Button>
        </div>

        {/* Section Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2">
          {[
            { id: 'personal', icon: User, label: language === 'fr' ? 'Personnel' : 'Personal' },
            { id: 'immigration', icon: Shield, label: language === 'fr' ? 'Immigration' : 'Immigration' },
            { id: 'professional', icon: Briefcase, label: language === 'fr' ? 'Professionnel' : 'Professional' },
            { id: 'preferences', icon: Settings, label: language === 'fr' ? 'Préférences' : 'Preferences' },
          ].map((section) => {
            const Icon = section.icon
            return (
              <Button key={section.id} variant={activeSection === section.id ? 'default' : 'outline'}
                className={`flex items-center gap-2 whitespace-nowrap ${activeSection === section.id ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : ''}`}
                onClick={() => setActiveSection(section.id as any)}>
                <Icon className="w-4 h-4" />
                {section.label}
              </Button>
            )
          })}
        </div>

        {/* Personal Information Section */}
        {activeSection === 'personal' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  {language === 'fr' ? 'Photo de profil' : 'Profile Picture'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <span className="text-4xl font-bold text-white">
                    {name ? name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : 'NC'}
                  </span>
                </div>
                <Button variant="outline" size="sm">{language === 'fr' ? 'Changer' : 'Change'}</Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  {language === 'fr' ? 'Informations personnelles' : 'Personal Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{language === 'fr' ? 'Nom complet' : 'Full name'}</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jean Dupont" />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'fr' ? 'Courriel' : 'Email'}</Label>
                    <Input value={email} disabled className="bg-gray-50 dark:bg-gray-800" />
                  </div>
                </div>
                
                {/* Date of Birth - Important for CRS Calculation */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      {language === 'fr' ? 'Date de naissance' : 'Date of birth'}
                    </Label>
                    <Input 
                      type="date" 
                      value={dateOfBirth} 
                      onChange={(e) => setDateOfBirth(e.target.value)} 
                    />
                    <p className="text-xs text-gray-500">
                      {language === 'fr' 
                        ? '📅 Utilisée pour calculer votre âge dans le score CRS Entrée Express'
                        : '📅 Used to calculate your age for Express Entry CRS score'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'fr' ? 'Pays d\'origine' : 'Country of origin'}</Label>
                    <Select value={countryOfOrigin} onValueChange={setCountryOfOrigin}>
                      <SelectTrigger><SelectValue placeholder={language === 'fr' ? 'Sélectionner' : 'Select'} /></SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>{country.flag} {country.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{language === 'fr' ? 'Situation familiale' : 'Family status'}</Label>
                    <Select value={familyStatus} onValueChange={setFamilyStatus}>
                      <SelectTrigger><SelectValue placeholder={language === 'fr' ? 'Sélectionner' : 'Select'} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SINGLE">{language === 'fr' ? '👤 Célibataire' : '👤 Single'}</SelectItem>
                        <SelectItem value="COUPLE">{language === 'fr' ? '👥 En couple' : '👥 In a relationship'}</SelectItem>
                        <SelectItem value="FAMILY_WITH_CHILDREN">{language === 'fr' ? '👨‍👩‍👧‍👦 Famille avec enfants' : '👨‍👩‍👧‍👦 Family with children'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Immigration Section */}
        {activeSection === 'immigration' && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  {language === 'fr' ? 'Statut d\'immigration' : 'Immigration Status'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{language === 'fr' ? 'Statut actuel' : 'Current status'}</Label>
                    <Select value={immigrationStatus} onValueChange={setImmigrationStatus}>
                      <SelectTrigger><SelectValue placeholder={language === 'fr' ? 'Sélectionner' : 'Select'} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PERMANENT_RESIDENT"><Shield className="w-4 h-4 text-green-500 inline mr-2" />{language === 'fr' ? 'Résident permanent' : 'Permanent Resident'}</SelectItem>
                        <SelectItem value="FOREIGN_STUDENT"><GraduationCap className="w-4 h-4 text-blue-500 inline mr-2" />{language === 'fr' ? 'Étudiant étranger' : 'Foreign Student'}</SelectItem>
                        <SelectItem value="OPEN_WORK_PERMIT"><Briefcase className="w-4 h-4 text-purple-500 inline mr-2" />{language === 'fr' ? 'Permis ouvert' : 'Open Work Permit'}</SelectItem>
                        <SelectItem value="CLOSED_WORK_PERMIT"><Building2 className="w-4 h-4 text-orange-500 inline mr-2" />{language === 'fr' ? 'Permis fermé' : 'Closed Work Permit'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'fr' ? 'Province' : 'Province'}</Label>
                    <Select value={province} onValueChange={setProvince}>
                      <SelectTrigger><SelectValue placeholder={language === 'fr' ? 'Sélectionner' : 'Select'} /></SelectTrigger>
                      <SelectContent>
                        {provinces.map((p) => (<SelectItem key={p.code} value={p.code}>{language === 'fr' ? p.name : p.nameEn}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      {language === 'fr' ? 'Code postal' : 'Postal Code'}
                    </Label>
                    <Input 
                      value={postalCode} 
                      onChange={(e) => setPostalCode(e.target.value.toUpperCase())} 
                      placeholder={language === 'fr' ? 'Ex: H2X 1Y4' : 'E.g.: H2X 1Y4'}
                      maxLength={7}
                      className="uppercase"
                    />
                    <p className="text-xs text-gray-500">
                      {language === 'fr' 
                        ? '💡 Utilisé pour trouver les cliniques proches de chez vous'
                        : '💡 Used to find clinics near you'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{language === 'fr' ? 'Date d\'arrivée' : 'Arrival date'}</Label>
                  <Input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} className="max-w-xs" />
                </div>
              </CardContent>
            </Card>

            {['FOREIGN_STUDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT'].includes(immigrationStatus) && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    {language === 'fr' ? 'Dates d\'expiration' : 'Expiry Dates'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {immigrationStatus === 'FOREIGN_STUDENT' && (
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-blue-500" />{language === 'fr' ? 'Permis d\'études' : 'Study Permit'}</Label>
                        <Input type="date" value={studyPermitExpiry} onChange={(e) => setStudyPermitExpiry(e.target.value)} />
                      </div>
                    )}
                    {(immigrationStatus === 'OPEN_WORK_PERMIT' || immigrationStatus === 'CLOSED_WORK_PERMIT') && (
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-purple-500" />{language === 'fr' ? 'Permis travail' : 'Work Permit'}</Label>
                        <Input type="date" value={workPermitExpiry} onChange={(e) => setWorkPermitExpiry(e.target.value)} />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><FileText className="w-4 h-4 text-green-500" />{language === 'fr' ? 'Passeport' : 'Passport'}</Label>
                      <Input type="date" value={passportExpiry} onChange={(e) => setPassportExpiry(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Professional Section */}
        {activeSection === 'professional' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  {language === 'fr' ? 'Éducation et expérience' : 'Education & Experience'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{language === 'fr' ? 'Niveau d\'études' : 'Education level'}</Label>
                  <Select value={educationLevel} onValueChange={setEducationLevel}>
                    <SelectTrigger><SelectValue placeholder={language === 'fr' ? 'Sélectionner' : 'Select'} /></SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((level) => (<SelectItem key={level.code} value={level.code}>{level.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{language === 'fr' ? 'Secteur professionnel' : 'Professional sector'}</Label>
                  <Select value={professionalSector} onValueChange={setProfessionalSector}>
                    <SelectTrigger><SelectValue placeholder={language === 'fr' ? 'Sélectionner' : 'Select'} /></SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (<SelectItem key={sector.code} value={sector.code}>{language === 'fr' ? sector.label : sector.labelEn}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>{language === 'fr' ? 'Années d\'expérience' : 'Years of experience'}</Label>
                    <Badge variant="outline">{yearsExperience} {language === 'fr' ? 'ans' : 'yrs'}</Badge>
                  </div>
                  <Slider value={[yearsExperience]} onValueChange={([v]) => setYearsExperience(v)} min={0} max={20} step={1} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Compétences linguistiques' : 'Language Skills'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>🇬🇧 {language === 'fr' ? 'Anglais (CLB)' : 'English (CLB)'}</Label>
                    <Badge variant="outline">CLB {englishLevel}</Badge>
                  </div>
                  <Slider value={[englishLevel]} onValueChange={([v]) => setEnglishLevel(v)} min={1} max={10} step={1} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>🇫🇷 {language === 'fr' ? 'Français (CLB)' : 'French (CLB)'}</Label>
                    <Badge variant="outline">CLB {frenchLevel}</Badge>
                  </div>
                  <Slider value={[frenchLevel]} onValueChange={([v]) => setFrenchLevel(v)} min={0} max={10} step={1} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Preferences Section */}
        {activeSection === 'preferences' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-600" />
                  {language === 'fr' ? 'Langue' : 'Language'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button variant={preferredLanguage === 'fr' ? 'default' : 'outline'} className="flex-1" onClick={() => setPreferredLanguage('fr')}>🇫🇷 Français</Button>
                  <Button variant={preferredLanguage === 'en' ? 'default' : 'outline'} className="flex-1" onClick={() => setPreferredLanguage('en')}>🇬🇧 English</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-600" />
                  {language === 'fr' ? 'Notifications' : 'Notifications'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{language === 'fr' ? 'Notifications push' : 'Push notifications'}</p>
                    <p className="text-sm text-gray-500">{language === 'fr' ? 'Rappels de tâches' : 'Task reminders'}</p>
                  </div>
                  <Checkbox checked={notificationsEnabled} onCheckedChange={(v) => setNotificationsEnabled(!!v)} />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{language === 'fr' ? 'Rappels courriel' : 'Email reminders'}</p>
                    <p className="text-sm text-gray-500">{language === 'fr' ? 'Expiration documents' : 'Document expiry'}</p>
                  </div>
                  <Checkbox checked={emailReminders} onCheckedChange={(v) => setEmailReminders(!!v)} />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Crown className="w-5 h-5 text-gray-600" />
                  {language === 'fr' ? 'Abonnement' : 'Subscription'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600">
                    {user?.subscriptionTier === 'FREE' ? (language === 'fr' ? 'GRATUIT' : 'FREE') : user?.subscriptionTier}
                  </Badge>
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">
                    <Star className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Passer à Premium' : 'Upgrade to Premium'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== ADMIN MODULE ====================
