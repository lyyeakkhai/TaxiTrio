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
import userRouter from './modules/users'
import routeRouter from './modules/routes'
import tourRouter from './modules/tours'
import taxiRouter from './modules/taxis'
import bookingRouter from './modules/bookings'
import assistanceRouter from './modules/assistance'
import driverRouter from './modules/drivers'
import { driverTelegramRouter, telegramWebhookRouter } from './modules/telegram'

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
app.use('/api/routes', routeRouter)
app.use('/api/tours', tourRouter)
app.use('/api/taxis', taxiRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/assistance', assistanceRouter)
app.use('/api/driver', driverRouter)
app.use('/api/driver/telegram', driverTelegramRouter)
app.use('/api/telegram', telegramWebhookRouter)

app.use(errorHandler)

export default app

