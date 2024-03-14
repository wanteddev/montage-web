import { css } from '@emotion/react';

import { typographyStyle } from '@/utils';

import type { Theme } from '@emotion/react';
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
          padding: 6px;
        `;
      case 'new':
      case 'number':
      default:
        return css`
          display: inline-flex;
          min-height: 20px;
          min-width: 20px;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          padding: 0px 6px;
          color: ${theme.palette.static.white};
          background-color: ${theme.palette.primary.normal};
          border-radius: 50%;

          ${typographyStyle('caption2', 'bold')}
        `;
    }
  };
