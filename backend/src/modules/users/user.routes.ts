import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { validateRequest } from '../../middleware/validate'
import { CreateUserUseCase, GetMeUseCase } from './use-cases'
import { UserController } from './user.controller'
import { CreateUserSchema } from './user.schema'

const router = Router()
const createUser = new CreateUserUseCase(prisma)
const getMe = new GetMeUseCase(prisma)
const controller = new UserController(createUser, getMe)

router.post('/', verifyClerkToken, validateRequest(CreateUserSchema), (req, res) => controller.create(req, res))
router.get('/me', verifyClerkToken, (req, res) => controller.me(req, res))

export default router
