import { IncrementalCache } from '@neshca/cache-handler';
import createLruCache from '@neshca/cache-handler/local-lru';
import createRedisCache from '@neshca/cache-handler/redis-strings';
import { createClient } from 'redis';

IncrementalCache.onCreation(async () => {
    if (!process.env.REDIS_URL) {
        console.warn('Make sure that REDIS_URL is added to the .env.local file and loaded properly.');
    }

    const PREFIX = 'string:';

    const client = createClient({
        url: process.env.REDIS_URL,
        name: `cache-handler:${PREFIX}${process.env.PORT ?? process.pid}`,
    });

    client.on('error', () => {});

    console.info('Connecting Redis client...');
    await client.connect();
    console.info('Redis client connected.');

    const redisCache = createRedisCache({
        client,
        keyPrefix: PREFIX,
    });

    const localCache = createLruCache();

    return {
        cache: [redisCache, localCache],
        useFileSystem: true,
    };
});

export default IncrementalCache;
