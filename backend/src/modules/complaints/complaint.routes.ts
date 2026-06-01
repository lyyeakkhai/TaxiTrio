import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { validateRequest } from '../../middleware/validate'
import {
  ListComplaintsAdminUseCase,
  GetComplaintUseCase,
  ReplyComplaintUseCase,
  ResolveComplaintUseCase,
} from './use-cases'
import { ComplaintController } from './complaint.controller'
import { ReplyComplaintSchema } from './complaint.schema'

const router = Router()
const listComplaints = new ListComplaintsAdminUseCase(prisma)
const getComplaint = new GetComplaintUseCase(prisma)
const replyComplaint = new ReplyComplaintUseCase(prisma)
const resolveComplaint = new ResolveComplaintUseCase(prisma)
const controller = new ComplaintController(listComplaints, getComplaint, replyComplaint, resolveComplaint)

router.use(verifyClerkToken, requireRole('admin'))
router.get('/', (req, res) => controller.adminList(req, res))
router.get('/:id', (req, res) => controller.adminGet(req, res))
router.put('/:id/reply', validateRequest(ReplyComplaintSchema), (req, res) => controller.adminReply(req, res))
router.put('/:id/resolve', (req, res) => controller.adminResolve(req, res))

export default router
