'use client'

import Link from 'next/link'
import Image from 'next/image'
import { clsx } from 'clsx'
import SectionHeader from '@/components/ui/SectionHeader'

const PROJECTS = [
  {
    slug: 'dubai-hills-modern-luxury-villa',
    title: 'Private Villa — Modern Luxury',
    location: 'Dubai Hills, Dubai',
    scope: ['Curtain Wall', 'Lift & Slide', 'Glass Balustrade'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
    large: true,
  },
  {
    slug: 'palm-jumeirah-contemporary-villa',
    title: 'Private Villa — Contemporary',
    location: 'Palm Jumeirah, Dubai',
    scope: ['Sliding Systems', 'Glass Balustrade'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  },
  {
    slug: 'sun-island-aluminium-pergola-sharjah',
    title: 'Sun Island Villa A-42',
    location: 'Ajmal Makan City, Sharjah',
    scope: ['Aluminium Pergola'],
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80',
  },
  {
    slug: 'al-furjan-premium-villa-dubai',
    title: 'Private Villa — Premium',
    location: 'Al Furjan, Dubai',
    scope: ['Windows', 'Glass Pool Fence'],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
  },
  {
    slug: 'jumeirah-golf-estate-private-villa',
    title: 'Private Villa',
    location: 'Jumeirah Golf Estate, Dubai',
    scope: ['Aluminium Works', 'Glass Works'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
]

function ProjectCard({
  project,
  className,
}: {
  project: (typeof PROJECTS)[0]
  className?: string
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={clsx(
        'group relative overflow-hidden block bg-brand-black-card',
        className
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute inset-0 border border-brand-gold-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-caption text-brand-gold uppercase tracking-[2px] mb-2 block">
          {project.location}
        </span>
        <h3 className="font-display text-[22px] text-white font-light mb-2 leading-tight">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.scope.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-brand-text-muted uppercase tracking-[1px] border border-brand-gold-border px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </Link>
  )
}

export default function ProjectsShowcase() {
  const [large, ...rest] = PROJECTS

  return (
    <section className="section-padding bg-brand-black-alt">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Our Work"
          title='Featured <span class="text-brand-gold italic">Projects</span>'
          subtitle="Premium glass and aluminium installations across Dubai's most prestigious addresses."
        />

        {/* Magazine grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <ProjectCard project={large} className="lg:col-span-1 lg:row-span-2 h-[400px] lg:h-full min-h-[500px]" />
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} className="h-[280px]" />
          ))}
        </div>

        <div className="text-center">
          <Link href="/projects">
            <button className="text-[12px] uppercase tracking-[2px] text-brand-gold border border-brand-gold px-8 py-3 hover:bg-brand-gold hover:text-brand-black transition-all duration-200">
              View All Projects →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
