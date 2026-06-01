import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListPaymentsAdminUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(filters: { status?: string; booking_id?: string }) {
    const where: any = {}
    if (filters.status) where.status = filters.status
    if (filters.booking_id) where.booking_id = filters.booking_id

    return this.prisma.payment.findMany({
      where,
      include: { booking: true },
    })
  }
}
