import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class DeleteReviewUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    })

    if (!review) {
      throw Object.assign(new Error('Review not found'), { statusCode: 404 })
    }

    await this.prisma.review.delete({
      where: { id },
    })
  }
}
