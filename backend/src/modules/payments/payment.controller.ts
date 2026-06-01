import { Request, Response } from 'express'
import { ListPaymentsAdminUseCase, GetPaymentAdminUseCase } from './use-cases'

export class PaymentController {
  constructor(
    private readonly listPayments: ListPaymentsAdminUseCase,
    private readonly getPayment: GetPaymentAdminUseCase,
  ) {}

  async adminList(req: Request, res: Response): Promise<void> {
    const filters: { status?: string; booking_id?: string } = {}
    if (typeof req.query.status === 'string') filters.status = req.query.status
    if (typeof req.query.booking_id === 'string') filters.booking_id = req.query.booking_id
    res.json(await this.listPayments.execute(filters))
  }

  async adminGet(req: Request, res: Response): Promise<void> {
    res.json(await this.getPayment.execute(req.params.id as string))
  }
}
