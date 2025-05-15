import { notFound } from 'next/navigation';
import { sentenceCase } from 'change-case';

import {
  getAllFrontmatter,
  getSourceBySlug,
} from '@/features/docs/helpers/mdx';
import MDXRender from '@/features/docs/components/mdx/mdx-render';

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
    const { frontmatter } = await getSourceBySlug('/', parseSlug(params));
    const title = sentenceCase(frontmatter.title) + ' - Montage';
    const description = frontmatter.description?.replace(/\\n/g, '');

    return {
      title,
      description,
      openGraph: {
        type: 'website',
        title,
        description,
        ...(frontmatter.image && { images: [{ url: frontmatter.image }] }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(frontmatter.image && { images: [{ url: frontmatter.image }] }),
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
  const source = await getSourceBySlug('/', parseSlug(params));

  return <MDXRender {...source} />;
};

export default DocsPage;
