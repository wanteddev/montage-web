import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

export const timePickerContentBoxStyle = (theme: Theme) => css`
  width: max-content;
  height: 324px;
  max-height: 324px;
  border-radius: 12px;
  background-color: ${theme.palette.background.elevated.normal};
  flex-direction: column;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};
    pointer-events: none;
  }

  [data-role='time-picker-list-wrapper'] {
    padding: 0 8px;
    flex: 1;
    overflow: hidden;
  }
`;

export const timePickerScrollAreaStyle = () => css`
  height: 100%;
  max-height: 100%;

  [data-radix-scroll-area-viewport] {
    padding: 8px 0;
  }
  [data-radix-scroll-area-content] {
    height: 100%;
  }
`;

export const timePickerActionAreaStyle = (theme: Theme) => css`
  /* height: 56px;
  padding: 0 12px;
  max-height: 56px;
  background-color: ${theme.palette.background.elevated.normal}; */
`;

export const timePickerListStyle = () => css`
  height: 100%;

  &::after {
    content: '';
    display: block;
    min-height: 100%;
  }
`;

export const timePickerListCellStyle =
  ({ active, disabled }: { active: boolean; disabled: boolean }) =>
  (theme: Theme) => css`
    text-align: center;
    padding-left: 0;
    padding-right: 0;
    width: 60px;

    &,
    p {
      text-align: center;
      font-weight: 400;
    }

    [wds-component='with-interaction'] {
      background-color: ${theme.palette.primary.normal};
    }

    ${!disabled &&
    active &&
    css`
      &,
      p {
        color: ${theme.palette.label.normal};
      }

      [wds-component='with-interaction'] {
        opacity: ${theme.opacity[5]};
      }
    `}
  `;

export const timePickerBottomStyle = (theme: Theme) => css`
  --wds-action-area-margin-x: 18px;
  --wds-action-area-margin-y: 2px;

  background-color: ${theme.palette.background.elevated.normal};
  border-top: 1px solid ${theme.palette.line.solid.alternative};

  [data-role='action-area-wrapper'] {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;
