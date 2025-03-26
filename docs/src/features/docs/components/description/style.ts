import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const wrapperStyle = css`
  margin-bottom: 40px;

  ${respondTo('980px')} {
    flex-direction: column;
    justify-content: initial;
    gap: 20px;
  }
`;

export const titleSectionWrapperStyle = css`
  ${respondTo('980px')} {
    gap: 20px;
  }
`;

export const tabScrollStyle = css`
  scroll-margin-top: var(--gnb-height);
`;

export const tabStyle = (theme: Theme) => css`
  margin-bottom: 40px;
  position: sticky;
  top: calc(var(--gnb-height));
  z-index: 3;
  background-color: ${theme.semantic.background.normal.normal};

  &::after {
    background-color: ${theme.semantic.line.normal.normal};
  }

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
