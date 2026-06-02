import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class MarkReadUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({ where: { id } })
    if (!notification) throw Object.assign(new Error('Notification not found'), { statusCode: 404 })
    if (notification.user_id !== userId) throw Object.assign(new Error('Forbidden'), { statusCode: 403 })
    return this.prisma.notification.update({ where: { id }, data: { is_read: true } })
  }
}
