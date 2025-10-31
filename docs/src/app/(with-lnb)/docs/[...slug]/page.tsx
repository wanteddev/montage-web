import { notFound } from 'next/navigation';

import {
  getAllFrontmatter,
  getFrontmatterBySlug,
  getSourceBySlug,
} from '@/features/docs/helpers/mdx';
import {
  getFrontmatterDescription,
  getFrontmatterImage,
  getFrontmatterTitle,
} from '@/features/docs/helpers/mdx.client';
import MDXRender from '@/features/docs/components/mdx/mdx-render';
import { HeadingProvider } from '@/features/docs/context';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { Metadata } from 'next';

type Props = PageProps<'/docs/[...slug]'>;

const parseSlug = (params: Awaited<Props['params']>) =>
  Array.isArray(params.slug) ? params.slug : [params.slug];

const isFileNotFoundError = (error: unknown) =>
  error instanceof Error && 'code' in error && error.code === 'ENOENT';

export const dynamic = 'force-static';

export const generateStaticParams = async () => {
  const frontmatter = (await getAllFrontmatter()).filter(
    (item) => !item.isPrivate,
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
    const title = getFrontmatterTitle(frontmatter) + ' - Montage';
    const description = getFrontmatterDescription(
      frontmatter,
      allFrontmatter,
    )?.replace(/\n/g, ' ');
    const image = getFrontmatterImage(frontmatter, allFrontmatter);

    return {
      title,
      description,
      openGraph: {
        type: 'website',
        title,
        description,
        ...(image && {
          images: [{ url: image, width: 1200, height: 630 }],
        }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(image && {
          images: [{ url: image, width: 1200, height: 630 }],
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

const DocsPage = async (props: Props) => {
  const params = await props.params;

  let source: MDXRemoteSerializeResult<unknown, unknown> | undefined;

  try {
    source = await getSourceBySlug(parseSlug(params));
  } catch (err) {
    notFound();
  }

  return (
    <HeadingProvider>
      <MDXRender {...source} />
    </HeadingProvider>
  );
};

export default DocsPage;
