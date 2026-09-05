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

  // UX : « quoi faire maintenant » d'abord. Prochaines étapes = pending, urgent puis obligatoire puis ordre.
  const rank = (x: Task) => (x.priority === 'HIGH' ? 0 : x.isRequired ? 1 : 2)
  const nextTasks = [...tasks]
    .filter(t => t.status !== 'COMPLETED')
    .sort((a, b) => rank(a) - rank(b) || (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 3)
  // Progression par domaine (remplace la barre brute)
  const perModule = modules.map(m => {
    const mt = tasks.filter(t => t.category === m.id.toUpperCase())
    return { id: m.id, icon: m.icon, completed: mt.filter(t => t.status === 'COMPLETED').length, total: mt.length }
  })

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {t('dashboard.welcome', language)}, {user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            {tasks.length - completedTasks > 0
              ? (language === 'fr' ? `${tasks.length - completedTasks} démarches restantes` : `${tasks.length - completedTasks} steps left`)
              : (language === 'fr' ? 'Tout est à jour.' : 'All caught up.')}
          </p>
        </div>
      </div>

      {/* Statut compact — secondaire, une ligne */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="inline-flex items-center bg-foreground text-background text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded">
          {user?.immigrationStatus === 'PERMANENT_RESIDENT' && (language === 'fr' ? 'Résident permanent' : 'Permanent Resident')}
          {user?.immigrationStatus === 'FOREIGN_STUDENT' && (language === 'fr' ? 'Étudiant étranger' : 'Foreign Student')}
          {user?.immigrationStatus === 'OPEN_WORK_PERMIT' && (language === 'fr' ? 'Permis de travail ouvert' : 'Open Work Permit')}
          {user?.immigrationStatus === 'CLOSED_WORK_PERMIT' && (language === 'fr' ? 'Permis de travail fermé' : 'Closed Work Permit')}
        </span>
        {user?.province && (
          <span className="inline-flex items-center border border-foreground/80 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded">
            {language === 'fr' ? provinces.find(p => p.code === user.province)?.name : provinces.find(p => p.code === user.province)?.nameEn}
          </span>
        )}
        {user?.arrivalDate && (
          <span className="text-muted-foreground">
            {language === 'fr' ? 'Arrivé le' : 'Arrived on'} {new Date(user.arrivalDate).toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-CA')}
          </span>
        )}
      </div>

      {/* Alertes urgentes (permis) — remontées près du haut */}
      {isTemporaryResident && hasPermitDates && (
        <PermitExpiryAlerts language={language} user={user} />
      )}

      {/* HÉROS : ce qu'il faut faire maintenant */}
      <div>
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-destructive" />
          <h2 className="text-xl font-bold">{language === 'fr' ? 'À faire maintenant' : 'Do this now'}</h2>
        </div>
        <div className="mt-4 space-y-3">
          {nextTasks.map(task => (
            <Card key={task.id} className="border border-foreground/80 shadow-none cursor-pointer transition-colors hover:bg-muted" onClick={() => onTaskClick(task)}>
              <CardContent className="p-4 flex items-center gap-4">
                <Checkbox
                  checked={task.status === 'COMPLETED'}
                  onCheckedChange={(checked) => onTaskUpdate(task.id, checked ? 'COMPLETED' : 'PENDING')}
                  onClick={(e) => e.stopPropagation()}
                  className="h-5 w-5"
                />
                <div className="flex-1">
                  <p className="font-semibold leading-snug">{language === 'fr' ? task.title : (task.titleEn || task.title)}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t(`modules.${task.category.toLowerCase()}.title`, language)}
                    </span>
                    {task.priority === 'HIGH' && (
                      <span className="text-xs font-bold uppercase text-destructive">{language === 'fr' ? 'Urgent' : 'Urgent'}</span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 flex-none text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
          {nextTasks.length === 0 && (
            <Card className="border border-border shadow-none">
              <CardContent className="p-5 text-center">
                <CheckCircle2 className="w-8 h-8 text-foreground mx-auto mb-2" />
                <p className="font-medium">{language === 'fr' ? 'Tout est à jour. Beau travail.' : 'All caught up. Nice work.'}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Progression par domaine — remplace barre brute + grille */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{language === 'fr' ? 'Votre progression' : 'Your progress'}</h2>
          <span className="text-sm text-muted-foreground">{completedTasks}/{tasks.length} {language === 'fr' ? 'faites' : 'done'}</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {perModule.map(m => {
            const Icon = m.icon
            const pct = m.total > 0 ? Math.round((m.completed / m.total) * 100) : 0
            return (
              <button key={m.id} onClick={() => onModuleClick(m.id)} className="rounded-xl border border-border p-4 text-left transition-colors hover:border-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-foreground/80">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="flex-1 font-medium">{t(`modules.${m.id}.title`, language)}</span>
                  <span className="text-sm font-bold tabular-nums">{m.completed}/{m.total}</span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded bg-muted">
                  <div className="h-1.5 rounded bg-foreground" style={{ width: `${Math.max(pct === 0 ? 0 : 4, pct)}%` }} />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* All Tasks by Category */}
      <Card className="border border-border shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-foreground" />
            {language === 'fr' ? 'Toutes les démarches' : 'All tasks'}
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
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors"
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
                      <Badge className="text-xs bg-destructive/10 text-destructive bg-destructive/10 text-destructive">
                        {language === 'fr' ? 'Obligatoire' : 'Required'}
                      </Badge>
                    )}
                  </div>
                </div>
                {task.priority === 'HIGH' && (
                  <AlertCircle className="w-4 h-4 text-destructive" />
                )}
              </div>
            ))}
            
            {tasks.filter(t => t.status !== 'COMPLETED').length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 text-foreground mx-auto mb-3" />
                <p className="font-medium">{language === 'fr' ? 'Toutes les tâches sont terminées!' : 'All tasks completed!'}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {user?.subscriptionTier === 'FREE' && (
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Crown className="w-12 h-12" />
              <div>
                <p className="font-bold text-lg">{language === 'fr' ? 'Passez à Premium' : 'Upgrade to Premium'}</p>
                <p className="text-foreground">{language === 'fr' ? 'Débloquez l\'IA pour votre CV et le mentorat' : 'Unlock AI CV optimization and mentorship'}</p>
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
        bg: 'bg-destructive/10 bg-destructive/10',
        border: 'border-destructive/40 border-destructive/40',
        icon: 'bg-destructive/10',
        badge: 'bg-destructive/10 ',
        text: 'text-destructive text-destructive'
      },
      urgent: {
        bg: 'bg-muted bg-muted',
        border: 'border-border border-border',
        icon: 'bg-muted',
        badge: 'bg-muted ',
        text: 'text-muted-foreground text-muted-foreground'
      },
      warning: {
        bg: 'bg-muted bg-muted',
        border: 'border-border border-border',
        icon: 'bg-muted',
        badge: 'bg-muted ',
        text: 'text-muted-foreground text-muted-foreground'
      },
      ok: {
        bg: 'bg-muted bg-muted',
        border: 'border-border border-border',
        icon: 'bg-muted',
        badge: 'bg-muted ',
        text: 'text-foreground text-foreground'
      }
    }
    return configs[status as keyof typeof configs]
  }

  return (
    <Card className="border border-border shadow-none overflow-hidden">
      <div className="p-4 bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <h3 className="font-semibold">
            {language === 'fr' ? 'Alertes de renouvellement' : 'Renewal Alerts'}
          </h3>
        </div>
        <p className="/80 text-sm mt-1">
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
              className={`p-4 rounded-xl border ${statusConfig.bg} ${statusConfig.border} transition-all hover:shadow-none`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${statusConfig.icon} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
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
                    <div className="mt-2 p-2 bg-card/50 bg-foreground/50 rounded-lg">
                      <p className="text-xs font-medium text-destructive text-destructive">
                        {language === 'fr'
                          ? 'ACTION IMMÉDIATE REQUISE! Appliquez avant l\'expiration pour maintenir le statut implicite.'
                          : 'IMMEDIATE ACTION REQUIRED! Apply before expiry to maintain implied status.'}
                      </p>
                    </div>
                  )}

                  {alert.type !== 'passport' && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a 
                        href={config.renewalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-card bg-foreground rounded-lg text-xs font-medium border bg-muted dark:hover:bg-foreground transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {language === 'fr' ? 'Renouveler' : 'Renew'}
                      </a>
                      <span className="inline-flex items-center px-3 py-1.5 bg-muted bg-foreground rounded-lg text-xs">
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
        <div className="p-3 bg-muted bg-muted rounded-lg border border-border border-border">
          <p className="text-xs text-foreground text-foreground">
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
              'Les titulaires de permis de travail ouvert ne sont PAS automatiquement éligibles',
              'L\'éligibilité dépend du type de programme qui vous a donné votre permis ouvert',
              'Si votre permis est basé sur un programme provincial (EII), vérifiez les critères',
              'Les conjoints de résidents permanents en attente peuvent être éligibles'
            ]
          : [
              'Open work permit holders are NOT automatically eligible',
              'Eligibility depends on the program type that gave you your open permit',
              'If your permit is based on a provincial program (EII), check the criteria',
              'Spouses of permanent resident applicants may be eligible'
            ],
        fee: '-',
        processingTime: '-',
        officialUrl: 'https://www.canada.ca/en/immigration-refugis-citizenship/services/work-canada/permit/temporary/eligibility/spouse-common-law.html',
        notes: language === 'fr'
          ? 'Attention: Depuis janvier 2024, les conjoints de titulaires de PGWP ne sont plus éligibles. L\'éligibilité varie selon votre situation spécifique.'
          : 'Note: As of January 2024, spouses of PGWP holders are no longer eligible. Eligibility varies based on your specific situation.'
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
    <Card className="border border-border shadow-none bg-muted">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
            <Users2 className="w-4 h-4" />
          </div>
          {language === 'fr' ? 'Permis de travail pour votre conjoint' : 'Work Permit for Your Spouse'}
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
 ? 'bg-muted border border-border border-border' 
 : 'bg-muted border border-border border-border'
 }`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
 eligibility.eligible ? 'bg-muted' : 'bg-muted'
 }`}>
              {eligibility.eligible 
                ? <CheckCircle2 className="w-5 h-5" />
                : <AlertCircle className="w-5 h-5" />
              }
            </div>
            <div>
              <p className={`font-semibold text-lg ${
 eligibility.eligible ? 'text-foreground text-foreground' : 'text-muted-foreground text-muted-foreground'
 }`}>
                {eligibility.eligible 
                  ? (language === 'fr' ? 'Votre conjoint est éligible!' : 'Your spouse is eligible!')
                  : (language === 'fr' ? 'Éligibilité conditionnelle' : 'Conditional eligibility')
                }
              </p>
              <p className={`text-sm ${
 eligibility.eligible ? 'text-foreground text-foreground' : 'text-muted-foreground text-muted-foreground'
 }`}>
                {eligibility.permitType}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="p-3 bg-card bg-foreground rounded-lg border shadow-sm">
            <p className="text-xs text-muted-foreground">{language === 'fr' ? 'Durée estimée' : 'Estimated duration'}</p>
            <p className="font-bold text-foreground">{eligibility.duration}</p>
          </div>
          <div className="p-3 bg-card bg-foreground rounded-lg border shadow-sm">
            <p className="text-xs text-muted-foreground">{language === 'fr' ? 'Frais' : 'Fee'}</p>
            <p className="font-bold text-foreground">{eligibility.fee}</p>
          </div>
          <div className="p-3 bg-card bg-foreground rounded-lg border shadow-sm">
            <p className="text-xs text-muted-foreground">{language === 'fr' ? 'Délai de traitement' : 'Processing time'}</p>
            <p className="font-bold text-foreground">{eligibility.processingTime}</p>
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-foreground" />
            {language === 'fr' ? 'Critères d\'éligibilité:' : 'Eligibility criteria:'}
          </h4>
          <ul className="space-y-2">
            {eligibility.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground text-muted-foreground">
                {req.startsWith('⚠️') 
                  ? <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  : <CheckCircle2 className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                }
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Notes */}
        <div className="p-4 bg-muted bg-muted rounded-xl border border-border border-border">
          <p className="text-sm text-foreground text-foreground">
            <strong>{language === 'fr' ? 'Information importante:' : 'Important note:'}</strong>
            <br />
            {eligibility.notes}
          </p>
        </div>

        {/* Policy Changes Alert - 2024 Changes */}
        <div className="p-4 bg-muted bg-muted rounded-xl border border-border border-border">
          <p className="text-sm text-muted-foreground text-muted-foreground">
            <strong>{language === 'fr' ? 'Changements de politique 2024:' : '2024 Policy Changes:'}</strong>
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all shadow-none"
          >
            <ExternalLink className="w-4 h-4" />
            {language === 'fr' ? 'Vérifier sur Canada.ca' : 'Check on Canada.ca'}
          </a>
          <a 
            href="https://www.canada.ca/en/immigration-refugis-citizenship/services/work-canada/permit/temporary/eligibility/spouse-common-law/how-to-apply.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-card bg-foreground border rounded-lg text-sm font-medium bg-muted dark:hover:bg-foreground transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            {language === 'fr' ? 'Guide de demande' : 'Application guide'}
          </a>
        </div>

        {/* Official Sources */}
        <div className="pt-3 border-t border-border dark:border-border">
          <p className="text-xs text-muted-foreground mb-2">
            {language === 'fr' ? 'Sources officielles:' : 'Official sources:'}
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
    <Card className="h-full border border-border shadow-none bg-muted">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
            <Crown className="w-4 h-4" />
          </div>
          {language === 'fr' ? 'Admissibilité à la citoyenneté canadienne' : 'Canadian Citizenship Eligibility'}
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
 ? 'bg-muted border border-border border-border' 
 : 'bg-muted border border-border border-border'
 }`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
 isEligible ? 'bg-muted' : 'bg-muted'
 }`}>
              {isEligible 
                ? <CheckCircle2 className="w-5 h-5" />
                : <Clock className="w-5 h-5" />
              }
            </div>
            <div>
              <p className={`font-semibold text-lg ${
 isEligible ? 'text-foreground text-foreground' : 'text-muted-foreground text-muted-foreground'
 }`}>
                {isEligible 
                  ? (language === 'fr' ? 'Vous êtes éligible!' : 'You are eligible!')
                  : (language === 'fr' ? 'Pas encore éligible' : 'Not yet eligible')
                }
              </p>
              <p className={`text-sm ${
 isEligible ? 'text-foreground text-foreground' : 'text-muted-foreground text-muted-foreground'
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
              <MapPin className="w-4 h-4 text-muted-foreground" />
              {language === 'fr' ? 'Jours de présence au Canada' : 'Days present in Canada'}
            </h4>
            <Badge variant={actualDaysInCanada >= 1095 ? 'default' : 'secondary'} className="font-mono">
              {actualDaysInCanada} / 1095
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-muted-foreground">
            {language === 'fr' 
              ? `💡 Il vous manque ${Math.max(0, 1095 - actualDaysInCanada)} jours` 
              : `💡 You need ${Math.max(0, 1095 - actualDaysInCanada)} more days`}
          </p>
        </div>

        {/* Requirements Checklist */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-muted-foreground" />
            {language === 'fr' ? 'Critères d\'admissibilité:' : 'Eligibility criteria:'}
          </h4>
          
          <div className="space-y-2">
            {/* Years as PR */}
            <div className="flex items-center justify-between p-3 bg-card bg-foreground rounded-lg border">
              <div className="flex items-center gap-2">
                {yearsAsPR >= 2 
                  ? <CheckCircle2 className="w-5 h-5 text-foreground" />
                  : <Circle className="w-5 h-5 text-muted-foreground" />
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
              className="flex items-center justify-between p-3 bg-card bg-foreground rounded-lg border cursor-pointer border-border transition-colors"
              onClick={() => setFiledTaxes(!filedTaxes)}
            >
              <div className="flex items-center gap-2">
                {filedTaxes 
                  ? <CheckCircle2 className="w-5 h-5 text-foreground" />
                  : <Circle className="w-5 h-5 text-muted-foreground" />
                }
                <span className="text-sm">{language === 'fr' ? 'Impôts déposés (3 des 5 dernières années)' : 'Taxes filed (3 of last 5 years)'}</span>
              </div>
              <Badge variant={filedTaxes ? 'default' : 'secondary'}>
                {filedTaxes ? '✓' : '○'}
              </Badge>
            </div>
            
            {/* Language proof */}
            <div 
              className="flex items-center justify-between p-3 bg-card bg-foreground rounded-lg border cursor-pointer border-border transition-colors"
              onClick={() => setLanguageProof(!languageProof)}
            >
              <div className="flex items-center gap-2">
                {languageProof 
                  ? <CheckCircle2 className="w-5 h-5 text-foreground" />
                  : <Circle className="w-5 h-5 text-muted-foreground" />
                }
                <span className="text-sm">{language === 'fr' ? 'Preuve de compétences linguistiques (CLB 4+)' : 'Language skills proof (CLB 4+)'}</span>
              </div>
              <Badge variant={languageProof ? 'default' : 'secondary'}>
                {languageProof ? '✓' : '○'}
              </Badge>
            </div>
            
            {/* Criminal record */}
            <div 
              className="flex items-center justify-between p-3 bg-card bg-foreground rounded-lg border cursor-pointer border-border transition-colors"
              onClick={() => setNoCriminalRecord(!noCriminalRecord)}
            >
              <div className="flex items-center gap-2">
                {noCriminalRecord 
                  ? <CheckCircle2 className="w-5 h-5 text-foreground" />
                  : <Circle className="w-5 h-5 text-muted-foreground" />
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
        <div className="p-4 bg-muted bg-muted rounded-xl border border-border border-border">
          <p className="text-sm text-foreground text-foreground">
            <strong>{language === 'fr' ? 'À propos du test de citoyenneté:' : 'About the citizenship test:'}</strong>
            <br />
            {language === 'fr' 
              ? 'Si vous avez entre 18 et 54 ans, vous devez réussir un test sur vos droits, responsabilités et connaissances du Canada. Le test comporte 20 questions et vous devez en obtenir au moins 15 correctes.'
              : 'If you are between 18 and 54 years old, you must pass a test on your rights, responsibilities, and knowledge of Canada. The test has 20 questions and you must answer at least 15 correctly.'}
          </p>
        </div>

        {/* Application Process */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            {language === 'fr' ? 'Processus de demande:' : 'Application process:'}
          </h4>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 bg-card bg-foreground rounded-lg border text-center">
              <div className="w-8 h-8 bg-muted bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-4 h-4 text-muted-foreground text-muted-foreground" />
              </div>
              <p className="text-xs font-medium">{language === 'fr' ? '1. Soumettre la demande' : '1. Submit application'}</p>
              <p className="text-[10px] text-muted-foreground">{language === 'fr' ? 'Frais: $630 CAD' : 'Fee: $630 CAD'}</p>
            </div>
            <div className="p-3 bg-card bg-foreground rounded-lg border text-center">
              <div className="w-8 h-8 bg-muted bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                <FileCheck className="w-4 h-4 text-muted-foreground text-muted-foreground" />
              </div>
              <p className="text-xs font-medium">{language === 'fr' ? '2. Test & entrevue' : '2. Test & interview'}</p>
              <p className="text-[10px] text-muted-foreground">{language === 'fr' ? 'Si 18-54 ans' : 'If 18-54 years'}</p>
            </div>
            <div className="p-3 bg-card bg-foreground rounded-lg border text-center">
              <div className="w-8 h-8 bg-muted bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                <Crown className="w-4 h-4 text-foreground text-foreground" />
              </div>
              <p className="text-xs font-medium">{language === 'fr' ? '3. Cérémonie' : '3. Ceremony'}</p>
              <p className="text-[10px] text-muted-foreground">{language === 'fr' ? 'Délai: ~12 mois' : 'Timeline: ~12 months'}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <a 
            href="https://www.canada.ca/en/immigration-refugis-citizenship/services/application/application-forms-application-citizenship-certificate/adult.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all shadow-none"
          >
            <ExternalLink className="w-4 h-4" />
            {language === 'fr' ? 'Vérifier sur Canada.ca' : 'Check on Canada.ca'}
          </a>
          <a 
            href="https://www.canada.ca/en/immigration-refugis-citizenship/corporate/publications-manuals/operational-bulletins-manuals/canadian-citizenship.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-card bg-foreground border rounded-lg text-sm font-medium bg-muted dark:hover:bg-foreground transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            {language === 'fr' ? 'Guide officiel' : 'Official guide'}
          </a>
        </div>

        {/* Processing Time */}
        <div className="p-4 bg-muted bg-muted rounded-xl border border-border border-border">
          <p className="text-sm text-foreground text-foreground">
            <strong>{language === 'fr' ? 'Délai de traitement actuel:' : 'Current processing time:'}</strong>
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
      <Card className="border border-border shadow-none bg-muted">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            {language === 'fr' ? 'Quiz de citoyenneté canadienne' : 'Canadian Citizenship Quiz'}
          </CardTitle>
          <CardDescription>{language === 'fr' ? 'Pratiquez pour le test officiel' : 'Practice for the official test'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted bg-muted rounded-xl border border-border border-border">
            <ul className="text-sm text-foreground text-foreground space-y-1">
              <li>• {language === 'fr' ? '20 questions à choix multiples' : '20 multiple choice questions'}</li>
              <li>• {language === 'fr' ? '15 bonnes réponses requises (75%)' : '15 correct answers required (75%)'}</li>
              <li>• {language === 'fr' ? 'Basé sur "Découvrir le Canada"' : 'Based on "Discover Canada"'}</li>
            </ul>
          </div>
          <Button onClick={startQuiz} className="w-full bg-primary text-primary-foreground">
            <Target className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Commencer le quiz' : 'Start quiz'}
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  if (quizCompleted) {
    return (
      <Card className="border border-border shadow-none bg-muted">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${passed ? 'bg-muted' : 'bg-destructive/10'}`}>
              {passed ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            </div>
            {language === 'fr' ? 'Résultats' : 'Results'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-6 rounded-xl text-center ${passed ? 'bg-muted bg-muted' : 'bg-destructive/10 bg-destructive/10'}`}>
            <div className={`text-5xl font-bold mb-2 ${passed ? 'text-foreground' : 'text-destructive'}`}>{score}/20</div>
            <div className={`text-lg font-semibold ${passed ? 'text-foreground' : 'text-destructive'}`}>
              {passed ? (language === 'fr' ? 'Réussi!' : 'Passed!') : (language === 'fr' ? 'Continuez!' : 'Keep studying!')}
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
    <Card className="border border-border shadow-none bg-muted">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            {language === 'fr' ? 'Quiz' : 'Quiz'}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{currentQuestion + 1}/20</Badge>
            <Badge className="bg-muted">{language === 'fr' ? 'Score:' : 'Score:'} {selectedAnswers.filter((a, i) => a === shuffledQuestions[i]?.correctAnswer).length}</Badge>
          </div>
        </div>
        <Progress value={(currentQuestion / 20) * 100} className="h-2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Badge variant="outline">{language === 'fr' ? categoryLabels[currentQ.category]?.fr : categoryLabels[currentQ.category]?.en}</Badge>
        <div className="p-4 bg-card bg-foreground rounded-xl border">
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
 showResult ? isCorrect ? 'bg-muted border-border' : isSelected ? 'bg-destructive/10 border-destructive/40' : '' : isSelected ? 'bg-muted border-border' : ''
 }`}
                onClick={() => !showExplanation && handleAnswer(index)}
                disabled={showExplanation}
              >
                <span className="mr-3 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold">{String.fromCharCode(65 + index)}</span>
                <span className="flex-1">{option}</span>
                {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-foreground ml-2" />}
                {showResult && isSelected && !isCorrect && <X className="w-5 h-5 text-destructive ml-2" />}
              </Button>
            )
          })}
        </div>
        {showExplanation && (
          <div className="p-4 rounded-xl border bg-muted bg-muted border-border">
            <p className="text-sm"><strong>💡 {language === 'fr' ? 'Explication:' : 'Explanation:'}</strong> {language === 'fr' ? currentQ.explanation : currentQ.explanationEn}</p>
          </div>
        )}
        {showExplanation && (
          <Button onClick={handleNext} className="w-full bg-primary text-primary-foreground">
            {currentQuestion < 19 ? (language === 'fr' ? 'Question suivante' : 'Next question') : (language === 'fr' ? 'Voir les résultats' : 'See results')}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// ==================== PROVINCIAL INTEGRATION POLICIES DATA ====================
