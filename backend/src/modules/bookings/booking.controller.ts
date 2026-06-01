import { Request, Response } from 'express'
import {
  CreateBookingUseCase,
  ListMyBookingsUseCase,
  GetBookingUseCase,
  CancelBookingUseCase,
} from './use-cases'

export class BookingController {
  constructor(
    private readonly createBooking: CreateBookingUseCase,
    private readonly listMyBookings: ListMyBookingsUseCase,
    private readonly getBooking: GetBookingUseCase,
    private readonly cancelBooking: CancelBookingUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const booking = await this.createBooking.execute(req.body, req.user!.id)
    res.status(201).json(booking)
  }

  async listMy(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page as string) || 1
    const limit = Number(req.query.limit as string) || 10
    res.json(await this.listMyBookings.execute(req.user!.id, page, limit))
  }

  async get(req: Request, res: Response): Promise<void> {
    res.json(await this.getBooking.execute(req.params.id as string, req.user!.id))
  }

  async cancel(req: Request, res: Response): Promise<void> {
    res.json(await this.cancelBooking.execute(req.params.id as string, req.user!.id))
  }
}
