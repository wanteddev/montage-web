import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { TimeListProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const timeViewStyle = (theme: Theme) => css`
  width: max-content;
  height: 324px;
  max-height: 324px;
  border-radius: 12px;
  background-color: ${theme.palette.background.elevated.normal};
  flex-direction: column;
  box-shadow: 0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.04)};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};
    pointer-events: none;
  }

  [data-role='time-list-wrapper'] {
    padding: 0 8px;
    flex: 1;
    overflow: hidden;
  }
`;

export const timeListStyle = () => css`
  height: 100%;

  &::after {
    content: '';
    display: block;
    min-height: 100%;
  }
`;

export const timeViewActionAreaStyle = (theme: Theme) => css`
  --wds-action-area-margin-x: 18px;
  --wds-action-area-margin-y: 2px;

  background-color: ${theme.palette.background.elevated.normal};
  border-top: 1px solid ${theme.palette.line.solid.alternative};

  [data-role='action-area-wrapper'] {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    gap: 24px;
  }
`;

export const timeListScrollArea = css`
  width: 100%;
  height: 100%;
`;

export const timeListScrollAreaStyle = () => css`
  height: 100%;
  max-height: 100%;

  [data-radix-scroll-area-viewport] {
    padding: 8px 0;
  }
  [data-radix-scroll-area-content] {
    height: 100%;
  }
`;

export const timeItemStyle =
  ({
    active,
    disabled,
    order,
  }: { active: boolean; disabled: boolean } & Pick<TimeListProps, 'order'>) =>
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
      : order === 'last'
        ? css`
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
          `
        : order === 'single' &&
          css`
            border-radius: 8px;
          `};

    &,
    p {
      text-align: center;
      font-weight: 400;
    }

    ${!disabled &&
    active &&
    css`
      &,
      p {
        color: ${theme.palette.label.normal};
      }

      background-color: ${addOpacity(
        theme.palette.primary.normal,
        theme.opacity[8],
      )};
    `}

    &:focus-visible {
      outline: none;

      [wds-component='with-interaction'] {
        opacity: ${theme.opacity[5]};
      }
    }
  `;
