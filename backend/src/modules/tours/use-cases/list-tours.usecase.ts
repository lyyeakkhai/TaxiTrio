import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListToursUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute() {
    return this.prisma.tourPackage.findMany({ where: { is_active: true } })
  }
}
