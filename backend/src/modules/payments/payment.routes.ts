import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { ListPaymentsAdminUseCase, GetPaymentAdminUseCase, GetPaymentCustomerUseCase } from './use-cases'
import { PaymentController } from './payment.controller'

const listPayments = new ListPaymentsAdminUseCase(prisma)
const getPayment = new GetPaymentAdminUseCase(prisma)
const getPaymentCustomer = new GetPaymentCustomerUseCase(prisma)
const controller = new PaymentController(listPayments, getPayment, getPaymentCustomer)

const adminRouter = Router()
adminRouter.use(verifyClerkToken, requireRole('admin'))
adminRouter.get('/', (req, res) => controller.adminList(req, res))
adminRouter.get('/:id', (req, res) => controller.adminGet(req, res))

const customerRouter = Router()
customerRouter.use(verifyClerkToken, requireRole('customer'))
customerRouter.get('/:booking_id', (req, res) => controller.customerGet(req, res))

export default adminRouter
export { customerRouter as paymentCustomerRouter }
