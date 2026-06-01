import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetMeUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(clerkId: string) {
    const user = await this.prisma.user.findUnique({ where: { clerk_id: clerkId } })
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 })
    return user
  }
}
