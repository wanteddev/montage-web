import { css } from '@wanteddev/wds';

export const carouselWrapperStyle = css`
  width: calc(100% + var(--layout-padding-inline) * 2);
  margin-left: calc(var(--layout-padding-inline) * -1);
  position: relative;
  overflow: hidden;
  padding-inline: var(--layout-padding-inline);

  --carousel-item-gap: 16px;
  --carousel-item-width: calc((100% - var(--carousel-item-gap) * 2) / 3);
`;

export const descriptionStyle = css`
  && {
    white-space: pre-line;
  }
`;

export const carouselContentStyle = css`
  touch-action: pan-y pinch-zoom;
  width: 100%;
`;

export const carouselItemStyle = css`
  flex: 0 0 var(--carousel-item-width);
  user-select: none;
  width: 100%;
  margin-right: var(--carousel-item-gap);

  &:last-of-type {
    margin-right: 0px;
  }
`;
