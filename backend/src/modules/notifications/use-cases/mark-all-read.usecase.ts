import prisma from '../../../lib/prisma';

type PrismaClient = typeof prisma;

export class MarkAllReadUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string) {
    const result = await this.prisma.notification.updateMany({
      where: { user_id: userId, is_read: false },
      data: { is_read: true },
    });

    return { updated: result.count };
  }
}
