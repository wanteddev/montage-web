# `@wanteddev/wds`

Powered by [Emotion](https://github.com/emotion-js/emotion).

## Install

```
pnpm i @wanteddev/wds @wanteddev/wds-icon
```

## Usage

### React

```tsx
// App.tsx
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@wanteddev/wds';

import App from './App';

import '@wantddev/wds/global.css';

const root = createRoot(document.getElementById('app')!);

root.render(
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
);
```

If you use it with scss, styled-components, etc.

Use [Pretend option](https://emotion.sh/docs/@emotion/cache#prepend) allows you to determine whether to prepend style tags to DOM nodes.

```tsx
// App.tsx
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CacheProvider, createCache } from '@wanteddev/wds';

import App from './App';

import '@wantddev/wds/global.css';

const root = createRoot(document.getElementById('app')!);

const cache = createCache({ key: 'wds', prepend: true });

root.render(
  <CacheProvider value={cache}>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </CacheProvider>,
);
```

### Next.js App router

```sh
pnpm i @wanteddev/wds-nextjs
```

```tsx
// app/layout.tsx
'use client';
import { Head } from '@wanted-frontend/config';
import { ThemeProvider } from '@wantddev/wds';
import { AppRouterCacheProvider } from '@wantddev/wds-nextjs';

import type { PropsWithChildren } from 'react';

import '@wantddev/wds/global.css';

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html suppressHydrationWarning>
      <head>{/* Load Pretendard JP font */}</head>
      <body>
        <ThemeProvider>
          <AppRouterCacheProvider>{props.children}</AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

If you use it with scss, styled-components, etc.

Use [Pretend option](https://emotion.sh/docs/@emotion/cache#prepend) allows you to determine whether to prepend style tags to DOM nodes.

```tsx
// app/layout.tsx
'use client';
import { Head } from '@wanted-frontend/config';
import { ThemeProvider } from '@wantddev/wds';
import { AppRouterCacheProvider } from '@wantddev/wds-nextjs';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';

import type { PropsWithChildren } from 'react';

import '@wantddev/wds/global.css';

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <Head />
      </head>
      <body>
        <ThemeProvider provider={StyledComponentsProvider}>
          <AppRouterCacheProvider options={{ prepend: true }}>
            {props.children}
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

### Next.js Page router

```sh
pnpm i @wanteddev/wds-nextjs
```

```tsx
// _app.tsx
import { ThemeProvider } from '@wanteddev/wds';
import { AppCacheProvider } from '@wanteddev/wds-nextjs';

import type { AppProps } from 'next/app';
import type { EmotionCacheProviderProps } from '@wanteddev/wds-nextjs';

import '@wanteddev/wds/global.css';

const MyApp = ({
  Component,
  pageProps,
  emotionCache,
}: AppProps & EmotionCacheProviderProps) => {
  return (
    <AppCacheProvider emotionCache={emotionCache}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppCacheProvider>
  );
};

export default MyApp;
```

```tsx
// _document.tsx
import {
  DocumentHeadTags,
  documentGetInitialProps,
} from '@wanteddev/wds-nextjs';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import type { DocumentHeadTagsProps } from '@wanteddev/wds-nextjs';
import type { DocumentContext, DocumentInitialProps } from 'next/document';

class MyDocument extends Document<DocumentHeadTagsProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await documentGetInitialProps(Document, ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <DocumentHeadTags {...this.props} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

If you use it with scss, styled-components, etc.

Use [Pretend option](https://emotion.sh/docs/@emotion/cache#prepend) allows you to determine whether to prepend style tags to DOM nodes.

```tsx
// _document.tsx
import {
  createCache,
  DocumentHeadTags,
  documentGetInitialProps,
} from '@wanteddev/wds-nextjs';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';

import type { DocumentHeadTagsProps } from '@wanteddev/wds-nextjs';
import type { DocumentContext, DocumentInitialProps } from 'next/document';

const createEmotionCache = () => {
  let insertionPoint;

  if (typeof document !== 'undefined') {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'wds', insertionPoint, prepend: true });
};

const emotionCache = createEmotionCache();

class MyDocument extends Document<DocumentHeadTagsProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const styledComponentsSheet = new ServerStyleSheet();

    try {
      const initialProps = await documentGetInitialProps(Document, ctx, {
        emotionCache,
        plugins: [
          {
            enhanceApp: (App) => (props) =>
              styledComponentsSheet.collectStyles(<App {...props} />),
            resolveProps: async (props) => {
              return {
                ...props,
                styles: (
                  <>
                    {props.styles}
                    {styledComponentsSheet.getStyleElement()}
                  </>
                ),
              };
            },
          },
        ],
      });

      return initialProps;
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <DocumentHeadTags {...this.props} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

```tsx
// _app.tsx
import { ThemeProvider } from '@wanteddev/wds';
import { AppCacheProvider } from '@wanteddev/wds-nextjs';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';

import type { AppProps } from 'next/app';
import type { EmotionCacheProviderProps } from '@wanteddev/wds-nextjs';

import '@wanteddev/wds/global.css';

const MyApp = ({ Component, pageProps, emotionCache }: AppProps & ) => {
  return (
    <AppCacheProvider emotionCache={emotionCache}>
      <ThemeProvider provider={StyledComponentsProvider}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppCacheProvider>
  );
};

export default MyApp;
```

## Licenses

This project is licensed under the [MIT License](/LICENSE).
