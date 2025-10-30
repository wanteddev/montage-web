import createLooseContext from '../../hooks/internal/use-loose-context';

import type { ThemeColorsToken } from '@wanteddev/wds-engine';
import type { ChipActionProps } from './types';

type ChipActionContextValue = {
  [key in NonNullable<ChipActionProps['variant']>]?: ThemeColorsToken;
};

/**
 * Used to easily override the default color value of the chip action.
 */
export const [ChipActionProvider, useChipActionContext] =
  createLooseContext<ChipActionContextValue>('AnyComponent');
