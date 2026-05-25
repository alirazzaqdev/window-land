import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ServicesTicker from '@/components/home/ServicesTicker'
import ServicesGrid from '@/components/home/ServicesGrid'
import ProjectsShowcase from '@/components/home/ProjectsShowcase'
import StatsCounter from '@/components/home/StatsCounter'
import WhyUs from '@/components/home/WhyUs'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'Window Land | Glass & Aluminium Installation Dubai UAE',
  description:
    'Premium glass and aluminium installation company in Dubai UAE — curtain walls, sliding doors, pergolas, ACP cladding, glass balustrade. DED Licensed. Call +971 50 455 2652.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesTicker />
      <ServicesGrid />
      <ProjectsShowcase />
      <StatsCounter />
      <WhyUs />
      <CTASection />
    </>
  )
}
