import createLooseContext from '../../hooks/internal/use-loose-context';

import type { ThemeColorsToken } from '@montage-ui/engine';
import type { IconButtonProps, IconButtonVariant } from './types';

type IconButtonContextValue = {
  [key in IconButtonVariant]?: {
    color?: ThemeColorsToken;
    interactionEffect?: IconButtonProps['interactionEffect'];
  };
};

/**
 * Used to easily override the default color value of the icon button.
 */
export const [IconButtonProvider, useIconButtonContext] =
  createLooseContext<IconButtonContextValue>('AnyComponent');
