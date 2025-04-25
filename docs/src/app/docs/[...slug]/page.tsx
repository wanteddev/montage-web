import { notFound } from 'next/navigation';
import { FlexBox } from '@wanteddev/wds';

import { getAllFrontmatter, getSourceBySlug } from '@/lib/mdx';
import { generatePropTypes } from '@/lib/props';
import { MDXProvider } from '@/features/mdx/context';
import MDX from '@/features/mdx/components/mdx';
import SideBar from '@/features/sidebar/components/sidebar';

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

  return (
    <>
      <FlexBox
        data-algolia-page-scope
        flexDirection="column"
        sx={{ width: '100%' }}
        sm={{
          sx: { padding: '0px 0px 20px 20px', width: 'calc(100% - 280px)' },
        }}
        md={{
          sx: {
            padding: '0px 20px 20px 20px',
            width: 'calc(100% - 280px - 200px)',
          },
        }}
      >
        <MDXProvider frontmatter={source.frontmatter} propTypes={propTypes}>
          <MDX {...source} />
        </MDXProvider>
      </FlexBox>

      <SideBar />
    </>
  );
};

export default DocsPage;
