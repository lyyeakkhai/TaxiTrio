import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetDriverProfileUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { user_id: userId },
      include: { user: true },
    })
    if (!driver) throw Object.assign(new Error('Driver not found'), { statusCode: 404 })
    return driver
  }
}
