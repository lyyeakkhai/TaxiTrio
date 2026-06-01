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
  ListDriversUseCase,
  GetDriverUseCase,
  UpdateDriverAdminUseCase,
  DeleteDriverUseCase,
  ApproveDriverUseCase,
  RejectDriverUseCase,
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
    private readonly listDrivers: ListDriversUseCase,
    private readonly getDriver: GetDriverUseCase,
    private readonly updateDriverAdmin: UpdateDriverAdminUseCase,
    private readonly deleteDriver: DeleteDriverUseCase,
    private readonly approveDriver: ApproveDriverUseCase,
    private readonly rejectDriver: RejectDriverUseCase,
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

  async adminList(req: Request, res: Response): Promise<void> {
    const verification_status = typeof req.query.verification_status === 'string' ? req.query.verification_status : undefined
    const is_available = req.query.is_available === 'true' ? true : req.query.is_available === 'false' ? false : undefined
    const filters: { verification_status?: string; is_available?: boolean } = {}
    if (verification_status) filters.verification_status = verification_status
    if (is_available !== undefined) filters.is_available = is_available
    res.json(await this.listDrivers.execute(filters))
  }

  async adminGet(req: Request, res: Response): Promise<void> {
    res.json(await this.getDriver.execute(req.params.id as string))
  }

  async adminUpdate(req: Request, res: Response): Promise<void> {
    res.json(await this.updateDriverAdmin.execute(req.params.id as string, req.body))
  }

  async adminDelete(req: Request, res: Response): Promise<void> {
    await this.deleteDriver.execute(req.params.id as string)
    res.status(204).send()
  }

  async adminApprove(req: Request, res: Response): Promise<void> {
    res.json(await this.approveDriver.execute(req.params.id as string))
  }

  async adminReject(req: Request, res: Response): Promise<void> {
    res.json(await this.rejectDriver.execute(req.params.id as string))
  }
}
