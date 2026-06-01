import { Router } from 'express';
import { verifyClerkToken } from '../../middleware/auth';
import prisma from '../../../lib/prisma';
import {
  ListNotificationsUseCase,
  MarkReadUseCase,
  MarkAllReadUseCase,
} from './use-cases';
import { NotificationController } from './notification.controller';

const router = Router();

const listNotificationsUseCase = new ListNotificationsUseCase(prisma);
const markReadUseCase = new MarkReadUseCase(prisma);
const markAllReadUseCase = new MarkAllReadUseCase(prisma);

const controller = new NotificationController(
  listNotificationsUseCase,
  markReadUseCase,
  markAllReadUseCase,
);

router.get('/', verifyClerkToken, (req, res) => controller.list(req, res));
router.put('/read-all', verifyClerkToken, (req, res) =>
  controller.markAllRead(req, res),
);
router.put('/:id/read', verifyClerkToken, (req, res) =>
  controller.markRead(req, res),
);

export default router;
