import { MDXProvider } from '@/features/docs/context';
import { getAllFrontmatter } from '@/features/docs/helpers/mdx';
import { generatePropTypes } from '@/features/docs/helpers/props';
import LNB from '@/features/docs/components/lnb';
import Sidebar from '@/features/docs/components/sidebar';

import DocsClientLayout from './layout.client';

import type { PropsWithChildren } from 'react';

const DocsLayout = async ({ children }: PropsWithChildren) => {
  const allFrontmatter = await getAllFrontmatter();

  const propTypes = generatePropTypes();

  return (
    <DocsClientLayout>
      <MDXProvider propTypes={propTypes} allFrontmatter={allFrontmatter}>
        <LNB />

        {children}

        <Sidebar />
      </MDXProvider>
    </DocsClientLayout>
  );
};

export default DocsLayout;
