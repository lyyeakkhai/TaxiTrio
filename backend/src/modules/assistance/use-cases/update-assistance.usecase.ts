import { prisma } from '../../../lib/prisma'
import { UpdateAssistanceDto } from '../assistance.schema'

type PrismaClient = typeof prisma

export class UpdateAssistanceUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string, dto: UpdateAssistanceDto) {
    const assistance = await this.prisma.touristAssistance.findUnique({ where: { id } })

    if (!assistance) {
      throw Object.assign(new Error('Assistance not found'), { statusCode: 404 })
    }

    return this.prisma.touristAssistance.update({
      where: { id },
      data: dto,
    })
  }
}
