import { css } from '@wanteddev/wds';

export const itemDividerStyle = (color: string) => css`
  width: 5px;
  height: 100%;
  border-radius: 2px;
  background: ${color};
  margin: 0px;
  border: none;
`;

export const carouselContentStyle = css`
  touch-action: pan-y pinch-zoom;
  width: 100%;
`;

export const carouselItemStyle = css`
  flex: 0 0 456px;
  border-radius: 24px;
  transform: translate3d(0, 0, 0);
  position: relative;
  user-select: none;
  border-radius: 24px;
  padding: 8px;
  position: relative;
  width: 100%;
  margin-right: 16px;
  overflow: hidden;
`;
