import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils';
import { activeInteractionStyle } from '../with-interaction/style';

import type { PaginationProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

const paginationVariantStyle = ({
  variant,
}: Pick<PaginationProps, 'variant'>) => {
  switch (variant) {
    case 'extended':
      return css`
        gap: 2px;
      `;

    case 'minimize':
      return css`
        gap: 12px;

        [wds-component='with-interaction'] {
          width: 24px;
          height: 24px;
        }
      `;
  }
};

export const paginationStyle = ({
  variant,
}: Pick<PaginationProps, 'variant'>) => css`
  ${paginationVariantStyle({ variant })}
`;

export const pageButtonStyle = (theme: Theme) => css`
  min-width: 24px;

  > span {
    ${typographyStyle('body2_normal', 'regular')}
    color: ${theme.palette.label.neutral};
  }

  [wds-component='with-interaction'] {
    width: calc(100% + 10px);
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
`;
