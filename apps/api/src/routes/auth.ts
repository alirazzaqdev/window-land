import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { authLimiter } from '../middleware/rateLimiter'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = Router()

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
})

router.post('/login', authLimiter, async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(422).json({ error: 'Invalid credentials format' })
    return
  }

  const { username, password } = parsed.data

  const expectedUsername = process.env.ADMIN_USERNAME ?? 'waqas'
  const expectedHash = process.env.ADMIN_PASSWORD_HASH

  if (!expectedHash) {
    res.status(500).json({ error: 'Admin password not configured' })
    return
  }

  if (username !== expectedUsername) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }

  const valid = await bcrypt.compare(password, expectedHash)
  if (!valid) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }

  const token = jwt.sign(
    { userId: 'admin', username },
    process.env.JWT_SECRET ?? 'fallback-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN ?? '8h' }
  )

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000,
    })
    .json({ success: true, token })
})

router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('token').json({ success: true })
})

router.get('/me', requireAuth, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user })
})

export default router
