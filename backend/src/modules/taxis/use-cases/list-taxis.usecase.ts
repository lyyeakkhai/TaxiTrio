import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListTaxisUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute() {
    return this.prisma.taxi.findMany({
      where: { is_active: true },
      include: {
        drivers: {
          include: { user: true },
        },
      },
    })
  }
}
