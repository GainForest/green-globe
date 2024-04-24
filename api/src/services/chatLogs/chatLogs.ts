import { redisClient } from 'src/lib/chatLogs'

export const saveToRedis = async ({ key, value }) => {
  try {
    const response = await redisClient.set(key, value)
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export const deleteFromRedis = async ({ key }) => {
  try {
    await redisClient.del(key)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const getFromRedis = async (input) => {
  let cursor = 0
  const keys = []
  const pattern = `${input.key}:*`

  try {
    do {
      const reply = await redisClient.scan(cursor, {
        match: pattern,
        count: 100,
      })
      cursor = reply[0]
      keys.push(...reply[1])
    } while (cursor !== 0)

    const messages = await Promise.all(
      keys.map(async (key) => {
        const value = await redisClient.get(key)
        const [, timestamp, email] = key.split(':')
        return {
          timestamp,
          email,
          message: value,
        }
      })
    )
    return messages
  } catch (error) {
    console.log(error)
  }
}
