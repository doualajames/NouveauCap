'use client'

import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  trend?: number
  trendLabel?: string
  color: string
  className?: string
}

export function StatsCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendLabel = 'ce mois',
  color,
  className 
}: StatsCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl",
      "border border-white/20 shadow-xl shadow-gray-200/50",
      "p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
      className
    )}>
      {/* Gradient Background Decoration */}
      <div className={cn(
        "absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 blur-2xl",
        `bg-gradient-to-br ${color}`
      )} />
      
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{value}</p>
          {trend !== undefined && (
            <p className={cn(
              "mt-2 flex items-center text-sm",
              trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'
            )}>
              {trend > 0 ? (
                <TrendingUp className="mr-1 h-4 w-4" />
              ) : trend < 0 ? (
                <TrendingDown className="mr-1 h-4 w-4" />
              ) : null}
              {Math.abs(trend)}% {trendLabel}
            </p>
          )}
        </div>
        <div className={cn(
          "rounded-xl p-3 text-white shadow-lg",
          `bg-gradient-to-br ${color}`
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

// Feature Card for navigation
interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  color: string
  onClick?: () => void
  badge?: string | number
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color,
  onClick,
  badge
}: FeatureCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white p-6",
        "border border-gray-100 cursor-pointer",
        "transition-all duration-300",
        "hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50",
        "hover:-translate-y-1"
      )}
    >
      {/* Animated Background Gradient */}
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5",
        `bg-gradient-to-br ${color}`
      )} />
      
      {/* Icon Container */}
      <div className={cn(
        "mb-4 inline-flex rounded-xl p-3 text-white shadow-lg",
        "transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
        `bg-gradient-to-br ${color}`
      )}>
        <Icon className="h-6 w-6" />
      </div>
      
      {badge && (
        <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
          {badge}
        </span>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}

// Progress Ring for dashboard
interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
  value?: string
}

export function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8,
  color = '#dc2626',
  label,
  value
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {value && <span className="text-2xl font-bold text-gray-900">{value}</span>}
        {label && <span className="text-xs text-gray-500">{label}</span>}
      </div>
    </div>
  )
}

// Task Card for the task list
interface TaskCardProps {
  title: string
  description?: string
  priority?: 'HIGH' | 'MEDIUM' | 'LOW'
  dueDate?: string
  completed?: boolean
  onToggle?: () => void
}

export function TaskCard({ 
  title, 
  description, 
  priority = 'MEDIUM',
  dueDate,
  completed = false,
  onToggle
}: TaskCardProps) {
  return (
    <div className={cn(
      "group relative flex items-center gap-4 rounded-xl bg-white p-4",
      "border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200",
      "transition-all duration-200",
      completed && "opacity-60"
    )}>
      {/* Checkbox */}
      <button 
        onClick={onToggle}
        className={cn(
          "relative flex h-6 w-6 items-center justify-center rounded-full",
          "border-2 transition-all shrink-0",
          completed 
            ? "border-green-500 bg-green-500" 
            : "border-gray-300 hover:border-red-500 hover:bg-red-50"
        )}
      >
        {completed && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          "font-medium text-gray-900 truncate",
          completed && "line-through text-gray-400"
        )}>
          {title}
        </p>
        {description && (
          <p className="text-sm text-gray-500 truncate">{description}</p>
        )}
      </div>
      
      {/* Badge priority */}
      <span className={cn(
        "px-2.5 py-1 rounded-full text-xs font-medium shrink-0",
        priority === 'HIGH' && "bg-red-100 text-red-700",
        priority === 'MEDIUM' && "bg-amber-100 text-amber-700",
        priority === 'LOW' && "bg-gray-100 text-gray-700"
      )}>
        {priority === 'HIGH' ? 'Urgent' : priority === 'MEDIUM' ? 'Normal' : 'Faible'}
      </span>
    </div>
  )
}
