import { css } from '@wanteddev/wds';

export const ulStyle = css`
  list-style-type: disc;
  padding-left: 24px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li::marker {
    font-size: 0.8em;
  }
`;
