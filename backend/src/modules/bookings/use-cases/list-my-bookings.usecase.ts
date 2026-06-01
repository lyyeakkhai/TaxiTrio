import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListMyBookingsUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(customerId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit
    return this.prisma.booking.findMany({
      where: { customer_id: customerId },
      include: { status_history: { orderBy: { changed_at: 'desc' } } },
      orderBy: { created_at: 'desc' },
      skip,
      take: limit,
    })
  }
}
