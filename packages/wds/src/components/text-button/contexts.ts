import createLooseContext from '../../hooks/use-loose-context';

import type { ThemeColorsToken } from '@wanteddev/wds-engine';
import type { TextButtonVariant } from './types';

type TextButtonContextValue = {
  [key in TextButtonVariant]?: ThemeColorsToken;
};

/**
 * @description text button의 기본 color 값을 쉽게 override 하기 위해 사용합니다.
 */
export const [TextButtonProvider, useTextButtonContext] =
  createLooseContext<TextButtonContextValue>('AnyComponent');
