import { css } from '@wanteddev/wds';

export const searchModalHeaderStyle = css`
  & > div:not([data-role='top-navigation-toolbar']) {
    display: none;
  }
`;

export const searchModalToolbarStyle = css`
  padding: var(--wds-top-navigation-padding-x);
`;
