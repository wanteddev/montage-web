import { css } from '@montage-ui/core';

export const wrapperStyle = css`
  padding-bottom: 32px;

  & > [data-is-group='true']:not(:last-of-type) {
    margin-bottom: 32px;
  }
`;
