import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetPaymentAdminUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { booking: true },
    })

    if (!payment) {
      throw Object.assign(new Error('Payment not found'), { statusCode: 404 })
    }

    return payment
  }
}
