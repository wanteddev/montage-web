import { createContext, useContext } from 'react';

import type { DocSearchHit } from './types';

export type DocSearchFilterContextType = {
  category: DocSearchHit['category'] | null;
  setCategory: (category: DocSearchHit['category'] | null) => void;
};

export const DocSearchFilterContext =
  createContext<DocSearchFilterContextType | null>(null);

export const useDocSearchFilterContext = () => {
  const context = useContext(DocSearchFilterContext);

  if (!context) {
    throw new Error(
      'useDocSearchFilterContext must be used within a DocSearchFilterContext',
    );
  }

  return context;
};
