import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@clerk/backend', () => ({ verifyToken: vi.fn() }))
vi.mock('../../lib/prisma', () => ({ prisma: {} }))
vi.mock('../../config/env', () => ({
  env: {
    CLERK_SECRET_KEY: 'test',
    TELEGRAM_BOT_USERNAME: 'taxitrio_bot',
    FRONTEND_URL: 'http://localhost:3000',
  },
}))

import { GetDriverProfileUseCase } from '../drivers/use-cases/get-driver-profile.usecase'
import { ToggleAvailabilityUseCase } from '../drivers/use-cases/toggle-availability.usecase'
import { AcceptBookingUseCase } from '../drivers/use-cases/accept-booking.usecase'
import { CompleteBookingUseCase } from '../drivers/use-cases/complete-booking.usecase'
import { GenerateTelegramCodeUseCase } from '../telegram/use-cases/generate-telegram-code.usecase'
import { TransitionBookingUseCase } from '../bookings/use-cases/transition-booking.usecase'

describe('GetDriverProfileUseCase', () => {
  it('throws 404 when no driver row exists', async () => {
    const mockPrisma = { driver: { findUnique: vi.fn().mockResolvedValue(null) } }
    const useCase = new GetDriverProfileUseCase(mockPrisma as any)
    await expect(useCase.execute('user-1')).rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('ToggleAvailabilityUseCase', () => {
  it('returns updated driver with new is_available value', async () => {
    const driver = { id: 'd-1', user_id: 'user-1', is_available: false }
    const updated = { ...driver, is_available: true }
    const mockPrisma = {
      driver: {
        findUnique: vi.fn().mockResolvedValue(driver),
        update: vi.fn().mockResolvedValue(updated),
      },
    }
    const useCase = new ToggleAvailabilityUseCase(mockPrisma as any)
    const result = await useCase.execute('user-1', true)
    expect(result.is_available).toBe(true)
  })
})

describe('AcceptBookingUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('throws 403 when booking belongs to a different driver', async () => {
    const mockPrisma = {
      driver: { findUnique: vi.fn().mockResolvedValue({ id: 'd-1', user_id: 'user-1' }) },
      booking: { findUnique: vi.fn().mockResolvedValue({ id: 'b-1', driver_id: 'd-OTHER', status: 'assigned' }) },
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new AcceptBookingUseCase(mockPrisma as any, transition)
    await expect(useCase.execute('b-1', 'user-1')).rejects.toMatchObject({ statusCode: 403 })
  })

  it('throws 400 when booking is not in assigned status', async () => {
    const mockPrisma = {
      driver: { findUnique: vi.fn().mockResolvedValue({ id: 'd-1', user_id: 'user-1' }) },
      booking: { findUnique: vi.fn().mockResolvedValue({ id: 'b-1', driver_id: 'd-1', status: 'pending' }) },
      bookingStatusHistory: { create: vi.fn() },
      $transaction: vi.fn(),
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new AcceptBookingUseCase(mockPrisma as any, transition)
    await expect(useCase.execute('b-1', 'user-1')).rejects.toMatchObject({ statusCode: 400 })
  })
})

describe('CompleteBookingUseCase', () => {
  it('transitions booking to completed and writes status history', async () => {
    const driver = { id: 'd-1', user_id: 'user-1' }
    const booking = { id: 'b-1', driver_id: 'd-1', status: 'in_progress' }
    const completed = { ...booking, status: 'completed' }
    const mockPrisma = {
      driver: { findUnique: vi.fn().mockResolvedValue(driver) },
      booking: {
        findUnique: vi.fn().mockResolvedValue(booking),
        update: vi.fn().mockResolvedValue(completed),
      },
      bookingStatusHistory: { create: vi.fn() },
      $transaction: vi.fn().mockImplementation((ops: any[]) => Promise.all(ops)),
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new CompleteBookingUseCase(mockPrisma as any, transition)
    const result = await useCase.execute('b-1', 'user-1')
    expect(result.status).toBe('completed')
    expect(mockPrisma.bookingStatusHistory.create).toHaveBeenCalled()
  })
})

describe('GenerateTelegramCodeUseCase', () => {
  it('returns a 6-digit code expiring in ~10 minutes', async () => {
    const driver = { id: 'd-1', user_id: 'user-1' }
    const mockPrisma = {
      driver: { findUnique: vi.fn().mockResolvedValue(driver) },
      telegramLinkCode: {
        deleteMany: vi.fn().mockResolvedValue({}),
        create: vi.fn().mockResolvedValue({}),
      },
    }
    const useCase = new GenerateTelegramCodeUseCase(mockPrisma as any)
    const before = Date.now()
    const result = await useCase.execute('user-1')
    const after = Date.now()

    expect(result.code).toMatch(/^\d{6}$/)
    expect(result.expires_at.getTime()).toBeGreaterThanOrEqual(before + 9 * 60 * 1000)
    expect(result.expires_at.getTime()).toBeLessThanOrEqual(after + 10 * 60 * 1000 + 100)
    expect(result.bot_link).toContain(result.code)
  })
})
