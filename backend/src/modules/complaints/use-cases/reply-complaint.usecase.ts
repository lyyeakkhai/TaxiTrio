import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ReplyComplaintUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string, reply: string) {
    const complaint = await this.prisma.complaint.findUnique({ where: { id } })

    if (!complaint) {
      throw Object.assign(new Error('Complaint not found'), { statusCode: 404 })
    }

    if (complaint.status === 'resolved') {
      throw Object.assign(new Error('Cannot reply to resolved complaint'), { statusCode: 400 })
    }

    const updated = await this.prisma.complaint.update({
      where: { id },
      data: {
        admin_reply: reply,
        status: 'replied',
        replied_at: new Date(),
      },
      include: { customer: true, booking: true },
    })

    await this.prisma.notification.create({
      data: {
        user_id: complaint.customer_id,
        type: 'complaint_replied',
        message: 'Admin has replied to your complaint',
        is_read: false,
      },
    })

    return updated
  }
}
