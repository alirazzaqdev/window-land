'use client'

import { clsx } from 'clsx'

const FILTERS = ['All', 'Residential', 'Commercial', 'Ongoing', 'Completed'] as const
type Filter = (typeof FILTERS)[number]

interface ProjectFilterProps {
  active: Filter
  onChange: (f: Filter) => void
}

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={clsx(
            'px-5 py-2 text-[11px] uppercase tracking-[2px] border transition-all duration-200',
            active === f
              ? 'bg-brand-gold text-brand-black border-brand-gold'
              : 'bg-transparent text-brand-text-muted border-brand-gold-border hover:border-brand-gold hover:text-white'
          )}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
