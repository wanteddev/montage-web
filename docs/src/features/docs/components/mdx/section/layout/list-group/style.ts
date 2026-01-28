import { css } from '@wanteddev/wds';

export const ulStyle = css`
  list-style-type: disc;
  padding-left: 24px;
  margin-bottom: 0px !important;
  display: flex;
  flex-direction: column;
  gap: 6px;

  li::marker {
    font-size: 0.8em;
  }
`;
