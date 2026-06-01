import { Request, Response } from 'express'
import {
  ListAssistanceUseCase,
  CreateAssistanceUseCase,
  UpdateAssistanceUseCase,
  DeleteAssistanceUseCase,
  ToggleAssistanceUseCase,
} from './use-cases'

export class AssistanceController {
  constructor(
    private readonly listAssistance: ListAssistanceUseCase,
    private readonly createAssistance?: CreateAssistanceUseCase,
    private readonly updateAssistance?: UpdateAssistanceUseCase,
    private readonly deleteAssistance?: DeleteAssistanceUseCase,
    private readonly toggleAssistance?: ToggleAssistanceUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<void> {
    res.json(await this.listAssistance.execute())
  }

  async adminCreate(req: Request, res: Response): Promise<void> {
    res.status(201).json(await this.createAssistance!.execute(req.body))
  }

  async adminUpdate(req: Request, res: Response): Promise<void> {
    res.json(await this.updateAssistance!.execute(req.params.id as string, req.body))
  }

  async adminDelete(req: Request, res: Response): Promise<void> {
    await this.deleteAssistance!.execute(req.params.id as string)
    res.status(204).send()
  }

  async adminToggle(req: Request, res: Response): Promise<void> {
    res.json(await this.toggleAssistance!.execute(req.params.id as string))
  }
}
