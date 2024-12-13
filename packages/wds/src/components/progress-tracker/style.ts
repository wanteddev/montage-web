import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

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
        align-items: center;
        flex-direction: row;
      `
    : css`
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-template-rows: 1fr;
        column-gap: 20px;
      `}
`;

export const progressTrackerItemVerticalStyle = css`
  position: relative;
`;

export const progressTrackerItemHorizontalStyle = css`
  position: relative;

  [data-role='progress-tracker-item-label'] {
    position: absolute;
    left: 50%;
    top: calc(100% + 8px);
    transform: translateX(-50%);
  }
`;

export const progressTrackerItemDividerStyle =
  (isActive: boolean, direction: ProgressTrackerProps['direction']) =>
  (theme: Theme) => css`
    background-color: ${isActive
      ? theme.palette.primary.normal
      : theme.palette.line.normal.normal};

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
    background-color: ${theme.palette.fill.strong};
    color: ${theme.palette.static.white};
    position: relative;
    width: 20px;
    height: 20px;
    position: relative;
    border-radius: 9999px;
    font-size: 14px;

    [data-role='progress-tracker-item-step'] {
      text-shadow: 0px 0px 12px
        ${addOpacity(theme.palette.static.black, theme.opacity[12])};
    }

    ${(isActive || completed) &&
    css`
      background-color: ${theme.palette.primary.normal};

      [data-role='progress-tracker-item-step'] {
        text-shadow: none;
      }
    `}
  `;
