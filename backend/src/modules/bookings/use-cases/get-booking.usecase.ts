import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetBookingUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(bookingId: string, requesterId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { status_history: { orderBy: { changed_at: 'asc' } } },
    })
    if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 })
    if (booking.customer_id !== requesterId) throw Object.assign(new Error('Forbidden'), { statusCode: 403 })
    return booking
  }
}
