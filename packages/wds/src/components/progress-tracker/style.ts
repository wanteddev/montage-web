import { css } from '@emotion/react';

import { addOpacity } from '@/utils/color';

import type { Theme } from '@emotion/react';

export const progressTrackerWrapperStyle = css`
  width: 100%;
  height: fit-content;
  position: relative;
`;

export const progressTrackerItemStyle = (
  isFirst: boolean,
  isLast?: boolean,
) => css`
  padding-left: 4px;
  padding-right: 4px;
  position: relative;

  ${isFirst &&
  css`
    padding-left: 0px;
  `}

  ${isLast &&
  css`
    padding-right: 0px;
  `}
`;

export const progressConnectorStyle =
  (isActive: boolean) => (theme: Theme) => css`
    flex: 1 1 auto;
    height: 1px;
    background-color: ${isActive
      ? addOpacity(theme.palette.primary.normal, theme.opacity[61])
      : theme.palette.line.normal.normal};
  `;

export const progressCircleWrapperStyle =
  (isActive: boolean) => (theme: Theme) => css`
    background-color: transparent;
    padding: 4px;
    border-radius: 50%;

    ${isActive &&
    css`
      background-color: ${addOpacity(
        theme.palette.primary.normal,
        theme.opacity[12],
      )};
    `}
  `;

export const progressCircleStyle =
  (isActive: boolean, completed: boolean) => (theme: Theme) => css`
    background-color: ${theme.palette.fill.strong};
    color: ${theme.palette.static.white};
    width: 24px;
    height: 24px;
    position: relative;
    border-radius: 50%;
    font-size: 14px;

    ${(isActive || completed) &&
    css`
      background-color: ${theme.palette.primary.normal};
    `}
  `;
