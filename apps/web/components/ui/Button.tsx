'use client'

import { forwardRef, ReactNode, ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type Variant = 'primary' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  href?: string
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-gold text-brand-black border border-brand-gold hover:brightness-110 hover:scale-[1.02]',
  ghost:
    'bg-transparent text-brand-gold border border-brand-gold hover:bg-brand-gold hover:text-brand-black',
  dark:
    'bg-brand-black text-brand-gold border border-brand-black hover:bg-brand-black-card hover:border-brand-gold',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-[12px]',
  md: 'px-6 py-3 text-[13px]',
  lg: 'px-8 py-4 text-[14px]',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-[1.5px] uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          iconLeft
        )}
        {children}
        {!loading && iconRight}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
