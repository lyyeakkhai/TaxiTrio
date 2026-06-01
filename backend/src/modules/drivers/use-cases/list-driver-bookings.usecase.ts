import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListDriverBookingsUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string, status?: string) {
    const driver = await this.prisma.driver.findUnique({ where: { user_id: userId } })
    if (!driver) throw Object.assign(new Error('Driver not found'), { statusCode: 404 })

    const where: any = { driver_id: driver.id }
    if (status) where.status = status

    return await this.prisma.booking.findMany({
      where,
      include: { status_history: true },
    })
  }
}
