// import Redis from 'ioredis'

// let redisClient: Redis | null = null

// export function getRedisClient(): Redis {
//   if (!redisClient) {
//     const redisUrl = process.env.REDIS_URL
//     if (!redisUrl) {
//       throw new Error('REDIS_URL environment variable is not set')
//     }

//     redisClient = new Redis(redisUrl, {
//       tls: redisUrl.startsWith('rediss://') ? {} : undefined,
//       maxRetriesPerRequest: 3,
//       retryStrategy: (times: number) => {
//         const delay = Math.min(times * 50, 2000)
//         return delay
//       },
//     })

//     redisClient.on('error', (err: Error) => {
//       console.error('[Redis] Connection error:', err)
//     })

//     redisClient.on('connect', () => {
//       console.log('[Redis] Connected successfully')
//     })
//   }

//   return redisClient
// }

// export async function closeRedisConnection(): Promise<void> {
//   if (redisClient) {
//     await redisClient.quit()
//     redisClient = null
//   }
// }

// Redis disabled - ioredis not installed
export function getRedisClient(): any {
  console.warn('Redis is disabled - ioredis not installed')
  return null
}

export async function closeRedisConnection(): Promise<void> {
  // No-op
}
