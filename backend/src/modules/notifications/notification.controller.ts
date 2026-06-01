import { Request, Response } from 'express';
import {
  ListNotificationsUseCase,
  MarkReadUseCase,
  MarkAllReadUseCase,
} from './use-cases';

export class NotificationController {
  constructor(
    private readonly listNotifications: ListNotificationsUseCase,
    private readonly markRead: MarkReadUseCase,
    private readonly markAllRead: MarkAllReadUseCase,
  ) {}

  async list(req: Request, res: Response) {
    const userId = req.user!.id;
    const isRead =
      req.query.is_read !== undefined
        ? req.query.is_read === 'true'
        : undefined;

    const notifications = await this.listNotifications.execute(userId, isRead);
    res.json(notifications);
  }

  async markRead(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user!.id;

    const notification = await this.markRead.execute(id, userId);
    res.json(notification);
  }

  async markAllRead(req: Request, res: Response) {
    const userId = req.user!.id;

    const result = await this.markAllRead.execute(userId);
    res.json(result);
  }
}
