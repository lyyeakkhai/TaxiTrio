import { prisma } from '../../../lib/prisma'
import { cloudinary } from '../../../lib/cloudinary'
import { UpdateTourDto } from '../tour.schema'

type PrismaClient = typeof prisma

export class UpdateTourUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string, dto: UpdateTourDto, imageBuffer?: Buffer) {
    const tour = await this.prisma.tourPackage.findUnique({ where: { id } })

    if (!tour) {
      throw Object.assign(new Error('Tour not found'), { statusCode: 404 })
    }

    let imageUrl: string | null = tour.image
    if (imageBuffer) {
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
        { folder: 'tours' }
      )
      imageUrl = result.secure_url
    }

    return this.prisma.tourPackage.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        duration_hours: dto.duration_hours,
        location: dto.location,
        included_services: dto.included_services,
        vehicle_type: dto.vehicle_type,
        price: dto.price,
        image: imageUrl,
      },
    })
  }
}
