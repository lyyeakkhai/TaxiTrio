import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetDriverUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: { user: true, taxi: true },
    })
    if (!driver) throw Object.assign(new Error('Driver not found'), { statusCode: 404 })
    return driver
  }
}
