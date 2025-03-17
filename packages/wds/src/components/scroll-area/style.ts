import { css, keyframes } from '@wanteddev/wds-engine';

import type { ScrollBarProps } from './types';
import type { SerializedStyles, Theme } from '@wanteddev/wds-engine';

export const scrollAreaStyle = css`
  position: relative;
  overflow: hidden;
`;

export const viewportStyle = css`
  width: 100%;
  height: 100%;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
  `;

const fadeOut = keyframes`
    from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
  `;

export const scrollBarStyle =
  ({ orientation, size }: ScrollBarProps) =>
  (theme: Theme) => css`
    display: flex;
    touch-action: none;
    user-select: none;
    background: transparent;

    [data-role='scroll-area-bar-wrapper'] {
      transition:
        width 0.2s ease,
        height 0.2s ease,
        transform 0.2s ease;
      will-change: transform, width, height;
    }

    ${orientation === 'vertical'
      ? css`
          height: 100%;
          border-left-width: 1px;
          border-left-color: transparent;
          padding: 3px;

          [data-role='scroll-area-bar-wrapper'] {
            transform-origin: right;
          }
        `
      : css`
          width: 100%;
          flex-direction: column;
          border-top-width: 1px;
          border-top-color: transparent;
          padding: 3px;

          [data-role='scroll-area-bar-wrapper'] {
            transform-origin: bottom;
          }
        `}

    &[data-state='hidden'] {
      opacity: 0;
      animation: ${fadeOut} 300ms ease;
    }
    &[data-state='visible'] {
      opacity: 1;
      animation: ${fadeIn} 300ms ease;
    }

    ${scrollbarSizeStyle({ size, orientation }, theme)}
  `;

const scrollbarSizeStyle = (
  { size, orientation }: ScrollBarProps,
  theme: Theme,
): SerializedStyles | undefined => {
  switch (size) {
    case 'small':
      return orientation === 'vertical'
        ? css`
            width: 9px;
            --radix-scroll-area-thumb-width: 3px;

            &:hover {
              [data-role='scroll-area-bar-wrapper'] {
                transform: scale(1.33333, 1);
              }
            }
          `
        : css`
            height: 9px;
            --radix-scroll-area-thumb-height: 3px;

            &:hover {
              [data-role='scroll-area-bar-wrapper'] {
                transform: scale(1, 1.33333);
              }
            }
          `;
    case 'normal':
      return orientation === 'vertical'
        ? css`
            width: 13px;
            --radix-scroll-area-thumb-width: 7px;

            &:hover {
              [data-role='scroll-area-bar-wrapper'] {
                transform: scale(1.5714, 1);
              }
            }
          `
        : css`
            height: 13px;
            --radix-scroll-area-thumb-height: 7px;

            &:hover {
              [data-role='scroll-area-bar-wrapper'] {
                transform: scale(1, 1.5714);
              }
            }
          `;
    case 'responsive':
      return css`
        ${scrollbarSizeStyle({ size: 'normal', orientation }, theme)}

        @media (max-width: ${theme.breakpoint.sm}) {
          ${scrollbarSizeStyle({ size: 'small', orientation }, theme)}
        }
      `;
  }
};

export const scrollBarThumbStyle = (theme: Theme) => css`
  cursor: initial;
  position: relative;
  border-radius: 10px;
  background-color: ${theme.semantic.fill.strong};
  transition: background-color 0.2s ease;
  will-change: background-color;
`;
