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

import { ListPaymentsAdminUseCase } from '../payments/use-cases/list-payments-admin.usecase'
import { GetPaymentAdminUseCase } from '../payments/use-cases/get-payment-admin.usecase'
import { ListComplaintsAdminUseCase } from '../complaints/use-cases/list-complaints-admin.usecase'
import { GetComplaintUseCase } from '../complaints/use-cases/get-complaint.usecase'
import { ReplyComplaintUseCase } from '../complaints/use-cases/reply-complaint.usecase'
import { ResolveComplaintUseCase } from '../complaints/use-cases/resolve-complaint.usecase'
import { CreateAssistanceUseCase } from '../assistance/use-cases/create-assistance.usecase'
import { DeleteAssistanceUseCase } from '../assistance/use-cases/delete-assistance.usecase'
import { ToggleAssistanceUseCase } from '../assistance/use-cases/toggle-assistance.usecase'

describe('ListPaymentsAdminUseCase', () => {
  it('returns all payments', async () => {
    const payments = [{ id: 'p-1', booking_id: 'b-1', status: 'verified' }]
    const mockPrisma = {
      payment: { findMany: vi.fn().mockResolvedValue(payments) },
    }
    const useCase = new ListPaymentsAdminUseCase(mockPrisma as any)
    const result = await useCase.execute({})
    expect(result).toEqual(payments)
  })
})

describe('GetPaymentAdminUseCase', () => {
  it('throws 404 when not found', async () => {
    const mockPrisma = { payment: { findUnique: vi.fn().mockResolvedValue(null) } }
    const useCase = new GetPaymentAdminUseCase(mockPrisma as any)
    await expect(useCase.execute('p-1')).rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('ListComplaintsAdminUseCase', () => {
  it('returns filtered by status', async () => {
    const complaints = [{ id: 'c-1', status: 'open' }]
    const mockPrisma = {
      complaint: { findMany: vi.fn().mockResolvedValue(complaints) },
    }
    const useCase = new ListComplaintsAdminUseCase(mockPrisma as any)
    const result = await useCase.execute('open')
    expect(mockPrisma.complaint.findMany).toHaveBeenCalledWith({
      where: { status: 'open' },
      include: { customer: true, booking: true },
    })
    expect(result).toEqual(complaints)
  })
})

describe('GetComplaintUseCase', () => {
  it('throws 404 when not found', async () => {
    const mockPrisma = { complaint: { findUnique: vi.fn().mockResolvedValue(null) } }
    const useCase = new GetComplaintUseCase(mockPrisma as any)
    await expect(useCase.execute('c-1')).rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('ReplyComplaintUseCase', () => {
  beforeEach(() => vi.clearAllMocks())

  it('throws 404 when not found', async () => {
    const mockPrisma = { complaint: { findUnique: vi.fn().mockResolvedValue(null) } }
    const useCase = new ReplyComplaintUseCase(mockPrisma as any)
    await expect(useCase.execute('c-1', 'reply')).rejects.toMatchObject({ statusCode: 404 })
  })

  it('throws 400 when already resolved', async () => {
    const mockPrisma = {
      complaint: { findUnique: vi.fn().mockResolvedValue({ id: 'c-1', status: 'resolved' }) },
    }
    const useCase = new ReplyComplaintUseCase(mockPrisma as any)
    await expect(useCase.execute('c-1', 'reply')).rejects.toMatchObject({ statusCode: 400 })
  })

  it('sets admin_reply, status=replied, creates notification', async () => {
    const complaint = { id: 'c-1', customer_id: 'user-1', status: 'open' }
    const updated = { ...complaint, admin_reply: 'reply', status: 'replied', replied_at: new Date() }
    const mockPrisma = {
      complaint: {
        findUnique: vi.fn().mockResolvedValue(complaint),
        update: vi.fn().mockResolvedValue(updated),
      },
      notification: { create: vi.fn() },
    }
    const useCase = new ReplyComplaintUseCase(mockPrisma as any)
    const result = await useCase.execute('c-1', 'reply')
    expect(result.admin_reply).toBe('reply')
    expect(result.status).toBe('replied')
    expect(mockPrisma.notification.create).toHaveBeenCalledWith({
      data: {
        user_id: 'user-1',
        type: 'complaint_replied',
        message: 'Admin has replied to your complaint',
        is_read: false,
      },
    })
  })
})

describe('ResolveComplaintUseCase', () => {
  it('throws 400 when already resolved', async () => {
    const mockPrisma = {
      complaint: { findUnique: vi.fn().mockResolvedValue({ id: 'c-1', status: 'resolved' }) },
    }
    const useCase = new ResolveComplaintUseCase(mockPrisma as any)
    await expect(useCase.execute('c-1')).rejects.toMatchObject({ statusCode: 400 })
  })
})

describe('CreateAssistanceUseCase', () => {
  it('creates record', async () => {
    const dto = { category: 'emergency' as const, title: 'Emergency', content: 'Call 911' }
    const created = { id: 'a-1', ...dto, is_active: true, created_at: new Date() }
    const mockPrisma = {
      touristAssistance: { create: vi.fn().mockResolvedValue(created) },
    }
    const useCase = new CreateAssistanceUseCase(mockPrisma as any)
    const result = await useCase.execute(dto)
    expect(result).toEqual(created)
  })
})

describe('DeleteAssistanceUseCase', () => {
  it('throws 404 when not found', async () => {
    const mockPrisma = { touristAssistance: { findUnique: vi.fn().mockResolvedValue(null) } }
    const useCase = new DeleteAssistanceUseCase(mockPrisma as any)
    await expect(useCase.execute('a-1')).rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('ToggleAssistanceUseCase', () => {
  it('flips is_active', async () => {
    const assistance = { id: 'a-1', is_active: false }
    const updated = { ...assistance, is_active: true }
    const mockPrisma = {
      touristAssistance: {
        findUnique: vi.fn().mockResolvedValue(assistance),
        update: vi.fn().mockResolvedValue(updated),
      },
    }
    const useCase = new ToggleAssistanceUseCase(mockPrisma as any)
    const result = await useCase.execute('a-1')
    expect(result.is_active).toBe(true)
  })
})
