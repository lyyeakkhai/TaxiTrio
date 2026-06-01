import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ToggleAvailabilityUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string, isAvailable: boolean) {
    const driver = await this.prisma.driver.findUnique({ where: { user_id: userId } })
    if (!driver) throw Object.assign(new Error('Driver not found'), { statusCode: 404 })

    return await this.prisma.driver.update({
      where: { id: driver.id },
      data: { is_available: isAvailable },
    })
  }
}
