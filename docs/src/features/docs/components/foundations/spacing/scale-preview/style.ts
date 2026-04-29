import { css } from '@wanteddev/wds';

export const previewWrapperStyle = css`
  display: flex;
  align-items: center;
  height: 16px;
  max-width: 320px;
  overflow: hidden;
`;

export const previewBarStyle = (value: string) => css`
  display: block;
  width: min(${value}, 100%);
  height: 8px;
  background-color: var(--semantic-primary-normal);
  border-radius: 2px;
`;
