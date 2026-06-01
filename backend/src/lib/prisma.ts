// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')

const globalForPrisma = globalThis as unknown as { __prisma?: InstanceType<typeof PrismaClient> }

const prisma = globalForPrisma.__prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__prisma = prisma
}

export { prisma }
