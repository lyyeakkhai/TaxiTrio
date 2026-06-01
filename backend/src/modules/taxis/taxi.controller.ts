import { Request, Response } from 'express'
import { ListTaxisUseCase } from './use-cases'

export class TaxiController {
  constructor(private readonly listTaxis: ListTaxisUseCase) {}

  async list(req: Request, res: Response): Promise<void> {
    res.json(await this.listTaxis.execute())
  }
}
