import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class DeleteDriverUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const activeBookings = await this.prisma.booking.findMany({
      where: {
        driver_id: id,
        status: { notIn: ['completed', 'cancelled', 'rejected'] },
      },
    })

    if (activeBookings.length > 0) {
      throw Object.assign(new Error('Driver has active bookings'), { statusCode: 400 })
    }

    return this.prisma.driver.delete({ where: { id } })
  }
}
