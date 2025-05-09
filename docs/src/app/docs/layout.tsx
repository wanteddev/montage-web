import { FlexBox } from '@wanteddev/wds';

import { MDXProvider } from '@/features/docs/context';
import { getAllFrontmatter } from '@/features/docs/helpers/mdx';
import { generatePropTypes } from '@/features/docs/helpers/props';
import Lnb from '@/features/docs/components/lnb';
import Footer from '@/features/layout/components/footer';
import DocsDescription from '@/features/docs/components/description';

import DocsClientLayout from './layout.client';

import type { PropsWithChildren } from 'react';

const DocsLayout = async ({ children }: PropsWithChildren) => {
  const allFrontmatter = await getAllFrontmatter();

  const propTypes = generatePropTypes();

  return (
    <FlexBox>
      <MDXProvider propTypes={propTypes} allFrontmatter={allFrontmatter}>
        <Lnb />

        <DocsClientLayout>
          <DocsDescription />
          {children}
          <Footer />
        </DocsClientLayout>
      </MDXProvider>
    </FlexBox>
  );
};

export default DocsLayout;
