import { css } from '@wanteddev/wds-engine';

import { addOpacity, respondTo } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const alertWrapperStyle = (theme: Theme) => css`
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

export const alertDimmerStyle = (theme: Theme) => css`
  position: fixed;
  inset: 0;
  background-color: ${addOpacity(
    theme.semantic.material.dimmer,
    theme.opacity[43],
  )};
  z-index: -1;
`;

export const alertContainerStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.background.elevated.normal};
  border-radius: 12px;
  min-width: 320px;
  max-width: 400px;
  outline: none;
  display: flex;
  flex-direction: column;

  ${respondTo('360px')} {
    min-width: 100%;
  }
`;

export const alertContentStyle = css`
  padding: 20px;
`;

export const alertActionStyle = css`
  padding: 0px 20px 12px 20px;
`;
