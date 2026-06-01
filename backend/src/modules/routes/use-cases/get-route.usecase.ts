import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetRouteUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    const route = await this.prisma.routePackage.findFirst({
      where: { id, is_active: true },
    })
    if (!route) throw Object.assign(new Error('Route not found'), { statusCode: 404 })
    return route
  }
}
