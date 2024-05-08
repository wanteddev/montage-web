import { css, keyframes } from '@wanteddev/wds-engine';

import type { ScrollBarProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

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
  ({ orientation }: ScrollBarProps) =>
  (theme: Theme) => css`
    display: flex;
    touch-action: none;
    user-select: none;
    background: transparent;
    transition:
      width 0.2s ease,
      height 0.2s ease;

    &[data-state='hidden'] {
      opacity: 0;
      animation: ${fadeOut} 300ms ease;
    }
    &[data-state='visible'] {
      opacity: 1;
      animation: ${fadeIn} 300ms ease;
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

    ${orientation === 'vertical'
      ? css`
          width: 13px;
          --radix-scroll-area-thumb-width: 7px;

          &:hover {
            width: 17px;
            --radix-scroll-area-thumb-width: 11px;
          }
        `
      : css`
          height: 13px;
          --radix-scroll-area-thumb-height: 7px;

          &:hover {
            height: 17px;
            --radix-scroll-area-thumb-height: 11px;
          }
        `}

    @media (max-width: ${theme.breakpoint.sm}) {
      ${orientation === 'vertical'
        ? css`
            width: 9px;
            --radix-scroll-area-thumb-width: 3px;

            &:hover {
              width: 13px;
              --radix-scroll-area-thumb-width: 7px;
            }
          `
        : css`
            height: 9px;
            --radix-scroll-area-thumb-height: 3px;

            &:hover {
              height: 13px;
              --radix-scroll-area-thumb-height: 7px;
            }
          `}
    }
  `;

export const scrollBarThumbStyle = (theme: Theme) => css`
  cursor: initial;
  position: relative;
  border-radius: 10px;
  background-color: ${theme.palette.fill.strong};
  transition: background-color 160ms ease-out;
`;
