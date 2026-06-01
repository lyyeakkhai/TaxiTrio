import { prisma } from '../../../lib/prisma'
import { cloudinary } from '../../../lib/cloudinary'
import { CreateRouteDto } from '../route.schema'

type PrismaClient = typeof prisma

export class CreateRouteUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: CreateRouteDto, imageBuffer?: Buffer) {
    let imageUrl: string | null = null
    if (imageBuffer) {
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
        { folder: 'routes' }
      )
      imageUrl = result.secure_url
    }

    return this.prisma.routePackage.create({
      data: {
        name: dto.name,
        origin: dto.origin,
        destination: dto.destination,
        duration_hours: dto.duration_hours,
        price: dto.price,
        included_services: dto.included_services || null,
        recommended_vehicle: dto.recommended_vehicle || null,
        image: imageUrl,
        is_active: true,
        created_at: new Date(),
      },
    })
  }
}
