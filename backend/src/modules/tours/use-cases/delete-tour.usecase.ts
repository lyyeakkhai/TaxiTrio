import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class DeleteTourUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const tour = await this.prisma.tourPackage.findUnique({ where: { id } })

    if (!tour) {
      throw Object.assign(new Error('Tour not found'), { statusCode: 404 })
    }

    const activeBookingCount = await this.prisma.booking.count({
      where: {
        tour_package_id: id,
        status: { notIn: ['completed', 'cancelled', 'rejected'] },
      },
    })

    if (activeBookingCount > 0) {
      throw Object.assign(new Error('Tour has active bookings'), { statusCode: 400 })
    }

    return this.prisma.tourPackage.delete({ where: { id } })
  }
}
