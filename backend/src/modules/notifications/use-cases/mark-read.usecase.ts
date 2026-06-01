import prisma from '../../../lib/prisma';

type PrismaClient = typeof prisma;

export class MarkReadUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      const error = new Error('Notification not found');
      (error as any).statusCode = 404;
      throw error;
    }

    if (notification.user_id !== userId) {
      const error = new Error('Forbidden');
      (error as any).statusCode = 403;
      throw error;
    }

    return this.prisma.notification.update({
      where: { id },
      data: { is_read: true },
    });
  }
}
