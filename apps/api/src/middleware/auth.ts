import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  userId: string
  username: string
}

export interface AuthRequest extends Request {
  user?: JwtPayload
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const token =
    req.cookies?.token ?? req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    res.status(401).json({ error: 'Authentication required' })
    return
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? 'fallback-secret') as JwtPayload
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
