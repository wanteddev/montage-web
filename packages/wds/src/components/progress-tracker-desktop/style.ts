import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

export const progressTrackerDesktopWrapperStyle = css`
  width: 100%;
  height: fit-content;
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const progressChevronStyle = (theme: Theme) => css`
  font-size: 16px;
  color: ${theme.palette.label.assistive};
`;

export const progressCircleStyle =
  (isActive: boolean, completed: boolean) => (theme: Theme) => css`
    background-color: ${theme.palette.fill.strong};
    color: ${theme.palette.static.white};
    width: 20px;
    height: 20px;
    position: relative;
    border-radius: 9999px;
    font-size: 14px;

    ${(isActive || completed) &&
    css`
      background-color: ${theme.palette.primary.normal};
    `}
  `;

export const progressTrackerLabelStyle = css`
  padding: 1px 0px;
  height: fit-content;
`;
