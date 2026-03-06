'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  trend?: number
  trendLabel?: string
  gradient: string
  className?: string
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  trendLabel,
  gradient,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl',
        'border border-white/20 shadow-xl shadow-gray-200/50',
        'p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl',
        className
      )}
    >
      {/* Gradient Background Decoration */}
      <div
        className={cn(
          'absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl',
          gradient
        )}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{value}</p>
          {trend !== undefined && (
            <p
              className={cn(
                'mt-2 flex items-center text-sm',
                trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'
              )}
            >
              {trend > 0 ? (
                <TrendingUp className="mr-1 h-4 w-4" />
              ) : trend < 0 ? (
                <TrendingDown className="mr-1 h-4 w-4" />
              ) : null}
              {Math.abs(trend)}% {trendLabel || 'ce mois'}
            </p>
          )}
        </div>
        <div
          className={cn(
            'rounded-xl bg-gradient-to-br p-3 text-white shadow-lg',
            gradient
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

// Feature Card with hover effects
interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  onClick?: () => void
  badge?: string
  className?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  onClick,
  badge,
  className,
}: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white p-6',
        'border border-gray-100 cursor-pointer',
        'transition-all duration-300',
        'hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50',
        'hover:-translate-y-1',
        className
      )}
    >
      {/* Animated Background Gradient */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-5',
          gradient
        )}
      />

      {/* Badge */}
      {badge && (
        <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
          {badge}
        </span>
      )}

      {/* Icon Container */}
      <div
        className={cn(
          'mb-4 inline-flex rounded-xl bg-gradient-to-br p-3',
          'text-white shadow-lg transition-transform duration-300',
          'group-hover:scale-110 group-hover:rotate-3',
          gradient
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">{description}</p>

      {/* Arrow */}
      <div className="mt-4 flex items-center text-sm font-medium text-gray-400 transition-all duration-300 group-hover:text-red-600">
        Explorer
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  )
}

// Progress Ring Component
interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  label?: string
  color?: string
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  label,
  color = '#ef4444',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          className="text-gray-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="transition-all duration-500 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-gray-900">{progress}%</span>
        {label && <span className="text-xs text-gray-500">{label}</span>}
      </div>
    </div>
  )
}

// Task Item Component
interface TaskItemProps {
  title: string
  description?: string
  priority?: 'HIGH' | 'MEDIUM' | 'LOW'
  dueDate?: string
  completed?: boolean
  onToggle?: () => void
}

export function TaskItem({
  title,
  description,
  priority,
  dueDate,
  completed,
  onToggle,
}: TaskItemProps) {
  const priorityColors = {
    HIGH: 'bg-red-100 text-red-700',
    MEDIUM: 'bg-amber-100 text-amber-700',
    LOW: 'bg-gray-100 text-gray-700',
  }

  return (
    <div
      className={cn(
        'group relative flex items-center gap-4 rounded-xl bg-white p-4',
        'border border-gray-100 shadow-sm',
        'hover:shadow-md hover:border-gray-200',
        'transition-all duration-200',
        completed && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={cn(
          'relative flex h-6 w-6 items-center justify-center rounded-full',
          'border-2 transition-all',
          completed
            ? 'border-green-500 bg-green-500'
            : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
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
        <p
          className={cn(
            'font-medium text-gray-900 truncate',
            completed && 'line-through text-gray-500'
          )}
        >
          {title}
        </p>
        {description && <p className="text-sm text-gray-500 truncate">{description}</p>}
      </div>

      {/* Priority Badge */}
      {priority && (
        <span
          className={cn('px-2.5 py-1 rounded-full text-xs font-medium', priorityColors[priority])}
        >
          {priority === 'HIGH' ? 'Haute' : priority === 'MEDIUM' ? 'Moyenne' : 'Basse'}
        </span>
      )}

      {/* Due Date */}
      {dueDate && (
        <span className="flex items-center gap-1 text-sm text-gray-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {dueDate}
        </span>
      )}
    </div>
  )
}

// Gradient Button
interface GradientButtonProps {
  children: React.ReactNode
  gradient?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function GradientButton({
  children,
  gradient = 'from-red-500 to-red-600',
  size = 'md',
  className,
  onClick,
  disabled,
}: GradientButtonProps) {
  const sizes = {
    sm: 'h-8 px-3 text-sm rounded-lg',
    md: 'h-10 px-4 text-base rounded-xl',
    lg: 'h-12 px-6 text-lg rounded-xl',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'font-medium text-white',
        'bg-gradient-to-r hover:opacity-90',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'shadow-lg shadow-red-500/30',
        'transition-all duration-200',
        'active:scale-[0.98]',
        gradient,
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  )
}
