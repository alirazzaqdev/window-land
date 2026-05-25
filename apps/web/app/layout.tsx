import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://windowland.ae'),
  title: {
    default: 'Window Land | Glass & Aluminium Installation Dubai UAE',
    template: '%s | Window Land Dubai',
  },
  description:
    'Professional glass and aluminium installation company in Dubai UAE. Curtain walls, sliding doors, pergolas, ACP cladding, glass balustrade. Licensed contractor — call +971 50 455 2652',
  keywords: [
    'aluminium installation Dubai',
    'glass works UAE',
    'curtain wall Dubai',
    'pergola installation Dubai',
    'ACP cladding UAE',
    'glass balustrade Dubai',
    'window installation Dubai',
    'sliding doors UAE',
    'glazing contractor Dubai',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'Window Land Glass & Aluminum',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Window Land Dubai' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://windowland.ae' },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Window Land Glass & Aluminum Installation & Maintenance Co. LLC',
  description: 'Professional glass and aluminium installation in Dubai UAE',
  url: 'https://windowland.ae',
  telephone: '+971504552652',
  email: 'info@windowland.ae',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 25.2048, longitude: 55.2708 },
  openingHours: 'Mo-Fr 08:00-18:00',
  priceRange: 'AED',
  foundingDate: '2024-12-15',
  numberOfEmployees: 12,
  hasCredential: 'DED License 1441416',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
