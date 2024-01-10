import { redisClient, connectRedis } from 'src/lib/chatLogs'

export const saveToRedis = async ({ key, value }) => {
  await connectRedis()
  try {
    const response = await redisClient.set(key, value)
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getFromRedis = async (key) => {
  await connectRedis()
  try {
    const response = await redisClient.get(key)
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}
