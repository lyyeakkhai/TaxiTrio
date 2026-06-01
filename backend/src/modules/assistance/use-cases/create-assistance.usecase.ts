import { prisma } from '../../../lib/prisma'
import { CreateAssistanceDto } from '../assistance.schema'

type PrismaClient = typeof prisma

export class CreateAssistanceUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: CreateAssistanceDto) {
    return this.prisma.touristAssistance.create({
      data: dto,
    })
  }
}
