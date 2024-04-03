import { css } from '@emotion/react';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';

import type { CheckboxProps } from './types';
import type { Theme } from '@emotion/react';

export const checkboxStyle =
  ({
    size,
    bold,
    checked,
    disabled,
    // label에 invalid 처리는 안하기로 결정
    xs,
    sm,
    md,
    lg,
    xl,
  }: CheckboxProps) =>
  (theme: Theme) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: ${theme.palette.static.white};
    border: none;
    box-shadow: none;
    cursor: pointer;
    border-radius: 3px;

    & ~ label {
      color: ${theme.palette.label.normal};
      cursor: pointer;
    }

    & > [wds-component='with-interaction'] {
      border-radius: 9999px;
    }

    span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: ${theme.palette.background.normal.normal};
      border-radius: 3px;
      box-shadow: inset 0 0 0 1.5px ${theme.palette.line.normal.normal};

      transition:
        background-color 0.2s ease,
        box-shadow 0.2s ease;
    }

    & svg {
      opacity: 0;
      transition:
        opacity 0.15s ease,
        transform 0.2s ease;
      pointer-events: none;
      transform: scale(0.75);
      will-change: transform;
    }

    ${checkboxSizeStyle({ size, bold })}

    ${checked &&
    css`
      span {
        box-shadow: inset 0 0 0 1.5px ${theme.palette.primary.normal};
        background-color: ${theme.palette.primary.normal};

        svg {
          opacity: 1;
          transform: scale(1);
        }
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
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${checkboxSizeStyle({
          size: params?.size || size,
          bold: params?.bold || bold,
        })}
        ${params?.css}
      `,
    )}
  `;

const checkboxSizeStyle = ({
  size,
  bold,
}: Pick<CheckboxProps, 'size' | 'bold'>) => {
  switch (size) {
    case 'normal':
      return css`
        width: 24px;
        height: 24px;
        font-size: 16px;
        padding: 3px;

        & ~ label {
          ${typographyStyle('body2_normal', bold ? 'bold' : 'regular')}
        }
      `;

    case 'small':
      return css`
        width: 20px;
        height: 20px;
        font-size: 14px;
        padding: 2px;

        & ~ label {
          ${typographyStyle('label1_normal', bold ? 'bold' : 'regular')}
        }
      `;
  }
};
