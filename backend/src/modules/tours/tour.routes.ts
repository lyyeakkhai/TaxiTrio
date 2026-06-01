import { Router } from 'express'
import multer from 'multer'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { validateRequest } from '../../middleware/validate'
import { ListToursUseCase, GetTourUseCase, CreateTourUseCase, UpdateTourUseCase, DeleteTourUseCase, ToggleTourUseCase } from './use-cases'
import { TourController } from './tour.controller'
import { CreateTourSchema, UpdateTourSchema } from './tour.schema'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

const listTours = new ListToursUseCase(prisma)
const getTour = new GetTourUseCase(prisma)
const createTour = new CreateTourUseCase(prisma)
const updateTour = new UpdateTourUseCase(prisma)
const deleteTour = new DeleteTourUseCase(prisma)
const toggleTour = new ToggleTourUseCase(prisma)

const controller = new TourController(listTours, getTour, createTour, updateTour, deleteTour, toggleTour)

router.get('/', (req, res) => controller.list(req, res))
router.get('/:id', (req, res) => controller.get(req, res))

const adminTourRouter = Router()
adminTourRouter.use(verifyClerkToken, requireRole('admin'))

adminTourRouter.post('/', upload.single('image'), validateRequest(CreateTourSchema), (req, res) =>
  controller.adminCreate(req, res)
)
adminTourRouter.put('/:id', upload.single('image'), validateRequest(UpdateTourSchema), (req, res) =>
  controller.adminUpdate(req, res)
)
adminTourRouter.delete('/:id', (req, res) => controller.adminDelete(req, res))
adminTourRouter.patch('/:id/toggle', (req, res) => controller.adminToggle(req, res))

export default router
export { adminTourRouter }
