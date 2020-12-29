import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}
export default {
  driver: 'redis',
  config: {
    redis: {
      host: '172.17.0.2',
      port: 6379,
      password: undefined,
    },
  },
} as ICacheConfig;
