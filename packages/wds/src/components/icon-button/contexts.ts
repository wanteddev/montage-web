import createLooseContext from '../../hooks/internal/use-loose-context';

import type { ThemeColorsToken } from '@wanteddev/wds-engine';
import type { IconButtonVariant } from './types';

type IconButtonContextValue = {
  [key in IconButtonVariant]?: ThemeColorsToken;
};

/**
 * Used to easily override the default color value of the icon button.
 */
export const [IconButtonProvider, useIconButtonContext] =
  createLooseContext<IconButtonContextValue>('AnyComponent');
