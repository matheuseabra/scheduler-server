import { container as DIContainer } from 'tsyringe';
import IRedisCacheAdapater from './interfaces/IRedisCache.adapter';
import RedisCacheAdapter from './implementations/RedisCache.adapter';

const cacheAdapters = {
  redis: RedisCacheAdapter,
};

DIContainer.registerSingleton<IRedisCacheAdapater>(
  'RedisCacheAdapter',
  cacheAdapters.redis,
);
