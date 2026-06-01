import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListBookingsAdminUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(filters: { status?: string; driver_id?: string; date?: string }) {
    const where: any = {}
    if (filters.status) where.status = filters.status
    if (filters.driver_id) where.driver_id = filters.driver_id
    if (filters.date) {
      const dateStart = new Date(filters.date)
      const dateEnd = new Date(filters.date)
      dateEnd.setDate(dateEnd.getDate() + 1)
      where.travel_date = { gte: dateStart, lt: dateEnd }
    }

    return this.prisma.booking.findMany({
      where,
      include: { customer: true, driver: true, status_history: { orderBy: { changed_at: 'asc' } } },
    })
  }
}
