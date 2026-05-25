'use client'

import { useState } from 'react'
import { PROJECTS_DATA } from '@/lib/projects-data'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectFilter from '@/components/projects/ProjectFilter'
import type { IProject } from '@window-land/types'

type Filter = 'All' | 'Residential' | 'Commercial' | 'Ongoing' | 'Completed'

function filterProjects(projects: IProject[], filter: Filter): IProject[] {
  if (filter === 'All') return projects
  if (filter === 'Residential') return projects.filter((p) => p.client.type === 'residential')
  if (filter === 'Commercial') return projects.filter((p) => p.client.type === 'commercial')
  if (filter === 'Ongoing') return projects.filter((p) => p.timeline?.status === 'ongoing')
  if (filter === 'Completed') return projects.filter((p) => p.timeline?.status === 'completed')
  return projects
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const filtered = filterProjects(PROJECTS_DATA, activeFilter)

  return (
    <div className="min-h-screen bg-brand-black pt-24">
      {/* Hero banner */}
      <div className="bg-brand-black-alt border-b border-brand-gold-border py-16 px-4">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-gold" />
            <span className="text-label text-brand-gold uppercase tracking-[4px]">Our Portfolio</span>
          </div>
          <h1 className="font-display text-display-lg text-white font-light mb-4">
            Our Projects
          </h1>
          <p className="text-body text-brand-text-muted max-w-xl">
            Premium glass and aluminium installations across Dubai&apos;s most prestigious addresses —
            from curtain wall systems to bespoke pergolas.
          </p>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-custom">
          <ProjectFilter active={activeFilter} onChange={setActiveFilter} />

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-brand-text-muted">
              No projects found for this filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
