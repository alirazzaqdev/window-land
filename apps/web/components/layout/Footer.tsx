import Link from 'next/link'
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react'
import GoldDivider from '@/components/ui/GoldDivider'

const quickLinks = [
  { href: '/services', label: 'Our Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About Us' },
  { href: '/team', label: 'Our Team' },
  { href: '/contact', label: 'Contact' },
]

const services = [
  'Curtain Wall Systems',
  'Aluminium Pergolas',
  'Sliding Doors',
  'Glass Balustrade',
  'ACP Cladding',
  'Office Partitions',
]

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-brand-gold-border">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <p className="font-display text-[22px] text-white font-medium tracking-[2px] mb-1">
                WINDOW LAND
              </p>
              <p className="text-[9px] text-brand-text-muted uppercase tracking-[3px]">
                Glass &amp; Aluminium · Dubai UAE
              </p>
            </div>
            <p className="text-body-sm text-brand-text-muted leading-relaxed mb-6">
              Premium glass and aluminium installation company based in Dubai, UAE. Delivering
              architectural excellence across the Emirates since 2024.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+971504552652"
                className="flex items-center gap-2 text-body-sm text-brand-text-muted hover:text-brand-gold transition-colors duration-200"
              >
                <IconPhone size={13} className="text-brand-gold flex-shrink-0" />
                +971 50 455 2652
              </a>
              <a
                href="mailto:info@windowland.ae"
                className="flex items-center gap-2 text-body-sm text-brand-text-muted hover:text-brand-gold transition-colors duration-200"
              >
                <IconMail size={13} className="text-brand-gold flex-shrink-0" />
                info@windowland.ae
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-label text-brand-gold uppercase tracking-[3px] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-body-sm text-brand-text-muted hover:text-brand-gold transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-label text-brand-gold uppercase tracking-[3px] mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-body-sm text-brand-text-muted hover:text-brand-gold transition-colors duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-label text-brand-gold uppercase tracking-[3px] mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+971504552652"
                  className="flex items-center gap-3 text-body-sm text-brand-text-muted hover:text-brand-gold transition-colors duration-200"
                >
                  <IconPhone size={14} className="text-brand-gold flex-shrink-0" />
                  +971 50 455 2652
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@windowland.ae"
                  className="flex items-center gap-3 text-body-sm text-brand-text-muted hover:text-brand-gold transition-colors duration-200"
                >
                  <IconMail size={14} className="text-brand-gold flex-shrink-0" />
                  info@windowland.ae
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-body-sm text-brand-text-muted">
                  <IconMapPin size={14} className="text-brand-gold flex-shrink-0 mt-0.5" />
                  Dubai, United Arab Emirates
                </div>
              </li>
            </ul>
          </div>
        </div>

        <GoldDivider className="my-10" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-caption text-brand-text-faint">
          <p>
            &copy; {new Date().getFullYear()} Window Land Glass &amp; Aluminum Installation &amp;
            Maintenance Co. LLC. All rights reserved.
          </p>
          <p>DED License No. 1441416 · Dubai, UAE</p>
        </div>
      </div>
    </footer>
  )
}
