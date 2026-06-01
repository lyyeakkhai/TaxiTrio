import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { validateRequest } from '../../middleware/validate'
import { CreateReviewUseCase, ListAdminReviewsUseCase, DeleteReviewUseCase } from './use-cases'
import { ReviewController } from './review.controller'
import { CreateReviewSchema } from './review.schema'

const createReview = new CreateReviewUseCase(prisma)
const listReviews = new ListAdminReviewsUseCase(prisma)
const deleteReview = new DeleteReviewUseCase(prisma)
const controller = new ReviewController(createReview, listReviews, deleteReview)

const router = Router()
router.post('/', verifyClerkToken, requireRole('customer'), validateRequest(CreateReviewSchema), (req, res) =>
  controller.create(req, res),
)

export const adminReviewRouter = Router()
adminReviewRouter.use(verifyClerkToken, requireRole('admin'))
adminReviewRouter.get('/', (req, res) => controller.adminList(req, res))
adminReviewRouter.delete('/:id', (req, res) => controller.adminDelete(req, res))

export default router
