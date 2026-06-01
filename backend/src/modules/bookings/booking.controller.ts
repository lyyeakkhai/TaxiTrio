import { Request, Response } from 'express'
import {
  CreateBookingUseCase,
  ListMyBookingsUseCase,
  GetBookingUseCase,
  CancelBookingUseCase,
  ListBookingsAdminUseCase,
  AssignBookingUseCase,
  CancelBookingAdminUseCase,
} from './use-cases'

export class BookingController {
  constructor(
    private readonly createBooking: CreateBookingUseCase,
    private readonly listMyBookings: ListMyBookingsUseCase,
    private readonly getBooking: GetBookingUseCase,
    private readonly cancelBooking: CancelBookingUseCase,
    private readonly listBookingsAdmin: ListBookingsAdminUseCase,
    private readonly assignBooking: AssignBookingUseCase,
    private readonly cancelBookingAdmin: CancelBookingAdminUseCase,
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

  async adminList(req: Request, res: Response): Promise<void> {
    const filters: { status?: string; driver_id?: string; date?: string } = {}
    if (typeof req.query.status === 'string') filters.status = req.query.status
    if (typeof req.query.driver_id === 'string') filters.driver_id = req.query.driver_id
    if (typeof req.query.date === 'string') filters.date = req.query.date
    res.json(await this.listBookingsAdmin.execute(filters))
  }

  async adminGet(req: Request, res: Response): Promise<void> {
    const booking = await this.getBooking.execute(req.params.id as string, req.user!.id)
    res.json(booking)
  }

  async adminAssign(req: Request, res: Response): Promise<void> {
    res.json(await this.assignBooking.execute(req.params.id as string, req.body.driver_id, req.user!.id))
  }

  async adminCancel(req: Request, res: Response): Promise<void> {
    res.json(await this.cancelBookingAdmin.execute(req.params.id as string, req.user!.id))
  }
}
