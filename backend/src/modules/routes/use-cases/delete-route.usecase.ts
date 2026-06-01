import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class DeleteRouteUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const route = await this.prisma.routePackage.findUnique({ where: { id } })

    if (!route) {
      throw Object.assign(new Error('Route not found'), { statusCode: 404 })
    }

    const activeBookingCount = await this.prisma.booking.count({
      where: {
        route_package_id: id,
        status: { notIn: ['completed', 'cancelled', 'rejected'] },
      },
    })

    if (activeBookingCount > 0) {
      throw Object.assign(new Error('Route has active bookings'), { statusCode: 400 })
    }

    return this.prisma.routePackage.delete({ where: { id } })
  }
}
