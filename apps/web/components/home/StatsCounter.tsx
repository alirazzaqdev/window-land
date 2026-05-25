'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { num: 19, suffix: '+', label: 'Services Offered' },
  { num: 5, suffix: '+', label: 'Projects Completed' },
  { num: 12, suffix: '+', label: 'Team Members' },
  { num: 100, suffix: '%', label: 'Client Satisfaction' },
]

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        STATS.forEach((stat, i) => {
          const el = counterRefs.current[i]
          if (!el) return
          let start = 0
          const step = stat.num / 60
          const timer = setInterval(() => {
            start = Math.min(start + step, stat.num)
            el.textContent = Math.round(start).toString()
            if (start >= stat.num) clearInterval(timer)
          }, 1000 / 60)
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-brand-black relative overflow-hidden"
    >
      {/* Gold geometric pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-brand-gold-border">
          {STATS.map(({ num, suffix, label }, i) => (
            <div key={label} className="text-center pt-8 lg:pt-0 lg:px-8 first:pt-0">
              <div className="font-display text-[clamp(48px,6vw,72px)] font-light leading-none text-brand-gold mb-3">
                <span ref={(el) => { if (el) counterRefs.current[i] = el }}>0</span>
                {suffix}
              </div>
              <p className="text-label text-brand-text-muted uppercase tracking-[3px]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
