import 'express'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        clerkId: string
        role: string
      }
    }
  }
}
