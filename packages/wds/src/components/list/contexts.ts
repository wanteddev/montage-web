import { createContext } from '@radix-ui/react-context';

import { LIST_ITEM_NAME } from './constants';

type ListItemContextType = {
  active: boolean;
  disabled: boolean;
  hasLabelTargetElement: boolean;
};

export const [ListItemProvider, useListItemContext] =
  createContext<ListItemContextType>(LIST_ITEM_NAME);
