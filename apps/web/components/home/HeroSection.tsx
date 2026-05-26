'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { IconShieldCheck, IconUsers, IconTools, IconBuildingSkyscraper } from '@tabler/icons-react'

const HERO_WORDS = ['One', 'Stop', 'Solution', 'for', 'Glass', '&', 'Aluminium', 'Works']
const GOLD_WORDS = ['Glass', '&', 'Aluminium']

const trustItems = [
  { icon: IconShieldCheck, label: 'UAE Licensed' },
  { icon: IconUsers, label: '12+ Team' },
  { icon: IconTools, label: '19+ Services' },
  { icon: IconBuildingSkyscraper, label: '5+ Projects' },
]

export default function HeroSection() {
  const wordsRef = useRef<HTMLSpanElement[]>([])
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let gsap: typeof import('gsap').default | null = null

    const init = async () => {
      const mod = await import('gsap')
      gsap = mod.default
      const words = wordsRef.current.filter(Boolean)
      gsap.from(words, { opacity: 0, y: 40, duration: 0.8, stagger: 0.08, ease: 'power3.out' })
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          x: 60,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
        })
      }
    }

    init()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center bg-brand-black overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
          {/* Left — Content */}
          <div>
            <p className="text-label text-brand-gold uppercase tracking-[5px] mb-6 font-sans">
              Dubai, UAE · Est. December 2024
            </p>

            <h1 className="font-display font-light leading-[1.0] mb-8 text-[clamp(36px,5vw,64px)]">
              {HERO_WORDS.map((word, i) => (
                <span key={i}>
                  <span
                    ref={(el) => { if (el) wordsRef.current[i] = el }}
                    className={GOLD_WORDS.includes(word) ? 'text-brand-gold italic' : 'text-white'}
                  >
                    {word}
                  </span>
                  {i < HERO_WORDS.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>

            <p className="text-body text-brand-text-muted max-w-lg leading-relaxed mb-8">
              Window Land is a Dubai-based premium glass and aluminium installation company
              delivering curtain wall systems, sliding doors, pergolas, ACP cladding, and complete
              glazing solutions for residential and commercial projects across the UAE.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/services">
                <Button variant="primary" size="lg">
                  Explore Services
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="ghost" size="lg">
                  View Projects
                </Button>
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-6 border-t border-brand-gold-border pt-6">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-caption text-brand-text-muted">
                  <Icon size={14} className="text-brand-gold" />
                  <span className="uppercase tracking-[1.5px]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image */}
          <div ref={imageRef} className="relative h-[500px] lg:h-[700px]">
            <div className="absolute inset-0 rounded-sm overflow-hidden">
              <Image
                src="/images/hero/dubai-hero.jpg"
                alt="Dubai skyline sunset — Window Land Glass & Aluminium Dubai UAE"
                fill
                className="object-cover object-center hero-image"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/70 to-black/35" />
            </div>

            {/* Floating stats */}
            <div className="absolute bottom-6 left-6 right-6 bg-brand-black/90 border border-brand-gold-border p-5 rounded-sm">
              <div className="grid grid-cols-3 gap-4 divide-x divide-brand-gold-border">
                {[
                  { num: '5+', label: 'Projects' },
                  { num: '19+', label: 'Services' },
                  { num: '12+', label: 'Team' },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center px-2">
                    <p className="font-display text-[28px] text-brand-gold font-light">{num}</p>
                    <p className="text-caption text-brand-text-muted uppercase tracking-[1.5px]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gold frame accent */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-brand-gold pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-brand-gold pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
