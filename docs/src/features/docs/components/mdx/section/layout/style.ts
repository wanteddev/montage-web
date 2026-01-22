import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sectionThumbnailStyle = (ratio: string) => (theme: Theme) => css`
  width: 100%;
  position: relative;
  border-radius: 24px;
  aspect-ratio: ${ratio};
  margin-bottom: 24px;

  &::after {
    content: '';
    inset: 0;
    position: absolute;
    border-radius: inherit;
    border: 1px solid ${theme.semantic.line.solid.neutral};
  }

  svg {
    width: 20%;
  }

  img {
    position: relative;
    border-radius: inherit;
  }
`;
