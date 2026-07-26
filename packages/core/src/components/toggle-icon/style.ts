import { css, getColorByToken } from '@montage-ui/engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { Theme } from '@montage-ui/engine';
import type { ToggleIconProps } from './types';

export const toggleIconStyle =
  ({ xs, sm, md, lg, xl, activeColor, active, size }: ToggleIconProps) =>
  (theme: Theme) => css`
    ${toggleIconSizeStyle(size)}

    background-color: transparent;
    border-radius: 9999px;
    border: none;
    box-shadow: none;
    color: ${active
      ? getColorByToken(theme, activeColor!)
      : theme.semantic.foreground.neutral.quaternary};

    &:disabled,
    &[aria-disabled='true'] {
      color: ${theme.semantic.foreground.disable.primary};
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${toggleIconSizeStyle(params?.size)}
        ${params?.sx}
      `,
    )}
  `;

const toggleIconSizeStyle = (size: ToggleIconProps['size']) =>
  size !== undefined
    ? css`
        width: ${toCssValue(size)};
        height: ${toCssValue(size)};
        font-size: ${toCssValue(size)};
      `
    : undefined;
