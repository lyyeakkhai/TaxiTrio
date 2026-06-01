import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { validateRequest } from '../../middleware/validate'
import { CreateUserUseCase, GetMeUseCase, ListUsersUseCase, GetUserUseCase } from './use-cases'
import { UserController } from './user.controller'
import { CreateUserSchema } from './user.schema'

const router = Router()
const createUser = new CreateUserUseCase(prisma)
const getMe = new GetMeUseCase(prisma)
const listUsers = new ListUsersUseCase(prisma)
const getUser = new GetUserUseCase(prisma)
const controller = new UserController(createUser, getMe, listUsers, getUser)

router.post('/', verifyClerkToken, validateRequest(CreateUserSchema), (req, res) => controller.create(req, res))
router.get('/me', verifyClerkToken, (req, res) => controller.me(req, res))

const adminRouter = Router()
adminRouter.use(verifyClerkToken, requireRole('admin'))
adminRouter.get('/', (req, res) => controller.listAll(req, res))
adminRouter.get('/:id', (req, res) => controller.getOne(req, res))

export default router
export { adminRouter }
