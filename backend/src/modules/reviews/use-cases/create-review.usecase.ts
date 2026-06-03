import { prisma } from '../../../lib/prisma'
import { CreateReviewDto } from '../review.schema'

type PrismaClient = typeof prisma

export class CreateReviewUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: CreateReviewDto, customerId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.booking_id },
    })

    if (!booking) {
      throw Object.assign(new Error('Booking not found'), { statusCode: 400 })
    }

    if (booking.status !== 'completed') {
      throw Object.assign(new Error('Booking must be completed to review'), { statusCode: 400 })
    }

    if (booking.customer_id !== customerId) {
      throw Object.assign(new Error('Unauthorized'), { statusCode: 403 })
    }

    if (!booking.driver_id) {
      throw Object.assign(new Error('No driver assigned to booking'), { statusCode: 400 })
    }

    const review = await this.prisma.review.create({
      data: {
        booking_id: dto.booking_id,
        customer_id: customerId,
        driver_id: booking.driver_id,
        rating: dto.rating,
        message: dto.message,
      },
      include: { customer: true, driver: true, booking: true },
    })

    const avgRating = await this.prisma.review.aggregate({
      _avg: { rating: true },
      where: { driver_id: booking.driver_id },
    })

    await this.prisma.driver.update({
      where: { id: booking.driver_id },
      data: { rating: avgRating._avg.rating },
    })

    return review
  }
}
