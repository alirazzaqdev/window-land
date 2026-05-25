import type { Metadata } from 'next'
import Link from 'next/link'
import GoldDivider from '@/components/ui/GoldDivider'
import { IconCheck } from '@tabler/icons-react'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Window Land is a Dubai-based glass and aluminium installation company established in December 2024. DED Licensed. 12+ team members. 19+ services.',
}

const VALUES = [
  'State-of-the-art architectural solutions',
  'Italian and European fabrication equipment',
  'HSE certified operations on every project',
  'Quality management system (ISO-aligned)',
  'End-to-end service from design to handover',
  'Environmentally sustainable practices',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      {/* Hero */}
      <div className="bg-brand-black-alt border-b border-brand-gold-border py-20 px-4 text-center">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-gold" />
            <span className="text-label text-brand-gold uppercase tracking-[4px]">Our Story</span>
            <div className="h-px w-8 bg-brand-gold" />
          </div>
          <h1 className="font-display text-display-lg text-white font-light mb-6">
            About Window Land
          </h1>
          <p className="text-body text-brand-text-muted max-w-2xl mx-auto leading-relaxed">
            A premium glass and aluminium installation company based in Dubai, UAE — delivering
            architectural excellence across the Emirates since December 2024.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="font-display text-display-md text-white font-light mb-6">
                Who We Are
              </h2>
              <p className="text-body text-brand-text-muted leading-relaxed mb-4">
                Window Land Glass & Aluminum Installation & Maintenance Co. LLC is a specialist
                contractor focused on the full spectrum of architectural glass and aluminium works.
                Founded by Muhammad Waqas Muhammad Akram in December 2024 and licensed by the
                Department of Economic Development, Dubai (License No. 1441416).
              </p>
              <p className="text-body text-brand-text-muted leading-relaxed mb-4">
                We work directly with developers, main contractors, interior design firms, and
                private clients to deliver curtain wall systems, sliding door assemblies, pergolas,
                glass balustrade, ACP cladding, office partitions, and more — all to the highest
                quality and safety standards applicable in the UAE.
              </p>
              <p className="text-body text-brand-text-muted leading-relaxed mb-8">
                Our 12-strong team of technical professionals uses Italian and European fabrication
                equipment to produce precision-engineered aluminium components at our Dubai
                workshop, with installation carried out by our own certified installers.
              </p>
              <Link href="/contact">
                <Button variant="primary" size="md">Get a Free Consultation</Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '19+', label: 'Services' },
                { num: '5+', label: 'Projects Completed' },
                { num: '12+', label: 'Team Members' },
                { num: '1441416', label: 'DED License No.' },
              ].map(({ num, label }) => (
                <div key={label} className="border border-brand-gold-border p-6 bg-brand-black-card">
                  <p className="font-display text-[36px] text-brand-gold font-light mb-2">{num}</p>
                  <p className="text-caption text-brand-text-muted uppercase tracking-[2px]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <GoldDivider />

          <div className="mt-16">
            <h2 className="font-display text-display-md text-white font-light mb-10 text-center">
              Our Commitments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div key={v} className="flex items-center gap-4 border border-brand-gold-border p-5 bg-brand-black-card">
                  <IconCheck size={16} className="text-brand-gold flex-shrink-0" />
                  <span className="text-[14px] text-brand-text-secondary">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
