'use client'

import { useEffect, useRef } from 'react'
import { clsx } from 'clsx'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
  titleClassName,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-up')
          el.style.opacity = '1'
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ opacity: 0 }}
      className={clsx(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      <div
        className={clsx(
          'flex items-center gap-3 mb-4',
          align === 'center' && 'justify-center'
        )}
      >
        <div className="h-px w-8 bg-brand-gold" />
        <span className="text-label text-brand-gold uppercase tracking-[4px] font-sans font-medium">
          {eyebrow}
        </span>
      </div>

      <h2
        className={clsx(
          'font-display text-display-md text-brand-text-primary font-light leading-tight',
          titleClassName
        )}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {subtitle && (
        <p className="mt-4 text-body text-brand-text-muted max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
