/*
 * Portions of this file are based on code from @mui/material-nextjs.
 * MIT Licensed, Copyright (c) 2014 Call-Em-All.
 *
 * https://github.com/mui/material-ui/blob/master/packages/mui-material-nextjs/src/v13-appRouter/appRouterV13.tsx
 */
import { CacheProvider, createCache } from '@wanteddev/wds-engine';
import { useServerInsertedHTML } from 'next/navigation.js';
import { type PropsWithChildren, useState } from 'react';

import type { CacheOptions } from '@wanteddev/wds-engine';

type AppRouterCacheProviderProps = PropsWithChildren<{
  options?: Partial<CacheOptions>;
}>;

const AppRouterCacheProvider = (props: AppRouterCacheProviderProps) => {
  const { options, children } = props;

  const [registry] = useState(() => {
    const cache = createCache({ ...options, key: options?.key ?? 'wds' });
    cache.compat = true;

    const prevInsert = cache.insert;
    let inserted: Array<{ name: string; isGlobal: boolean }> = [];
    // Override the insert method to support streaming SSR with flush().
    cache.insert = (...args) => {
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: !selector,
        });
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const inserted = registry.flush();
    if (inserted.length === 0) {
      return null;
    }
    let styles = '';
    let dataEmotionAttribute = registry.cache.key;

    const globals: Array<{
      name: string;
      style?: string;
    }> = [];

    inserted.forEach(({ name, isGlobal }) => {
      const style = registry.cache.inserted[name];

      if (typeof style !== 'boolean') {
        if (isGlobal) {
          globals.push({ name, style });
        } else {
          styles += style;
          dataEmotionAttribute += ` ${name}`;
        }
      }
    });

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            nonce={options?.nonce}
            key={name}
            data-emotion={`${registry.cache.key}-global ${name}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style! }}
          />
        ))}
        {styles && (
          <style
            nonce={options?.nonce}
            data-emotion={dataEmotionAttribute}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </>
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
};

export default AppRouterCacheProvider;
