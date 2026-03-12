import { createContext } from '@radix-ui/react-context';

import { TABLE_NAME } from './constants';

type TableContextType = {
  isSticky: boolean;
};

export const [TableProvider, useTableContext] =
  createContext<TableContextType>(TABLE_NAME);
