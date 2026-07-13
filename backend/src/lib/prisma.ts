import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

// Connection timeout and retry configuration
prisma.$connect()
  .then(() => console.log('✅ Database connected successfully'))
  .catch((e) => {
    console.error('❌ Failed to connect to database:', e)
    process.exit(1)
  })

// Keep connection alive with periodic ping
if (process.env.NODE_ENV !== 'production') {
  setInterval(async () => {
    try {
      await prisma.$queryRaw`SELECT 1`
    } catch (e) {
      console.error('Database ping failed:', e)
    }
  }, 30000) // Ping every 30 seconds
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
