import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListMyComplaintsUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(customerId: string) {
    return this.prisma.complaint.findMany({
      where: { customer_id: customerId },
      orderBy: { created_at: 'desc' },
    })
  }
}
