import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { ListTaxisUseCase } from './use-cases'
import { TaxiController } from './taxi.controller'

const router = Router()
const listTaxis = new ListTaxisUseCase(prisma)
const controller = new TaxiController(listTaxis)

router.get('/', (req, res) => controller.list(req, res))

export default router
