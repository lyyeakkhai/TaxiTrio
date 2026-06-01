import { prisma } from '../../../lib/prisma'
import { cloudinary } from '../../../lib/cloudinary'
import { UpdateDriverProfileDto } from '../driver.schema'

type PrismaClient = typeof prisma

export class UpdateDriverProfileUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string, dto: UpdateDriverProfileDto, photoBuffer?: Buffer) {
    const driver = await this.prisma.driver.findUnique({ where: { user_id: userId } })
    if (!driver) throw Object.assign(new Error('Driver not found'), { statusCode: 404 })

    const updateData: any = {}
    if (dto.languages) updateData.languages = dto.languages

    if (photoBuffer) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'drivers' },
          (error, result) => (error ? reject(error) : resolve(result))
        )
        stream.end(photoBuffer)
      })
      updateData.profile_photo = (result as any).secure_url
    }

    const userUpdateData: any = {}
    if (dto.name) userUpdateData.name = dto.name
    if (dto.phone) userUpdateData.phone = dto.phone
    if (photoBuffer) userUpdateData.profile_photo = updateData.profile_photo

    await this.prisma.user.update({ where: { id: userId }, data: userUpdateData })

    const updated = await this.prisma.driver.update({
      where: { id: driver.id },
      data: updateData,
      include: { user: true },
    })

    return updated
  }
}
