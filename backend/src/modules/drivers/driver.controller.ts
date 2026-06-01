import { Request, Response } from 'express'
import {
  GetDriverProfileUseCase,
  UpdateDriverProfileUseCase,
  ToggleAvailabilityUseCase,
  GetEarningsUseCase,
  GetDriverReviewsUseCase,
  ListDriverBookingsUseCase,
  AcceptBookingUseCase,
  RejectBookingUseCase,
  ArrivedBookingUseCase,
  StartBookingUseCase,
  CompleteBookingUseCase,
} from './use-cases'

export class DriverController {
  constructor(
    private readonly getProfile: GetDriverProfileUseCase,
    private readonly updateProfile: UpdateDriverProfileUseCase,
    private readonly toggleAvailability: ToggleAvailabilityUseCase,
    private readonly getEarnings: GetEarningsUseCase,
    private readonly getReviews: GetDriverReviewsUseCase,
    private readonly listBookings: ListDriverBookingsUseCase,
    private readonly acceptBooking: AcceptBookingUseCase,
    private readonly rejectBooking: RejectBookingUseCase,
    private readonly arrivedBooking: ArrivedBookingUseCase,
    private readonly startBooking: StartBookingUseCase,
    private readonly completeBooking: CompleteBookingUseCase,
  ) {}

  async getProfileHandler(req: Request, res: Response): Promise<void> {
    res.json(await this.getProfile.execute(req.user!.id))
  }

  async updateProfileHandler(req: Request, res: Response): Promise<void> {
    const photoBuffer = req.file?.buffer
    res.json(await this.updateProfile.execute(req.user!.id, req.body, photoBuffer))
  }

  async toggleAvailabilityHandler(req: Request, res: Response): Promise<void> {
    res.json(await this.toggleAvailability.execute(req.user!.id, req.body.is_available))
  }

  async getEarningsHandler(req: Request, res: Response): Promise<void> {
    res.json(await this.getEarnings.execute(req.user!.id))
  }

  async getReviewsHandler(req: Request, res: Response): Promise<void> {
    res.json(await this.getReviews.execute(req.user!.id))
  }

  async listBookingsHandler(req: Request, res: Response): Promise<void> {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined
    res.json(await this.listBookings.execute(req.user!.id, status))
  }

  async acceptBookingHandler(req: Request, res: Response): Promise<void> {
    res.json(await this.acceptBooking.execute(req.params.id as string, req.user!.id))
  }

  async rejectBookingHandler(req: Request, res: Response): Promise<void> {
    res.json(await this.rejectBooking.execute(req.params.id as string, req.user!.id))
  }

  async arrivedBookingHandler(req: Request, res: Response): Promise<void> {
    res.json(await this.arrivedBooking.execute(req.params.id as string, req.user!.id))
  }

  async startBookingHandler(req: Request, res: Response): Promise<void> {
    res.json(await this.startBooking.execute(req.params.id as string, req.user!.id))
  }

  async completeBookingHandler(req: Request, res: Response): Promise<void> {
    res.json(await this.completeBooking.execute(req.params.id as string, req.user!.id))
  }
}
