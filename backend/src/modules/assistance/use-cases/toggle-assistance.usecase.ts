import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ToggleAssistanceUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const assistance = await this.prisma.touristAssistance.findUnique({ where: { id } })

    if (!assistance) {
      throw Object.assign(new Error('Assistance not found'), { statusCode: 404 })
    }

    return this.prisma.touristAssistance.update({
      where: { id },
      data: { is_active: !assistance.is_active },
    })
  }
}
