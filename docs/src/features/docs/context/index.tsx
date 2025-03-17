'use client';
import { createContext, useContext } from 'react';

import type { Frontmatter } from '../types';
import type { ComponentDoc } from 'react-docgen-typescript';
import type { PropsWithChildren } from 'react';

type MDXContextType = {
  propTypes: Array<ComponentDoc>;
  allFrontmatter: Array<Frontmatter>;
};

export const MDXContext = createContext<MDXContextType>({
  propTypes: [],
  allFrontmatter: [],
});

export const useMDXContext = () => useContext(MDXContext);

export const MDXProvider = (props: PropsWithChildren<MDXContextType>) => {
  const { children, ...value } = props;

  return <MDXContext.Provider value={value}>{children}</MDXContext.Provider>;
};
