import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const carouselItemStyle = css`
  --carousel-item-width: 252px;
`;

export const thumbnailStyle = (theme: Theme) => css`
  border-radius: 24px;

  &::after {
    content: '';
    position: absolute;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    background-color: ${theme.semantic.fill.alternative};
    opacity: ${theme.opacity[43]};
    inset: 0;
  }
`;
