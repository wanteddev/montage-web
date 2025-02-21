/*
 * Portions of this file are based on code from @mui/material-nextjs.
 * MIT Licensed, Copyright (c) 2014 Call-Em-All.
 *
 * https://github.com/mui/material-ui/tree/master/packages/mui-material-nextjs/src/v13-pagesRouter
 */
import * as React from 'react';
import { CacheProvider, createCache } from '@wanteddev/wds-engine';
import createEmotionServer from '@emotion/server/create-instance';

import type Document from 'next/document';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import type { AppType } from 'next/app';
import type { EmotionCache } from '@wanteddev/wds-engine';

const createEmotionCache = () => {
  let insertionPoint;

  if (typeof document !== 'undefined') {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'wds', insertionPoint });
};

export type EmotionCacheProviderProps = {
  emotionCache?: EmotionCache;
};

const defaultEmotionCache = createEmotionCache();

export const AppCacheProvider = ({
  emotionCache = defaultEmotionCache,
  children,
}: React.PropsWithChildren<EmotionCacheProviderProps>) => {
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};

// //////////////////////////////////////////////////
// _document

export type DocumentHeadTagsProps = {
  emotionStyleTags: Array<React.ReactElement<any>>;
};
export const DocumentHeadTags = (props: DocumentHeadTagsProps) => {
  return (
    <>
      <meta name="emotion-insertion-point" content="" />
      {props.emotionStyleTags}
    </>
  );
};

export type Enhancer<C> = (Component: C) => C;

type Plugin = {
  enhanceApp: Enhancer<AppType>;
  resolveProps: (
    initialProps: DocumentInitialProps,
  ) => Promise<DocumentInitialProps>;
};

const createGetInitialProps = (
  document: typeof Document,
  plugins: Array<Plugin>,
) => {
  return async function getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
          plugins.reduce((result, plugin) => plugin.enhanceApp(result), App),
      });

    const initialProps = await document.getInitialProps(ctx);

    const finalProps = await plugins.reduce(
      async (result, plugin) => plugin.resolveProps(await result),
      Promise.resolve(initialProps),
    );

    return finalProps;
  };
};

export async function documentGetInitialProps(
  document: typeof Document,
  ctx: DocumentContext,
  options?: {
    emotionCache?: EmotionCache;
    plugins?: Array<Plugin>;
  },
) {
  const cache = options?.emotionCache ?? createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  return createGetInitialProps(document, [
    {
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
      resolveProps: async (initialProps) => {
        const { styles } = extractCriticalToChunks(initialProps.html);
        return {
          ...initialProps,
          emotionStyleTags: styles.map((style) => (
            <style
              data-emotion={`${style.key} ${style.ids.join(' ')}`}
              key={style.key}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: style.css }}
            />
          )),
        };
      },
    },
    ...(options?.plugins ?? []),
  ])(ctx) as Promise<
    DocumentInitialProps &
      DocumentHeadTagsProps & { emotionCache: EmotionCache }
  >;
}

export type { EmotionCache, Plugin };
