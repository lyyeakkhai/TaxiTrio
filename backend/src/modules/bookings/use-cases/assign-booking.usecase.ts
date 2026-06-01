import { prisma } from '../../../lib/prisma'
import { TransitionBookingUseCase } from './transition-booking.usecase'
import { notifyDriver } from '../../../bot/notify'

type PrismaClient = typeof prisma

export class AssignBookingUseCase {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly transition: TransitionBookingUseCase,
  ) {}

  async execute(bookingId: string, driverId: string, adminUserId: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } })
    if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 })

    const driver = await this.prisma.driver.findUnique({ where: { id: driverId } })
    if (!driver) throw Object.assign(new Error('Driver not found'), { statusCode: 404 })

    if (driver.verification_status !== 'approved') {
      throw Object.assign(new Error('Driver not approved'), { statusCode: 400 })
    }
    if (!driver.is_available) {
      throw Object.assign(new Error('Driver not available'), { statusCode: 400 })
    }

    await this.transition.execute(bookingId, 'assigned', adminUserId)

    const updated = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { driver_id: driverId },
      include: { customer: true, driver: true, status_history: { orderBy: { changed_at: 'asc' } } },
    })

    await this.prisma.notification.create({
      data: {
        user_id: driver.user_id,
        type: 'driver_assigned',
        message: 'You have a new booking assignment',
        is_read: false,
      },
    })

    const driverUser = await this.prisma.user.findUnique({ where: { id: driver.user_id } })
    if (driverUser) {
      try {
        const telegramCode = await this.prisma.telegramLinkCode.findFirst({
          where: { driver_id: driverId },
          orderBy: { created_at: 'desc' },
        })
        if (telegramCode) {
          const chatIdStr = telegramCode.code
          const chatId = parseInt(chatIdStr, 10)
          if (!isNaN(chatId)) {
            await notifyDriver(chatId, {
              id: booking.id,
              booking_type: booking.booking_type,
              travel_date: booking.travel_date,
              travel_time: booking.travel_time,
            })
          }
        }
      } catch (err) {
        // Telegram notification failure should not break the response
      }
    }

    return updated
  }
}
