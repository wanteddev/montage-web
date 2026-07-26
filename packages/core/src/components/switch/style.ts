import { css } from '@montage-ui/engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { hoverInteractionStyle } from '../with-interaction/style';

import type { SwitchProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const switchStyle =
  ({ size, checked, disabled, xs, sm, md, lg, xl }: SwitchProps) =>
  (theme: Theme) => css`
    display: flex;
    background-color: ${theme.semantic.surface.neutral.strong};
    border: none;
    box-shadow: none;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    height: fit-content;
    flex-shrink: 0;
    padding: var(--switch-padding, 4px);
    width: var(--switch-width, 52px);
    transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);

    & > [data-component='with-interaction'] {
      transition:
        opacity 200ms cubic-bezier(0.4, 0, 0.2, 1),
        background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:active > [data-component='with-interaction'] {
      ${hoverInteractionStyle(theme, 'normal')}
    }

    span {
      z-index: 1;
      border-radius: 1000px;
      flex-shrink: 0;
      position: relative;
      background-color: ${theme.semantic.static.white};
      transition:
        margin-left 200ms cubic-bezier(0.4, 0, 0.2, 1),
        width 200ms cubic-bezier(0.4, 0, 0.2, 1);
      display: block;
      transform-origin: 100%;
      width: var(--switch-thumb-size, 24px);
      height: var(--switch-thumb-size, 24px);
      margin-left: 0px;
    }

    ${switchSizeStyle({ size })}

    &:hover:active {
      span {
        width: calc(
          var(--switch-thumb-size, 24px) + var(--switch-padding, 4px)
        );
      }
    }

    ${checked &&
    css`
      background-color: ${theme.semantic.surface.brand.primary};

      span {
        margin-left: calc(
          var(--switch-width, 52px) - var(--switch-thumb-size, 24px) -
            (var(--switch-padding, 4px) * 2)
        );
      }

      &:hover:active {
        span {
          width: calc(
            var(--switch-thumb-size, 24px) + var(--switch-padding, 4px)
          );
          margin-left: calc(
            var(--switch-width, 52px) - var(--switch-thumb-size, 24px) -
              (var(--switch-padding, 4px) * 3)
          );
        }
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
          size: params?.size,
        })}
        ${params?.sx}
      `,
    )}
  `;

const switchSizeStyle = ({ size }: Pick<SwitchProps, 'size'>) => {
  switch (size) {
    case 'medium':
      return css`
        border-radius: 100px;

        --switch-width: 52px;
        --switch-padding: 4px;
        --switch-thumb-size: 24px;
      `;

    case 'small':
      return css`
        border-radius: 75px;

        --switch-width: 39px;
        --switch-padding: 3px;
        --switch-thumb-size: 18px;
      `;
  }
};
