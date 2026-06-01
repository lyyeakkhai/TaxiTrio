import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import pinoHttp from 'pino-http'
import swaggerUi from 'swagger-ui-express'
import { logger } from './lib/logger'
import { errorHandler } from './middleware/error'
import { swaggerSpec } from './swagger'

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))
app.use(express.json())
app.use(pinoHttp({ logger }))

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(errorHandler)

export default app
