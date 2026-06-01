import prisma from '../../../lib/prisma';

type PrismaClient = typeof prisma;

export class ListNotificationsUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string, isRead?: boolean) {
    return this.prisma.notification.findMany({
      where: {
        user_id: userId,
        ...(isRead !== undefined && { is_read: isRead }),
      },
      orderBy: { created_at: 'desc' },
    });
  }
}
