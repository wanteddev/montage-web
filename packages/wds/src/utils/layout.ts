import { css } from '@wanteddev/wds-engine';

import { respondMore, respondTo } from './media';

import type { Theme } from '@wanteddev/wds-engine';

export const containerStyle = (xl?: boolean) => (theme: Theme) => css`
  width: 100%;
  margin: 0 auto;

  ${respondTo(theme.breakpoint.sm)} {
    width: 100%;
    padding: 0 20px;
  }

  ${respondMore(theme.breakpoint.sm)} {
    width: 90%;

    ${xl
      ? css`
          max-width: 1400px;
        `
      : css`
          max-width: 1060px;
        `}
  }
`;
