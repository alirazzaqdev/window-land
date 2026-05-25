import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IconArrowLeft, IconCheck, IconPhone } from '@tabler/icons-react'
import Button from '@/components/ui/Button'

interface ServiceData {
  title: string
  category: string
  description: string
  details: string[]
  priceRange?: string
}

const SERVICES: Record<string, ServiceData> = {
  'curtain-wall-systems': {
    title: 'Curtain Wall Systems',
    category: 'Glazing',
    description: 'Full-height structural glazing systems for commercial and residential facades. Thermal break aluminium profiles with European-grade glass.',
    details: [
      'Thermally broken aluminium profiles for energy efficiency',
      'Single, double, and triple glazing options',
      'Stick, unitised, and semi-unitised systems',
      'Custom RAL powder coat colours',
      'Full shop drawing and engineering support',
      'UAE building code compliant',
    ],
    priceRange: 'AED 280–550 / sqm (excluding VAT)',
  },
  'aluminium-pergolas-skylights': {
    title: 'Aluminium Pergolas & Skylights',
    category: 'Aluminium',
    description: 'Bespoke louvered and fixed pergola systems for outdoor living areas, commercial courtyards, and residential entrances.',
    details: [
      'Motorised and manual louvre systems',
      'Structural aluminium 100x200mm main frames',
      'Custom RAL powder coat — any colour',
      'Integrated drainage and LED lighting options',
      'Suitable for UAE climate and wind loads',
      'Full structural calculation on request',
    ],
    priceRange: 'AED 180–450 / sqm (excluding VAT)',
  },
  'sliding-doors': {
    title: 'Sliding Doors',
    category: 'Aluminium',
    description: 'Lift & slide, bifold, automatic, and standard sliding door systems with marine-grade hardware options.',
    details: [
      'Lift & slide systems for large openings up to 8m wide',
      'Bifold aluminium doors — up to 7 panels',
      'Automatic sliding doors for commercial entrances',
      'Thermally broken frames with double glazing option',
      'Stainless steel or powder coated hardware',
      'Available in any RAL colour',
    ],
    priceRange: 'AED 380–1,800 / running metre (excluding VAT)',
  },
  'glass-balustrade': {
    title: 'Glass Balustrade',
    category: 'Glazing',
    description: 'Frameless and semi-frameless glass balustrade for balconies, staircases, and pool areas.',
    details: [
      '10mm, 12mm, and 15mm toughened safety glass',
      'Frameless spigot system or aluminium channel base',
      'Stainless steel top rail or glass-to-glass fittings',
      'Compliant with UAE building code load requirements',
      'Suitable for pools, balconies, and staircases',
      'Option for custom etching or frosted glass',
    ],
    priceRange: 'AED 420–680 / running metre (excluding VAT)',
  },
  'acp-cladding': {
    title: 'ACP Cladding',
    category: 'Cladding',
    description: 'Aluminium composite panel cladding for modern facade finishes on commercial buildings and villas.',
    details: [
      'Alucobond, Reynobond, and equivalent ACP brands',
      'Full facade cladding with aluminium subframe',
      'Cut-to-size and shaped panels',
      'Wide range of colours and finishes',
      'FR (fire-retardant) core options available',
      'Shop drawings and installation by our team',
    ],
    priceRange: 'AED 120–220 / sqm (excluding VAT)',
  },
  'office-partitions': {
    title: 'Office Partitions',
    category: 'Glazing',
    description: 'Full-height glass office partitions with aluminium frames for open-plan workspaces.',
    details: [
      'Single and double glazed partition systems',
      'Demountable and fixed partition options',
      'Integrated venetian blinds between glass panels',
      'Frosted, manifestation, and manifestation vinyl options',
      'Acoustic performance versions available',
      'Includes aluminium door with hardware',
    ],
    priceRange: 'AED 180–350 / sqm (excluding VAT)',
  },
  'shower-partitions': {
    title: 'Shower Partitions',
    category: 'Glazing',
    description: 'Frameless and semi-frameless shower enclosures with premium hardware finishes.',
    details: [
      '8mm and 10mm clear toughened safety glass',
      'Frameless and minimal-frame options',
      'Matt black, brushed nickel, and chrome hardware',
      'Walk-in, corner, and wet-room configurations',
      'Anti-limescale coating available',
      'Bespoke sizes to fit any bathroom layout',
    ],
    priceRange: 'AED 1,800–4,500 / unit (excluding VAT)',
  },
  'metal-fabrication': {
    title: 'Metal Fabrication',
    category: 'Fabrication',
    description: 'Custom steel and aluminium fabrication for architectural metalwork and structural elements.',
    details: [
      'CNC bending, cutting, and welding',
      'Structural steel beams and columns',
      'Decorative screens and grilles',
      'Canopy and awning structures',
      'Powder coating in any RAL colour',
      'In-house workshop with Italian equipment',
    ],
  },
  'ventilation-windows': {
    title: 'Ventilation Windows',
    category: 'Aluminium',
    description: 'Swing, casement, and tilt-turn aluminium windows with superior weather sealing.',
    details: [
      'Tilt-turn, casement, and top-hung configurations',
      'Thermally broken profiles for insulation',
      'Multipoint locking system',
      'Single and double glazing options',
      'Available in any RAL colour',
      'Suitable for UAE climate conditions',
    ],
    priceRange: 'AED 320–520 / sqm (excluding VAT)',
  },
  'swing-windows': {
    title: 'Swing Windows',
    category: 'Aluminium',
    description: 'Top-hung and side-hung aluminium windows with powder coated finish.',
    details: [
      'Top-hung and side-hung configurations',
      'Standard and thermally broken profiles',
      'Friction stays and multipoint locks',
      'Powder coated in any RAL colour',
      'Single and double glazed options',
      'Custom sizing available',
    ],
  },
  'fixed-windows': {
    title: 'Fixed Windows',
    category: 'Glazing',
    description: 'Fixed light aluminium framed windows for maximum light and unobstructed views.',
    details: [
      'Custom sizes up to 4m x 3m',
      'Aluminium flush-glazed frames',
      'Single, double, and triple glazing',
      'Low-E and solar control glass options',
      'Powder coat in any RAL colour',
      'Structural silicone or pressure plate systems',
    ],
  },
  'frameless-glass-doors': {
    title: 'Frameless Glass Doors',
    category: 'Glazing',
    description: 'Fully frameless glass pivot and swing doors for a seamless architectural look.',
    details: [
      '10mm, 12mm, and 15mm toughened safety glass',
      'Pivot and swing door configurations',
      'Floor spring and overhead closer options',
      'SS304 stainless steel or matte black hardware',
      'Custom dimensions available',
      'Single and double door configurations',
    ],
  },
  'glass-pool-fence': {
    title: 'Glass Pool Fence',
    category: 'Glazing',
    description: 'Toughened glass pool fencing with stainless steel spigot system. Dubai municipality compliant.',
    details: [
      '10mm and 12mm toughened glass panels',
      'SS316 grade stainless steel spigots',
      'Self-latching pool gate with child-resistant lock',
      'Dubai municipality swimming pool fence standards compliant',
      'Frameless and semi-frameless options',
      'Site survey and compliance certificate included',
    ],
  },
  'aluminium-louvers': {
    title: 'Aluminium Louvers',
    category: 'Aluminium',
    description: 'Fixed and adjustable aluminium louvre screens for privacy, shading, and aesthetic purposes.',
    details: [
      'Fixed and motorised adjustable louvre blades',
      'Custom blade widths from 50mm to 200mm',
      'Any RAL powder coat colour',
      'Facade screening and privacy screening',
      'Balcony and terrace applications',
      'Structural aluminium subframe included',
    ],
  },
  'mirror-works': {
    title: 'Mirror Works',
    category: 'Glazing',
    description: 'Custom mirror supply and installation for interior and exterior applications.',
    details: [
      'Float, antique, and back-painted mirror glass',
      'Custom cut-to-size panels',
      'Safe edge polishing and bevelled edges',
      'Wall-mounted and frameless installations',
      'Gym, retail, and residential applications',
      'Adhesive and mechanical fixing options',
    ],
  },
  'balcony-railing': {
    title: 'Balcony Railing',
    category: 'Fabrication',
    description: 'Aluminium and stainless steel balcony railing systems.',
    details: [
      'Aluminium tubular and flat bar railings',
      'SS316 stainless steel systems for coastal areas',
      'Post and wire infill options',
      'Custom designs and laser-cut panels',
      'Powder coated or brushed stainless finish',
      'UAE structural load compliant',
    ],
  },
  'steel-fabrication': {
    title: 'Steel Fabrication',
    category: 'Fabrication',
    description: 'Structural and decorative steel works for commercial and residential projects.',
    details: [
      'Structural steel columns, beams, and connections',
      'Decorative steel screens and entrance canopies',
      'Staircase structures and mezzanine platforms',
      'Galvanising and powder coat finishes',
      'Full welding certification',
      'Delivery and on-site installation across UAE',
    ],
  },
  'tempered-glass-works': {
    title: 'Tempered Glass Works',
    category: 'Glazing',
    description: 'Toughened, laminated, and double-glazed glass supply and installation.',
    details: [
      'Float, tinted, reflective, and low-E glass',
      'Toughened safety glass to BS EN 12150',
      'Laminated glass for enhanced safety',
      'Custom sizes and shapes including curved glass',
      'Balustrade, facade, roof, and floor glass',
      'On-site installation and glazing',
    ],
    priceRange: 'AED 95–180 / sqm (excluding VAT)',
  },
  'double-glazing': {
    title: 'Double Glazing',
    category: 'Glazing',
    description: 'Argon-filled double glazed units for improved thermal and acoustic performance.',
    details: [
      '4-16-4 and 6-12-6 standard configurations',
      'Argon-filled cavity for thermal insulation',
      'Low-E coating for solar control',
      'Acoustic (35dB+) versions available',
      'Compatible with existing aluminium frames (retrofit)',
      'U-value certificate on request',
    ],
    priceRange: 'AED 180–320 / sqm (excluding VAT)',
  },
}

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const svc = SERVICES[params.slug]
  if (!svc) return {}
  return {
    title: svc.title,
    description: svc.description,
    openGraph: {
      title: `${svc.title} — Window Land Dubai`,
      description: svc.description,
    },
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const svc = SERVICES[params.slug]
  if (!svc) notFound()

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="bg-brand-black-alt border-b border-brand-gold-border py-16 px-4">
        <div className="container-custom">
          <Link href="/services" className="inline-flex items-center gap-2 text-caption text-brand-text-muted hover:text-brand-gold transition-colors mb-6">
            <IconArrowLeft size={14} /> All Services
          </Link>
          <span className="block text-label text-brand-gold uppercase tracking-[4px] mb-3">{svc.category}</span>
          <h1 className="font-display text-display-lg text-white font-light mb-4">{svc.title}</h1>
          <p className="text-body text-brand-text-muted max-w-xl">{svc.description}</p>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-custom max-w-3xl">
          <h2 className="text-label text-brand-gold uppercase tracking-[3px] mb-5">What&apos;s Included</h2>
          <ul className="space-y-3 mb-10">
            {svc.details.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <IconCheck size={14} className="text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="text-[14px] text-brand-text-secondary">{d}</span>
              </li>
            ))}
          </ul>

          {svc.priceRange && (
            <div className="border border-brand-gold-border bg-brand-gold-dim p-5 mb-10">
              <p className="text-caption text-brand-text-muted uppercase tracking-[2px] mb-1">Indicative Price Range</p>
              <p className="text-[16px] text-brand-gold">{svc.priceRange}</p>
              <p className="text-caption text-brand-text-muted mt-1">Final price subject to site visit and approved drawings. +5% VAT.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/contact">
              <Button variant="primary" size="lg">Request a Quote</Button>
            </Link>
            <a href="tel:+971504552652">
              <Button variant="ghost" size="lg" iconLeft={<IconPhone size={16} />}>
                +971 50 455 2652
              </Button>
            </a>
          </div>

          <div className="border-t border-brand-gold-border pt-8">
            <p className="text-caption text-brand-text-muted">
              Window Land Glass & Aluminum Installation & Maintenance Co. LLC — DED License 1441416, Dubai, UAE
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
