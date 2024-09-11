import { css } from '@wanteddev/wds-engine';

import { gradient } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const customSelectMultipleRenderWrapperStyle =
  ({ overflow, isScrollable }: { overflow: boolean; isScrollable: boolean }) =>
  (theme: Theme) =>
    overflow === false &&
    css`
      flex-wrap: nowrap;
      overflow-y: hidden;

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;

      ${isScrollable &&
      css`
        ${gradient(theme.palette.background.normal.normal, 'right', '40px')}
      `}
    `;
