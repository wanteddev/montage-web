import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/responsive-props';
import { typographyStyle } from '../../utils/typography';

import type { RadioProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

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
    xl,
  }: RadioProps) =>
  (theme: Theme) => css`
    display: flex;
    padding: 2px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: ${theme.palette.static.white};
    border: none;
    box-shadow: none;
    cursor: pointer;
    border-radius: 9999px;

    & ~ label {
      ${typographyStyle('body2', 'regular')}
      color: ${theme.palette.label.normal};
      cursor: pointer;
    }

    span {
      background-color: ${theme.palette.background.normal.normal};
      box-shadow: inset 0 0 0 1.5px ${theme.palette.line.normal.normal};
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      color: transparent;

      // safari
      @supports (-webkit-backdrop-filter: none) {
        box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};

        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (-moz-device-pixel-ratio: 2),
          only screen and (device-pixel-ratio: 2) {
          box-shadow: inset 0 0 0 1.5px ${theme.palette.line.normal.normal};
        }

        @media only screen and (-webkit-device-pixel-ratio: 3),
          only screen and (-moz-device-pixel-ratio: 3),
          only screen and (device-pixel-ratio: 3) {
          box-shadow: inset 0 0 0 1.33333333px
            ${theme.palette.line.normal.normal};
          transform: translate(0);
        }
      }
    }

    & svg {
      pointer-events: none;
    }

    ${radioSizeStyle({ size })}

    ${checked &&
    css`
      span {
        box-shadow: none;
        background-color: ${theme.palette.primary.normal};
        color: ${theme.palette.static.white};
      }
    `}

  ${disabled &&
    css`
      opacity: ${theme.opacity[43]};

      & ~ label,
      & {
        cursor: initial;
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
        ${radioSizeStyle({ size: params?.size })}
        ${params?.sx}
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

        span {
          padding: 2px;
        }
      `;

    case 'small':
      return css`
        width: 20px;
        height: 20px;
        font-size: 14px;

        span {
          padding: 1px;
        }
      `;
  }
};
