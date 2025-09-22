import redisClient from './redis';

export class CacheService {
  // Set cache with expiration (default 1 hour)
  static async set(key: string, value: any, expireIn: number = 3600): Promise<void> {
    await redisClient.set(key, JSON.stringify(value), {
      EX: expireIn
    });
  }

  // Get cached data
  static async get<T>(key: string): Promise<T | null> {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }

  // Delete cache
  static async delete(key: string): Promise<void> {
    await redisClient.del(key);
  }

  // Invalidate cache patterns (useful for related data)
  static async invalidatePattern(pattern: string): Promise<void> {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  }
}

// Cache key generators
export const cacheKeys = {
  user: (userId: string) => `user:${userId}`,
  post: (postId: string) => `post:${postId}`,
  userPosts: (userId: string, page: number = 1) => `user:${userId}:posts:${page}`,
  feed: (userId: string, page: number = 1) => `feed:${userId}:${page}`,
  trending: () => 'trending:posts',
  comments: (postId: string) => `comments:${postId}`
};