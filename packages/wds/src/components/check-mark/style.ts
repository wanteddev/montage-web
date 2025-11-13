import { css } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/internal/responsive-props';
import { typographyStyle } from '../../utils';

import type { CheckMarkProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const checkMarkStyle =
  ({ size, bold, tight, xs, sm, md, lg, xl }: CheckMarkProps) =>
  (theme: Theme) => css`
    padding: 0px;
    background-color: transparent;
    border-radius: 9999px;
    border: none;
    box-shadow: none;
    ${checkMarkSizeStyle({ size, bold, tight })}

    svg {
      opacity: 1;
      transform: none;
      transition: color 0.15s ease;
    }

    [data-role='checkbox-icon-wrapper'] {
      background-color: transparent;
      color: ${theme.semantic.label.assistive};
      border-radius: 9999px;
      border: none;
      box-shadow: none;
    }

    &[aria-checked='true'] {
      [data-role='checkbox-icon-wrapper'] {
        background-color: transparent;
        color: ${theme.semantic.primary.normal};
        transform: none;
      }
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params, breakpoint) => css`
        ${(params?.size !== undefined || params?.bold !== undefined) &&
        css`
          ${checkMarkSizeStyle({
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

const checkMarkSizeStyle = ({
  size,
  bold,
  tight,
}: Pick<CheckMarkProps, 'size' | 'tight' | 'bold'>) => {
  switch (size) {
    case 'medium':
      return css`
        font-size: 24px;
        width: 24px;
        height: 24px;
        padding: 0px;

        ${tight &&
        css`
          width: 20px;

          svg {
            display: block;
            margin: 0 auto;
          }

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
        font-size: 20px;
        width: 20px;
        height: 20px;
        padding: 0px;

        ${tight &&
        css`
          width: 16px;

          svg {
            display: block;
            margin: 0 auto;
          }

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
