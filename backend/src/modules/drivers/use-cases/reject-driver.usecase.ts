import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class RejectDriverUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const driver = await this.prisma.driver.findUnique({ where: { id } })
    if (!driver) throw Object.assign(new Error('Driver not found'), { statusCode: 404 })
    if (driver.verification_status !== 'pending') {
      throw Object.assign(new Error('Driver is not pending'), { statusCode: 400 })
    }

    return this.prisma.driver.update({
      where: { id },
      data: { verification_status: 'rejected' },
    })
  }
}
