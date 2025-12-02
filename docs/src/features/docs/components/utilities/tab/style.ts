import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const wrapperStyle = (theme: Theme) => css`
  margin-block: 40px 64px;
  border-radius: 24px;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 95 / 29;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    content: '';
    inset: 0;
    position: absolute;
    border-radius: inherit;
    background-color: ${theme.semantic.fill.alternative};
    opacity: ${theme.opacity[52]};
  }
`;
