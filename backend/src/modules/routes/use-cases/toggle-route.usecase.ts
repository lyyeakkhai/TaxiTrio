import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class ToggleRouteUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const route = await this.prisma.routePackage.findUnique({ where: { id } })

    if (!route) {
      throw Object.assign(new Error('Route not found'), { statusCode: 404 })
    }

    return this.prisma.routePackage.update({
      where: { id },
      data: { is_active: !route.is_active },
    })
  }
}
