import { createContext } from '@radix-ui/react-context';

import { LIST_ITEM_NAME } from './constants';

import type { ListItemProps } from './types';

type ListItemContextType = Required<
  Pick<ListItemProps, 'active' | 'disabled' | 'ellipsis' | 'alignItems'>
>;

export const [ListItemProvider, useListItemContext] =
  createContext<ListItemContextType>(LIST_ITEM_NAME);
