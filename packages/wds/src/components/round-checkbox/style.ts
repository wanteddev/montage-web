import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { RoundCheckboxProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const roundCheckboxStyle =
  ({ size, xs, sm, md, lg, xl }: RoundCheckboxProps) =>
  (theme: Theme) => css`
    border-radius: 9999px;

    [data-role='checkbox-icon-wrapper'] {
      border-radius: 9999px;
    }

    & svg {
      pointer-events: none;
    }

    &[aria-checked='true'] {
      [data-role='checkbox-icon-wrapper'] {
        border: none;
        box-shadow: none;
        background-color: ${theme.semantic.primary.normal};
      }
    }

    ${roundCheckboxSizeStyle({ size })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${roundCheckboxSizeStyle({ size: params?.size })}
      `,
    )}
  `;

export const roundCheckboxSizeStyle = ({ size }: RoundCheckboxProps) => {
  switch (size) {
    case 'medium':
      return css`
        padding: 2px;
      `;
  }
};
