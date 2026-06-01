import { resend } from '../resend'
import { logger } from '../logger'

export function sendBookingConfirmation(to: string, bookingId: string) {
  resend.emails.send({
    from: 'TaxiTrio <noreply@taxitrio.com>',
    to,
    subject: 'Booking Confirmed',
    html: `<p>Your booking <strong>${bookingId}</strong> has been confirmed.</p>`,
  }).catch((err: unknown) => logger.error({ err }, 'booking confirmation email failed'))
}
