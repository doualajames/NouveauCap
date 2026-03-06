'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

// =====================================================
// MODULE CARD - Carte principale pour les modules
// =====================================================

const moduleCardVariants = cva(
  'relative overflow-hidden bg-white rounded-2xl border p-6 transition-all duration-300 group',
  {
    variants: {
      variant: {
        default: 'border-gray-100',
        elevated: 'border-0 shadow-lg',
        gradient: 'border-0 bg-gradient-to-br from-white to-gray-50',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-xl hover:-translate-y-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: true,
    },
  }
)

interface ModuleCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof moduleCardVariants> {
  icon?: React.ElementType
  title: string
  description?: string
  badge?: string
  color?: 'primary' | 'secondary' | 'accent' | 'warning' | 'danger' | 'success'
  footer?: React.ReactNode
  headerAction?: React.ReactNode
}

export function ModuleCard({
  className,
  variant,
  interactive,
  icon: Icon,
  title,
  description,
  badge,
  color = 'primary',
  footer,
  headerAction,
  children,
  ...props
}: ModuleCardProps) {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    accent: 'from-green-500 to-green-600',
    warning: 'from-amber-500 to-amber-600',
    danger: 'from-red-500 to-red-600',
    success: 'from-emerald-500 to-emerald-600',
  }

  const iconBgClasses = {
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-secondary-600',
    accent: 'bg-green-100 text-green-600',
    warning: 'bg-amber-100 text-amber-600',
    danger: 'bg-red-100 text-red-600',
    success: 'bg-emerald-100 text-emerald-600',
  }

  return (
    <div className={cn(moduleCardVariants({ variant, interactive }), className)} {...props}>
      {/* Top accent line */}
      <div className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', colorClasses[color])} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', iconBgClasses[color])}>
              <Icon className="w-6 h-6" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className={cn(
              'px-2.5 py-1 text-xs font-semibold rounded-full',
              color === 'primary' && 'bg-primary-100 text-primary-700',
              color === 'secondary' && 'bg-secondary-100 text-secondary-700',
              color === 'accent' && 'bg-green-100 text-green-700',
              color === 'warning' && 'bg-amber-100 text-amber-700',
              color === 'danger' && 'bg-red-100 text-red-700',
              color === 'success' && 'bg-emerald-100 text-emerald-700',
            )}>
              {badge}
            </span>
          )}
          {headerAction}
        </div>
      </div>

      {/* Content */}
      {children && <div className="mb-4">{children}</div>}

      {/* Footer */}
      {footer && (
        <div className="pt-4 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  )
}

// =====================================================
// STAT CARD - Carte de statistiques
// =====================================================

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon?: React.ElementType
  color?: 'primary' | 'secondary' | 'accent' | 'warning' | 'danger' | 'success'
}

export function StatCard({
  className,
  label,
  value,
  change,
  icon: Icon,
  color = 'primary',
  ...props
}: StatCardProps) {
  const iconBgClasses = {
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-secondary-600',
    accent: 'bg-green-100 text-green-600',
    warning: 'bg-amber-100 text-amber-600',
    danger: 'bg-red-100 text-red-600',
    success: 'bg-emerald-100 text-emerald-600',
  }

  return (
    <div className={cn('stat-card', className)} {...props}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={cn(
              'flex items-center gap-1 mt-2 text-sm font-medium',
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            )}>
              {change.type === 'increase' ? '↑' : '↓'} {Math.abs(change.value)}%
              <span className="text-gray-400 font-normal">vs. mois dernier</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', iconBgClasses[color])}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}

// =====================================================
// ACTION BUTTON - Bouton d'action principal
// =====================================================

const actionButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        ghost: 'btn-ghost',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 rounded-xl shadow-md hover:shadow-lg',
        success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 rounded-xl shadow-md hover:shadow-lg',
      },
      size: {
        sm: 'text-sm px-4 py-2 rounded-lg',
        md: 'text-base px-6 py-3 rounded-xl',
        lg: 'text-lg px-8 py-4 rounded-xl',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof actionButtonVariants> {
  loading?: boolean
  icon?: React.ElementType
  iconPosition?: 'left' | 'right'
}

export function ActionButton({
  className,
  variant,
  size,
  fullWidth,
  loading,
  icon: Icon,
  iconPosition = 'left',
  children,
  disabled,
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={cn(actionButtonVariants({ variant, size, fullWidth }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4" />
      )}
    </button>
  )
}

// =====================================================
// FORM INPUT - Champ de formulaire amélioré
// =====================================================

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: string
  hint?: string
  leftIcon?: React.ElementType
  rightIcon?: React.ElementType
  rightElement?: React.ReactNode
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, success, hint, leftIcon: LeftIcon, rightIcon: RightIcon, rightElement, ...props }, ref) => {
    const id = React.useId()

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <LeftIcon className="w-5 h-5" />
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={cn(
              'form-input',
              LeftIcon && 'pl-10',
              (RightIcon || rightElement) && 'pr-10',
              error && 'border-red-500 focus:ring-red-500',
              success && 'border-green-500 focus:ring-green-500',
              className
            )}
            {...props}
          />
          {RightIcon && !rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <RightIcon className="w-5 h-5" />
            </div>
          )}
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-500 flex items-center gap-1">
            <span>✓</span> {success}
          </p>
        )}
        {hint && !error && !success && (
          <p className="text-sm text-gray-400">{hint}</p>
        )}
      </div>
    )
  }
)
FormInput.displayName = 'FormInput'

// =====================================================
// FORM SELECT - Select amélioré
// =====================================================

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string; disabled?: boolean }[]
  placeholder?: string
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    const id = React.useId()

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={cn(
            'form-input appearance-none bg-[url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")] bg-[length:1.5em_1.5em] bg-[right_0.75rem_center] bg-no-repeat pr-10',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    )
  }
)
FormSelect.displayName = 'FormSelect'

// =====================================================
// STATUS BADGE - Badge de statut d'immigration
// =====================================================

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'PERMANENT_RESIDENT' | 'FOREIGN_STUDENT' | 'OPEN_WORK_PERMIT' | 'CLOSED_WORK_PERMIT'
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function StatusBadge({ status, showIcon = true, size = 'md', className, ...props }: StatusBadgeProps) {
  const statusConfig = {
    PERMANENT_RESIDENT: {
      label: 'Résident permanent',
      labelEn: 'Permanent Resident',
      class: 'status-badge--pr',
      icon: '🏠',
    },
    FOREIGN_STUDENT: {
      label: 'Étudiant étranger',
      labelEn: 'Foreign Student',
      class: 'status-badge--student',
      icon: '🎓',
    },
    OPEN_WORK_PERMIT: {
      label: 'Permis ouvert',
      labelEn: 'Open Work Permit',
      class: 'status-badge--owp',
      icon: '💼',
    },
    CLOSED_WORK_PERMIT: {
      label: 'Permis fermé',
      labelEn: 'Closed Work Permit',
      class: 'status-badge--cwp',
      icon: '🔒',
    },
  }

  const config = statusConfig[status]
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5',
  }

  return (
    <span className={cn('status-badge', config.class, sizeClasses[size], className)} {...props}>
      {showIcon && <span>{config.icon}</span>}
      {config.label}
    </span>
  )
}

// =====================================================
// PROGRESS STEPS - Indicateur de progression
// =====================================================

interface ProgressStepsProps {
  steps: { id: string; label: string }[]
  currentStep: number
  className?: string
}

export function ProgressSteps({ steps, currentStep, className }: ProgressStepsProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isPending = index > currentStep

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'progress-step',
                  isCompleted && 'completed',
                  isCurrent && 'active',
                  isPending && 'pending'
                )}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-medium',
                  isCompleted && 'text-green-600',
                  isCurrent && 'text-primary-600',
                  isPending && 'text-gray-400'
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2',
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// =====================================================
// EMPTY STATE - État vide
// =====================================================

interface EmptyStateProps {
  icon?: React.ElementType
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('text-center py-12', className)}>
      {Icon && (
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

// =====================================================
// LOADING SKELETON - Squelette de chargement
// =====================================================

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
}

export function Skeleton({ className, variant = 'rectangular', width, height, style, ...props }: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-2xl h-32',
  }

  return (
    <div
      className={cn('skeleton', variantClasses[variant], className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  )
}

// =====================================================
// FEATURE CARD - Carte de fonctionnalité
// =====================================================

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType
  title: string
  description: string
  color?: 'primary' | 'secondary' | 'accent'
}

export function FeatureCard({ icon: Icon, title, description, color = 'primary', className, ...props }: FeatureCardProps) {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-secondary-600',
    accent: 'bg-green-100 text-green-600',
  }

  return (
    <div className={cn('p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300', className)} {...props}>
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', colorClasses[color])}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}
