import Image from 'next/image'
import GoldDivider from '@/components/ui/GoldDivider'
import { IconPhone, IconMail, IconBrandLinkedin } from '@tabler/icons-react'

const CEO = {
  name: 'Muhammad Waqas Muhammad Akram',
  title: 'Founder & Chief Executive Officer',
  company: 'Window Land Glass & Aluminum Installation & Maintenance Co. LLC',
  phone: '+971 50 908 4979',
  email: 'info@windowland.ae',
  bio: [
    'Muhammad Waqas Muhammad Akram is the Founder and CEO of Window Land Glass & Aluminum Installation & Maintenance Co. LLC, established in Dubai in December 2024. With deep expertise in aluminium fabrication, glass installation, and architectural metalwork, Mr. Waqas leads a team of 12 technical professionals delivering premium glazing and aluminium solutions across the UAE.',
    'Under his leadership, Window Land has successfully executed residential projects in Dubai\'s most prestigious locations — Dubai Hills, Palm Jumeirah, Al Furjan, and Jumeirah Golf Estate — as well as commercial projects in Sharjah. The company holds a valid trade license from the Department of Economic Development, Dubai (License No. 1441416).',
    'Mr. Waqas is committed to delivering contemporary, state-of-the-art architectural solutions in close partnership with architects, contractors, and developers — applying best industry practices while promoting quality, safety, and environmental sustainability across all operations.',
  ],
  expertise: [
    'Aluminium Curtain Wall Systems',
    'Glass & Glazing Works',
    'Architectural Metal Fabrication',
    'Project Management',
    'Quality Management Systems',
    'HSE Compliance (UAE Standards)',
    'B2B Contractor Relations',
    'Team Leadership',
  ],
  achievements: [
    { number: '5+', label: 'Projects Delivered' },
    { number: '19+', label: 'Services Offered' },
    { number: '12+', label: 'Team Members Led' },
    { number: 'UAE', label: 'DED Licensed' },
  ],
}

export default function CEOSection() {
  return (
    <section className="section-padding bg-brand-black">
      <div className="container-custom">
        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-start mb-16">
          {/* Left — CEO Photo */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 bg-brand-black-card border border-brand-gold-border overflow-hidden">
              <Image
                src="/images/ceo/waqas-main.jpg"
                alt="Muhammad Waqas Muhammad Akram — Founder & CEO, Window Land Dubai"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 15%' }}
                priority
                sizes="(max-width: 768px) 100vw, 530px"
              />

              {/* Frame accents */}
              <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-brand-gold pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-brand-gold pointer-events-none z-10" />

              {/* Badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-brand-black/90 border-t border-brand-gold-border p-4">
                <p className="text-caption text-brand-gold uppercase tracking-[2px] mb-0.5">Founder & CEO</p>
                <p className="text-[12px] text-brand-text-muted">Window Land, Dubai UAE</p>
              </div>
            </div>
          </div>

          {/* Right — Info */}
          <div>
            <p className="text-label text-brand-gold uppercase tracking-[4px] mb-3">Leadership</p>
            <h2 className="font-display text-[clamp(28px,3vw,44px)] text-white font-light leading-tight mb-2">
              {CEO.name}
            </h2>
            <p className="text-[12px] text-brand-gold uppercase tracking-[3px] mb-6">{CEO.title}</p>

            <GoldDivider className="my-6" />

            {CEO.bio.map((para, i) => (
              <p key={i} className="text-body text-brand-text-muted leading-relaxed mb-4">
                {para}
              </p>
            ))}

            {/* Contact */}
            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href={`tel:${CEO.phone}`}
                className="flex items-center gap-2 text-[13px] text-brand-text-muted hover:text-brand-gold transition-colors"
              >
                <IconPhone size={14} className="text-brand-gold" />
                {CEO.phone}
              </a>
              <a
                href={`mailto:${CEO.email}`}
                className="flex items-center gap-2 text-[13px] text-brand-text-muted hover:text-brand-gold transition-colors"
              >
                <IconMail size={14} className="text-brand-gold" />
                {CEO.email}
              </a>
            </div>
          </div>
        </div>

        {/* Expertise tags */}
        <div className="mb-16">
          <h3 className="text-label text-brand-gold uppercase tracking-[3px] mb-6">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-3">
            {CEO.expertise.map((e) => (
              <span
                key={e}
                className="px-4 py-2 border border-brand-gold-border text-[12px] text-white uppercase tracking-[1px] hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-200 cursor-default"
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Achievement stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-brand-gold-border divide-x divide-y md:divide-y-0 divide-brand-gold-border mb-16">
          {CEO.achievements.map(({ number, label }) => (
            <div key={label} className="text-center p-8">
              <p className="font-display text-[48px] text-brand-gold font-light leading-none mb-2">
                {number}
              </p>
              <p className="text-label text-brand-text-muted uppercase tracking-[2px]">{label}</p>
            </div>
          ))}
        </div>

        {/* CEO Quote */}
        <div className="bg-brand-gold p-10 md:p-16 text-center mb-16">
          <p className="font-display text-[72px] text-brand-black/20 leading-none mb-4">&ldquo;</p>
          <blockquote className="font-display text-[clamp(20px,2.5vw,28px)] text-brand-black font-light leading-relaxed max-w-3xl mx-auto italic">
            Our mission is to deliver contemporary, state-of-the-art architectural solutions —
            applying best industry practices through innovative methods while promoting environmental
            sustainability across every project we undertake.
          </blockquote>
          <p className="mt-6 text-[12px] text-brand-black/60 uppercase tracking-[3px]">
            — Muhammad Waqas Muhammad Akram, Founder &amp; CEO
          </p>
        </div>

        {/* Company credentials */}
        <div className="border border-brand-gold-border p-8">
          <h3 className="text-label text-brand-gold uppercase tracking-[3px] mb-6">Company Credentials</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: 'Trade License No.', value: '1441416' },
              { label: 'Established', value: '15 December 2024' },
              { label: 'Legal Type', value: 'LLC' },
              { label: 'Licensed By', value: 'DED, Dubai' },
              { label: 'Primary Activity', value: 'Glass & Aluminum Installation' },
              { label: 'Location', value: 'Dubai, UAE' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-caption text-brand-text-muted uppercase tracking-[1.5px] mb-1">{label}</p>
                <p className="text-[14px] text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
