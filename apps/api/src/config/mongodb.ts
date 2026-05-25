import mongoose from 'mongoose'
import { logger } from '../index'

let isConnected = false

export async function connectMongoDB(): Promise<void> {
  if (isConnected) return

  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not defined')

  await mongoose.connect(uri)
  isConnected = true
  console.log('MongoDB connected')
}
