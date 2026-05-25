'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IconX, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

interface GalleryImage {
  url: string
  caption: string
  alt: string
}

interface ProjectGalleryProps {
  images: GalleryImage[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const prev = () =>
    setLightboxIdx((i) => (i !== null ? (i - 1 + images.length) % images.length : 0))
  const next = () =>
    setLightboxIdx((i) => (i !== null ? (i + 1) % images.length : 0))

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <div
            key={i}
            className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-brand-black-card"
            onClick={() => setLightboxIdx(i)}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end p-4">
              <p className="text-white text-[13px] leading-snug">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-brand-gold transition-colors p-2"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close"
          >
            <IconX size={28} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-gold transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous"
          >
            <IconChevronLeft size={36} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-gold transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next"
          >
            <IconChevronRight size={36} />
          </button>

          <div
            className="relative max-w-5xl max-h-[80vh] w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIdx].url}
              alt={images[lightboxIdx].alt}
              width={1200}
              height={800}
              className="object-contain w-full h-auto max-h-[70vh]"
            />
            <div className="mt-4 text-center">
              <p className="text-white text-[14px]">{images[lightboxIdx].caption}</p>
              <p className="text-brand-text-muted text-caption mt-1">
                {lightboxIdx + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
