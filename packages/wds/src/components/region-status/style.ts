import { css, keyframes } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const bottomMountKeyFrames = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const bottomUnmountKeyFrames = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0%);
  }

  100% {
    opacity: 0;
    transform: translateY(100%);
  }
`;

export const bottomRegionStatusStyle = (
  duration: number,
  isMountAnimationDone: boolean,
) => css`
  padding: 11px 16px;
  max-width: 100%;
  border-radius: 12px;
  display: flex;
  gap: 16px;
  width: fit-content;
  max-width: 360px;
  font-size: 20px;
  pointer-events: auto;
  align-items: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(32px);

  animation:
    ${bottomMountKeyFrames} 200ms cubic-bezier(0.4, 0, 0.2, 1),
    ${bottomUnmountKeyFrames} 200ms ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);

  & > :not([role='presentation']) {
    z-index: 1;
  }

  ${isMountAnimationDone &&
  css`
    &:hover {
      animation-play-state: paused;
    }

    &:where(:focus-within) {
      animation-play-state: paused;
    }

    &:where(:focus) {
      animation-play-state: paused;
    }

    &:where(:hover) {
      animation-play-state: paused;
    }
  `}
`;

export const toastCircleIconWrapperStyle = (theme: Theme) => css`
  width: fit-content;
  height: fit-content;
  position: relative;

  &::before {
    position: absolute;
    content: '';
    width: 50%;
    height: 50%;
    background-color: ${theme.palette.static.white};
  }
`;

export const firstOverlayStyle = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${addOpacity(
    theme.palette.inverse.background,
    theme.opacity[61],
  )};
  inset: 0;
`;

export const secondOverlayStyle = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${addOpacity(
    theme.palette.primary.normal,
    theme.opacity[8],
  )};
  inset: 0;
`;

export const messageStyle = css`
  padding: 5px 2px;
`;

export const snackbarActionStyle = (theme: Theme) => css`
  color: ${theme.palette.background.normal.normal};

  & [wds-component='with-interaction'] {
    background-color: ${theme.palette.background.normal.normal};
  }
`;

export const textStyle = (theme: Theme) => css`
  opacity: ${theme.opacity[88]};
`;
