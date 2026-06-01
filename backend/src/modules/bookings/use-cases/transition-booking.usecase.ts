import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

const VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ['assigned', 'cancelled'],
  assigned: ['accepted', 'rejected'],
  accepted: ['driver_arrived'],
  driver_arrived: ['in_progress'],
  in_progress: ['completed'],
  completed: [],
  cancelled: [],
  rejected: [],
}

export class TransitionBookingUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(bookingId: string, toStatus: string, changedById: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } })
    if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 })

    const allowed = VALID_TRANSITIONS[booking.status] ?? []
    if (!allowed.includes(toStatus)) {
      throw Object.assign(
        new Error(`Cannot transition from ${booking.status} to ${toStatus}`),
        { statusCode: 400 }
      )
    }

    const [updated] = await this.prisma.$transaction([
      this.prisma.booking.update({ where: { id: bookingId }, data: { status: toStatus } }),
      this.prisma.bookingStatusHistory.create({
        data: { booking_id: bookingId, status: toStatus, changed_by: changedById },
      }),
    ])

    return updated
  }
}
