import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetTourUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const tour = await this.prisma.tourPackage.findFirst({
      where: { id, is_active: true },
    })
    if (!tour) throw Object.assign(new Error('Tour not found'), { statusCode: 404 })
    return tour
  }
}
