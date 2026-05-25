import { Schema, model, Document } from 'mongoose'

export interface IProjectDoc extends Document {
  slug: string
  title: string
  subtitle: string
  location: {
    area: string
    city: string
    country: string
    coordinates?: { lat: number; lng: number }
  }
  client: {
    name: string
    company?: string
    type: 'residential' | 'commercial' | 'hospitality' | 'government'
  }
  contractor?: { name: string; contact?: string }
  scope: string[]
  value?: { amount: number; currency: string; displayPublic: boolean }
  timeline?: {
    startDate?: Date
    endDate?: Date
    status: 'completed' | 'ongoing' | 'upcoming'
  }
  specifications?: {
    dimensions?: string
    materials?: string[]
    systems?: string[]
    standards?: string[]
  }
  description: string
  highlights: string[]
  images: {
    cover: string
    gallery: { url: string; caption: string; alt: string }[]
  }
  tags: string[]
  featured: boolean
  order: number
}

const projectSchema = new Schema<IProjectDoc>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    location: {
      area: String,
      city: String,
      country: { type: String, default: 'UAE' },
      coordinates: { lat: Number, lng: Number },
    },
    client: {
      name: String,
      company: String,
      type: {
        type: String,
        enum: ['residential', 'commercial', 'hospitality', 'government'],
        default: 'residential',
      },
    },
    contractor: { name: String, contact: String },
    scope: [String],
    value: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: 'AED' },
      displayPublic: { type: Boolean, default: false },
    },
    timeline: {
      startDate: Date,
      endDate: Date,
      status: {
        type: String,
        enum: ['completed', 'ongoing', 'upcoming'],
        default: 'completed',
      },
    },
    specifications: {
      dimensions: String,
      materials: [String],
      systems: [String],
      standards: [String],
    },
    description: { type: String, required: true },
    highlights: [String],
    images: {
      cover: { type: String, required: true },
      gallery: [{ url: String, caption: String, alt: String }],
    },
    tags: [String],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Project = model<IProjectDoc>('Project', projectSchema)
