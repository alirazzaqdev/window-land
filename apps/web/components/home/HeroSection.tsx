import Image from 'next/image'
import Link from 'next/link'

const trustItems = ['UAE Licensed', '12+ Team', '19+ Services', '5+ Projects']

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">

      {/* FULL WIDTH BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero/dubai-hero.jpg"
          alt="Dubai skyline sunset — Window Land Glass & Aluminium Dubai UAE"
          fill
          quality={95}
          className="object-cover object-[center_30%] hero-image"
          priority
          sizes="100vw"
        />

        {/* Left strong dark — text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

        {/* Bottom fade to black */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Top subtle fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      </div>

      {/* GOLD CORNER FRAMES */}
      <div className="absolute top-6 left-8 z-10 w-10 h-10 border-t-2 border-l-2 border-brand-gold/50" />
      <div className="absolute bottom-8 right-8 z-10 w-8 h-8 border-b-2 border-r-2 border-brand-gold/30" />

      {/* ALL TEXT CONTENT ON TOP */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 py-24">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <p className="text-brand-gold text-[10px] tracking-[4px] uppercase mb-6 flex items-center gap-3 animate-fadeUp">
            <span className="w-6 h-px bg-brand-gold" />
            Dubai, UAE · Est. December 2024
          </p>

          {/* H1 */}
          <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.05] mb-6 tracking-[-1px] animate-fadeUp [animation-delay:200ms]">
            One Stop Solution for<br />
            <em className="text-brand-gold italic">Glass &amp; Aluminium</em><br />
            Works
          </h1>

          {/* Description */}
          <p className="text-[#7a7060] text-sm leading-[1.75] mb-10 max-w-lg font-light animate-fadeUp [animation-delay:400ms]">
            Window Land is a Dubai-based premium glass and aluminium installation company
            delivering curtain wall systems, sliding doors, pergolas, ACP cladding, and complete
            glazing solutions for residential and commercial projects across the UAE.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14 animate-fadeUp [animation-delay:600ms]">
            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-brand-gold text-black px-8 py-3 text-[11px] tracking-[2px] uppercase font-medium hover:brightness-110 transition-all"
            >
              Explore Services
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center border border-brand-gold/80 text-brand-gold bg-black/20 backdrop-blur-sm px-8 py-3 text-[11px] tracking-[2px] uppercase font-light hover:border-brand-gold hover:bg-brand-gold/10 transition-all duration-300"
            >
              View Projects
            </Link>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-8 animate-fadeUp [animation-delay:800ms]">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-[10px] text-[#5a5040] tracking-[1px] uppercase">
                <span className="text-brand-gold text-xs">✦</span>
                {item}
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  )
}
