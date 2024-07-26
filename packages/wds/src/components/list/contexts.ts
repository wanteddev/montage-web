import { createContext } from '@radix-ui/react-context';

import { LIST_ITEM_NAME } from './constants';

type ListItemContextType = {
  contentId: string;
};

export const [ListItemProvider, useListItemContext] =
  createContext<ListItemContextType>(LIST_ITEM_NAME);
