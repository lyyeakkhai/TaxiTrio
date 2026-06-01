import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@clerk/backend', () => ({ verifyToken: vi.fn() }))
vi.mock('../../lib/prisma', () => ({ prisma: {} }))
vi.mock('../../lib/cloudinary', () => ({
  cloudinary: {
    uploader: {
      upload: vi.fn().mockResolvedValue({ secure_url: 'https://cdn.example.com/photo.jpg' }),
    },
  },
}))
vi.mock('../../config/env', () => ({
  env: {
    CLERK_SECRET_KEY: 'test',
    CLOUDINARY_CLOUD_NAME: 'test',
    CLOUDINARY_API_KEY: 'test',
    CLOUDINARY_API_SECRET: 'test',
  },
}))

import { CreateTaxiUseCase } from '../taxis/use-cases/create-taxi.usecase'
import { UpdateTaxiUseCase } from '../taxis/use-cases/update-taxi.usecase'
import { DeleteTaxiUseCase } from '../taxis/use-cases/delete-taxi.usecase'
import { ToggleTaxiUseCase } from '../taxis/use-cases/toggle-taxi.usecase'

describe('CreateTaxiUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('throws 409 when plate_number already exists', async () => {
    const mockPrisma = {
      taxi: {
        findUnique: vi.fn().mockResolvedValue({ id: 't-1', plate_number: 'ABC123' }),
        create: vi.fn(),
      },
    }
    const useCase = new CreateTaxiUseCase(mockPrisma as any)
    await expect(
      useCase.execute({
        model: 'Toyota Camry',
        plate_number: 'ABC123',
        type: 'sedan',
        passenger_capacity: 4,
        luggage_capacity: 10,
        comfort_category: 'standard',
      })
    ).rejects.toMatchObject({ statusCode: 409 })
  })

  it('creates taxi without photo when photoBuffer is undefined', async () => {
    const mockPrisma = {
      taxi: {
        findUnique: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({
          id: 't-1',
          model: 'Toyota Camry',
          plate_number: 'ABC123',
          type: 'sedan',
          passenger_capacity: 4,
          luggage_capacity: 10,
          comfort_category: 'standard',
          photo: null,
        }),
      },
    }
    const useCase = new CreateTaxiUseCase(mockPrisma as any)
    const result = await useCase.execute({
      model: 'Toyota Camry',
      plate_number: 'ABC123',
      type: 'sedan',
      passenger_capacity: 4,
      luggage_capacity: 10,
      comfort_category: 'standard',
    })
    expect(result.photo).toBeNull()
    expect(mockPrisma.taxi.create).toHaveBeenCalled()
  })
})

describe('UpdateTaxiUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('throws 404 when taxi not found', async () => {
    const mockPrisma = {
      taxi: {
        findUnique: vi.fn().mockResolvedValue(null),
        update: vi.fn(),
      },
    }
    const useCase = new UpdateTaxiUseCase(mockPrisma as any)
    await expect(useCase.execute('t-1', { model: 'Honda Civic' })).rejects.toMatchObject({
      statusCode: 404,
    })
  })
})

describe('DeleteTaxiUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('soft deletes when bookings exist', async () => {
    const taxi = { id: 't-1', is_active: true }
    const updated = { ...taxi, is_active: false }
    const mockPrisma = {
      taxi: {
        findUnique: vi.fn().mockResolvedValue(taxi),
        update: vi.fn().mockResolvedValue(updated),
      },
      booking: {
        count: vi.fn().mockResolvedValue(2),
      },
    }
    const useCase = new DeleteTaxiUseCase(mockPrisma as any)
    const result = await useCase.execute('t-1')
    expect(result.is_active).toBe(false)
    expect(mockPrisma.taxi.update).toHaveBeenCalled()
  })

  it('hard deletes when no bookings exist', async () => {
    const taxi = { id: 't-1', is_active: true }
    const mockPrisma = {
      taxi: {
        findUnique: vi.fn().mockResolvedValue(taxi),
        delete: vi.fn().mockResolvedValue(taxi),
      },
      booking: {
        count: vi.fn().mockResolvedValue(0),
      },
    }
    const useCase = new DeleteTaxiUseCase(mockPrisma as any)
    await useCase.execute('t-1')
    expect(mockPrisma.taxi.delete).toHaveBeenCalled()
  })
})

describe('ToggleTaxiUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('flips is_active from true to false', async () => {
    const taxi = { id: 't-1', is_active: true }
    const updated = { ...taxi, is_active: false }
    const mockPrisma = {
      taxi: {
        findUnique: vi.fn().mockResolvedValue(taxi),
        update: vi.fn().mockResolvedValue(updated),
      },
    }
    const useCase = new ToggleTaxiUseCase(mockPrisma as any)
    const result = await useCase.execute('t-1')
    expect(result.is_active).toBe(false)
  })
})
