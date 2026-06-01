import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { verifyClerkToken } from '../../middleware/auth'
import { requireRole } from '../../middleware/role'
import { GetDashboardStatsUseCase } from './use-cases'
import { AdminController } from './admin.controller'

const router = Router()
const getDashboardStats = new GetDashboardStatsUseCase(prisma)
const controller = new AdminController(getDashboardStats)

router.use(verifyClerkToken, requireRole('admin'))
router.get('/dashboard', (req, res) => controller.dashboard(req, res))

export default router
