'use client'

import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { citizenshipTestQuestions, type CitizenshipQuestion } from '@/lib/public-data/citizenship-questions'
import { t, type Language, type Province, type Task } from '@/lib/stores/app-store'
import { AlertCircle, BookOpen, Briefcase, CheckCircle2, ChevronRight, Circle, Clock, Crown, ExternalLink, FileCheck, FileText, GraduationCap, ListChecks, MapPin, RefreshCw, Star, Target, User, Users2, X } from 'lucide-react'
import { useState } from 'react'
import { modules, provinces } from '@/lib/app-data'

export function DashboardHome({ language, user, tasks, progress, completedTasks, onTaskClick, onTaskUpdate, onModuleClick }: {
  language: Language
  user: any
  tasks: Task[]
  progress: number
  completedTasks: number
  onTaskClick: (task: Task) => void
  onTaskUpdate: (taskId: string, status: Task['status']) => void
  onModuleClick: (module: string | null) => void
}) {
  // Check if user has any permit expiry dates (temporary resident)
  const isTemporaryResident = ['FOREIGN_STUDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT'].includes(user?.immigrationStatus)
  const hasPermitDates = user?.studyPermitExpiry || user?.workPermitExpiry || user?.passportExpiry

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {t('dashboard.welcome', language)}, {user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-gray-500">{t('dashboard.progress', language)}: {completedTasks}/{tasks.length} {t('dashboard.tasksCompleted', language)}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Progress value={progress} className="flex-1 h-3" />
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Permit Expiry Alerts - Show for temporary residents */}
      {isTemporaryResident && hasPermitDates && (
        <PermitExpiryAlerts language={language} user={user} />
      )}

      {/* Status & Province Info Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1">
              {user?.immigrationStatus === 'PERMANENT_RESIDENT' && (language === 'fr' ? '🛡️ Résident Permanent' : '🛡️ Permanent Resident')}
              {user?.immigrationStatus === 'FOREIGN_STUDENT' && (language === 'fr' ? '🎓 Étudiant Étranger' : '🎓 Foreign Student')}
              {user?.immigrationStatus === 'OPEN_WORK_PERMIT' && (language === 'fr' ? '💼 Permis de Travail Ouvert' : '💼 Open Work Permit')}
              {user?.immigrationStatus === 'CLOSED_WORK_PERMIT' && (language === 'fr' ? '🏢 Permis de Travail Fermé' : '🏢 Closed Work Permit')}
            </Badge>
            {user?.province && (
              <Badge variant="outline" className="px-4 py-1">
                📍 {language === 'fr' 
                  ? provinces.find(p => p.code === user.province)?.name 
                  : provinces.find(p => p.code === user.province)?.nameEn}
              </Badge>
            )}
            {user?.arrivalDate && (
              <span className="text-sm text-gray-500">
                {language === 'fr' ? 'Arrivé le' : 'Arrived on'} {new Date(user.arrivalDate).toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-CA')}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map(m => {
          const Icon = m.icon
          const moduleTasks = tasks.filter(t => t.category === m.id.toUpperCase())
          const completed = moduleTasks.filter(t => t.status === 'COMPLETED').length
          
          return (
            <Card key={m.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onModuleClick(m.id)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${m.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${m.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t(`modules.${m.id}.title`, language)}</p>
                    <p className="font-medium">{completed}/{moduleTasks.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">{t('dashboard.priorityActions', language)}</h2>
        <div className="space-y-3">
          {tasks.filter(t => t.status === 'PENDING' && t.priority === 'HIGH').slice(0, 5).map(task => (
            <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onTaskClick(task)}>
              <CardContent className="p-4 flex items-center gap-4">
                <Checkbox
                  checked={task.status === 'COMPLETED'}
                  onCheckedChange={(checked) => {
                    onTaskUpdate(task.id, checked ? 'COMPLETED' : 'PENDING')
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <p className="font-medium">{language === 'fr' ? task.title : (task.titleEn || task.title)}</p>
                  <Badge variant="outline" className="mt-1">{t(`modules.${task.category.toLowerCase()}.title`, language)}</Badge>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          ))}
          
          {tasks.filter(t => t.status === 'PENDING' && t.priority === 'HIGH').length === 0 && (
            <Card className="bg-green-50 dark:bg-green-950 border-green-200">
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p>{language === 'fr' ? 'Toutes les tâches prioritaires sont complétées!' : 'All priority tasks are completed!'}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* All Tasks by Category */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-blue-500" />
            {language === 'fr' ? '📋 Toutes les tâches administratives' : '📋 All Administrative Tasks'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' 
              ? `Tâches personnalisées pour votre statut (${user?.immigrationStatus === 'PERMANENT_RESIDENT' ? 'Résident Permanent' : user?.immigrationStatus === 'FOREIGN_STUDENT' ? 'Étudiant' : 'Travailleur'}) et votre province`
              : `Tasks customized for your status and province`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.filter(t => t.status !== 'COMPLETED').map(task => (
              <div 
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => onTaskClick(task)}
              >
                <Checkbox
                  checked={task.status === 'COMPLETED'}
                  onCheckedChange={(checked) => {
                    onTaskUpdate(task.id, checked ? 'COMPLETED' : 'PENDING')
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{language === 'fr' ? task.title : (task.titleEn || task.title)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {t(`modules.${task.category.toLowerCase()}.title`, language)}
                    </Badge>
                    {task.isRequired && (
                      <Badge className="text-xs bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                        {language === 'fr' ? 'Obligatoire' : 'Required'}
                      </Badge>
                    )}
                  </div>
                </div>
                {task.priority === 'HIGH' && (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
            ))}
            
            {tasks.filter(t => t.status !== 'COMPLETED').length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-medium">{language === 'fr' ? 'Toutes les tâches sont terminées!' : 'All tasks completed!'}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {user?.subscriptionTier === 'FREE' && (
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Crown className="w-12 h-12" />
              <div>
                <p className="font-bold text-lg">{language === 'fr' ? 'Passez à Premium' : 'Upgrade to Premium'}</p>
                <p className="text-blue-100">{language === 'fr' ? 'Débloquez l\'IA pour votre CV et le mentorat' : 'Unlock AI CV optimization and mentorship'}</p>
              </div>
            </div>
            <Button variant="secondary">
              <Star className="w-4 h-4 mr-2" />
              {t('subscription.choosePlan', language)}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ==================== PERMIT EXPIRY ALERTS COMPONENT ====================
export function PermitExpiryAlerts({ language, user }: {
  language: Language
  user: any
}) {
  const now = new Date()
  const alerts: Array<{
    type: 'study' | 'work' | 'passport'
    expiryDate: Date
    daysUntil: number
    status: 'critical' | 'urgent' | 'warning' | 'ok'
  }> = []

  // Calculate alerts for each permit type
  if (user?.studyPermitExpiry) {
    const expiryDate = new Date(user.studyPermitExpiry)
    const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const status = daysUntil <= 30 ? 'critical' : daysUntil <= 60 ? 'urgent' : daysUntil <= 90 ? 'warning' : 'ok'
    alerts.push({ type: 'study', expiryDate, daysUntil, status })
  }

  if (user?.workPermitExpiry) {
    const expiryDate = new Date(user.workPermitExpiry)
    const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const status = daysUntil <= 30 ? 'critical' : daysUntil <= 60 ? 'urgent' : daysUntil <= 90 ? 'warning' : 'ok'
    alerts.push({ type: 'work', expiryDate, daysUntil, status })
  }

  if (user?.passportExpiry) {
    const expiryDate = new Date(user.passportExpiry)
    const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const status = daysUntil <= 90 ? 'critical' : daysUntil <= 180 ? 'urgent' : daysUntil <= 365 ? 'warning' : 'ok'
    alerts.push({ type: 'passport', expiryDate, daysUntil, status })
  }

  // Filter to show only relevant alerts (those within warning period or already expired)
  const relevantAlerts = alerts.filter(a => a.daysUntil <= 90 || a.type === 'passport' && a.daysUntil <= 365)

  if (relevantAlerts.length === 0) return null

  const getAlertConfig = (alert: typeof alerts[0]) => {
    const configs = {
      study: {
        icon: GraduationCap,
        label: language === 'fr' ? 'Permis d\'études' : 'Study Permit',
        renewalUrl: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/demande/prolonger-permis-etudes.html',
        fee: '$150 CAD'
      },
      work: {
        icon: Briefcase,
        label: language === 'fr' ? 'Permis de travail' : 'Work Permit',
        renewalUrl: 'https://www.canada.ca/fr/immigration-refugis-citoyennete/services/travailler-canada/permis/pourquoi-prolonger.html',
        fee: '$155 CAD'
      },
      passport: {
        icon: FileText,
        label: language === 'fr' ? 'Passeport' : 'Passport',
        renewalUrl: '#',
        fee: '-'
      }
    }
    return configs[alert.type]
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      critical: {
        bg: 'bg-red-50 dark:bg-red-950/30',
        border: 'border-red-200 dark:border-red-800',
        icon: 'bg-red-500',
        badge: 'bg-red-500 text-white',
        text: 'text-red-800 dark:text-red-200'
      },
      urgent: {
        bg: 'bg-orange-50 dark:bg-orange-950/30',
        border: 'border-orange-200 dark:border-orange-800',
        icon: 'bg-orange-500',
        badge: 'bg-orange-500 text-white',
        text: 'text-orange-800 dark:text-orange-200'
      },
      warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-950/30',
        border: 'border-yellow-200 dark:border-yellow-800',
        icon: 'bg-yellow-500',
        badge: 'bg-yellow-500 text-white',
        text: 'text-yellow-800 dark:text-yellow-200'
      },
      ok: {
        bg: 'bg-green-50 dark:bg-green-950/30',
        border: 'border-green-200 dark:border-green-800',
        icon: 'bg-green-500',
        badge: 'bg-green-500 text-white',
        text: 'text-green-800 dark:text-green-200'
      }
    }
    return configs[status as keyof typeof configs]
  }

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="flex items-center gap-2 text-white">
          <AlertCircle className="w-5 h-5" />
          <h3 className="font-semibold">
            {language === 'fr' ? '⚠️ Alertes de renouvellement' : '⚠️ Renewal Alerts'}
          </h3>
        </div>
        <p className="text-white/80 text-sm mt-1">
          {language === 'fr' 
            ? 'Vos documents nécessitent une action' 
            : 'Your documents require action'}
        </p>
      </div>
      
      <CardContent className="p-4 space-y-3">
        {relevantAlerts.map((alert, index) => {
          const config = getAlertConfig(alert)
          const statusConfig = getStatusConfig(alert.status)
          const Icon = config.icon

          return (
            <div 
              key={index}
              className={`p-4 rounded-xl border ${statusConfig.bg} ${statusConfig.border} transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${statusConfig.icon} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{config.label}</p>
                    <Badge className={statusConfig.badge}>
                      {alert.daysUntil > 0 
                        ? `${alert.daysUntil} ${language === 'fr' ? 'jours' : 'days'}`
                        : language === 'fr' ? 'Expiré!' : 'Expired!'}
                    </Badge>
                  </div>
                  
                  <p className={`text-sm ${statusConfig.text}`}>
                    {alert.daysUntil > 0 
                      ? (language === 'fr' 
                        ? `Expire le ${alert.expiryDate.toLocaleDateString('fr-CA')}`
                        : `Expires on ${alert.expiryDate.toLocaleDateString('en-CA')}`)
                      : (language === 'fr'
                        ? 'Ce document est expiré!'
                        : 'This document has expired!')}
                  </p>

                  {alert.status === 'critical' && alert.daysUntil > 0 && (
                    <div className="mt-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-xs font-medium text-red-700 dark:text-red-300">
                        {language === 'fr'
                          ? '🚨 ACTION IMMÉDIATE REQUISE! Appliquez avant l\'expiration pour maintenir le statut implicite.'
                          : '🚨 IMMEDIATE ACTION REQUIRED! Apply before expiry to maintain implied status.'}
                      </p>
                    </div>
                  )}

                  {alert.type !== 'passport' && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a 
                        href={config.renewalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-xs font-medium border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {language === 'fr' ? 'Renouveler' : 'Renew'}
                      </a>
                      <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs">
                        💰 {config.fee}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Info box about implied status */}
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            <strong>{language === 'fr' ? 'ℹ️ Statut implicite:' : 'ℹ️ Implied status:'}</strong>
            <br />
            {language === 'fr'
              ? 'Si vous soumettez votre demande de renouvellement avant l\'expiration, vous pouvez continuer à travailler/étudier légalement pendant le traitement de votre demande.'
              : 'If you submit your renewal application before expiry, you can continue to work/study legally while your application is being processed.'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// ==================== SPOUSAL WORK PERMIT ELIGIBILITY ====================
export function SpousalWorkPermitEligibility({ language, user }: {
  language: Language
  user: any
}) {
  // Determine eligibility based on immigration status and Canadian immigration rules
  // Reference: https://www.canada.ca/en/immigration-refugis-citizenship/services/work-canada/permit/temporary/eligibility.html
  
  const getSpousalEligibility = () => {
    const status = user?.immigrationStatus
    
    // Rules based on 2024-2025 Canadian immigration policies
    if (status === 'FOREIGN_STUDENT') {
      return {
        eligible: true,
        permitType: language === 'fr' ? 'Permis de travail ouvert pour conjoint' : 'Spousal Open Work Permit',
        duration: language === 'fr' 
          ? 'Même durée que votre permis d\'études' 
          : 'Same duration as your study permit',
        requirements: language === 'fr' 
          ? [
              'Vous devez être inscrit dans un programme d\'études à temps plein',
              'Votre conjoint doit avoir un statut légal au Canada ou être admissible',
              'Preuve de relation (certificat de mariage ou union de fait)',
              'Votre établissement doit être un DLI (établissement d\'enseignement désigné)'
            ]
          : [
              'You must be enrolled in a full-time study program',
              'Your spouse must have legal status in Canada or be admissible',
              'Proof of relationship (marriage certificate or common-law union)',
              'Your institution must be a DLI (Designated Learning Institution)'
            ],
        fee: '$155 CAD',
        processingTime: language === 'fr' ? '2-4 mois (varie)' : '2-4 months (varies)',
        officialUrl: 'https://www.canada.ca/en/immigration-refugis-citizenship/services/work-canada/permit/temporary/eligibility/spouse-common-law.html',
        notes: language === 'fr'
          ? 'Le conjoint d\'un étudiant international peut obtenir un permis de travail ouvert, lui permettant de travailler pour n\'importe quel employeur au Canada.'
          : 'The spouse of an international student can obtain an open work permit, allowing them to work for any employer in Canada.'
      }
    }
    
    if (status === 'CLOSED_WORK_PERMIT') {
      return {
        eligible: true,
        permitType: language === 'fr' ? 'Permis de travail ouvert pour conjoint' : 'Spousal Open Work Permit',
        duration: language === 'fr' 
          ? 'Même durée que votre permis de travail' 
          : 'Same duration as your work permit',
        requirements: language === 'fr'
          ? [
              'Vous devez occuper un emploi dans les catégories TEER 0, 1, 2 ou 3',
              'Votre permis de travail doit être valide pour au moins 6 mois',
              'Preuve de relation (certificat de mariage ou union de fait)',
              'Vous travaillez actuellement pour l\'employeur désigné'
            ]
          : [
              'You must work in a TEER 0, 1, 2, or 3 occupation',
              'Your work permit must be valid for at least 6 months',
              'Proof of relationship (marriage certificate or common-law union)',
              'You are currently working for the designated employer'
            ],
        fee: '$155 CAD',
        processingTime: language === 'fr' ? '2-4 mois (varie)' : '2-4 months (varies)',
        officialUrl: 'https://www.canada.ca/en/immigration-refugis-citizenship/services/work-canada/permit/temporary/eligibility/spouse-common-law.html',
        notes: language === 'fr'
          ? 'Les travailleurs qualifiés avec un permis fermé dans les catégories TEER 0-3 peuvent parrainer leur conjoint pour un permis de travail ouvert.'
          : 'Skilled workers with a closed permit in TEER 0-3 categories can sponsor their spouse for an open work permit.'
      }
    }
    
    if (status === 'OPEN_WORK_PERMIT') {
      return {
        eligible: false,
        permitType: language === 'fr' ? 'Éligibilité limitée' : 'Limited eligibility',
        duration: '-',
        requirements: language === 'fr'
          ? [
              '⚠️ Les titulaires de permis de travail ouvert ne sont PAS automatiquement éligibles',
              'L\'éligibilité dépend du type de programme qui vous a donné votre permis ouvert',
              'Si votre permis est basé sur un programme provincial (EII), vérifiez les critères',
              'Les conjoints de résidents permanents en attente peuvent être éligibles'
            ]
          : [
              '⚠️ Open work permit holders are NOT automatically eligible',
              'Eligibility depends on the program type that gave you your open permit',
              'If your permit is based on a provincial program (EII), check the criteria',
              'Spouses of permanent resident applicants may be eligible'
            ],
        fee: '-',
        processingTime: '-',
        officialUrl: 'https://www.canada.ca/en/immigration-refugis-citizenship/services/work-canada/permit/temporary/eligibility/spouse-common-law.html',
        notes: language === 'fr'
          ? '⚠️ Attention: Depuis janvier 2024, les conjoints de titulaires de PGWP ne sont plus éligibles. L\'éligibilité varie selon votre situation spécifique.'
          : '⚠️ Note: As of January 2024, spouses of PGWP holders are no longer eligible. Eligibility varies based on your specific situation.'
      }
    }
    
    return {
      eligible: false,
      permitType: '-',
      duration: '-',
      requirements: [],
      fee: '-',
      processingTime: '-',
      officialUrl: '#',
      notes: ''
    }
  }
  
  const eligibility = getSpousalEligibility()
  
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50/50 to-purple-50/50 dark:from-pink-950/20 dark:to-purple-950/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Users2 className="w-4 h-4 text-white" />
          </div>
          {language === 'fr' ? '👥 Permis de travail pour votre conjoint' : '👥 Work Permit for Your Spouse'}
        </CardTitle>
        <CardDescription>
          {language === 'fr' 
            ? 'Information sur l\'éligibilité de votre conjoint à un permis de travail au Canada'
            : 'Information about your spouse\'s eligibility for a work permit in Canada'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-5">
        {/* Eligibility Status Banner */}
        <div className={`relative overflow-hidden rounded-xl p-4 ${
          eligibility.eligible 
            ? 'bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-800' 
            : 'bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              eligibility.eligible ? 'bg-green-500' : 'bg-amber-500'
            }`}>
              {eligibility.eligible 
                ? <CheckCircle2 className="w-5 h-5 text-white" />
                : <AlertCircle className="w-5 h-5 text-white" />
              }
            </div>
            <div>
              <p className={`font-semibold text-lg ${
                eligibility.eligible ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'
              }`}>
                {eligibility.eligible 
                  ? (language === 'fr' ? '✅ Votre conjoint est éligible!' : '✅ Your spouse is eligible!')
                  : (language === 'fr' ? '⚠️ Éligibilité conditionnelle' : '⚠️ Conditional eligibility')
                }
              </p>
              <p className={`text-sm ${
                eligibility.eligible ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              }`}>
                {eligibility.permitType}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <p className="text-xs text-gray-500">{language === 'fr' ? 'Durée estimée' : 'Estimated duration'}</p>
            <p className="font-bold text-purple-600">{eligibility.duration}</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <p className="text-xs text-gray-500">{language === 'fr' ? 'Frais' : 'Fee'}</p>
            <p className="font-bold text-green-600">{eligibility.fee}</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <p className="text-xs text-gray-500">{language === 'fr' ? 'Délai de traitement' : 'Processing time'}</p>
            <p className="font-bold text-blue-600">{eligibility.processingTime}</p>
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-purple-500" />
            {language === 'fr' ? 'Critères d\'éligibilité:' : 'Eligibility criteria:'}
          </h4>
          <ul className="space-y-2">
            {eligibility.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                {req.startsWith('⚠️') 
                  ? <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  : <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                }
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Notes */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>{language === 'fr' ? '📌 Information importante:' : '📌 Important note:'}</strong>
            <br />
            {eligibility.notes}
          </p>
        </div>

        {/* Policy Changes Alert - 2024 Changes */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/50 rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>{language === 'fr' ? '🆕 Changements de politique 2024:' : '🆕 2024 Policy Changes:'}</strong>
            <br />
            {language === 'fr'
              ? 'Depuis janvier 2024, les conjoints de titulaires de PGWP ne sont plus éligibles aux permis de travail ouverts. De nouvelles restrictions s\'appliquent également aux étudiants dans certains programmes.'
              : 'As of January 2024, spouses of PGWP holders are no longer eligible for open work permits. New restrictions also apply to students in certain programs.'
            }
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <a 
            href={eligibility.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-all shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            {language === 'fr' ? 'Vérifier sur Canada.ca' : 'Check on Canada.ca'}
          </a>
          <a 
            href="https://www.canada.ca/en/immigration-refugis-citizenship/services/work-canada/permit/temporary/eligibility/spouse-common-law/how-to-apply.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            {language === 'fr' ? 'Guide de demande' : 'Application guide'}
          </a>
        </div>

        {/* Official Sources */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 mb-2">
            {language === 'fr' ? '📚 Sources officielles:' : '📚 Official sources:'}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              <a href="https://www.canada.ca/en/immigration-refugis-citizenship/services/work-canada/permit/temporary/eligibility/spouse-common-law.html" target="_blank" rel="noopener noreferrer" className="hover:underline">
                IRCC - Spousal Open Work Permit
              </a>
            </Badge>
            <Badge variant="outline" className="text-xs">
              <a href="https://www.canada.ca/en/immigration-refugis-citizenship/corporate/publications-manuals/operational-bulletins-manuals.html" target="_blank" rel="noopener noreferrer" className="hover:underline">
                IRCC Operational Manual
              </a>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ==================== CITIZENSHIP ELIGIBILITY ====================
export function CitizenshipEligibilityCard({ language, user }: {
  language: Language
  user: any
}) {
  // Canadian citizenship eligibility requirements
  // Reference: https://www.canada.ca/en/immigration-refugis-citizenship/services/application/application-forms-application-citizenship-certificate/adult.html
  
  const [yearsAsPR, setYearsAsPR] = useState(3)
  const [daysInCanada, setDaysInCanada] = useState(1095)
  const [filedTaxes, setFiledTaxes] = useState(true)
  const [languageProof, setLanguageProof] = useState(true)
  const [noCriminalRecord, setNoCriminalRecord] = useState(true)
  const [citizenshipTest, setCitizenshipTest] = useState(false)
  
  // Calculate days from arrival date
  const calculateDaysInCanada = () => {
    if (user?.arrivalDate) {
      const arrival = new Date(user.arrivalDate)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - arrival.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return daysInCanada
  }
  
  const actualDaysInCanada = user?.arrivalDate ? calculateDaysInCanada() : daysInCanada
  
  // Check eligibility
  const isEligible = yearsAsPR >= 2 && actualDaysInCanada >= 1095 && filedTaxes && languageProof && noCriminalRecord
  
  // Calculate progress
  const progressPercentage = Math.min(100, Math.round((actualDaysInCanada / 1095) * 100))
  
  return (
    <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Crown className="w-4 h-4 text-white" />
          </div>
          {language === 'fr' ? '🎓 Admissibilité à la citoyenneté canadienne' : '🎓 Canadian Citizenship Eligibility'}
        </CardTitle>
        <CardDescription>
          {language === 'fr' 
            ? 'Vérifiez si vous remplissez les conditions pour devenir citoyen canadien' 
            : 'Check if you meet the requirements to become a Canadian citizen'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-5">
        {/* Eligibility Status Banner */}
        <div className={`relative overflow-hidden rounded-xl p-4 ${
          isEligible 
            ? 'bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-800' 
            : 'bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isEligible ? 'bg-green-500' : 'bg-amber-500'
            }`}>
              {isEligible 
                ? <CheckCircle2 className="w-5 h-5 text-white" />
                : <Clock className="w-5 h-5 text-white" />
              }
            </div>
            <div>
              <p className={`font-semibold text-lg ${
                isEligible ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'
              }`}>
                {isEligible 
                  ? (language === 'fr' ? '✅ Vous êtes éligible!' : '✅ You are eligible!')
                  : (language === 'fr' ? '⏳ Pas encore éligible' : '⏳ Not yet eligible')
                }
              </p>
              <p className={`text-sm ${
                isEligible ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              }`}>
                {isEligible 
                  ? (language === 'fr' ? 'Vous pouvez soumettre votre demande de citoyenneté' : 'You can submit your citizenship application')
                  : (language === 'fr' ? 'Continuez à accumuler des jours de présence' : 'Continue accumulating days of presence')
                }
              </p>
            </div>
          </div>
        </div>

        {/* Physical Presence Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              {language === 'fr' ? 'Jours de présence au Canada' : 'Days present in Canada'}
            </h4>
            <Badge variant={actualDaysInCanada >= 1095 ? 'default' : 'secondary'} className="font-mono">
              {actualDaysInCanada} / 1095
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-gray-500">
            {language === 'fr' 
              ? `💡 Il vous manque ${Math.max(0, 1095 - actualDaysInCanada)} jours` 
              : `💡 You need ${Math.max(0, 1095 - actualDaysInCanada)} more days`}
          </p>
        </div>

        {/* Requirements Checklist */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-amber-500" />
            {language === 'fr' ? 'Critères d\'admissibilité:' : 'Eligibility criteria:'}
          </h4>
          
          <div className="space-y-2">
            {/* Years as PR */}
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="flex items-center gap-2">
                {yearsAsPR >= 2 
                  ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                  : <Circle className="w-5 h-5 text-gray-300" />
                }
                <span className="text-sm">{language === 'fr' ? 'Résident permanent depuis 2+ ans' : 'Permanent resident for 2+ years'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider 
                  value={[yearsAsPR]} 
                  onValueChange={([v]) => setYearsAsPR(v)} 
                  min={0} 
                  max={10} 
                  step={1}
                  className="w-20"
                />
                <Badge variant="outline" className="font-mono w-12 justify-center">{yearsAsPR}</Badge>
              </div>
            </div>
            
            {/* Taxes filed */}
            <div 
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border cursor-pointer hover:border-amber-300 transition-colors"
              onClick={() => setFiledTaxes(!filedTaxes)}
            >
              <div className="flex items-center gap-2">
                {filedTaxes 
                  ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                  : <Circle className="w-5 h-5 text-gray-300" />
                }
                <span className="text-sm">{language === 'fr' ? 'Impôts déposés (3 des 5 dernières années)' : 'Taxes filed (3 of last 5 years)'}</span>
              </div>
              <Badge variant={filedTaxes ? 'default' : 'secondary'}>
                {filedTaxes ? '✓' : '○'}
              </Badge>
            </div>
            
            {/* Language proof */}
            <div 
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border cursor-pointer hover:border-amber-300 transition-colors"
              onClick={() => setLanguageProof(!languageProof)}
            >
              <div className="flex items-center gap-2">
                {languageProof 
                  ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                  : <Circle className="w-5 h-5 text-gray-300" />
                }
                <span className="text-sm">{language === 'fr' ? 'Preuve de compétences linguistiques (CLB 4+)' : 'Language skills proof (CLB 4+)'}</span>
              </div>
              <Badge variant={languageProof ? 'default' : 'secondary'}>
                {languageProof ? '✓' : '○'}
              </Badge>
            </div>
            
            {/* Criminal record */}
            <div 
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border cursor-pointer hover:border-amber-300 transition-colors"
              onClick={() => setNoCriminalRecord(!noCriminalRecord)}
            >
              <div className="flex items-center gap-2">
                {noCriminalRecord 
                  ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                  : <Circle className="w-5 h-5 text-gray-300" />
                }
                <span className="text-sm">{language === 'fr' ? 'Aucun casier judiciaire' : 'No criminal record'}</span>
              </div>
              <Badge variant={noCriminalRecord ? 'default' : 'secondary'}>
                {noCriminalRecord ? '✓' : '○'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>{language === 'fr' ? '📋 À propos du test de citoyenneté:' : '📋 About the citizenship test:'}</strong>
            <br />
            {language === 'fr' 
              ? 'Si vous avez entre 18 et 54 ans, vous devez réussir un test sur vos droits, responsabilités et connaissances du Canada. Le test comporte 20 questions et vous devez en obtenir au moins 15 correctes.'
              : 'If you are between 18 and 54 years old, you must pass a test on your rights, responsibilities, and knowledge of Canada. The test has 20 questions and you must answer at least 15 correctly.'}
          </p>
        </div>

        {/* Application Process */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            {language === 'fr' ? 'Processus de demande:' : 'Application process:'}
          </h4>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <p className="text-xs font-medium">{language === 'fr' ? '1. Soumettre la demande' : '1. Submit application'}</p>
              <p className="text-[10px] text-gray-500">{language === 'fr' ? 'Frais: $630 CAD' : 'Fee: $630 CAD'}</p>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <p className="text-xs font-medium">{language === 'fr' ? '2. Test & entrevue' : '2. Test & interview'}</p>
              <p className="text-[10px] text-gray-500">{language === 'fr' ? 'Si 18-54 ans' : 'If 18-54 years'}</p>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <Crown className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-xs font-medium">{language === 'fr' ? '3. Cérémonie' : '3. Ceremony'}</p>
              <p className="text-[10px] text-gray-500">{language === 'fr' ? 'Délai: ~12 mois' : 'Timeline: ~12 months'}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <a 
            href="https://www.canada.ca/en/immigration-refugis-citizenship/services/application/application-forms-application-citizenship-certificate/adult.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-all shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            {language === 'fr' ? 'Vérifier sur Canada.ca' : 'Check on Canada.ca'}
          </a>
          <a 
            href="https://www.canada.ca/en/immigration-refugis-citizenship/corporate/publications-manuals/operational-bulletins-manuals/canadian-citizenship.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            {language === 'fr' ? 'Guide officiel' : 'Official guide'}
          </a>
        </div>

        {/* Processing Time */}
        <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-xl border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>{language === 'fr' ? '⏱️ Délai de traitement actuel:' : '⏱️ Current processing time:'}</strong>
            <br />
            {language === 'fr' 
              ? 'Les demandes de citoyenneté sont actuellement traitées en environ 12 mois. Commencez à préparer votre demande dès maintenant!'
              : 'Citizenship applications are currently processed in approximately 12 months. Start preparing your application now!'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// ==================== CITIZENSHIP QUIZ COMPONENT ====================
export function CitizenshipQuizCard({ language }: { language: Language }) {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  
  // Function to shuffle and select 20 random questions
  const shuffleQuestions = (): CitizenshipQuestion[] => {
    const shuffled = [...citizenshipTestQuestions]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled.slice(0, 20)
  }
  
  const [shuffledQuestions, setShuffledQuestions] = useState<CitizenshipQuestion[]>(shuffleQuestions)
  
  const score = selectedAnswers.reduce((acc, answer, index) => {
    if (answer === shuffledQuestions[index]?.correctAnswer) return acc + 1
    return acc
  }, 0)
  
  const passed = score >= 15
  const currentQ = shuffledQuestions[currentQuestion]
  
  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
    setShowExplanation(true)
  }
  
  const handleNext = () => {
    if (currentQuestion < 19) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }
  
  const restartQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setQuizCompleted(false)
    setShowExplanation(false)
    // Generate new shuffled questions for the next quiz
    setShuffledQuestions(shuffleQuestions())
  }
  
  const startQuiz = () => {
    setShuffledQuestions(shuffleQuestions())
    setQuizStarted(true)
  }
  
  const categoryLabels: Record<string, { fr: string; en: string }> = {
    rights: { fr: 'Droits', en: 'Rights' },
    responsibilities: { fr: 'Responsabilités', en: 'Responsibilities' },
    history: { fr: 'Histoire', en: 'History' },
    government: { fr: 'Gouvernement', en: 'Government' },
    symbols: { fr: 'Symboles', en: 'Symbols' },
    geography: { fr: 'Géographie', en: 'Geography' },
    culture: { fr: 'Culture', en: 'Culture' }
  }
  
  if (!quizStarted) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            {language === 'fr' ? '📝 Quiz de citoyenneté canadienne' : '📝 Canadian Citizenship Quiz'}
          </CardTitle>
          <CardDescription>{language === 'fr' ? 'Pratiquez pour le test officiel' : 'Practice for the official test'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-xl border border-green-200 dark:border-green-800">
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• {language === 'fr' ? '20 questions à choix multiples' : '20 multiple choice questions'}</li>
              <li>• {language === 'fr' ? '15 bonnes réponses requises (75%)' : '15 correct answers required (75%)'}</li>
              <li>• {language === 'fr' ? 'Basé sur "Découvrir le Canada"' : 'Based on "Discover Canada"'}</li>
            </ul>
          </div>
          <Button onClick={startQuiz} className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
            <Target className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Commencer le quiz' : 'Start quiz'}
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  if (quizCompleted) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${passed ? 'bg-green-500' : 'bg-red-500'}`}>
              {passed ? <CheckCircle2 className="w-4 h-4 text-white" /> : <AlertCircle className="w-4 h-4 text-white" />}
            </div>
            {language === 'fr' ? '📊 Résultats' : '📊 Results'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-6 rounded-xl text-center ${passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
            <div className={`text-5xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>{score}/20</div>
            <div className={`text-lg font-semibold ${passed ? 'text-green-700' : 'text-red-700'}`}>
              {passed ? (language === 'fr' ? '🎉 Réussi!' : '🎉 Passed!') : (language === 'fr' ? '📚 Continuez!' : '📚 Keep studying!')}
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={restartQuiz} variant="outline" className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Recommencer' : 'Restart'}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            {language === 'fr' ? '📝 Quiz' : '📝 Quiz'}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{currentQuestion + 1}/20</Badge>
            <Badge className="bg-green-500">{language === 'fr' ? 'Score:' : 'Score:'} {selectedAnswers.filter((a, i) => a === shuffledQuestions[i]?.correctAnswer).length}</Badge>
          </div>
        </div>
        <Progress value={(currentQuestion / 20) * 100} className="h-2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Badge variant="outline">{language === 'fr' ? categoryLabels[currentQ.category]?.fr : categoryLabels[currentQ.category]?.en}</Badge>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border">
          <p className="text-lg font-medium">{language === 'fr' ? currentQ.question : currentQ.questionEn}</p>
        </div>
        <div className="space-y-2">
          {(language === 'fr' ? currentQ.options : currentQ.optionsEn).map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index
            const isCorrect = index === currentQ.correctAnswer
            const showResult = showExplanation
            return (
              <Button
                key={index}
                variant="outline"
                className={`w-full justify-start text-left h-auto py-3 px-4 ${
                  showResult ? isCorrect ? 'bg-green-100 border-green-500' : isSelected ? 'bg-red-100 border-red-500' : '' : isSelected ? 'bg-blue-50 border-blue-500' : ''
                }`}
                onClick={() => !showExplanation && handleAnswer(index)}
                disabled={showExplanation}
              >
                <span className="mr-3 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold">{String.fromCharCode(65 + index)}</span>
                <span className="flex-1">{option}</span>
                {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 ml-2" />}
                {showResult && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500 ml-2" />}
              </Button>
            )
          })}
        </div>
        {showExplanation && (
          <div className="p-4 rounded-xl border bg-amber-50 dark:bg-amber-950/50 border-amber-200">
            <p className="text-sm"><strong>💡 {language === 'fr' ? 'Explication:' : 'Explanation:'}</strong> {language === 'fr' ? currentQ.explanation : currentQ.explanationEn}</p>
          </div>
        )}
        {showExplanation && (
          <Button onClick={handleNext} className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
            {currentQuestion < 19 ? (language === 'fr' ? 'Question suivante' : 'Next question') : (language === 'fr' ? 'Voir les résultats' : 'See results')}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// ==================== PROVINCIAL INTEGRATION POLICIES DATA ====================
