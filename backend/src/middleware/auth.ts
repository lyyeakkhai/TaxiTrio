import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '@clerk/backend'

export async function verifyClerkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const secretKey = process.env.CLERK_SECRET_KEY
  if (!secretKey) {
    return res.status(500).json({ error: 'Internal server error' })
  }

  const token = authHeader.slice(7)

  try {
    const payload = await verifyToken(token, {
      secretKey,
    })

    const role = (payload as any).publicMetadata?.role as string
    if (!['customer', 'driver', 'admin'].includes(role)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    req.user = { id: payload.sub, clerkId: payload.sub, role }

    next()
  } catch {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
