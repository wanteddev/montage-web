import { createContext } from '@radix-ui/react-context';

import { TAB_NAME } from './constants';

import type { Dispatch, SetStateAction } from 'react';

export type TabContextType = {
  value?: string;
  onValueChange: (value: string) => void;
  id: string;
  panels: Array<string>;
  onPanelsChange: Dispatch<SetStateAction<Array<string>>>;
};

export const [TabProvider, useTabContext] =
  createContext<TabContextType>(TAB_NAME);
