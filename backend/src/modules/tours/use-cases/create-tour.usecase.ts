import { prisma } from '../../../lib/prisma'
import { cloudinary } from '../../../lib/cloudinary'
import { CreateTourDto } from '../tour.schema'

type PrismaClient = typeof prisma

export class CreateTourUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: CreateTourDto, imageBuffer?: Buffer) {
    let imageUrl: string | null = null
    if (imageBuffer) {
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
        { folder: 'tours' }
      )
      imageUrl = result.secure_url
    }

    return this.prisma.tourPackage.create({
      data: {
        name: dto.name,
        description: dto.description || null,
        duration_hours: dto.duration_hours,
        location: dto.location,
        included_services: dto.included_services || null,
        vehicle_type: dto.vehicle_type || null,
        price: dto.price,
        image: imageUrl,
        is_active: true,
        created_at: new Date(),
      },
    })
  }
}
