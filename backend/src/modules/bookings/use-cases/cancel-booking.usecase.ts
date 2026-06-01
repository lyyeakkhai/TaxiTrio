import { prisma } from '../../../lib/prisma'
import { TransitionBookingUseCase } from './transition-booking.usecase'

type PrismaClient = typeof prisma

export class CancelBookingUseCase {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly transition: TransitionBookingUseCase,
  ) {}

  async execute(bookingId: string, customerId: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } })
    if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 })
    if (booking.customer_id !== customerId) throw Object.assign(new Error('Forbidden'), { statusCode: 403 })
    return this.transition.execute(bookingId, 'cancelled', customerId)
  }
}
