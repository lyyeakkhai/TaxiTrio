import { describe, it, expect, vi, beforeEach } from 'vitest'
import express, { Request, Response, NextFunction } from 'express'
import request from 'supertest'
import { z } from 'zod'
import { validateRequest } from '../validate'
import { requireRole } from '../role'
import { errorHandler } from '../error'
import app from '../../app'

vi.mock('@clerk/backend', () => ({
  verifyToken: vi.fn(),
}))

import { verifyToken } from '@clerk/backend'
import { verifyClerkToken } from '../auth'

function makeApp(...middlewares: any[]) {
  const a = express()
  a.use(express.json())
  middlewares.forEach((m) => a.use(m))
  a.get('/test', (req: Request, res: Response) => res.json({ ok: true }))
  return a
}

describe('verifyClerkToken', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 401 when Authorization header is missing', async () => {
    const res = await request(makeApp(verifyClerkToken)).get('/test')
    expect(res.status).toBe(401)
  })

  it('returns 401 when token is invalid', async () => {
    vi.mocked(verifyToken).mockRejectedValueOnce(new Error('invalid'))
    const res = await request(makeApp(verifyClerkToken))
      .get('/test')
      .set('Authorization', 'Bearer bad-token')
    expect(res.status).toBe(401)
  })
})

describe('requireRole', () => {
  it('returns 401 when req.user is missing', async () => {
    const res = await request(makeApp(requireRole('admin'))).get('/test')
    expect(res.status).toBe(401)
  })

  it('returns 403 when role does not match', async () => {
    const setUser = (req: Request, _res: Response, next: NextFunction) => {
      req.user = { id: '1', clerkId: '1', role: 'customer' }
      next()
    }
    const res = await request(makeApp(setUser, requireRole('admin'))).get('/test')
    expect(res.status).toBe(403)
  })

  it('calls next when role matches', async () => {
    const setUser = (req: Request, _res: Response, next: NextFunction) => {
      req.user = { id: '1', clerkId: '1', role: 'admin' }
      next()
    }
    const res = await request(makeApp(setUser, requireRole('admin'))).get('/test')
    expect(res.status).toBe(200)
  })
})

describe('validateRequest', () => {
  const schema = z.object({ name: z.string() })

  it('returns 400 with details on invalid body', async () => {
    const a = express()
    a.use(express.json())
    a.post('/test', validateRequest(schema), (_req: Request, res: Response) => res.json({ ok: true }))
    const res = await request(a).post('/test').send({ name: 123 })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Validation failed')
    expect(res.body.details).toBeDefined()
  })

  it('passes parsed body to next middleware on valid input', async () => {
    const a = express()
    a.use(express.json())
    a.post('/test', validateRequest(schema), (req: Request, res: Response) => res.json(req.body))
    const res = await request(a).post('/test').send({ name: 'Alice' })
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Alice')
  })
})

describe('errorHandler', () => {
  function makeErrorApp(err: any) {
    const a = express()
    a.get('/test', () => { throw err })
    a.use(errorHandler)
    return a
  }

  it('uses err.statusCode when present', async () => {
    const err = Object.assign(new Error('Not found'), { statusCode: 404 })
    const res = await request(makeErrorApp(err)).get('/test')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Not found')
  })

  it('returns 500 when no statusCode', async () => {
    const err = new Error('boom')
    const res = await request(makeErrorApp(err)).get('/test')
    expect(res.status).toBe(500)
    expect(res.body.error).toBe('Internal server error')
  })
})

describe('GET /health', () => {
  it('returns 200 { status: "ok" }', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ status: 'ok' })
  })
})
