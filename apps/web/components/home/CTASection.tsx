import { IconPhone, IconMail, IconMapPin, IconArrowRight } from '@tabler/icons-react'

export default function CTASection() {
  return (
    <section className="bg-[#c9a84c] py-20 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — heading + contacts */}
        <div>
          <p className="text-[10px] tracking-[4px] uppercase text-black/50 mb-4 flex items-center gap-2">
            <span className="w-5 h-px bg-black/30" />
            Get In Touch
          </p>

          <h2 className="font-display text-4xl lg:text-5xl font-light text-black leading-[1.1] mb-5">
            Ready to Start<br />Your Project?
          </h2>

          <p className="text-black/60 text-sm leading-[1.75] font-light max-w-md mb-8">
            Contact us for a free consultation and detailed quotation. Our team responds within 24 hours.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="tel:+971504552652"
              className="flex items-center gap-3 text-black/75 text-[13px] hover:text-black transition-colors font-light"
            >
              <IconPhone size={15} stroke={1.5} />
              +971 50 455 2652
            </a>
            <a
              href="tel:+971509084979"
              className="flex items-center gap-3 text-black/75 text-[13px] hover:text-black transition-colors font-light"
            >
              <IconPhone size={15} stroke={1.5} />
              +971 50 908 4979
            </a>
            <a
              href="mailto:info@windowland.ae"
              className="flex items-center gap-3 text-black/75 text-[13px] hover:text-black transition-colors font-light"
            >
              <IconMail size={15} stroke={1.5} />
              info@windowland.ae
            </a>
            <p className="flex items-center gap-3 text-black/75 text-[13px] font-light">
              <IconMapPin size={15} stroke={1.5} />
              Dubai, United Arab Emirates
            </p>
          </div>
        </div>

        {/* Right — CTA button */}
        <div className="flex lg:justify-end">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-black text-[#c9a84c] px-10 py-4 text-[11px] tracking-[3px] uppercase font-medium hover:bg-black/85 transition-all duration-300"
          >
            Send Inquiry
            <IconArrowRight size={14} stroke={2} />
          </a>
        </div>

      </div>
    </section>
  )
}
