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
vi.mock('../../bot/notify', () => ({ notifyDriver: vi.fn().mockResolvedValue(undefined) }))

import { ListBookingsAdminUseCase } from '../bookings/use-cases/list-bookings-admin.usecase'
import { AssignBookingUseCase } from '../bookings/use-cases/assign-booking.usecase'
import { CancelBookingAdminUseCase } from '../bookings/use-cases/cancel-booking-admin.usecase'
import { TransitionBookingUseCase } from '../bookings/use-cases/transition-booking.usecase'

describe('ListBookingsAdminUseCase', () => {
  it('returns all bookings without filters', async () => {
    const bookings = [
      { id: 'b-1', status: 'pending', customer: {}, driver: {}, status_history: [] },
      { id: 'b-2', status: 'assigned', customer: {}, driver: {}, status_history: [] },
    ]
    const mockPrisma = {
      booking: {
        findMany: vi.fn().mockResolvedValue(bookings),
      },
    }
    const useCase = new ListBookingsAdminUseCase(mockPrisma as any)
    const result = await useCase.execute({})
    expect(result).toEqual(bookings)
    expect(mockPrisma.booking.findMany).toHaveBeenCalledWith({
      where: {},
      include: { customer: true, driver: true, status_history: { orderBy: { changed_at: 'asc' } } },
    })
  })

  it('filters bookings by status', async () => {
    const bookings = [{ id: 'b-1', status: 'pending', customer: {}, driver: {}, status_history: [] }]
    const mockPrisma = {
      booking: {
        findMany: vi.fn().mockResolvedValue(bookings),
      },
    }
    const useCase = new ListBookingsAdminUseCase(mockPrisma as any)
    await useCase.execute({ status: 'pending' })
    expect(mockPrisma.booking.findMany).toHaveBeenCalledWith({
      where: { status: 'pending' },
      include: { customer: true, driver: true, status_history: { orderBy: { changed_at: 'asc' } } },
    })
  })
})

describe('AssignBookingUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('throws 404 when booking not found', async () => {
    const mockPrisma = {
      booking: { findUnique: vi.fn().mockResolvedValue(null) },
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new AssignBookingUseCase(mockPrisma as any, transition)
    await expect(useCase.execute('b-1', 'd-1', 'admin-1')).rejects.toMatchObject({ statusCode: 404 })
  })

  it('throws 404 when driver not found', async () => {
    const booking = { id: 'b-1', status: 'pending' }
    const mockPrisma = {
      booking: { findUnique: vi.fn().mockResolvedValue(booking) },
      driver: { findUnique: vi.fn().mockResolvedValue(null) },
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new AssignBookingUseCase(mockPrisma as any, transition)
    await expect(useCase.execute('b-1', 'd-1', 'admin-1')).rejects.toMatchObject({ statusCode: 404 })
  })

  it('throws 400 when driver not approved', async () => {
    const booking = { id: 'b-1', status: 'pending' }
    const driver = { id: 'd-1', verification_status: 'pending', is_available: true }
    const mockPrisma = {
      booking: { findUnique: vi.fn().mockResolvedValue(booking) },
      driver: { findUnique: vi.fn().mockResolvedValue(driver) },
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new AssignBookingUseCase(mockPrisma as any, transition)
    await expect(useCase.execute('b-1', 'd-1', 'admin-1')).rejects.toMatchObject({ statusCode: 400 })
  })

  it('throws 400 when driver not available', async () => {
    const booking = { id: 'b-1', status: 'pending' }
    const driver = { id: 'd-1', verification_status: 'approved', is_available: false }
    const mockPrisma = {
      booking: { findUnique: vi.fn().mockResolvedValue(booking) },
      driver: { findUnique: vi.fn().mockResolvedValue(driver) },
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new AssignBookingUseCase(mockPrisma as any, transition)
    await expect(useCase.execute('b-1', 'd-1', 'admin-1')).rejects.toMatchObject({ statusCode: 400 })
  })

  it('succeeds: transitions to assigned, creates notification', async () => {
    const booking = { id: 'b-1', status: 'pending', booking_type: 'taxi', travel_date: new Date(), travel_time: '10:00' }
    const driver = { id: 'd-1', user_id: 'user-1', verification_status: 'approved', is_available: true }
    const updated = { ...booking, status: 'assigned', driver_id: 'd-1', customer: {}, status_history: [] }
    const mockPrisma = {
      booking: {
        findUnique: vi.fn().mockResolvedValue(booking),
        update: vi.fn().mockResolvedValue(updated),
      },
      driver: { findUnique: vi.fn().mockResolvedValue(driver) },
      user: { findUnique: vi.fn().mockResolvedValue({ id: 'user-1' }) },
      notification: { create: vi.fn().mockResolvedValue({}) },
      telegramLinkCode: { findFirst: vi.fn().mockResolvedValue(null) },
      bookingStatusHistory: { create: vi.fn() },
      $transaction: vi.fn().mockImplementation((ops: any[]) => Promise.all(ops)),
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new AssignBookingUseCase(mockPrisma as any, transition)
    const result = await useCase.execute('b-1', 'd-1', 'admin-1')
    expect(result.status).toBe('assigned')
    expect(mockPrisma.notification.create).toHaveBeenCalledWith({
      data: {
        user_id: 'user-1',
        type: 'driver_assigned',
        message: 'You have a new booking assignment',
        is_read: false,
      },
    })
  })
})

describe('CancelBookingAdminUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('throws 400 when booking already completed', async () => {
    const booking = { id: 'b-1', status: 'completed' }
    const mockPrisma = {
      booking: { findUnique: vi.fn().mockResolvedValue(booking) },
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new CancelBookingAdminUseCase(mockPrisma as any, transition)
    await expect(useCase.execute('b-1', 'admin-1')).rejects.toMatchObject({ statusCode: 400 })
  })

  it('cancels a pending booking', async () => {
    const booking = { id: 'b-1', status: 'pending' }
    const cancelled = { ...booking, status: 'cancelled' }
    const mockPrisma = {
      booking: {
        findUnique: vi.fn().mockResolvedValue(booking),
        update: vi.fn().mockResolvedValue(cancelled),
      },
      bookingStatusHistory: { create: vi.fn() },
      $transaction: vi.fn().mockImplementation((ops: any[]) => Promise.all(ops)),
    }
    const transition = new TransitionBookingUseCase(mockPrisma as any)
    const useCase = new CancelBookingAdminUseCase(mockPrisma as any, transition)
    const result = await useCase.execute('b-1', 'admin-1')
    expect(result.status).toBe('cancelled')
  })
})
