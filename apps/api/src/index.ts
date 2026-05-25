import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import { generalLimiter } from './middleware/rateLimiter'
import projectsRouter from './routes/projects'
import servicesRouter from './routes/services'
import contactRouter from './routes/contact'
import inquiriesRouter from './routes/inquiries'
import authRouter from './routes/auth'
import { connectMongoDB } from './config/mongodb'

export const logger = {
  info: (msg: string) => console.log(`[INFO] ${new Date().toISOString()} ${msg}`),
  error: (msg: string, err?: unknown) => console.error(`[ERROR] ${new Date().toISOString()} ${msg}`, err ?? ''),
}

const app = express()
const PORT = process.env.PORT ?? 3001

// Security
app.use(helmet())
app.use(
  cors({
    origin: [
      'https://windowland.ae',
      'https://www.windowland.ae',
      ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
    ],
    credentials: true,
  })
)
app.use(mongoSanitize())
app.use(generalLimiter)

// Parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/api/projects', projectsRouter)
app.use('/api/services', servicesRouter)
app.use('/api/contact', contactRouter)
app.use('/api/inquiries', inquiriesRouter)
app.use('/api/auth', authRouter)

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Quote proxy → Python microservice
app.post('/api/quote/calculate', async (req, res) => {
  const { default: axios } = await import('axios')
  try {
    const response = await axios.post(
      `${process.env.PYTHON_API_URL}/calculate`,
      req.body,
      { timeout: 10000 }
    )
    res.json(response.data)
  } catch {
    res.status(502).json({ error: 'Quote service temporarily unavailable' })
  }
})

// 404
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Unhandled error', err)
  res.status(500).json({ error: 'Internal server error' })
})

async function start() {
  await connectMongoDB()
  app.listen(PORT, () => {
    logger.info(`API running on port ${PORT}`)
  })
}

start().catch((err) => {
  logger.error('Failed to start server', err)
  process.exit(1)
})

export default app
