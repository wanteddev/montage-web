import { css } from '@wanteddev/wds-engine';

import type { TimePickerListProps } from './types';
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

export const timePickerListStyle = () => css`
  height: 100%;

  &::after {
    content: '';
    display: block;
    min-height: 100%;
  }
`;

export const timePickerListCellStyle =
  ({
    active,
    disabled,
    order,
  }: { active: boolean; disabled: boolean } & Pick<
    TimePickerListProps,
    'order'
  >) =>
  (theme: Theme) => css`
    text-align: center;
    padding-left: 0;
    padding-right: 0;
    width: 60px;

    ${order === 'first'
      ? css`
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        `
      : order === 'last' &&
        css`
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        `};

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

export const timePickerActionAreaStyle = (theme: Theme) => css`
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
