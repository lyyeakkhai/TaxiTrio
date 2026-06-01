import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { validateRequest } from '../../middleware/validate'
import {
  ListAssistanceUseCase,
  CreateAssistanceUseCase,
  UpdateAssistanceUseCase,
  DeleteAssistanceUseCase,
  ToggleAssistanceUseCase,
} from './use-cases'
import { AssistanceController } from './assistance.controller'
import { CreateAssistanceSchema, UpdateAssistanceSchema } from './assistance.schema'

const router = Router()
const listAssistance = new ListAssistanceUseCase(prisma)
const createAssistance = new CreateAssistanceUseCase(prisma)
const updateAssistance = new UpdateAssistanceUseCase(prisma)
const deleteAssistance = new DeleteAssistanceUseCase(prisma)
const toggleAssistance = new ToggleAssistanceUseCase(prisma)
const controller = new AssistanceController(
  listAssistance,
  createAssistance,
  updateAssistance,
  deleteAssistance,
  toggleAssistance,
)

router.get('/', (req, res) => controller.list(req, res))

export const adminAssistanceRouter = Router()
adminAssistanceRouter.use(verifyClerkToken, requireRole('admin'))
adminAssistanceRouter.post('/', validateRequest(CreateAssistanceSchema), (req, res) =>
  controller.adminCreate(req, res),
)
adminAssistanceRouter.put('/:id', validateRequest(UpdateAssistanceSchema), (req, res) =>
  controller.adminUpdate(req, res),
)
adminAssistanceRouter.delete('/:id', (req, res) => controller.adminDelete(req, res))
adminAssistanceRouter.patch('/:id/toggle', (req, res) => controller.adminToggle(req, res))

export default router
