import { createContext } from '@radix-ui/react-context';

import { LIST_CELL_NAME } from './constants';

import type { ListCellProps } from './types';

type ListCellContextType = Required<
  Pick<ListCellProps, 'active' | 'disabled' | 'ellipsis' | 'alignItems'>
> & {
  textId: string;
  captionId: string;
};

export const [ListCellProvider, useListCellContext] =
  createContext<ListCellContextType>(LIST_CELL_NAME);
