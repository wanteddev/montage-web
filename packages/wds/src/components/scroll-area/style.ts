import { css } from '@wanteddev/wds-engine';

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

export const scrollBarStyle =
  ({ orientation, size }: ScrollBarProps) =>
  (theme: Theme) => css`
    display: flex;
    touch-action: none;
    user-select: none;
    background: transparent;
    transition:
      width 0.2s ease,
      height 0.2s ease,
      opacity 0.2s ease;

    --radix-scroll-area-thumb-width: 100%;
    --radix-scroll-area-thumb-height: 100%;

    [data-role='scroll-area-bar-wrapper'] {
      width: 100%;
      height: 100%;
    }

    ${orientation === 'vertical'
      ? css`
          height: 100%;
          border-left-width: 1px;
          border-left-color: transparent;
          padding: 3px;
        `
      : css`
          width: 100%;
          flex-direction: column;
          border-top-width: 1px;
          border-top-color: transparent;
          padding: 3px;
        `}

    &[data-state='hidden'] {
      opacity: 0;
    }
    &[data-state='visible'] {
      opacity: 1;
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

            &:hover {
              width: 13px;
            }
          `
        : css`
            height: 9px;

            &:hover {
              height: 13px;
            }
          `;
    case 'medium':
      return orientation === 'vertical'
        ? css`
            width: 13px;

            &:hover {
              width: 17px;
            }
          `
        : css`
            height: 13px;

            &:hover {
              height: 17px;
            }
          `;
    case 'responsive':
      return css`
        ${scrollbarSizeStyle({ size: 'medium', orientation }, theme)}

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

  & > [wds-component='with-interaction'] {
    transition: opacity 0.2s ease;
  }
`;
