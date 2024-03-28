import { css } from '@emotion/react';

import { createResponsiveStyle } from '@/utils';

import type { NestedCheckboxProps } from './types';
import type { Theme } from '@emotion/react';

export const nestedCheckboxStyle =
  ({ size, xs, sm, md, lg, xl }: NestedCheckboxProps) =>
  (theme: Theme) => css`
    padding: 0px;
    background-color: transparent;
    border-radius: 9999px;
    border: none;

    svg {
      opacity: 1;
      transform: none;
      transition: color 0.15s ease;
    }

    span {
      ${getSizeStyle(size)}
      background-color: transparent;
      color: ${theme.palette.label.assistive};
      border-radius: 9999px;
      border: none;
      box-shadow: none;
    }

    &[aria-checked='true'] {
      span {
        background-color: transparent;
        color: ${theme.palette.primary.normal};
        transform: none;
      }
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${getSizeStyle(params?.size)}
      `,
    )}
  `;

const getSizeStyle = (size: NestedCheckboxProps['size']) => {
  switch (size) {
    case 'normal':
      return css`
        font-size: 24px;
      `;
    case 'small':
      return css`
        font-size: 24px;
      `;
  }
};
