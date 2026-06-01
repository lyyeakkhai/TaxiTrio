import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ResolveComplaintUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const complaint = await this.prisma.complaint.findUnique({ where: { id } })

    if (!complaint) {
      throw Object.assign(new Error('Complaint not found'), { statusCode: 404 })
    }

    if (complaint.status === 'resolved') {
      throw Object.assign(new Error('Complaint already resolved'), { statusCode: 400 })
    }

    return this.prisma.complaint.update({
      where: { id },
      data: { status: 'resolved' },
      include: { customer: true, booking: true },
    })
  }
}
