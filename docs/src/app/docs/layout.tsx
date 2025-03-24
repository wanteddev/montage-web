import { FlexBox } from '@wanteddev/wds';

import { MDXProvider } from '@/features/docs/context';
import { getAllFrontmatter } from '@/features/docs/helpers/mdx';
import { generatePropTypes } from '@/features/docs/helpers/props';
import Lnb from '@/features/docs/components/lnb';
import Sidebar from '@/features/docs/components/sidebar';
import DocsDescription from '@/features/docs/components/description';

import DocsClientLayout from './layout.client';

import type { PropsWithChildren } from 'react';

const DocsLayout = async ({ children }: PropsWithChildren) => {
  const allFrontmatter = await getAllFrontmatter();

  const propTypes = generatePropTypes();

  return (
    <DocsClientLayout>
      <MDXProvider propTypes={propTypes} allFrontmatter={allFrontmatter}>
        <Lnb />

        <FlexBox
          data-algolia-page-scope
          flexDirection="column"
          sx={{
            padding: '0px var(--layout-padding) 60px var(--layout-padding)',
            maxWidth: '1040px',
            width: '100%',
            boxSizing: 'content-box',
          }}
        >
          <DocsDescription />

          {children}
        </FlexBox>

        <Sidebar />
      </MDXProvider>
    </DocsClientLayout>
  );
};

export default DocsLayout;
