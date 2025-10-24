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

export const carouselWrapperStyle = css`
  width: calc(100% + var(--layout-padding-inline) * 2);
  margin-left: calc(var(--layout-padding-inline) * -1);
  padding-right: var(--carousel-item-gap);
  position: relative;
  overflow: hidden;

  --carousel-item-gap: 16px;
`;

export const carouselContentStyle = css`
  touch-action: pan-y pinch-zoom;
  width: 100%;
  padding-inline: var(--layout-padding-inline);
`;

export const carouselItemStyle = (theme: Theme) => css`
  flex: 0 0 calc(33% - var(--carousel-item-gap) / 3);
  border-radius: 24px;
  transform: translate3d(0, 0, 0);
  position: relative;
  user-select: none;
  border-radius: 24px;
  position: relative;
  width: 100%;
  margin-right: var(--carousel-item-gap);
  overflow: hidden;

  &:last-of-type {
    margin-right: 0px;
  }

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
    flex: 0 0 283px;

    [data-role='interaction-arrow'] {
      font-size: 24px;
    }
  }
`;
