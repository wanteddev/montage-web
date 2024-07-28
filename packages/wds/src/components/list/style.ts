import { css } from '@wanteddev/wds-engine';

export const listStyle = css`
  && {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const listCellStyle = css`
  border-radius: 12px;

  [role='radio'] [wds-component='with-interaction'] {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
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
