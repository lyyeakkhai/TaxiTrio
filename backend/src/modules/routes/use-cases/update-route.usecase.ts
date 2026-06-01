import { prisma } from '../../../lib/prisma'
import { cloudinary } from '../../../lib/cloudinary'
import { UpdateRouteDto } from '../route.schema'

type PrismaClient = typeof prisma

export class UpdateRouteUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string, dto: UpdateRouteDto, imageBuffer?: Buffer) {
    const route = await this.prisma.routePackage.findUnique({ where: { id } })

    if (!route) {
      throw Object.assign(new Error('Route not found'), { statusCode: 404 })
    }

    let imageUrl: string | null = route.image
    if (imageBuffer) {
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
        { folder: 'routes' }
      )
      imageUrl = result.secure_url
    }

    return this.prisma.routePackage.update({
      where: { id },
      data: {
        name: dto.name,
        origin: dto.origin,
        destination: dto.destination,
        duration_hours: dto.duration_hours,
        price: dto.price,
        included_services: dto.included_services,
        recommended_vehicle: dto.recommended_vehicle,
        image: imageUrl,
      },
    })
  }
}
