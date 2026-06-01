import { prisma } from '../../../lib/prisma'
import { TransitionBookingUseCase } from './transition-booking.usecase'

type PrismaClient = typeof prisma

const TERMINAL_STATUSES = ['completed', 'cancelled', 'rejected']

export class CancelBookingAdminUseCase {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly transition: TransitionBookingUseCase,
  ) {}

  async execute(bookingId: string, adminUserId: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } })
    if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 })

    if (TERMINAL_STATUSES.includes(booking.status)) {
      throw Object.assign(new Error('Cannot cancel a booking in terminal status'), { statusCode: 400 })
    }

    return this.transition.execute(bookingId, 'cancelled', adminUserId)
  }
}
