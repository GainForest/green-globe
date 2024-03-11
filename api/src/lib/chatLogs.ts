import { createClient } from 'redis'

const redisClient = createClient({
  url: `redis://${process.env.REDISHOST}:${process.env.REDISPORT}`,
  password: process.env.REDISPASSWORD,
})

let isConnected = false

redisClient.on('connect', () => {
  console.log('Redis client connected')
  isConnected = true
})

redisClient.on('end', () => {
  console.log('Redis client disconnected')
  isConnected = false
})

const connectRedis = async () => {
  if (!isConnected) {
    try {
      await redisClient.connect()
      console.log('Connected to Redis')
    } catch (err) {
      console.error('Redis connection error:', err)
    }
  }
}

export { redisClient, connectRedis }
