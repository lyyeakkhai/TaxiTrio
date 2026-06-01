import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { ListPaymentsAdminUseCase, GetPaymentAdminUseCase } from './use-cases'
import { PaymentController } from './payment.controller'

const router = Router()
const listPayments = new ListPaymentsAdminUseCase(prisma)
const getPayment = new GetPaymentAdminUseCase(prisma)
const controller = new PaymentController(listPayments, getPayment)

router.use(verifyClerkToken, requireRole('admin'))
router.get('/', (req, res) => controller.adminList(req, res))
router.get('/:id', (req, res) => controller.adminGet(req, res))

export default router
