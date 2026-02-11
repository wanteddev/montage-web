import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const thumbnailStyle = (theme: Theme) => css`
  margin-block: 48px;
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 21/9;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: inherit;
    background-color: #fafafa;
  }

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    inset: 0;
    position: absolute;
    border-radius: inherit;
    border: 1px solid ${theme.semantic.line.solid.neutral};
  }
`;
