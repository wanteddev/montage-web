import type { MetadataRoute } from 'next';

const isDev = process.env.NEXT_PUBLIC_SERVER_TYPE?.toLowerCase() === 'dev';

const robots = (): MetadataRoute.Robots => {
  const sitemapUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}/sitemap.xml`;

  if (isDev) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
        {
          userAgent: 'Algolia Crawler',
          allow: '/',
        },
      ],
      sitemap: sitemapUrl,
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['*.txt$', '/*.*.x'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_PATH}/sitemap.xml`,
  };
};

export const dynamic = 'force-static';

export default robots;
