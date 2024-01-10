import { createClient } from 'redis'

const redisClient = createClient({
  url: `redis://${process.env.REDISHOST}:${process.env.REDISPORT}`,
  password: process.env.REDISPASSWORD,
})

const connectRedis = async () => {
  try {
    await redisClient.connect()
    console.log('Connected to Redis')
  } catch (err) {
    console.error('Redis connection error:', err)
  }
}

export { redisClient, connectRedis }
