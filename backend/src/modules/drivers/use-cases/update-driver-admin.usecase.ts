import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class UpdateDriverAdminUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string, dto: { name?: string; phone?: string; languages?: string[]; taxi_id?: string | null }) {
    const driver = await this.prisma.driver.findUnique({ where: { id } })
    if (!driver) throw Object.assign(new Error('Driver not found'), { statusCode: 404 })

    return this.prisma.driver.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.phone && { phone: dto.phone }),
        ...(dto.languages && { languages: dto.languages }),
        ...(dto.taxi_id !== undefined && { taxi_id: dto.taxi_id }),
      },
    })
  }
}
