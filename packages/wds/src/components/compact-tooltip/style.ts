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

export const compactTooltipContentStyle = (theme: Theme) => css`
  padding: 3px 6px;
  border-radius: 5px;
  animation: 0.2s ease ${compactTooltipFadeIn};
  opacity: 1;
  background-color: ${addOpacity(
    theme.palette.inverse.background,
    theme.opacity[61],
  )};
  backdrop-filter: blur(32px);
`;
