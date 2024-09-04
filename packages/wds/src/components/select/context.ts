import createLooseContext from '../../hooks/use-loose-context';

import { SELECT_NAME } from './constants';

type SelectContextType = {
  onOpenChange: (open: boolean) => void;
};

export const [SelectProvider, useSelectContext] =
  createLooseContext<SelectContextType>(SELECT_NAME);
