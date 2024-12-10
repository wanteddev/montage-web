import { notFound } from 'next/navigation';

import { getAllFrontmatter, getSourceBySlug } from '@/lib/mdx';
import { generatePropTypes } from '@/lib/props';

import ClientDocsPage from './page.client';

import type { Metadata } from 'next';

type Props = {
  params: { slug: string | Array<string> };
};

const parseSlug = (params: Props['params']) =>
  Array.isArray(params.slug) ? params.slug : [params.slug];

const isFileNotFoundError = (error: unknown) =>
  error instanceof Error && 'code' in error && error.code === 'ENOENT';

export const generateStaticParams = async () => {
  const frontmatter = await getAllFrontmatter('/');

  return frontmatter;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const { frontmatter } = await getSourceBySlug('/', parseSlug(params));

    return {
      title: frontmatter.title + ' - WDS',
      description: frontmatter.description,
    };
  } catch (error) {
    if (isFileNotFoundError(error)) {
      notFound();
    }

    throw error;
  }
};

export const dynamic = 'force-static';

const DocsPage = async ({ params }: Props) => {
  const source = await getSourceBySlug('/', parseSlug(params));
  const propTypes = generatePropTypes();

  return <ClientDocsPage source={source} propTypes={propTypes} />;
};

export default DocsPage;
