import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import pinoHttp from 'pino-http'
import swaggerUi from 'swagger-ui-express'
import { env } from './config/env'
import { logger } from './lib/logger'
import { errorHandler } from './middleware/error'
import { swaggerSpec } from './swagger'
import userRouter, { adminRouter as userAdminRouter } from './modules/users'
import routeRouter, { adminRouteRouter } from './modules/routes'
import tourRouter, { adminTourRouter } from './modules/tours'
import taxiRouter, { adminRouter as taxiAdminRouter } from './modules/taxis'
import bookingRouter, { adminBookingRouter } from './modules/bookings'
import assistanceRouter, { adminAssistanceRouter } from './modules/assistance'
import driverRouter, { adminRouter as driverAdminRouter } from './modules/drivers'
import { driverTelegramRouter, telegramWebhookRouter } from './modules/telegram'
import adminPaymentRouter from './modules/payments'
import adminComplaintRouter from './modules/complaints'
import adminRouter from './modules/admin'

const app = express()

app.use(helmet())
app.use(cors({ origin: env.FRONTEND_URL }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))
app.use(express.json())
app.use(pinoHttp({ logger }))

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/users', userRouter)
app.use('/api/auth', userRouter)
app.use('/api/admin/users', userAdminRouter)
app.use('/api/routes', routeRouter)
app.use('/api/admin/routes', adminRouteRouter)
app.use('/api/tours', tourRouter)
app.use('/api/admin/tours', adminTourRouter)
app.use('/api/taxis', taxiRouter)
app.use('/api/admin/taxis', taxiAdminRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/admin/bookings', adminBookingRouter)
app.use('/api/assistance', assistanceRouter)
app.use('/api/admin/assistance', adminAssistanceRouter)
app.use('/api/driver', driverRouter)
app.use('/api/admin/drivers', driverAdminRouter)
app.use('/api/driver/telegram', driverTelegramRouter)
app.use('/api/telegram', telegramWebhookRouter)
app.use('/api/admin/payments', adminPaymentRouter)
app.use('/api/admin/complaints', adminComplaintRouter)
app.use('/api/admin', adminRouter)

app.use(errorHandler)

export default app

