'use client'

import Link from 'next/link'
import {
  IconArrowRight,
  IconDoor,
  IconFence,
  IconLayoutBoard,
  IconDroplet,
  IconTool,
  IconLayoutColumns,
  IconWindow,
  IconDiamond,
} from '@tabler/icons-react'
import SectionHeader from '@/components/ui/SectionHeader'

const FEATURED = [
  {
    title: 'Curtain Wall Systems',
    slug: 'curtain-wall-systems',
    description:
      'Full-height structural glazing systems for commercial and residential facades. Thermal break aluminium profiles with European-grade glass for maximum performance and aesthetic impact.',
    tag: 'Featured Service',
  },
  {
    title: 'Aluminium Pergolas & Skylights',
    slug: 'aluminium-pergolas-skylights',
    description:
      'Bespoke louvered pergolas and skylight systems for outdoor living and commercial spaces. Powder-coated aluminium in any RAL colour with motorised louvre options.',
    tag: 'Featured Service',
  },
]

const REGULAR = [
  { title: 'Sliding Doors', slug: 'sliding-doors', icon: IconDoor, desc: 'Lift & slide, bifold, and automatic sliding systems for seamless indoor-outdoor connection.' },
  { title: 'Glass Balustrade', slug: 'glass-balustrade', icon: IconFence, desc: 'Frameless and semi-frameless glass balustrade for balconies, staircases, and pool areas.' },
  { title: 'ACP Cladding', slug: 'acp-cladding', icon: IconLayoutBoard, desc: 'Aluminium composite panel cladding for modern facade finishes on commercial buildings.' },
  { title: 'Office Partitions', slug: 'office-partitions', icon: IconLayoutColumns, desc: 'Full-height glass office partitions with aluminium frames for open-plan workspaces.' },
  { title: 'Shower Partitions', slug: 'shower-partitions', icon: IconDroplet, desc: 'Frameless and semi-frameless shower enclosures with premium hardware finishes.' },
  { title: 'Metal Fabrication', slug: 'metal-fabrication', icon: IconTool, desc: 'Custom steel and aluminium fabrication for architectural metalwork and structural elements.' },
  { title: 'Ventilation Windows', slug: 'ventilation-windows', icon: IconWindow, desc: 'Swing, casement, and tilt-turn aluminium windows with superior weather sealing.' },
  { title: 'Tempered Glass Works', slug: 'tempered-glass-works', icon: IconDiamond, desc: 'Toughened, laminated, and double-glazed glass supply and installation.' },
]

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-brand-black">
      <div className="container-custom">
        <SectionHeader
          eyebrow="What We Do"
          title="Our Core Services"
          subtitle="19 specialist services covering every aspect of glass and aluminium installation for residential and commercial projects across the UAE."
        />

        {/* Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {FEATURED.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col justify-between p-8 bg-brand-black-card border-l-2 border-brand-gold border-r border-t border-b border-brand-gold-border hover:bg-[#111] transition-all duration-300 min-h-[200px]"
            >
              <div>
                <span className="text-[9px] tracking-[3px] text-brand-gold uppercase mb-4 inline-block">
                  {s.tag}
                </span>
                <h3 className="font-display text-[28px] text-white font-light mb-3 group-hover:text-brand-gold transition-colors duration-200">
                  {s.title}
                </h3>
                <p className="text-[14px] text-[#9a9080] leading-relaxed font-light">{s.description}</p>
              </div>
              <div className="flex items-center gap-2 mt-6 text-brand-gold text-[12px] uppercase tracking-[2px]">
                <span>Learn More</span>
                <IconArrowRight size={14} stroke={2} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>

        {/* Regular grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {REGULAR.map(({ title, slug, icon: Icon, desc }) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="group p-6 bg-brand-black-card border border-brand-gold-border hover:border-brand-gold hover:bg-[#111] transition-all duration-300"
            >
              <Icon size={22} stroke={1.5} className="text-brand-gold mb-4" />
              <h3 className="font-sans font-medium text-[14px] text-white mb-2 group-hover:text-brand-gold transition-colors duration-200">
                {title}
              </h3>
              <p className="text-caption text-brand-text-muted leading-relaxed">{desc}</p>
              <div className="flex items-center gap-1 mt-4 text-brand-gold text-[11px] uppercase tracking-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>Details</span>
                <IconArrowRight size={12} stroke={2} />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services">
            <button className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[2px] text-brand-gold border border-brand-gold px-8 py-3 hover:bg-brand-gold hover:text-brand-black transition-all duration-200">
              View All 19 Services
              <IconArrowRight size={13} stroke={2} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
