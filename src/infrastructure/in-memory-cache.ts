import { Cache } from './cache.interface';
import { injectable } from 'tsyringe';


@injectable()
export class InMemoryCache implements Cache {
    private readonly cache: Map<string, { value: any; expiry?: number }> = new Map();

    async get<T>(key: string): Promise<T | undefined> {
        const entry = this.cache.get(key);
        if (entry && (!entry.expiry || entry.expiry > Date.now())) {
            return entry.value as T;
        }

        return undefined;
    }

    async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
        this.cache.set(key, { value, expiry: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined });
    }

    async delete(key: string): Promise<void> {
        this.cache.delete(key);
    }
}