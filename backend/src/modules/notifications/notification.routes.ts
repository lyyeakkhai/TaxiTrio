import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { ListNotificationsUseCase, MarkReadUseCase, MarkAllReadUseCase } from './use-cases'
import { NotificationController } from './notification.controller'

const listNotifications = new ListNotificationsUseCase(prisma)
const markRead = new MarkReadUseCase(prisma)
const markAllRead = new MarkAllReadUseCase(prisma)
const controller = new NotificationController(listNotifications, markRead, markAllRead)

const router = Router()
router.use(verifyClerkToken)
router.get('/', (req, res) => controller.list(req, res))
router.put('/read-all', (req, res) => controller.markAllRead(req, res))
router.put('/:id/read', (req, res) => controller.markRead(req, res))

export default router
