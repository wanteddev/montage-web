import { css } from '@emotion/react';

import { createResponsiveStyle } from '../../utils/responsive-props';

import type { Theme } from '@emotion/react';
import type { ProgressStepIndicatorProps } from './types';

export const progressStepWrapperStyle =
  ({
    size,
    divider,
    xs,
    sm,
    md,
    lg,
    xl,
  }: Partial<ProgressStepIndicatorProps>) =>
  (theme: Theme) => css`
    width: 100%;
    position: relative;

    ${progressSizeStyle(size)}
    ${progressDividerStyle(divider)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${progressSizeStyle(params?.size)}
        ${progressDividerStyle(params?.divider)}
        ${params?.css}
      `,
    )}
  `;

export const progressListWrapperStyle = css`
  display: flex;
  align-items: center;
  height: 100%;

  & > li:first-of-type {
    border-top-left-radius: 999px;
    border-bottom-left-radius: 999px;
  }

  & > li:last-of-type {
    border-top-right-radius: 999px;
    border-bottom-right-radius: 999px;
  }
`;

export const progressListStyle = (theme: Theme) => css`
  width: var(--wds-progress-step-indicator-width);
  height: 100%;
  position: relative;
  background-color: ${theme.palette.fill.normal};
  overflow: hidden;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: ${theme.palette.primary.normal};
    position: absolute;
    inset: var(--wds-progress-step-indicator-inset);
    transition: left 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const progressSizeStyle = (size: ProgressStepIndicatorProps['size']) => {
  switch (size) {
    case 'medium':
      return css`
        height: 8px;
      `;
    case 'small':
      return css`
        height: 4px;
      `;
  }
};

const progressDividerStyle = (
  divider: ProgressStepIndicatorProps['divider'],
) => {
  switch (divider) {
    case true:
      return css`
        ol {
          gap: 1px;
        }
      `;
    case false:
      return css`
        ol {
          gap: 0px;
        }
      `;
  }
};
