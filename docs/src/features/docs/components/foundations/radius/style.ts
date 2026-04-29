import { css } from '@wanteddev/wds';

export const previewBoxStyle = (radius: string) => css`
  width: 56px;
  height: 56px;
  background-color: var(--semantic-fill-normal);
  border: 1px solid var(--semantic-line-normal-neutral);
  border-radius: ${radius};
`;
