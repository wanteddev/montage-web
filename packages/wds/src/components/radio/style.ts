import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { typographyStyle } from '../../utils/typography';

import type { RadioProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const radioStyle =
  ({
    size,
    checked,
    // invalid,
    tight,
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
    color: ${theme.semantic.static.white};
    border: none;
    box-shadow: none;
    cursor: pointer;
    border-radius: 9999px;

    & ~ label {
      cursor: pointer;
    }

    span {
      background-color: ${theme.semantic.background.normal.normal};
      box-shadow: inset 0 0 0 1.5px ${theme.semantic.line.normal.normal};
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      color: transparent;

      // safari
      @supports (-webkit-backdrop-filter: none) {
        box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.normal};

        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (-moz-device-pixel-ratio: 2),
          only screen and (device-pixel-ratio: 2) {
          box-shadow: inset 0 0 0 1.5px ${theme.semantic.line.normal.normal};
        }

        @media only screen and (-webkit-device-pixel-ratio: 3),
          only screen and (-moz-device-pixel-ratio: 3),
          only screen and (device-pixel-ratio: 3) {
          box-shadow: inset 0 0 0 1.33333333px
            ${theme.semantic.line.normal.normal};
          transform: translate(0);
        }
      }
    }

    & svg {
      pointer-events: none;
    }

    &:focus-visible {
      outline: none;

      span {
        outline-style: solid;
        outline-width: 2px;
        outline-offset: 2px;
        outline-color: Highlight;
        outline-color: -webkit-focus-ring-color;
      }
    }

    ${radioSizeStyle({ size, tight }, theme)}

    ${checked &&
    css`
      span {
        box-shadow: none;
        background-color: ${theme.semantic.primary.normal};
        color: ${theme.semantic.static.white};
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
        color: ${theme.semantic.label.disable};
      }
    `}

      ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${radioSizeStyle({ size: params?.size, tight }, theme)}
        ${params?.sx}
      `,
    )}
  `;

const radioSizeStyle = (
  { size, tight }: Pick<RadioProps, 'size' | 'tight'>,
  theme: Theme,
) => {
  switch (size) {
    case 'medium':
      return css`
        width: 24px;
        height: 24px;
        font-size: 16px;

        span {
          padding: 2px;
        }

        & ~ label {
          ${typographyStyle('body2', 'regular')}
          color: ${theme.semantic.label.normal};
        }

        ${tight &&
        css`
          width: 20px;

          [wds-component='with-interaction'] {
            width: calc(100% + 12px);
          }
        `}
      `;

    case 'small':
      return css`
        width: 20px;
        height: 20px;
        font-size: 14px;

        span {
          padding: 1px;
        }

        & ~ label {
          ${typographyStyle('label1', 'regular')}
          color: ${theme.semantic.label.normal};
        }

        ${tight &&
        css`
          width: 16px;

          [wds-component='with-interaction'] {
            width: calc(100% + 12px);
          }
        `}
      `;
  }
};
