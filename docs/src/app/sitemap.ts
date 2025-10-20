import { getAllFrontmatter } from '@/features/docs/helpers/mdx';

import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH!;

  const frontmatter = await getAllFrontmatter();

  const docsMetadata: MetadataRoute.Sitemap = frontmatter.map((value) => {
    const lastModified = value.updatedAt ?? value.createdAt ?? Date.now();

    return {
      url: `${BASE_PATH}/docs/${value.slug.join('/')}`,
      lastModified: new Date(lastModified).toISOString(),
      priority: 0.7,
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
    ...docsMetadata,
  ];
};

export default sitemap;
