import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/internal/responsive-props';

import type { CheckboxProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const checkboxStyle =
  ({
    size,
    bold,
    checked,
    indeterminate,
    disabled,
    tight,
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
    color: ${theme.semantic.static.white};
    border: none;
    box-shadow: none;
    cursor: pointer;
    border-radius: 5px;

    & ~ label {
      color: ${theme.semantic.label.normal};
      cursor: pointer;
    }

    & > [wds-component='with-interaction'] {
      border-radius: 9999px;
    }

    [data-role='checkbox-icon-wrapper'] {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: ${theme.semantic.background.normal.normal};
      border-radius: inherit;
      box-shadow: inset 0 0 0 1.5px ${theme.semantic.line.normal.normal};

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

      transition:
        background-color 0.2s ease,
        box-shadow 0.2s ease;
    }

    &:focus-visible {
      outline: none;

      [data-role='checkbox-icon-wrapper'] {
        outline-style: solid;
        outline-width: 2px;
        outline-offset: 2px;
        outline-color: Highlight;
        outline-color: -webkit-focus-ring-color;
      }
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

    ${checkboxSizeStyle({ size, bold, tight })}

    ${(checked || indeterminate) &&
    css`
      [data-role='checkbox-icon-wrapper'] {
        box-shadow: inset 0 0 0 1.5px ${theme.semantic.primary.normal};
        background-color: ${theme.semantic.primary.normal};

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
      (params, breakpoint) => css`
        ${(params?.size !== undefined || params?.bold !== undefined) &&
        css`
          ${checkboxSizeStyle({
            size: getPreviousValue(
              { xs, sm, md, lg, xl },
              'size',
              params.size,
              breakpoint!,
            ),
            bold: getPreviousValue(
              { xs, sm, md, lg, xl },
              'bold',
              params.bold,
              breakpoint!,
            ),
            tight,
          })}
        `}
        ${params?.sx}
      `,
    )}
  `;

const checkboxSizeStyle = ({
  size,
  bold,
  tight,
}: Pick<CheckboxProps, 'size' | 'bold' | 'tight'>) => {
  switch (size) {
    case 'medium':
      return css`
        width: 24px;
        height: 24px;
        font-size: 16px;
        padding: 3px;

        ${tight === true &&
        css`
          padding-left: 1px;
          padding-right: 1px;
          width: 20px;

          [wds-component='with-interaction'] {
            width: calc(100% + 12px);
          }
        `}

        & ~ label {
          ${typographyStyle('body2', bold ? 'bold' : 'regular')}
        }
      `;

    case 'small':
      return css`
        width: 20px;
        height: 20px;
        font-size: 14px;
        padding: 2px;

        ${tight === true &&
        css`
          padding-left: 0px;
          padding-right: 0px;
          width: 16px;

          [wds-component='with-interaction'] {
            width: calc(100% + 12px);
          }
        `}

        & ~ label {
          ${typographyStyle('label1', bold ? 'bold' : 'regular')}
        }
      `;
  }
};
