import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/responsive-props';

import type { CheckMarkProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const checkMarkStyle =
  ({ size, xs, sm, md, lg, xl }: CheckMarkProps) =>
  (theme: Theme) => css`
    padding: 0px;
    background-color: transparent;
    border-radius: 9999px;
    border: none;
    box-shadow: none;

    svg {
      opacity: 1;
      transform: none;
      transition: color 0.15s ease;
    }

    [data-role='checkbox-icon-wrapper'] {
      ${getSizeStyle(size)}
      background-color: transparent;
      color: ${theme.palette.label.assistive};
      border-radius: 9999px;
      border: none;
      box-shadow: none;
    }

    &[aria-checked='true'] {
      [data-role='checkbox-icon-wrapper'] {
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

const getSizeStyle = (size: CheckMarkProps['size']) => {
  switch (size) {
    case 'normal':
      return css`
        font-size: 24px;
        width: 24px;
        height: 24px;
        padding: 0px;
      `;
    case 'small':
      return css`
        font-size: 20px;
        width: 20px;
        height: 20px;
        padding: 0px;
      `;
  }
};
