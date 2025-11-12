import createLooseContext from '../../hooks/internal/use-loose-context';

import type { ThemeColorsToken } from '@wanteddev/wds-engine';
import type { ChipProps } from './types';

type ChipContextValue = {
  [key in NonNullable<ChipProps['variant']>]?: ThemeColorsToken;
};

/**
 * Used to easily override the default color value of the chip action.
 */
export const [ChipProvider, useChipContext] =
  createLooseContext<ChipContextValue>('AnyComponent');
