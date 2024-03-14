import { css } from '@emotion/react';

import type { Theme } from '@emotion/react';

export const dialogWrapperStyle = (theme: Theme) => css`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  inset: 0;
  z-index: ${theme.zIndex.modal};
`;

export const dialogDimmerStyle = (theme: Theme) => css`
  position: fixed;
  inset: 0;
  background-color: ${theme.palette.material.dimmer};
  z-index: -1;
`;

export const dialogStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
`;

export const dialogContentStyle = (theme: Theme) => css`
  background-color: ${theme.palette.background.elevated.normal};
  border-radius: 12px;
  min-width: 320px;
  max-width: 100%;
  outline: none;
`;

export const dialogDividerStyle = (theme: Theme) => css`
  opacity: ${theme.opacity[8]};
`;

export const dialogActionStyle = css`
  padding: 12px 20px;
`;
