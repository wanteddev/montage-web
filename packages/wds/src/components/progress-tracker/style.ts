import { css } from '@wanteddev/wds-engine';

import { addOpacity, ellipsisTypographyStyle } from '../../utils';

import type { ProgressTrackerProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const progressTrackerWrapperStyle = ({
  direction,
}: ProgressTrackerProps) => css`
  width: 100%;
  height: fit-content;
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;

  ${direction === 'horizontal'
    ? css`
        flex-direction: row;
      `
    : css`
        flex-direction: column;
      `}
`;

export const progressTrackerItemVerticalStyle = css`
  position: relative;

  [data-role='progress-tracker-item-label'] {
    display: block;
    text-align: left;
    margin-right: 6px;
  }
`;

export const progressTrackerItemVerticalLabelWrapperStyle = css`
  margin-bottom: 12px;
  height: 20px;
`;

export const progressTrackerItemHorizontalStyle = css`
  flex: 1 0 0;
  min-width: 0;

  [data-role='progress-tracker-item-label'] {
    ${ellipsisTypographyStyle(1)}
  }
`;

export const progressTrackerItemHorizontalWrapperStyle = css`
  width: 100%;
  position: relative;
`;

export const progressTrackerItemDividerStyle =
  (isActive: boolean, direction: ProgressTrackerProps['direction']) =>
  (theme: Theme) => css`
    background-color: ${isActive
      ? theme.semantic.primary.normal
      : theme.semantic.line.normal.normal};

    ${direction === 'vertical'
      ? css`
          height: 100%;
          width: 1px;
          flex: 1 1 0;
        `
      : css`
          flex: 1 1 auto;
          height: 1px;
        `}
  `;

export const progressTrackerItemContentStyle = css`
  padding-bottom: 20px;
  width: 100%;
`;

export const progressCircleStyle =
  (isActive: boolean, completed: boolean) => (theme: Theme) => css`
    background-color: ${theme.semantic.fill.strong};
    color: ${theme.semantic.static.white};
    position: relative;
    width: 20px;
    height: 20px;
    position: relative;
    border-radius: 9999px;
    font-size: 14px;

    [data-role='progress-tracker-item-step'] {
      text-shadow: 0px 0px 12px
        ${addOpacity(theme.semantic.static.black, theme.opacity[12])};
    }

    ${(isActive || completed) &&
    css`
      background-color: ${theme.semantic.primary.normal};

      [data-role='progress-tracker-item-step'] {
        text-shadow: none;
      }
    `}
  `;
