import { GoogleAnalytics } from '@next/third-parties/google';

import Gnb from '@/features/layout/components/gnb';
import { MDXProvider } from '@/features/docs/contexts';
import { getAllFrontmatter } from '@/features/docs/helpers/mdx';
import LnbMobile from '@/features/docs/components/lnb/mobile';
import { parseGroupedPages } from '@/features/docs/helpers/pages';
import { createMetadata } from '@/helpers/metadata';

import Providers from './providers';

import type { Metadata, Viewport } from 'next';

import '@wanteddev/wds/global.css';

export const metadata: Metadata = createMetadata({
  title: 'Wanted Design System',
  metadataBase: process.env.NEXT_PUBLIC_BASE_PATH!,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#ffffff',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#1B1C1E',
    },
  ],
};

const RootLayout = async ({ children }: LayoutProps<'/'>) => {
  const allFrontmatter = await getAllFrontmatter();
  const groupedPages = parseGroupedPages(allFrontmatter);

  return (
    <html suppressHydrationWarning lang="ko">
      <head>
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
        <link
          rel="preload stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://static.wanted.co.kr/fonts/wantedsans/WantedSansVariable.min.css"
        />
        <link
          rel="preconnect"
          href={`https://${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION?.toLowerCase()}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />

        <meta
          name="google-site-verification"
          content="yAUUR_mmN8bfpt8PpS9a0CACVDLOlNTgwYCyP1gSgpk"
        />
        <meta
          name="naver-site-verification"
          content="6479dc6aadc2e9ca474d02be49faeb0a69c0ad45"
        />
      </head>
      <body suppressHydrationWarning>
        <MDXProvider
          allFrontmatter={allFrontmatter}
          groupedPages={groupedPages}
        >
          <Providers>
            <LnbMobile />

            <Gnb />

            {children}
          </Providers>
        </MDXProvider>
      </body>

      {process.env.NEXT_PUBLIC_SERVER_TYPE?.toLowerCase() === 'www' &&
        process.env.NEXT_PUBLIC_IS_CUSTOM_VERSION !== 'true' && (
          <GoogleAnalytics gaId="G-XX1CL3693S" />
        )}
    </html>
  );
};

export default RootLayout;
