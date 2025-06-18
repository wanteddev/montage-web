import { getAllFrontmatter } from '@/features/docs/helpers/mdx';

export const GET = async () => {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH!;

  const frontmatter = await getAllFrontmatter();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      <url>
        <loc>${BASE_PATH}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.6</priority>
      </url>
    ${frontmatter
      .map((value) => {
        const lastModified = value.updatedAt ?? value.createdAt ?? Date.now();

        return {
          url: `${BASE_PATH}/docs/${value.slug.join('/')}`,
          lastModified: new Date(lastModified).toISOString(),
          priority: 0.7,
        };
      })
      .map(
        (item) => `
            <url>
              <loc>${item.url}</loc>
              <lastmod>${item.lastModified}</lastmod>
              <priority>${item.priority}</priority>
            </url>
          `,
      )
      .join('')}
    </urlset>
  `;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
};
