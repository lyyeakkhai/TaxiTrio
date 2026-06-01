import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { ListToursUseCase, GetTourUseCase } from './use-cases'
import { TourController } from './tour.controller'

const router = Router()
const listTours = new ListToursUseCase(prisma)
const getTour = new GetTourUseCase(prisma)
const controller = new TourController(listTours, getTour)

router.get('/', (req, res) => controller.list(req, res))
router.get('/:id', (req, res) => controller.get(req, res))

export default router
