import { Router } from 'express'
import multer from 'multer'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { validateRequest } from '../../middleware/validate'
import { TransitionBookingUseCase } from '../bookings/use-cases'
import {
  GetDriverProfileUseCase,
  UpdateDriverProfileUseCase,
  ToggleAvailabilityUseCase,
  GetEarningsUseCase,
  GetDriverReviewsUseCase,
  ListDriverBookingsUseCase,
  AcceptBookingUseCase,
  RejectBookingUseCase,
  ArrivedBookingUseCase,
  StartBookingUseCase,
  CompleteBookingUseCase,
} from './use-cases'
import { DriverController } from './driver.controller'
import { UpdateDriverProfileSchema, ToggleAvailabilitySchema } from './driver.schema'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

const transition = new TransitionBookingUseCase(prisma)
const getProfile = new GetDriverProfileUseCase(prisma)
const updateProfile = new UpdateDriverProfileUseCase(prisma)
const toggleAvailability = new ToggleAvailabilityUseCase(prisma)
const getEarnings = new GetEarningsUseCase(prisma)
const getReviews = new GetDriverReviewsUseCase(prisma)
const listBookings = new ListDriverBookingsUseCase(prisma)
const acceptBooking = new AcceptBookingUseCase(prisma, transition)
const rejectBooking = new RejectBookingUseCase(prisma, transition)
const arrivedBooking = new ArrivedBookingUseCase(prisma, transition)
const startBooking = new StartBookingUseCase(prisma, transition)
const completeBooking = new CompleteBookingUseCase(prisma, transition)

const controller = new DriverController(
  getProfile,
  updateProfile,
  toggleAvailability,
  getEarnings,
  getReviews,
  listBookings,
  acceptBooking,
  rejectBooking,
  arrivedBooking,
  startBooking,
  completeBooking,
)

router.use(verifyClerkToken, requireRole('driver'))

router.get('/profile', (req, res) => controller.getProfileHandler(req, res))
router.put('/profile', upload.single('photo'), validateRequest(UpdateDriverProfileSchema), (req, res) =>
  controller.updateProfileHandler(req, res)
)
router.put('/availability', validateRequest(ToggleAvailabilitySchema), (req, res) =>
  controller.toggleAvailabilityHandler(req, res)
)

router.get('/earnings', (req, res) => controller.getEarningsHandler(req, res))
router.get('/reviews', (req, res) => controller.getReviewsHandler(req, res))

router.get('/bookings', (req, res) => controller.listBookingsHandler(req, res))
router.put('/bookings/:id/accept', (req, res) => controller.acceptBookingHandler(req, res))
router.put('/bookings/:id/reject', (req, res) => controller.rejectBookingHandler(req, res))
router.put('/bookings/:id/arrived', (req, res) => controller.arrivedBookingHandler(req, res))
router.put('/bookings/:id/start', (req, res) => controller.startBookingHandler(req, res))
router.put('/bookings/:id/complete', (req, res) => controller.completeBookingHandler(req, res))

export default router
