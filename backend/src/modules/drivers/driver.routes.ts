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
  ListDriversUseCase,
  GetDriverUseCase,
  UpdateDriverAdminUseCase,
  DeleteDriverUseCase,
  ApproveDriverUseCase,
  RejectDriverUseCase,
} from './use-cases'
import { DriverController } from './driver.controller'
import { UpdateDriverProfileSchema, ToggleAvailabilitySchema, UpdateDriverAdminSchema } from './driver.schema'

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
const listDrivers = new ListDriversUseCase(prisma)
const getDriver = new GetDriverUseCase(prisma)
const updateDriverAdmin = new UpdateDriverAdminUseCase(prisma)
const deleteDriver = new DeleteDriverUseCase(prisma)
const approveDriver = new ApproveDriverUseCase(prisma)
const rejectDriver = new RejectDriverUseCase(prisma)

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
  listDrivers,
  getDriver,
  updateDriverAdmin,
  deleteDriver,
  approveDriver,
  rejectDriver,
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

const adminRouter = Router()
adminRouter.use(verifyClerkToken, requireRole('admin'))

adminRouter.get('/', (req, res) => controller.adminList(req, res))
adminRouter.get('/:id', (req, res) => controller.adminGet(req, res))
adminRouter.put('/:id', validateRequest(UpdateDriverAdminSchema), (req, res) => controller.adminUpdate(req, res))
adminRouter.delete('/:id', (req, res) => controller.adminDelete(req, res))
adminRouter.put('/:id/approve', (req, res) => controller.adminApprove(req, res))
adminRouter.put('/:id/reject', (req, res) => controller.adminReject(req, res))

export default router
export { adminRouter }
