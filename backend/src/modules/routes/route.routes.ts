import { Router } from 'express'
import multer from 'multer'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { validateRequest } from '../../middleware/validate'
import { ListRoutesUseCase, GetRouteUseCase, CreateRouteUseCase, UpdateRouteUseCase, DeleteRouteUseCase, ToggleRouteUseCase } from './use-cases'
import { RouteController } from './route.controller'
import { CreateRouteSchema, UpdateRouteSchema } from './route.schema'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

const listRoutes = new ListRoutesUseCase(prisma)
const getRoute = new GetRouteUseCase(prisma)
const createRoute = new CreateRouteUseCase(prisma)
const updateRoute = new UpdateRouteUseCase(prisma)
const deleteRoute = new DeleteRouteUseCase(prisma)
const toggleRoute = new ToggleRouteUseCase(prisma)

const controller = new RouteController(listRoutes, getRoute, createRoute, updateRoute, deleteRoute, toggleRoute)

router.get('/', (req, res) => controller.list(req, res))
router.get('/:id', (req, res) => controller.get(req, res))

const adminRouteRouter = Router()
adminRouteRouter.use(verifyClerkToken, requireRole('admin'))

adminRouteRouter.post('/', upload.single('image'), validateRequest(CreateRouteSchema), (req, res) =>
  controller.adminCreate(req, res)
)
adminRouteRouter.put('/:id', upload.single('image'), validateRequest(UpdateRouteSchema), (req, res) =>
  controller.adminUpdate(req, res)
)
adminRouteRouter.delete('/:id', (req, res) => controller.adminDelete(req, res))
adminRouteRouter.patch('/:id/toggle', (req, res) => controller.adminToggle(req, res))

export default router
export { adminRouteRouter }
