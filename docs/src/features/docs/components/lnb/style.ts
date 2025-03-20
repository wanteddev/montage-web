import { css, respondTo } from '@wanteddev/wds';

export const lnbWrapperStyle = css`
  width: 240px;
  box-sizing: content-box;
  flex-shrink: 0;
  top: calc(var(--gnb-height) + var(--layout-padding));
  position: sticky !important;
  padding: 0px var(--layout-padding);
  height: calc(100dvh - var(--gnb-height) - var(--layout-padding) - 20px);

  [data-radix-scroll-area-content] {
    padding: 0px 0px 16px 0px;
  }

  ${respondTo('1360px')} {
    display: none;
  }
`;
