import { notFound } from 'next/navigation';

import {
  getAllFrontmatter,
  getFrontmatterBySlug,
  getSourceBySlug,
} from '@/features/docs/helpers/mdx';
import {
  getFrontmatterDefaultImage,
  getFrontmatterDescription,
  getFrontmatterOgImage,
  getFrontmatterTitle,
} from '@/features/docs/helpers/mdx.client';
import MDXRender from '@/features/docs/components/mdx/mdx-render';
import { HeadingProvider } from '@/features/docs/contexts';
import { createMetadata } from '@/helpers/metadata';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { Metadata } from 'next';

type Props = PageProps<'/docs/[...slug]'>;

const parseSlug = (params: Awaited<Props['params']>) =>
  Array.isArray(params.slug) ? params.slug : [params.slug];

const isFileNotFoundError = (error: unknown) =>
  error instanceof Error &&
  'message' in error &&
  error.message.includes('File not found');

export const dynamic = 'force-static';

export const generateStaticParams = async () => {
  const frontmatter = (await getAllFrontmatter()).filter(
    (item) => !item.isExternal,
  );

  return frontmatter;
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  try {
    const [allFrontmatter, frontmatter] = await Promise.all([
      getAllFrontmatter(),
      getFrontmatterBySlug(parseSlug(params)),
    ]);
    const title = getFrontmatterTitle(frontmatter);
    const description = getFrontmatterDescription(frontmatter, allFrontmatter);
    const image =
      getFrontmatterOgImage(frontmatter, allFrontmatter) ??
      getFrontmatterDefaultImage(frontmatter);

    return createMetadata({
      title,
      description,
      image,
    });
  } catch (error) {
    if (isFileNotFoundError(error)) {
      notFound();
    }

    return {};
  }
};

const DocsPage = async (props: Props) => {
  const params = await props.params;

  let source: MDXRemoteSerializeResult<unknown, unknown> | undefined;

  try {
    source = await getSourceBySlug(parseSlug(params));
  } catch (err) {
    if (isFileNotFoundError(err)) {
      notFound();
    }

    throw err;
  }

  return (
    <HeadingProvider>
      <MDXRender {...source} />
    </HeadingProvider>
  );
};

export default DocsPage;
