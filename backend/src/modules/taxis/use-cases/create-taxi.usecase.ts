import { prisma } from '../../../lib/prisma'
import { cloudinary } from '../../../lib/cloudinary'
import { CreateTaxiDto } from '../taxi.schema'

type PrismaClient = typeof prisma

export class CreateTaxiUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: CreateTaxiDto, photoBuffer?: Buffer) {
    const existing = await this.prisma.taxi.findUnique({
      where: { plate_number: dto.plate_number },
    })

    if (existing) {
      throw Object.assign(new Error('Plate number already exists'), { statusCode: 409 })
    }

    let photoUrl: string | null = null
    if (photoBuffer) {
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${photoBuffer.toString('base64')}`,
        { folder: 'taxis' }
      )
      photoUrl = result.secure_url
    }

    return this.prisma.taxi.create({
      data: {
        model: dto.model,
        plate_number: dto.plate_number,
        type: dto.type,
        passenger_capacity: dto.passenger_capacity,
        luggage_capacity: dto.luggage_capacity,
        comfort_category: dto.comfort_category,
        photo: photoUrl,
        created_at: new Date(),
      },
    })
  }
}
