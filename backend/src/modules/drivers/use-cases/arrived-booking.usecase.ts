import { prisma } from '../../../lib/prisma'
import { TransitionBookingUseCase } from '../../bookings/use-cases'

type PrismaClient = typeof prisma

export class ArrivedBookingUseCase {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly transition: TransitionBookingUseCase
  ) {}

  async execute(bookingId: string, userId: string) {
    const driver = await this.prisma.driver.findUnique({ where: { user_id: userId } })
    if (!driver) throw Object.assign(new Error('Driver not found'), { statusCode: 404 })

    const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } })
    if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 })
    if (booking.driver_id !== driver.id) throw Object.assign(new Error('Forbidden'), { statusCode: 403 })

    return await this.transition.execute(bookingId, 'driver_arrived', userId)
  }
}
