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
  CreateComplaintUseCase,
  ListMyComplaintsUseCase,
  DeleteComplaintUseCase,
} from './use-cases'
import { ComplaintController } from './complaint.controller'
import { ReplyComplaintSchema, CreateComplaintSchema } from './complaint.schema'

const listComplaints = new ListComplaintsAdminUseCase(prisma)
const getComplaint = new GetComplaintUseCase(prisma)
const replyComplaint = new ReplyComplaintUseCase(prisma)
const resolveComplaint = new ResolveComplaintUseCase(prisma)
const createComplaint = new CreateComplaintUseCase(prisma)
const listMyComplaints = new ListMyComplaintsUseCase(prisma)
const deleteComplaint = new DeleteComplaintUseCase(prisma)
const controller = new ComplaintController(
  listComplaints, getComplaint, replyComplaint, resolveComplaint,
  createComplaint, listMyComplaints, deleteComplaint,
)

const adminRouter = Router()
adminRouter.use(verifyClerkToken, requireRole('admin'))
adminRouter.get('/', (req, res) => controller.adminList(req, res))
adminRouter.get('/:id', (req, res) => controller.adminGet(req, res))
adminRouter.put('/:id/reply', validateRequest(ReplyComplaintSchema), (req, res) => controller.adminReply(req, res))
adminRouter.put('/:id/resolve', (req, res) => controller.adminResolve(req, res))
adminRouter.delete('/:id', (req, res) => controller.adminDelete(req, res))

const customerRouter = Router()
customerRouter.use(verifyClerkToken, requireRole('customer'))
customerRouter.post('/', validateRequest(CreateComplaintSchema), (req, res) => controller.create(req, res))
customerRouter.get('/my', (req, res) => controller.listMy(req, res))

export default adminRouter
export { customerRouter as complaintCustomerRouter }
