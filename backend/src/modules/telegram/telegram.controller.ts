import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { GenerateTelegramCodeUseCase } from './use-cases'
import { TransitionBookingUseCase } from '../bookings/use-cases'
import { bot } from '../../bot'

export class TelegramController {
  private generateCodeUseCase = new GenerateTelegramCodeUseCase(prisma)
  private transitionBookingUseCase = new TransitionBookingUseCase(prisma)

  async generateCode(req: Request, res: Response) {
    const result = await this.generateCodeUseCase.execute(req.user!.id)
    res.json(result)
  }

  async handleWebhook(req: Request, res: Response) {
    const update = req.body

    if (update.message?.text?.startsWith('/link ')) {
      const code = update.message.text.slice(6).trim()
      const chatId = update.message.chat.id

      const linkCode = await prisma.telegramLinkCode.findUnique({
        where: { code },
      })

      if (!linkCode || linkCode.expires_at < new Date()) {
        await bot.api.sendMessage(chatId, 'Invalid or expired code')
      } else {
        await prisma.telegramLinkCode.delete({
          where: { id: linkCode.id },
        })
        await bot.api.sendMessage(chatId, 'Successfully linked to TaxiTrio!')
      }
    }

    if (update.callback_query?.data?.startsWith('accept:')) {
      const bookingId = update.callback_query.data.slice(7)
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
      })

      if (booking) {
        await this.transitionBookingUseCase.execute(bookingId, 'accepted', booking.driver_id!)
        await bot.api.answerCallbackQuery(update.callback_query.id, {
          text: 'Booking accepted',
        })
      }
    }

    if (update.callback_query?.data?.startsWith('reject:')) {
      const bookingId = update.callback_query.data.slice(7)
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
      })

      if (booking) {
        await this.transitionBookingUseCase.execute(bookingId, 'rejected', booking.driver_id!)
        await bot.api.answerCallbackQuery(update.callback_query.id, {
          text: 'Booking rejected',
        })
      }
    }

    res.json({ ok: true })
  }
}
