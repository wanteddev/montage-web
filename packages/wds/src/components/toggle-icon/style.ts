import { css, getColorByToken } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { Theme } from '@wanteddev/wds-engine';
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
      : theme.semantic.label.assistive};

    &:disabled,
    &[aria-disabled='true'] {
      color: ${theme.semantic.label.disable};
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
