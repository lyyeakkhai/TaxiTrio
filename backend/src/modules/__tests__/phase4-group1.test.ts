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

import { ListUsersUseCase } from '../users/use-cases/list-users.usecase'
import { GetUserUseCase } from '../users/use-cases/get-user.usecase'
import { ListDriversUseCase } from '../drivers/use-cases/list-drivers.usecase'
import { GetDriverUseCase } from '../drivers/use-cases/get-driver.usecase'
import { ApproveDriverUseCase } from '../drivers/use-cases/approve-driver.usecase'
import { DeleteDriverUseCase } from '../drivers/use-cases/delete-driver.usecase'

describe('ListUsersUseCase', () => {
  it('returns array of users', async () => {
    const users = [{ id: 'u-1', name: 'User 1', role: 'customer' }]
    const mockPrisma = { user: { findMany: vi.fn().mockResolvedValue(users) } }
    const useCase = new ListUsersUseCase(mockPrisma as any)
    const result = await useCase.execute()
    expect(result).toEqual(users)
  })
})

describe('GetUserUseCase', () => {
  it('throws 404 when user not found', async () => {
    const mockPrisma = { user: { findUnique: vi.fn().mockResolvedValue(null) } }
    const useCase = new GetUserUseCase(mockPrisma as any)
    await expect(useCase.execute('u-1')).rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('ListDriversUseCase', () => {
  it('returns filtered drivers', async () => {
    const drivers = [{ id: 'd-1', verification_status: 'approved', user: { id: 'u-1' } }]
    const mockPrisma = { driver: { findMany: vi.fn().mockResolvedValue(drivers) } }
    const useCase = new ListDriversUseCase(mockPrisma as any)
    const result = await useCase.execute({ verification_status: 'approved' })
    expect(result).toEqual(drivers)
  })
})

describe('GetDriverUseCase', () => {
  it('throws 404 when driver not found', async () => {
    const mockPrisma = { driver: { findUnique: vi.fn().mockResolvedValue(null) } }
    const useCase = new GetDriverUseCase(mockPrisma as any)
    await expect(useCase.execute('d-1')).rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('ApproveDriverUseCase', () => {
  it('throws 400 when driver is not pending', async () => {
    const driver = { id: 'd-1', verification_status: 'approved' }
    const mockPrisma = { driver: { findUnique: vi.fn().mockResolvedValue(driver) } }
    const useCase = new ApproveDriverUseCase(mockPrisma as any)
    await expect(useCase.execute('d-1')).rejects.toMatchObject({ statusCode: 400 })
  })

  it('succeeds when driver is pending', async () => {
    const driver = { id: 'd-1', verification_status: 'pending' }
    const approved = { ...driver, verification_status: 'approved' }
    const mockPrisma = {
      driver: {
        findUnique: vi.fn().mockResolvedValue(driver),
        update: vi.fn().mockResolvedValue(approved),
      },
    }
    const useCase = new ApproveDriverUseCase(mockPrisma as any)
    const result = await useCase.execute('d-1')
    expect(result.verification_status).toBe('approved')
  })
})

describe('DeleteDriverUseCase', () => {
  it('throws 400 when driver has active bookings', async () => {
    const mockPrisma = {
      booking: { findMany: vi.fn().mockResolvedValue([{ id: 'b-1', status: 'in_progress' }]) },
    }
    const useCase = new DeleteDriverUseCase(mockPrisma as any)
    await expect(useCase.execute('d-1')).rejects.toMatchObject({ statusCode: 400 })
  })

  it('deletes driver when no active bookings', async () => {
    const mockPrisma = {
      booking: { findMany: vi.fn().mockResolvedValue([]) },
      driver: { delete: vi.fn().mockResolvedValue({ id: 'd-1' }) },
    }
    const useCase = new DeleteDriverUseCase(mockPrisma as any)
    const result = await useCase.execute('d-1')
    expect(result.id).toBe('d-1')
  })
})
