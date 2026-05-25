export interface IProject {
  _id: string
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
  contractor?: {
    name: string
    contact?: string
  }
  scope: string[]
  value?: {
    amount: number
    currency: string
    displayPublic: boolean
  }
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
    gallery: {
      url: string
      caption: string
      alt: string
    }[]
  }
  tags: string[]
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export type ProjectCreateInput = Omit<IProject, '_id' | 'createdAt' | 'updatedAt'>
