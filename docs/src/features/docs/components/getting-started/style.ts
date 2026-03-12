import { css, respondTo } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const thumbnailStyle = (theme: Theme) => css`
  margin-top: 40px;
  margin-bottom: 32px;
  aspect-ratio: 195 / 58;

  &::before {
    content: '';
    inset: 0;
    position: absolute;
    border-radius: inherit;
    background-color: ${theme.semantic.fill.alternative};
    opacity: ${theme.opacity[52]};
  }
`;

export const descriptionStyle = (theme: Theme) => css`
  && {
    max-width: unset;
    white-space: pre-line;

    ${respondTo(theme.breakpoint.sm)} {
      white-space: initial;
    }
  }
`;
