import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const titleSectionWrapperStyle = css`
  position: relative;
  border-bottom: 16px;
  margin-bottom: 16px;
`;

export const tabStyle = (theme: Theme) => css`
  margin-bottom: 16px;
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
