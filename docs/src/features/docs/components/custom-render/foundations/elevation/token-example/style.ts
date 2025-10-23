import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const tokenThumbnailStyle = (theme: Theme) => css`
  && {
    border-radius: 32px;

    &::after {
      border: 1px solid ${theme.semantic.line.normal.neutral};
    }
  }
`;

export const tokenTypographyStyle = css`
  position: absolute;
  bottom: -21px;
  left: 50%;
  transform: translateX(-50%);
`;
