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
  { id: 'dashboard', label: 'Tableau de bord', labelEn: 'Dashboard', icon: Home, gradient: ' ' },
  { id: 'tasks', label: 'Mes tâches', labelEn: 'My Tasks', icon: FileText, gradient: ' ' },
  { id: 'immigration', label: 'Immigration', labelEn: 'Immigration', icon: Plane, gradient: ' ', badge: 2 },
  { id: 'emploi', label: 'Emploi', labelEn: 'Employment', icon: Briefcase, gradient: ' ' },
  { id: 'sante', label: 'Santé', labelEn: 'Health', icon: Heart, gradient: ' ' },
  { id: 'finance', label: 'Finance', labelEn: 'Finance', icon: Wallet, gradient: ' ' },
  { id: 'logement', label: 'Logement', labelEn: 'Housing', icon: Building, gradient: ' ' },
  { id: 'communaute', label: 'Communauté', labelEn: 'Community', icon: Users, gradient: ' ' },
]

const toolsNavigation: NavItem[] = [
  { id: 'citizenship', label: 'Test citoyenneté', labelEn: 'Citizenship Test', icon: BookOpen, gradient: ' ' },
  { id: 'clinics', label: 'Cliniques', labelEn: 'Clinics', icon: Stethoscope, gradient: ' ' },
  { id: 'jobs', label: 'Emplois demandés', labelEn: 'In-Demand Jobs', icon: Building2, gradient: ' ' },
  { id: 'calculator', label: 'Calculatrice', labelEn: 'Calculator', icon: Calculator, gradient: ' ' },
  { id: 'ai-assistant', label: 'Assistant IA', labelEn: 'AI Assistant', icon: Brain, gradient: ' ' },
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
      "hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300",
      collapsed ? "w-20" : "w-72"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-none shadow-red-500/30 shrink-0">
          <MapPin className="h-6 w-6" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="text-xl font-bold bg-primary text-primary-foreground bg-clip-text text-transparent">
              NouveauCap
            </span>
            <p className="text-xs text-muted-foreground truncate">Votre guide au Canada</p>
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
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
        <div className="mx-3 mb-3 p-4 rounded-xl bg-muted border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold text-muted-foreground">Passez Premium</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Accédez à tous les outils et support prioritaire
          </p>
          <Button size="sm" className="w-full bg-primary text-primary-foreground">
            Découvrir
          </Button>
        </div>
      )}

      {/* User Profile */}
      <div className="p-3 border-t border-border">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-xl bg-muted cursor-pointer transition-colors",
          collapsed && "justify-center"
        )}>
          <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground shrink-0 flex items-center justify-center font-semibold">
            {userProfile?.name?.charAt(0) || 'U'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{userProfile?.name || 'Utilisateur'}</p>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground truncate">{userProfile?.status || 'Résident'}</span>
                {isPremium && <Crown className="h-3 w-3 text-muted-foreground" />}
              </div>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="shrink-0" onClick={onLogout}>
              <LogOut className="h-4 w-4 text-muted-foreground" />
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
        "bg-muted",
        active && [
          "bg-muted ",
          "shadow-sm border border-border",
        ],
        collapsed && "justify-center px-2"
      )}
    >
      <div className={cn(
        "relative shrink-0 rounded-lg p-2 transition-all duration-200",
        active 
          ? `bg-muted ${item.gradient}  shadow-none`
          : "bg-muted text-muted-foreground"
      )}>
        <Icon className="h-5 w-5" />
        {item.badge && !active && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive/10 text-[10px] font-bold flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </div>
      
      {!collapsed && (
        <>
          <span className={cn(
            "flex-1 text-left font-medium transition-colors",
            active ? "text-foreground" : "text-muted-foreground"
          )}>
            {item.label}
          </span>
          {item.badge && active && (
            <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border px-2 py-2 lg:hidden safe-bottom shadow-none shadow-gray-200/50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {mobileItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
              activeSection === item.id 
                ? "text-destructive" 
                : "text-muted-foreground"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-lg transition-all",
              activeSection === item.id && `bg-muted ${item.gradient}  shadow-none`
            )}>
              <item.icon className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
          </button>
        ))}
        {/* More Menu */}
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground">
          <div className="p-1.5 rounded-lg">
            <Menu className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-medium">Plus</span>
        </button>
      </div>
    </nav>
  )
}
