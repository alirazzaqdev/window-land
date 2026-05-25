export interface IInquiry {
  id: number
  name: string
  company?: string
  phone: string
  email: string
  service: string
  location?: string
  message: string
  status: 'new' | 'viewed' | 'replied' | 'closed'
  source: string
  ipAddress?: string
  createdAt: Date
  updatedAt: Date
}

export type InquiryCreateInput = Omit<IInquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>
