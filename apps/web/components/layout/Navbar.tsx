'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { IconMenu2, IconX } from '@tabler/icons-react'
import Button from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-brand-black/95 backdrop-blur-sm border-b border-brand-gold-border'
            : 'bg-transparent'
        )}
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-display text-[20px] text-white font-medium tracking-[2px] group-hover:text-brand-gold transition-colors duration-200">
              WINDOW LAND
            </span>
            <span className="text-[9px] text-brand-text-muted uppercase tracking-[3px] font-sans">
              Glass &amp; Aluminium · Dubai UAE
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'text-[12px] uppercase tracking-[2px] font-medium transition-colors duration-200 relative group',
                  pathname === href
                    ? 'text-brand-gold'
                    : 'text-brand-text-muted hover:text-white'
                )}
              >
                {label}
                <span
                  className={clsx(
                    'absolute -bottom-1 left-0 h-px bg-brand-gold transition-all duration-200',
                    pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white hover:text-brand-gold transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <IconMenu2 size={24} />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={clsx(
          'fixed inset-0 z-50 bg-brand-black flex flex-col transition-all duration-300 lg:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="container-custom flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-[20px] text-white font-medium tracking-[2px]">
              WINDOW LAND
            </span>
            <span className="text-[9px] text-brand-text-muted uppercase tracking-[3px]">
              Glass &amp; Aluminium · Dubai UAE
            </span>
          </Link>
          <button
            className="p-2 text-white hover:text-brand-gold transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <IconX size={24} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'font-display text-display-lg font-light border-b border-brand-gold-border pb-4 transition-colors duration-200',
                pathname === href ? 'text-brand-gold' : 'text-white hover:text-brand-gold'
              )}
            >
              {label}
            </Link>
          ))}
          <Link href="/contact" className="mt-4">
            <Button variant="primary" size="lg" className="w-full justify-center">
              Get a Quote
            </Button>
          </Link>
        </div>

        <div className="px-8 pb-8 text-brand-text-muted text-caption">
          <p>+971 50 455 2652 · info@windowland.ae</p>
        </div>
      </div>
    </>
  )
}
