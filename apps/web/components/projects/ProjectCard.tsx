import Link from 'next/link'
import Image from 'next/image'
import type { IProject } from '@/types'
import { formatAED } from '@/lib/utils'

interface ProjectCardProps {
  project: IProject
  className?: string
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block bg-brand-black-card border border-brand-gold-border hover:border-brand-gold transition-all duration-300 overflow-hidden ${className ?? ''}`}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.images.cover}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
        <span className="absolute top-3 left-3 text-caption text-brand-gold uppercase tracking-[2px] bg-brand-black/80 px-3 py-1">
          {project.location.area}, {project.location.city}
        </span>
        {project.timeline?.status === 'ongoing' && (
          <span className="absolute top-3 right-3 text-caption text-white uppercase tracking-[1px] bg-brand-gold px-2 py-1">
            Ongoing
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-[20px] text-white font-light mb-1 group-hover:text-brand-gold transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-caption text-brand-text-muted mb-3">{project.subtitle}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.scope.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-[10px] text-brand-text-muted border border-brand-gold-border px-2 py-0.5 uppercase tracking-[1px]"
            >
              {s}
            </span>
          ))}
          {project.scope.length > 3 && (
            <span className="text-[10px] text-brand-gold px-2 py-0.5">
              +{project.scope.length - 3} more
            </span>
          )}
        </div>

        {project.value?.displayPublic && project.value.amount > 0 && (
          <p className="text-caption text-brand-gold font-medium">
            {formatAED(project.value.amount)}
          </p>
        )}
      </div>
    </Link>
  )
}
