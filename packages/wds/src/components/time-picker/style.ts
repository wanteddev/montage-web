import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

export const timePickerInputStyle = () => css`
  cursor: text;
`;

export const timePickerContentBoxStyle = (theme: Theme) => css`
  width: max-content;
  height: 324px;
  max-height: 324px;
  border-radius: 12px;
  background-color: ${theme.palette.background.elevated.normal};
  box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};

  [data-role='time-picker-list-wrapper'] {
    height: 100%;
    max-height: 100%;
    padding: 0 8px;
  }
`;

export const timePickerScrollAreaStyle = () => css`
  height: 100%;
  max-height: 100%;
  padding: 8px 0;

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
    min-height: calc(100% - 48px);
  }
`;

export const timePickerListCellStyle =
  ({ active, disabled }: { active: boolean; disabled: boolean }) =>
  (theme: Theme) => css`
    text-align: center;

    p {
      text-align: center;
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
