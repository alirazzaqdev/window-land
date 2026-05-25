export interface IService {
  _id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  icon: string
  category: 'glazing' | 'aluminium' | 'cladding' | 'fabrication'
  featured: boolean
  order: number
  image?: string
  priceRange?: {
    min: number
    max: number
    unit: string
    currency: string
  }
  createdAt: Date
  updatedAt: Date
}

export const ALL_SERVICES = [
  'Curtain Wall Systems',
  'Aluminium Pergolas & Skylights',
  'Sliding Doors',
  'Glass Balustrade',
  'ACP Cladding',
  'Office Partitions',
  'Glass Works',
  'Shower Partitions',
  'Metal Fabrication',
  'Ventilation Windows',
  'Swing Windows',
  'Fixed Windows',
  'Frameless Glass Doors',
  'Glass Pool Fence',
  'Aluminium Louvers',
  'Mirror Works',
  'Balcony Railing',
  'Steel Fabrication',
  'Tempered Glass Works',
] as const

export type ServiceName = (typeof ALL_SERVICES)[number]
