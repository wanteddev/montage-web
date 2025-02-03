import { createContext } from '@radix-ui/react-context';

import { CATEGORY_LIST_NAME, CATEGORY_NAME } from './constants';

import type { CategoryListProps } from './types';
import type { Dispatch, SetStateAction } from 'react';

export type CategoryContextType = {
  value?: string;
  onValueChange: (value: string) => void;
  id: string;
  panels: Array<string>;
  onPanelsChange: Dispatch<SetStateAction<Array<string>>>;
  disableScrollMoveOnChange?: boolean;
  enableScrollMoveOnMount?: boolean;
  viewportNode: HTMLDivElement | null;
  onViewportNodeChange: (node: HTMLDivElement) => void;
};

export const [CategoryProvider, useCategoryContext] =
  createContext<CategoryContextType>(CATEGORY_NAME);

export type CategoryListContextType = {
  handleResize: () => void;
  variant: CategoryListProps['variant'];
  size: CategoryListProps['size'];
  xs: CategoryListProps['xs'];
  sm: CategoryListProps['sm'];
  md: CategoryListProps['md'];
  lg: CategoryListProps['lg'];
  xl: CategoryListProps['xl'];
};

export const [CategoryListProvider, useCategoryListContext] =
  createContext<CategoryListContextType>(CATEGORY_LIST_NAME);
