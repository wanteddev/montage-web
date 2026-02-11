import { DOCS_PAGES } from '@/features/docs/constants';
import { getAllFrontmatter } from '@/features/docs/helpers/mdx';

import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH!;

  const frontmatter = await getAllFrontmatter();

  const dynamicSitemap: MetadataRoute.Sitemap = frontmatter.map((value) => {
    const lastModified = value.updatedAt ?? value.createdAt ?? Date.now();

    return {
      url: `${BASE_PATH}/docs/${value.slug.join('/')}`,
      lastModified: new Date(lastModified).toISOString(),
      priority: 0.7,
      changeFrequency: 'weekly',
    };
  });

  const staticSitemap: MetadataRoute.Sitemap = [
    ...DOCS_PAGES.filter((page) => !page.isExternal),
    { slug: ['foundations', 'base-material', 'colors', 'atomic'] },
    {
      slug: ['foundations', 'base-material', 'elevation', 'spread'],
    },
  ].map((page) => {
    return {
      url: `${BASE_PATH}/docs/${page.slug.join('/')}`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
      changeFrequency: 'weekly',
    };
  });

  return [
    {
      url: BASE_PATH,
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: 'yearly',
    },
    ...dynamicSitemap,
    ...staticSitemap,
  ];
};

export default sitemap;
