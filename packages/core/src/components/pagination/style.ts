import { css } from '@montage-ui/engine';

import { typographyStyle } from '../../utils';
import { activeInteractionStyle } from '../with-interaction/style';

import type { PaginationProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const paginationStyle = ({
  variant,
}: Pick<PaginationProps, 'variant'>) =>
  variant === 'extended' &&
  css`
    min-height: 32px;
  `;

export const paginationItemStyle = css`
  width: fit-content;
`;

export const pageButtonStyle = (theme: Theme) => css`
  width: fit-content;
  min-width: 20px;

  // TextButton Typography
  > span {
    ${typographyStyle('body2', 'regular')}
    will-change: font-weight, color;
    transition:
      font-weight 0.15s ease,
      color 0.15s ease;
  }

  // TextButton Interaction
  [data-component='with-interaction'] {
    width: calc(100% + 10px);
  }

  &:not([aria-disabled='true']) {
    > span {
      color: ${theme.semantic.foreground.neutral.secondary};
    }

    &[aria-current='page'] {
      > span {
        ${typographyStyle('body2', 'medium')}
        color: ${theme.semantic.foreground.neutral.primary};
      }

      [data-component='with-interaction'] {
        ${activeInteractionStyle(theme, 'light')}
      }
    }
  }
`;

export const paginationFieldStyle = css`
  border-radius: 8px;
  /*
   * TextField's own padding is split between the root and the wrapper (and
   * the input) by field size. This fixed 32px field keeps a single 6px inset,
   * as in 3.x, so the digits get the full inner width.
   */
  padding: 6px;

  [data-role='text-field-wrapper'] {
    padding: 0;
  }

  input {
    ${typographyStyle('label1', 'medium')}
    text-align: center;
    padding: 0;
  }

  [data-role='text-field-reset'] {
    display: none;
  }
`;

export const paginationContentStyle = css`
  flex: 1;
  min-width: max-content;
  min-height: 32px;
  align-items: center;

  &[data-role='pagination-trailing-content-wrapper'] {
    justify-content: flex-end;
  }
`;
