import { css, keyframes } from '@emotion/react';

import { addOpacity } from '../../utils';

import type { Theme } from '@emotion/react';

const compactTooltipFadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const compactTooltipWrapperStyle = css`
  backdrop-filter: blur(32px);
  animation: 0.2s ease ${compactTooltipFadeIn};
  opacity: 1;
  border-radius: 5px;
`;

export const compactTooltipContentStyle = (theme: Theme) => css`
  background-color: ${addOpacity(
    theme.palette.inverse.background,
    theme.opacity[61],
  )};
  padding: 3px 6px;
  border-radius: inherit;
`;
