import { css } from '@wanteddev/wds';

export const carouselStyle = css`
  overflow: hidden;
  width: 100%;
`;

export const carouselContentStyle = css`
  touch-action: pan-y pinch-zoom;
  margin-left: -20px;
  width: calc(100% + 20px);
`;
