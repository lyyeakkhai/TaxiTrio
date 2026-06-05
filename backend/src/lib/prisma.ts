import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const globalForPrisma = globalThis as unknown as { __prisma?: InstanceType<typeof PrismaClient> }

const prisma = globalForPrisma.__prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__prisma = prisma
}

export { prisma }
