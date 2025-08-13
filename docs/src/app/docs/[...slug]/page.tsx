import { notFound } from 'next/navigation';

import {
  getAllFrontmatter,
  getFrontmatterBySlug,
  getSourceBySlug,
} from '@/features/docs/helpers/mdx';
import { getFrontmatterTitle } from '@/features/docs/helpers/mdx.client';
import MDXRender from '@/features/docs/components/mdx/mdx-render';
import { shouldNotSerializeMDX } from '@/features/docs/helpers/overview';
import CustomRender from '@/features/docs/components/custom-render';
import { HeadingProvider } from '@/features/docs/context';

import type { Metadata } from 'next';

type Props = {
  params: { slug: string | Array<string> };
};

const parseSlug = (params: Props['params']) =>
  Array.isArray(params.slug) ? params.slug : [params.slug];

const isFileNotFoundError = (error: unknown) =>
  error instanceof Error && 'code' in error && error.code === 'ENOENT';

export const generateStaticParams = async () => {
  const frontmatter = await getAllFrontmatter();

  return frontmatter;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const frontmatter = await getFrontmatterBySlug(parseSlug(params));
    const title = getFrontmatterTitle(frontmatter) + ' - Montage';
    const description = frontmatter.description?.replace(/\\n/g, ' ');

    return {
      title,
      description,
      openGraph: {
        type: 'website',
        title,
        description,
        ...(frontmatter.image && {
          images: [{ url: frontmatter.image, width: 1200, height: 630 }],
        }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(frontmatter.image && {
          images: [{ url: frontmatter.image, width: 1200, height: 630 }],
        }),
      },
    };
  } catch (error) {
    if (isFileNotFoundError(error)) {
      notFound();
    }

    return {};
  }
};

export const dynamic = 'force-static';

const DocsPage = async ({ params }: Props) => {
  if (shouldNotSerializeMDX(parseSlug(params))) {
    return <CustomRender />;
  }

  try {
    const source = await getSourceBySlug(parseSlug(params));

    return (
      <HeadingProvider>
        <MDXRender {...source} />
      </HeadingProvider>
    );
  } catch (err) {
    notFound();
  }
};

export default DocsPage;
