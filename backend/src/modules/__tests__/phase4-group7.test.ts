import { describe, it, expect, vi } from 'vitest'

vi.mock('@clerk/backend', () => ({ verifyToken: vi.fn() }))
vi.mock('../../lib/prisma', () => ({ prisma: {} }))
vi.mock('../../config/env', () => ({
  env: { CLERK_SECRET_KEY: 'test', TELEGRAM_BOT_USERNAME: 'taxitrio_bot', FRONTEND_URL: 'http://localhost:3000' },
}))

import { GetDashboardStatsUseCase } from '../admin/use-cases/get-dashboard-stats.usecase'

describe('GetDashboardStatsUseCase', () => {
  it('returns all stats with correct shape', async () => {
    const mockPrisma = {
      payment: { aggregate: vi.fn().mockResolvedValue({ _sum: { net_amount: '1500.00' } }) },
      booking: { count: vi.fn().mockResolvedValueOnce(42).mockResolvedValueOnce(7) },
      complaint: { count: vi.fn().mockResolvedValue(3) },
      driver: { count: vi.fn().mockResolvedValue(5) },
    }
    const useCase = new GetDashboardStatsUseCase(mockPrisma as any)
    const result = await useCase.execute()

    expect(result).toEqual({
      total_revenue: 1500,
      completed_trips: 42,
      pending_bookings: 7,
      open_complaints: 3,
      pending_drivers: 5,
    })
  })

  it('returns zero revenue when no payments exist', async () => {
    const mockPrisma = {
      payment: { aggregate: vi.fn().mockResolvedValue({ _sum: { net_amount: null } }) },
      booking: { count: vi.fn().mockResolvedValue(0) },
      complaint: { count: vi.fn().mockResolvedValue(0) },
      driver: { count: vi.fn().mockResolvedValue(0) },
    }
    const useCase = new GetDashboardStatsUseCase(mockPrisma as any)
    const result = await useCase.execute()

    expect(result.total_revenue).toBe(0)
  })
})
