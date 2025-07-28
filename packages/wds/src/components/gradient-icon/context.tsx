import React, { createContext, useContext } from 'react';

import type { ReactNode } from 'react';

interface ViewBoxContextType {
  viewBox: { width: number; height: number };
}

const ViewBoxContext = createContext<ViewBoxContextType | null>(null);

export const useViewBox = () => {
  const context = useContext(ViewBoxContext);
  return context?.viewBox || { width: 24, height: 24 };
};

interface ViewBoxProviderProps {
  children: ReactNode;
  viewBox: { width: number; height: number };
}

export const ViewBoxProvider = ({
  children,
  viewBox,
}: ViewBoxProviderProps) => {
  return (
    <ViewBoxContext.Provider value={{ viewBox }}>
      {children}
    </ViewBoxContext.Provider>
  );
};
