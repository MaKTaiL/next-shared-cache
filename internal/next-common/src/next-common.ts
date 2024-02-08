import type { OutgoingHttpHeaders } from 'http';

import type { RouteMetadata as NextRouteMetadata } from 'next/dist/export/routes/types';
import type { CacheHandler, CacheHandlerValue as NextCacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import type IncrementalCache from 'next/dist/server/lib/incremental-cache/file-system-cache';

export type { PrerenderManifest } from 'next/dist/build';
export type { Revalidate } from 'next/dist/server/lib/revalidate';
export type { CacheHandler, CacheHandlerContext } from 'next/dist/server/lib/incremental-cache';
export type {
    CachedRedirectValue,
    CachedRouteValue,
    CachedImageValue,
    CachedFetchValue,
    IncrementalCacheValue,
    IncrementalCacheEntry,
    IncrementalCacheKindHint,
} from 'next/dist/server/response-cache/types';

export type CacheHandlerValue = NextCacheHandlerValue & {
    /**
     * Timestamp in milliseconds when the cache entry was last modified.
     */
    lastModified: number;
};

export type RouteMetadata = NextRouteMetadata;

export type NonNullableRouteMetadata = {
    [K in keyof RouteMetadata]: NonNullable<RouteMetadata[K]>;
};

export type FileSystemCacheContext = ConstructorParameters<typeof IncrementalCache>[0];

export type CacheHandlerParametersGet = Parameters<CacheHandler['get']>;

export type CacheHandlerParametersGetWithTags = [...CacheHandlerParametersGet, string[]];

export type CacheHandlerParametersSet = Parameters<CacheHandler['set']>;

export type CacheHandlerParametersRevalidateTag = Parameters<CacheHandler['revalidateTag']>;

export type CacheHandlerReturnTypeGet = ReturnType<CacheHandler['get']>;

export type CacheHandlerReturnTypeSet = ReturnType<CacheHandler['set']>;

export type CacheHandlerReturnTypeRevalidateTag = ReturnType<CacheHandler['revalidateTag']>;

export type UnwrappedCacheHandler = {
    get(...args: CacheHandlerParametersGetWithTags): Awaited<CacheHandlerReturnTypeGet>;
    set(...args: CacheHandlerParametersSet): Awaited<CacheHandlerReturnTypeSet>;
    revalidateTag(...args: CacheHandlerParametersRevalidateTag): Awaited<CacheHandlerReturnTypeRevalidateTag>;
};

export type IncrementalCachedPageValue = {
    kind: 'PAGE';
    html: string;
    pageData: object;
    postponed: string | undefined;
    headers: OutgoingHttpHeaders | undefined;
    status: number | undefined;
};

export type TagsManifest = {
    version: 1;
    items: Record<string, { revalidatedAt: number }>;
};
