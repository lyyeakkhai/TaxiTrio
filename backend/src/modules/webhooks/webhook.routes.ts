import { Router, Request, Response } from 'express'
import { Webhook } from 'svix'
import { prisma } from '../../lib/prisma'
import { logger } from '../../lib/logger'
import { sendPaymentReceipt } from '../../lib/email-templates/payment-receipt'

const router = Router()

router.post('/clerk/billing', async (req: Request, res: Response) => {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) {
    res.status(500).json({ error: 'Webhook secret not configured' })
    return
  }

  const wh = new Webhook(secret)
  let event: { type: string; data: Record<string, unknown> }

  try {
    event = wh.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'] as string,
      'svix-timestamp': req.headers['svix-timestamp'] as string,
      'svix-signature': req.headers['svix-signature'] as string,
    }) as typeof event
  } catch {
    res.status(400).json({ error: 'Invalid signature' })
    return
  }

  const bookingId = event.data.booking_id as string | undefined
  if (!bookingId) {
    res.json({ received: true })
    return
  }

  if (event.type === 'payment.succeeded') {
    const payment = await prisma.payment.update({
      where: { booking_id: bookingId },
      data: { status: 'verified' },
      include: { booking: { include: { customer: true } } },
    })

    await prisma.notification.create({
      data: {
        user_id: payment.booking.customer_id,
        type: 'payment_verified',
        message: 'Your payment has been verified',
        is_read: false,
      },
    })

    sendPaymentReceipt(payment.booking.customer.email, bookingId, Number(payment.amount))
  } else if (event.type === 'payment.failed') {
    await prisma.payment.update({
      where: { booking_id: bookingId },
      data: { status: 'rejected' },
    })
  } else if (event.type === 'refund.created') {
    await prisma.payment.update({
      where: { booking_id: bookingId },
      data: { status: 'refunded' },
    })
  } else {
    logger.info({ type: event.type }, 'unhandled webhook event')
  }

  res.json({ received: true })
})

export default router
