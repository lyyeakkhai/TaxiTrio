import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ListUsersUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(role?: string) {
    return this.prisma.user.findMany({
      where: role ? { role } : undefined,
    })
  }
}
