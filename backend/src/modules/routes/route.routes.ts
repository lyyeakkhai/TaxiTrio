import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { ListRoutesUseCase, GetRouteUseCase } from './use-cases'
import { RouteController } from './route.controller'

const router = Router()
const listRoutes = new ListRoutesUseCase(prisma)
const getRoute = new GetRouteUseCase(prisma)
const controller = new RouteController(listRoutes, getRoute)

router.get('/', (req, res) => controller.list(req, res))
router.get('/:id', (req, res) => controller.get(req, res))

export default router
