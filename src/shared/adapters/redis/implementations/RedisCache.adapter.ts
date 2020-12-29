import Redis, { Redis as RedisType } from 'ioredis';
import cacheConfig from '@config/cache';
import IRedisCacheAdapater from '../interfaces/IRedisCache.adapter';

export default class RedisCacheAdapter implements IRedisCacheAdapater {
  private cacheClient: RedisType;

  constructor() {
    this.cacheClient = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.cacheClient.set(key, JSON.stringify(value));
  }

  public async retrieve(key: string): Promise<string | null> {
    const cachedData = await this.cacheClient.get(key);
    return cachedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.cacheClient.del(key);
  }

  public async invalidateByPrefix(prefix: string): Promise<void> {
    const keys = await this.cacheClient.keys(`${prefix}:*`);

    const pipeline = await this.cacheClient.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
