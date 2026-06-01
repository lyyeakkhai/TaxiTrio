import { Request, Response } from 'express'
import { ListToursUseCase, GetTourUseCase, CreateTourUseCase, UpdateTourUseCase, DeleteTourUseCase, ToggleTourUseCase } from './use-cases'
import { CreateTourDto, UpdateTourDto } from './tour.schema'

export class TourController {
  constructor(
    private readonly listTours: ListToursUseCase,
    private readonly getTour: GetTourUseCase,
    private readonly createTour: CreateTourUseCase,
    private readonly updateTour: UpdateTourUseCase,
    private readonly deleteTour: DeleteTourUseCase,
    private readonly toggleTour: ToggleTourUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<void> {
    res.json(await this.listTours.execute())
  }

  async get(req: Request, res: Response): Promise<void> {
    res.json(await this.getTour.execute(req.params.id as string))
  }

  async adminCreate(req: Request, res: Response): Promise<void> {
    const dto = req.body as CreateTourDto
    const imageBuffer = req.file?.buffer
    res.status(201).json(await this.createTour.execute(dto, imageBuffer))
  }

  async adminUpdate(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    const dto = req.body as UpdateTourDto
    const imageBuffer = req.file?.buffer
    res.json(await this.updateTour.execute(id, dto, imageBuffer))
  }

  async adminDelete(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    await this.deleteTour.execute(id)
    res.status(204).send()
  }

  async adminToggle(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    res.json(await this.toggleTour.execute(id))
  }
}
