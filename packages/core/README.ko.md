# `@montage-ui/core`

Powered by [Emotion](https://github.com/emotion-js/emotion).

[English](./README.md) | [한국어](./README.ko.md)

## Install

```sh
pnpm i @montage-ui/core @montage-ui/icon
```

> **⚠️ 주의:** `@@montage-ui/*` 관련 패키지(예: `@montage-ui/core`, `@montage-ui/icon`, `@montage-ui/nextjs`, `@montage-ui/dummy`, `@montage-ui/brand`)는 모두 **동일한 버전**으로 설치해야 합니다. 버전이 일치하지 않으면 theme context가 중복으로 생성되어 예기치 않은 스타일 문제가 발생할 수 있습니다.

## Usage

Pretendard 를 사용하기 때문에 폰트를 불러와야 합니다.

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

만약, scss 혹은 styled-components 등을 사용한다면

[Pretend 옵션](https://emotion.sh/docs/@emotion/cache#prepend)을 사용하면 스타일 태그를 DOM 노드에 앞부분에 추가할지 여부를 설정할 수 있습니다.

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

만약, scss 혹은 styled-components 등을 사용한다면

[Pretend 옵션](https://emotion.sh/docs/@emotion/cache#prepend)을 사용하면 스타일 태그를 DOM 노드에 앞부분에 추가할지 여부를 설정할 수 있습니다.

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

만약, scss 혹은 styled-components 등을 사용한다면

[Pretend 옵션](https://emotion.sh/docs/@emotion/cache#prepend)을 사용하면 스타일 태그를 DOM 노드에 앞부분에 추가할지 여부를 설정할 수 있습니다.

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

## 다크 모드

다크 모드는 기본적으로 비활성화되어 있으며, 모든 페이지가 라이트 테마로 렌더링됩니다. `ThemeProvider`에 `enableDarkMode` prop을 전달하면 활성화됩니다.

```tsx
<ThemeProvider enableDarkMode>
  <App />
</ThemeProvider>
```

`enableDarkMode`를 사용하면:

- 기본적으로 OS 설정(`prefers-color-scheme`)을 따라갑니다.
- 사용자가 선택한 테마는 `localStorage`에 저장됩니다. (key: `theme`, `storageKey` prop으로 변경 가능)
- 테마 전환 시 CSS transition을 끄고 싶다면 `disableTransitionOnChange`를 전달하세요.

현재 테마를 읽거나 변경하려면 `useThemeControl` 훅을 사용합니다. 서버에서는 테마가 항상 `'light'`로 결정되기 때문에, Next.js 같은 SSR 환경에서 `theme` 값을 그대로 렌더링하면 hydration mismatch가 발생합니다. 테마에 따라 달라지는 출력은 `NoSsr`로 감싸주세요.

```tsx
import { NoSsr, useThemeControl } from '@montage-ui/core';

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeControl();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <NoSsr>현재 테마: {theme}</NoSsr>
    </button>
  );
};
```

- `theme`: 화면에 실제로 적용된 테마 (`'light' | 'dark'`)
- `themeOriginValue`: 저장된 설정값 (`'light' | 'dark' | 'system'`)
- `setTheme`: 테마 변경 — `'light'`, `'dark'`, `'system'`을 전달할 수 있습니다.

> **참고 (Next.js):** 테마 감지는 클라이언트에서 동작하므로, 위의 App router 예시처럼 `<html>` 엘리먼트에 `suppressHydrationWarning`을 추가해야 합니다.

현재 테마와 무관하게 특정 영역에 테마를 고정하려면 `ForceTheme`으로 감싸세요.

```tsx
import { ForceTheme } from '@montage-ui/core';

<ForceTheme theme="dark">
  <AlwaysDarkSection />
</ForceTheme>;
```
