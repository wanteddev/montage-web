import { css } from '@emotion/react';

import { createResponsiveStyle, getColorByToken } from '@/utils';

import type { Theme } from '@emotion/react';
import type { ToggleIconProps } from './types';

export const toggleIconStyle =
  ({ xs, sm, md, lg, activeColor, active, size }: ToggleIconProps) =>
  (theme: Theme) => css`
    ${toggleIconSizeStyle(size)}

    background-color: transparent;
    border-radius: 9999px;
    border: none;
    color: ${active
      ? getColorByToken(theme, activeColor!)
      : theme.palette.label.assistive};

    &:disabled {
      color: ${theme.palette.label.disable};
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params) => css`
        ${toggleIconSizeStyle(params?.size)}
        ${params?.css}
      `,
    )}
  `;

const toggleIconSizeStyle = (size: ToggleIconProps['size']) =>
  Boolean(size)
    ? css`
        width: ${size};
        height: ${size};
        font-size: ${size};
      `
    : undefined;
