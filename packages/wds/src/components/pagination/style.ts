import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils';
import { activeInteractionStyle } from '../with-interaction/style';

import type { Theme } from '@wanteddev/wds-engine';

export const paginationItemStyle = css`
  min-width: 20px;
  max-width: 20px;
`;

export const pageButtonStyle = (theme: Theme) => css`
  width: 100%;

  // TextButton Typography
  > span {
    ${typographyStyle('body2_normal', 'regular')}
    color: ${theme.palette.label.neutral};
  }
  // TextButton Interaction
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
