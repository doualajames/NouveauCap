'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { t, type Language } from '@/lib/stores/app-store'
import { BookOpen, Calendar, CalendarDays, ChevronRight, ExternalLink, Eye, MapPin, MessageSquare, Users, Users2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { modules } from '@/lib/app-data'

export function CommunityModule({ language, user }: {
  language: Language
  user: any
}) {
  const [events, setEvents] = useState<any[]>([])
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/user-data?action=get-events')
      .then(res => res.json())
      .then(data => {
        if (data.events) setEvents(data.events)
      })
  }, [])

  const handleRegister = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId))
    } else {
      setRegisteredEvents([...registeredEvents, eventId])
    }
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-none shadow-indigo-200 dark:shadow-indigo-900/30">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground dark:">
                {t('modules.community.title', language)}
              </h1>
              <p className="text-muted-foreground text-muted-foreground">{t('modules.community.description', language)}</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-card bg-foreground rounded-xl border shadow-sm">
              <p className="text-xs text-muted-foreground">{language === 'fr' ? 'Inscriptions' : 'Registered'}</p>
              <p className="font-bold text-foreground">{registeredEvents.length}</p>
            </div>
            <div className="px-4 py-2 bg-card bg-foreground rounded-xl border shadow-sm">
              <p className="text-xs text-muted-foreground">{language === 'fr' ? 'Événements' : 'Events'}</p>
              <p className="font-bold text-foreground">{events.length}</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <Card className="border border-border shadow-none bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 bg-muted bg-muted rounded-lg flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-foreground text-foreground" />
              </div>
              {language === 'fr' ? 'Événements à venir' : 'Upcoming Events'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="w-16 h-16 bg-muted bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CalendarDays className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium">{language === 'fr' ? 'Aucun événement à venir' : 'No upcoming events'}</p>
                </div>
              ) : (
                events.map((event) => {
                  const isRegistered = registeredEvents.includes(event.id)
                  return (
                    <Card 
                      key={event.id} 
                      className={`overflow-hidden transition-all duration-300 ${
 isRegistered 
 ? 'ring-2 ring-foreground bg-muted bg-muted' 
 : 'hover:shadow-none'
 }`}
                    >
                      <div className={`h-1 ${isRegistered ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'}`} />
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-lg">{language === 'fr' ? event.title : event.titleEn}</h4>
                              {isRegistered && <Badge className="bg-muted">✓ {language === 'fr' ? 'Inscrit' : 'Registered'}</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{language === 'fr' ? event.description : event.descriptionEn}</p>
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              {event.city && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {event.city}
                                </div>
                              )}
                              {event.isVirtual && <Badge variant="outline">Virtual</Badge>}
                            </div>
                          </div>
                          <Button 
                            variant={isRegistered ? 'outline' : 'default'}
                            onClick={() => handleRegister(event.id)}
                            className={isRegistered ? '' : 'bg-primary text-primary-foreground'}
                          >
                            {isRegistered 
                              ? (language === 'fr' ? 'Annuler' : 'Cancel')
                              : (language === 'fr' ? 'S\'inscrire' : 'Register')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Forum Preview */}
        <Card className="border border-border shadow-none bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 bg-muted bg-muted rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-foreground text-foreground" />
              </div>
              {language === 'fr' ? 'Forum communautaire' : 'Community Forum'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: language === 'fr' ? 'Meilleures banques pour nouveaux arrivants?' : 'Best banks for newcomers?', replies: 24, views: 156, emoji: '🏦' },
                { title: language === 'fr' ? 'Expérience RAMQ - délai de carence' : 'RAMQ experience - waiting period', replies: 18, views: 89, emoji: '🏥' },
                { title: language === 'fr' ? 'Conseils recherche emploi IT Montréal' : 'IT job search tips Montreal', replies: 32, views: 203, emoji: '💼' },
              ].map((post, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted bg-foreground rounded-xl cursor-pointer bg-muted dark:hover:bg-foreground transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{post.emoji}</span>
                    <p className="font-medium flex-1">{post.title}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {post.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              {language === 'fr' ? 'Voir tout le forum' : 'View full forum'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Cultural Guide & Associations */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border border-border shadow-none bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-muted bg-muted rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-muted-foreground text-muted-foreground" />
                </div>
                {language === 'fr' ? 'Guide culturel canadien' : 'Canadian Cultural Guide'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { title: language === 'fr' ? 'Étiquette au travail' : 'Workplace etiquette', emoji: '👔' },
                { title: language === 'fr' ? 'Petite conversation' : 'Small talk', emoji: '💬' },
                { title: language === 'fr' ? 'Pourboires et coutumes' : 'Tipping and customs', emoji: '💰' },
                { title: language === 'fr' ? 'Hiver canadien' : 'Canadian winter', emoji: '❄️' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted bg-foreground rounded-lg bg-muted dark:hover:bg-foreground transition-colors cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    {item.title}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-border shadow-none bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-muted bg-muted rounded-lg flex items-center justify-center">
                  <Users2 className="w-4 h-4 text-foreground text-foreground" />
                </div>
                {language === 'fr' ? 'Associations ethnoculturelles' : 'Ethnocultural Associations'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: language === 'fr' ? 'Association francophone' : 'Francophone Association', city: 'Toronto', emoji: '🇫🇷' },
                { name: language === 'fr' ? 'Centre communautaire hispanique' : 'Hispanic Community Center', city: 'Montréal', emoji: '🇪🇸' },
                { name: language === 'fr' ? 'Association sud-asiatique' : 'South Asian Association', city: 'Vancouver', emoji: '🇮🇳' },
                { name: language === 'fr' ? 'Centre culturel chinois' : 'Chinese Cultural Center', city: 'Calgary', emoji: '🇨🇳' },
              ].map((assoc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted bg-foreground rounded-lg bg-muted dark:hover:bg-foreground transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{assoc.emoji}</span>
                    <div>
                      <p className="font-medium">{assoc.name}</p>
                      <p className="text-xs text-muted-foreground">{assoc.city}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}



// ==================== PROFILE MODULE ====================
