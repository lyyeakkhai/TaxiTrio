import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { validateRequest } from '../../middleware/validate'
import {
  TransitionBookingUseCase,
  CreateBookingUseCase,
  ListMyBookingsUseCase,
  GetBookingUseCase,
  CancelBookingUseCase,
  ListBookingsAdminUseCase,
  AssignBookingUseCase,
  CancelBookingAdminUseCase,
} from './use-cases'
import { BookingController } from './booking.controller'
import { CreateBookingSchema, AssignBookingSchema } from './booking.schema'

const router = Router()
const transition = new TransitionBookingUseCase(prisma)
const createBooking = new CreateBookingUseCase(prisma)
const listMyBookings = new ListMyBookingsUseCase(prisma)
const getBooking = new GetBookingUseCase(prisma)
const cancelBooking = new CancelBookingUseCase(prisma, transition)
const listBookingsAdmin = new ListBookingsAdminUseCase(prisma)
const assignBooking = new AssignBookingUseCase(prisma, transition)
const cancelBookingAdmin = new CancelBookingAdminUseCase(prisma, transition)
const controller = new BookingController(
  createBooking,
  listMyBookings,
  getBooking,
  cancelBooking,
  listBookingsAdmin,
  assignBooking,
  cancelBookingAdmin,
)

router.use(verifyClerkToken, requireRole('customer'))
router.post('/', validateRequest(CreateBookingSchema), (req, res) => controller.create(req, res))
router.get('/my', (req, res) => controller.listMy(req, res))
router.get('/:id', (req, res) => controller.get(req, res))
router.put('/:id/cancel', (req, res) => controller.cancel(req, res))

export const adminBookingRouter = Router()
adminBookingRouter.use(verifyClerkToken, requireRole('admin'))
adminBookingRouter.get('/', (req, res) => controller.adminList(req, res))
adminBookingRouter.get('/:id', (req, res) => controller.adminGet(req, res))
adminBookingRouter.put('/:id/assign', validateRequest(AssignBookingSchema), (req, res) =>
  controller.adminAssign(req, res),
)
adminBookingRouter.put('/:id/cancel', (req, res) => controller.adminCancel(req, res))

export default router
