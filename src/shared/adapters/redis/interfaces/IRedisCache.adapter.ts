export default interface IRedisCacheAdapter {
  save(key: string, value: string): Promise<void>;
  retrieve(key: string): Promise<string | null>;
  invalidate(key: string): Promise<void>;
  invalidateByPrefix(prefix: string): Promise<void>;
}
