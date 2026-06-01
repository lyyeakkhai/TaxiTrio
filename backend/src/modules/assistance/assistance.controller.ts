import { Request, Response } from 'express'
import { ListAssistanceUseCase } from './use-cases'

export class AssistanceController {
  constructor(private readonly listAssistance: ListAssistanceUseCase) {}

  async list(req: Request, res: Response): Promise<void> {
    res.json(await this.listAssistance.execute())
  }
}
