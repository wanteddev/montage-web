import { css, respondTo } from '@wanteddev/wds';

export const customizeStyle = css`
  padding: 24px 20px;
  gap: 20px;
  align-items: center;
  flex-direction: row;

  ${respondTo('620px')} {
    padding: 24px 0px;
    flex-direction: column;
    align-items: initial;
  }
`;
