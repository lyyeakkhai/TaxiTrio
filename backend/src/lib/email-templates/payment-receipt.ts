import { resend } from '../resend'
import { logger } from '../logger'

export function sendPaymentReceipt(to: string, bookingId: string, amount: number) {
  resend.emails.send({
    from: 'TaxiTrio <noreply@taxitrio.com>',
    to,
    subject: 'Payment Receipt',
    html: `<p>Payment of <strong>$${amount}</strong> for booking <strong>${bookingId}</strong> has been verified.</p>`,
  }).catch((err: unknown) => logger.error({ err }, 'payment receipt email failed'))
}
