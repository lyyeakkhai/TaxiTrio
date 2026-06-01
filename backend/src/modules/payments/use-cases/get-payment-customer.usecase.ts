import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetPaymentCustomerUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(bookingId: string, customerId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { booking_id: bookingId },
      include: { booking: true },
    })

    if (!payment) throw Object.assign(new Error('Payment not found'), { statusCode: 404 })
    if (payment.booking.customer_id !== customerId)
      throw Object.assign(new Error('Forbidden'), { statusCode: 403 })

    return payment
  }
}
