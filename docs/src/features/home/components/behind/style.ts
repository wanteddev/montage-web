import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const itemDividerStyle = (color: string) => css`
  width: 5px;
  height: 100%;
  border-radius: 2px;
  background: ${color};
  margin: 0px;
  border: none;
`;

export const carouselItemStyle = (theme: Theme) => css`
  --carousel-item-width: calc(33% - var(--carousel-item-gap) / 3);

  [data-role='interaction-arrow'] {
    color: ${theme.semantic.label.normal};
    transition: transform 0.2s ease;
    font-size: 26px;
    transform: scale(0);
    padding-block: 1px;
  }

  @media (pointer: fine) {
    &:hover {
      [data-role='interaction-arrow'] {
        transform: scale(1);
      }
    }
  }

  ${respondTo(theme.breakpoint.md)} {
    --carousel-item-width: 283px;

    [data-role='interaction-arrow'] {
      font-size: 24px;
    }
  }
`;
