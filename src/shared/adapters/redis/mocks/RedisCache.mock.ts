import IRedisCacheAdapater from '../interfaces/IRedisCache.adapter';

interface ICacheData {
  [key: string]: string;
}

export default class IRedisCacheMock implements IRedisCacheAdapater {
  private cache: ICacheData = {};

  public async save(key: string, value: string): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async retrieve(key: string, value: any): Promise<any | null> {
    const data = this.cache[key];

    if (!data) return null;

    const parsed = JSON.parse(data);

    return parsed;
  }

  public async invalidate() {}

  public async invalidateByPrefix() {}
}
