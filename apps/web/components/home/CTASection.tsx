import Link from 'next/link'
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react'
import Button from '@/components/ui/Button'

export default function CTASection() {
  return (
    <section className="bg-brand-gold py-section px-4">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
          {/* Left */}
          <div className="text-center lg:text-left max-w-xl">
            <p className="text-[10px] text-brand-black/60 uppercase tracking-[4px] mb-3 font-sans">
              Get in Touch
            </p>
            <h2 className="font-display text-[clamp(32px,4vw,48px)] text-brand-black font-light leading-tight mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-[14px] text-brand-black/70 leading-relaxed">
              Contact us for a free consultation and detailed quotation. Our team responds within
              24 hours.
            </p>
          </div>

          {/* Right — contact + button */}
          <div className="flex flex-col gap-5 min-w-[280px]">
            <a
              href="tel:+971504552652"
              className="flex items-center gap-3 text-[14px] text-brand-black hover:text-brand-black/70 transition-colors duration-200"
            >
              <div className="w-9 h-9 bg-brand-black/10 flex items-center justify-center rounded-full flex-shrink-0">
                <IconPhone size={16} />
              </div>
              +971 50 455 2652
            </a>
            <a
              href="mailto:info@windowland.ae"
              className="flex items-center gap-3 text-[14px] text-brand-black hover:text-brand-black/70 transition-colors duration-200"
            >
              <div className="w-9 h-9 bg-brand-black/10 flex items-center justify-center rounded-full flex-shrink-0">
                <IconMail size={16} />
              </div>
              info@windowland.ae
            </a>
            <div className="flex items-center gap-3 text-[14px] text-brand-black/70">
              <div className="w-9 h-9 bg-brand-black/10 flex items-center justify-center rounded-full flex-shrink-0">
                <IconMapPin size={16} />
              </div>
              Dubai, United Arab Emirates
            </div>
            <Link href="/contact" className="mt-2">
              <Button variant="dark" size="lg" className="w-full justify-center">
                Send Inquiry →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
