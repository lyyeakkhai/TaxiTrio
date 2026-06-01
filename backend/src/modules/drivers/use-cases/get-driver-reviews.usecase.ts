import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetDriverReviewsUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string) {
    const driver = await this.prisma.driver.findUnique({ where: { user_id: userId } })
    if (!driver) throw Object.assign(new Error('Driver not found'), { statusCode: 404 })

    return await this.prisma.review.findMany({
      where: { driver_id: driver.id },
      include: { customer: true },
    })
  }
}
