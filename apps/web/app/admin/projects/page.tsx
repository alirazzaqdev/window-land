'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { IProject } from '@/types'
import { IconPlus, IconPencil, IconTrash, IconStar } from '@tabler/icons-react'
import Image from 'next/image'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    try {
      const data = await api.get<IProject[]>('/api/projects')
      setProjects(data)
    } catch {}
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function deleteProject(id: string) {
    if (!confirm('Delete this project? This cannot be undone.')) return
    await api.delete(`/api/projects/${id}`)
    setProjects((prev) => prev.filter((p) => p._id !== id))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-[28px] text-white font-light">Projects</h1>
        <button className="flex items-center gap-2 bg-brand-gold text-brand-black text-[12px] uppercase tracking-[1.5px] px-4 py-2 hover:brightness-110 transition-all">
          <IconPlus size={14} /> Add Project
        </button>
      </div>

      {loading ? (
        <p className="text-brand-text-muted text-[13px]">Loading...</p>
      ) : (
        <div className="border border-brand-gold-border overflow-hidden">
          <div className="grid grid-cols-[60px_1fr_1fr_1fr_100px_100px] text-caption text-brand-text-muted uppercase tracking-[1.5px] px-4 py-3 border-b border-brand-gold-border bg-brand-black-card">
            <span>Photo</span>
            <span>Title</span>
            <span>Location</span>
            <span>Status</span>
            <span>Featured</span>
            <span>Actions</span>
          </div>
          <div className="divide-y divide-brand-gold-border">
            {projects.map((p) => (
              <div
                key={p._id}
                className="grid grid-cols-[60px_1fr_1fr_1fr_100px_100px] items-center px-4 py-3 hover:bg-brand-black-card transition-colors"
              >
                <div className="relative w-10 h-10 rounded-sm overflow-hidden">
                  <Image src={p.images.cover} alt={p.title} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-[13px] text-white">{p.title}</p>
                  <p className="text-caption text-brand-text-muted">{p.slug}</p>
                </div>
                <p className="text-[13px] text-brand-text-muted">{p.location.area}, {p.location.city}</p>
                <span className="text-caption text-brand-gold capitalize">{p.timeline?.status}</span>
                <div>
                  {p.featured && <IconStar size={14} className="text-brand-gold" />}
                </div>
                <div className="flex gap-3">
                  <button
                    className="text-brand-text-muted hover:text-brand-gold transition-colors"
                    aria-label="Edit"
                  >
                    <IconPencil size={14} />
                  </button>
                  <button
                    onClick={() => deleteProject(p._id)}
                    className="text-brand-text-muted hover:text-red-400 transition-colors"
                    aria-label="Delete"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
