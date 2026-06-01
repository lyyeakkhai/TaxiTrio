import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListAssistanceUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute() {
    return this.prisma.touristAssistance.findMany({
      where: { is_active: true },
    })
  }
}
