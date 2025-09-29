import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const titleSectionWrapperStyle = css`
  margin-bottom: 24px;
`;

export const thumbnailStyle = css`
  margin-block: 8px 32px;
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 21/9;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const tabScrollStyle = css`
  scroll-margin-top: var(--gnb-height);
`;

export const tabStyle = (theme: Theme) => css`
  --wds-tab-padding-y: 16px;

  margin-bottom: 88px;
  position: sticky;
  top: calc(var(--gnb-height));
  z-index: 3;
  background-color: ${theme.semantic.background.normal.normal};

  & + h1,
  & + h2,
  & + h3 {
    border: none !important;
    padding-top: 0px !important;
    margin-top: 16px !important;
  }

  p {
    margin: 0 !important;
  }
`;
