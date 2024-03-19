'use client';
import { createContext, useContext } from 'react';

import type { PropsWithChildren } from 'react';
import type { Frontmatter } from '@/types/mdx';

type MDXContextType = {
  frontmatter: Frontmatter;
};

const FrontmatterContext = createContext<MDXContextType>({
  files: {},
} as any);

export const useMDXContext = () => useContext(FrontmatterContext);

export const MDXProvider = (props: PropsWithChildren<MDXContextType>) => {
  const { children, ...value } = props;

  return (
    <FrontmatterContext.Provider value={value}>
      {children}
    </FrontmatterContext.Provider>
  );
};
