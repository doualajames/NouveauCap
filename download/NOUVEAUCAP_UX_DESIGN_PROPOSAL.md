# 🎨 Proposition de Refonte UX/UI - NouveauCap

## 1. Identité Visuelle

### Palette de Couleurs
```css
/* Design System - NouveauCap */
:root {
  /* Primary - Rouge érable (identité canadienne) */
  --primary-50: #fef2f2;
  --primary-100: #fee2e2;
  --primary-500: #ef4444;
  --primary-600: #dc2626;
  --primary-700: #b91c1c;
  
  /* Secondary - Bleu glacier (confiance, professionnalisme) */
  --secondary-50: #eff6ff;
  --secondary-100: #dbeafe;
  --secondary-500: #3b82f6;
  --secondary-600: #2563eb;
  --secondary-700: #1d4ed8;
  
  /* Accent - Or maple (premium, succès) */
  --accent-400: #fbbf24;
  --accent-500: #f59e0b;
  --accent-600: #d97706;
  
  /* Neutrals */
  --neutral-50: #fafafa;
  --neutral-100: #f4f4f5;
  --neutral-200: #e4e4e7;
  --neutral-300: #d4d4d8;
  --neutral-400: #a1a1aa;
  --neutral-500: #71717a;
  --neutral-600: #52525b;
  --neutral-700: #3f3f46;
  --neutral-800: #27272a;
  --neutral-900: #18181b;
  
  /* Semantic */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

### Typographie
```css
/* Font Family */
--font-display: 'Inter', -apple-system, sans-serif;  /* Titres */
--font-body: 'Inter', -apple-system, sans-serif;      /* Corps */
--font-mono: 'JetBrains Mono', monospace;              /* Code */

/* Font Sizes - Scale 1.25 */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

---

## 2. Structure de Navigation

### Architecture de l'Information
```
┌─────────────────────────────────────────────────────────────┐
│  🍁 NouveauCap                    [Search]  🔔  👤 Profile  │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────┐ │                                              │
│ │ 🏠 Home  │ │                                              │
│ │ 📋 Tasks │ │           Main Content Area                  │
│ │ ✈️ Immig.│ │                                              │
│ │ 💼 Emploi│ │                                              │
│ │ 🏥 Santé │ │                                              │
│ │ 💰Finance│ │                                              │
│ │ 👥 Commun│ │                                              │
│ ├──────────┤ │                                              │
│ │ ⚙️ Admin │ │                                              │
│ └──────────┘ │                                              │
└─────────────────────────────────────────────────────────────┘
```

### Sidebar Component
```tsx
// components/layout/sidebar.tsx
const navigation = [
  { 
    id: 'dashboard', 
    label: 'Tableau de bord', 
    icon: Home,
    gradient: 'from-blue-500 to-cyan-500' 
  },
  { 
    id: 'immigration', 
    label: 'Immigration', 
    icon: Plane,
    gradient: 'from-purple-500 to-pink-500',
    badge: '2' // Alertes actives
  },
  { 
    id: 'emploi', 
    label: 'Emploi', 
    icon: Briefcase,
    gradient: 'from-green-500 to-emerald-500' 
  },
  { 
    id: 'sante', 
    label: 'Santé', 
    icon: Heart,
    gradient: 'from-red-500 to-rose-500' 
  },
  { 
    id: 'finance', 
    label: 'Finance', 
    icon: Wallet,
    gradient: 'from-amber-500 to-orange-500' 
  },
  { 
    id: 'communaute', 
    label: 'Communauté', 
    icon: Users,
    gradient: 'from-indigo-500 to-violet-500' 
  },
]
```

---

## 3. Composants Clés

### 3.1 Dashboard Cards - Design Glassmorphism
```tsx
// components/dashboard/stats-card.tsx
const StatsCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl 
                  border border-white/20 shadow-xl shadow-gray-200/50
                  p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
    {/* Gradient Background Decoration */}
    <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${color} opacity-20 blur-2xl`} />
    
    <div className="relative flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{value}</p>
        {trend && (
          <p className={`mt-2 flex items-center text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="mr-1 h-4 w-4" />
            {Math.abs(trend)}% ce mois
          </p>
        )}
      </div>
      <div className={`rounded-xl bg-gradient-to-br ${color} p-3 text-white shadow-lg`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </div>
)
```

### 3.2 Task List - Design Moderne
```tsx
// components/tasks/task-item.tsx
const TaskItem = ({ task, onComplete }) => (
  <div className="group relative flex items-center gap-4 rounded-xl bg-white p-4 
                  border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200
                  transition-all duration-200">
    {/* Checkbox animé */}
    <button 
      onClick={() => onComplete(task.id)}
      className="relative flex h-6 w-6 items-center justify-center rounded-full 
                 border-2 border-gray-300 transition-all
                 hover:border-primary-500 hover:bg-primary-50
                 group-[.completed]:border-green-500 group-[.completed]:bg-green-500"
    >
      <Check className="h-3 w-3 text-white opacity-0 transition-opacity 
                        group-[.completed]:opacity-100" />
    </button>
    
    {/* Contenu */}
    <div className="flex-1 min-w-0">
      <p className="font-medium text-gray-900 truncate">{task.title}</p>
      <p className="text-sm text-gray-500">{task.description}</p>
    </div>
    
    {/* Badge priorité */}
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium
      ${task.priority === 'HIGH' ? 'bg-red-100 text-red-700' : ''}
      ${task.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : ''}
      ${task.priority === 'LOW' ? 'bg-gray-100 text-gray-700' : ''}`}>
      {task.priority}
    </span>
    
    {/* Date limite */}
    {task.dueDate && (
      <span className="flex items-center gap-1 text-sm text-gray-400">
        <Clock className="h-4 w-4" />
        {formatDate(task.dueDate)}
      </span>
    )}
  </div>
)
```

### 3.3 Boutons - Design System
```tsx
// components/ui/button-variants.tsx
const buttonVariants = {
  // Primary - Gradient
  primary: `
    bg-gradient-to-r from-primary-600 to-primary-700
    hover:from-primary-700 hover:to-primary-800
    text-white shadow-lg shadow-primary-500/30
    active:scale-[0.98]
  `,
  
  // Secondary - Outline
  secondary: `
    border-2 border-gray-200 bg-white
    hover:border-gray-300 hover:bg-gray-50
    text-gray-700
  `,
  
  // Ghost - Minimal
  ghost: `
    hover:bg-gray-100
    text-gray-600 hover:text-gray-900
  `,
  
  // Premium - Gold
  premium: `
    bg-gradient-to-r from-amber-500 to-orange-500
    hover:from-amber-600 hover:to-orange-600
    text-white shadow-lg shadow-amber-500/30
  `,
}

// Sizes
const sizes = {
  sm: 'h-8 px-3 text-sm rounded-lg',
  md: 'h-10 px-4 text-base rounded-xl',
  lg: 'h-12 px-6 text-lg rounded-xl',
  xl: 'h-14 px-8 text-xl rounded-2xl',
}
```

### 3.4 Cards avec Illustrations
```tsx
// components/cards/feature-card.tsx
const FeatureCard = ({ icon: Icon, title, description, color, onClick }) => (
  <div 
    onClick={onClick}
    className="group relative overflow-hidden rounded-2xl bg-white p-6 
               border border-gray-100 cursor-pointer
               transition-all duration-300 
               hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50
               hover:-translate-y-1"
  >
    {/* Animated Background Gradient */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 
                     transition-opacity duration-300 group-hover:opacity-5`} />
    
    {/* Icon Container */}
    <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${color} p-3 
                     text-white shadow-lg transition-transform duration-300 
                     group-hover:scale-110 group-hover:rotate-3`}>
      <Icon className="h-6 w-6" />
    </div>
    
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-500 leading-relaxed">{description}</p>
    
    {/* Arrow */}
    <div className="mt-4 flex items-center text-sm font-medium text-gray-400 
                    transition-all duration-300 group-hover:text-primary-600">
      Explorer
      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </div>
  </div>
)
```

---

## 4. Page d'Accueil - Hero Section

```tsx
// components/home/hero-section.tsx
const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-[url('/maple-pattern.svg')] opacity-[0.03]" />
    
    {/* Gradient Orbs */}
    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
    
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 
                          text-sm font-medium text-red-700">
            <Sparkles className="h-4 w-4" />
            Nouveau au Canada? On vous accompagne!
          </div>
          
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Votre nouveau départ
            <span className="block bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              au Canada commence ici
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl">
            NouveauCap vous guide à travers toutes les étapes de votre installation: 
            immigration, emploi, santé, finance et plus encore.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="xl" className="gap-2">
              Commencer gratuitement
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="xl" className="gap-2">
              <Play className="h-5 w-5" />
              Voir la démo
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-white 
                                        bg-gradient-to-br from-gray-400 to-gray-500" />
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">+5,000 utilisateurs</p>
              <p className="text-sm text-gray-500">nous font confiance</p>
            </div>
          </div>
        </div>
        
        {/* Illustration */}
        <div className="relative hidden lg:block">
          <div className="relative rounded-3xl bg-gradient-to-br from-red-500 to-red-600 
                          p-1 shadow-2xl shadow-red-500/30">
            <div className="rounded-[22px] bg-white p-8">
              {/* Dashboard Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-32 rounded-lg bg-gray-200" />
                  <div className="h-8 w-8 rounded-full bg-red-100" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Immigration', 'Emploi', 'Santé', 'Finance'].map((item, i) => (
                    <div key={i} className="rounded-xl bg-gray-50 p-4">
                      <div className="h-4 w-16 rounded bg-gray-200 mb-2" />
                      <div className="h-6 w-12 rounded bg-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Cards */}
          <div className="absolute -left-8 top-1/4 rounded-xl bg-white p-4 shadow-xl 
                          animate-bounce-slow">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Tâche complétée!</p>
                <p className="text-xs text-gray-500">Demande NAS envoyée</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -right-4 bottom-1/4 rounded-xl bg-white p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">CRS: 468</p>
                <p className="text-xs text-green-600">+15 points ce mois</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
```

---

## 5. Dashboard Layout

```tsx
// app/(dashboard)/layout.tsx
const DashboardLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-50">
    {/* Sidebar */}
    <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 
                        flex items-center justify-center shadow-lg shadow-red-500/30">
          <MapleLeaf className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">NouveauCap</span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink key={item.id} {...item} />
        ))}
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 
                        cursor-pointer transition-colors">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Jean Dupont</p>
            <p className="text-xs text-gray-500">Premium</p>
          </div>
          <Settings className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </aside>
    
    {/* Main Content */}
    <main className="flex-1 overflow-y-auto">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Search */}
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="search"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 
                         focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                         transition-all"
            />
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Globe className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Page Content */}
      <div className="p-6">
        {children}
      </div>
    </main>
  </div>
)
```

---

## 6. Mobile Responsive

### Mobile Navigation
```tsx
// components/layout/mobile-nav.tsx
const MobileNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 
                  px-2 py-2 lg:hidden safe-area-inset-bottom">
    <div className="flex items-center justify-around">
      {navigation.slice(0, 5).map((item) => (
        <button
          key={item.id}
          className="flex flex-col items-center gap-1 p-2 rounded-xl 
                     transition-colors hover:bg-gray-100"
        >
          <item.icon className="h-5 w-5" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
      {/* More Menu */}
      <button className="flex flex-col items-center gap-1 p-2 rounded-xl">
        <Menu className="h-5 w-5" />
        <span className="text-[10px]">Plus</span>
      </button>
    </div>
  </nav>
)
```

---

## 7. Animations & Micro-interactions

```css
/* Tailwind Config Extensions */
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
}
```

---

## 8. Dark Mode Support

```tsx
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#18181b',
          100: '#1f1f23',
          200: '#27272a',
          300: '#3f3f46',
          400: '#52525b',
          500: '#71717a',
        },
      },
    },
  },
}

// Usage
<div className="bg-white dark:bg-dark-100 
                text-gray-900 dark:text-gray-100
                border-gray-200 dark:border-dark-300">
```

---

## 9. Prochaines Étapes

1. **Refactoring** - Séparer les 6000+ lignes en composants
2. **Design Tokens** - Créer le fichier de variables CSS
3. **Storybook** - Documenter les composants
4. **Tests E2E** - Valider les parcours utilisateur
5. **Performance** - Lazy loading, code splitting

---

## 10. Impact Attendu

| Métrique | Avant | Après |
|----------|-------|-------|
| Taux de conversion | ~2% | ~5-7% |
| Temps sur page | ~2min | ~5min |
| NPS Score | - | +50 |
| Mobile bounce rate | ~60% | ~30% |
