import Redis from 'ioredis'

let redis: Redis | null = null

export function getRedis(): Redis {
  if (!redis) {
    const url = process.env.REDIS_URL
    if (!url) throw new Error('REDIS_URL is not defined')
    redis = new Redis(url)
  }
  return redis
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const client = getRedis()
  const val = await client.get(key)
  return val ? (JSON.parse(val) as T) : null
}

export async function cacheSet(key: string, value: unknown, ttlSeconds = 60): Promise<void> {
  const client = getRedis()
  await client.set(key, JSON.stringify(value), 'EX', ttlSeconds)
}

export async function cacheDel(key: string): Promise<void> {
  const client = getRedis()
  await client.del(key)
}
