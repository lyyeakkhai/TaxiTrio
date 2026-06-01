import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListRoutesUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute() {
    return this.prisma.routePackage.findMany({ where: { is_active: true } })
  }
}
