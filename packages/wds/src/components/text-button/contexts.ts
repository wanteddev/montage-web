import createLooseContext from '../../hooks/use-loose-context';

import type { ThemeColorsToken } from '@wanteddev/wds-engine';
import type { TextButtonVariant } from './types';

type TextButtonContextValue = {
  [key in TextButtonVariant]?: ThemeColorsToken;
};

/**
 * Used to easily override the default color value of the text button.
 */
export const [TextButtonProvider, useTextButtonContext] =
  createLooseContext<TextButtonContextValue>('AnyComponent');
