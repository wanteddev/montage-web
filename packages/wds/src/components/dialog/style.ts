import { css } from '@wanteddev/wds-engine';

import { respondTo } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const dialogWrapperStyle = (theme: Theme) => css`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: ${theme.zIndex.modal};
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;

  @supports (height: 100dvh) {
    height: 100dvh;
  }
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
  flex: 1;
`;

export const dialogContentStyle = (theme: Theme) => css`
  background-color: ${theme.palette.background.elevated.normal};
  border-radius: 12px;
  min-width: 320px;
  max-width: 400px;
  outline: none;

  ${respondTo('360px')} {
    min-width: 100%;
  }
`;

export const dialogActionStyle = css`
  padding: 0px 20px 12px 20px;
`;
