import { prisma } from '../../../lib/prisma'
import { CreateComplaintDto } from '../complaint.schema'

type PrismaClient = typeof prisma

export class CreateComplaintUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: CreateComplaintDto, customerId: string) {
    return this.prisma.complaint.create({
      data: {
        booking_id: dto.booking_id,
        customer_id: customerId,
        category: dto.category,
        description: dto.description,
        status: 'open',
      },
    })
  }
}
