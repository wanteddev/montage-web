import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const tabScrollStyle = css`
  scroll-margin-top: var(--gnb-height);
`;

export const tabStyle = (theme: Theme) => css`
  --wds-tab-padding-y: 16px;

  margin-bottom: 48px;
  position: sticky;
  top: calc(var(--gnb-height));
  z-index: 12;
  background-color: ${theme.semantic.background.normal.normal};

  ${respondTo('840px')} {
    width: calc(100% + var(--layout-padding-inline) * 2);
    padding-inline: var(--layout-padding-inline);
    margin-left: calc(var(--layout-padding-inline) * -1);
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

  [data-role='tab-motion'] {
    will-change: left, width, height;
  }
`;
