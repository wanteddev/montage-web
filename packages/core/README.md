# `@montage-ui/core`

Powered by [Emotion](https://github.com/emotion-js/emotion).

[English](./README.md) | [한국어](./README.ko.md)

## Install

```sh
pnpm i @montage-ui/core @montage-ui/icon
```

> **⚠️ Important:** All `@montage-ui/*` packages (e.g. `@montage-ui/core`, `@montage-ui/icon`, `@montage-ui/nextjs`, `@montage-ui/dummy`, `@montage-ui/brand`) must be installed with the **same version**. If the versions are mismatched, multiple theme contexts may be created, which can lead to unexpected styling issues.

## Usage

You need to load the Pretendard font.

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<link
  rel="stylesheet"
  as="style"
  crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-jp-dynamic-subset.min.css"
/>
<link
  rel="stylesheet"
  as="style"
  crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
/>
```

### React

```tsx
// App.tsx
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@montage-ui/core';

import App from './App';

import '@montage-ui/core/global.css';

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
import { ThemeProvider, CacheProvider, createCache } from '@montage-ui/core';

import App from './App';

import '@montage-ui/core/global.css';

const root = createRoot(document.getElementById('app')!);

const cache = createCache({ key: 'montage', prepend: true });

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
pnpm i @montage-ui/nextjs
```

```tsx
// app/layout.tsx
'use client';
import { Head } from '@wanted-frontend/config';
import { ThemeProvider } from '@montage-ui/core';
import { AppRouterCacheProvider } from '@montage-ui/nextjs';

import type { PropsWithChildren } from 'react';

import '@montage-ui/core/global.css';

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
import { ThemeProvider } from '@montage-ui/core';
import { AppRouterCacheProvider } from '@montage-ui/nextjs';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';

import type { PropsWithChildren } from 'react';

import '@montage-ui/core/global.css';

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
pnpm i @montage-ui/nextjs
```

```tsx
// _app.tsx
import { ThemeProvider } from '@montage-ui/core';
import { AppCacheProvider } from '@montage-ui/nextjs';

import type { AppProps } from 'next/app';
import type { EmotionCacheProviderProps } from '@montage-ui/nextjs';

import '@montage-ui/core/global.css';

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
import { DocumentHeadTags, documentGetInitialProps } from '@montage-ui/nextjs';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import type { DocumentHeadTagsProps } from '@montage-ui/nextjs';
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
} from '@montage-ui/nextjs';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';

import type { DocumentHeadTagsProps } from '@montage-ui/nextjs';
import type { DocumentContext, DocumentInitialProps } from 'next/document';

const createEmotionCache = () => {
  let insertionPoint;

  if (typeof document !== 'undefined') {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'montage', insertionPoint, prepend: true });
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
import { ThemeProvider } from '@montage-ui/core';
import { AppCacheProvider } from '@montage-ui/nextjs';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';

import type { AppProps } from 'next/app';
import type { EmotionCacheProviderProps } from '@montage-ui/nextjs';

import '@montage-ui/core/global.css';

const MyApp = ({
  Component,
  pageProps,
  emotionCache,
}: AppProps & EmotionCacheProviderProps) => {
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

## Dark mode

Dark mode is disabled by default — every page renders with the light theme. Pass the `enableDarkMode` prop to `ThemeProvider` to enable it:

```tsx
<ThemeProvider enableDarkMode>
  <App />
</ThemeProvider>
```

With `enableDarkMode`:

- The theme follows the OS preference (`prefers-color-scheme`) by default.
- The user's selection is persisted to `localStorage` (key: `theme`, configurable via the `storageKey` prop).
- Pass `disableTransitionOnChange` to disable CSS transitions while the theme switches.

To read or change the current theme, use the `useThemeControl` hook. On the server the resolved theme is always `'light'`, so rendering `theme` directly causes a hydration mismatch in SSR environments such as Next.js — wrap theme-dependent output in `NoSsr`:

```tsx
import { NoSsr, useThemeControl } from '@montage-ui/core';

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeControl();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <NoSsr>Current theme: {theme}</NoSsr>
    </button>
  );
};
```

- `theme`: the resolved theme applied to the screen (`'light' | 'dark'`)
- `themeOriginValue`: the stored setting (`'light' | 'dark' | 'system'`)
- `setTheme`: changes the theme — accepts `'light'`, `'dark'`, or `'system'`

> **Note (Next.js):** theme detection runs on the client, so add `suppressHydrationWarning` to the `<html>` element as shown in the App router example above.

To force a specific theme on part of the tree regardless of the current theme, wrap it with `ForceTheme`:

```tsx
import { ForceTheme } from '@montage-ui/core';

<ForceTheme theme="dark">
  <AlwaysDarkSection />
</ForceTheme>;
```
