import { css } from '@wanteddev/wds-engine';

export const listStyle = css`
  && {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const listItemStyle = css`
  & {
    flex-direction: row;
    gap: 10px;
  }
`;

export const listItemTextStyle = css`
  & {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }
`;
