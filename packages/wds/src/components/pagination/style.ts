import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils';
import { activeInteractionStyle } from '../with-interaction/style';

import type { PaginationProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const paginationStyle = ({
  variant,
}: Pick<PaginationProps, 'variant'>) =>
  variant === 'extended' &&
  css`
    min-height: 32px;
  `;

export const paginationItemStyle = css`
  min-width: 20px;
  max-width: 20px;
`;

export const pageButtonStyle = (theme: Theme) => css`
  width: 100%;

  // TextButton Typography
  > span {
    ${typographyStyle('body2_normal', 'regular')}
    will-change: font-weight, color;
    transition:
      font-weight 0.15s ease,
      color 0.15s ease;
  }

  // TextButton Interaction
  [wds-component='with-interaction'] {
    width: calc(100% + 10px);
  }

  &:not([aria-disabled='true']) {
    > span {
      color: ${theme.palette.label.neutral};
    }

    &[aria-current='page'] {
      > span {
        ${typographyStyle('body2_normal', 'medium')}
        color: ${theme.palette.label.normal};
      }

      [wds-component='with-interaction'] {
        ${activeInteractionStyle(theme, 'light')}
      }
    }
  }
`;

export const paginationInputStyle = css`
  padding: 6px;
  border-radius: 8px;

  input {
    ${typographyStyle('label1_normal', 'medium')}
    text-align: center;
  }

  [data-role='text-input-reset'] {
    display: none;
  }
`;

export const paginationContentStyle = css`
  flex: 1;
  min-width: max-content;
  min-height: 32px;
  align-items: center;

  &[data-role='pagination-right-content-wrapper'] {
    justify-content: flex-end;
  }
`;
