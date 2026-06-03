import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListComplaintsAdminUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(status?: string, category?: string) {
    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (category) where.category = category
    return this.prisma.complaint.findMany({
      where,
      include: { customer: true, booking: true },
    })
  }
}
