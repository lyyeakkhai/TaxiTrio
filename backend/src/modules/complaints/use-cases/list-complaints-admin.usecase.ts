import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListComplaintsAdminUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(status?: string) {
    const where = status ? { status } : {}
    return this.prisma.complaint.findMany({
      where,
      include: { customer: true, booking: true },
    })
  }
}
