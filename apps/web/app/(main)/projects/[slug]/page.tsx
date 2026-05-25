import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS_DATA } from '@/lib/projects-data'
import ProjectGallery from '@/components/projects/ProjectGallery'
import ProjectCard from '@/components/projects/ProjectCard'
import { formatAED } from '@/lib/utils'
import {
  IconMapPin,
  IconUser,
  IconCheck,
  IconArrowLeft,
  IconPhone,
  IconBuildingFactory2,
} from '@tabler/icons-react'

export async function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = PROJECTS_DATA.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} | Window Land Dubai`,
    description: project.description.slice(0, 160),
    openGraph: {
      images: [project.images.cover],
      type: 'article',
    },
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS_DATA.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const related = PROJECTS_DATA.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={project.images.cover}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-caption text-brand-text-muted hover:text-brand-gold transition-colors mb-4"
          >
            <IconArrowLeft size={14} /> All Projects
          </Link>
          <span className="block text-caption text-brand-gold uppercase tracking-[3px] mb-2">
            {project.location.area}, {project.location.city}
          </span>
          <h1 className="font-display text-[clamp(28px,4vw,52px)] text-white font-light leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="container-custom py-16">
        {/* Overview grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 border border-brand-gold-border bg-brand-black-card">
          <div>
            <p className="text-caption text-brand-text-muted uppercase tracking-[2px] mb-1">Client</p>
            <p className="text-[14px] text-white">{project.client.name}</p>
            {project.client.company && (
              <p className="text-caption text-brand-text-muted">{project.client.company}</p>
            )}
          </div>
          {project.contractor && (
            <div>
              <p className="text-caption text-brand-text-muted uppercase tracking-[2px] mb-1">
                Main Contractor
              </p>
              <p className="text-[14px] text-white">{project.contractor.name}</p>
            </div>
          )}
          <div>
            <p className="text-caption text-brand-text-muted uppercase tracking-[2px] mb-1">Status</p>
            <span className="inline-flex items-center gap-1.5 text-[13px] text-brand-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              {project.timeline?.status?.charAt(0).toUpperCase()}
              {project.timeline?.status?.slice(1) ?? 'Completed'}
            </span>
          </div>
          <div>
            <p className="text-caption text-brand-text-muted uppercase tracking-[2px] mb-1">Value</p>
            <p className="text-[14px] text-white">
              {project.value?.displayPublic && project.value.amount > 0
                ? formatAED(project.value.amount)
                : 'On Request'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
          {/* Left — main content */}
          <div>
            {/* Scope of work */}
            <div className="mb-10">
              <h2 className="text-label text-brand-gold uppercase tracking-[3px] mb-5">
                Scope of Work
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.scope.map((s) => (
                  <span
                    key={s}
                    className="text-[12px] text-white border border-brand-gold-border px-4 py-2 uppercase tracking-[1px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-label text-brand-gold uppercase tracking-[3px] mb-5">
                Project Description
              </h2>
              {project.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-body text-brand-text-muted leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </div>

            {/* Key highlights */}
            <div className="mb-10">
              <h2 className="text-label text-brand-gold uppercase tracking-[3px] mb-5">
                Key Highlights
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <IconCheck size={14} className="text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="text-body-sm text-brand-text-secondary">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo gallery */}
            {project.images.gallery.length > 0 && (
              <div className="mb-10">
                <h2 className="text-label text-brand-gold uppercase tracking-[3px] mb-5">
                  Photo Gallery
                </h2>
                <ProjectGallery images={project.images.gallery} />
              </div>
            )}
          </div>

          {/* Right — specs sidebar */}
          <div>
            {project.specifications && (
              <div className="border border-brand-gold-border p-6 mb-6">
                <h3 className="text-label text-brand-gold uppercase tracking-[3px] mb-5">
                  Specifications
                </h3>
                {project.specifications.dimensions && (
                  <div className="mb-4">
                    <p className="text-caption text-brand-text-muted uppercase tracking-[1.5px] mb-1">
                      Dimensions
                    </p>
                    <p className="text-[14px] text-white">{project.specifications.dimensions}</p>
                  </div>
                )}
                {project.specifications.materials && (
                  <div className="mb-4">
                    <p className="text-caption text-brand-text-muted uppercase tracking-[1.5px] mb-1">
                      Materials
                    </p>
                    <ul className="space-y-1">
                      {project.specifications.materials.map((m) => (
                        <li key={m} className="text-[13px] text-brand-text-secondary">— {m}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.specifications.systems && (
                  <div>
                    <p className="text-caption text-brand-text-muted uppercase tracking-[1.5px] mb-1">
                      Systems
                    </p>
                    <ul className="space-y-1">
                      {project.specifications.systems.map((s) => (
                        <li key={s} className="text-[13px] text-brand-text-secondary">— {s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Location */}
            <div className="border border-brand-gold-border p-6 mb-6">
              <h3 className="text-label text-brand-gold uppercase tracking-[3px] mb-4">Location</h3>
              <div className="flex items-center gap-2 text-[14px] text-brand-text-secondary">
                <IconMapPin size={14} className="text-brand-gold flex-shrink-0" />
                {project.location.area}, {project.location.city}, {project.location.country}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-brand-gold p-6">
              <p className="font-display text-[20px] text-brand-black font-light mb-2">
                Similar project in mind?
              </p>
              <p className="text-[13px] text-brand-black/70 mb-4">
                Get a free consultation and quotation.
              </p>
              <Link
                href="/contact"
                className="block text-center bg-brand-black text-brand-gold text-[12px] uppercase tracking-[2px] py-3 hover:bg-brand-black-card transition-colors duration-200"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-brand-gold-border">
            <h2 className="text-label text-brand-gold uppercase tracking-[3px] mb-8">
              Other Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
