import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetUserUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 })
    return user
  }
}
