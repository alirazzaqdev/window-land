'use client'

import SectionHeader from '@/components/ui/SectionHeader'

const VALUES = [
  {
    num: '01',
    title: 'Quality Management System',
    desc: 'ISO-aligned quality controls ensure every installation meets UAE building code requirements and international glazing standards.',
  },
  {
    num: '02',
    title: 'HSE Certified Operations',
    desc: 'Health, Safety & Environment protocols are embedded in every project — from site survey to final handover.',
  },
  {
    num: '03',
    title: 'Italian & European Equipment',
    desc: 'We use premium Italian and European fabrication machinery and aluminium profiles for superior finish and longevity.',
  },
  {
    num: '04',
    title: 'End-to-End Service',
    desc: 'From design consultation and material procurement to installation and post-completion maintenance — all under one roof.',
  },
]

const STATS_GRID = [
  { label: 'DED Licensed', value: 'License No. 1441416' },
  { label: 'Team', value: '12+ Professionals' },
  { label: 'Services', value: '19+ Specialisations' },
  { label: 'Rating', value: '5 Stars' },
]

export default function WhyUs() {
  return (
    <section className="section-padding bg-brand-black">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionHeader
              eyebrow="Why Choose Us"
              title='Built on <span class="text-brand-gold italic">Trust</span> & Precision'
              subtitle="Window Land brings together technical expertise, premium materials, and professional project management to deliver glass and aluminium solutions that stand the test of time."
            />

            <div className="grid grid-cols-2 gap-4 mt-8">
              {STATS_GRID.map(({ label, value }) => (
                <div
                  key={label}
                  className="p-4 border border-brand-gold-border bg-brand-black-card"
                >
                  <p className="text-caption text-[#6a6050] uppercase tracking-[2px] mb-1">
                    {label}
                  </p>
                  <p className="text-[14px] font-medium text-[#c9a84c]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — value items */}
          <div className="space-y-8">
            {VALUES.map(({ num, title, desc }) => (
              <div key={num} className="flex gap-5 group">
                <span className="font-display text-[36px] text-brand-gold-border font-light leading-none flex-shrink-0 group-hover:text-brand-gold transition-colors duration-300">
                  {num}
                </span>
                <div className="border-t border-brand-gold-border pt-3 flex-1">
                  <h3 className="font-sans font-medium text-[14px] text-[#e0d8c8] mb-2">{title}</h3>
                  <p className="text-body-sm text-[#8a8272] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
