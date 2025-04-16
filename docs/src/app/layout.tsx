import { FlexBox } from '@wanteddev/wds';
import { containerStyle } from '@wanteddev/wds';

import { MobileMenuProvider } from '@/features/menu/context';
import Header from '@/features/menu/components/header';
import Menu from '@/features/menu/components/menu';
import MobileMenu from '@/features/menu/components/mobile-menu';

import Providers from './providers';

import type { PropsWithChildren } from 'react';

import '@wanteddev/wds/global.css';

import '@/features/menu/style/index.css';

export const metadata = {
  title: 'WDS Docs',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="msapplication-TileColor"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1B1C1E"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="msapplication-TileColor"
          content="#1B1C1E"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="preconnect" href="https://static.wanted.co.kr" />
        <meta
          name="msapplication-TileImage"
          content="//static.wanted.co.kr/favicon/new/144x144.png"
        />

        <link
          rel="shortcut icon"
          href="https://static.wanted.co.kr/favicon/new/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://static.wanted.co.kr/favicon/new/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://static.wanted.co.kr/favicon/new/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="https://static.wanted.co.kr/favicon/new/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="https://static.wanted.co.kr/favicon/new/favicon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="https://static.wanted.co.kr/favicon/new/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="https://static.wanted.co.kr/favicon/new/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="https://static.wanted.co.kr/favicon/new/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="https://static.wanted.co.kr/favicon/new/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="https://static.wanted.co.kr/favicon/new/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="https://static.wanted.co.kr/favicon/new/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="https://static.wanted.co.kr/favicon/new/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="https://static.wanted.co.kr/favicon/new/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://static.wanted.co.kr/favicon/new/apple-touch-icon-180x180.png"
        />

        <link
          rel="preload stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://static.wanted.co.kr/fonts/pretendard/pretendard/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="preload stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://static.wanted.co.kr/fonts/pretendard/pretendard-jp/pretendardvariable-jp-dynamic-subset.min.css"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <MobileMenuProvider>
            <Header />
            <FlexBox as="main" sx={containerStyle(true)}>
              <Menu />
              <MobileMenu />
              {children}
            </FlexBox>
          </MobileMenuProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
