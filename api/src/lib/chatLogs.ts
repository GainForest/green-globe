import { createClient } from '@vercel/kv'

export const redisClient = createClient({
  url: process.env.REDIS_API_URL,
  token: process.env.REDIS_API_TOKEN,
})
