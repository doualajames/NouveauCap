'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Home, User, FileText, Building2, Wallet, Heart, Users, 
  Plane, GraduationCap, Briefcase, Shield, Settings, LogOut,
  MessageSquare, BookOpen, CreditCard, Calculator, Building,
  Stethoscope, Brain, MapPin, Bell, Globe, ChevronLeft,
  Menu, Crown, Sparkles, HelpCircle
} from 'lucide-react'

interface NavItem {
  id: string
  label: string
  labelEn: string
  icon: React.ElementType
  gradient: string
  badge?: number
}

const mainNavigation: NavItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', labelEn: 'Dashboard', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
  { id: 'tasks', label: 'Mes tâches', labelEn: 'My Tasks', icon: FileText, gradient: 'from-violet-500 to-purple-500' },
  { id: 'immigration', label: 'Immigration', labelEn: 'Immigration', icon: Plane, gradient: 'from-purple-500 to-pink-500', badge: 2 },
  { id: 'emploi', label: 'Emploi', labelEn: 'Employment', icon: Briefcase, gradient: 'from-green-500 to-emerald-500' },
  { id: 'sante', label: 'Santé', labelEn: 'Health', icon: Heart, gradient: 'from-red-500 to-rose-500' },
  { id: 'finance', label: 'Finance', labelEn: 'Finance', icon: Wallet, gradient: 'from-amber-500 to-orange-500' },
  { id: 'logement', label: 'Logement', labelEn: 'Housing', icon: Building, gradient: 'from-teal-500 to-cyan-500' },
  { id: 'communaute', label: 'Communauté', labelEn: 'Community', icon: Users, gradient: 'from-indigo-500 to-violet-500' },
]

const toolsNavigation: NavItem[] = [
  { id: 'citizenship', label: 'Test citoyenneté', labelEn: 'Citizenship Test', icon: BookOpen, gradient: 'from-rose-500 to-red-500' },
  { id: 'clinics', label: 'Cliniques', labelEn: 'Clinics', icon: Stethoscope, gradient: 'from-emerald-500 to-green-500' },
  { id: 'jobs', label: 'Emplois demandés', labelEn: 'In-Demand Jobs', icon: Building2, gradient: 'from-sky-500 to-blue-500' },
  { id: 'calculator', label: 'Calculatrice', labelEn: 'Calculator', icon: Calculator, gradient: 'from-orange-500 to-amber-500' },
  { id: 'ai-assistant', label: 'Assistant IA', labelEn: 'AI Assistant', icon: Brain, gradient: 'from-fuchsia-500 to-pink-500' },
]

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  userProfile?: {
    name: string
    email: string
    status: string
    avatar?: string
  }
  onLogout?: () => void
  isPremium?: boolean
}

export function Sidebar({ 
  activeSection, 
  onSectionChange, 
  userProfile,
  onLogout,
  isPremium = false
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      "hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-20" : "w-72"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 
                        flex items-center justify-center shadow-lg shadow-red-500/30 shrink-0">
          <MapPin className="h-6 w-6 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              NouveauCap
            </span>
            <p className="text-xs text-gray-500 truncate">Votre guide au Canada</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hidden lg:flex shrink-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform duration-300",
            collapsed && "rotate-180"
          )} />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        {/* Main Navigation */}
        <div className="space-y-1">
          {!collapsed && (
            <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Principal
            </p>
          )}
          {mainNavigation.map((item) => (
            <NavItem 
              key={item.id} 
              item={item} 
              active={activeSection === item.id}
              collapsed={collapsed}
              onClick={() => onSectionChange(item.id)}
            />
          ))}
        </div>

        {/* Tools Section */}
        <div className="mt-6 space-y-1">
          {!collapsed && (
            <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Outils
            </p>
          )}
          {toolsNavigation.map((item) => (
            <NavItem 
              key={item.id} 
              item={item} 
              active={activeSection === item.id}
              collapsed={collapsed}
              onClick={() => onSectionChange(item.id)}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Premium Banner */}
      {!collapsed && !isPremium && (
        <div className="mx-3 mb-3 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 
                        border border-amber-200">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-5 w-5 text-amber-500" />
            <span className="font-semibold text-amber-900">Passez Premium</span>
          </div>
          <p className="text-xs text-amber-700 mb-3">
            Accédez à tous les outils et support prioritaire
          </p>
          <Button size="sm" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
            Découvrir
          </Button>
        </div>
      )}

      {/* User Profile */}
      <div className="p-3 border-t border-gray-100">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors",
          collapsed && "justify-center"
        )}>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shrink-0 flex items-center justify-center text-white font-semibold">
            {userProfile?.name?.charAt(0) || 'U'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userProfile?.name || 'Utilisateur'}</p>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 truncate">{userProfile?.status || 'Résident'}</span>
                {isPremium && <Crown className="h-3 w-3 text-amber-500" />}
              </div>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="shrink-0" onClick={onLogout}>
              <LogOut className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  )
}

interface NavItemProps {
  item: NavItem
  active: boolean
  collapsed: boolean
  onClick: () => void
}

function NavItem({ item, active, collapsed, onClick }: NavItemProps) {
  const Icon = item.icon

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
        "hover:bg-gray-50",
        active && [
          "bg-gradient-to-r from-gray-50 to-white",
          "shadow-sm border border-gray-100",
        ],
        collapsed && "justify-center px-2"
      )}
    >
      <div className={cn(
        "relative shrink-0 rounded-lg p-2 transition-all duration-200",
        active 
          ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg`
          : "bg-gray-100 text-gray-600"
      )}>
        <Icon className="h-5 w-5" />
        {item.badge && !active && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </div>
      
      {!collapsed && (
        <>
          <span className={cn(
            "flex-1 text-left font-medium transition-colors",
            active ? "text-gray-900" : "text-gray-600"
          )}>
            {item.label}
          </span>
          {item.badge && active && (
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
              {item.badge}
            </span>
          )}
        </>
      )}
    </button>
  )
}

// Mobile Navigation
interface MobileNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  const mobileItems = mainNavigation.slice(0, 4)
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl 
                    border-t border-gray-200 px-2 py-2 lg:hidden safe-bottom shadow-lg shadow-gray-200/50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {mobileItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
              activeSection === item.id 
                ? "text-red-600" 
                : "text-gray-500"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-lg transition-all",
              activeSection === item.id && `bg-gradient-to-br ${item.gradient} text-white shadow-md`
            )}>
              <item.icon className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
          </button>
        ))}
        {/* More Menu */}
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl text-gray-500">
          <div className="p-1.5 rounded-lg">
            <Menu className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-medium">Plus</span>
        </button>
      </div>
    </nav>
  )
}
