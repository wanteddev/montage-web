'use client';
import { FlexBox } from '@wanteddev/wds';

import { MDXProvider } from '@/features/mdx/context';
import MDX from '@/features/mdx/components/mdx';

import type { serialize } from 'next-mdx-remote/serialize';
import type { Frontmatter } from '@/types/mdx';

type Props = {
  source: Awaited<ReturnType<typeof serialize<unknown, Frontmatter>>>;
};

const ClientDocsPage = ({ source }: Props) => {
  return (
    <FlexBox
      flexDirection="column"
      css={{ padding: '0px 20px 20px 20px', width: '100%' }}
    >
      <MDXProvider frontmatter={source.frontmatter}>
        <MDX {...source} />
      </MDXProvider>
    </FlexBox>
  );
};

export default ClientDocsPage;
