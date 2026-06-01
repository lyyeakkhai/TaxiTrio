import { Router } from 'express'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { TelegramController } from './telegram.controller'

const controller = new TelegramController()

export const driverTelegramRouter = Router()
driverTelegramRouter.post('/generate-code', verifyClerkToken, requireRole('driver'), (req, res) =>
  controller.generateCode(req, res)
)

export const telegramWebhookRouter = Router()
telegramWebhookRouter.post('/webhook', (req, res) => controller.handleWebhook(req, res))
