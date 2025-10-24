import { css } from '@wanteddev/wds';

export const itemDividerStyle = (color: string) => css`
  width: 5px;
  height: 100%;
  border-radius: 2px;
  background: ${color};
  margin: 0px;
  border: none;
`;
