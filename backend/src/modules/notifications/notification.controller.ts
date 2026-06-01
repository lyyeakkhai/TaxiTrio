import { Request, Response } from 'express'
import { ListNotificationsUseCase, MarkReadUseCase, MarkAllReadUseCase } from './use-cases'

export class NotificationController {
  constructor(
    private readonly listNotifications: ListNotificationsUseCase,
    private readonly markReadUseCase: MarkReadUseCase,
    private readonly markAllReadUseCase: MarkAllReadUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<void> {
    const isRead = req.query.is_read !== undefined ? req.query.is_read === 'true' : undefined
    res.json(await this.listNotifications.execute(req.user!.id, isRead))
  }

  async markRead(req: Request, res: Response): Promise<void> {
    res.json(await this.markReadUseCase.execute(req.params.id as string, req.user!.id))
  }

  async markAllRead(req: Request, res: Response): Promise<void> {
    res.json(await this.markAllReadUseCase.execute(req.user!.id))
  }
}
