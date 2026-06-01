import { prisma } from '../../../lib/prisma'
import { CreateUserDto } from '../user.schema'

type PrismaClient = typeof prisma

export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: CreateUserDto & { clerkId: string }) {
    const existing = await this.prisma.user.findUnique({
      where: { clerk_id: dto.clerkId },
    })

    if (existing) {
      throw Object.assign(new Error('User already exists'), { statusCode: 409 })
    }

    return this.prisma.user.create({
      data: {
        clerk_id: dto.clerkId,
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        role: dto.role,
      },
    })
  }
}
