'use client';
import { createContext, useContext } from 'react';

import type { ComponentDoc } from 'react-docgen-typescript';
import type { PropsWithChildren } from 'react';
import type { Frontmatter } from '@/types/mdx';

type MDXContextType = {
  frontmatter: Frontmatter;
  propTypes: Array<ComponentDoc>;
};

const FrontmatterContext = createContext<MDXContextType>({
  files: {},
  propTypes: [],
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
