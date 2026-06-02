import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListAdminReviewsUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute() {
    return await this.prisma.review.findMany({
      include: { customer: true, driver: true, booking: true },
    })
  }
}
