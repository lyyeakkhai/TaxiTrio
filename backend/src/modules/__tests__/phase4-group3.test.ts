import { describe, it, expect, vi } from 'vitest'

vi.mock('@clerk/backend', () => ({ verifyToken: vi.fn() }))
vi.mock('../../lib/prisma', () => ({ prisma: {} }))
vi.mock('../../config/env', () => ({
  env: {
    CLERK_SECRET_KEY: 'test',
    TELEGRAM_BOT_USERNAME: 'taxitrio_bot',
    FRONTEND_URL: 'http://localhost:3000',
  },
}))
vi.mock('../../lib/cloudinary', () => ({
  cloudinary: {
    uploader: {
      upload: vi.fn().mockResolvedValue({ secure_url: 'https://cdn.example.com/img.jpg' }),
    },
  },
}))

import { CreateRouteUseCase } from '../routes/use-cases/create-route.usecase'
import { UpdateRouteUseCase } from '../routes/use-cases/update-route.usecase'
import { DeleteRouteUseCase } from '../routes/use-cases/delete-route.usecase'
import { ToggleRouteUseCase } from '../routes/use-cases/toggle-route.usecase'
import { CreateTourUseCase } from '../tours/use-cases/create-tour.usecase'
import { DeleteTourUseCase } from '../tours/use-cases/delete-tour.usecase'
import { ToggleTourUseCase } from '../tours/use-cases/toggle-tour.usecase'

describe('CreateRouteUseCase', () => {
  it('creates route without image', async () => {
    const route = { id: 'r-1', name: 'Route 1', origin: 'A', destination: 'B', duration_hours: 2, price: 100, included_services: null, recommended_vehicle: null, image: null, is_active: true, created_at: new Date() }
    const mockPrisma = {
      routePackage: {
        create: vi.fn().mockResolvedValue(route),
      },
    }
    const useCase = new CreateRouteUseCase(mockPrisma as any)
    const result = await useCase.execute({ name: 'Route 1', origin: 'A', destination: 'B', duration_hours: 2, price: 100 })
    expect(result.id).toBe('r-1')
    expect(mockPrisma.routePackage.create).toHaveBeenCalled()
  })
})

describe('UpdateRouteUseCase', () => {
  it('throws 404 when not found', async () => {
    const mockPrisma = {
      routePackage: {
        findUnique: vi.fn().mockResolvedValue(null),
      },
    }
    const useCase = new UpdateRouteUseCase(mockPrisma as any)
    await expect(useCase.execute('r-1', { name: 'Updated' })).rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('DeleteRouteUseCase', () => {
  it('throws 400 when active bookings exist', async () => {
    const route = { id: 'r-1', name: 'Route 1', origin: 'A', destination: 'B', duration_hours: 2, price: 100, included_services: null, recommended_vehicle: null, image: null, is_active: true, created_at: new Date() }
    const mockPrisma = {
      routePackage: {
        findUnique: vi.fn().mockResolvedValue(route),
      },
      booking: {
        count: vi.fn().mockResolvedValue(1),
      },
    }
    const useCase = new DeleteRouteUseCase(mockPrisma as any)
    await expect(useCase.execute('r-1')).rejects.toMatchObject({ statusCode: 400 })
  })

  it('deletes when no active bookings', async () => {
    const route = { id: 'r-1', name: 'Route 1', origin: 'A', destination: 'B', duration_hours: 2, price: 100, included_services: null, recommended_vehicle: null, image: null, is_active: true, created_at: new Date() }
    const mockPrisma = {
      routePackage: {
        findUnique: vi.fn().mockResolvedValue(route),
        delete: vi.fn().mockResolvedValue(route),
      },
      booking: {
        count: vi.fn().mockResolvedValue(0),
      },
    }
    const useCase = new DeleteRouteUseCase(mockPrisma as any)
    const result = await useCase.execute('r-1')
    expect(result.id).toBe('r-1')
    expect(mockPrisma.routePackage.delete).toHaveBeenCalled()
  })
})

describe('ToggleRouteUseCase', () => {
  it('flips is_active', async () => {
    const route = { id: 'r-1', name: 'Route 1', origin: 'A', destination: 'B', duration_hours: 2, price: 100, included_services: null, recommended_vehicle: null, image: null, is_active: true, created_at: new Date() }
    const updated = { ...route, is_active: false }
    const mockPrisma = {
      routePackage: {
        findUnique: vi.fn().mockResolvedValue(route),
        update: vi.fn().mockResolvedValue(updated),
      },
    }
    const useCase = new ToggleRouteUseCase(mockPrisma as any)
    const result = await useCase.execute('r-1')
    expect(result.is_active).toBe(false)
  })
})

describe('CreateTourUseCase', () => {
  it('creates tour without image', async () => {
    const tour = { id: 't-1', name: 'Tour 1', description: null, duration_hours: 3, location: 'Loc', included_services: null, vehicle_type: null, price: 150, image: null, is_active: true, created_at: new Date() }
    const mockPrisma = {
      tourPackage: {
        create: vi.fn().mockResolvedValue(tour),
      },
    }
    const useCase = new CreateTourUseCase(mockPrisma as any)
    const result = await useCase.execute({ name: 'Tour 1', duration_hours: 3, location: 'Loc', price: 150 })
    expect(result.id).toBe('t-1')
    expect(mockPrisma.tourPackage.create).toHaveBeenCalled()
  })
})

describe('DeleteTourUseCase', () => {
  it('throws 400 when active bookings exist', async () => {
    const tour = { id: 't-1', name: 'Tour 1', description: null, duration_hours: 3, location: 'Loc', included_services: null, vehicle_type: null, price: 150, image: null, is_active: true, created_at: new Date() }
    const mockPrisma = {
      tourPackage: {
        findUnique: vi.fn().mockResolvedValue(tour),
      },
      booking: {
        count: vi.fn().mockResolvedValue(1),
      },
    }
    const useCase = new DeleteTourUseCase(mockPrisma as any)
    await expect(useCase.execute('t-1')).rejects.toMatchObject({ statusCode: 400 })
  })
})

describe('ToggleTourUseCase', () => {
  it('flips is_active', async () => {
    const tour = { id: 't-1', name: 'Tour 1', description: null, duration_hours: 3, location: 'Loc', included_services: null, vehicle_type: null, price: 150, image: null, is_active: true, created_at: new Date() }
    const updated = { ...tour, is_active: false }
    const mockPrisma = {
      tourPackage: {
        findUnique: vi.fn().mockResolvedValue(tour),
        update: vi.fn().mockResolvedValue(updated),
      },
    }
    const useCase = new ToggleTourUseCase(mockPrisma as any)
    const result = await useCase.execute('t-1')
    expect(result.is_active).toBe(false)
  })
})
