import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ToggleTourUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const tour = await this.prisma.tourPackage.findUnique({ where: { id } })

    if (!tour) {
      throw Object.assign(new Error('Tour not found'), { statusCode: 404 })
    }

    return this.prisma.tourPackage.update({
      where: { id },
      data: { is_active: !tour.is_active },
    })
  }
}
