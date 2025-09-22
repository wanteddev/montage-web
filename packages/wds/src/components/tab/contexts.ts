import { createContext } from '@radix-ui/react-context';

import { TAB_LIST_NAME, TAB_NAME } from './constants';

import type { Dispatch, SetStateAction } from 'react';

export type TabContextType = {
  value?: string;
  onValueChange: (value: string) => void;
  id: string;
  panels: Array<string>;
  onPanelsChange: Dispatch<SetStateAction<Array<string>>>;
  disableScrollMoveOnChange?: boolean;
  viewportNode: HTMLDivElement | null;
  onViewportNodeChange: (node: HTMLDivElement) => void;
};

export const [TabProvider, useTabContext] =
  createContext<TabContextType>(TAB_NAME);

export type TabListContextType = {
  handleResize: () => void;
};

export const [TabListProvider, useTabListContext] =
  createContext<TabListContextType>(TAB_LIST_NAME);
