import createLooseContext from '../../hooks/use-loose-context';

import type { ThemeColorsToken } from '@wanteddev/wds-engine';
import type { IconButtonVariant } from './types';

type IconButtonContextValue = {
  [key in IconButtonVariant]?: ThemeColorsToken;
};

/**
 * @description icon button의 기본 color 값을 쉽게 override 하기 위해 사용합니다.
 */
export const [IconButtonProvider, useIconButtonContext] =
  createLooseContext<IconButtonContextValue>('AnyComponent');
