import { Router } from 'express'
import multer from 'multer'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { validateRequest } from '../../middleware/validate'
import { ListTaxisUseCase, CreateTaxiUseCase, UpdateTaxiUseCase, DeleteTaxiUseCase, ToggleTaxiUseCase } from './use-cases'
import { TaxiController } from './taxi.controller'
import { CreateTaxiSchema, UpdateTaxiSchema } from './taxi.schema'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

const listTaxis = new ListTaxisUseCase(prisma)
const createTaxi = new CreateTaxiUseCase(prisma)
const updateTaxi = new UpdateTaxiUseCase(prisma)
const deleteTaxi = new DeleteTaxiUseCase(prisma)
const toggleTaxi = new ToggleTaxiUseCase(prisma)

const controller = new TaxiController(listTaxis, createTaxi, updateTaxi, deleteTaxi, toggleTaxi)

router.get('/', (req, res) => controller.list(req, res))

const adminRouter = Router()
adminRouter.use(verifyClerkToken, requireRole('admin'))

adminRouter.post('/', upload.single('photo'), validateRequest(CreateTaxiSchema), (req, res) =>
  controller.adminCreate(req, res)
)
adminRouter.put('/:id', upload.single('photo'), validateRequest(UpdateTaxiSchema), (req, res) =>
  controller.adminUpdate(req, res)
)
adminRouter.delete('/:id', (req, res) => controller.adminDelete(req, res))
adminRouter.patch('/:id/toggle', (req, res) => controller.adminToggle(req, res))

export default router
export { adminRouter }

