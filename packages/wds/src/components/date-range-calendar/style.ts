import { css } from '@wanteddev/wds-engine';

import { addOpacity, typographyStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const rangeCalendarContainerStyle = css`
  display: flex;
  flex-direction: row;
`;

export const rangePanelStyle = (theme: Theme) => css`
  width: 276px;
  background-color: ${theme.semantic.background.elevated.normal};
  flex-shrink: 0;
`;

export const rangePanelHeaderStyle = css`
  padding: 20px 12px 10px 12px;
`;

export const rangePanelHeaderLabelStyle = css`
  padding: 0px 12px;
`;

export const rangePanelHeaderNavigationStyle = css`
  padding: 3px 9px;
`;

export const rangePanelWrapperStyle = css`
  height: 334px;
  width: 276px;

  [data-radix-scroll-area-viewport] {
    scroll-padding-top: 54px;
  }
`;

export const rangeStickyHeaderStyle = (theme: Theme) => css`
  top: 0;
  z-index: 10;
  position: sticky;
  background: ${addOpacity(
    theme.semantic.background.elevated.normal,
    theme.opacity[88],
  )};
  backdrop-filter: blur(32px);
`;

export const rangeWeekdayCellStyle = css`
  padding: 11px 0px;
  width: 36px;
`;

export const rangeGridWrapperStyle = css`
  padding: 2px 12px;
  outline: none;
  row-gap: 2px;
  column-gap: 0px;
`;

const rangeCellBaseStyle = (theme: Theme) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    bottom: 2px;
    left: 0;
    right: 0;
    background-color: transparent;
    pointer-events: none;
  }

  &[data-in-range='true']::before {
    background-color: ${addOpacity(
      theme.semantic.primary.normal,
      theme.opacity[8],
    )};
  }

  &[data-range-start='true']::before {
    background-color: ${addOpacity(
      theme.semantic.primary.normal,
      theme.opacity[8],
    )};
    left: 50%;
  }

  &[data-range-end='true']::before {
    background-color: ${addOpacity(
      theme.semantic.primary.normal,
      theme.opacity[8],
    )};
    right: 50%;
  }

  &[data-range-start='true'][data-range-end='true']::before {
    display: none;
  }
`;

export const rangeDayCellStyle = (theme: Theme) => css`
  ${rangeCellBaseStyle(theme)}
  width: 36px;
`;

export const rangeMonthYearCellStyle = rangeCellBaseStyle;

export const rangeDayItemStyle = (theme: Theme) => css`
  color: ${theme.semantic.label.normal};
  border: none;
  padding: 7px 0px;
  margin: 2px;
  background-color: transparent;
  position: relative;
  z-index: 1;
  border-radius: 8px;
  height: fit-content;

  ${typographyStyle('label2', 'medium')}

  &:disabled {
    cursor: initial;
    color: ${theme.semantic.label.assistive};
  }

  &[data-other-month='true'] {
    color: ${theme.semantic.label.disable};
  }

  &[aria-current='date'] {
    color: ${theme.semantic.primary.normal};
    background-color: ${addOpacity(
      theme.semantic.primary.normal,
      theme.opacity[8],
    )};

    &:disabled,
    &[data-other-month='true'] {
      color: ${theme.semantic.label.disable};
      background-color: ${addOpacity(
        theme.semantic.primary.normal,
        theme.opacity[8],
      )};
    }
  }

  &:not(:hover):not(:active) > [wds-component='with-interaction'] {
    transition: none;
  }

  &:focus-visible {
    outline: none;

    & > [wds-component='with-interaction'] {
      transition: none;
      opacity: 0.06;
    }
  }

  &[aria-selected='true'] {
    color: ${theme.semantic.static.white};
    background-color: ${theme.semantic.primary.normal};
    &:disabled,
    &[data-other-month='true'] {
      color: ${addOpacity(theme.semantic.static.white, theme.opacity[43])};
      background-color: ${theme.semantic.primary.normal};
    }
  }
`;
