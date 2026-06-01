import { Request, Response } from 'express'
import {
  ListComplaintsAdminUseCase,
  GetComplaintUseCase,
  ReplyComplaintUseCase,
  ResolveComplaintUseCase,
} from './use-cases'

export class ComplaintController {
  constructor(
    private readonly listComplaints: ListComplaintsAdminUseCase,
    private readonly getComplaint: GetComplaintUseCase,
    private readonly replyComplaint: ReplyComplaintUseCase,
    private readonly resolveComplaint: ResolveComplaintUseCase,
  ) {}

  async adminList(req: Request, res: Response): Promise<void> {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined
    res.json(await this.listComplaints.execute(status))
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
}
