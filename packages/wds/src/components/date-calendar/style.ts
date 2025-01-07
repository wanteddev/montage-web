import { css } from '@wanteddev/wds-engine';

import { addOpacity, typographyStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const dateCalendarStyle = css`
  width: 276px;
`;

export const stickyDateCalendarStyle = (theme: Theme) => css`
  top: 0;
  z-index: 10;
  position: sticky;
  background: ${addOpacity(
    theme.palette.background.elevated.normal,
    theme.opacity[88],
  )};
  backdrop-filter: blur(32px);
`;

export const dateCalendarHeaderStyle = css`
  padding: 20px 12px 10px 12px;
`;

export const dateCalendarHeaderLabelStyle = css`
  padding: 0px 12px;
`;

export const weekdayCellStyle = css`
  padding: 11px 0px;
  width: 36px;
`;

export const dateCalendarHeaderLabelButtonStyle = (theme: Theme) => css`
  color: ${theme.palette.label.normal};
  padding-top: 0px;
  padding-bottom: 0px;

  & > [wds-component='with-interaction'] {
    height: calc(100% + 8px);
  }
`;

export const dateCalendarHeaderNavigationStyle = css`
  padding: 3px 9px;
`;

export const dateCalendarWrapperStyle = css`
  height: 334px;
  width: 276px;
`;

export const dateYearMonthWrapperStyle = css`
  padding: 2px 12px;
  outline: none;
`;

export const dateItemButtonStyle = (theme: Theme) => css`
  color: ${theme.palette.label.normal};
  border: none;
  border-radius: 10000px;
  padding: 7px 0px;
  margin: 2px;
  background-color: transparent;

  ${typographyStyle('label2', 'medium')}

  &:disabled {
    cursor: initial;
    color: ${theme.palette.label.assistive};
  }

  &[data-other-month='true'] {
    color: ${theme.palette.label.assistive};
  }

  &[aria-current='date'] {
    color: ${theme.palette.primary.normal};
    background-color: ${addOpacity(
      theme.palette.primary.normal,
      theme.opacity[8],
    )};

    &:disabled,
    &[data-other-month='true'] {
      color: ${theme.palette.label.disable};
      background-color: ${addOpacity(
        theme.palette.primary.normal,
        theme.opacity[8],
      )};
    }
  }

  &[aria-selected='true'] {
    color: ${theme.palette.inverse.label};
    background-color: ${theme.palette.primary.normal};
    &:disabled,
    &[data-other-month='true'] {
      color: ${addOpacity(theme.palette.inverse.label, theme.opacity[43])};
      background-color: ${theme.palette.primary.normal};
    }
  }

  &[aria-checked='true'] {
    color: ${theme.palette.inverse.label};
    background-color: ${theme.palette.primary.normal};
    &:disabled,
    &[data-other-month='true'] {
      color: ${addOpacity(theme.palette.inverse.label, theme.opacity[43])};
      background-color: ${theme.palette.primary.normal};
    }
  }
`;
