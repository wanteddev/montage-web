'use client';
import { createContext, useCallback, useContext, useRef } from 'react';

import type { Frontmatter, GroupedPages } from '../types';
import type { PropsWithChildren } from 'react';

type MDXContextType = {
  allFrontmatter: Array<Frontmatter>;
  groupedPages: GroupedPages;
};

export const MDXContext = createContext<MDXContextType>({
  allFrontmatter: [],
  groupedPages: {},
});

export const useMDXContext = () => useContext(MDXContext);

export const MDXProvider = (
  props: PropsWithChildren<Omit<MDXContextType, 'generateHeadingId'>>,
) => {
  const { children, ...value } = props;

  return <MDXContext.Provider value={value}>{children}</MDXContext.Provider>;
};

type HeadingContextType = {
  generateHeadingId: (content: string) => string;
};

export const HeadingContext = createContext<HeadingContextType>({
  generateHeadingId: () => '',
});

export const useHeadingContext = () => useContext(HeadingContext);

export const HeadingProvider = ({ children }: PropsWithChildren) => {
  const existingIdsRef = useRef<Set<string>>(new Set());

  const generateHeadingId = useCallback((content: string): string => {
    if (!content) return '';

    const baseId = content.replaceAll(' ', '-').toLowerCase();

    if (!existingIdsRef.current.has(baseId)) {
      existingIdsRef.current.add(baseId);
      return baseId;
    }

    let counter = 1;
    let newId = `${baseId}-${counter}`;

    while (existingIdsRef.current.has(newId)) {
      counter++;
      newId = `${baseId}-${counter}`;
    }

    existingIdsRef.current.add(newId);
    return newId;
  }, []);

  return (
    <HeadingContext.Provider value={{ generateHeadingId }}>
      {children}
    </HeadingContext.Provider>
  );
};
