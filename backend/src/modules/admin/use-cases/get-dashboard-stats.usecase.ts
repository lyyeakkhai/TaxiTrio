import { prisma } from '../../../lib/prisma'

type PrismaClient = typeof prisma

export class GetDashboardStatsUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute() {
    const [totalRevenue, completedTrips, pendingBookings, openComplaints, pendingDrivers] =
      await Promise.all([
        this.prisma.payment.aggregate({ _sum: { net_amount: true } }),
        this.prisma.booking.count({ where: { status: 'completed' } }),
        this.prisma.booking.count({ where: { status: 'pending' } }),
        this.prisma.complaint.count({ where: { status: 'open' } }),
        this.prisma.driver.count({ where: { verification_status: 'pending' } }),
      ])

    return {
      total_revenue: Number(totalRevenue._sum.net_amount ?? 0),
      completed_trips: completedTrips,
      pending_bookings: pendingBookings,
      open_complaints: openComplaints,
      pending_drivers: pendingDrivers,
    }
  }
}
