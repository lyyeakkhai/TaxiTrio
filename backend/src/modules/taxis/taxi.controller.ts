import { Request, Response } from 'express'
import { ListTaxisUseCase, CreateTaxiUseCase, UpdateTaxiUseCase, DeleteTaxiUseCase, ToggleTaxiUseCase } from './use-cases'
import { CreateTaxiDto, UpdateTaxiDto } from './taxi.schema'

export class TaxiController {
  constructor(
    private readonly listTaxis: ListTaxisUseCase,
    private readonly createTaxi: CreateTaxiUseCase,
    private readonly updateTaxi: UpdateTaxiUseCase,
    private readonly deleteTaxi: DeleteTaxiUseCase,
    private readonly toggleTaxi: ToggleTaxiUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<void> {
    res.json(await this.listTaxis.execute())
  }

  async adminCreate(req: Request, res: Response): Promise<void> {
    const dto = req.body as CreateTaxiDto
    const photoBuffer = req.file?.buffer
    res.status(201).json(await this.createTaxi.execute(dto, photoBuffer))
  }

  async adminUpdate(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    const dto = req.body as UpdateTaxiDto
    const photoBuffer = req.file?.buffer
    res.json(await this.updateTaxi.execute(id, dto, photoBuffer))
  }

  async adminDelete(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    await this.deleteTaxi.execute(id)
    res.status(204).send()
  }

  async adminToggle(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    res.json(await this.toggleTaxi.execute(id))
  }
}
