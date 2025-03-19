import { createContext } from 'react';

type GnbContextType = {
  setIsSticky?: (value: boolean) => void;
  isSticky?: boolean;
};

export const GnbContext = createContext<GnbContextType>({});
