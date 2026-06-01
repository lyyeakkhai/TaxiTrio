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
} from './use-cases'
import { BookingController } from './booking.controller'
import { CreateBookingSchema } from './booking.schema'

const router = Router()
const transition = new TransitionBookingUseCase(prisma)
const createBooking = new CreateBookingUseCase(prisma)
const listMyBookings = new ListMyBookingsUseCase(prisma)
const getBooking = new GetBookingUseCase(prisma)
const cancelBooking = new CancelBookingUseCase(prisma, transition)
const controller = new BookingController(createBooking, listMyBookings, getBooking, cancelBooking)

router.use(verifyClerkToken, requireRole('customer'))
router.post('/', validateRequest(CreateBookingSchema), (req, res) => controller.create(req, res))
router.get('/my', (req, res) => controller.listMy(req, res))
router.get('/:id', (req, res) => controller.get(req, res))
router.put('/:id/cancel', (req, res) => controller.cancel(req, res))

export default router
