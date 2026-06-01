import { Request, Response } from 'express'
import {
  ListComplaintsAdminUseCase,
  GetComplaintUseCase,
  ReplyComplaintUseCase,
  ResolveComplaintUseCase,
  CreateComplaintUseCase,
  ListMyComplaintsUseCase,
  DeleteComplaintUseCase,
} from './use-cases'

export class ComplaintController {
  constructor(
    private readonly listComplaints: ListComplaintsAdminUseCase,
    private readonly getComplaint: GetComplaintUseCase,
    private readonly replyComplaint: ReplyComplaintUseCase,
    private readonly resolveComplaint: ResolveComplaintUseCase,
    private readonly createComplaint: CreateComplaintUseCase,
    private readonly listMyComplaints: ListMyComplaintsUseCase,
    private readonly deleteComplaint: DeleteComplaintUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    res.status(201).json(await this.createComplaint.execute(req.body, req.user!.id))
  }

  async listMy(req: Request, res: Response): Promise<void> {
    res.json(await this.listMyComplaints.execute(req.user!.id))
  }

  async adminList(req: Request, res: Response): Promise<void> {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined
    const category = typeof req.query.category === 'string' ? req.query.category : undefined
    res.json(await this.listComplaints.execute(status, category))
  }

  async adminGet(req: Request, res: Response): Promise<void> {
    res.json(await this.getComplaint.execute(req.params.id as string))
  }

  async adminReply(req: Request, res: Response): Promise<void> {
    res.json(await this.replyComplaint.execute(req.params.id as string, req.body.reply))
  }

  async adminResolve(req: Request, res: Response): Promise<void> {
    res.json(await this.resolveComplaint.execute(req.params.id as string))
  }

  async adminDelete(req: Request, res: Response): Promise<void> {
    await this.deleteComplaint.execute(req.params.id as string)
    res.status(204).send()
  }
}
