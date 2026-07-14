'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { t, type Language, type Province } from '@/lib/stores/app-store'
import { Award, Brain, Briefcase, DollarSign, Download, ExternalLink, FileCheck, FileText, Loader2, MapPin, Plus, Search, Sparkles, Target, TrendingUp, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { inDemandJobsByProvince, modules, provinces } from '@/lib/app-data'

export function EmploymentModule({ language, user }: {
  language: Language
  user: any
}) {
  const [cvContent, setCvContent] = useState('')
  const [targetJob, setTargetJob] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([])
  const [extractedJobInfo, setExtractedJobInfo] = useState<{title?: string; company?: string; requirements?: string[]} | null>(null)
  const [extractingUrl, setExtractingUrl] = useState(false)
  const [aiResult, setAiResult] = useState<any>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [applications, setApplications] = useState<any[]>([])
  const [showAddApplication, setShowAddApplication] = useState(false)
  const [newApp, setNewApp] = useState({ company: '', position: '', notes: '' })
  const [activeTab, setActiveTab] = useState<'cv' | 'tracker'>('cv')
  const [uploadingFile, setUploadingFile] = useState(false)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/user-data?action=get-job-applications&userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.applications) setApplications(data.applications)
        })
    }
  }, [user?.id])

  // Extract ATS keywords from job posting URL
  const handleExtractFromUrl = async () => {
    if (!jobUrl.trim()) return
    setExtractingUrl(true)
    setExtractedKeywords([])
    setExtractedJobInfo(null)
    
    try {
      const res = await fetch('/api/extract-job-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: jobUrl, language })
      })
      
      const data = await res.json()
      
      if (data.keywords) {
        setExtractedKeywords(data.keywords)
      }
      if (data.jobInfo) {
        setExtractedJobInfo(data.jobInfo)
        if (data.jobInfo.title && !targetJob) {
          setTargetJob(data.jobInfo.title)
        }
      }
    } catch (e) {
      console.error('URL extraction error', e)
    }
    
    setExtractingUrl(false)
  }

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingFile(true)
    setFileName(file.name)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/extract-cv-text', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      
      if (data.text) {
        setCvContent(data.text)
      } else if (data.error) {
        console.error('Extract error:', data.error)
      }
    } catch (e) {
      console.error('File upload error:', e)
    }

    setUploadingFile(false)
    event.target.value = ''
  }

  const handleCvOptimize = async () => {
    if (!cvContent.trim()) return
    setAiLoading(true)
    setAiResult(null)
    
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'optimize-cv',
          data: { 
            cvContent, 
            targetJob, 
            language,
            jobKeywords: extractedKeywords,
            jobRequirements: extractedJobInfo?.requirements
          }
        })
      })
      
      const data = await res.json()
      setAiResult(data)
      
      if (user?.id) {
        await fetch('/api/user-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'save-document',
            data: {
              userId: user.id,
              name: `CV Optimisé - ${new Date().toLocaleDateString()}`,
              type: 'CV',
              content: JSON.stringify(data),
              aiOptimized: true
            }
          })
        })
      }
    } catch (e) {
      console.error('AI error', e)
    }
    
    setAiLoading(false)
  }

  const handleAddApplication = async () => {
    if (!user?.id || !newApp.company || !newApp.position) return
    
    try {
      const res = await fetch('/api/user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save-job-application',
          data: {
            userId: user.id,
            ...newApp,
            status: 'APPLIED'
          }
        })
      })
      
      const data = await res.json()
      if (data.success) {
        setApplications([data.application, ...applications])
        setNewApp({ company: '', position: '', notes: '' })
        setShowAddApplication(false)
      }
    } catch (e) {
      console.error('Error adding application', e)
    }
  }

  const updateApplicationStatus = async (appId: string, status: string) => {
    try {
      await fetch('/api/user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-job-application',
          data: { applicationId: appId, status }
        })
      })
      
      setApplications(applications.map(a => a.id === appId ? { ...a, status } : a))
    } catch (e) {
      console.error('Error updating application', e)
    }
  }

  const statusConfig: Record<string, { bg: string; text: string; icon: string }> = {
    APPLIED: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', icon: '📤' },
    INTERVIEW: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', icon: '🎤' },
    OFFER: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', icon: '🎉' },
    REJECTED: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', icon: '❌' },
  }

  const appliedCount = applications.filter(a => a.status === 'APPLIED').length
  const interviewCount = applications.filter(a => a.status === 'INTERVIEW').length
  const offerCount = applications.filter(a => a.status === 'OFFER').length

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900">
      <div className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {t('modules.employment.title', language)}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">{t('modules.employment.description', language)}</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500">{language === 'fr' ? 'Candidatures' : 'Applications'}</p>
              <p className="font-bold text-blue-600">{applications.length}</p>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500">{language === 'fr' ? 'Entretiens' : 'Interviews'}</p>
              <p className="font-bold text-amber-600">{interviewCount}</p>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500">{language === 'fr' ? 'Offres' : 'Offers'}</p>
              <p className="font-bold text-green-600">{offerCount}</p>
            </div>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex lg:hidden bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border">
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'cv' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('cv')}
          >
            <Brain className="w-4 h-4 inline mr-2" />
            {language === 'fr' ? 'CV IA' : 'AI CV'}
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'tracker' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('tracker')}
          >
            <Target className="w-4 h-4 inline mr-2" />
            {language === 'fr' ? 'Suivi' : 'Tracker'}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* AI CV Optimizer */}
          <div className={`${activeTab !== 'cv' ? 'hidden lg:block' : ''}`}>
            <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  {language === 'fr' ? 'Optimisation CV avec IA' : 'AI CV Optimization'}
                </CardTitle>
                <CardDescription>
                  {language === 'fr' ? 'Optimisez votre CV pour le marché canadien' : 'Optimize your CV for the Canadian market'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Job URL Input */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-500" />
                    {language === 'fr' ? '🔗 Lien de l\'offre d\'emploi (optionnel)' : '🔗 Job posting URL (optional)'}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder={language === 'fr' ? 'https://indeed.com/... ou https://linkedin.com/jobs/...' : 'https://indeed.com/... or https://linkedin.com/jobs/...'}
                      value={jobUrl}
                      onChange={(e) => setJobUrl(e.target.value)}
                      className="bg-white dark:bg-gray-800 flex-1"
                    />
                    <Button 
                      onClick={handleExtractFromUrl}
                      disabled={extractingUrl || !jobUrl.trim()}
                      variant="outline"
                      className="shrink-0"
                    >
                      {extractingUrl ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Search className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    {language === 'fr' 
                      ? '💡 Collez le lien pour extraire automatiquement les mots-clés ATS'
                      : '💡 Paste the link to automatically extract ATS keywords'}
                  </p>
                </div>

                {/* Extracted Keywords */}
                {extractedKeywords.length > 0 && (
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">
                        🏷️ {language === 'fr' ? 'Mots-clés ATS détectés' : 'ATS Keywords detected'} ({extractedKeywords.length})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {extractedKeywords.map((keyword, i) => (
                        <Badge key={i} variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* CV Input */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{language === 'fr' ? '📋 Votre CV' : '📋 Your CV'}</Label>
                  
                  {/* File Upload */}
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="cv-file-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('cv-file-upload')?.click()}
                      disabled={uploadingFile}
                      className="flex-1 border-dashed border-2 h-11"
                    >
                      {uploadingFile ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      {uploadingFile 
                        ? (language === 'fr' ? 'Extraction...' : 'Extracting...')
                        : (language === 'fr' ? '📁 Charger PDF, DOCX, TXT' : '📁 Upload PDF, DOCX, TXT')
                      }
                    </Button>
                  </div>
                  
                  {fileName && (
                    <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm">
                      <FileCheck className="w-4 h-4 text-blue-500" />
                      <span className="text-blue-700 dark:text-blue-300">{fileName}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto h-5 w-5 p-0"
                        onClick={() => { setFileName(''); setCvContent('') }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                  
                  <Textarea
                    placeholder={language === 'fr' ? 'Ou collez le contenu de votre CV ici...' : 'Or paste your CV content here...'}
                    value={cvContent}
                    onChange={(e) => setCvContent(e.target.value)}
                    rows={5}
                    className="resize-none bg-white dark:bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{language === 'fr' ? '🎯 Poste visé' : '🎯 Target job'}</Label>
                  <Input
                    placeholder={language === 'fr' ? 'Ex: Développeur Full Stack' : 'E.g., Full Stack Developer'}
                    value={targetJob}
                    onChange={(e) => setTargetJob(e.target.value)}
                    className="bg-white dark:bg-gray-800"
                  />
                </div>
                <Button 
                  onClick={handleCvOptimize} 
                  disabled={aiLoading || !cvContent.trim()}
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all duration-300"
                >
                  {aiLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="w-5 h-5 mr-2" />
                  )}
                  {language === 'fr' ? 'Optimiser avec l\'IA' : 'Optimize with AI'}
                </Button>
                
                {aiResult && (
                  <div className="space-y-4 mt-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl border border-purple-100 dark:border-purple-800">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-green-500" />
                        {language === 'fr' ? 'CV Optimisé' : 'Optimized CV'}
                      </h4>
                      <pre className="whitespace-pre-wrap text-sm bg-white dark:bg-gray-900 p-4 rounded-lg border max-h-40 overflow-auto">
                        {aiResult.optimizedCv}
                      </pre>
                    </div>
                    {aiResult.suggestions?.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">💡 {language === 'fr' ? 'Suggestions' : 'Suggestions'}</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {aiResult.suggestions.map((s: string, i: number) => (
                            <li key={i} className="text-gray-700 dark:text-gray-300">{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {aiResult.keywords?.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">🏷️ {language === 'fr' ? 'Mots-clés ATS' : 'ATS Keywords'}</h4>
                        <div className="flex flex-wrap gap-2">
                          {aiResult.keywords.map((k: string, i: number) => (
                            <Badge key={i} variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">{k}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Job Applications Tracker */}
          <div className={`${activeTab !== 'tracker' ? 'hidden lg:block' : ''}`}>
            <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    {language === 'fr' ? 'Suivi des candidatures' : 'Application Tracker'}
                  </CardTitle>
                  <Button size="sm" onClick={() => setShowAddApplication(true)} className="bg-gradient-to-r from-blue-500 to-blue-600">
                    <Plus className="w-4 h-4 mr-1" />
                    {language === 'fr' ? 'Ajouter' : 'Add'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                  {applications.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="font-medium">{language === 'fr' ? 'Aucune candidature' : 'No applications'}</p>
                      <p className="text-sm text-gray-400 mt-1">{language === 'fr' ? 'Ajoutez votre première candidature' : 'Add your first application'}</p>
                      <Button variant="outline" className="mt-4" onClick={() => setShowAddApplication(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        {language === 'fr' ? 'Ajouter' : 'Add'}
                      </Button>
                    </div>
                  ) : (
                    applications.map(app => {
                      const config = statusConfig[app.status]
                      return (
                        <div 
                          key={app.id} 
                          className="group p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{config.icon}</span>
                                <p className="font-semibold">{app.position}</p>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{app.company}</p>
                              {app.notes && <p className="text-xs text-gray-400 mt-2 italic">"{app.notes}"</p>}
                              <p className="text-xs text-gray-400 mt-2">
                                📅 {language === 'fr' ? 'Ajouté le' : 'Added on'} {new Date(app.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Select value={app.status} onValueChange={(v) => updateApplicationStatus(app.id, v)}>
                              <SelectTrigger className={`w-28 h-8 ${config.bg} ${config.text} border-0 font-medium`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="APPLIED">{language === 'fr' ? '📤 Postulé' : '📤 Applied'}</SelectItem>
                                <SelectItem value="INTERVIEW">{language === 'fr' ? '🎤 Entretien' : '🎤 Interview'}</SelectItem>
                                <SelectItem value="OFFER">{language === 'fr' ? '🎉 Offre' : '🎉 Offer'}</SelectItem>
                                <SelectItem value="REJECTED">{language === 'fr' ? '❌ Refusé' : '❌ Rejected'}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Application Dialog */}
        <Dialog open={showAddApplication} onOpenChange={setShowAddApplication}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-500" />
                {language === 'fr' ? 'Nouvelle candidature' : 'New Application'}
              </DialogTitle>
              <DialogDescription>
                {language === 'fr' ? 'Enregistrez une nouvelle candidature' : 'Record a new job application'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>{language === 'fr' ? '🏢 Entreprise' : '🏢 Company'}</Label>
                <Input value={newApp.company} onChange={(e) => setNewApp({...newApp, company: e.target.value})} placeholder={language === 'fr' ? 'Nom de l\'entreprise' : 'Company name'} />
              </div>
              <div className="space-y-2">
                <Label>{language === 'fr' ? '💼 Poste' : '💼 Position'}</Label>
                <Input value={newApp.position} onChange={(e) => setNewApp({...newApp, position: e.target.value})} placeholder={language === 'fr' ? 'Titre du poste' : 'Job title'} />
              </div>
              <div className="space-y-2">
                <Label>{language === 'fr' ? '📝 Notes' : '📝 Notes'}</Label>
                <Textarea value={newApp.notes} onChange={(e) => setNewApp({...newApp, notes: e.target.value})} placeholder={language === 'fr' ? 'Détails supplémentaires...' : 'Additional details...'} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddApplication(false)}>{language === 'fr' ? 'Annuler' : 'Cancel'}</Button>
              <Button onClick={handleAddApplication} className="bg-gradient-to-r from-blue-500 to-blue-600">{language === 'fr' ? 'Enregistrer' : 'Save'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* In-Demand Jobs by Province */}
        {user?.province && inDemandJobsByProvince[user.province as Province]?.length > 0 && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                {language === 'fr' ? '💼 Métiers en demande' : '💼 In-Demand Jobs'}
              </CardTitle>
              <CardDescription>
                {language === 'fr' 
                  ? `Les emplois les plus recherchés en ${provinces.find(p => p.code === user.province)?.name}`
                  : `Most sought-after jobs in ${provinces.find(p => p.code === user.province)?.nameEn}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {inDemandJobsByProvince[user.province as Province]?.slice(0, 8).map((job, i) => {
                  const getDemandBadge = (demand: string) => {
                    switch (demand) {
                      case 'VERY_HIGH':
                        return { 
                          label: language === 'fr' ? 'Très forte demande' : 'Very High Demand',
                          className: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                        }
                      case 'HIGH':
                        return { 
                          label: language === 'fr' ? 'Forte demande' : 'High Demand',
                          className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                        }
                      default:
                        return { 
                          label: language === 'fr' ? 'Demande modérée' : 'Moderate Demand',
                          className: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                        }
                    }
                  }
                  
                  const demandBadge = getDemandBadge(job.demand)
                  
                  return (
                    <div 
                      key={i} 
                      className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-sm">
                              {language === 'fr' ? job.title : job.titleEn}
                            </h4>
                            <Badge className={demandBadge.className}>
                              {demandBadge.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {language === 'fr' ? job.sector : job.sectorEn}
                            </Badge>
                            {job.nocCode && (
                              <span className="text-xs text-gray-500">
                                NOC {job.nocCode}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        {language === 'fr' ? job.description : job.descriptionEn}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-green-500" />
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            {job.avgSalary}
                          </span>
                        </div>
                        {job.immigrationBonus && (
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                            ✨ {job.immigrationBonus}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Province Info Banner */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-blue-800 dark:text-blue-200">
                      {language === 'fr' 
                        ? `💡 Ces métiers en demande à ${provinces.find(p => p.code === user.province)?.name} peuvent faciliter votre immigration`
                        : `💡 These in-demand jobs in ${provinces.find(p => p.code === user.province)?.nameEn} can facilitate your immigration`}
                    </h4>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      {language === 'fr'
                        ? 'Les programmes provinciaux de nomination (PNP) accordent souvent la priorité aux candidats dans ces métiers.'
                        : 'Provincial Nominee Programs (PNP) often prioritize candidates in these occupations.'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Link to job bank */}
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => window.open('https://www.jobbank.gc.ca/jobsearch/jobsearch?sort=D', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Rechercher sur Guichet-Emplois' : 'Search on Job Bank'}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => window.open(`https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=${encodeURIComponent(language === 'fr' ? 'infirmier' : 'nurse')}&locationstring=${provinces.find(p => p.code === user.province)?.nameEn}`, '_blank')}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Voir les offres d\'emploi' : 'View Job Postings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resources */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: FileText, title: language === 'fr' ? 'Lettre de motivation' : 'Cover Letter', desc: language === 'fr' ? 'Modèles canadiens' : 'Canadian templates', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950' },
            { icon: Award, title: language === 'fr' ? 'Reconnaissance diplômes' : 'Credential Recognition', desc: 'WES, IQAS, etc.', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950' },
            { icon: TrendingUp, title: language === 'fr' ? 'Guide salarial' : 'Salary Guide', desc: language === 'fr' ? 'Par secteur et région' : 'By sector and region', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950' },
          ].map((item, i) => (
            <Card key={i} className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 group">
              <CardContent className={`p-5 ${item.bg} rounded-lg`}>
                <item.icon className={`w-10 h-10 ${item.color} mb-3 group-hover:scale-110 transition-transform`} />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== HOUSING MODULE ====================
// ==================== HOUSING MODULE ====================
