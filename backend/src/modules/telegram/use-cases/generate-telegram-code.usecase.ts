import { PrismaClient } from '@prisma/client'
import { env } from '../../../config/env'

export class GenerateTelegramCodeUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { user_id: userId },
    })

    if (!driver) {
      const err = new Error('Driver not found')
      Object.assign(err, { statusCode: 404 })
      throw err
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await this.prisma.telegramLinkCode.deleteMany({
      where: { driver_id: driver.id },
    })

    await this.prisma.telegramLinkCode.create({
      data: {
        driver_id: driver.id,
        code,
        expires_at: expiresAt,
      },
    })

    return {
      code,
      expires_at: expiresAt,
      bot_link: `https://t.me/${env.TELEGRAM_BOT_USERNAME}?start=${code}`,
    }
  }
}
