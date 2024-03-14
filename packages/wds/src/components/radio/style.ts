import { css } from '@emotion/react';

import { createResponsiveStyle, typographyStyle } from '@/utils';

import type { RadioProps } from './types';
import type { Theme } from '@emotion/react';

export const radioStyle =
  ({
    size,
    checked,
    // invalid,
    disabled,
    xs,
    sm,
    md,
    lg,
  }: RadioProps) =>
  (theme: Theme) => css`
    display: flex;
    padding: 2px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: ${theme.palette.static.white};
    border: none;
    cursor: pointer;
    border-radius: 50%;

    & ~ label {
      ${typographyStyle('body2_normal', 'regular')}
      color: ${theme.palette.label.normal};
      cursor: pointer;
    }

    span {
      background-color: ${theme.palette.background.normal.normal};
      border: 1.5px solid ${theme.palette.line.normal.normal};
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    & svg {
      pointer-events: none;
    }

    ${radioSizeStyle({ size })}

    ${checked &&
    css`
      span {
        border: none;
        background-color: ${theme.palette.primary.normal};
      }
    `}

  ${disabled &&
    css`
      opacity: ${theme.opacity[43]};

      & ~ label,
      & {
        cursor: not-allowed;
      }

      & ~ label {
        color: ${theme.palette.label.disable};
      }
    `}

      ${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params) => css`
        ${radioSizeStyle({ size: params?.size })}
        ${params?.css}
      `,
    )}
  `;

const radioSizeStyle = ({ size }: Pick<RadioProps, 'size'>) => {
  switch (size) {
    case 'normal':
      return css`
        width: 24px;
        height: 24px;
        font-size: 16px;
      `;

    case 'small':
      return css`
        width: 20px;
        height: 20px;
        font-size: 14px;
      `;
  }
};
