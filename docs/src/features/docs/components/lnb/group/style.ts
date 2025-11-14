import { css } from '@wanteddev/wds';

export const wrapperStyle = css`
  padding-bottom: 32px;

  & > [data-is-group='true']:not(:last-of-type) {
    margin-bottom: 32px;
  }
`;
