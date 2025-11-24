import { type Theme, css, getColorByToken } from '@wanteddev/wds-engine';

import { toCssValue } from '../../utils/internal/css';

import type { WithInteractionProps } from './types';

type VariantType = 'normal' | 'light' | 'strong';

export const interactionStyle =
  ({ color, width, height }: WithInteractionProps) =>
  (theme: Theme) => css`
    overflow: hidden;
    position: absolute;
    z-index: 0;
    box-sizing: content-box;
    border-radius: inherit;
    opacity: ${theme.opacity[0]};
    background-color: ${getColorByToken(theme, color!)};
    transition:
      opacity 0.15s ease,
      transform 0.15s ease;
    transform-origin: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    ${width !== undefined &&
    css`
      width: ${toCssValue(width)};
    `}
    ${height !== undefined &&
    css`
      height: ${toCssValue(height)};
    `}
  `;

export const getWrapperStyle =
  ({ disabled, variant, scale }: WithInteractionProps) =>
  (theme: Theme) => css`
    position: relative;

    &:focus-visible {
      outline-style: solid;
      outline-width: 2px;
    }

    ${!disabled &&
    css`
      &:hover > [wds-component='with-interaction'] {
        ${hoverInteractionStyle(theme, variant)}
      }

      @media not (pointer: fine) {
        &:hover > [wds-component='with-interaction'] {
          opacity: ${theme.opacity[0]};
        }
      }

      &:focus-visible > [wds-component='with-interaction'] {
        opacity: ${theme.opacity[0]};
      }
      &:active > [wds-component='with-interaction'] {
        ${activeInteractionStyle(theme, variant)}
      }

      ${scale &&
      css`
        & > [wds-component='with-interaction'] {
          will-change: transform;
          transform: translate(-50%, -50%) scale(0.95);
        }

        &:hover > [wds-component='with-interaction'] {
          transform: translate(-50%, -50%) scale(1);
        }

        @media not (pointer: fine) {
          & > [wds-component='with-interaction'] {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}
    `}
  `;

export const hoverInteractionStyle = (
  theme: Theme,
  variant: VariantType = 'normal',
) => {
  switch (variant) {
    case 'normal':
      return css`
        opacity: ${theme.opacity[5]};
      `;
    case 'light':
      return css`
        opacity: ${0.0375};
      `;
    case 'strong':
      return css`
        opacity: ${0.075};
      `;
  }
};

export const activeInteractionStyle = (
  theme: Theme,
  variant: VariantType = 'normal',
) => {
  switch (variant) {
    case 'normal':
      return css`
        opacity: ${theme.opacity[12]};
      `;
    case 'light':
      return css`
        opacity: ${0.09};
      `;
    case 'strong':
      return css`
        opacity: ${0.18};
      `;
  }
};
