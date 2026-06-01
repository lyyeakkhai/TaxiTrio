import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'

vi.mock('@clerk/backend', () => ({
  verifyToken: vi.fn(),
}))

vi.mock('../../lib/prisma', () => ({
  prisma: {},
}))

import { verifyToken } from '@clerk/backend'
import app from '../../app'
import { CreateUserUseCase } from '../users/use-cases/create-user.usecase'
import { GetMeUseCase } from '../users/use-cases/get-me.usecase'
import { TransitionBookingUseCase } from '../bookings/use-cases/transition-booking.usecase'
import { CancelBookingUseCase } from '../bookings/use-cases/cancel-booking.usecase'

describe('CreateUserUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('throws 409 when clerkId already exists', async () => {
    const mockPrisma = {
      user: {
        findUnique: vi.fn().mockResolvedValue({ id: '1', clerk_id: 'existing' }),
        create: vi.fn(),
      },
    }
    const useCase = new CreateUserUseCase(mockPrisma as any)
    await expect(
      useCase.execute({ clerkId: 'existing', email: 'a@b.com', name: 'A', role: 'customer' })
    ).rejects.toMatchObject({ statusCode: 409 })
    expect(mockPrisma.user.create).not.toHaveBeenCalled()
  })

  it('creates user when clerkId does not exist', async () => {
    const mockPrisma = {
      user: {
        findUnique: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({ id: '1', clerk_id: 'new', email: 'a@b.com', name: 'A', role: 'customer' }),
      },
    }
    const useCase = new CreateUserUseCase(mockPrisma as any)
    const result = await useCase.execute({ clerkId: 'new', email: 'a@b.com', name: 'A', role: 'customer' })
    expect(result).toMatchObject({ clerk_id: 'new' })
    expect(mockPrisma.user.create).toHaveBeenCalled()
  })
})

describe('GetMeUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('throws 404 when user not found', async () => {
    const mockPrisma = {
      user: { findUnique: vi.fn().mockResolvedValue(null) },
    }
    const useCase = new GetMeUseCase(mockPrisma as any)
    await expect(useCase.execute('unknown-clerk-id')).rejects.toMatchObject({ statusCode: 404 })
  })

  it('returns user when found', async () => {
    const mockPrisma = {
      user: { findUnique: vi.fn().mockResolvedValue({ id: '1', clerk_id: 'user1', email: 'a@b.com' }) },
    }
    const useCase = new GetMeUseCase(mockPrisma as any)
    const result = await useCase.execute('user1')
    expect(result).toMatchObject({ clerk_id: 'user1' })
  })
})

describe('TransitionBookingUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('succeeds on valid transition (pending → assigned)', async () => {
    const mockPrisma = {
      booking: {
        findUnique: vi.fn().mockResolvedValue({ id: 'b1', status: 'pending' }),
        update: vi.fn().mockResolvedValue({ id: 'b1', status: 'assigned' }),
      },
      bookingStatusHistory: { create: vi.fn().mockResolvedValue({}) },
      $transaction: vi.fn().mockImplementation((ops) => Promise.all(ops)),
    }
    const useCase = new TransitionBookingUseCase(mockPrisma as any)
    const result = await useCase.execute('b1', 'assigned', 'user1')
    expect(result).toMatchObject({ status: 'assigned' })
  })

  it('throws 400 on invalid transition (pending → completed)', async () => {
    const mockPrisma = {
      booking: {
        findUnique: vi.fn().mockResolvedValue({ id: 'b1', status: 'pending' }),
      },
    }
    const useCase = new TransitionBookingUseCase(mockPrisma as any)
    await expect(useCase.execute('b1', 'completed', 'user1')).rejects.toMatchObject({ statusCode: 400 })
  })

  it('throws 404 when booking not found', async () => {
    const mockPrisma = {
      booking: {
        findUnique: vi.fn().mockResolvedValue(null),
      },
    }
    const useCase = new TransitionBookingUseCase(mockPrisma as any)
    await expect(useCase.execute('b1', 'assigned', 'user1')).rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('CancelBookingUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('cancels a pending booking', async () => {
    const mockPrisma = {
      booking: {
        findUnique: vi
          .fn()
          .mockResolvedValueOnce({ id: 'b1', status: 'pending', customer_id: 'u1' })
          .mockResolvedValueOnce({ id: 'b1', status: 'pending' }),
        update: vi.fn().mockResolvedValue({ id: 'b1', status: 'cancelled' }),
      },
      bookingStatusHistory: { create: vi.fn().mockResolvedValue({}) },
      $transaction: vi.fn().mockImplementation((ops) => Promise.all(ops)),
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new CancelBookingUseCase(mockPrisma as any, transition)
    const result = await useCase.execute('b1', 'u1')
    expect(result).toMatchObject({ status: 'cancelled' })
  })

  it('throws 400 when booking is not pending', async () => {
    const mockPrisma = {
      booking: {
        findUnique: vi
          .fn()
          .mockResolvedValueOnce({ id: 'b1', status: 'accepted', customer_id: 'u1' })
          .mockResolvedValueOnce({ id: 'b1', status: 'accepted' }),
      },
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new CancelBookingUseCase(mockPrisma as any, transition)
    await expect(useCase.execute('b1', 'u1')).rejects.toMatchObject({ statusCode: 400 })
  })

  it('throws 403 when customer does not own booking', async () => {
    const mockPrisma = {
      booking: {
        findUnique: vi.fn().mockResolvedValue({ id: 'b1', status: 'pending', customer_id: 'u1' }),
      },
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new CancelBookingUseCase(mockPrisma as any, transition)
    await expect(useCase.execute('b1', 'u2')).rejects.toMatchObject({ statusCode: 403 })
  })

  it('throws 404 when booking not found', async () => {
    const mockPrisma = {
      booking: {
        findUnique: vi.fn().mockResolvedValue(null),
      },
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new CancelBookingUseCase(mockPrisma as any, transition)
    await expect(useCase.execute('b1', 'u1')).rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('GET /api/auth/me', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 401 when Authorization header is missing', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
  })

  it('returns 401 when token is invalid', async () => {
    vi.mocked(verifyToken).mockRejectedValueOnce(new Error('invalid token'))

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalid-token')

    expect(res.status).toBe(401)
  })
})
