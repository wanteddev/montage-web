import { createContext } from '@radix-ui/react-context';

import { SELECT_NAME } from './constants';

type SelectContextType = {
  onOpenChange: (open: boolean) => void;
  enableMenuActionArea?: boolean;
  value?: string | Array<string>;
  isMultiple?: boolean;
};

export const [SelectProvider, useSelectContext] =
  createContext<SelectContextType>(SELECT_NAME);
