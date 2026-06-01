import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListDriversUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(filters: { verification_status?: string; is_available?: boolean }) {
    return this.prisma.driver.findMany({
      where: {
        ...(filters.verification_status && { verification_status: filters.verification_status }),
        ...(filters.is_available !== undefined && { is_available: filters.is_available }),
      },
      include: { user: true },
    })
  }
}
