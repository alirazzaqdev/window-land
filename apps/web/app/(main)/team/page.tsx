import type { Metadata } from 'next'
import CEOSection from '@/components/team/CEOSection'
import TeamCard from '@/components/team/TeamCard'

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet Muhammad Waqas Muhammad Akram, Founder & CEO of Window Land, and our team of 12 professional glass and aluminium installation experts based in Dubai, UAE.',
}

const TEAM = [
  { initials: 'PM', role: 'Project Manager', department: 'Management' },
  { initials: 'OS', role: 'Operations Supervisor', department: 'Operations' },
  { initials: 'AA', role: 'Admin & Accounts', department: 'Support' },
  { initials: 'PC', role: 'Procurement Manager', department: 'Support' },
  { initials: 'SE', role: 'Site Engineer', department: 'Technical' },
  { initials: 'SE', role: 'Site Engineer', department: 'Technical' },
  { initials: 'TI', role: 'Technical Installer', department: 'Technical' },
  { initials: 'TI', role: 'Technical Installer', department: 'Technical' },
  { initials: 'QA', role: 'QA / QC Inspector', department: 'Technical' },
  { initials: 'SK', role: 'Store Keeper', department: 'Support' },
  { initials: 'TI', role: 'Technical Installer', department: 'Technical' },
  { initials: 'DR', role: 'Driver / Logistics', department: 'Operations' },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      {/* Hero */}
      <div className="bg-brand-black-alt border-b border-brand-gold-border py-16 text-center">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-gold" />
            <span className="text-label text-brand-gold uppercase tracking-[4px]">Leadership</span>
            <div className="h-px w-8 bg-brand-gold" />
          </div>
          <h1 className="font-display text-display-lg text-white font-light">Meet Our Team</h1>
        </div>
      </div>

      {/* CEO Section */}
      <CEOSection />

      {/* Team grid */}
      <section className="section-padding bg-brand-black-alt border-t border-brand-gold-border">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-brand-gold" />
            <span className="text-label text-brand-gold uppercase tracking-[4px]">Our People</span>
          </div>
          <h2 className="font-display text-display-md text-white font-light mb-3">The Team</h2>
          <p className="text-body text-brand-text-muted mb-10 max-w-xl">
            12 dedicated professionals across project management, technical installation, quality
            assurance, and support functions.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {TEAM.map((member, i) => (
              <TeamCard key={i} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
