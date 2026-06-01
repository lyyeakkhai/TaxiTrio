import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetEarningsUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string) {
    const driver = await this.prisma.driver.findUnique({ where: { user_id: userId } })
    if (!driver) throw Object.assign(new Error('Driver not found'), { statusCode: 404 })

    const earnings = await this.prisma.driverEarning.findMany({
      where: { driver_id: driver.id },
    })

    const total_earnings = earnings.reduce((sum: number, e: any) => sum + Number(e.amount), 0)
    const completed_trips = earnings.length

    return {
      total_earnings,
      completed_trips,
      average_rating: driver.rating,
      earnings,
    }
  }
}
