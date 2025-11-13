import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const carouselWrapperStyle = css`
  --carousel-item-gap: 12px;
  --carousel-item-width: calc((100% - var(--carousel-item-gap) * 2) / 3);

  ${respondTo('840px')} {
    --carousel-item-width: 244px;
  }
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
