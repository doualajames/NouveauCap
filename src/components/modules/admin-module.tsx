'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { t, type Language } from '@/lib/stores/app-store'
import { CheckCircle2, Crown, Loader2, MessageSquare, PieChart, Settings, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { modules } from '@/lib/app-data'

export interface AdminStats {
  totalUsers: number
  activeUsers: number
  newUsersToday: number
  premiumSubscribers: number
  freeUsers: number
  monthlyRevenue: number
  signupsPerDay: { day: string; count: number }[]
  usersByStatus: { status: string; count: number }[]
  usersByProvince: { province: string; count: number }[]
  taskStats: { completed: number; pending: number; inProgress: number }
}

export function AdminModule({ language }: { language: Language }) {
  const [activeTab, setActiveTab] = useState<'stats' | 'subscriptions' | 'support'>('stats')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0, activeUsers: 0, newUsersToday: 0, premiumSubscribers: 0, freeUsers: 0,
    monthlyRevenue: 0, signupsPerDay: [], usersByStatus: [], usersByProvince: [],
    taskStats: { completed: 0, pending: 0, inProgress: 0 }
  })
  const [tickets, setTickets] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const statsRes = await fetch('/api/admin/stats')
        if (statsRes.ok) { const d = await statsRes.json(); setStats(d) }
        const ticketsRes = await fetch('/api/admin/tickets')
        if (ticketsRes.ok) { const d = await ticketsRes.json(); setTickets(d.tickets || []) }
      } catch (e) { console.error('Admin data error:', e) }
      finally { setLoading(false) }
    }
    fetchData()
  }, [])

  const statusColors: Record<string, string> = {
    OPEN: 'bg-red-100 text-red-700', IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
    RESOLVED: 'bg-green-100 text-green-700', CLOSED: 'bg-gray-100 text-gray-700'
  }
  const openTicketsCount = tickets.filter(t => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-500" /><p className="text-gray-500">{language === 'fr' ? 'Chargement...' : 'Loading...'}</p></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="p-4 lg:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg"><Settings className="w-7 h-7 text-white" /></div>
          <div><h1 className="text-2xl font-bold">{language === 'fr' ? '🛠️ Administration' : '🛠️ Administration'}</h1><p className="text-gray-500">{language === 'fr' ? 'Tableau de bord' : 'Dashboard'}</p></div>
        </div>

        <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border">
          {(['stats', 'subscriptions', 'support'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              {tab === 'stats' && <TrendingUp className="w-4 h-4 inline mr-2" />}
              {tab === 'subscriptions' && <Crown className="w-4 h-4 inline mr-2" />}
              {tab === 'support' && <><MessageSquare className="w-4 h-4 inline mr-2" />{openTicketsCount > 0 && <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">{openTicketsCount}</span>}</>}
              {language === 'fr' ? { stats: 'Statistiques', subscriptions: 'Abonnements', support: 'Support' }[tab] : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white"><CardContent className="p-4"><p className="text-sm opacity-80">{language === 'fr' ? 'Utilisateurs' : 'Users'}</p><p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p></CardContent></Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white"><CardContent className="p-4"><p className="text-sm opacity-80">{language === 'fr' ? 'Actifs (30j)' : 'Active (30d)'}</p><p className="text-3xl font-bold">{stats.activeUsers.toLocaleString()}</p></CardContent></Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white"><CardContent className="p-4"><p className="text-sm opacity-80">Premium</p><p className="text-3xl font-bold">{stats.premiumSubscribers}</p></CardContent></Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white"><CardContent className="p-4"><p className="text-sm opacity-80">{language === 'fr' ? 'Revenus/mois' : 'Revenue/mo'}</p><p className="text-3xl font-bold">${stats.monthlyRevenue.toFixed(0)}</p></CardContent></Card>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-500" />{language === 'fr' ? 'Inscriptions (7 jours)' : 'Signups (7 days)'}</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.signupsPerDay.map((d, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-10 text-sm text-gray-500">{d.day}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.max(5, (d.count / Math.max(...stats.signupsPerDay.map(x => x.count), 1)) * 100)}%` }}></div></div>
                        <span className="text-sm w-6">{d.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader><CardTitle className="flex items-center gap-2"><PieChart className="w-5 h-5 text-purple-500" />{language === 'fr' ? 'Répartition' : 'Distribution'}</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-gray-50 rounded"><span>{language === 'fr' ? 'Gratuit' : 'Free'}</span><span className="font-bold">{stats.freeUsers} ({stats.totalUsers > 0 ? Math.round(stats.freeUsers / stats.totalUsers * 100) : 0}%)</span></div>
                    <div className="flex justify-between p-2 bg-purple-50 rounded"><span>Premium</span><span className="font-bold">{stats.premiumSubscribers} ({stats.totalUsers > 0 ? Math.round(stats.premiumSubscribers / stats.totalUsers * 100) : 0}%)</span></div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border shadow-sm text-center"><p className="text-2xl font-bold text-green-600">+{stats.newUsersToday}</p><p className="text-sm text-gray-500">{language === 'fr' ? 'Nouveaux aujourd\'hui' : 'New today'}</p></div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border shadow-sm text-center"><p className="text-2xl font-bold text-blue-600">{stats.taskStats.completed}</p><p className="text-sm text-gray-500">{language === 'fr' ? 'Tâches complétées' : 'Tasks done'}</p></div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border shadow-sm text-center"><p className="text-2xl font-bold text-orange-600">{openTicketsCount}</p><p className="text-sm text-gray-500">{language === 'fr' ? 'Tickets ouverts' : 'Open tickets'}</p></div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border shadow-sm text-center"><p className="text-2xl font-bold text-purple-600">{stats.totalUsers > 0 ? ((stats.premiumSubscribers / stats.totalUsers) * 100).toFixed(1) : 0}%</p><p className="text-sm text-gray-500">{language === 'fr' ? 'Conversion' : 'Conversion'}</p></div>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: 'free', name: language === 'fr' ? 'Gratuit' : 'Free', price: 0, features: language === 'fr' ? ['Modules de base', 'Forum communautaire', '3 alertes/mois'] : ['Basic modules', 'Community forum', '3 alerts/month'] },
              { id: 'premium', name: 'Premium', price: 19.99, popular: true, features: language === 'fr' ? ['Tous les modules', 'Optimisateur CV IA', 'Alertes illimitées', 'Support prioritaire'] : ['All modules', 'AI CV Optimizer', 'Unlimited alerts', 'Priority support'] },
              { id: 'family', name: language === 'fr' ? 'Famille' : 'Family', price: 39.99, features: language === 'fr' ? ['Tout Premium', '5 membres', 'Conseiller dédié'] : ['All Premium', '5 members', 'Dedicated advisor'] }
            ].map(plan => (
              <Card key={plan.id} className={`border-0 shadow-lg ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {plan.popular && <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-purple-500 text-white">{language === 'fr' ? 'Populaire' : 'Popular'}</Badge>}
                <CardHeader className="text-center"><CardTitle>{plan.name}</CardTitle><p className="text-3xl font-bold">${plan.price}<span className="text-sm text-gray-500">/{language === 'fr' ? 'mois' : 'mo'}</span></p></CardHeader>
                <CardContent><ul className="space-y-1">{plan.features.map((f, i) => <li key={i} className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" />{f}</li>)}</ul></CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'support' && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{language === 'fr' ? 'Aucun ticket de support' : 'No support tickets'}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

