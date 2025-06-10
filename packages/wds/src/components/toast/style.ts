import { css } from '@wanteddev/wds-engine';

import { addOpacity, respondMore, respondTo } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const wrapperStyle = css`
  backdrop-filter: blur(32px);
  will-change: backdrop-filter;
  border-radius: 12px;
`;

export const toastStyle = (theme: Theme) => css`
  border-radius: inherit;
  padding: 11px 16px;
  max-width: 100%;
  display: flex;
  gap: 16px;
  font-size: 20px;
  pointer-events: auto;
  align-items: center;
  position: relative;
  overflow: hidden;

  ${respondMore(theme.breakpoint.sm)} {
    min-width: 356px;
    max-width: 420px;
  }
  ${respondTo(theme.breakpoint.sm)} {
    width: 100%;
  }

  & > :not([role='presentation']) {
    z-index: 1;
  }
`;

export const toastCircleIconWrapperStyle = (theme: Theme) => css`
  width: fit-content;
  height: fit-content;
  position: relative;
  flex-shrink: 0;

  &::before {
    z-index: -1;
    position: absolute;
    content: '';
    width: 8px;
    height: 10px;
    left: 50%;
    top: 50%;
    border-radius: 999px;
    transform: translate(-50%, -50%);
    background-color: ${theme.semantic.static.white};
  }
`;

export const firstOverlayStyle = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${addOpacity(
    theme.semantic.inverse.background,
    theme.opacity[52],
  )};
  inset: 0;
`;

export const secondOverlayStyle = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${addOpacity(
    theme.semantic.primary.normal,
    theme.opacity[5],
  )};
  inset: 0;
`;

export const messageStyle = css`
  padding: 5px 2px;
`;

export const textStyle = (theme: Theme) => css`
  opacity: ${theme.opacity[88]};
`;
