import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { ListAssistanceUseCase } from './use-cases'
import { AssistanceController } from './assistance.controller'

const router = Router()
const listAssistance = new ListAssistanceUseCase(prisma)
const controller = new AssistanceController(listAssistance)

router.get('/', (req, res) => controller.list(req, res))

export default router
