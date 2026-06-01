import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ToggleTaxiUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const taxi = await this.prisma.taxi.findUnique({ where: { id } })

    if (!taxi) {
      throw Object.assign(new Error('Taxi not found'), { statusCode: 404 })
    }

    return this.prisma.taxi.update({
      where: { id },
      data: { is_active: !taxi.is_active },
    })
  }
}
