'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { t, type Language, type Province, type Task } from '@/lib/stores/app-store'
import { AlertCircle, BookOpen, Calculator, Calendar, CheckCircle2, Clock, Crown, ExternalLink, GraduationCap, ListChecks, MapPin, Shield } from 'lucide-react'
import { useState } from 'react'
import { modules, provinces } from '@/lib/app-data'
import { CitizenshipEligibilityCard, CitizenshipQuizCard, PermitExpiryAlerts, SpousalWorkPermitEligibility } from '@/components/modules/dashboard'

export function ImmigrationModule({ language, user, tasks, onTaskUpdate }: {
  language: Language
  user: any
  tasks: Task[]
  onTaskUpdate: (taskId: string, status: Task['status']) => void
}) {
  // CRS Calculator state
  const [age, setAge] = useState(30)
  const [education, setEducation] = useState('bachelors')
  const [clbLevel, setClbLevel] = useState(7)
  const [canadaExperience, setCanadaExperience] = useState(0)
  const [outsideCanadaExperience, setOutsideCanadaExperience] = useState(3)
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'tasks' | 'simulator' | 'pgwp' | 'citizenship'>('tasks')

  // Determine if user is a temporary resident (needs CRS) or permanent resident (needs citizenship)
  const isTemporaryResident = ['FOREIGN_STUDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT'].includes(user?.immigrationStatus)
  const isPermanentResident = user?.immigrationStatus === 'PERMANENT_RESIDENT'

  // Calculate age from dateOfBirth
  const calculateAgeFromDOB = (dob: string | undefined): number | null => {
    if (!dob) return null
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  // Get age from profile or state
  const profileAge = calculateAgeFromDOB(user?.dateOfBirth)
  const displayAge = profileAge !== null ? profileAge : age

  // PGWP Calculator state
  const [pgwpProgramDuration, setPgwpProgramDuration] = useState(12)
  const [pgwpProgramType, setPgwpProgramType] = useState<'degree' | 'diploma' | 'certificate'>('degree')
  const [pgwpIsDLI, setPgwpIsDLI] = useState(true)
  const [pgwpIsFullTime, setPgwpIsFullTime] = useState(true)
  const [pgwpIsDistance, setPgwpIsDistance] = useState(false)
  const [pgwpIsFSL, setPgwpIsFSL] = useState(false)
  const [pgwpResult, setPgwpResult] = useState<{eligible: boolean; duration: string; message: string} | null>(null)

  const immigrationTasks = tasks.filter(t => t.category === 'IMMIGRATION')
  const completedCount = immigrationTasks.filter(t => t.status === 'COMPLETED').length

  const calculateCRS = () => {
    let score = 0
    const calculatedAge = displayAge
    
    // Age points (max 110) - Based on Express Entry CRS age factor
    // Maximum points at age 20-29, decreases after
    if (calculatedAge <= 17) score += 0
    else if (calculatedAge <= 19) score += 90
    else if (calculatedAge <= 29) score += 110  // Maximum
    else if (calculatedAge === 30) score += 105
    else if (calculatedAge === 31) score += 99
    else if (calculatedAge === 32) score += 94
    else if (calculatedAge === 33) score += 88
    else if (calculatedAge === 34) score += 83
    else if (calculatedAge === 35) score += 77
    else if (calculatedAge === 36) score += 72
    else if (calculatedAge === 37) score += 66
    else if (calculatedAge === 38) score += 61
    else if (calculatedAge === 39) score += 55
    else if (calculatedAge === 40) score += 50
    else if (calculatedAge === 41) score += 39
    else if (calculatedAge === 42) score += 28
    else if (calculatedAge === 43) score += 17
    else if (calculatedAge === 44) score += 6
    else score += 0  // 45+ gets 0 points

    // Education points (max 150)
    if (education === 'phd') score += 150
    else if (education === 'masters') score += 135
    else if (education === 'bachelors') score += 120
    else if (education === 'diploma') score += 90
    else score += 30

    // Language points (max 160)
    if (clbLevel >= 9) score += 160
    else if (clbLevel >= 7) score += 100
    else score += 50

    // Canada experience (max 80)
    if (canadaExperience >= 5) score += 80
    else if (canadaExperience >= 3) score += 64
    else if (canadaExperience >= 1) score += 40

    // Outside Canada experience (max 50)
    if (outsideCanadaExperience >= 3) score += 50
    else if (outsideCanadaExperience >= 1) score += 25

    // Base points
    score += 100

    setCalculatedScore(score)
  }

  const calculatePGWP = () => {
    // Check eligibility
    if (!pgwpIsDLI) {
      setPgwpResult({
        eligible: false,
        duration: '0',
        message: language === 'fr' 
          ? '❌ Votre établissement doit être un établissement d\'enseignement désigné (DLI) pour être éligible au PGWP.'
          : '❌ Your institution must be a Designated Learning Institution (DLI) to be eligible for PGWP.'
      })
      return
    }

    if (pgwpIsDistance) {
      setPgwpResult({
        eligible: false,
        duration: '0',
        message: language === 'fr'
          ? '❌ Les programmes complètement à distance ne sont PAS éligibles au PGWP. Vous devez avoir complété au moins 50% de vos études en personne au Canada.'
          : '❌ Distance learning programs are NOT eligible for PGWP. You must have completed at least 50% of your studies in person in Canada.'
      })
      return
    }

    if (pgwpIsFSL && pgwpProgramDuration < 12) {
      setPgwpResult({
        eligible: false,
        duration: '0',
        message: language === 'fr'
          ? '❌ Les programmes de français langue seconde (FLS) de moins de 12 mois ne sont PAS éligibles au PGWP.'
          : '❌ French as a Second Language (FSL) programs under 12 months are NOT eligible for PGWP.'
      })
      return
    }

    if (pgwpProgramDuration < 8) {
      setPgwpResult({
        eligible: false,
        duration: '0',
        message: language === 'fr'
          ? '❌ Votre programme doit durer minimum 8 mois pour être éligible au PGWP.'
          : '❌ Your program must be at least 8 months long to be eligible for PGWP.'
      })
      return
    }

    if (!pgwpIsFullTime) {
      setPgwpResult({
        eligible: false,
        duration: '0',
        message: language === 'fr'
          ? '❌ Vous devez avoir été inscrit à temps plein pendant vos études pour être éligible (sauf exception pour le dernier semestre).'
          : '❌ You must have been enrolled full-time during your studies to be eligible (except for the final semester).'
      })
      return
    }

    // Calculate duration
    let duration = ''
    if (pgwpProgramDuration >= 8 && pgwpProgramDuration < 12) {
      duration = language === 'fr' 
        ? `${pgwpProgramDuration} mois (même durée que votre programme)`
        : `${pgwpProgramDuration} months (same length as your program)`
    } else if (pgwpProgramDuration >= 12) {
      duration = language === 'fr' ? '3 ans' : '3 years'
    }

    const programTypeLabel = language === 'fr'
      ? pgwpProgramType === 'degree' ? 'diplôme' : pgwpProgramType === 'diploma' ? 'diplôme collégial' : 'certificat'
      : pgwpProgramType

    setPgwpResult({
      eligible: true,
      duration,
      message: language === 'fr'
        ? `✅ Félicitations! Vous êtes éligible au PGWP! Votre ${programTypeLabel} d'une durée de ${pgwpProgramDuration} mois vous donne droit à un permis de travail de ${duration}.`
        : `✅ Congratulations! You are eligible for PGWP! Your ${programTypeLabel} of ${pgwpProgramDuration} months gives you a work permit of ${duration}.`
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white dark:from-green-950/20 dark:to-gray-900">
      <div className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 dark:shadow-green-900/30">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {t('modules.immigration.title', language)}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">{t('modules.immigration.description', language)}</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500">{language === 'fr' ? 'Progression' : 'Progress'}</p>
              <p className="font-bold text-green-600">{completedCount}/{immigrationTasks.length}</p>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500">{language === 'fr' ? 'Statut' : 'Status'}</p>
              <Badge variant="default" className="mt-0.5">{t(`status.${user?.immigrationStatus}`, language)}</Badge>
            </div>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex lg:hidden bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border">
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'tasks' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('tasks')}
          >
            <ListChecks className="w-4 h-4 inline mr-2" />
            {language === 'fr' ? 'Tâches' : 'Tasks'}
          </button>
          {user?.immigrationStatus === 'FOREIGN_STUDENT' && (
            <button
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'pgwp' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('pgwp')}
            >
              <GraduationCap className="w-4 h-4 inline mr-2" />
              PGWP
            </button>
          )}
          {/* CRS only for temporary residents */}
          {['FOREIGN_STUDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT'].includes(user?.immigrationStatus) && (
            <button
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'simulator' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('simulator')}
            >
              <Calculator className="w-4 h-4 inline mr-2" />
              CRS
            </button>
          )}
          {/* Citizenship for permanent residents */}
          {user?.immigrationStatus === 'PERMANENT_RESIDENT' && (
            <button
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'citizenship' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('citizenship')}
            >
              <Crown className="w-4 h-4 inline mr-2" />
              {language === 'fr' ? 'Citoyenneté' : 'Citizenship'}
            </button>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Tasks Checklist - Left Side */}
          <div className={`lg:col-span-2 ${activeTab !== 'tasks' ? 'hidden lg:block' : ''}`}>
            <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <ListChecks className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    {language === 'fr' ? 'Mes tâches' : 'My Tasks'}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {completedCount} {language === 'fr' ? 'complétées' : 'completed'}
                  </Badge>
                </div>
                {/* Progress Bar */}
                <div className="mt-3">
                  <Progress value={(completedCount / Math.max(immigrationTasks.length, 1)) * 100} className="h-2" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {immigrationTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-300" />
                      <p>{language === 'fr' ? 'Aucune tâche pour le moment' : 'No tasks at the moment'}</p>
                    </div>
                  ) : (
                    immigrationTasks.map((task, index) => (
                      <div 
                        key={task.id} 
                        className={`group flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-md ${
                          task.status === 'COMPLETED' 
                            ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700'
                        }`}
                        onClick={() => onTaskUpdate(task.id, task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED')}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          task.status === 'COMPLETED' 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300 group-hover:border-green-400'
                        }`}>
                          {task.status === 'COMPLETED' && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm transition-all ${
                            task.status === 'COMPLETED' 
                              ? 'text-gray-400 line-through' 
                              : 'text-gray-700 dark:text-gray-200'
                          }`}>
                            {language === 'fr' ? task.title : (task.titleEn || task.title)}
                          </p>
                          {task.isRequired && (
                            <Badge variant="outline" className="text-[10px] mt-1 bg-orange-50 text-orange-600 border-orange-200">
                              {language === 'fr' ? 'Obligatoire' : 'Required'}
                            </Badge>
                          )}
                        </div>
                        <Badge 
                          variant={task.priority === 'HIGH' ? 'destructive' : task.priority === 'MEDIUM' ? 'default' : 'secondary'}
                          className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {task.priority === 'HIGH' ? '!' : task.priority === 'MEDIUM' ? '•' : '○'}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CRS Simulator - Right Side - Only for Temporary Residents */}
          {isTemporaryResident && (
            <div className={`lg:col-span-3 ${activeTab !== 'simulator' ? 'hidden lg:block' : ''}`}>
              <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    {language === 'fr' ? 'Simulateur CRS Entrée Express' : 'CRS Express Entry Simulator'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'fr' ? 'Estimez votre score pour Entrée Express' : 'Estimate your Express Entry score'}
                  </CardDescription>
                </CardHeader>
              
              <CardContent className="space-y-5">
                {/* Age from Profile Info */}
                {profileAge !== null && (
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {language === 'fr' 
                          ? `🎂 Âge calculé depuis votre profil: ${profileAge} ans`
                          : `🎂 Age calculated from your profile: ${profileAge} years old`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Input Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Age */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">
                        {language === 'fr' ? 'Âge' : 'Age'}
                        {profileAge !== null && <span className="ml-2 text-xs text-green-600">({language === 'fr' ? 'depuis profil' : 'from profile'})</span>}
                      </Label>
                      <Badge variant="outline" className="font-mono">{displayAge} {language === 'fr' ? 'ans' : 'y.o'}</Badge>
                    </div>
                    {profileAge === null ? (
                      <Slider 
                        value={[age]} 
                        onValueChange={([v]) => setAge(v)} 
                        min={18} 
                        max={50} 
                        step={1}
                        className="py-2"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                        {language === 'fr' 
                          ? '💡 Ajoutez votre date de naissance dans votre profil pour un calcul précis'
                          : '💡 Add your date of birth in your profile for accurate calculation'}
                      </div>
                    )}
                  </div>
                  
                  {/* Education */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{language === 'fr' ? 'Niveau d\'éducation' : 'Education level'}</Label>
                    <Select value={education} onValueChange={setEducation}>
                      <SelectTrigger className="bg-white dark:bg-gray-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phd">{language === 'fr' ? '🎓 Doctorat' : '🎓 PhD'}</SelectItem>
                        <SelectItem value="masters">{language === 'fr' ? '📚 Maîtrise' : '📚 Masters'}</SelectItem>
                        <SelectItem value="bachelors">{language === 'fr' ? '📖 Baccalauréat' : '📖 Bachelors'}</SelectItem>
                        <SelectItem value="diploma">{language === 'fr' ? '📋 Diplôme collégial' : '📋 College Diploma'}</SelectItem>
                        <SelectItem value="highschool">{language === 'fr' ? '🏫 Secondaire' : '🏫 High School'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* CLB Level */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{language === 'fr' ? 'Niveau CLB' : 'CLB Level'}</Label>
                    <Select value={clbLevel.toString()} onValueChange={(v) => setClbLevel(parseInt(v))}>
                      <SelectTrigger className="bg-white dark:bg-gray-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">CLB 10+ ⭐</SelectItem>
                        <SelectItem value="9">CLB 9</SelectItem>
                        <SelectItem value="8">CLB 8</SelectItem>
                        <SelectItem value="7">CLB 7</SelectItem>
                        <SelectItem value="6">CLB 6</SelectItem>
                        <SelectItem value="5">CLB 5</SelectItem>
                        <SelectItem value="4">CLB 4 (Min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Canada Experience */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">{language === 'fr' ? 'Expérience Canada' : 'Canada Exp.'}</Label>
                      <Badge variant="outline" className="font-mono">{canadaExperience} {language === 'fr' ? 'ans' : 'yrs'}</Badge>
                    </div>
                    <Slider 
                      value={[canadaExperience]} 
                      onValueChange={([v]) => setCanadaExperience(v)} 
                      min={0} 
                      max={6} 
                      step={1}
                      className="py-2"
                    />
                  </div>
                </div>

                {/* Outside Canada Experience - Full Width */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">{language === 'fr' ? 'Expérience hors Canada' : 'Outside Canada Exp.'}</Label>
                    <Badge variant="outline" className="font-mono">{outsideCanadaExperience} {language === 'fr' ? 'ans' : 'yrs'}</Badge>
                  </div>
                  <Slider 
                    value={[outsideCanadaExperience]} 
                    onValueChange={([v]) => setOutsideCanadaExperience(v)} 
                    min={0} 
                    max={6} 
                    step={1}
                    className="py-2"
                  />
                </div>

                {/* Calculate Button */}
                <Button 
                  onClick={calculateCRS} 
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-200 dark:shadow-green-900/30 transition-all duration-300"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  {language === 'fr' ? 'Calculer mon score CRS' : 'Calculate my CRS score'}
                </Button>

                {/* Score Result */}
                {calculatedScore !== null && (
                  <div className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-500 ${
                    calculatedScore >= 450 
                      ? 'bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20' 
                      : calculatedScore >= 350 
                      ? 'bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20'
                      : 'bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20'
                  }`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className={`text-6xl font-black tracking-tight ${
                        calculatedScore >= 450 ? 'text-green-600' : calculatedScore >= 350 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {calculatedScore}
                      </span>
                      <span className="text-gray-500 text-lg">{language === 'fr' ? 'points' : 'points'}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{language === 'fr' ? 'Score CRS estimé' : 'Estimated CRS score'}</p>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                      calculatedScore >= 450 
                        ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200' 
                        : calculatedScore >= 350 
                        ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                        : 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                    }`}>
                      {calculatedScore >= 450 
                        ? (<>✨ {language === 'fr' ? 'Excellent! Score compétitif' : 'Excellent! Competitive score'} ✨</>)
                        : calculatedScore >= 350
                        ? (<>⚡ {language === 'fr' ? 'Score moyen - envisagez les PNP' : 'Average score - consider PNP'} ⚡</>)
                        : (<>🔍 {language === 'fr' ? 'Score bas - explorez les options' : 'Low score - explore options'} 🔍</>)
                      }
                    </div>
                    
                    {/* Score Tips */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500">
                        {language === 'fr' 
                          ? '💡 Conseil: Améliorez votre score en augmentant votre niveau CLB ou en accumulant plus d\'expérience.'
                          : '💡 Tip: Improve your score by increasing your CLB level or gaining more experience.'}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          )}

          {/* Citizenship Eligibility - For Permanent Residents Only */}
          {isPermanentResident && (
            <div className={`lg:col-span-3 ${activeTab !== 'citizenship' ? 'hidden lg:block' : ''}`}>
              <CitizenshipEligibilityCard language={language} user={user} />
            </div>
          )}

          {/* Citizenship Quiz - For Permanent Residents Only */}
          {isPermanentResident && (
            <div className={`lg:col-span-3 ${activeTab !== 'citizenship' ? 'hidden lg:block' : ''}`}>
              <CitizenshipQuizCard language={language} />
            </div>
          )}
        </div>

        {/* PGWP Eligibility Checker - Only for Students */}
        {user?.immigrationStatus === 'FOREIGN_STUDENT' && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                {language === 'fr' ? '🎓 Vérificateur d\'éligibilité PGWP' : '🎓 PGWP Eligibility Checker'}
              </CardTitle>
              <CardDescription>
                {language === 'fr' 
                  ? 'Vérifiez votre éligibilité au Permis de Travail Post-Diplôme' 
                  : 'Check your eligibility for the Post-Graduation Work Permit'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-5">
              {/* Quick Info Banner */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>{language === 'fr' ? '📌 Qu\'est-ce que le PGWP?' : '📌 What is PGWP?'}</strong>
                  <br />
                  {language === 'fr' 
                    ? 'Le Permis de Travail Post-Diplôme permet aux diplômés internationaux de travailler au Canada après leurs études. C\'est souvent une étape clé vers la résidence permanente.'
                    : 'The Post-Graduation Work Permit allows international graduates to work in Canada after their studies. It\'s often a key step toward permanent residence.'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Program Duration */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{language === 'fr' ? 'Durée du programme' : 'Program duration'}</Label>
                  <div className="flex items-center gap-2">
                    <Slider 
                      value={[pgwpProgramDuration]} 
                      onValueChange={([v]) => setPgwpProgramDuration(v)} 
                      min={6} 
                      max={48} 
                      step={1}
                      className="flex-1"
                    />
                    <Badge variant="outline" className="font-mono w-20 justify-center">
                      {pgwpProgramDuration} {language === 'fr' ? 'mois' : 'months'}
                    </Badge>
                  </div>
                  {pgwpProgramDuration < 8 && (
                    <p className="text-xs text-red-500">{language === 'fr' ? '⚠️ Minimum 8 mois requis' : '⚠️ Minimum 8 months required'}</p>
                  )}
                </div>

                {/* Program Type */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{language === 'fr' ? 'Type de programme' : 'Program type'}</Label>
                  <Select value={pgwpProgramType} onValueChange={(v: any) => setPgwpProgramType(v)}>
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="degree">{language === 'fr' ? '🎓 Diplôme universitaire' : '🎓 University Degree'}</SelectItem>
                      <SelectItem value="diploma">{language === 'fr' ? '📋 Diplôme collégial' : '📋 College Diploma'}</SelectItem>
                      <SelectItem value="certificate">{language === 'fr' ? '📜 Certificat' : '📜 Certificate'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* DLI Status */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{language === 'fr' ? 'Établissement désigné (DLI)?' : 'Designated institution (DLI)?'}</Label>
                  <div className="flex gap-2">
                    <Button 
                      variant={pgwpIsDLI ? 'default' : 'outline'} 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setPgwpIsDLI(true)}
                    >
                      {language === 'fr' ? '✅ Oui' : '✅ Yes'}
                    </Button>
                    <Button 
                      variant={!pgwpIsDLI ? 'destructive' : 'outline'} 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setPgwpIsDLI(false)}
                    >
                      {language === 'fr' ? '❌ Non' : '❌ No'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional Criteria */}
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Full-time Status */}
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <div>
                    <p className="text-sm font-medium">{language === 'fr' ? 'Temps plein' : 'Full-time'}</p>
                    <p className="text-xs text-gray-500">{language === 'fr' ? 'Pendant vos études' : 'During your studies'}</p>
                  </div>
                  <Checkbox 
                    checked={pgwpIsFullTime} 
                    onCheckedChange={(v) => setPgwpIsFullTime(!!v)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                {/* Distance Learning */}
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <div>
                    <p className="text-sm font-medium">{language === 'fr' ? 'À distance' : 'Distance learning'}</p>
                    <p className="text-xs text-gray-500">{language === 'fr' ? '100% en ligne' : '100% online'}</p>
                  </div>
                  <Checkbox 
                    checked={pgwpIsDistance} 
                    onCheckedChange={(v) => setPgwpIsDistance(!!v)}
                    className="data-[state=checked]:bg-red-500"
                  />
                </div>

                {/* FSL Program */}
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <div>
                    <p className="text-sm font-medium">{language === 'fr' ? 'Programme FLS' : 'FSL Program'}</p>
                    <p className="text-xs text-gray-500">{language === 'fr' ? 'Français langue seconde' : 'French as Second Language'}</p>
                  </div>
                  <Checkbox 
                    checked={pgwpIsFSL} 
                    onCheckedChange={(v) => setPgwpIsFSL(!!v)}
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <Button 
                onClick={calculatePGWP} 
                className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all duration-300"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                {language === 'fr' ? 'Vérifier mon éligibilité PGWP' : 'Check my PGWP eligibility'}
              </Button>

              {/* Result */}
              {pgwpResult && (
                <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-500 ${
                  pgwpResult.eligible 
                    ? 'bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20' 
                    : 'bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20'
                }`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      pgwpResult.eligible ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {pgwpResult.eligible 
                        ? <CheckCircle2 className="w-6 h-6 text-white" />
                        : <AlertCircle className="w-6 h-6 text-white" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg mb-2">
                        {pgwpResult.eligible 
                          ? (language === 'fr' ? '✅ Vous êtes éligible!' : '✅ You are eligible!')
                          : (language === 'fr' ? '❌ Non éligible' : '❌ Not eligible')
                        }
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {pgwpResult.message}
                      </p>
                      
                      {pgwpResult.eligible && (
                        <div className="flex items-center gap-3">
                          <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
                            <p className="text-xs text-gray-500">{language === 'fr' ? 'Durée du PGWP' : 'PGWP Duration'}</p>
                            <p className="font-bold text-lg text-green-600">{pgwpResult.duration}</p>
                          </div>
                          <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
                            <p className="text-xs text-gray-500">{language === 'fr' ? 'Frais' : 'Fee'}</p>
                            <p className="font-bold text-lg">$255 CAD</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Links */}
                  {pgwpResult.eligible && (
                    <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800 flex flex-wrap gap-2">
                      <a 
                        href="https://www.canada.ca/fr/immigration-refugis-citoyennete/services/travailler-canada/permis/post-diplome/commencer.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {language === 'fr' ? 'Demander maintenant' : 'Apply now'}
                      </a>
                      <a 
                        href="https://www.canada.ca/fr/immigration-refugis-citoyennete/services/travailler-canada/permis/post-diplome.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                        {language === 'fr' ? 'Guide officiel' : 'Official guide'}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Timeline Info */}
              <div className="grid sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">180</p>
                  <p className="text-xs text-gray-500">{language === 'fr' ? 'Jours pour appliquer après les études' : 'Days to apply after graduation'}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">80-100</p>
                  <p className="text-xs text-gray-500">{language === 'fr' ? 'Jours de traitement' : 'Processing days'}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">3</p>
                  <p className="text-xs text-gray-500">{language === 'fr' ? 'Ans max (selon programme)' : 'Years max (based on program)'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Spousal Work Permit Eligibility - For temporary residents in a relationship */}
        {['FOREIGN_STUDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT'].includes(user?.immigrationStatus) && 
         (user?.familyStatus === 'COUPLE' || user?.familyStatus === 'FAMILY_WITH_CHILDREN') && (
          <SpousalWorkPermitEligibility language={language} user={user} />
        )}

        {/* Permit Expiry Alerts for Temporary Residents */}
        {['FOREIGN_STUDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT'].includes(user?.immigrationStatus) && (
          <PermitExpiryAlerts language={language} user={user} />
        )}

        {/* Permit Tracking Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Card */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{language === 'fr' ? 'Statut' : 'Status'}</p>
                  <p className="font-semibold text-sm">{t(`status.${user?.immigrationStatus}`, language)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Province Card */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{language === 'fr' ? 'Province' : 'Province'}</p>
                  <p className="font-semibold text-sm">{provinces.find(p => p.code === user?.province)?.name || '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Arrival Date Card */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/50 dark:to-amber-900/30 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{language === 'fr' ? 'Arrivée' : 'Arrival'}</p>
                  <p className="font-semibold text-sm">{user?.arrivalDate ? new Date(user.arrivalDate).toLocaleDateString() : '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Card */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{language === 'fr' ? 'Tâches en attente' : 'Pending tasks'}</p>
                  <p className="font-semibold text-sm">{immigrationTasks.filter(t => t.status === 'PENDING').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ==================== EMPLOYMENT MODULE ====================
