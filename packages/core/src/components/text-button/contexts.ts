import createLooseContext from '../../hooks/internal/use-loose-context';

import type { TextButtonColor } from './types';
import type { ThemeColorsToken } from '@montage-ui/engine';

type TextButtonContextValue = {
  [key in TextButtonColor]?: ThemeColorsToken;
};

/**
 * Used to easily override the default color value of the text button.
 */
export const [TextButtonProvider, useTextButtonContext] =
  createLooseContext<TextButtonContextValue>('AnyComponent');
