import { css } from '@wanteddev/wds-engine';

import type { SliderProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const sliderProgressWrapperStyle =
  ({ disabled }: SliderProps) =>
  (theme: Theme) => css`
    padding: 8px;
    border-radius: 1000px;
    position: relative;

    ${disabled
      ? css`
          cursor: initial;

          [data-role='slider-progress-range'] {
            background-color: ${theme.semantic.interaction.disable};
          }

          [data-role='slider-progress'] {
            background-color: ${theme.semantic.interaction.disable};
          }
        `
      : css`
          cursor: pointer;

          [data-role='slider-progress-range'] {
            background-color: ${theme.semantic.fill.strong};
          }

          [data-role='slider-progress'] {
            background-color: ${theme.semantic.primary.normal};
          }
        `}
  `;

export const sliderProgressStyle = css`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: inherit;
`;

export const sliderProgressRangeStyle = css`
  position: absolute;
  border-radius: inherit;
  height: 100%;
`;

export const sliderThumbStyle = (theme: Theme) => css`
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  position: absolute;
  background-color: ${theme.semantic.primary.normal};
  box-shadow: 0 0 0 2px ${theme.semantic.background.normal.normal};
  top: 0px;
  display: block;
  cursor: pointer;

  &[aria-disabled='true'] {
    pointer-events: none;
    cursor: initial;
    background-color: ${theme.semantic.interaction.disable};

    & > [data-role='slider-thumb-interaction'] {
      opacity: 0;
    }
  }

  &:hover [data-role='slider-thumb-interaction'] {
    opacity: 0.075;
  }

  &:focus,
  &:focus-visible {
    outline: none;
    [data-role='slider-thumb-interaction'] {
      opacity: 0.075;
    }
  }

  &:active [data-role='slider-thumb-interaction'] {
    opacity: 0.075;
  }
`;

export const sliderThumbInteractionStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.primary.normal};
  opacity: 0;
  width: calc(100% + 12px);
  height: calc(100% + 12px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: inherit;
  display: inline-block;
  transition: opacity 0.15s ease;
`;
