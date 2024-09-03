import { createContext } from '@radix-ui/react-context';

import { SELECT_NAME } from './constants';

type SelectContextType = {
  onOpenChange: (open: boolean) => void;
};

export const [SelectProvider, useSelectContext] =
  createContext<SelectContextType>(SELECT_NAME);
