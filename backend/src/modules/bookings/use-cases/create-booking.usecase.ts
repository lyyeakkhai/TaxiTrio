import { prisma } from '../../../lib/prisma'
import { CreateBookingDto } from '../booking.schema'
import { sendBookingConfirmation } from '../../../lib/email-templates/booking-confirmation'

type PrismaClient = typeof prisma

export class CreateBookingUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: CreateBookingDto, customerId: string) {
    const booking = await this.prisma.booking.create({
      data: {
        customer_id: customerId,
        booking_type: dto.booking_type,
        taxi_id: dto.taxi_id,
        route_package_id: dto.route_package_id,
        tour_package_id: dto.tour_package_id,
        travel_date: new Date(dto.travel_date),
        travel_time: dto.travel_time,
        passenger_count: dto.passenger_count,
        payment_method: dto.payment_method,
        special_notes: dto.special_notes,
        status: 'pending',
      },
      include: { customer: true },
    })

    await this.prisma.bookingStatusHistory.create({
      data: { booking_id: booking.id, status: 'pending', changed_by: customerId },
    })

    await this.prisma.notification.create({
      data: {
        user_id: customerId,
        type: 'booking_created',
        message: `Your booking has been created`,
        is_read: false,
      },
    })

    sendBookingConfirmation(booking.customer.email, booking.id)

    return booking
  }
}
