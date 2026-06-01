import { prisma } from '../../../lib/prisma'
import { cloudinary } from '../../../lib/cloudinary'
import { UpdateTaxiDto } from '../taxi.schema'

type PrismaClient = typeof prisma

export class UpdateTaxiUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string, dto: UpdateTaxiDto, photoBuffer?: Buffer) {
    const taxi = await this.prisma.taxi.findUnique({ where: { id } })

    if (!taxi) {
      throw Object.assign(new Error('Taxi not found'), { statusCode: 404 })
    }

    let photoUrl: string | undefined
    if (photoBuffer) {
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${photoBuffer.toString('base64')}`,
        { folder: 'taxis' }
      )
      photoUrl = result.secure_url
    }

    return this.prisma.taxi.update({
      where: { id },
      data: {
        ...(dto.model && { model: dto.model }),
        ...(dto.plate_number && { plate_number: dto.plate_number }),
        ...(dto.type && { type: dto.type }),
        ...(dto.passenger_capacity !== undefined && { passenger_capacity: dto.passenger_capacity }),
        ...(dto.luggage_capacity !== undefined && { luggage_capacity: dto.luggage_capacity }),
        ...(dto.comfort_category && { comfort_category: dto.comfort_category }),
        ...(photoUrl && { photo: photoUrl }),
      },
    })
  }
}
