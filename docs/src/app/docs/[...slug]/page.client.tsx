'use client';
import { FlexBox } from '@wanteddev/wds';

import { MDXProvider } from '@/features/mdx/context';
import MDX from '@/features/mdx/components/mdx';
import SideBar from '@/features/sidebar/components/sidebar';

import type { ComponentDoc } from 'react-docgen-typescript';
import type { serialize } from 'next-mdx-remote/serialize';
import type { Frontmatter } from '@/types/mdx';

type Props = {
  source: Awaited<ReturnType<typeof serialize<unknown, Frontmatter>>>;
  propTypes: Array<ComponentDoc>;
};

const ClientDocsPage = ({ source, propTypes }: Props) => {
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

export default ClientDocsPage;
