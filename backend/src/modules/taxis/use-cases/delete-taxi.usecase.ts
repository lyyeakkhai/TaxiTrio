import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class DeleteTaxiUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const taxi = await this.prisma.taxi.findUnique({ where: { id } })

    if (!taxi) {
      throw Object.assign(new Error('Taxi not found'), { statusCode: 404 })
    }

    const bookingCount = await this.prisma.booking.count({
      where: { taxi_id: id },
    })

    if (bookingCount > 0) {
      return this.prisma.taxi.update({
        where: { id },
        data: { is_active: false },
      })
    }

    return this.prisma.taxi.delete({ where: { id } })
  }
}
