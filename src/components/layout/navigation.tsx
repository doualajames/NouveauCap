'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home, User, FileText, Building2, Wallet, Heart, Users,
  Plane, GraduationCap, Briefcase, Shield, Calendar,
  Menu, X, Globe, Bell, Settings, LogOut, Crown, Star,
  MessageSquare, CalendarDays, BookOpen, HeartHandshake,
  CreditCard, Calculator, FileSearch, Building, Stethoscope,
  Brain, MapPin, ChevronRight, ChevronLeft, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'

// ==================== TYPES ====================
interface NavItem {
  id: string
  label: string
  labelEn: string
  icon: React.ElementType
  href: string
  badge?: string | number
  children?: NavItem[]
  requiredRoles?: string[]
}

interface NavigationProps {
  user?: {
    id: string
    name: string
    email: string
    avatar?: string
    immigrationStatus?: string
    province?: string
    subscription?: string
  } | null
  language?: 'fr' | 'en'
  onLogout?: () => void
  onLanguageChange?: (lang: 'fr' | 'en') => void
}

// ==================== NAVIGATION DATA ====================
const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    labelEn: 'Dashboard',
    icon: Home,
    href: '/dashboard',
  },
  {
    id: 'immigration',
    label: 'Immigration',
    labelEn: 'Immigration',
    icon: Plane,
    href: '/immigration',
    children: [
      { id: 'quiz', label: 'Quiz citoyenneté', labelEn: 'Citizenship Quiz', icon: FileText, href: '/immigration/quiz' },
      { id: 'crs', label: 'Simulateur CRS', labelEn: 'CRS Simulator', icon: Calculator, href: '/immigration/crs' },
      { id: 'status', label: 'Statut légal', labelEn: 'Legal Status', icon: Shield, href: '/immigration/status' },
    ],
  },
  {
    id: 'emploi',
    label: 'Emploi',
    labelEn: 'Employment',
    icon: Briefcase,
    href: '/emploi',
    children: [
      { id: 'cv', label: 'Optimisation CV', labelEn: 'CV Optimization', icon: FileSearch, href: '/emploi/cv' },
      { id: 'jobs', label: 'Recherche d\'emploi', labelEn: 'Job Search', icon: Building, href: '/emploi/jobs' },
    ],
  },
  {
    id: 'sante',
    label: 'Santé',
    labelEn: 'Health',
    icon: Heart,
    href: '/sante',
    children: [
      { id: 'clinics', label: 'Cliniques', labelEn: 'Clinics', icon: Stethoscope, href: '/sante/clinics' },
      { id: 'insurance', label: 'Assurance maladie', labelEn: 'Health Insurance', icon: Heart, href: '/sante/insurance' },
    ],
  },
  {
    id: 'province',
    label: 'Province',
    labelEn: 'Province',
    icon: MapPin,
    href: '/province',
  },
  {
    id: 'finances',
    label: 'Finances',
    labelEn: 'Finances',
    icon: Wallet,
    href: '/finances',
  },
  {
    id: 'calendrier',
    label: 'Calendrier',
    labelEn: 'Calendar',
    icon: Calendar,
    href: '/calendrier',
    badge: 3,
  },
  {
    id: 'ressources',
    label: 'Ressources',
    labelEn: 'Resources',
    icon: BookOpen,
    href: '/ressources',
  },
]

// ==================== SIDEBAR COMPONENT ====================
export function Sidebar({
  user,
  language = 'fr',
  collapsed = false,
  onToggle,
  activePath,
}: NavigationProps & {
  collapsed?: boolean
  onToggle?: () => void
  activePath?: string
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['immigration'])

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const t = (fr: string, en: string) => (language === 'fr' ? fr : en)

  const isActive = (href: string) => activePath === href || activePath?.startsWith(href + '/')

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300',
        'flex flex-col',
        collapsed ? 'w-[72px]' : 'w-[280px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-md">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg gradient-text">NouveauCap</span>
              <span className="text-[10px] text-gray-400 -mt-1">
                {t('Votre guide au Canada', 'Your guide to Canada')}
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="ml-auto p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isExpanded = expandedItems.includes(item.id)
            const hasChildren = item.children && item.children.length > 0
            const itemIsActive = isActive(item.href)

            return (
              <div key={item.id}>
                <button
                  onClick={() => hasChildren ? toggleExpanded(item.id) : undefined}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200',
                    itemIsActive
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    collapsed && 'justify-center px-2'
                  )}
                  title={collapsed ? t(item.label, item.labelEn) : undefined}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                    itemIsActive ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-500'
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-sm">{t(item.label, item.labelEn)}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {hasChildren && (
                        <ChevronRight
                          className={cn(
                            'w-4 h-4 text-gray-400 transition-transform',
                            isExpanded && 'rotate-90'
                          )}
                        />
                      )}
                    </>
                  )}
                </button>

                {/* Submenu */}
                {!collapsed && hasChildren && isExpanded && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-100 space-y-1">
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon
                      const childIsActive = isActive(child.href)
                      return (
                        <Link
                          key={child.id}
                          href={child.href}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                            childIsActive
                              ? 'bg-primary-50 text-primary-600 font-medium'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                          )}
                        >
                          <ChildIcon className="w-4 h-4" />
                          {t(child.label, child.labelEn)}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="p-3 border-t border-gray-100">
        <div className={cn(
          'flex items-center gap-3 p-2 rounded-xl bg-gray-50',
          collapsed && 'justify-center'
        )}>
          <Avatar className="w-9 h-9 border-2 border-white shadow-sm">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-primary-400 to-secondary-400 text-white text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Utilisateur'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

// ==================== HEADER COMPONENT ====================
export function Header({
  user,
  language = 'fr',
  onLogout,
  onLanguageChange,
}: NavigationProps) {
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en)

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left side - Mobile menu */}
        <div className="lg:hidden">
          <MobileMenuButton />
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t('Rechercher...', 'Search...')}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => onLanguageChange?.(language === 'fr' ? 'en' : 'fr')}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            title={t('Changer de langue', 'Change language')}
          >
            <Globe className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Subscription Badge */}
          {user?.subscription === 'premium' && (
            <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white border-0">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors">
                <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary-400 to-secondary-400 text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <ChevronRight className="w-4 h-4 text-gray-400 hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.name}</span>
                  <span className="text-xs font-normal text-gray-500">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                {t('Mon profil', 'My Profile')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                {t('Paramètres', 'Settings')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="w-4 h-4 mr-2" />
                {t('Abonnement', 'Subscription')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                {t('Déconnexion', 'Logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

// ==================== MOBILE NAVIGATION ====================
export function MobileNavigation({
  language = 'fr',
  activePath,
}: NavigationProps & { activePath?: string }) {
  const t = (fr: string, en: string) => (language === 'fr' ? fr : en)

  const mainNavItems = [
    { id: 'dashboard', icon: Home, href: '/dashboard', label: 'Accueil', labelEn: 'Home' },
    { id: 'immigration', icon: Plane, href: '/immigration', label: 'Immigration', labelEn: 'Immigration' },
    { id: 'emploi', icon: Briefcase, href: '/emploi', label: 'Emploi', labelEn: 'Jobs' },
    { id: 'sante', icon: Heart, href: '/sante', label: 'Santé', labelEn: 'Health' },
    { id: 'menu', icon: Menu, href: '#menu', label: 'Menu', labelEn: 'Menu' },
  ]

  const isActive = (href: string) => activePath === href || activePath?.startsWith(href + '/')

  return (
    <nav className="mobile-nav safe-bottom md:hidden">
      {mainNavItems.map((item) => {
        const Icon = item.icon
        const itemIsActive = isActive(item.href)
        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'mobile-nav-item flex-1 max-w-[80px]',
              itemIsActive && 'active'
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{t(item.label, item.labelEn)}</span>
          </Link>
        )
      })}
    </nav>
  )
}

// ==================== MOBILE MENU BUTTON ====================
function MobileMenuButton() {
  return (
    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
      <Menu className="w-5 h-5" />
    </button>
  )
}

// ==================== LAYOUT WRAPPER ====================
export function AppLayout({
  children,
  user,
  language = 'fr',
  onLogout,
  onLanguageChange,
}: NavigationProps & {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar
          user={user}
          language={language}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activePath={pathname}
        />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          'transition-all duration-300',
          !isMobile && (sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[280px]')
        )}
      >
        <Header
          user={user}
          language={language}
          onLogout={onLogout}
          onLanguageChange={onLanguageChange}
        />
        <main className="p-4 lg:p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        language={language}
        activePath={pathname}
      />
    </div>
  )
}

export default AppLayout
