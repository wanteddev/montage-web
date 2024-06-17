import { getAllFrontmatter, getSourceBySlug } from '@/lib/mdx';
import { generatePropTypes } from '@/lib/props';

import ClientDocsPage from './page.client';

import type { Metadata } from 'next';

type Props = {
  params: { slug: string | Array<string> };
};

const parseSlug = (params: Props['params']) =>
  Array.isArray(params.slug) ? params.slug : [params.slug];

export const generateStaticParams = async () => {
  if (process.env.DISABLE_SLUG) {
    return [];
  }

  const frontmatter = await getAllFrontmatter('/');

  return frontmatter;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { frontmatter } = await getSourceBySlug('/', parseSlug(params));

  return {
    title: frontmatter.title + ' - WDS',
    description: frontmatter.description,
  };
};

export const dynamic = 'force-static';

const DocsPage = async ({ params }: Props) => {
  const source = await getSourceBySlug('/', parseSlug(params));
  const propTypes = generatePropTypes();

  return <ClientDocsPage source={source} propTypes={propTypes} />;
};

export default DocsPage;
