import { Schema, model, Document } from 'mongoose'

export interface IServiceDoc extends Document {
  slug: string
  title: string
  shortDescription: string
  description: string
  icon: string
  category: 'glazing' | 'aluminium' | 'cladding' | 'fabrication'
  featured: boolean
  order: number
  image?: string
}

const serviceSchema = new Schema<IServiceDoc>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'tool' },
    category: {
      type: String,
      enum: ['glazing', 'aluminium', 'cladding', 'fabrication'],
      required: true,
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    image: String,
  },
  { timestamps: true }
)

export const Service = model<IServiceDoc>('Service', serviceSchema)
