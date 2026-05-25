import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Window Land offers 19+ glass and aluminium installation services in Dubai UAE — curtain walls, sliding doors, pergolas, ACP cladding, glass balustrade, office partitions, and more.',
}

const SERVICES = [
  {
    slug: 'curtain-wall-systems',
    title: 'Curtain Wall Systems',
    category: 'Glazing',
    description: 'Full-height structural glazing with thermal break aluminium profiles. Suitable for commercial buildings, villas, and high-rise facades.',
    priceRange: 'AED 280–550 / sqm',
    featured: true,
  },
  {
    slug: 'aluminium-pergolas-skylights',
    title: 'Aluminium Pergolas & Skylights',
    category: 'Aluminium',
    description: 'Bespoke louvered and fixed pergola systems with motorised options. Powder coated in any RAL colour.',
    priceRange: 'AED 180–450 / sqm',
    featured: true,
  },
  { slug: 'sliding-doors', title: 'Sliding Doors', category: 'Aluminium', description: 'Lift & slide, bifold, automatic, and standard sliding door systems. Marine-grade options available.' },
  { slug: 'glass-balustrade', title: 'Glass Balustrade', category: 'Glazing', description: 'Frameless and semi-frameless glass balustrade for balconies, staircases, and pool areas.' },
  { slug: 'acp-cladding', title: 'ACP Cladding', category: 'Cladding', description: 'Aluminium composite panel cladding for modern facade finishes on commercial buildings and villas.' },
  { slug: 'office-partitions', title: 'Office Partitions', category: 'Glazing', description: 'Full-height glass office partitions with aluminium frames for open-plan workspaces.' },
  { slug: 'shower-partitions', title: 'Shower Partitions', category: 'Glazing', description: 'Frameless and semi-frameless shower enclosures with premium hardware finishes.' },
  { slug: 'metal-fabrication', title: 'Metal Fabrication', category: 'Fabrication', description: 'Custom steel and aluminium fabrication for architectural metalwork and structural elements.' },
  { slug: 'ventilation-windows', title: 'Ventilation Windows', category: 'Aluminium', description: 'Swing, casement, and tilt-turn aluminium windows with superior weather sealing.' },
  { slug: 'swing-windows', title: 'Swing Windows', category: 'Aluminium', description: 'Top-hung and side-hung aluminium windows with powder coated finish.' },
  { slug: 'fixed-windows', title: 'Fixed Windows', category: 'Glazing', description: 'Fixed light aluminium framed windows for maximum light and unobstructed views.' },
  { slug: 'frameless-glass-doors', title: 'Frameless Glass Doors', category: 'Glazing', description: 'Fully frameless glass pivot and swing doors for a seamless architectural look.' },
  { slug: 'glass-pool-fence', title: 'Glass Pool Fence', category: 'Glazing', description: 'Toughened glass pool fencing with stainless steel spigot system. Dubai municipality compliant.' },
  { slug: 'aluminium-louvers', title: 'Aluminium Louvers', category: 'Aluminium', description: 'Fixed and adjustable aluminium louvre screens for privacy, shading, and aesthetic purposes.' },
  { slug: 'mirror-works', title: 'Mirror Works', category: 'Glazing', description: 'Custom mirror supply and installation for interior and exterior applications.' },
  { slug: 'balcony-railing', title: 'Balcony Railing', category: 'Fabrication', description: 'Aluminium and stainless steel balcony railing systems.' },
  { slug: 'steel-fabrication', title: 'Steel Fabrication', category: 'Fabrication', description: 'Structural and decorative steel works for commercial and residential projects.' },
  { slug: 'tempered-glass-works', title: 'Tempered Glass Works', category: 'Glazing', description: 'Toughened, laminated, and double-glazed glass supply and installation.' },
  { slug: 'double-glazing', title: 'Double Glazing', category: 'Glazing', description: 'Argon-filled double glazed units for improved thermal and acoustic performance.' },
]

const categoryColors: Record<string, string> = {
  Glazing: 'text-brand-gold border-brand-gold',
  Aluminium: 'text-blue-400 border-blue-400/50',
  Cladding: 'text-purple-400 border-purple-400/50',
  Fabrication: 'text-orange-400 border-orange-400/50',
}

export default function ServicesPage() {
  const featured = SERVICES.filter((s) => s.featured)
  const regular = SERVICES.filter((s) => !s.featured)

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      {/* Hero */}
      <div className="bg-brand-black-alt border-b border-brand-gold-border py-16 px-4">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-gold" />
            <span className="text-label text-brand-gold uppercase tracking-[4px]">What We Do</span>
          </div>
          <h1 className="font-display text-display-lg text-white font-light mb-4">
            Our 19 Services
          </h1>
          <p className="text-body text-brand-text-muted max-w-xl">
            Covering the full spectrum of architectural glass and aluminium works for residential,
            commercial, and hospitality projects across the UAE.
          </p>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-custom">
          {/* Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featured.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group p-8 bg-brand-black-card border-l-2 border-brand-gold border-r border-t border-b border-brand-gold-border hover:bg-[#111] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-caption text-brand-gold uppercase tracking-[2px]">Featured</span>
                  <span className={`text-[10px] border px-2 py-0.5 uppercase tracking-[1px] ${categoryColors[s.category] ?? ''}`}>
                    {s.category}
                  </span>
                </div>
                <h2 className="font-display text-[28px] text-white font-light mb-3 group-hover:text-brand-gold transition-colors">
                  {s.title}
                </h2>
                <p className="text-body-sm text-brand-text-muted mb-4 leading-relaxed">{s.description}</p>
                {s.priceRange && (
                  <p className="text-caption text-brand-gold mb-4">Indicative: {s.priceRange}</p>
                )}
                <div className="flex items-center gap-2 text-brand-gold text-[12px] uppercase tracking-[1.5px]">
                  <span>Learn More</span>
                  <IconArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Regular */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regular.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group p-6 bg-brand-black-card border border-brand-gold-border hover:border-brand-gold hover:bg-[#111] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-sans font-medium text-[14px] text-white group-hover:text-brand-gold transition-colors">
                    {s.title}
                  </h3>
                  <span className={`text-[9px] border px-1.5 py-0.5 uppercase tracking-[1px] flex-shrink-0 ml-2 ${categoryColors[s.category] ?? ''}`}>
                    {s.category}
                  </span>
                </div>
                <p className="text-caption text-brand-text-muted leading-relaxed">{s.description}</p>
                <div className="flex items-center gap-1 mt-3 text-brand-gold text-[11px] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Details</span>
                  <IconArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
