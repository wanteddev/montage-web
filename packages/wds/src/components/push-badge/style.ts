import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';
import type { PushBadgeProps } from './types';

export const pushBadgeStyle =
  ({ variant }: PushBadgeProps) =>
  (theme: Theme) => {
    switch (variant) {
      case 'dot':
        return css`
          display: inline-flex;
          justify-content: center;
          flex-shrink: 0;
          align-items: center;
          height: 20px;
          width: 20px;
          padding: 8px;
        `;
      case 'new':
      case 'number':
      default:
        return css`
          text-align: center;
          display: inline-flex;
          height: 20px;
          width: 20px;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          padding: 0px 6px;
          color: ${theme.palette.static.white};
          background-color: ${theme.palette.primary.normal};
          border-radius: 9999px;

          & > span {
            height: fit-content;
          }
        `;
    }
  };
