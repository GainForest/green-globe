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

export const getFromRedis = async (data) => {
  await connectRedis()
  let cursor = 0
  const keys = []
  const emailPattern = `${data.key}:*`

  try {
    do {
      const reply = await redisClient.scan(cursor, {
        MATCH: emailPattern,
        COUNT: 100,
      })

      cursor = reply.cursor

      keys.push(...reply.keys)
    } while (cursor !== 0)

    const messages = await Promise.all(keys.map((key) => redisClient.get(key)))
    return messages
  } catch (error) {
    console.log(error)
  }
}
