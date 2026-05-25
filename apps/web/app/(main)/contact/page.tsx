import type { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'
import QuoteCalculator from '@/components/forms/QuoteCalculator'
import { IconPhone, IconMail, IconMapPin, IconBrandWhatsapp, IconClock } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Window Land — Dubai\'s premium glass and aluminium installation company. Call +971 50 455 2652, email info@windowland.ae, or submit an inquiry.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      {/* Hero */}
      <div className="bg-brand-black-alt border-b border-brand-gold-border py-16 px-4">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-gold" />
            <span className="text-label text-brand-gold uppercase tracking-[4px]">Get In Touch</span>
          </div>
          <h1 className="font-display text-display-lg text-white font-light mb-4">Contact Us</h1>
          <p className="text-body text-brand-text-muted max-w-xl">
            Tell us about your project. We respond within 24 hours and offer free on-site
            consultations for projects in Dubai and the Northern Emirates.
          </p>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16">
            {/* Form */}
            <div>
              <h2 className="font-display text-[28px] text-white font-light mb-8">Send an Inquiry</h2>
              <ContactForm />
            </div>

            {/* Info + Quote */}
            <div className="space-y-6">
              <div className="border border-brand-gold-border p-6">
                <h3 className="text-[14px] font-medium text-white mb-5">Contact Information</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+971504552652"
                    className="flex items-center gap-3 text-[14px] text-brand-text-muted hover:text-brand-gold transition-colors"
                  >
                    <IconPhone size={16} className="text-brand-gold flex-shrink-0" />
                    +971 50 455 2652
                  </a>
                  <a
                    href="tel:+971509084979"
                    className="flex items-center gap-3 text-[14px] text-brand-text-muted hover:text-brand-gold transition-colors"
                  >
                    <IconPhone size={16} className="text-brand-gold flex-shrink-0" />
                    +971 50 908 4979 (CEO)
                  </a>
                  <a
                    href="mailto:info@windowland.ae"
                    className="flex items-center gap-3 text-[14px] text-brand-text-muted hover:text-brand-gold transition-colors"
                  >
                    <IconMail size={16} className="text-brand-gold flex-shrink-0" />
                    info@windowland.ae
                  </a>
                  <a
                    href="https://wa.me/971504552652"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[14px] text-brand-text-muted hover:text-[#25d366] transition-colors"
                  >
                    <IconBrandWhatsapp size={16} className="text-[#25d366] flex-shrink-0" />
                    WhatsApp Chat
                  </a>
                  <div className="flex items-start gap-3 text-[14px] text-brand-text-muted">
                    <IconMapPin size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
                    Dubai, United Arab Emirates
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-brand-text-muted">
                    <IconClock size={16} className="text-brand-gold flex-shrink-0" />
                    Mon–Fri 8:00am – 6:00pm
                  </div>
                </div>
              </div>

              <QuoteCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
