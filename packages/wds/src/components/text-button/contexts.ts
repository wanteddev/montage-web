import createLooseContext from '../../hooks/internal/use-loose-context';

import type { ThemeColorsToken } from '@wanteddev/wds-engine';
import type { TextButtonColor } from './types';

type TextButtonContextValue = {
  [key in TextButtonColor]?: ThemeColorsToken;
};

/**
 * Used to easily override the default color value of the text button.
 */
export const [TextButtonProvider, useTextButtonContext] =
  createLooseContext<TextButtonContextValue>('AnyComponent');
