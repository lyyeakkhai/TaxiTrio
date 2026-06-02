import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class DeleteComplaintUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const complaint = await this.prisma.complaint.findUnique({ where: { id } })
    if (!complaint) throw Object.assign(new Error('Complaint not found'), { statusCode: 404 })
    await this.prisma.complaint.delete({ where: { id } })
  }
}
