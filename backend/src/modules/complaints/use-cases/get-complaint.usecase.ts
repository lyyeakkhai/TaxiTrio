import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetComplaintUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const complaint = await this.prisma.complaint.findUnique({
      where: { id },
      include: { customer: true, booking: true },
    })

    if (!complaint) {
      throw Object.assign(new Error('Complaint not found'), { statusCode: 404 })
    }

    return complaint
  }
}
