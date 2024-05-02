import { css, keyframes } from '@wanteddev/wds-engine';

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

export const bottomRegionStatusStyle =
  (duration: number, isMountAnimationDone: boolean) => (theme: Theme) => css`
    background-color: ${theme.palette.inverse.background};
    padding: 14px 16px;
    max-width: 100%;
    border-radius: 8px;
    display: flex;
    gap: 16px;
    width: fit-content;
    max-width: 360px;
    font-size: 20px;
    pointer-events: auto;
    align-items: center;

    animation:
      ${bottomMountKeyFrames} 200ms cubic-bezier(0.4, 0, 0.2, 1),
      ${bottomUnmountKeyFrames} 200ms ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);

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

    svg {
      flex-shrink: 0;
    }
  `;
