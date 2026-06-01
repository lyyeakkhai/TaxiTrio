import { Request, Response } from 'express'
import { ListToursUseCase } from './use-cases/list-tours.usecase'
import { GetTourUseCase } from './use-cases/get-tour.usecase'

export class TourController {
  constructor(
    private readonly listTours: ListToursUseCase,
    private readonly getTour: GetTourUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<void> {
    res.json(await this.listTours.execute())
  }

  async get(req: Request, res: Response): Promise<void> {
    res.json(await this.getTour.execute(req.params.id as string))
  }
}
