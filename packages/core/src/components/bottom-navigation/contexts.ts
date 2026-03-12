import { createContext } from '@radix-ui/react-context';

import { BOTTOM_NAVIGATION_NAME } from './constants';

export type BottomNavigationContextType = {
  value?: string;
  onValueChange: (value: string) => void;
};

export const [BottomNavigationProvider, useBottomNavigationContext] =
  createContext<BottomNavigationContextType>(BOTTOM_NAVIGATION_NAME);
