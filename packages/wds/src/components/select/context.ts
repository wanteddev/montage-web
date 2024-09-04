import createLooseContext from '../../hooks/use-loose-context';

import { SELECT_NAME } from './constants';

type SelectContextType = {
  onOpenChange: (open: boolean) => void;
  enableMenuBottom?: boolean;
};

export const [SelectProvider, useSelectContext] =
  createLooseContext<SelectContextType>(SELECT_NAME);
