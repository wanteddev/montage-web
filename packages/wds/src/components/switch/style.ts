import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/responsive-props';

import type { SwitchProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const switchStyle =
  ({ size, checked, disabled, xs, sm, md, lg, xl }: SwitchProps) =>
  (theme: Theme) => css`
    display: flex;
    background-color: ${theme.palette.fill.strong};
    border: none;
    box-shadow: none;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    height: fit-content;
    flex-shrink: 0;

    span {
      border-radius: 1000px;
      flex-shrink: 0;
      position: relative;
      background-color: ${theme.palette.static.white};
      transition: transform 100ms;
    }

    ${switchSizeStyle({ size, checked })}

    ${checked &&
    css`
      background-color: ${theme.palette.primary.normal};

      span {
        transform: translateX(calc(100% - 4px));
      }
    `}

  ${disabled &&
    css`
      opacity: ${theme.opacity[43]};
      cursor: initial;
    `}

      ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${switchSizeStyle({
          size: params?.size || size,
          checked,
        })}
        ${params?.sx}
      `,
    )}
  `;

const switchSizeStyle = ({
  size,
  checked,
}: Pick<SwitchProps, 'size' | 'checked'>) => {
  switch (size) {
    case 'medium':
      return css`
        border-radius: 100px;
        width: 52px;
        padding: 4px;

        ${checked &&
        css`
          span {
            transform: translateX(calc(100% - 4px));
          }
        `}
        & span {
          width: 24px;
          height: 24px;
        }
      `;

    case 'small':
      return css`
        border-radius: 75px;
        width: 39px;
        padding: 3px;

        ${checked &&
        css`
          span {
            transform: translateX(calc(100% - 3px));
          }
        `}

        & span {
          width: 18px;
          height: 18px;
        }
      `;
  }
};
