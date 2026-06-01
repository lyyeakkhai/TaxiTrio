import { Request, Response, NextFunction } from 'express'
import { logger } from '../lib/logger'

interface AppError extends Error {
  statusCode?: number
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err)

  const statusCode = err.statusCode || 500
  const message = statusCode < 500 ? err.message : 'Internal server error'

  res.status(statusCode).json({ error: message })
}
