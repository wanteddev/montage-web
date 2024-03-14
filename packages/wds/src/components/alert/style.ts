import { css, keyframes } from '@emotion/react';

import type { Theme } from '@emotion/react';

export const topMountKeyFrames = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const topRegionStatusStyle = (theme: Theme) => css`
  background-color: ${theme.palette.background.normal.normal};
  padding: 14px 16px;
  max-width: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 20px;
  pointer-events: auto;
  align-items: center;
  position: relative;

  animation: ${topMountKeyFrames} 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &::after {
    pointer-events: none;
    content: '';
    width: inherit;
    height: inherit;
    border-radius: inherit;
    position: absolute;
    inset: 0;
    background-color: var(--wds-region-top-item-background);
  }

  svg {
    flex-shrink: 0;
  }
`;
