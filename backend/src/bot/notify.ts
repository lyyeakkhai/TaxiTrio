import { bot } from './index'

export async function notifyDriver(
  chatId: number,
  booking: { id: string; booking_type: string; travel_date: Date; travel_time: string }
) {
  await bot.api.sendMessage(
    chatId,
    `New booking assigned!\nType: ${booking.booking_type}\nDate: ${booking.travel_date.toISOString().split('T')[0]}\nTime: ${booking.travel_time}`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Accept', callback_data: `accept:${booking.id}` },
            { text: '❌ Reject', callback_data: `reject:${booking.id}` },
          ],
        ],
      },
    }
  )
}
