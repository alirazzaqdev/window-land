import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IconArrowLeft, IconCheck } from '@tabler/icons-react'
import Button from '@/components/ui/Button'

const SERVICES: Record<string, { title: string; category: string; description: string; details: string[]; priceRange?: string }> = {
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
              <p className="text-caption text-brand-text-muted mt-1">Final price subject to site visit and approved drawings.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg">Request a Quote</Button>
            </Link>
            <a href="tel:+971504552652">
              <Button variant="ghost" size="lg">Call +971 50 455 2652</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
